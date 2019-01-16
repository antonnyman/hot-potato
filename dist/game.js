"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const url_1 = require("url");
const firebase_1 = __importStar(require("./firebase"));
const headers_1 = require("./headers");
function getLobbies() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const lobbies = [];
            const response = yield firebase_1.db.collection('lobbies').onSnapshot(snapshot => snapshot.forEach(item => {
                return item.id;
            }));
            return response;
        }
        catch (e) {
            console.error(e);
        }
    });
}
exports.default = (req, res) => __awaiter(this, void 0, void 0, function* () {
    try {
        const { pathname = '/', query = {} } = url_1.parse(req.url, true);
        const { username } = query;
        console.log(firebase_1.default.SDK_VERSION);
        const lobbies = yield getLobbies();
        console.log(lobbies);
        const data = yield JSON.stringify({ ok: [] });
        headers_1.response(res, data);
    }
    catch (e) {
        headers_1.error(res, e);
    }
});
//# sourceMappingURL=game.js.map