"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RankIcons = exports.GameModes = exports.GameMode = void 0;
const axios_1 = require("axios");
var GameMode;
(function (GameMode) {
    GameMode["MKWORLD_12P"] = "mkworld12p";
    GameMode["MKWORLD_24P"] = "mkworld24p";
})(GameMode || (exports.GameMode = GameMode = {}));
exports.GameModes = {
    [GameMode.MKWORLD_12P]: "12P",
    [GameMode.MKWORLD_24P]: "24P",
};
exports.RankIcons = {
    ["Grandmaster"]: "https://files.ducky.wiki/share/public_assets/external/lounge_ranks/grandmaster.png",
    ["Master"]: "https://files.ducky.wiki/share/public_assets/external/lounge_ranks/master.png",
    ["Diamond"]: "https://files.ducky.wiki/share/public_assets/external/lounge_ranks/diamond.png",
    ["Ruby"]: "https://files.ducky.wiki/share/public_assets/external/lounge_ranks/ruby.png",
    ["Sapphire"]: "https://files.ducky.wiki/share/public_assets/external/lounge_ranks/sapphire.png",
    ["Platinum"]: "https://files.ducky.wiki/share/public_assets/external/lounge_ranks/platinum.png",
    ["Gold"]: "https://files.ducky.wiki/share/public_assets/external/lounge_ranks/gold.png",
    ["Silver"]: "https://files.ducky.wiki/share/public_assets/external/lounge_ranks/silver.png",
    ["Bronze"]: "https://files.ducky.wiki/share/public_assets/external/lounge_ranks/bronze.png",
    ["Iron"]: "https://files.ducky.wiki/share/public_assets/external/lounge_ranks/iron.png",
};
class Lounge {
    constructor() {
        this.baseUrl = "https://lounge.mkcentral.com/api/player/details";
        this.tableUrl = "https://lounge.mkcentral.com/api/table";
        this.currentSeason = 3;
        this.defaultGameMode = GameMode.MKWORLD_12P;
    }
    getRankImage(rank) {
        return exports.RankIcons[rank];
    }
    async getPlayerStatsByName(name, gameMode = this.defaultGameMode, season = this.currentSeason) {
        const res = await (0, axios_1.get)(`${this.baseUrl}?game=${gameMode}&name=${name}&season=${season}`);
        return res.data || null;
    }
    async getPlayerStatsByMkcId(id, gameMode = this.defaultGameMode, season = this.currentSeason) {
        const res = await (0, axios_1.get)(`${this.baseUrl}?game=${gameMode}&mkcid=${id}&season=${season}`);
        return res.data || null;
    }
    async getPlayerStatsByLoungeId(id, gameMode = this.defaultGameMode, season = this.currentSeason) {
        const res = await (0, axios_1.get)(`${this.baseUrl}?game=${gameMode}&id=${id}&season=${season}`);
        return res.data || null;
    }
    async getPlayerStatsByDiscordId(id, gameMode = this.defaultGameMode, season = this.currentSeason) {
        const res = await (0, axios_1.get)(`${this.baseUrl}?game=${gameMode}&discordId=${id}&season=${season}`);
        return res.data || null;
    }
    async getTable(id) {
        const res = await (0, axios_1.get)(`${this.tableUrl}?tableId=${id}`);
        if (res.data) {
            res.data.url = `https://lounge.mkcentral.com${res.data.url}`;
        }
        return res.data || null;
    }
}
exports.default = Lounge;
//# sourceMappingURL=Lounge.js.map