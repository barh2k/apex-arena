import { Trophy, Users, Clock, ChevronRight, Gamepad2 } from "lucide-react";
import { Button } from "@/components/ui/button";

const tournaments = [
  {
    id: 1,
    name: "NEXUS Major Championship",
    prize: "$50,000",
    players: "256/256",
    date: "Dec 15, 2024",
    status: "live",
    mode: "5v5",
    map: "Mirage",
  },
  {
    id: 2,
    name: "Weekly Showdown #47",
    prize: "$2,500",
    players: "48/64",
    date: "Dec 12, 2024",
    status: "registration",
    mode: "5v5",
    map: "Dust II",
  },
  {
    id: 3,
    name: "Ranked Arena Cup",
    prize: "$5,000",
    players: "100/128",
    date: "Dec 14, 2024",
    status: "registration",
    mode: "5v5",
    map: "Inferno",
  },
  {
    id: 4,
    name: "1v1 Aim Masters",
    prize: "$1,000",
    players: "32/32",
    date: "Dec 11, 2024",
    status: "upcoming",
    mode: "1v1",
    map: "Aim Map",
  },
];

const TournamentsSection = () => {
  return (
    <section id="tournaments" className="relative py-24 overflow-hidden">
      {/* Background Effects */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-primary/10 rounded-full blur-[120px]" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-accent/10 rounded-full blur-[150px]" />

      <div className="container relative z-10 mx-auto px-4">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-12">
          <div>
            <h2 className="font-display text-3xl sm:text-4xl font-bold mb-2">
              <span className="text-gradient-primary">LIVE</span> TOURNAMENTS
            </h2>
            <p className="text-muted-foreground">
              Compete for glory and massive prize pools
            </p>
          </div>
          <Button variant="outline">
            View All
            <ChevronRight className="ml-1 h-4 w-4" />
          </Button>
        </div>

        {/* Tournament Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {tournaments.map((tournament) => (
            <div
              key={tournament.id}
              className="card-gaming p-5 group cursor-pointer transition-all duration-300"
            >
              <div className="flex flex-col h-full">
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 border border-primary/30">
                      <Trophy className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-display text-lg font-bold text-foreground group-hover:text-primary transition-colors">
                        {tournament.name}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {tournament.mode} · {tournament.map}
                      </p>
                    </div>
                  </div>
                  {tournament.status === "live" && (
                    <span className="status-live">Live</span>
                  )}
                  {tournament.status === "registration" && (
                    <span className="stat-badge">Open</span>
                  )}
                  {tournament.status === "upcoming" && (
                    <span className="inline-flex items-center rounded-full bg-muted px-3 py-1 text-xs font-medium text-muted-foreground">
                      Soon
                    </span>
                  )}
                </div>

                {/* Details */}
                <div className="flex flex-wrap items-center gap-4 mt-auto">
                  <div className="flex items-center gap-2 text-sm">
                    <span className="text-accent font-display font-bold text-lg">
                      {tournament.prize}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Users className="h-4 w-4" />
                    {tournament.players}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Clock className="h-4 w-4" />
                    {tournament.date}
                  </div>
                </div>

                {/* Action */}
                <div className="mt-4 pt-4 border-t border-border/50">
                  <Button
                    variant={tournament.status === "live" ? "accent" : "gaming"}
                    className="w-full"
                    size="sm"
                  >
                    {tournament.status === "live"
                      ? "Watch Now"
                      : tournament.status === "registration"
                      ? "Register"
                      : "View Details"}
                    <ChevronRight className="ml-1 h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TournamentsSection;
