import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Activity } from "lucide-react";

const INSIGHTS = [
  { number: 12480, label: "ICP Hiring Signal", text: "Companies match your ideal customer profile" },
  { number: 326, label: "Role Expansion Signal", text: "Companies hiring Engineering Managers in UK Healthcare" },
  { number: 91, label: "AI Adoption Signal", text: "Hospitals expanding AI teams this week" },
  { number: 43, label: "Funding Signal", text: "Recently funded HealthTech startups hiring CTOs" },
  { number: 214, label: "CRM Migration Signal", text: "Organizations adopting Salesforce CRM" },
  { number: 118, label: "Leadership Change Signal", text: "Leadership changes in mid-size pharma firms" }
];

export function AIInsightWidget() {
  const navigate = useNavigate();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [displayNumber, setDisplayNumber] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  const currentInsight = INSIGHTS[currentIndex];

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);
    
    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  useEffect(() => {
    if (prefersReducedMotion) {
      setDisplayNumber(currentInsight.number);
      return;
    }

    setDisplayNumber(0);
    const duration = 400;
    const steps = 40;
    const increment = currentInsight.number / steps;
    let current = 0;

    const timer = setInterval(() => {
      current += increment;
      if (current >= currentInsight.number) {
        setDisplayNumber(currentInsight.number);
        clearInterval(timer);
      } else {
        setDisplayNumber(Math.floor(current));
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, [currentIndex, currentInsight.number, prefersReducedMotion]);

  useEffect(() => {
    if (prefersReducedMotion) return;

    const rotationInterval = setInterval(() => {
      setIsVisible(false);
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % INSIGHTS.length);
        setIsVisible(true);
      }, 200);
    }, 8000);

    return () => clearInterval(rotationInterval);
  }, [prefersReducedMotion]);

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden) {
        setIsVisible(false);
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
  }, []);

  return (
    <div className="hidden md:block">
      <div
        onClick={() => navigate('/ai-role-targeting')}
        className="signal-widget"
      >
        <div className="h-3.5 w-3.5 rounded-full bg-[#FFE3D5] flex items-center justify-center flex-shrink-0">
          <Activity className="h-2.5 w-2.5 text-[#FF3030]" />
        </div>
        <div className="content-viewport">
          <div className="text-[11px] font-medium text-muted-foreground mb-0.5">
            {currentInsight.label}
          </div>
          <div className={`text-content ${isVisible ? 'visible' : 'hidden'}`}>
            <span className="number-box">{displayNumber.toLocaleString()}</span>
            <span className="text-truncate">{currentInsight.text}</span>
          </div>
        </div>
      </div>

      <style>{`
        .signal-widget {
          position: relative;
          width: 340px;
          height: 48px;
          padding: 8px 12px;
          border-radius: 6px;
          background: transparent;
          border: 1px solid hsl(var(--border));
          border-left: 2px solid #FF3030;
          display: flex;
          align-items: center;
          gap: 10px;
          cursor: pointer;
          transition: background-color 0.2s ease;
          animation: border-blink 2s ease-in-out infinite;
        }

        .signal-widget:hover {
          background: #FFE3D5;
        }

        @keyframes border-blink {
          0%, 100% {
            border-left-color: #FF3030;
            opacity: 1;
          }
          50% {
            border-left-color: #B71833;
            opacity: 0.7;
          }
        }

        .content-viewport {
          flex: 1;
          min-width: 0;
          display: flex;
          flex-direction: column;
          justify-content: center;
        }

        .text-content {
          display: flex;
          align-items: baseline;
          gap: 4px;
          font-size: 13px;
          font-weight: 600;
          color: hsl(var(--foreground));
          white-space: nowrap;
          transition: opacity 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          transform-origin: left center;
        }

        .text-content.visible {
          opacity: 1;
        }

        .text-content.hidden {
          opacity: 0;
        }

        .number-box {
          display: inline-block;
          width: 48px;
          font-weight: 700;
          text-align: left;
          flex-shrink: 0;
        }

        .text-truncate {
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          flex: 1;
          min-width: 0;
        }

        @media (prefers-reduced-motion: reduce) {
          .signal-widget {
            animation: none !important;
          }
          
          .text-content {
            transition: none !important;
          }
        }

        @media (max-width: 768px) {
          .signal-widget {
            width: 100%;
            min-height: 44px;
            height: auto;
          }
        }
      `}</style>
    </div>
  );
}
