import React from 'react';
import { CardConfig, HorizontalAlign, VerticalAlign, Theme, FontFamily, AspectRatio } from '../types';
import { 
  AlignLeft, 
  AlignCenter, 
  AlignRight, 
  AlignJustify,
  ArrowUpToLine,
  ArrowDownToLine,
  MoveVertical,
  Type,
  Palette,
  LayoutTemplate,
  Video
} from 'lucide-react';

interface ControlsProps {
  config: CardConfig;
  onChange: (newConfig: CardConfig) => void;
  onExport: () => void;
  isExporting: boolean;
}

const Controls: React.FC<ControlsProps> = ({ config, onChange, onExport, isExporting }) => {
  
  const updateConfig = <K extends keyof CardConfig>(key: K, value: CardConfig[K]) => {
    onChange({ ...config, [key]: value });
  };

  const themes: { id: Theme; label: string; color: string }[] = [
    { id: 'pacman', label: 'Pac-Man', color: 'bg-[#5ac4f3]' },
    { id: 'snake', label: 'Snake', color: 'bg-[#a569bd]' },
    { id: 'mario', label: 'Mario', color: 'bg-[#74c365]' },
  ];

  const fonts: { id: FontFamily; label: string }[] = [
    { id: 'Press Start 2P', label: 'Arcade' },
    { id: 'Jersey 15', label: 'Jersey 15' },
    { id: 'VT323', label: 'VT323' },
    { id: 'Oswald', label: 'Oswald' },
  ];

  const ratios: { id: AspectRatio; label: string; width: string; height: string }[] = [
    { id: '9/16', label: 'Story (9:16)', width: '12px', height: '20px' },
    { id: '4/5', label: 'Portrait (4:5)', width: '14px', height: '18px' },
    { id: '1/1', label: 'Square (1:1)', width: '18px', height: '18px' },
    { id: '16/9', label: 'Wide (16:9)', width: '20px', height: '12px' },
  ];

  return (
    <div className="w-full h-full bg-white/90 backdrop-blur-sm border-r border-gray-200 p-6 flex flex-col gap-8 overflow-y-auto">
      <div>
        <h2 className="text-xl font-bold text-gray-800 mb-1 font-arcade uppercase tracking-tighter">Settings</h2>
        <p className="text-xs text-gray-500 mb-6">Customize your animation card</p>
      </div>

      {/* Theme Selector */}
      <div className="space-y-3">
        <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider flex items-center gap-2">
          <Palette size={14} /> Theme
        </label>
        <div className="grid grid-cols-3 gap-3">
          {themes.map((theme) => (
            <button
              key={theme.id}
              onClick={() => updateConfig('theme', theme.id)}
              className={`group relative aspect-square rounded-lg overflow-hidden border-2 transition-all ${
                config.theme === theme.id 
                  ? 'border-blue-500 ring-2 ring-blue-200 scale-105' 
                  : 'border-transparent hover:border-gray-300'
              }`}
            >
              <div className={`w-full h-full ${theme.color} opacity-80 group-hover:opacity-100 transition-opacity`}></div>
              <span className="absolute bottom-0 left-0 right-0 bg-black/50 text-white text-[9px] py-1 text-center font-arcade">
                {theme.label}
              </span>
            </button>
          ))}
        </div>
      </div>

      <hr className="border-gray-200" />

      {/* Aspect Ratio Selector */}
      <div className="space-y-3">
        <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider flex items-center gap-2">
          <LayoutTemplate size={14} /> Format
        </label>
        <div className="grid grid-cols-2 gap-2">
          {ratios.map((ratio) => (
            <button
              key={ratio.id}
              onClick={() => updateConfig('aspectRatio', ratio.id)}
              className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-all border ${
                config.aspectRatio === ratio.id
                  ? 'bg-white border-blue-500 text-blue-600 shadow-sm ring-1 ring-blue-200'
                  : 'bg-gray-50 border-gray-200 text-gray-600 hover:bg-gray-100'
              }`}
            >
              <div className="w-6 h-6 flex items-center justify-center bg-gray-200 rounded">
                <div 
                  className="bg-gray-500 rounded-[1px]" 
                  style={{ width: ratio.width, height: ratio.height }}
                ></div>
              </div>
              <span className="font-medium">{ratio.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Text Input */}
      <div className="space-y-3">
        <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Content</label>
        <div className="relative">
          <textarea 
            value={config.text}
            onChange={(e) => updateConfig('text', e.target.value)}
            className="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-3 pr-10 leading-loose min-h-[100px] resize-none"
            style={{ fontFamily: config.font }}
            placeholder="Enter text..."
          />
          <Type className="absolute top-3 right-3 text-gray-400 w-4 h-4" />
        </div>
      </div>

      {/* Font Selector */}
      <div className="space-y-3">
        <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Font</label>
        <div className="grid grid-cols-2 gap-2">
          {fonts.map((font) => (
            <button
              key={font.id}
              onClick={() => updateConfig('font', font.id)}
              className={`px-3 py-2 rounded-lg text-lg transition-all border ${
                config.font === font.id
                  ? 'bg-white border-blue-500 text-blue-600 shadow-sm ring-1 ring-blue-200'
                  : 'bg-gray-50 border-gray-200 text-gray-600 hover:bg-gray-100'
              }`}
              style={{ fontFamily: font.id }}
            >
              {font.label}
            </button>
          ))}
        </div>
      </div>

      {/* Size Slider */}
      <div className="space-y-3">
        <div className="flex justify-between items-center">
          <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Size</label>
          <span className="text-xs font-mono bg-gray-100 px-2 py-1 rounded text-gray-600">{config.textSize}px</span>
        </div>
        <input 
          type="range" 
          min="12" 
          max="128" 
          value={config.textSize} 
          onChange={(e) => updateConfig('textSize', Number(e.target.value))}
          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-500"
        />
      </div>

      {/* Vertical Position */}
      <div className="space-y-3">
        <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Vertical Position</label>
        <div className="flex bg-gray-100 p-1 rounded-lg">
          {(['start', 'center', 'end'] as VerticalAlign[]).map((pos) => (
            <button
              key={pos}
              onClick={() => updateConfig('verticalAlign', pos)}
              className={`flex-1 flex justify-center items-center py-2 rounded-md transition-all ${
                config.verticalAlign === pos 
                  ? 'bg-white shadow-sm text-blue-600' 
                  : 'text-gray-400 hover:text-gray-600'
              }`}
              title={`Align ${pos}`}
            >
              {pos === 'start' && <ArrowUpToLine size={18} />}
              {pos === 'center' && <MoveVertical size={18} />}
              {pos === 'end' && <ArrowDownToLine size={18} />}
            </button>
          ))}
        </div>
      </div>

      {/* Text Alignment */}
      <div className="space-y-3">
        <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Text Align</label>
        <div className="flex bg-gray-100 p-1 rounded-lg">
          {(['left', 'center', 'right', 'justify'] as HorizontalAlign[]).map((align) => (
            <button
              key={align}
              onClick={() => updateConfig('horizontalAlign', align)}
              className={`flex-1 flex justify-center items-center py-2 rounded-md transition-all ${
                config.horizontalAlign === align 
                  ? 'bg-white shadow-sm text-blue-600' 
                  : 'text-gray-400 hover:text-gray-600'
              }`}
              title={`Align ${align}`}
            >
              {align === 'left' && <AlignLeft size={18} />}
              {align === 'center' && <AlignCenter size={18} />}
              {align === 'right' && <AlignRight size={18} />}
              {align === 'justify' && <AlignJustify size={18} />}
            </button>
          ))}
        </div>
      </div>

      <div className="pt-4 mt-auto">
        <button
          onClick={onExport}
          disabled={isExporting}
          className={`w-full py-3 px-4 rounded-xl flex items-center justify-center gap-2 font-bold text-white transition-all transform active:scale-95 shadow-lg ${
            isExporting 
              ? 'bg-gray-400 cursor-wait' 
              : 'bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 shadow-blue-500/30'
          }`}
        >
          <Video size={20} />
          {isExporting ? 'Recording...' : 'Export HD Video'}
        </button>
        <p className="text-[10px] text-gray-400 text-center mt-2">
          Select "This Tab" when prompted.
        </p>
      </div>
    </div>
  );
};

export default Controls;