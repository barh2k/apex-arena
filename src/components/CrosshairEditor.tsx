import { useState } from "react";
import { X, Copy, Check, RotateCcw } from "lucide-react";
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

const CrosshairEditor = ({ isOpen, onClose }: CrosshairEditorProps) => {
  const [settings, setSettings] = useState<CrosshairSettings>(defaultSettings);
  const [copied, setCopied] = useState(false);

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

  const copyCommand = () => {
    navigator.clipboard.writeText(generateConsoleCommand());
    setCopied(true);
    toast.success("Crosshair settings copied to clipboard!");
    setTimeout(() => setCopied(false), 2000);
  };

  const resetSettings = () => {
    setSettings(defaultSettings);
    toast.success("Settings reset to default");
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
            </div>
          </div>

          {/* Settings */}
          <div className="space-y-6">
            {/* Style */}
            <div className="space-y-3">
              <Label className="font-display font-bold">Style</Label>
              <div className="grid grid-cols-2 gap-2">
                {styleOptions.map((option) => (
                  <button
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
