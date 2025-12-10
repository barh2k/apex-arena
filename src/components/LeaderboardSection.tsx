import { Trophy, TrendingUp, TrendingDown, Minus, Medal, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const players = [
  {
    rank: 1,
    change: "up",
    name: "NiKo",
    avatar: "N",
    elo: 3250,
    wins: 342,
    winRate: 68,
    kd: 1.45,
  },
  {
    rank: 2,
    change: "up",
    name: "s1mple",
    avatar: "S",
    elo: 3180,
    wins: 298,
    winRate: 72,
    kd: 1.52,
  },
  {
    rank: 3,
    change: "down",
    name: "ZywOo",
    avatar: "Z",
    elo: 3120,
    wins: 276,
    winRate: 65,
    kd: 1.38,
  },
  {
    rank: 4,
    change: "same",
    name: "m0NESY",
    avatar: "M",
    elo: 3050,
    wins: 245,
    winRate: 63,
    kd: 1.35,
  },
  {
    rank: 5,
    change: "up",
    name: "donk",
    avatar: "D",
    elo: 2980,
    wins: 234,
    winRate: 66,
    kd: 1.42,
  },
];

const getRankColor = (rank: number) => {
  if (rank === 1) return "from-yellow-400 to-amber-500";
  if (rank === 2) return "from-gray-300 to-gray-400";
  if (rank === 3) return "from-amber-600 to-amber-700";
  return "from-muted to-muted";
};

const getChangeIcon = (change: string) => {
  if (change === "up") return <TrendingUp className="h-4 w-4 text-green-400" />;
  if (change === "down") return <TrendingDown className="h-4 w-4 text-red-400" />;
  return <Minus className="h-4 w-4 text-muted-foreground" />;
};

const LeaderboardSection = () => {
  return (
    <section id="leaderboard" className="relative py-24 bg-secondary/20">
      {/* Background */}
      <div className="absolute inset-0 bg-grid opacity-20" />
      <div className="absolute top-0 right-0 w-96 h-96 bg-accent/10 rounded-full blur-[150px]" />

      <div className="container relative z-10 mx-auto px-4">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-12">
          <div>
            <h2 className="font-display text-3xl sm:text-4xl font-bold mb-2">
              GLOBAL <span className="text-gradient-accent">LEADERBOARD</span>
            </h2>
            <p className="text-muted-foreground">
              Top players competing for glory this season
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="gaming" size="sm">
              Daily
            </Button>
            <Button variant="outline" size="sm">
              Weekly
            </Button>
            <Button variant="gaming" size="sm">
              All Time
            </Button>
          </div>
        </div>

        {/* Leaderboard */}
        <div className="max-w-4xl mx-auto">
          <div className="card-gaming overflow-hidden">
            {/* Table Header */}
            <div className="grid grid-cols-12 gap-4 p-4 border-b border-border bg-secondary/30 text-sm font-semibold text-muted-foreground uppercase tracking-wider">
              <div className="col-span-1 text-center">#</div>
              <div className="col-span-4">Player</div>
              <div className="col-span-2 text-center">ELO</div>
              <div className="col-span-2 text-center hidden sm:block">Win Rate</div>
              <div className="col-span-2 text-center hidden md:block">K/D</div>
              <div className="col-span-1 text-center">Trend</div>
            </div>

            {/* Player Rows */}
            {players.map((player, index) => (
              <div
                key={player.rank}
                className={`grid grid-cols-12 gap-4 p-4 items-center hover:bg-primary/5 transition-colors ${
                  index !== players.length - 1 ? "border-b border-border/50" : ""
                }`}
              >
                {/* Rank */}
                <div className="col-span-1 text-center">
                  {player.rank <= 3 ? (
                    <div
                      className={`inline-flex items-center justify-center w-8 h-8 rounded-full bg-gradient-to-br ${getRankColor(
                        player.rank
                      )}`}
                    >
                      <span className="font-display font-bold text-background text-sm">
                        {player.rank}
                      </span>
                    </div>
                  ) : (
                    <span className="font-display font-bold text-muted-foreground">
                      {player.rank}
                    </span>
                  )}
                </div>

                {/* Player */}
                <div className="col-span-4 flex items-center gap-3">
                  <div
                    className={`flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br ${getRankColor(
                      player.rank
                    )} font-display font-bold text-background`}
                  >
                    {player.avatar}
                  </div>
                  <div>
                    <span className="font-semibold text-foreground">
                      {player.name}
                    </span>
                    <div className="text-xs text-muted-foreground">
                      {player.wins} wins
                    </div>
                  </div>
                </div>

                {/* ELO */}
                <div className="col-span-2 text-center">
                  <span className="font-display font-bold text-primary text-lg">
                    {player.elo}
                  </span>
                </div>

                {/* Win Rate */}
                <div className="col-span-2 text-center hidden sm:block">
                  <div className="inline-flex items-center gap-2">
                    <div className="w-16 h-2 rounded-full bg-muted overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-primary to-cyan-400"
                        style={{ width: `${player.winRate}%` }}
                      />
                    </div>
                    <span className="text-sm font-semibold text-foreground">
                      {player.winRate}%
                    </span>
                  </div>
                </div>

                {/* K/D */}
                <div className="col-span-2 text-center hidden md:block">
                  <span
                    className={`font-semibold ${
                      player.kd >= 1.4
                        ? "text-green-400"
                        : player.kd >= 1.0
                        ? "text-foreground"
                        : "text-red-400"
                    }`}
                  >
                    {player.kd.toFixed(2)}
                  </span>
                </div>

                {/* Trend */}
                <div className="col-span-1 flex justify-center">
                  {getChangeIcon(player.change)}
                </div>
              </div>
            ))}
          </div>

          {/* Footer */}
          <div className="flex justify-center mt-6">
            <Button variant="outline">
              View Full Rankings
              <ChevronRight className="ml-1 h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LeaderboardSection;
