import { useState, useRef, useEffect } from "react";
import { MoreHorizontal, Mic, Send, Play, Pause, X, Square, Trash2, ArrowUp } from "lucide-react";
import * as Tone from 'tone';

// Header Component
const CommentHeader = ({ onClose, isOpen }) => {
  return (
    <div className={`px-5 py-5 border-b border-slate-200 flex justify-between items-center transition-all duration-300 delay-100 ${
      isOpen ? 'transform translate-y-0 opacity-100' : 'transform -translate-y-4 opacity-0'
    }`}>
      <div className="flex flex-col gap-0.5">
        <h2 className="text-gray-800 text-xl font-semibold font-['Inter']">Comment</h2>
        <p className="text-zinc-500 text-xs font-normal font-['Inter'] tracking-tight">OneSnap Label-02</p>
      </div>
      <div className="flex items-center gap-2">
        <button className="p-2 bg-white rounded-lg border border-slate-200 flex justify-center items-center hover:bg-gray-50 transition-all duration-200 hover:scale-105">
          <MoreHorizontal className="w-4 h-4 text-gray-800" />
        </button>
        <button 
          onClick={onClose}
          className="p-2 bg-white rounded-lg border border-slate-200 flex justify-center items-center hover:bg-gray-50 transition-all duration-200 hover:scale-105 hover:rotate-90"
        >
          <X className="w-4 h-4 text-gray-800" />
        </button>
      </div>
    </div>
  );
};

