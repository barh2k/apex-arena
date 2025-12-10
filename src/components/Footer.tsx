import { Crosshair, Twitter, Youtube, MessageCircle } from "lucide-react";

const Footer = () => {
  const links = {
    platform: ["Tournaments", "Servers", "Leaderboard", "Loadout"],
    support: ["Help Center", "Contact", "FAQ", "Report Bug"],
    legal: ["Terms of Service", "Privacy Policy", "Cookie Policy"],
  };

  return (
    <footer className="relative border-t border-border bg-card/50">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <a href="/" className="flex items-center gap-2 mb-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 border border-primary/30">
                <Crosshair className="h-6 w-6 text-primary" />
              </div>
            <span className="font-display text-xl font-bold tracking-wider">
                Play<span className="text-primary">CS</span>.gg
            </span>
            </a>
            <p className="text-sm text-muted-foreground mb-6">
              The ultimate CS2 competitive platform. Play, compete, dominate.
            </p>
            <div className="flex items-center gap-3">
              <a
                href="#"
                className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted hover:bg-primary/10 hover:text-primary transition-colors"
              >
                <Twitter className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted hover:bg-primary/10 hover:text-primary transition-colors"
              >
                <Youtube className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted hover:bg-primary/10 hover:text-primary transition-colors"
              >
                <MessageCircle className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Platform Links */}
          <div>
            <h4 className="font-display font-bold text-foreground mb-4">
              Platform
            </h4>
            <ul className="space-y-3">
              {links.platform.map((link) => (
                <li key={link}>
                  <a
                    href="#"
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Support Links */}
          <div>
            <h4 className="font-display font-bold text-foreground mb-4">
              Support
            </h4>
            <ul className="space-y-3">
              {links.support.map((link) => (
                <li key={link}>
                  <a
                    href="#"
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h4 className="font-display font-bold text-foreground mb-4">
              Legal
            </h4>
            <ul className="space-y-3">
              {links.legal.map((link) => (
                <li key={link}>
                  <a
                    href="#"
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">
            © 2024 PlayCS.gg. All rights reserved.
          </p>
          <p className="text-sm text-muted-foreground">
            Not affiliated with Valve Corporation
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
