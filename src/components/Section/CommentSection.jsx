import { useState, useRef, useEffect } from "react";
import { MoreHorizontal, Mic, Send, Play, Pause, X, MicOff, Square } from "lucide-react";
import * as Tone from 'tone';

const CommentSection = ({ isOpen = true, onClose = () => {} }) => {
  const [newComment, setNewComment] = useState("");
  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [recordedAudio, setRecordedAudio] = useState(null);
  const [mediaRecorder, setMediaRecorder] = useState(null);
  const [audioChunks, setAudioChunks] = useState([]);
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: "received",
      user: "Affandy",
      avatar: "https://placehold.co/32x32/3b82f6/ffffff?text=A",
      isVoice: false,
      content: "Hey everyone! Just wanted to share some thoughts on the latest project updates and discuss the roadmap for the next quarter. I've been reviewing all the feedback from our stakeholders and I think we're in a really good position to move forward with the implementation phase.",
      showReadMore: true,
      expanded: false,
      timestamp: "06/30/2025 06:11 PM WIB"
    },
    {
      id: 2,
      type: "received",
      user: "Miftahul Faizin",
      avatar: "https://placehold.co/32x32/10b981/ffffff?text=M",
      isVoice: true,
      content: "Lorem ipsum dolor sit amet consectetur. Id consectetur.",
      duration: "00:05",
      transcript: "Thanks for the update! I think we're making great progress on this. The team collaboration has been excellent.",
      timestamp: "06/30/2025 06:11 PM WIB"
    },
    {
      id: 3,
      type: "received",
      user: "Miftahul Faizin",
      avatar: "https://placehold.co/32x32/10b981/ffffff?text=M",
      isVoice: true,
      content: "Lorem ipsum dolor sit amet consectetur. Fermentum adipiscing vitae leo risus vel. Faucibus sed sed eget nibh eget. Id blandit sem interdum viverra. Ipsum co......",
      duration: "00:12",
      transcript: "I wanted to elaborate on the previous point. The implementation details we discussed last week are now clearer, and I believe we can move forward with confidence. The technical challenges we faced initially have been resolved through collaborative problem-solving.",
      showReadMore: true,
      expanded: false,
      timestamp: "06/30/2025 06:11 PM WIB"
    },
    {
      id: 4,
      type: "sent",
      user: "You",
      content: "Absolutely agree! Looking forward to seeing the final results and excited to see how this impacts our user engagement metrics. I believe this could be a game-changer for our platform and significantly improve the overall user experience we're trying to achieve.",
      showReadMore: true,
      expanded: false,
      timestamp: "06/30/2025 06:11 PM WIB"
    }
  ]);

  const [playingVoice, setPlayingVoice] = useState(null);
  const [playProgress, setPlayProgress] = useState({});
  const [audioPlayers, setAudioPlayers] = useState({});
  const sidebarRef = useRef(null);
  const recordingInterval = useRef(null);
  const messagesEndRef = useRef(null);

  // Initialize Tone.js
  useEffect(() => {
    const initTone = async () => {
      if (Tone.context.state !== 'running') {
        await Tone.start();
      }
    };
    initTone();
  }, []);

  // Auto-scroll to bottom when new messages are added
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

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

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

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
        transcript: newComment.trim() || `Voice message recorded for ${recordedAudio ? formatTime(recordedAudio.duration) : '0:00'}`,
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
    }
  };

  const handleSendVoiceMessage = () => {
    if (recordedAudio) {
      const newVoiceMessage = {
        id: Date.now(),
        type: "sent",
        user: "You",
        isVoice: true,
        content: "Voice message",
        duration: formatTime(recordedAudio.duration),
        transcript: `Voice message recorded for ${formatTime(recordedAudio.duration)}`,
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
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendComment();
    }
  };

  const startRecording = async () => {
    try {
      // Ensure Tone.js is started
      if (Tone.context.state !== 'running') {
        await Tone.start();
      }

      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const recorder = new MediaRecorder(stream);
      
      setAudioChunks([]);
      setMediaRecorder(recorder);
      
      recorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          setAudioChunks(prev => [...prev, event.data]);
        }
      };
      
      recorder.onstop = () => {
        stream.getTracks().forEach(track => track.stop());
      };
      
      recorder.start(1000);
      setIsRecording(true);
      setRecordingTime(0);
    } catch (error) {
      console.error('Error accessing microphone:', error);
      alert('Could not access microphone. Please check permissions.');
    }
  };

  const stopRecording = () => {
    if (mediaRecorder && mediaRecorder.state === 'recording') {
      mediaRecorder.stop();
    }
    setIsRecording(false);
  };

  // Handle recording completion
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
      // Stop current playback
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
      // Stop any currently playing audio
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
        // Ensure Tone.js is started
        if (Tone.context.state !== 'running') {
          await Tone.start();
        }

        if (message && message.audioUrl) {
          // Create a new Tone.js Player for real recorded audio
          const player = new Tone.Player();
          player.toDestination();
          
          // Wait for the player to load
          await player.load(message.audioUrl);
          
          // Set up progress tracking
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
          
          // Start playing
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
          // Simulate playback for messages without real audio
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
    // Clean up audio player if exists
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

  const renderWaveform = (messageId, isPlaying) => {
    const message = messages.find(msg => msg.id === messageId);
    const duration = message ? parseInt(message.duration.split(':')[1]) * 1000 : 5000;
    const progress = playProgress[messageId] || 0;

    return (
      <div className="flex gap-1 items-end">
        {Array.from({ length: 30 }, (_, i) => {
          const heights = ['h-6', 'h-3', 'h-4', 'h-5', 'h-3', 'h-2', 'h-3.5', 'h-2.5', 'h-5', 'h-2.5'];
          const barProgress = (i / 30) * 100;
          const isActive = isPlaying && barProgress <= progress;
          
          return (
            <div
              key={i}
              className={`w-0 ${heights[i % heights.length]} border-r-2 transition-colors duration-100 ${
                isActive ? 'border-cyan-800' : 'border-cyan-600'
              }`}
            />
          );
        })}
      </div>
    );
  };

  const playRecordedAudioPreview = async () => {
    if (!recordedAudio) return;
    
    try {
      if (Tone.context.state !== 'running') {
        await Tone.start();
      }

      const player = new Tone.Player();
      player.toDestination();
      
      // Load and play the audio
      await player.load(recordedAudio.url);
      player.start();
      
      // Clean up after playing
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
      // Fallback to regular HTML5 audio
      try {
        const audio = new Audio(recordedAudio.url);
        audio.play();
      } catch (fallbackError) {
        console.error('Fallback audio also failed:', fallbackError);
      }
    }
  };

  return (
    <>
      {/* Animated Backdrop */}
      <div 
        className={`fixed inset-0 bg-black z-40 transition-all duration-300 ease-in-out ${
          isOpen ? 'opacity-50 visible' : 'opacity-0 invisible'
        }`} 
      />
      
      {/* Animated Comment Sidebar */}
      <div 
        ref={sidebarRef}
        className={`fixed top-0 right-0 h-full w-96 bg-white shadow-2xl z-50 transition-all duration-300 ease-in-out transform overflow-hidden ${
          isOpen ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'
        }`}
      >
        <div className="h-full flex flex-col border-l border-slate-200">
          {/* Animated Header */}
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

          {/* Animated Chat Messages - Scrollable */}
          <div className={`flex-1 px-4 py-5 overflow-y-auto transition-all duration-300 delay-150 ${
            isOpen ? 'transform translate-y-0 opacity-100' : 'transform translate-y-4 opacity-0'
          }`}>
            <div className="space-y-1">
              {messages.map((message, index) => (
                <div 
                  key={message.id} 
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
                            <div className="absolute left-0 top-8 invisible group-hover:visible opacity-0 group-hover:opacity-100 bg-white border border-gray-200 rounded-lg shadow-lg py-1 z-10 transition-all duration-200 transform translate-y-1 group-hover:translate-y-0">
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
                                  <div className="flex gap-1 items-end">
                                    {Array.from({ length: 29 }, (_, i) => {
                                      const heights = ['h-4', 'h-2', 'h-3', 'h-4', 'h-2', 'h-1.5', 'h-3', 'h-2', 'h-4', 'h-2'];
                                      const barProgress = (i / 29) * 100;
                                      const progress = playProgress[message.id] || 0;
                                      const isActive = playingVoice === message.id && barProgress <= progress;
                                      
                                      return (
                                        <div
                                          key={i}
                                          className={`w-0 ${heights[i % heights.length]} border-r-2 transition-colors duration-100 ${
                                            isActive ? 'border-blue-200' : 'border-white'
                                          } opacity-80`}
                                        />
                                      );
                                    })}
                                  </div>
                                </div>
                                <span className="text-white text-xs opacity-80">
                                  {message.duration}
                                </span>
                              </div>
                              {message.content && message.content !== "Voice message" && (
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
              ))}
              <div ref={messagesEndRef} />
            </div>
          </div>

          {/* Animated Recording indicator */}
          {isRecording && (
            <div className={`px-4 py-2 bg-red-50 border-t border-red-200 transition-all duration-300 ${
              isRecording ? 'transform translate-y-0 opacity-100' : 'transform translate-y-4 opacity-0'
            }`}>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                  <span className="text-red-600 text-sm font-medium">Recording... {formatTime(recordingTime)}</span>
                </div>
                <button
                  onClick={stopRecording}
                  className="px-3 py-1 bg-red-500 text-white text-sm rounded-full hover:bg-red-600 transition-all duration-200 hover:scale-105"
                >
                  Stop
                </button>
              </div>
            </div>
          )}

          {/* Animated Recorded audio preview */}
          {recordedAudio && !isRecording && (
            <div className={`px-4 py-2 bg-blue-50 border-t border-blue-200 transition-all duration-300 ${
              recordedAudio && !isRecording ? 'transform translate-y-0 opacity-100' : 'transform translate-y-4 opacity-0'
            }`}>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <button
                    onClick={playRecordedAudioPreview}
                    className="p-1 rounded-full transition-all duration-200 hover:scale-110"
                    style={{ backgroundColor: '#367abb' }}
                  >
                    <Play className="w-3 h-3 text-white" />
                  </button>
                  <span className="text-sm text-gray-600">Voice message ({formatTime(recordedAudio.duration)})</span>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => setRecordedAudio(null)}
                    className="px-3 py-1 bg-gray-500 text-white text-sm rounded-full hover:bg-gray-600 transition-all duration-200 hover:scale-105"
                  >
                    Delete
                  </button>
                  <button
                    onClick={handleSendVoiceMessage}
                    className="px-3 py-1 text-white text-sm rounded-full transition-all duration-200 hover:scale-105"
                    style={{ backgroundColor: '#367abb' }}
                    onMouseEnter={(e) => e.target.style.backgroundColor = '#2d5f94'}
                    onMouseLeave={(e) => e.target.style.backgroundColor = '#367abb'}
                  >
                    Send
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Animated Input Area */}
          <div className={`px-4 py-5 border-t border-slate-100 transition-all duration-300 delay-200 ${
            isOpen ? 'transform translate-y-0 opacity-100' : 'transform translate-y-4 opacity-0'
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
                >
                  {isRecording ? (
                    <Square className="w-4 h-4 text-white" />
                  ) : (
                    <Mic className="w-4 h-4 text-white" />
                  )}
                </button>
                <input
                  type="text"
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Enter your comment"
                  className="flex-1 text-zinc-700 text-sm font-normal font-['Inter'] leading-snug tracking-tight bg-transparent outline-none placeholder-zinc-500 transition-all duration-200"
                  disabled={isRecording}
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
                title={newComment.trim() && recordedAudio ? "Send text + voice message" : newComment.trim() ? "Send text message" : recordedAudio ? "Send voice message" : "Type or record to send"}
              >
                <Send className="w-5 h-5 text-white" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CommentSection;