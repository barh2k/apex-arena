import { Crosshair, Palette, Eye, Share2, Star, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const loadouts = [
  {
    id: 1,
    name: "s1mple Config",
    author: "NEXUS Team",
    likes: 12500,
    downloads: 45000,
    category: "Pro Settings",
    color: "from-primary to-cyan-400",
  },
  {
    id: 2,
    name: "Maximum FPS",
    author: "TechGuru",
    likes: 8900,
    downloads: 32000,
    category: "Performance",
    color: "from-green-400 to-emerald-500",
  },
  {
    id: 3,
    name: "Neon Crosshair Pack",
    author: "DesignMaster",
    likes: 6700,
    downloads: 28000,
    category: "Crosshairs",
    color: "from-accent to-orange-500",
  },
  {
    id: 4,
    name: "Clean HUD Setup",
    author: "MinimalPro",
    likes: 5400,
    downloads: 19000,
    category: "HUD",
    color: "from-purple-400 to-pink-500",
  },
];

const features = [
  {
    icon: Crosshair,
    title: "Custom Crosshairs",
    description: "Design and share your perfect crosshair",
  },
  {
    icon: Palette,
    title: "Viewmodel Editor",
    description: "Fine-tune your weapon positioning",
  },
  {
    icon: Eye,
    title: "Custom Skins",
    description: "Browse and preview weapon skins",
  },
  {
    icon: Share2,
    title: "Share & Import",
    description: "One-click config sharing",
  },
];

const formatNumber = (num: number) => {
  if (num >= 1000) {
    return (num / 1000).toFixed(1) + "K";
  }
  return num.toString();
};

const LoadoutSection = () => {
  return (
    <section id="loadout" className="relative py-24 overflow-hidden">
      {/* Background Effects */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[150px]" />

      <div className="container relative z-10 mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="font-display text-3xl sm:text-4xl font-bold mb-2">
            LOADOUT <span className="text-gradient-accent">CUSTOMIZER</span>
          </h2>
          <p className="text-muted-foreground max-w-lg mx-auto">
            Perfect your setup with community-shared configs and settings
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
          {features.map((feature, index) => (
            <div
              key={index}
              className="card-gaming p-5 text-center group"
            >
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-primary/10 border border-primary/30 mb-4 group-hover:border-primary transition-colors">
                <feature.icon className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-display font-bold text-foreground mb-1">
                {feature.title}
              </h3>
              <p className="text-sm text-muted-foreground">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        {/* Popular Loadouts */}
        <div className="mb-8">
          <h3 className="font-display text-xl font-bold mb-6">
            Popular Configs
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {loadouts.map((loadout) => (
              <div
                key={loadout.id}
                className="card-gaming overflow-hidden group cursor-pointer"
              >
                {/* Gradient Header */}
                <div
                  className={`h-24 bg-gradient-to-r ${loadout.color} relative`}
                >
                  <div className="absolute inset-0 bg-black/30" />
                  <div className="absolute bottom-3 left-4">
                    <span className="px-2 py-1 rounded text-xs font-semibold bg-black/50 text-foreground backdrop-blur-sm">
                      {loadout.category}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-4">
                  <h4 className="font-display font-bold text-foreground mb-1 group-hover:text-primary transition-colors">
                    {loadout.name}
                  </h4>
                  <p className="text-sm text-muted-foreground mb-3">
                    by {loadout.author}
                  </p>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Star className="h-4 w-4 text-accent" />
                      {formatNumber(loadout.likes)}
                    </span>
                    <span>{formatNumber(loadout.downloads)} downloads</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <Button variant="hero" size="lg">
            Open Loadout Editor
            <ChevronRight className="ml-1 h-5 w-5" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default LoadoutSection;
