import React, { useState } from 'react';
import PacmanCard from './components/PacmanCard';
import Controls from './components/Controls';
import { CardConfig } from './types';

const App: React.FC = () => {
  const [config, setConfig] = useState<CardConfig>({
    text: 'Not a\nbootcamp.',
    textSize: 24,
    horizontalAlign: 'center',
    verticalAlign: 'center',
    padding: 32,
    theme: 'pacman',
    font: 'Press Start 2P',
    aspectRatio: '9/16'
  });

  // State machine for recording process
  const [recordingStatus, setRecordingStatus] = useState<'idle' | 'selecting' | 'recording' | 'processing'>('idle');
  
  // Derived state for UI modes
  const isRecordingMode = recordingStatus !== 'idle';

  const startRecording = async () => {
    try {
      setRecordingStatus('selecting');
      
      // Request screen share (allows user to select 'This Tab')
      const stream = await navigator.mediaDevices.getDisplayMedia({
        video: { 
          displaySurface: 'browser',
          // @ts-ignore - non-standard constraint but helps in some browsers
          preferCurrentTab: true,
          width: { ideal: 1920 },
          height: { ideal: 1080 },
          frameRate: { ideal: 60 }
        },
        audio: false
      });
      
      // Enter "Recording Mode" - Hide UI, maximize card
      setRecordingStatus('recording');
      
      const mediaRecorder = new MediaRecorder(stream, { 
        mimeType: MediaRecorder.isTypeSupported('video/webm;codecs=vp9') 
          ? 'video/webm;codecs=vp9' 
          : 'video/webm' 
      });
      
      const chunks: Blob[] = [];
      
      mediaRecorder.ondataavailable = (e) => {
        if (e.data.size > 0) chunks.push(e.data);
      };
      
      mediaRecorder.onstop = () => {
        setRecordingStatus('processing');
        const blob = new Blob(chunks, { type: 'video/webm' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `pac-card-${config.theme}-${Date.now()}.webm`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        
        // Cleanup
        stream.getTracks().forEach(track => track.stop());
        setRecordingStatus('idle');
      };
      
      // Wait a moment for the UI to hide and layout to stabilize
      setTimeout(() => {
        if (mediaRecorder.state === 'inactive') {
             mediaRecorder.start();
        }
        
        // Record for 6 seconds (covers most loop cycles comfortably)
        setTimeout(() => {
          if (mediaRecorder.state === 'recording') {
            mediaRecorder.stop();
          }
        }, 6000);
      }, 800);
      
    } catch (err) {
      console.error("Recording failed or cancelled", err);
      setRecordingStatus('idle');
    }
  };

  return (
    <div className={`flex flex-col md:flex-row h-screen w-screen overflow-hidden ${isRecordingMode ? 'bg-black' : 'bg-gray-50'}`}>
      
      {/* Controls Sidebar - Hidden during recording */}
      {!isRecordingMode && (
        <div className="w-full md:w-[340px] h-[30%] md:h-full z-20 shadow-xl shrink-0">
          <Controls 
            config={config} 
            onChange={setConfig} 
            onExport={startRecording}
            isExporting={isRecordingMode}
          />
        </div>
      )}

      {/* Main Preview Area */}
      <div className={`flex-1 relative transition-all duration-500 ${
          isRecordingMode 
            ? 'h-full flex items-center justify-center bg-black' 
            : 'h-[70%] md:h-full bg-gray-200 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px]'
        }`}
      >
        {!isRecordingMode && (
          <div className="absolute top-4 left-4 z-10 bg-white/80 px-3 py-1 rounded-full text-xs font-mono text-gray-500 pointer-events-none">
            Preview: {config.aspectRatio} Aspect Ratio
          </div>
        )}

        {/* 
          During recording, we remove the container constraints to let the card scale up 
          as much as possible within the viewport for higher resolution capture 
        */}
        <div className={isRecordingMode ? 'scale-125 transform-gpu' : ''}>
          <PacmanCard config={config} />
        </div>
      </div>

    </div>
  );
};

export default App;