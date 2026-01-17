import React from 'react';
import { CardConfig } from '../types';

interface PacmanCardProps {
  config: CardConfig;
}

const PacmanCard: React.FC<PacmanCardProps> = ({ config }) => {
  // Translate alignment types to Tailwind/CSS classes
  const getJustifyContent = () => {
    switch (config.verticalAlign) {
      case 'start': return 'justify-start';
      case 'center': return 'justify-center';
      case 'end': return 'justify-end';
      default: return 'justify-center';
    }
  };

  const getTextAlign = () => {
    switch (config.horizontalAlign) {
      case 'left': return 'text-left';
      case 'center': return 'text-center';
      case 'right': return 'text-right';
      case 'justify': return 'text-justify';
      default: return 'text-left';
    }
  };

  const getThemeClass = () => {
    switch (config.theme) {
      case 'snake': return 'bg-theme-snake';
      case 'mario': return 'bg-theme-mario';
      default: return 'bg-theme-pacman';
    }
  };

  // Optimize element sizing based on aspect ratio to match visual balance
  const getElementSizeClass = () => {
    switch (config.theme) {
      case 'pacman':
        switch (config.aspectRatio) {
          case '9/16': return 'w-[80%]'; // Tall phone screen
          case '4/5': return 'w-[60%]';  // Social post
          case '1/1': return 'w-[50%]';  // Square
          case '16/9': return 'w-[30%]'; // Landscape
          default: return 'w-[80%]';
        }
      case 'mario':
        switch (config.aspectRatio) {
          case '9/16': return 'w-[90%]'; // Fill width more on tall screens
          case '4/5': return 'w-[70%]';
          case '1/1': return 'w-[55%]';
          case '16/9': return 'w-[30%]';
          default: return 'w-[60%]';
        }
      default:
        return 'w-full';
    }
  };

  // Optimize vertical height/spacing for the Snake footer
  const getSnakeHeightClass = () => {
    switch (config.aspectRatio) {
      case '9/16': return 'h-[15%]'; // Take up less vertical space on tall screens
      case '4/5': return 'h-[18%]';
      case '1/1': return 'h-[22%]';
      case '16/9': return 'h-[30%]'; // Take up more % of height on short screens
      default: return 'h-[20%]';
    }
  };

  const renderAnimation = () => {
    const sizeClass = getElementSizeClass();

    switch (config.theme) {
      case 'snake':
        const heightClass = getSnakeHeightClass();
        return (
          <div className={`absolute bottom-0 left-0 w-full ${heightClass} overflow-hidden pointer-events-none`}>
            {/* Snake Body (Simple Blocks) */}
            <svg viewBox="0 0 400 100" className="w-full h-full" preserveAspectRatio="xMidYMid meet">
              <g className="snake-body">
                {/* Tail segments */}
                <rect x="0" y="40" width="30" height="30" fill="#0f380f" className="snake-tail"/>
                <rect x="35" y="40" width="30" height="30" fill="#0f380f"/>
                <rect x="70" y="40" width="30" height="30" fill="#0f380f"/>
                <rect x="105" y="40" width="30" height="30" fill="#0f380f"/>
                {/* Head */}
                <rect x="140" y="40" width="30" height="30" fill="#0f380f"/>
                <rect x="155" y="45" width="5" height="5" fill="#8bac0f"/> {/* Eye */}
                <rect x="168" y="52" width="10" height="4" fill="#8bac0f"/> {/* Tongue */}
              </g>
              
              {/* Apple */}
              <g transform="translate(300, 40)">
                 <rect x="5" y="5" width="20" height="20" rx="4" fill="#0f380f"/>
                 <rect x="12" y="0" width="4" height="6" fill="#0f380f"/>
              </g>
            </svg>
          </div>
        );
      case 'mario':
        return (
          // Anchored to bottom-right with 0 offset to sit on the edge
          <div className={`absolute bottom-0 right-0 ${sizeClass} aspect-square z-20 pointer-events-none`}>
            <svg viewBox="0 0 100 100" className="w-full h-full overflow-visible mario-sprite">
              {/* 
                  8-bit Mario Representation 
                  Adjusted transforms to align feet to Y=100 (bottom of SVG box)
                  Scale 3x implies height ~36 units. 100 - 36 = 64 start Y.
                  Shifted X to 45 to act as "Right Align" within the box.
              */}
              <g transform="translate(45, 64) scale(3)">
                 {/* Hat (Red) */}
                 <rect x="3" y="0" width="5" height="1" fill="#E52521" />
                 <rect x="2" y="1" width="9" height="1" fill="#E52521" />
                 
                 {/* Face (Skin) */}
                 <rect x="2" y="2" width="7" height="1" fill="#FBD000" />
                 <rect x="2" y="3" width="1" height="1" fill="#FBD000" />
                 <rect x="4" y="3" width="1" height="1" fill="#FBD000" />
                 <rect x="6" y="3" width="3" height="1" fill="#FBD000" />
                 <rect x="1" y="4" width="1" height="1" fill="#FBD000" />
                 <rect x="3" y="4" width="1" height="1" fill="#FBD000" />
                 <rect x="5" y="4" width="3" height="1" fill="#FBD000" />

                 {/* Hair/Mustache (Brown/Black) */}
                 <rect x="2" y="3" width="1" height="1" fill="#430" />
                 <rect x="3" y="3" width="1" height="2" fill="#430" />
                 <rect x="2" y="4" width="1" height="1" fill="#430" />
                 <rect x="4" y="4" width="1" height="1" fill="#430" />
                 <rect x="9" y="3" width="1" height="1" fill="#430" /> {/* Ear */}

                 {/* Body (Blue/Red) */}
                 <rect x="2" y="5" width="6" height="1" fill="#E52521" />
                 <rect x="1" y="6" width="3" height="1" fill="#E52521" />
                 <rect x="5" y="6" width="4" height="1" fill="#E52521" />
                 
                 {/* Overalls (Blue) */}
                 <rect x="4" y="6" width="1" height="1" fill="#0000AA" />
                 <rect x="1" y="7" width="8" height="1" fill="#0000AA" />
                 <rect x="0" y="8" width="10" height="2" fill="#0000AA" />
                 
                 {/* Buttons (Yellow) */}
                 <rect x="2" y="7" width="1" height="1" fill="#FBD000" />
                 <rect x="7" y="7" width="1" height="1" fill="#FBD000" />
                 
                 {/* Shoes (Brown) */}
                 <rect x="0" y="10" width="3" height="2" fill="#430" />
                 <rect x="7" y="10" width="3" height="2" fill="#430" />
              </g>
              {/* 
                 Question Block 
                 Positioned relative to new Mario position.
                 X: 45 (mario) + 40 offset = 85.
                 Y: 64 (mario) - 40 offset = 24.
              */}
              <g transform="translate(85, 24) scale(2)">
                <rect x="0" y="0" width="16" height="16" fill="#FBD000" stroke="black" strokeWidth="1"/>
                <path d="M4,4 h8 v2 h-2 v2 h-2 v2 h2 v2 h-2 v-2 h2 v-2 h2 v-4 h-8 z" fill="#d97b00" />
                <rect x="7" y="12" width="2" height="2" fill="#d97b00" />
                <rect x="1" y="1" width="1" height="1" fill="white" opacity="0.5"/>
              </g>
            </svg>
          </div>
        );
      default: // Pacman
        return (
          <div className={`absolute bottom-[-10%] left-1/2 -translate-x-1/2 ${sizeClass} aspect-square z-20 pointer-events-none`}>
            <svg viewBox="0 0 200 200" className="w-full h-full overflow-visible">
              <g transform="rotate(-90 100 100)">
                <path d="M100,100 L200,100 A100,100 0 0,0 0,100 Z" fill="#FFD700" stroke="black" strokeWidth="6" className="pacman-jaw-top"/>
                <path d="M100,100 L0,100 A100,100 0 0,0 200,100 Z" fill="#FFD700" stroke="black" strokeWidth="6" className="pacman-jaw-bottom"/>
                <circle cx="100" cy="45" r="10" fill="#1a1a1a" className="pacman-jaw-top"/>
              </g>
            </svg>
          </div>
        );
    }
  }

  // Determine container dimensions based on aspect ratio
  // We prefer height-based sizing for portrait/square, and width-based for landscape
  const isLandscape = config.aspectRatio === '16/9';

  return (
    <div className="relative w-full h-full flex items-center justify-center p-8 bg-gray-900/50">
      <div 
        className={`relative ${getThemeClass()} shadow-2xl overflow-hidden rounded-xl border-4 border-white/20 transition-all duration-500`}
        style={{
          aspectRatio: config.aspectRatio,
          height: isLandscape ? 'auto' : 'min(85vh, 800px)',
          width: isLandscape ? 'min(85vw, 1200px)' : 'auto',
          maxHeight: '90vh',
          maxWidth: '90vw'
        }}
      >
        {/* Content Layer */}
        <div className={`absolute inset-0 flex flex-col z-10 p-8 pb-32 ${getJustifyContent()}`}>
          <h1 
            className={`text-white drop-shadow-[0_4px_4px_rgba(0,0,0,0.5)] leading-relaxed ${getTextAlign()}`}
            style={{ 
              fontSize: `${config.textSize}px`,
              fontFamily: config.font
            }}
          >
            {config.text}
          </h1>
        </div>

        {/* Animation Layer */}
        {renderAnimation()}
      </div>
    </div>
  );
};

export default PacmanCard;