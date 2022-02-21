"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var path_1 = __importDefault(require("path"));
var caver_js_1 = __importDefault(require("caver-js"));
var AlienKIP17Token_ABI_1 = __importDefault(require("./AlienKIP17Token_ABI"));
var AlienKIP17Token_ADDR_1 = __importDefault(require("./AlienKIP17Token_ADDR"));
var PORT = 5000;
var app = (0, express_1.default)()
    .set("port", PORT)
    .set("views", path_1.default.join(__dirname, "views"))
    .set("view engine", "ejs");
app.use(express_1.default.static(path_1.default.join(__dirname, "public")));
app.get("/token/:token_id", function (req, res) {
    var tokenId = parseInt(req.params.token_id).toString();
    // 여기서 db가 있다면 db 와 연동
    var data = {
        name: tokenId,
        attributes: {
            status: "egg",
        },
    };
    res.send(data);
    console.log(data);
});
app.listen(app.get("port"), function () {
    console.log("Node app is running on port", app.get("port"));
    // 이벤트를 확인하기 위해서는 웹소켓 provider를 제공해야 한다
    var caver = new caver_js_1.default("wss://api.baobab.klaytn.net:8652/");
    // event check
    try {
        // @ts-ignore
        var smartContract = new caver.klay.Contract(AlienKIP17Token_ABI_1.default, AlienKIP17Token_ADDR_1.default);
        smartContract.events.Mint(null, function (err, event) {
            console.log(event);
            if (event.event === "Mint") {
                console.log("owner: ".concat(event.returnValues.owner));
                console.log("tokenId: ".concat(event.returnValues.tokenId));
            }
        });
    }
    catch (e) { }
});
//# sourceMappingURL=main.js.map