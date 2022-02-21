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
var fs_1 = __importDefault(require("fs"));
var app = (0, express_1.default)();
var port = process.env.PORT || 5000;
app.use(express_1.default.static(path_1.default.join(__dirname, "public")));
app.get("/", function (req, res) { return res.send("Test open-sea"); });
app.get("/token/:token_id", function (req, res) {
    var tokenId = parseInt(req.params.token_id).toString();
    var jsonFile = fs_1.default.readFileSync("./metadatas/metadata_".concat(tokenId, ".json"), "utf-8");
    res.send(jsonFile);
    console.log(jsonFile);
});
app.get("/images/:image_id", function (req, res) {
    var imageId = parseInt(req.params.image_id).toString();
    res.sendFile(path_1.default.join(__dirname, "./images/Alien".concat(imageId, ".png")));
});
app.listen(port, function () {
    console.log("Node app is running on port", port);
    // 이벤트를 확인하기 위해서는 웹소켓 provider를 제공해야 한다
    var caver = new caver_js_1.default("wss://api.baobab.klaytn.net:8652/");
    // event check
    try {
        // @ts-ignore
        var smartContract = new caver.klay.Contract(AlienKIP17Token_ABI_1.default, AlienKIP17Token_ADDR_1.default);
        smartContract.events.Mint(null, function (err, event) {
            if (event.event === "Mint") {
                // 여기서 Metadata에 관련된 데이터를 만들어 줘야 합니다..
                console.log("\nMint event!");
                console.log("owner: ".concat(event.returnValues.owner));
                console.log("tokenId: ".concat(event.returnValues.tokenId));
                console.log("\n");
                // json 파일 생성
                // open sea에서 제공하는 json 형식에 맞춰 재작 합니다
                // https://docs.opensea.io/docs/metadata-standards
                var tokenId = event.returnValues.tokenId;
                var imageId = 91;
                // egg 상태가 아니라면 아래와 같이
                var level = 1;
                var hashPower = 22;
                fs_1.default.writeFile("./metadatas/metadata_".concat(tokenId, ".json"), JSON.stringify({
                    name: tokenId,
                    description: "kop alien token",
                    image: "https://opensea--test.herokuapp.com/images/Alien".concat(imageId, ".png"),
                    attributes: [
                        {
                            trait_type: "Level",
                            value: level,
                        },
                        {
                            trait_type: "Hash Power",
                            value: hashPower,
                        },
                    ],
                }), function (err) {
                    if (err) {
                        console.error(err);
                    }
                });
            }
        });
    }
    catch (e) { }
});
//# sourceMappingURL=main.js.map