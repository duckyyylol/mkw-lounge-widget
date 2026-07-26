"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = require("dotenv");
const path_1 = require("path");
const Lounge_1 = __importStar(require("./class/Lounge"));
const axios_1 = require("axios");
(0, dotenv_1.configDotenv)({ path: (0, path_1.join)(process.cwd(), ".env"), quiet: true });
const applicationId = process.env.APPLICATION_ID;
const userId = process.env.USER_ID;
const token = process.env.BOT_TOKEN;
const playerName = process.env.LOUNGE_PLAYER_NAME;
let gamemode = `${process.env.LOUNGE_PLAYERS}`.toUpperCase();
if (!gamemode.endsWith("P"))
    gamemode = `${gamemode}P`;
console.log(`Tracking ${playerName} for gamemode ${gamemode}`);
const url = `https://discord.com/api/v9/applications/${applicationId}/users/${userId}/identities/0/profile`;
const lounge = new Lounge_1.default();
const refreshApplicationIdentity = async (data) => {
    try {
        await (0, axios_1.patch)(url, data, {
            headers: {
                Authorization: `Bot ${token}`,
                "Content-Type": "application/json",
            },
        });
    }
    catch (e) {
        console.log("UPDATE IDENTITY FAILED (FROM FUNC)", e);
    }
};
const buildDataFromPlayer = (player) => {
    let data = {
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
                        url: Lounge_1.RankIcons[player.rank],
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
        const player = (await lounge.getPlayerStatsByName(playerName)) ||
            (await lounge.getPlayerStatsByDiscordId(userId));
        await refreshApplicationIdentity(buildDataFromPlayer(player));
        console.log("UPDATED APPLICATION IDENTITY FOR " + player.name);
    }
    catch (e) {
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
}
else {
    console.log(`SYNCED WIDGET ONCE, EXITING`);
}
//# sourceMappingURL=index.js.map