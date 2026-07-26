import { configDotenv } from "dotenv";
import { join } from "path";
import Lounge, { GameMode, Player, RankIcons } from "./class/Lounge";
import { patch } from "axios";

configDotenv({ path: join(process.cwd(), ".env"), quiet: true });

interface WidgetData {
  data: {
    dynamic: [
      {
        type: 1;
        name: "name";
        value: string;
      },
      {
        type: 2;
        name: "season";
        value: number;
      },
      {
        type: 3;
        name: "rankicon";
        value: {
          url: string;
        };
      },
      {
        type: 1;
        name: "mmr";
        value: string;
      },
      {
        type: 1;
        name: "rank";
        value: string;
      },
      {
        type: 1;
        name: "averages";
        value: string;
      },
      {
        type: 2;
        name: "events";
        value: number;
      },
      {
        type: 1;
        name: "peakmmr";
        value: string;
      },
      {
        type: 1;
        name: "winrate";
        value: string;
      },
      {
        type: 1;
        name: "gamemode";
        value: string;
      },
      {
        type: 1;
        name: "globalrank";
        value: string;
      },
    ];
  };
}

const applicationId = process.env.APPLICATION_ID;
const userId = process.env.USER_ID;
const token = process.env.BOT_TOKEN;
const playerName = process.env.LOUNGE_PLAYER_NAME;
let gamemode: GameMode =
  `${process.env.LOUNGE_PLAYERS}`.toUpperCase() as GameMode;
if (!gamemode.endsWith("P")) gamemode = `${gamemode}P` as GameMode;

console.log(`Tracking ${playerName} for gamemode ${gamemode}`);

const url = `https://discord.com/api/v9/applications/${applicationId}/users/${userId}/identities/0/profile`;

const lounge = new Lounge();

const refreshApplicationIdentity = async (data: WidgetData) => {
  try {
    await patch(url, data, {
      headers: {
        Authorization: `Bot ${token}`,
        "Content-Type": "application/json",
      },
    });
  } catch (e) {
    console.log("UPDATE IDENTITY FAILED (FROM FUNC)", e);
  }
};

const buildDataFromPlayer = (player: Player): WidgetData => {
  let data: WidgetData = {
    data: {
      dynamic: [
        {
          type: 1,
          name: "name",
          value: player.name,
        },
        {
          type: 2,
          name: "season",
          value: player.season,
        },
        {
          type: 3,
          name: "rankicon",
          value: {
            url: RankIcons[player.rank],
          },
        },
        {
          type: 1,
          name: "mmr",
          value: (player.mmr || 0).toLocaleString(),
        },
        {
          type: 1,
          name: "rank",
          value: player.rank,
        },
        {
          type: 1,
          name: "averages",
          value: `${Math.round(player.averageScore * 10) / 10} / ${Math.round(player.partnerAverage * 10) / 10}`,
        },
        {
          type: 2,
          name: "events",
          value: player.eventsPlayed,
        },
        {
          type: 1,
          name: "peakmmr",
          value: (player.maxMmr || player.mmr || 0).toLocaleString(),
        },
        {
          type: 1,
          name: "winrate",
          value: `${Math.round(player.winRate * 100)}%`,
        },
        {
          type: 1,
          name: "gamemode",
          value: gamemode,
        },
        {
          name: "globalrank",
          type: 1,
          value: `#${player.overallRank.toLocaleString()}`,
        },
      ],
    },
  };

  return data;
};

async function fullUpdate() {
  console.log("ATTEMPTING TO UPDATE IDENTITY");
  try {
    const player =
      (await lounge.getPlayerStatsByName(playerName)) ||
      (await lounge.getPlayerStatsByDiscordId(userId));
    await refreshApplicationIdentity(buildDataFromPlayer(player));
    console.log("UPDATED APPLICATION IDENTITY FOR " + player.name);
  } catch (e) {
    console.log("FAILED TO UPDATE IDENTITY", e);
  }
}

(async () => {
  await fullUpdate();
})();

if (!process.argv.includes("--onetime")) {
  console.log("STARTING INTERVAL - UPDATING WIDGET EVERY 180 SECONDS");
  setInterval(async () => {
    await fullUpdate();
  }, 180e3);
} else {
  console.log(`SYNCED WIDGET ONCE, EXITING`);
}