// Message Item Component
const MessageItem = ({ message, index, playingVoice, audioPlayers, playProgress, toggleVoicePlay, toggleReadMore, deleteMessage, isOpen }) => {
  const renderWaveform = (messageId, isPlaying) => {
    const duration = message ? parseInt(message.duration?.split(':')[1]) * 1000 : 5000;
    const progress = playProgress[messageId] || 0;

    return (
      <div className="flex gap-1 items-end">
        {Array.from({ length: message.type === "sent" ? 29 : 30 }, (_, i) => {
          const heights = message.type === "sent" 
            ? ['h-4', 'h-2', 'h-3', 'h-4', 'h-2', 'h-1.5', 'h-3', 'h-2', 'h-4', 'h-2']
            : ['h-6', 'h-3', 'h-4', 'h-5', 'h-3', 'h-2', 'h-3.5', 'h-2.5', 'h-5', 'h-2.5'];
          const barProgress = (i / (message.type === "sent" ? 29 : 30)) * 100;
          const isActive = isPlaying && barProgress <= progress;
          
          return (
            <div
              key={i}
              className={`w-0 ${heights[i % heights.length]} border-r-2 transition-colors duration-100 ${
                message.type === "sent" 
                  ? (isActive ? 'border-blue-200' : 'border-white') + ' opacity-80'
                  : isActive ? 'border-cyan-800' : 'border-cyan-600'
              }`}
            />
          );
        })}
      </div>
    );
  };

  return (
    <div 
      className={`p-2 rounded-lg flex gap-2 transition-all duration-300 ${
        isOpen ? 'transform translate-x-0 opacity-100' : 'transform translate-x-8 opacity-0'
      }`}
      style={{ transitionDelay: `${200 + index * 100}ms` }}
    >
      {message.type === "received" ? (
        <>
          <img className="w-6 h-6 rounded-full flex-shrink-0 transition-transform duration-200 hover:scale-110" src={message.avatar} alt="User" />
          <div className="flex-1 py-0.5 flex flex-col gap-2">
            <div className="flex justify-between items-center gap-3">
              <span className="flex-1 text-gray-800 text-sm font-semibold font-['Inter'] leading-snug tracking-tight">
                {message.user}
              </span>
              <div className="relative group">
                <button className="hover:bg-gray-100 p-1 rounded transition-all duration-200 hover:scale-110">
                  <MoreHorizontal className="w-4 h-4 text-gray-500" />
                </button>
                <div className="absolute right-0 top-8 invisible group-hover:visible opacity-0 group-hover:opacity-100 bg-white border border-gray-200 rounded-lg shadow-lg py-1 z-10 transition-all duration-200 transform translate-y-1 group-hover:translate-y-0">
                  <button 
                    onClick={() => deleteMessage(message.id)}
                    className="block w-full text-left px-3 py-1 text-sm text-red-600 hover:bg-red-50 transition-colors duration-200"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
            <div className="p-3 bg-slate-100 rounded-tl rounded-tr-2xl rounded-bl-2xl rounded-br-2xl flex flex-col gap-1 relative transition-all duration-200 hover:shadow-md">
              {message.isVoice ? (
                <div className="flex flex-col gap-2">
                  <div className="flex items-center gap-4">
                    <button
                      onClick={() => toggleVoicePlay(message.id)}
                      className="w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110"
                      style={{ backgroundColor: '#367abb' }}
                      onMouseEnter={(e) => e.target.style.backgroundColor = '#2d5f94'}
                      onMouseLeave={(e) => e.target.style.backgroundColor = '#367abb'}
                    >
                      {playingVoice === message.id ? (
                        <Pause className="w-4 h-4 text-white" />
                      ) : (
                        <Play className="w-4 h-4 text-white ml-0.5" />
                      )}
                    </button>
                    <div className="flex-1 flex justify-between items-center">
                      {renderWaveform(message.id, playingVoice === message.id)}
                    </div>
                    <span className="text-zinc-500 text-xs font-normal font-['Inter'] leading-tight tracking-tight">
                      {message.duration}
                    </span>
                  </div>
                  <div className="relative">
                    <p className="text-zinc-500 text-sm font-normal font-['Inter'] leading-snug tracking-tight">
                      {message.showReadMore && !message.expanded 
                        ? message.content 
                        : message.transcript
                      }
                    </p>
                    {message.showReadMore && !message.expanded && (
                      <button
                        onClick={() => toggleReadMore(message.id)}
                        className="absolute bottom-0 right-0 px-2 py-1 bg-slate-100 hover:bg-slate-200 transition-all duration-200 hover:scale-105"
                      >
                        <span className="text-sm font-bold font-['Inter'] leading-snug tracking-tight" style={{ color: '#367abb' }}>
                          Read more
                        </span>
                      </button>
                    )}
                    {message.expanded && (
                      <button
                        onClick={() => toggleReadMore(message.id)}
                        className="text-sm font-bold font-['Inter'] leading-snug tracking-tight transition-all duration-200 hover:scale-105"
                        style={{ color: '#367abb' }}
                        onMouseEnter={(e) => e.target.style.color = '#2d5f94'}
                        onMouseLeave={(e) => e.target.style.color = '#367abb'}
                      >
                        Show less
                      </button>
                    )}
                  </div>
                </div>
              ) : (
                <div className="relative">
                  <p className="text-zinc-500 text-sm font-normal font-['Inter'] leading-snug tracking-tight">
                    {message.showReadMore && !message.expanded 
                      ? `${message.content.substring(0, 150)}...`
                      : message.content
                    }
                  </p>
                  {message.showReadMore && !message.expanded && (
                    <button
                      onClick={() => toggleReadMore(message.id)}
                      className="absolute bottom-0 right-0 px-2 py-1 bg-slate-100 hover:bg-slate-200 transition-all duration-200 hover:scale-105"
                    >
                      <span className="text-sm font-bold font-['Inter'] leading-snug tracking-tight" style={{ color: '#367abb' }}>
                        Read more
                      </span>
                    </button>
                  )}
                  {message.expanded && (
                    <button
                      onClick={() => toggleReadMore(message.id)}
                      className="text-sm font-bold font-['Inter'] leading-snug tracking-tight transition-all duration-200 hover:scale-105"
                      style={{ color: '#367abb' }}
                      onMouseEnter={(e) => e.target.style.color = '#2d5f94'}
                      onMouseLeave={(e) => e.target.style.color = '#367abb'}
                    >
                      Show less
                    </button>
                  )}
                </div>
              )}
            </div>
            <div className="flex justify-end items-center">
              <span className="text-zinc-500 text-xs font-normal font-['Inter'] leading-none tracking-tight">
                {message.timestamp}
              </span>
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="flex-1 py-0.5 flex flex-col gap-2">
            <div className="flex justify-between items-center gap-3">
              <div className="relative group">
                <button className="hover:bg-gray-100 p-1 rounded transition-all duration-200 hover:scale-110">
                  <MoreHorizontal className="w-4 h-4 text-gray-500" />
                </button>
                <div className="absolute left-0 top-8 invisible group-hover:visible opacity-0 group-hover:100 bg-white border border-gray-200 rounded-lg shadow-lg py-1 z-10 transition-all duration-200 transform translate-y-1 group-hover:translate-y-0">
                  <button 
                    onClick={() => deleteMessage(message.id)}
                    className="block w-full text-left px-3 py-1 text-sm text-red-600 hover:bg-red-50 transition-colors duration-200"
                  >
                    Delete
                  </button>
                </div>
              </div>
              <span className="flex-1 text-right text-gray-800 text-sm font-semibold font-['Inter'] leading-snug tracking-tight">
                You
              </span>
            </div>
            <div className="p-3 rounded-tl-2xl rounded-tr rounded-bl-2xl rounded-br-2xl transition-all duration-200 hover:shadow-md" style={{ backgroundColor: '#367abb' }}>
              {message.isVoice ? (
                <div className="flex flex-col gap-2">
                  <div className="flex items-center gap-4">
                    <button
                      onClick={() => toggleVoicePlay(message.id)}
                      className="w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110"
                      style={{ backgroundColor: '#2d5f94' }}
                      onMouseEnter={(e) => e.target.style.backgroundColor = '#1e3a5f'}
                      onMouseLeave={(e) => e.target.style.backgroundColor = '#2d5f94'}
                    >
                      {playingVoice === message.id ? (
                        <Pause className="w-4 h-4 text-white" />
                      ) : (
                        <Play className="w-4 h-4 text-white ml-0.5" />
                      )}
                    </button>
                    <div className="flex-1 flex justify-between items-center">
                      {renderWaveform(message.id, playingVoice === message.id)}
                    </div>
                    <span className="text-white text-xs opacity-80">
                      {message.duration}
                    </span>
                  </div>
                  {message.transcript && (
                    <div className="relative">
                      <p className="text-white text-sm font-normal font-['Inter'] leading-snug tracking-tight opacity-90">
                        {message.showReadMore && !message.expanded 
                          ? `${message.transcript.substring(0, 150)}...`
                          : message.transcript
                        }
                      </p>
                      {message.showReadMore && !message.expanded && (
                        <button
                          onClick={() => toggleReadMore(message.id)}
                          className="text-sm font-bold font-['Inter'] leading-snug tracking-tight text-blue-200 hover:text-white transition-all duration-200 hover:scale-105 mt-1"
                        >
                          Read more
                        </button>
                      )}
                      {message.expanded && (
                        <button
                          onClick={() => toggleReadMore(message.id)}
                          className="text-sm font-bold font-['Inter'] leading-snug tracking-tight text-blue-200 hover:text-white transition-all duration-200 hover:scale-105 mt-1"
                        >
                          Show less
                        </button>
                      )}
                    </div>
                  )}
                </div>
              ) : (
                <div className="relative">
                  <p className="text-white text-sm font-normal font-['Inter'] leading-snug tracking-tight">
                    {message.showReadMore && !message.expanded 
                      ? `${message.content.substring(0, 150)}...`
                      : message.content
                    }
                  </p>
                  {message.showReadMore && !message.expanded && (
                    <button
                      onClick={() => toggleReadMore(message.id)}
                      className="text-sm font-bold font-['Inter'] leading-snug tracking-tight text-blue-200 hover:text-white transition-all duration-200 hover:scale-105 mt-1"
                    >
                      Read more
                    </button>
                  )}
                  {message.expanded && (
                    <button
                      onClick={() => toggleReadMore(message.id)}
                      className="text-sm font-bold font-['Inter'] leading-snug tracking-tight text-blue-200 hover:text-white transition-all duration-200 hover:scale-105 mt-1"
                    >
                      Show less
                    </button>
                  )}
                </div>
              )}
            </div>
            <div className="flex justify-end items-center">
              <span className="text-zinc-500 text-xs font-normal font-['Inter'] leading-none tracking-tight">
                {message.timestamp}
              </span>
            </div>
          </div>
          <div className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 transition-transform duration-200 hover:scale-110" style={{ backgroundColor: '#367abb' }}>
            <span className="text-white text-xs font-semibold font-['Inter'] leading-tight tracking-tight">R</span>
          </div>
        </>
      )}
    </div>
  );
};

