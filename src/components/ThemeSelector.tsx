import { useState } from "react";
import { Check, Palette } from "lucide-react";

const THEME_PRESETS = {
  default: {
    name: "Default Blue",
    lighter: "#DBEAFE",
    light: "#60A5FA",
    default: "#3B82F6",
    dark: "#1E40AF",
    darker: "#1E3A8A"
  },
  purple: {
    name: "Purple",
    lighter: "#F3E8FF",
    light: "#C084FC",
    default: "#A855F7",
    dark: "#7E22CE",
    darker: "#581C87"
  },
  red: {
    name: "Red",
    lighter: "#FFE3D5",
    light: "#FF9882",
    default: "#FF3030",
    dark: "#B71833",
    darker: "#7A0930"
  },
  green: {
    name: "Green",
    lighter: "#D1FAE5",
    light: "#6EE7B7",
    default: "#10B981",
    dark: "#047857",
    darker: "#064E3B"
  },
  amber: {
    name: "Amber",
    lighter: "#FEF3C7",
    light: "#FCD34D",
    default: "#F59E0B",
    dark: "#D97706",
    darker: "#92400E"
  }
};

export function ThemeSelector() {
  const [selectedTheme, setSelectedTheme] = useState("default");

  const handleThemeChange = (themeKey: string) => {
    setSelectedTheme(themeKey);
    const theme = THEME_PRESETS[themeKey as keyof typeof THEME_PRESETS];
    
    // Update CSS variables
    document.documentElement.style.setProperty('--primary', theme.default);
    document.documentElement.style.setProperty('--primary-light', theme.light);
    document.documentElement.style.setProperty('--primary-dark', theme.dark);
  };

  return (
    <div className="bg-white rounded-xl border border-border p-6 animate-in fade-in slide-in-from-bottom-4 duration-300">
      <div className="flex items-center gap-2 mb-4">
        <Palette className="h-5 w-5 text-primary" />
        <h2 className="text-lg font-bold text-foreground">Theme Color</h2>
      </div>
      <p className="text-sm text-muted-foreground mb-6">Choose your preferred color scheme</p>

      <div className="grid grid-cols-5 gap-3">
        {Object.entries(THEME_PRESETS).map(([key, theme]) => (
          <button
            key={key}
            onClick={() => handleThemeChange(key)}
            className={`relative p-4 rounded-xl border-2 transition-all duration-300 hover:scale-105 ${
              selectedTheme === key
                ? 'border-primary shadow-lg'
                : 'border-border hover:border-primary/40'
            }`}
          >
            {selectedTheme === key && (
              <div className="absolute -top-2 -right-2 h-6 w-6 rounded-full bg-primary flex items-center justify-center shadow-lg">
                <Check className="h-3.5 w-3.5 text-white" />
              </div>
            )}
            
            <div className="space-y-2 mb-3">
              <div 
                className="h-8 w-full rounded-lg shadow-sm"
                style={{ backgroundColor: theme.default }}
              />
              <div className="flex gap-1">
                <div 
                  className="h-3 w-full rounded"
                  style={{ backgroundColor: theme.lighter }}
                />
                <div 
                  className="h-3 w-full rounded"
                  style={{ backgroundColor: theme.light }}
                />
                <div 
                  className="h-3 w-full rounded"
                  style={{ backgroundColor: theme.dark }}
                />
                <div 
                  className="h-3 w-full rounded"
                  style={{ backgroundColor: theme.darker }}
                />
              </div>
            </div>
            
            <p className="text-xs font-semibold text-foreground text-center">{theme.name}</p>
          </button>
        ))}
      </div>
    </div>
  );
}
