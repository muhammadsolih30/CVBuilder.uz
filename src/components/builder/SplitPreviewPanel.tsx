import React, { useState } from 'react';
import { CVData } from '@/types/cv';
import CVPreview from './CVPreview';
import { Button } from '@/components/ui/button';
import { ZoomIn, ZoomOut, Maximize2, Minimize2, RotateCcw } from 'lucide-react';

interface Props {
  data: CVData;
  onExpand: () => void;
}

export default function SplitPreviewPanel({ data, onExpand }: Props) {
  const [zoomLevel, setZoomLevel] = useState(0.85);

  const handleZoomIn = () => setZoomLevel(prev => Math.min(1.3, prev + 0.1));
  const handleZoomOut = () => setZoomLevel(prev => Math.max(0.5, prev - 0.1));
  const handleResetZoom = () => setZoomLevel(0.85);

  return (
    <div className="h-full flex flex-col bg-muted/30 border-l border-border relative overflow-hidden">
      {/* Zoom and actions floating toolbar */}
      <div className="absolute top-12 right-4 z-30 flex items-center gap-1 bg-card/90 backdrop-blur-md border border-border rounded-lg p-1 shadow-md">
        <button
          type="button"
          onClick={handleZoomOut}
          className="p-1.5 hover:bg-muted rounded text-muted-foreground hover:text-foreground transition-colors"
          title="Kichiklashtirish"
        >
          <ZoomOut className="w-3.5 h-3.5" />
        </button>
        <span className="text-[11px] font-mono font-medium px-1 min-w-[38px] text-center text-muted-foreground">
          {Math.round(zoomLevel * 100)}%
        </span>
        <button
          type="button"
          onClick={handleZoomIn}
          className="p-1.5 hover:bg-muted rounded text-muted-foreground hover:text-foreground transition-colors"
          title="Kattalashtirish"
        >
          <ZoomIn className="w-3.5 h-3.5" />
        </button>
        <div className="w-px h-3 bg-border mx-0.5" />
        <button
          type="button"
          onClick={handleResetZoom}
          className="p-1.5 hover:bg-muted rounded text-muted-foreground hover:text-foreground transition-colors"
          title="Masshtabni tiklash"
        >
          <RotateCcw className="w-3 h-3" />
        </button>
        <button
          type="button"
          onClick={onExpand}
          className="p-1.5 hover:bg-muted rounded text-primary transition-colors"
          title="To'liq ekranda ko'rish"
        >
          <Maximize2 className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* CV Preview container with zoom transform */}
      <div className="flex-1 overflow-y-auto overflow-x-hidden p-4 flex justify-center items-start">
        <div
          style={{
            transform: `scale(${zoomLevel})`,
            transformOrigin: 'top center',
            transition: 'transform 0.15s ease-out',
          }}
          className="shadow-2xl rounded-sm"
        >
          <CVPreview
            data={data}
            inline={true}
            onExpand={onExpand}
          />
        </div>
      </div>
    </div>
  );
}
