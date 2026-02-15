import { useState, useEffect } from "react";
import { Filter, Bookmark, Play, Pencil, MapPin, Building2, Users, MousePointer2 } from "lucide-react";

export function SavedSearchOnboarding() {
  const [activeSlide, setActiveSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (isPaused) return;
    
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          setActiveSlide((s) => (s + 1) % 4);
          setShowResult(false);
          return 0;
        }
        return prev + (100 / 30); // 3s = 30 frames at ~100ms
      });
    }, 100);

    return () => clearInterval(progressInterval);
  }, [isPaused, activeSlide]);

  useEffect(() => {
    setShowResult(false);
    setProgress(0);
    
    // Cursor animation
    const cursorTimer = setTimeout(() => {
      const positions = [
        { x: 120, y: 80 },  // Filter
        { x: 150, y: 60 },  // Save button
        { x: 200, y: 70 },  // Run button
        { x: 220, y: 70 },  // Edit icon
      ];
      setCursorPos(positions[activeSlide]);
    }, 200);

    // Show result after cursor click
    const resultTimer = setTimeout(() => {
      setShowResult(true);
    }, 1000);

    return () => {
      clearTimeout(cursorTimer);
      clearTimeout(resultTimer);
    };
  }, [activeSlide]);

  const slides = [
    {
      title: "Apply Filters",
      content: (
        <div className="space-y-2 transition-opacity" style={{ opacity: showResult ? 0.4 : 1, transitionDuration: '260ms' }}>
          <div className="flex items-center gap-2 p-2 border border-slate-200 rounded bg-white">
            <Filter className="h-4 w-4 text-slate-400" />
            <span className="text-xs text-slate-600">Prospect Search Filters</span>
          </div>
          <div className="space-y-1.5 pl-2">
            <div 
              className="relative p-2 border rounded bg-white transition-all"
              style={{
                boxShadow: showResult ? '0 0 0 9999px rgba(0,0,0,0.08), 0 0 0 2px #FF9882' : 'none',
                borderColor: showResult ? '#FF9882' : '#e5e7eb',
                zIndex: showResult ? 10 : 1,
                animation: showResult ? 'softPulse 1.2s ease-in-out infinite' : 'none',
                transitionDuration: '260ms',
              }}
            >
              <div className="flex items-center gap-2">
                <Users className="h-3.5 w-3.5 text-[#B71833]" />
                <span className="text-xs font-medium text-slate-700">Role: CEO, Founder</span>
              </div>
            </div>
            <div className="p-2 border border-slate-200 rounded bg-white opacity-40">
              <div className="flex items-center gap-2">
                <MapPin className="h-3.5 w-3.5 text-slate-400" />
                <span className="text-xs text-slate-600">Location: United States</span>
              </div>
            </div>
            <div className="p-2 border border-slate-200 rounded bg-white opacity-40">
              <div className="flex items-center gap-2">
                <Building2 className="h-3.5 w-3.5 text-slate-400" />
                <span className="text-xs text-slate-600">Company Size: 50-200</span>
              </div>
            </div>
          </div>
        </div>
      ),
    },
    {
      title: "Save Search",
      content: (
        <div className="flex flex-col items-center justify-center space-y-3 py-4">
          <div className="relative">
            <button 
              className="h-10 px-4 flex items-center gap-2 bg-[#FF3030] text-white rounded shadow-sm transition-all"
              style={{
                boxShadow: !showResult ? '0 0 0 9999px rgba(0,0,0,0.08), 0 0 0 2px #FF9882' : 'none',
                zIndex: !showResult ? 10 : 1,
                animation: !showResult ? 'softPulse 1.2s ease-in-out infinite' : 'none',
                transitionDuration: '260ms',
              }}
            >
              <Bookmark className="h-4 w-4" />
              <span className="text-sm font-medium">Save Search</span>
            </button>
          </div>
          {showResult && (
            <div 
              className="px-3 py-1.5 bg-green-50 border border-green-200 rounded text-xs text-green-700 font-medium"
              style={{
                animation: 'slideUp 260ms cubic-bezier(0.22, 1, 0.36, 1)',
                opacity: 1,
              }}
            >
              ✓ Search Saved Successfully
            </div>
          )}
        </div>
      ),
    },
    {
      title: "Run Search",
      content: (
        <div className="space-y-2">
          <div 
            className="flex items-center justify-between p-2.5 border rounded bg-white transition-all"
            style={{
              opacity: showResult ? 0.4 : 1,
              borderColor: '#e5e7eb',
              transitionDuration: '260ms',
            }}
          >
            <div className="flex-1">
              <div className="text-xs font-semibold text-slate-800">US Tech Startups</div>
              <div className="text-[10px] text-slate-500">Company</div>
            </div>
            <div className="text-xs font-semibold text-red-700">{showResult ? '3,420' : '—'}</div>
            <button 
              className="ml-3 h-7 px-3 text-xs font-medium text-red-600 border rounded bg-white transition-all"
              style={{
                boxShadow: !showResult ? '0 0 0 9999px rgba(0,0,0,0.08), 0 0 0 2px #FF9882' : 'none',
                borderColor: !showResult ? '#FF9882' : '#dc2626',
                zIndex: !showResult ? 10 : 1,
                animation: !showResult ? 'softPulse 1.2s ease-in-out infinite' : 'none',
                transitionDuration: '260ms',
              }}
            >
              <Play className="h-3 w-3 inline mr-1" />
              Run
            </button>
          </div>
          {showResult && (
            <div 
              className="flex items-center gap-2 text-[10px] text-slate-500"
              style={{ animation: 'slideUp 260ms cubic-bezier(0.22, 1, 0.36, 1)' }}
            >
              <div className="h-1 w-1 bg-green-500 rounded-full animate-pulse" />
              Search completed
            </div>
          )}
        </div>
      ),
    },
    {
      title: "Edit Search",
      content: (
        <div className="space-y-2">
          <div 
            className="flex items-center justify-between p-2.5 border rounded bg-white transition-all"
            style={{ opacity: showResult ? 0.4 : 1, transitionDuration: '260ms' }}
          >
            <div className="flex-1">
              <div className="text-xs font-semibold text-slate-800">EMEA Finance Enterprises</div>
              <div className="text-[10px] text-slate-500">People</div>
            </div>
            <button 
              className="p-1.5 text-slate-400 hover:text-orange-600 hover:bg-orange-50 rounded transition-all"
              style={{
                boxShadow: !showResult ? '0 0 0 9999px rgba(0,0,0,0.08), 0 0 0 2px #FF9882' : 'none',
                zIndex: !showResult ? 10 : 1,
                animation: !showResult ? 'softPulse 1.2s ease-in-out infinite' : 'none',
                transitionDuration: '260ms',
              }}
            >
              <Pencil className="h-3.5 w-3.5" />
            </button>
          </div>
          {showResult && (
            <div 
              className="p-2 border border-[#FF9882] rounded bg-white"
              style={{ animation: 'slideUp 260ms cubic-bezier(0.22, 1, 0.36, 1)' }}
            >
              <div className="flex items-center gap-2 mb-1.5">
                <Filter className="h-3.5 w-3.5 text-[#B71833]" />
                <span className="text-xs font-medium text-slate-700">Edit Filters</span>
              </div>
              <div className="text-[10px] text-slate-500">Modify targeting criteria</div>
            </div>
          )}
        </div>
      ),
    },
  ];

  return (
    <div
      className="min-h-[220px] flex flex-col items-center justify-center p-6 relative"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <style>{`
        @keyframes softPulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.04); }
        }
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(12px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>

      {/* Cursor Simulation */}
      <div
        className="absolute pointer-events-none z-20 transition-all ease-out"
        style={{
          left: `${cursorPos.x}px`,
          top: `${cursorPos.y}px`,
          opacity: cursorPos.x > 0 ? 0.6 : 0,
          transitionDuration: '600ms',
        }}
      >
        <MousePointer2 className="h-4 w-4 text-slate-700" />
      </div>

      <div className="w-full max-w-md">
        <div className="mb-4 text-center">
          <h3 className="text-sm font-semibold text-slate-700 mb-1">{slides[activeSlide].title}</h3>
        </div>

        <div className="relative overflow-hidden">
          {slides.map((slide, index) => (
            <div
              key={index}
              className="transition-all"
              style={{
                display: index === activeSlide ? 'block' : 'none',
                opacity: index === activeSlide ? 1 : 0,
                transform: index === activeSlide ? 'translateY(0)' : 'translateY(12px)',
                transitionTimingFunction: 'cubic-bezier(0.22, 1, 0.36, 1)',
                transitionDuration: '260ms',
              }}
            >
              {slide.content}
            </div>
          ))}
        </div>

        {/* Progress Bar */}
        <div className="mt-4 h-0.5 bg-[#FFE3D5] rounded-full overflow-hidden">
          <div
            className="h-full bg-[#FF3030] transition-all"
            style={{
              width: `${progress}%`,
              transitionDuration: isPaused ? '0ms' : '100ms',
              transitionTimingFunction: 'linear',
            }}
          />
        </div>

        {/* Step Dots */}
        <div className="flex justify-center gap-2 mt-4">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                setActiveSlide(index);
                setProgress(0);
              }}
              className="h-2.5 w-2.5 rounded-full transition-all"
              style={{
                backgroundColor: index === activeSlide ? '#FF3030' : '#cbd5e1',
                transform: index === activeSlide ? 'scale(1.2)' : 'scale(1)',
                transitionTimingFunction: 'cubic-bezier(0.22, 1, 0.36, 1)',
                transitionDuration: '260ms',
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
