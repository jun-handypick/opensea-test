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
    console.log("/token/:token_id");
    var tokenId = parseInt(req.params.token_id).toString();
    var filePath = path_1.default.join(__dirname, "./metadatas/metadata_".concat(tokenId, ".json"));
    if (fs_1.default.existsSync(filePath)) {
        var jsonFile = fs_1.default.readFileSync(filePath, "utf-8");
        res.json(jsonFile);
        console.log(jsonFile);
    }
    else {
        res.send("not found metadata. token id: ".concat(tokenId, "}"));
        console.log("not found metadata. token id: ".concat(tokenId, "}"));
    }
});
app.get("/images/:image_id", function (req, res) {
    console.log("/images/:image_id");
    var imageId = parseInt(req.params.image_id).toString();
    var filePath = path_1.default.join(__dirname, "./images/Alien".concat(imageId, ".png"));
    if (fs_1.default.existsSync(filePath)) {
        res.sendFile(filePath);
        console.log("image path: ".concat(filePath));
    }
    else {
        res.send("not found image. image id: ".concat(imageId, "}"));
        console.log("not found image. image id: ".concat(imageId, "}"));
    }
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
                var filePath = path_1.default.join(__dirname, "./metadatas/metadata_".concat(tokenId, ".json"));
                console.log(filePath);
                // fs.writeFile(
                //     filePath,
                //     JSON.stringify({
                //         name: tokenId,
                //         description: "kop alien token",
                //         image: `https://opensea--test.herokuapp.com/images/${imageId}`,
                //         attributes: [
                //             {
                //                 trait_type: "Level",
                //                 value: level,
                //             },
                //             {
                //                 trait_type: "Hash Power",
                //                 value: hashPower,
                //             },
                //         ],
                //     }),
                //     (err) => {
                //         if (err) {
                //             console.error(err);
                //         }
                //     }
                // );
                fs_1.default.writeFile(filePath, JSON.stringify({
                    attributes: [
                        {
                            trait_type: "base",
                            value: "narwhal",
                        },
                        {
                            trait_type: "eyes",
                            value: "sleepy",
                        },
                        {
                            trait_type: "mouth",
                            value: "cute",
                        },
                        {
                            trait_type: "level",
                            value: 4,
                        },
                        {
                            trait_type: "stamina",
                            value: 90.2,
                        },
                        {
                            trait_type: "personality",
                            value: "boring",
                        },
                        {
                            display_type: "boost_number",
                            trait_type: "aqua_power",
                            value: 10,
                        },
                        {
                            display_type: "boost_percentage",
                            trait_type: "stamina_increase",
                            value: 5,
                        },
                        {
                            display_type: "number",
                            trait_type: "generation",
                            value: 1,
                        },
                    ],
                    description: "Friendly OpenSea Creature that enjoys long swims in the ocean.",
                    external_url: "https://example.com/?token_id=3",
                    image: "https://storage.googleapis.com/opensea-prod.appspot.com/creature/3.png",
                    name: "Dave Starbelly",
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