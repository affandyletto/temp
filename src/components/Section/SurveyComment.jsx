import { useState, useRef, useEffect } from "react";
import { MoreHorizontal, Mic, Send, Play, Pause, X, Square, Trash2, ArrowUp } from "lucide-react";
import * as Tone from 'tone';
import { CommentHeader, MessageItem, Messages, RealTimeWaveform, RecordingIndicator, RealTimeWaveform2, InputArea } from "./CommentComponents"


// Main CommentSection Component
const SurveyComment = ({ isOpen = true, onClose = () => {}, isHistory=false }) => {
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
        <div className="space-y-4 overflow-y-auto">
          <Messages 
            messages={messages}
            playingVoice={playingVoice}
            audioPlayers={audioPlayers}
            playProgress={playProgress}
            toggleVoicePlay={toggleVoicePlay}
            toggleReadMore={toggleReadMore}
            deleteMessage={deleteMessage}
            isOpen={isOpen}
            isSurvey={true}
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
          {!recordedAudio&&!isRecording &&!isHistory&&
            <InputArea 
            	isSurvey={true}
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
    </>
  );
};

export default SurveyComment;