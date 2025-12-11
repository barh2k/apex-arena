import { useState } from "react";
import { X, Copy, Check, RotateCcw, Share2, Save, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

interface CrosshairEditorProps {
  isOpen: boolean;
  onClose: () => void;
}

interface CrosshairSettings {
  style: number;
  size: number;
  gap: number;
  thickness: number;
  outline: number;
  outlineEnabled: boolean;
  dot: boolean;
  tStyle: boolean;
  color: string;
  alpha: number;
  splitDistance: number;
  followRecoil: boolean;
  fixedCrosshairGap: number;
}

interface ProPreset {
  name: string;
  team: string;
  settings: CrosshairSettings;
}

const defaultSettings: CrosshairSettings = {
  style: 4,
  size: 3,
  gap: -2,
  thickness: 1,
  outline: 1,
  outlineEnabled: true,
  dot: false,
  tStyle: false,
  color: "#00FF00",
  alpha: 255,
  splitDistance: 3,
  followRecoil: false,
  fixedCrosshairGap: -3,
};

const proPresets: ProPreset[] = [
  {
    name: "s1mple",
    team: "NAVI",
    settings: { ...defaultSettings, style: 4, size: 1, gap: -3, thickness: 1, color: "#00FF00", dot: false, outlineEnabled: true, outline: 0.5, tStyle: false, alpha: 255 },
  },
  {
    name: "NiKo",
    team: "G2",
    settings: { ...defaultSettings, style: 4, size: 1.5, gap: -3, thickness: 1, color: "#00FF00", dot: false, outlineEnabled: true, outline: 1, tStyle: false, alpha: 255 },
  },
  {
    name: "ZywOo",
    team: "Vitality",
    settings: { ...defaultSettings, style: 4, size: 2, gap: -2, thickness: 1, color: "#00FFFF", dot: false, outlineEnabled: true, outline: 1, tStyle: false, alpha: 255 },
  },
  {
    name: "m0NESY",
    team: "G2",
    settings: { ...defaultSettings, style: 4, size: 1, gap: -2, thickness: 1, color: "#00FF00", dot: true, outlineEnabled: true, outline: 0.5, tStyle: false, alpha: 255 },
  },
  {
    name: "device",
    team: "Astralis",
    settings: { ...defaultSettings, style: 4, size: 2.5, gap: -2, thickness: 1, color: "#00FF00", dot: false, outlineEnabled: true, outline: 1, tStyle: false, alpha: 255 },
  },
  {
    name: "ropz",
    team: "FaZe",
    settings: { ...defaultSettings, style: 4, size: 1.5, gap: -3, thickness: 1, color: "#FFFFFF", dot: false, outlineEnabled: true, outline: 1, tStyle: false, alpha: 255 },
  },
  {
    name: "Twistzz",
    team: "FaZe",
    settings: { ...defaultSettings, style: 5, size: 1, gap: -2, thickness: 0.5, color: "#00FF00", dot: false, outlineEnabled: false, outline: 0, tStyle: false, alpha: 255 },
  },
  {
    name: "rain",
    team: "FaZe",
    settings: { ...defaultSettings, style: 4, size: 2, gap: -2, thickness: 1, color: "#00FF00", dot: false, outlineEnabled: true, outline: 1, tStyle: true, alpha: 255 },
  },
];

const colorPresets = [
  { name: "Green", value: "#00FF00" },
  { name: "Red", value: "#FF0000" },
  { name: "Yellow", value: "#FFFF00" },
  { name: "Cyan", value: "#00FFFF" },
  { name: "White", value: "#FFFFFF" },
  { name: "Pink", value: "#FF00FF" },
  { name: "Orange", value: "#FF8800" },
  { name: "Blue", value: "#0088FF" },
];

const styleOptions = [
  { value: 0, label: "Default" },
  { value: 1, label: "Default Static" },
  { value: 2, label: "Classic" },
  { value: 3, label: "Classic Dynamic" },
  { value: 4, label: "Classic Static" },
  { value: 5, label: "Legacy" },
];

const STORAGE_KEY = "playcs_saved_crosshairs";

interface SavedCrosshair {
  id: string;
  name: string;
  settings: CrosshairSettings;
  createdAt: number;
}

const CrosshairEditor = ({ isOpen, onClose }: CrosshairEditorProps) => {
  const [settings, setSettings] = useState<CrosshairSettings>(defaultSettings);
  const [copied, setCopied] = useState(false);
  const [savedCrosshairs, setSavedCrosshairs] = useState<SavedCrosshair[]>(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  });
  const [saveName, setSaveName] = useState("");
  const [showSaveInput, setShowSaveInput] = useState(false);

  if (!isOpen) return null;

  const updateSetting = <K extends keyof CrosshairSettings>(
    key: K,
    value: CrosshairSettings[K]
  ) => {
    setSettings((prev) => ({ ...prev, [key]: value }));
  };

  const generateConsoleCommand = () => {
    return `cl_crosshairstyle ${settings.style}; cl_crosshairsize ${settings.size}; cl_crosshairgap ${settings.gap}; cl_crosshairthickness ${settings.thickness}; cl_crosshair_outlinethickness ${settings.outline}; cl_crosshair_drawoutline ${settings.outlineEnabled ? 1 : 0}; cl_crosshairdot ${settings.dot ? 1 : 0}; cl_crosshair_t ${settings.tStyle ? 1 : 0}; cl_crosshairalpha ${settings.alpha}; cl_crosshaircolor 5; cl_crosshaircolor_r ${parseInt(settings.color.slice(1, 3), 16)}; cl_crosshaircolor_g ${parseInt(settings.color.slice(3, 5), 16)}; cl_crosshaircolor_b ${parseInt(settings.color.slice(5, 7), 16)}`;
  };

  const generateShareCode = () => {
    const encoded = btoa(JSON.stringify(settings));
    return encoded;
  };

  const loadFromShareCode = (code: string) => {
    try {
      const decoded = JSON.parse(atob(code));
      setSettings(decoded);
      toast.success("Crosshair loaded from share code!");
    } catch {
      toast.error("Invalid share code");
    }
  };

  const copyCommand = () => {
    navigator.clipboard.writeText(generateConsoleCommand());
    setCopied(true);
    toast.success("Crosshair settings copied to clipboard!");
    setTimeout(() => setCopied(false), 2000);
  };

  const copyShareCode = () => {
    const shareCode = generateShareCode();
    navigator.clipboard.writeText(shareCode);
    toast.success("Share code copied! Send it to your friends.");
  };

  const saveCrosshair = () => {
    if (!saveName.trim()) {
      toast.error("Please enter a name for your crosshair");
      return;
    }
    const newSaved: SavedCrosshair = {
      id: Date.now().toString(),
      name: saveName.trim(),
      settings: { ...settings },
      createdAt: Date.now(),
    };
    const updated = [...savedCrosshairs, newSaved];
    setSavedCrosshairs(updated);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    setSaveName("");
    setShowSaveInput(false);
    toast.success(`Crosshair "${newSaved.name}" saved!`);
  };

  const deleteSavedCrosshair = (id: string) => {
    const updated = savedCrosshairs.filter((c) => c.id !== id);
    setSavedCrosshairs(updated);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    toast.success("Crosshair deleted");
  };

  const loadSavedCrosshair = (saved: SavedCrosshair) => {
    setSettings(saved.settings);
    toast.success(`Loaded "${saved.name}"`);
  };

  const applyProPreset = (preset: ProPreset) => {
    setSettings(preset.settings);
    toast.success(`Applied ${preset.name}'s crosshair`);
  };

  const resetSettings = () => {
    setSettings(defaultSettings);
    toast.success("Settings reset to default");
  };

  const handleImportShareCode = () => {
    const code = prompt("Paste share code:");
    if (code) loadFromShareCode(code);
  };

  // Calculate crosshair rendering
  const renderCrosshair = () => {
    const centerX = 150;
    const centerY = 150;
    const lineLength = settings.size * 4;
    const gapSize = (settings.gap + 5) * 2;
    const lineWidth = settings.thickness * 2;
    const outlineWidth = settings.outlineEnabled ? settings.outline : 0;
    const opacity = settings.alpha / 255;

    const lines = [];

    // Outline style
    const outlineStyle = {
      stroke: "#000000",
      strokeWidth: lineWidth + outlineWidth * 2,
      opacity: settings.outlineEnabled ? opacity : 0,
    };

    // Main line style
    const lineStyle = {
      stroke: settings.color,
      strokeWidth: lineWidth,
      opacity: opacity,
    };

    // Top line (only if not T-style)
    if (!settings.tStyle) {
      if (settings.outlineEnabled) {
        lines.push(
          <line
            key="top-outline"
            x1={centerX}
            y1={centerY - gapSize - lineLength}
            x2={centerX}
            y2={centerY - gapSize}
            {...outlineStyle}
          />
        );
      }
      lines.push(
        <line
          key="top"
          x1={centerX}
          y1={centerY - gapSize - lineLength}
          x2={centerX}
          y2={centerY - gapSize}
          {...lineStyle}
        />
      );
    }

    // Bottom line
    if (settings.outlineEnabled) {
      lines.push(
        <line
          key="bottom-outline"
          x1={centerX}
          y1={centerY + gapSize}
          x2={centerX}
          y2={centerY + gapSize + lineLength}
          {...outlineStyle}
        />
      );
    }
    lines.push(
      <line
        key="bottom"
        x1={centerX}
        y1={centerY + gapSize}
        x2={centerX}
        y2={centerY + gapSize + lineLength}
        {...lineStyle}
      />
    );

    // Left line
    if (settings.outlineEnabled) {
      lines.push(
        <line
          key="left-outline"
          x1={centerX - gapSize - lineLength}
          y1={centerY}
          x2={centerX - gapSize}
          y2={centerY}
          {...outlineStyle}
        />
      );
    }
    lines.push(
      <line
        key="left"
        x1={centerX - gapSize - lineLength}
        y1={centerY}
        x2={centerX - gapSize}
        y2={centerY}
        {...lineStyle}
      />
    );

    // Right line
    if (settings.outlineEnabled) {
      lines.push(
        <line
          key="right-outline"
          x1={centerX + gapSize}
          y1={centerY}
          x2={centerX + gapSize + lineLength}
          y2={centerY}
          {...outlineStyle}
        />
      );
    }
    lines.push(
      <line
        key="right"
        x1={centerX + gapSize}
        y1={centerY}
        x2={centerX + gapSize + lineLength}
        y2={centerY}
        {...lineStyle}
      />
    );

    // Center dot
    if (settings.dot) {
      if (settings.outlineEnabled) {
        lines.push(
          <circle
            key="dot-outline"
            cx={centerX}
            cy={centerY}
            r={lineWidth + outlineWidth}
            fill="#000000"
            opacity={opacity}
          />
        );
      }
      lines.push(
        <circle
          key="dot"
          cx={centerX}
          cy={centerY}
          r={lineWidth}
          fill={settings.color}
          opacity={opacity}
        />
      );
    }

    return lines;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-background/80 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative z-10 w-full max-w-4xl max-h-[90vh] overflow-y-auto mx-4 card-gaming p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="font-display text-2xl font-bold">
            CROSSHAIR <span className="text-primary">EDITOR</span>
          </h2>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-5 w-5" />
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Preview */}
          <div className="space-y-4">
            <h3 className="font-display font-bold text-lg">Preview</h3>
            <div className="relative aspect-square bg-[url('https://images.unsplash.com/photo-1542751371-adc38448a05e?w=600')] bg-cover bg-center rounded-lg overflow-hidden border border-border">
              <div className="absolute inset-0 bg-black/30" />
              <svg
                className="absolute inset-0 w-full h-full"
                viewBox="0 0 300 300"
                preserveAspectRatio="xMidYMid meet"
              >
                {renderCrosshair()}
              </svg>
            </div>

            {/* Console Command */}
            <div className="space-y-2">
              <Label className="text-sm text-muted-foreground">Console Command</Label>
              <div className="p-3 bg-secondary/50 rounded-lg border border-border font-mono text-xs text-muted-foreground break-all">
                {generateConsoleCommand()}
              </div>
              <div className="flex gap-2">
                <Button
                  variant="gaming"
                  size="sm"
                  className="flex-1"
                  onClick={copyCommand}
                >
                  {copied ? (
                    <Check className="h-4 w-4 mr-2" />
                  ) : (
                    <Copy className="h-4 w-4 mr-2" />
                  )}
                  {copied ? "Copied!" : "Copy Command"}
                </Button>
                <Button variant="outline" size="sm" onClick={resetSettings}>
                  <RotateCcw className="h-4 w-4 mr-2" />
                  Reset
                </Button>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" className="flex-1" onClick={copyShareCode}>
                  <Share2 className="h-4 w-4 mr-2" />
                  Share
                </Button>
                <Button variant="outline" size="sm" className="flex-1" onClick={handleImportShareCode}>
                  Import
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="flex-1"
                  onClick={() => setShowSaveInput(!showSaveInput)}
                >
                  <Save className="h-4 w-4 mr-2" />
                  Save
                </Button>
              </div>
              {showSaveInput && (
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={saveName}
                    onChange={(e) => setSaveName(e.target.value)}
                    placeholder="Crosshair name..."
                    className="flex-1 px-3 py-2 bg-secondary/50 border border-border rounded-lg text-sm focus:outline-none focus:border-primary"
                    onKeyDown={(e) => e.key === "Enter" && saveCrosshair()}
                  />
                  <Button variant="gaming" size="sm" onClick={saveCrosshair}>
                    Save
                  </Button>
                </div>
              )}
            </div>

            {/* Pro Presets */}
            <div className="space-y-2">
              <Label className="text-sm text-muted-foreground flex items-center gap-2">
                <User className="h-4 w-4" /> Pro Player Presets
              </Label>
              <div className="grid grid-cols-2 gap-2">
                {proPresets.map((preset) => (
                  <button
                    type="button"
                    key={preset.name}
                    onClick={() => applyProPreset(preset)}
                    className="flex items-center justify-between px-3 py-2 bg-secondary/30 hover:bg-secondary/50 border border-border hover:border-primary/50 rounded-lg transition-all text-left"
                  >
                    <div>
                      <span className="font-medium text-sm">{preset.name}</span>
                      <span className="text-xs text-muted-foreground ml-2">{preset.team}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Saved Crosshairs */}
            {savedCrosshairs.length > 0 && (
              <div className="space-y-2">
                <Label className="text-sm text-muted-foreground">Saved Crosshairs</Label>
                <div className="space-y-1 max-h-32 overflow-y-auto">
                  {savedCrosshairs.map((saved) => (
                    <div
                      key={saved.id}
                      className="flex items-center justify-between px-3 py-2 bg-secondary/30 border border-border rounded-lg"
                    >
                      <button
                        onClick={() => loadSavedCrosshair(saved)}
                        className="text-sm font-medium hover:text-primary transition-colors"
                      >
                        {saved.name}
                      </button>
                      <button
                        onClick={() => deleteSavedCrosshair(saved.id)}
                        className="text-xs text-muted-foreground hover:text-destructive transition-colors"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Settings */}
          <div className="space-y-6">
            {/* Style */}
            <div className="space-y-3">
              <Label className="font-display font-bold">Style</Label>
              <div className="grid grid-cols-2 gap-2">
                {styleOptions.map((option) => (
                  <button
                    type="button"
                    key={option.value}
                    onClick={() => updateSetting("style", option.value)}
                    className={`px-3 py-2 rounded-lg border text-sm font-medium transition-all ${
                      settings.style === option.value
                        ? "bg-primary/20 border-primary text-primary"
                        : "bg-secondary/30 border-border text-muted-foreground hover:border-primary/50"
                    }`}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Color */}
            <div className="space-y-3">
              <Label className="font-display font-bold">Color</Label>
              <div className="flex flex-wrap gap-2">
                {colorPresets.map((color) => (
                  <button
                    type="button"
                    key={color.value}
                    onClick={() => updateSetting("color", color.value)}
                    className={`w-8 h-8 rounded-lg border-2 transition-all ${
                      settings.color === color.value
                        ? "border-foreground scale-110"
                        : "border-transparent hover:scale-105"
                    }`}
                    style={{ backgroundColor: color.value }}
                    title={color.name}
                  />
                ))}
                <input
                  type="color"
                  value={settings.color}
                  onChange={(e) => updateSetting("color", e.target.value)}
                  className="w-8 h-8 rounded-lg cursor-pointer border-0"
                  title="Custom color"
                />
              </div>
            </div>

            {/* Size */}
            <div className="space-y-3">
              <div className="flex justify-between">
                <Label className="font-display font-bold">Size</Label>
                <span className="text-sm text-muted-foreground">{settings.size}</span>
              </div>
              <Slider
                value={[settings.size]}
                onValueChange={([value]) => updateSetting("size", value)}
                min={0.5}
                max={10}
                step={0.5}
                className="w-full"
              />
            </div>

            {/* Gap */}
            <div className="space-y-3">
              <div className="flex justify-between">
                <Label className="font-display font-bold">Gap</Label>
                <span className="text-sm text-muted-foreground">{settings.gap}</span>
              </div>
              <Slider
                value={[settings.gap]}
                onValueChange={([value]) => updateSetting("gap", value)}
                min={-5}
                max={5}
                step={0.5}
                className="w-full"
              />
            </div>

            {/* Thickness */}
            <div className="space-y-3">
              <div className="flex justify-between">
                <Label className="font-display font-bold">Thickness</Label>
                <span className="text-sm text-muted-foreground">{settings.thickness}</span>
              </div>
              <Slider
                value={[settings.thickness]}
                onValueChange={([value]) => updateSetting("thickness", value)}
                min={0.5}
                max={3}
                step={0.5}
                className="w-full"
              />
            </div>

            {/* Alpha */}
            <div className="space-y-3">
              <div className="flex justify-between">
                <Label className="font-display font-bold">Alpha (Opacity)</Label>
                <span className="text-sm text-muted-foreground">{settings.alpha}</span>
              </div>
              <Slider
                value={[settings.alpha]}
                onValueChange={([value]) => updateSetting("alpha", value)}
                min={0}
                max={255}
                step={1}
                className="w-full"
              />
            </div>

            {/* Outline */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <Label className="font-display font-bold">Outline</Label>
                <Switch
                  checked={settings.outlineEnabled}
                  onCheckedChange={(checked) => updateSetting("outlineEnabled", checked)}
                />
              </div>
              {settings.outlineEnabled && (
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <Label className="text-sm text-muted-foreground">Thickness</Label>
                    <span className="text-sm text-muted-foreground">{settings.outline}</span>
                  </div>
                  <Slider
                    value={[settings.outline]}
                    onValueChange={([value]) => updateSetting("outline", value)}
                    min={0.5}
                    max={3}
                    step={0.5}
                    className="w-full"
                  />
                </div>
              )}
            </div>

            {/* Toggles */}
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center justify-between p-3 bg-secondary/30 rounded-lg border border-border">
                <Label className="font-medium">Center Dot</Label>
                <Switch
                  checked={settings.dot}
                  onCheckedChange={(checked) => updateSetting("dot", checked)}
                />
              </div>
              <div className="flex items-center justify-between p-3 bg-secondary/30 rounded-lg border border-border">
                <Label className="font-medium">T-Style</Label>
                <Switch
                  checked={settings.tStyle}
                  onCheckedChange={(checked) => updateSetting("tStyle", checked)}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CrosshairEditor;
