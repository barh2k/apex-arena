import { Server, Users, Signal, MapPin, Play, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";

const servers = [
  {
    id: 1,
    name: "NEXUS Competitive #1",
    map: "de_mirage",
    players: "9/10",
    ping: 12,
    region: "EU West",
    type: "Competitive",
    protected: false,
  },
  {
    id: 2,
    name: "Aim Training Arena",
    map: "aim_map",
    players: "14/16",
    ping: 8,
    region: "EU West",
    type: "Deathmatch",
    protected: false,
  },
  {
    id: 3,
    name: "Pro Scrims Only",
    map: "de_inferno",
    players: "10/10",
    ping: 15,
    region: "EU Central",
    type: "Scrim",
    protected: true,
  },
  {
    id: 4,
    name: "Retake Practice",
    map: "de_dust2",
    players: "6/10",
    ping: 20,
    region: "EU East",
    type: "Retake",
    protected: false,
  },
  {
    id: 5,
    name: "NEXUS FFA DM",
    map: "de_nuke",
    players: "18/20",
    ping: 11,
    region: "EU West",
    type: "Deathmatch",
    protected: false,
  },
  {
    id: 6,
    name: "Wingman Ranked",
    map: "de_overpass",
    players: "4/4",
    ping: 14,
    region: "EU West",
    type: "Wingman",
    protected: false,
  },
];

const getPingColor = (ping: number) => {
  if (ping < 15) return "text-green-400";
  if (ping < 30) return "text-yellow-400";
  return "text-red-400";
};

const ServersSection = () => {
  return (
    <section id="servers" className="relative py-24 bg-secondary/20">
      {/* Background */}
      <div className="absolute inset-0 bg-grid opacity-20" />

      <div className="container relative z-10 mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="font-display text-3xl sm:text-4xl font-bold mb-2">
            COMMUNITY <span className="text-gradient-primary">SERVERS</span>
          </h2>
          <p className="text-muted-foreground max-w-lg mx-auto">
            Join our high-performance servers with anti-cheat and low latency
          </p>
        </div>

        {/* Server List */}
        <div className="max-w-4xl mx-auto">
          <div className="card-gaming overflow-hidden">
            {/* Table Header */}
            <div className="grid grid-cols-12 gap-4 p-4 border-b border-border bg-secondary/30 text-sm font-semibold text-muted-foreground uppercase tracking-wider">
              <div className="col-span-5">Server</div>
              <div className="col-span-2 hidden sm:block">Map</div>
              <div className="col-span-2">Players</div>
              <div className="col-span-1 hidden md:block">Ping</div>
              <div className="col-span-2 text-right">Action</div>
            </div>

            {/* Server Rows */}
            {servers.map((server, index) => (
              <div
                key={server.id}
                className={`grid grid-cols-12 gap-4 p-4 items-center hover:bg-primary/5 transition-colors ${
                  index !== servers.length - 1 ? "border-b border-border/50" : ""
                }`}
              >
                {/* Server Name */}
                <div className="col-span-5 flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 border border-primary/30">
                    <Server className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-foreground">
                        {server.name}
                      </span>
                      {server.protected && (
                        <Lock className="h-3 w-3 text-muted-foreground" />
                      )}
                    </div>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <MapPin className="h-3 w-3" />
                      {server.region}
                      <span className="px-1.5 py-0.5 rounded bg-muted text-xs">
                        {server.type}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Map */}
                <div className="col-span-2 hidden sm:block text-sm text-muted-foreground">
                  {server.map}
                </div>

                {/* Players */}
                <div className="col-span-2">
                  <div className="flex items-center gap-2 text-sm">
                    <Users className="h-4 w-4 text-muted-foreground" />
                    <span
                      className={
                        server.players.startsWith(server.players.split("/")[1])
                          ? "text-destructive"
                          : "text-foreground"
                      }
                    >
                      {server.players}
                    </span>
                  </div>
                </div>

                {/* Ping */}
                <div className="col-span-1 hidden md:flex items-center gap-1">
                  <Signal className={`h-4 w-4 ${getPingColor(server.ping)}`} />
                  <span className={`text-sm ${getPingColor(server.ping)}`}>
                    {server.ping}ms
                  </span>
                </div>

                {/* Action */}
                <div className="col-span-2 text-right">
                  <Button
                    variant="gaming"
                    size="sm"
                    disabled={server.players === "10/10" || server.players === "4/4"}
                  >
                    <Play className="h-4 w-4" />
                    <span className="hidden sm:inline ml-1">Join</span>
                  </Button>
                </div>
              </div>
            ))}
          </div>

          {/* Footer */}
          <div className="flex justify-center mt-6">
            <Button variant="outline">
              Browse All Servers
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServersSection;
