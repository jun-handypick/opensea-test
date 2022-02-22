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
app.get("/token/:token_id", function (req, res) {
    var tokenId = parseInt(req.params.token_id).toString();
    var filePath = path_1.default.join(__dirname, "./metadatas/metadata_".concat(tokenId, ".json"));
    if (fs_1.default.existsSync(filePath)) {
        var jsonFile = fs_1.default.readFileSync(filePath, "utf-8");
        res.setHeader("Content-Type", "application/json");
        res.send(jsonFile);
    }
    else {
        res.send("not found metadata. token id: ".concat(tokenId, "}"));
    }
});
app.get("/images/:image_id", function (req, res) {
    var imageId = parseInt(req.params.image_id).toString();
    // const filePath = path.join(__dirname, `./images/Alien${imageId}.png`);
    var filePath = path_1.default.join(__dirname, "./images/EggTest.gif");
    if (fs_1.default.existsSync(filePath)) {
        res.sendFile(filePath);
    }
    else {
        res.send("not found image. image id: ".concat(imageId, "}"));
    }
});
function mintEvent() {
    // 이벤트를 확인하기 위해서는 웹소켓 provider를 제공해야 한다
    var caver = new caver_js_1.default("wss://api.baobab.klaytn.net:8652/");
    // event check
    try {
        // @ts-ignore
        var smartContract = new caver.klay.Contract(AlienKIP17Token_ABI_1.default, AlienKIP17Token_ADDR_1.default);
        smartContract.events.Mint(null, function (err, event) {
            if (event.event === "Mint") {
                // Mint 이벤트가 발생하면, Mint 관련된 데이터를
                // db나 json 파일에 저장해야 합니다.
                // db 에 저장한다면, get() "/images/:image_id" 함수가 호출되면
                // open sea 의 metadata 방식으로 전달
                var tokenId = event.returnValues.tokenId;
                var imageId = 91;
                var level = 1;
                var hashPower = 22;
                var status_1 = "Egg";
                // json 파일 생성
                // open sea에서 제공하는 json 형식에 맞춰 재작 합니다
                // https://docs.opensea.io/docs/metadata-standards
                var filePath = path_1.default.join(__dirname, "./metadatas/metadata_".concat(tokenId, ".json"));
                fs_1.default.writeFile(filePath, JSON.stringify({
                    name: tokenId,
                    description: "kop alien token",
                    image: "https://opensea--test.herokuapp.com/images/".concat(imageId),
                    attributes: [
                        {
                            trait_type: "Status",
                            value: status_1,
                        },
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
}
app.listen(port, function () {
    console.log("Node app is running on port", port);
    mintEvent();
});
//# sourceMappingURL=main.js.map