// Messages Component
const Messages = ({ messages, playingVoice, audioPlayers, playProgress, toggleVoicePlay, toggleReadMore, deleteMessage, isOpen }) => {
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className={`flex-1 px-4 py-5 overflow-y-auto transition-all duration-300 delay-150 ${
      isOpen ? 'transform translate-y-0 opacity-100' : 'transform translate-y-4 opacity-0'
    }`}>
      <div className="space-y-1">
        {messages.map((message, index) => (
          <MessageItem
            key={message.id}
            message={message}
            index={index}
            playingVoice={playingVoice}
            audioPlayers={audioPlayers}
            playProgress={playProgress}
            toggleVoicePlay={toggleVoicePlay}
            toggleReadMore={toggleReadMore}
            deleteMessage={deleteMessage}
            isOpen={isOpen}
          />
        ))}
        <div ref={messagesEndRef} />
      </div>
    </div>
  );
};

const RealTimeWaveform = ({ isRecording }) => {
  const [audioLevels, setAudioLevels] = useState(Array(40).fill(0));
  const audioContextRef = useRef(null);
  const analyserRef = useRef(null);
  const updateIntervalRef = useRef(null);

  useEffect(() => {
    if (isRecording) {
      const startVisualization = async () => {
        try {
          const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
          const audioContext = new (window.AudioContext || window.webkitAudioContext)();
          const analyser = audioContext.createAnalyser();
          const source = audioContext.createMediaStreamSource(stream);
          
          analyser.fftSize = 256;
          analyser.smoothingTimeConstant = 0.3;
          source.connect(analyser);
          
          audioContextRef.current = audioContext;
          analyserRef.current = analyser;
          
          const updateWaveform = () => {
            if (!isRecording) return;
            
            const bufferLength = analyser.frequencyBinCount;
            const dataArray = new Uint8Array(bufferLength);
            analyser.getByteFrequencyData(dataArray);
            
            // Get multiple frequency ranges for more variation
            const lowFreq = dataArray.slice(0, 10).reduce((a, b) => a + b, 0) / 10;
            const midFreq = dataArray.slice(10, 30).reduce((a, b) => a + b, 0) / 20;
            const highFreq = dataArray.slice(30, 60).reduce((a, b) => a + b, 0) / 30;
            
            // Combine frequencies with different weights for more dynamic range
            const combinedLevel = (lowFreq * 0.5 + midFreq * 0.3 + highFreq * 0.2) / 255 * 100;
            
            // Add some randomness to make it more organic
            const variation = (Math.random() - 0.5) * 20;
            const currentLevel = Math.max(5, Math.min(100, combinedLevel + variation));
            
            // Create a FIXED height value that won't change once added
            const fixedHeight = Math.round(currentLevel);
            
            // Shift existing levels to the left and add new FIXED level at the end
            setAudioLevels(prevLevels => {
              const newLevels = [...prevLevels.slice(1), fixedHeight];
              return newLevels;
            });
          };
          
          // Update every 120ms for smooth movement
          updateIntervalRef.current = setInterval(updateWaveform, 120);
          
        } catch (error) {
          console.error('Error setting up audio visualization:', error);
          // Fallback to fake animation with fixed heights
          const fakeAnimation = () => {
            if (!isRecording) return;
            
            // Create a fixed height that won't change
            const baseLevel = 20 + Math.sin(Date.now() / 1000) * 15;
            const variation = (Math.random() - 0.5) * 40;
            const fixedHeight = Math.round(Math.max(10, Math.min(90, baseLevel + variation)));
            
            setAudioLevels(prevLevels => {
              const newLevels = [...prevLevels.slice(1), fixedHeight];
              return newLevels;
            });
          };
          
          updateIntervalRef.current = setInterval(fakeAnimation, 120);
        }
      };
      
      startVisualization();
    } else {
      setAudioLevels(Array(40).fill(0));
    }
    
    return () => {
      if (updateIntervalRef.current) {
        clearInterval(updateIntervalRef.current);
      }
      if (audioContextRef.current && audioContextRef.current.state !== 'closed') {
        audioContextRef.current.close();
      }
    };
  }, [isRecording]);

  const getBarHeight = (level) => {
    const minHeight = 4;
    const maxHeight = 48;
    return Math.max(minHeight, (level / 100) * maxHeight);
  };

  return (
    <div className="flex items-center justify-center gap-0.5 h-12 overflow-hidden">
      <div className="flex items-center gap-0.5">
        {audioLevels.map((level, index) => (
          <div
            key={index} // Use stable index-based key
            className="w-1 bg-red-500 rounded-sm flex-shrink-0 transition-all duration-300 ease-out"
            style={{
              height: `${getBarHeight(level)}px`,
              opacity: level > 10 ? 1 : 0.4
            }}
          />
        ))}
      </div>
    </div>
  );
};

