import { useState, useRef, useEffect } from "react";
import { MoreHorizontal, Mic, Send, Play, Pause, X, Square, Trash2, ArrowUp } from "lucide-react";
// Header Component
export const CommentHeader = ({ onClose, isOpen }) => {
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
export const MessageItem = ({ message, index, playingVoice, audioPlayers, playProgress, toggleVoicePlay, toggleReadMore, deleteMessage, isOpen, isSurvey=false }) => {
  const renderWaveform = (messageId, isPlaying) => {
    const duration = message ? parseInt(message.duration?.split(':')[1]) * 1000 : 5000;
    const progress = playProgress[messageId] || 0;
    const wavve=isSurvey?15:29
    return (
      <div className="flex gap-1 items-end">
        {Array.from({ length: message.type === "sent" ? wavve : 30 }, (_, i) => {
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
      className={`pl-2 rounded-lg flex gap-2 transition-all duration-300 overflow-x-hidden ${
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
                      <p className="text-white text-sm font-normal font-['Inter'] leading-snug tracking-tight opacity-90 whitespace-pre-wrap break-words">
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
                <div className={`relative ${isSurvey?'max-w-[190px]':'max-w-[280px]'}`}>
                  <p className="text-white text-sm font-normal font-['Inter'] leading-snug tracking-tight opacity-90 whitespace-pre-wrap break-words">
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
export const Messages = ({ messages, playingVoice, audioPlayers, playProgress, toggleVoicePlay, toggleReadMore, deleteMessage, isOpen, isSurvey }) => {
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className={`flex-1 py-5 overflow-y-auto transition-all duration-300 delay-150 ${!isSurvey&&'px-4'} ${
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
            isSurvey={isSurvey}
          />
        ))}
        <div ref={messagesEndRef} />
      </div>
    </div>
  );
};

export const RealTimeWaveform = ({ isRecording, isSurvey }) => {
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
    <div className={`flex items-center justify-center gap-0.5 ${isSurvey?'h-8':'h-12'} overflow-hidden`}>
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

export const RecordingIndicator = ({ isRecording, recordingTime, transcription, stopRecording, mediaRecorder, isSurvey }) => {
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className={`${isSurvey?'px-1':'px-4'} py-5 transition-all duration-300 delay-200 transform translate-y-0 opacity-100`}>
  <div className="pl-5 pr-2 bg-red-50 py-2 rounded-full flex items-center gap-2.5 transition-all duration-200 hover:shadow-md focus-within:shadow-lg" style={{ borderColor: '#367abb' }}>
        <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse flex-shrink-0"></div>
        
        <div className="flex-1 min-w-0">
          <RealTimeWaveform isRecording={isRecording} isSurvey={isSurvey} />
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

export const RealTimeWaveform2 = ({ isPlaying, audioElement, color = "#367abb" }) => {
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
export const InputArea = ({ isRecording, recordedAudio, newComment, setNewComment, handleSendComment, startRecording, stopRecording, handleKeyPress, isSurvey, isMobile }) => {
  // Determine if we should show the mic icon or send icon
  const showSendIcon = newComment.trim() || recordedAudio;
  
  return (
    <div className={`${!isSurvey&&'px-4'} py-5 border-t border-slate-100 transition-all duration-300 delay-200 transform translate-y-0 opacity-100
    }`}>
      <div className={`pl-5 pr-2 ${!isSurvey?'py-2':isMobile?'py-3':'py-1'} rounded-full border flex items-center transition-all duration-200 hover:shadow-md focus-within:shadow-lg`} style={{ borderColor: '#367abb' }}>
        <div className="flex-1 flex items-center">
          <input
            type="text"
            value={recordedAudio ? "Voice message recorded" : newComment}
            onChange={(e) => !recordedAudio && setNewComment(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder={isRecording ? "Recording in progress..." : recordedAudio ? "Voice message ready to send" : "Write comment..."}
            className={`flex-1 text-zinc-700 text-sm font-normal font-['Inter'] leading-snug tracking-tight bg-transparent outline-none placeholder-zinc-500 transition-all duration-200 ${
              (isRecording || recordedAudio) ? 'cursor-not-allowed opacity-60' : ''
            }`}
            disabled={isRecording || recordedAudio}
            readOnly={recordedAudio}
          />
        </div>
        
        {/* Single icon button that changes based on state */}
        <button
          onClick={showSendIcon ? handleSendComment : (isRecording ? stopRecording : startRecording)}
          disabled={showSendIcon ? false : false} // Always enabled for mic/send functionality
          className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110 ${
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
          title={
            isRecording 
              ? "Stop recording" 
              : showSendIcon 
                ? (recordedAudio ? "Send voice message" : "Send message")
                : "Start voice recording"
          }
        >
          {isRecording ? (
            <Square className="w-4 h-4 text-white" />
          ) : showSendIcon ? (
            <ArrowUp className="w-5 h-5 text-white" />
          ) : (
            <Mic className="w-4 h-4 text-white" />
          )}
        </button>
      </div>
    </div>
  );
};