const RecordingIndicator = ({ isRecording, recordingTime, transcription, stopRecording, mediaRecorder }) => {
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className={`px-4 py-5 transition-all duration-300 delay-200 transform translate-y-0 opacity-100
}`}>
  <div className="pl-5 pr-2 bg-red-50 py-2 rounded-full flex items-center gap-2.5 transition-all duration-200 hover:shadow-md focus-within:shadow-lg" style={{ borderColor: '#367abb' }}>
        <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse flex-shrink-0"></div>
        
        <div className="flex-1 min-w-0">
          <RealTimeWaveform isRecording={isRecording} />
        </div>
        
        <div className="flex items-center gap-3 flex-shrink-0">
          <span className="text-red-600 text-sm font-medium tabular-nums">
            {formatTime(recordingTime)}
          </span>
          <button
            onClick={stopRecording}
            className="p-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition-all duration-200 hover:scale-105"
          >
            <Square className="w-4 h-4 text-white" />
          </button>
        </div>
      </div>
    </div>
  );
};

const RealTimeWaveform2 = ({ isPlaying, audioElement, color = "#367abb" }) => {
  const [audioLevels, setAudioLevels] = useState(Array(40).fill(0));
  const audioContextRef = useRef(null);
  const analyserRef = useRef(null);
  const updateIntervalRef = useRef(null);
  const sourceRef = useRef(null);

  useEffect(() => {
    if (isPlaying && audioElement) {
      const startVisualization = async () => {
        try {
          // Create audio context if not exists
          if (!audioContextRef.current) {
            const audioContext = new (window.AudioContext || window.webkitAudioContext)();
            audioContextRef.current = audioContext;
          }
          
          // Resume context if suspended
          if (audioContextRef.current.state === 'suspended') {
            await audioContextRef.current.resume();
          }
          
          // Create analyser if not exists
          if (!analyserRef.current) {
            const analyser = audioContextRef.current.createAnalyser();
            analyser.fftSize = 256;
            analyser.smoothingTimeConstant = 0.3;
            analyserRef.current = analyser;
          }
          
          // Create source if not exists
          if (!sourceRef.current) {
            try {
              const source = audioContextRef.current.createMediaElementSource(audioElement);
              source.connect(analyserRef.current);
              source.connect(audioContextRef.current.destination);
              sourceRef.current = source;
            } catch (error) {
              console.error('Error creating media source:', error);
              return;
            }
          }
          
          const updateWaveform = () => {
            if (!isPlaying || !analyserRef.current) return;
            
            const bufferLength = analyserRef.current.frequencyBinCount;
            const dataArray = new Uint8Array(bufferLength);
            analyserRef.current.getByteFrequencyData(dataArray);
            
            // Get multiple frequency ranges for more variation
            const lowFreq = dataArray.slice(0, 10).reduce((a, b) => a + b, 0) / 10;
            const midFreq = dataArray.slice(10, 30).reduce((a, b) => a + b, 0) / 20;
            const highFreq = dataArray.slice(30, 60).reduce((a, b) => a + b, 0) / 30;
            
            // Combine frequencies with different weights for more dynamic range
            const combinedLevel = (lowFreq * 0.5 + midFreq * 0.3 + highFreq * 0.2) / 255 * 100;
            
            // Add some randomness to make it more organic
            const variation = (Math.random() - 0.5) * 15;
            const currentLevel = Math.max(5, Math.min(100, combinedLevel + variation));
            const fixedHeight = Math.round(currentLevel);
            
            setAudioLevels(prevLevels => {
              const newLevels = [...prevLevels.slice(1), fixedHeight];
              return newLevels;
            });
          };
          
          updateIntervalRef.current = setInterval(updateWaveform, 120);
          
        } catch (error) {
          console.error('Error setting up playback visualization:', error);
          setAudioLevels(Array(40).fill(0));
        }
      };
      
      startVisualization();
    } else {
      setAudioLevels(Array(40).fill(0));
      if (updateIntervalRef.current) {
        clearInterval(updateIntervalRef.current);
      }
    }
    
    return () => {
      if (updateIntervalRef.current) {
        clearInterval(updateIntervalRef.current);
      }
    };
  }, [isPlaying, audioElement]);

  const getBarHeight = (level) => {
    const minHeight = 4;
    const maxHeight = 32;
    return Math.max(minHeight, (level / 100) * maxHeight);
  };

  return (
    <div className="flex items-center justify-center gap-0.5 h-8 overflow-hidden">
      <div className="flex items-center gap-0.5">
        {audioLevels.map((level, index) => (
          <div
            key={index}
            className="w-1 rounded-sm flex-shrink-0 transition-all duration-300 ease-out"
            style={{
              height: `${getBarHeight(level)}px`,
              backgroundColor: color,
              opacity: level > 10 ? 1 : 0.4
            }}
          />
        ))}
      </div>
    </div>
  );
};

const RecordedAudioPreview = ({ recordedAudio, transcription, clearRecordedAudio, handleSendVoiceMessage }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);
  
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };
  
  const playRecordedAudioPreview = () => {
    if (!recordedAudio) return;
    
    if (!audioRef.current) {
      audioRef.current = new Audio();
      audioRef.current.src = recordedAudio.url || URL.createObjectURL(recordedAudio.blob);
      
      audioRef.current.onended = () => {
        setIsPlaying(false);
      };
    }
    
    if (isPlaying) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      setIsPlaying(false);
    } else {
      audioRef.current.play();
      setIsPlaying(true);
    }
  };
  
  const stopAudio = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      setIsPlaying(false);
    }
  };
  
  // Cleanup when component unmounts or recordedAudio changes
  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.src = '';
        audioRef.current = null;
      }
    };
  }, [recordedAudio]);
  
  return (
    <div className={`px-4 py-5 transition-all duration-300 delay-200 transform translate-y-0 opacity-100
  }`}>
      <div className="pl-5 pr-2 py-3 rounded-full bg-blue-50 flex items-center gap-2.5 transition-all duration-200 hover:shadow-md focus-within:shadow-lg" style={{ borderColor: '#367abb' }}>
        {/* X button on the left */}
        <button
          onClick={clearRecordedAudio}
          className="py-2 text-gray-500 hover:text-gray-700 transition-colors duration-200"
        >
          <X className="w-5 h-5" />
        </button>
        
        {/* Play/Pause button */}
        <button
          onClick={playRecordedAudioPreview}
          className="p-2 rounded-full transition-all duration-200 hover:scale-110"
          style={{ backgroundColor: '#367abb' }}
          onMouseEnter={(e) => e.target.style.backgroundColor = '#2d5f94'}
          onMouseLeave={(e) => e.target.style.backgroundColor = '#367abb'}
        >
          {isPlaying ? (
            <Pause className="w-4 h-4 text-white" />
          ) : (
            <Play className="w-4 h-4 text-white" />
          )}
        </button>
        
        {/* Waveform - takes up remaining space */}
        <div className="flex-1 min-w-0">
          <RealTimeWaveform2 isPlaying={isPlaying} audioElement={audioRef.current} color="#367abb" />
        </div>
        
        {/* Duration */}
        <span className="text-sm text-gray-600 tabular-nums">
          {formatTime(recordedAudio?.duration || 0)}
        </span>
        
        {/* Send button with arrow up */}
        <button
          onClick={handleSendVoiceMessage}
          className="p-2 text-white rounded-full transition-all duration-200 hover:scale-105"
          style={{ backgroundColor: '#367abb' }}
          onMouseEnter={(e) => e.target.style.backgroundColor = '#2d5f94'}
          onMouseLeave={(e) => e.target.style.backgroundColor = '#367abb'}
        >
          <ArrowUp className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

// Input Area Component
const InputArea = ({ isRecording, recordedAudio, newComment, setNewComment, handleSendComment, startRecording, stopRecording, handleKeyPress }) => {
  return (
    <div className={`px-4 py-5 border-t border-slate-100 transition-all duration-300 delay-200 transform translate-y-0 opacity-100
    }`}>
      <div className="pl-5 pr-2 py-2 rounded-full border flex items-center gap-2.5 transition-all duration-200 hover:shadow-md focus-within:shadow-lg" style={{ borderColor: '#367abb' }}>
        <div className="flex-1 flex items-center gap-2">
          <button
            onClick={isRecording ? stopRecording : startRecording}
            className={`p-2 rounded-full transition-all duration-200 hover:scale-110 ${
              isRecording 
                ? 'bg-red-500 hover:bg-red-600 animate-pulse' 
                : ''
            }`}
            style={!isRecording ? { backgroundColor: '#367abb' } : {}}
            onMouseEnter={(e) => {
              if (!isRecording) e.target.style.backgroundColor = '#2d5f94';
            }}
            onMouseLeave={(e) => {
              if (!isRecording) e.target.style.backgroundColor = '#367abb';
            }}
            title={isRecording ? "Stop recording" : "Start voice recording"}
          >
            {isRecording ? (
              <Square className="w-4 h-4 text-white" />
            ) : (
              <Mic className="w-4 h-4 text-white" />
            )}
          </button>
          <input
            type="text"
            value={recordedAudio ? "Voice message recorded" : newComment}
            onChange={(e) => !recordedAudio && setNewComment(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder={isRecording ? "Recording in progress..." : recordedAudio ? "Voice message ready to send" : "Enter your comment"}
            className={`flex-1 text-zinc-700 text-sm font-normal font-['Inter'] leading-snug tracking-tight bg-transparent outline-none placeholder-zinc-500 transition-all duration-200 ${
              (isRecording || recordedAudio) ? 'cursor-not-allowed opacity-60' : ''
            }`}
            disabled={isRecording || recordedAudio}
            readOnly={recordedAudio}
          />
        </div>
        <button
          onClick={handleSendComment}
          disabled={(!newComment.trim() && !recordedAudio) || isRecording}
          className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed hover:scale-110 disabled:hover:scale-100"
          style={{ backgroundColor: '#367abb' }}
          onMouseEnter={(e) => {
            if (!e.target.disabled) e.target.style.backgroundColor = '#2d5f94';
          }}
          onMouseLeave={(e) => {
            if (!e.target.disabled) e.target.style.backgroundColor = '#367abb';
          }}
          title={recordedAudio ? "Send voice message with transcription" : newComment.trim() ? "Send text message" : "Type or record to send"}
        >
          <ArrowUp className="w-5 h-5 text-white" />
        </button>
      </div>
    </div>
  );
};

// Main CommentSection Component
const CommentSection = ({ isOpen = true, onClose = () => {} }) => {
  const [newComment, setNewComment] = useState("");
  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [recordedAudio, setRecordedAudio] = useState(null);
  const [mediaRecorder, setMediaRecorder] = useState(null);
  const [audioChunks, setAudioChunks] = useState([]);
  const [isTranscribing, setIsTranscribing] = useState(false);
  const [finalTranscript, setFinalTranscript] = useState("");
  const [lastSpeechTime, setLastSpeechTime] = useState(null);
  const [silenceTimeout, setSilenceTimeout] = useState(null);
  const transcription = (finalTranscript).trim();
  const [recognition, setRecognition] = useState(null);
  const [messages, setMessages] = useState([]);
  const [playingVoice, setPlayingVoice] = useState(null);
  const [playProgress, setPlayProgress] = useState({});
  const [audioPlayers, setAudioPlayers] = useState({});
  const sidebarRef = useRef(null);
  const recordingInterval = useRef(null);

  // Initialize Tone.js and Speech Recognition
  useEffect(() => {
    const initTone = async () => {
      if (Tone.context.state !== 'running') {
        await Tone.start();
      }
    };
    initTone();

    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      const speechRecognition = new SpeechRecognition();
      speechRecognition.continuous = true;
      speechRecognition.interimResults = true;
      speechRecognition.lang = 'en-US';
      
      speechRecognition.onresult = (event) => {
        let finalText = '';
        
        if (silenceTimeout) {
          clearTimeout(silenceTimeout);
          setSilenceTimeout(null);
        }

        for (let i = event.resultIndex; i < event.results.length; i++) {
          const transcript = event.results[i][0].transcript;
          if (event.results[i].isFinal) {
            finalText += transcript + ' ';
          }
        }
        
        setLastSpeechTime(Date.now());
        
        if (finalText.trim()) {
          setFinalTranscript(prev => prev + finalText);
        }
        
        const timeoutId = setTimeout(() => {
          if (finalTranscript.trim() && !finalTranscript.trim().endsWith(',') && !finalTranscript.trim().endsWith('.')) {
            setFinalTranscript(prev => prev.trim() + ', ');
          }
        }, 3000);
        
        setSilenceTimeout(timeoutId);
      };
      
      speechRecognition.onerror = (event) => {
        console.error('Speech recognition error:', event.error);
        setIsTranscribing(false);
        
        if (event.error === 'network' && isRecording) {
          setTimeout(() => {
            try {
              speechRecognition.start();
              setIsTranscribing(true);
            } catch (error) {
              console.warn('Could not restart speech recognition:', error);
            }
          }, 1000);
        }
      };
      
      speechRecognition.onend = () => {
        setIsTranscribing(false);
        
        if (silenceTimeout) {
          clearTimeout(silenceTimeout);
          setSilenceTimeout(null);
        }
      };
      
      setRecognition(speechRecognition);
    }
  }, []);

  // Recording timer
  useEffect(() => {
    if (isRecording) {
      recordingInterval.current = setInterval(() => {
        setRecordingTime(prev => prev + 1);
      }, 1000);
    } else {
      clearInterval(recordingInterval.current);
    }

    return () => clearInterval(recordingInterval.current);
  }, [isRecording]);

  // Close on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.body.style.overflow = 'hidden';
      document.documentElement.style.overflowX = 'hidden';
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.body.style.overflow = 'unset';
      document.documentElement.style.overflowX = 'unset';
    };
  }, [isOpen, onClose]);

  // Close on Escape key
  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen, onClose]);

  // Cleanup audio players on unmount
  useEffect(() => {
    return () => {
      Object.values(audioPlayers).forEach(player => {
        try {
          if (player && player.dispose) {
            if (player.state === 'started') {
              player.stop();
            }
            player.dispose();
          }
        } catch (error) {
          console.warn('Error disposing audio player:', error);
        }
      });
    };
  }, [audioPlayers]);

  const handleSendComment = () => {
    if (newComment.trim() || recordedAudio) {
      const content = newComment.trim() || "Voice message";
      const newMessage = {
        id: Date.now(),
        type: "sent",
        user: "You",
        isVoice: recordedAudio ? true : false,
        content: content,
        duration: recordedAudio ? formatTime(recordedAudio.duration) : null,
        transcript: recordedAudio ? transcription || `Voice message recorded for ${formatTime(recordedAudio.duration)}` : content,
        audioUrl: recordedAudio ? recordedAudio.url : null,
        showReadMore: !recordedAudio && content.length > 200,
        expanded: false,
        timestamp: new Date().toLocaleString('en-US', {
          month: '2-digit',
          day: '2-digit',
          year: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
          hour12: true
        }) + ' WIB'
      };
      setMessages(prev => [...prev, newMessage]);
      setNewComment("");
      setRecordedAudio(null);
      setRecordingTime(0);
      setFinalTranscript("");
      setLastSpeechTime(null);
      if (silenceTimeout) {
        clearTimeout(silenceTimeout);
        setSilenceTimeout(null);
      }
    }
  };

  const handleSendVoiceMessage = () => {
    console.info(finalTranscript)
    if (recordedAudio) {
      const newVoiceMessage = {
        id: Date.now(),
        type: "sent",
        user: "You",
        isVoice: true,
        content: "Voice message",
        duration: formatTime(recordedAudio.duration),
        transcript: finalTranscript,
        audioUrl: recordedAudio.url,
        showReadMore: false,
        expanded: false,
        timestamp: new Date().toLocaleString('en-US', {
          month: '2-digit',
          day: '2-digit',
          year: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
          hour12: true
        }) + ' WIB'
      };
      setMessages(prev => [...prev, newVoiceMessage]);
      setRecordedAudio(null);
      setRecordingTime(0);
      setFinalTranscript("");
      setLastSpeechTime(null);
      if (silenceTimeout) {
        clearTimeout(silenceTimeout);
        setSilenceTimeout(null);
      }
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey && !isRecording && !recordedAudio) {
      e.preventDefault();
      handleSendComment();
    }
  };

  const startRecording = async () => {
    try {
      if (Tone.context.state !== 'running') {
        await Tone.start();
      }

      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const recorder = new MediaRecorder(stream);
      
      setAudioChunks([]);
      setMediaRecorder(recorder);
      setFinalTranscript("");
      setLastSpeechTime(null);
      if (silenceTimeout) {
        clearTimeout(silenceTimeout);
        setSilenceTimeout(null);
      }
      
      recorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          setAudioChunks(prev => [...prev, event.data]);
        }
      };
      
      recorder.onstop = () => {
        stream.getTracks().forEach(track => track.stop());
        if (recognition && isTranscribing) {
          recognition.stop();
        }
      };
      
      recorder.start(1000);
      setIsRecording(true);
      setRecordingTime(0);
      
      if (recognition) {
        setIsTranscribing(true);
        recognition.start();
      }
    } catch (error) {
      console.error('Error accessing microphone:', error);
      alert('Could not access microphone. Please check permissions.');
    }
  };

  const stopRecording = () => {
    if (mediaRecorder && mediaRecorder.state === 'recording') {
      mediaRecorder.stop();
    }
    if (recognition && isTranscribing) {
      recognition.stop();
    }
    
    if (silenceTimeout) {
      clearTimeout(silenceTimeout);
      setSilenceTimeout(null);
    }
    
    setIsRecording(false);
    setIsTranscribing(false);
  };

  useEffect(() => {
    if (mediaRecorder) {
      mediaRecorder.onstop = () => {
        if (audioChunks.length > 0) {
          const audioBlob = new Blob(audioChunks, { type: 'audio/wav' });
          const audioUrl = URL.createObjectURL(audioBlob);
          setRecordedAudio({
            blob: audioBlob,
            url: audioUrl,
            duration: recordingTime
          });
        }
        if (mediaRecorder.stream) {
          mediaRecorder.stream.getTracks().forEach(track => track.stop());
        }
      };
    }
  }, [mediaRecorder, audioChunks, recordingTime]);

  const toggleVoicePlay = async (messageId) => {
    const message = messages.find(msg => msg.id === messageId);
    
    if (playingVoice === messageId) {
      if (audioPlayers[messageId]) {
        try {
          if (audioPlayers[messageId].state === 'started') {
            audioPlayers[messageId].stop();
          }
          audioPlayers[messageId].dispose();
        } catch (error) {
          console.warn('Error stopping audio player:', error);
        }
        setAudioPlayers(prev => {
          const newPlayers = { ...prev };
          delete newPlayers[messageId];
          return newPlayers;
        });
      }
      setPlayingVoice(null);
      setPlayProgress(prev => ({ ...prev, [messageId]: 0 }));
    } else {
      if (playingVoice && audioPlayers[playingVoice]) {
        try {
          if (audioPlayers[playingVoice].state === 'started') {
            audioPlayers[playingVoice].stop();
          }
          audioPlayers[playingVoice].dispose();
        } catch (error) {
          console.warn('Error stopping previous audio player:', error);
        }
        setAudioPlayers(prev => {
          const newPlayers = { ...prev };
          delete newPlayers[playingVoice];
          return newPlayers;
        });
      }

      setPlayingVoice(messageId);
      setPlayProgress(prev => ({ ...prev, [messageId]: 0 }));

      try {
        if (Tone.context.state !== 'running') {
          await Tone.start();
        }

        if (message && message.audioUrl) {
          const player = new Tone.Player();
          player.toDestination();
          
          await player.load(message.audioUrl);
          
          const duration = message.duration ? parseInt(message.duration.split(':')[1]) : 5;
          let progressInterval;
          let startTime;
          
          player.onstop = () => {
            if (progressInterval) {
              clearInterval(progressInterval);
            }
            setPlayingVoice(null);
            setPlayProgress(prev => ({ ...prev, [messageId]: 0 }));
          };

          setAudioPlayers(prev => ({ ...prev, [messageId]: player }));
          
          player.start();
          startTime = Tone.now();
          
          progressInterval = setInterval(() => {
            if (player.state === 'started') {
              const elapsed = Tone.now() - startTime;
              const progress = Math.min((elapsed / duration) * 100, 100);
              setPlayProgress(prev => ({ ...prev, [messageId]: progress }));
              
              if (progress >= 100) {
                clearInterval(progressInterval);
                setPlayingVoice(null);
                setPlayProgress(prev => ({ ...prev, [messageId]: 0 }));
                if (player.state === 'started') {
                  player.stop();
                }
                player.dispose();
                setAudioPlayers(prev => {
                  const newPlayers = { ...prev };
                  delete newPlayers[messageId];
                  return newPlayers;
                });
              }
            }
          }, 100);
          
        } else {
          const duration = message ? parseInt(message.duration.split(':')[1]) * 1000 : 5000;
          const interval = setInterval(() => {
            setPlayProgress(prev => {
              const currentProgress = (prev[messageId] || 0) + (100 / (duration / 100));
              if (currentProgress >= 100) {
                clearInterval(interval);
                setPlayingVoice(null);
                return { ...prev, [messageId]: 0 };
              }
              return { ...prev, [messageId]: currentProgress };
            });
          }, 100);
        }
      } catch (error) {
        console.error('Error playing audio:', error);
        setPlayingVoice(null);
        setPlayProgress(prev => ({ ...prev, [messageId]: 0 }));
      }
    }
  };

  const toggleReadMore = (messageId) => {
    setMessages(prev => prev.map(msg => 
      msg.id === messageId ? { ...msg, expanded: !msg.expanded } : msg
    ));
  };

  const deleteMessage = (messageId) => {
    if (audioPlayers[messageId]) {
      try {
        if (audioPlayers[messageId].state === 'started') {
          audioPlayers[messageId].stop();
        }
        audioPlayers[messageId].dispose();
      } catch (error) {
        console.warn('Error cleaning up audio player:', error);
      }
      setAudioPlayers(prev => {
        const newPlayers = { ...prev };
        delete newPlayers[messageId];
        return newPlayers;
      });
    }
    
    if (playingVoice === messageId) {
      setPlayingVoice(null);
      setPlayProgress(prev => ({ ...prev, [messageId]: 0 }));
    }
    
    setMessages(prev => prev.filter(msg => msg.id !== messageId));
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const playRecordedAudioPreview = async () => {
    if (!recordedAudio) return;
    
    try {
      if (Tone.context.state !== 'running') {
        await Tone.start();
      }

      const player = new Tone.Player();
      player.toDestination();
      
      await player.load(recordedAudio.url);
      player.start();
      
      setTimeout(() => {
        try {
          if (player.state === 'started') {
            player.stop();
          }
          player.dispose();
        } catch (error) {
          console.warn('Error disposing preview player:', error);
        }
      }, recordedAudio.duration * 1000 + 1000);
    } catch (error) {
      console.error('Error playing preview:', error);
      try {
        const audio = new Audio(recordedAudio.url);
        audio.play();
      } catch (fallbackError) {
        console.error('Fallback audio also failed:', fallbackError);
      }
    }
  };

  const clearRecordedAudio = () => {
    setRecordedAudio(null);
    setFinalTranscript("");
    setRecordingTime(0);
    setLastSpeechTime(null);
    if (silenceTimeout) {
      clearTimeout(silenceTimeout);
      setSilenceTimeout(null);
    }
  };

  return (
    <>
      <div 
        className={`fixed inset-0 bg-black z-40 transition-all duration-300 ease-in-out ${
          isOpen ? 'opacity-50 visible' : 'opacity-0 invisible'
        }`} 
      />
      <div 
        ref={sidebarRef}
        className={`fixed top-0 right-0 h-full w-96 bg-white shadow-2xl z-50 transition-all duration-300 ease-in-out transform overflow-hidden ${
          isOpen ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'
        }`}
      >
        <div className="h-full flex flex-col border-l border-slate-200">
          <CommentHeader onClose={onClose} isOpen={isOpen} />
          <Messages 
            messages={messages}
            playingVoice={playingVoice}
            audioPlayers={audioPlayers}
            playProgress={playProgress}
            toggleVoicePlay={toggleVoicePlay}
            toggleReadMore={toggleReadMore}
            deleteMessage={deleteMessage}
            isOpen={isOpen}
          />
          {isRecording && (
            <RecordingIndicator 
              isRecording={isRecording}
              recordingTime={recordingTime}
              transcription={transcription}
              stopRecording={stopRecording}
            />
          )}
          {recordedAudio && !isRecording && (
            <RecordedAudioPreview 
              recordedAudio={recordedAudio}
              transcription={transcription}
              playRecordedAudioPreview={playRecordedAudioPreview}
              clearRecordedAudio={clearRecordedAudio}
              handleSendVoiceMessage={handleSendVoiceMessage}
            />
          )}
          {!recordedAudio&&!isRecording &&
            <InputArea 
              isRecording={isRecording}
              recordedAudio={recordedAudio}
              newComment={newComment}
              setNewComment={setNewComment}
              handleSendComment={handleSendComment}
              startRecording={startRecording}
              stopRecording={stopRecording}
              handleKeyPress={handleKeyPress}
            />
          }
          
        </div>
      </div>
    </>
  );
};

export default CommentSection;