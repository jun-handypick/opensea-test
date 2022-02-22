import express from "express";
import path from "path";
import Caver from "caver-js";
import AlienKIP17Token_ABI from "./AlienKIP17Token_ABI";
import AlienKIP17Token_ADDR from "./AlienKIP17Token_ADDR";
import fs from "fs";

const app = express();
const port = process.env.PORT || 5000;

app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => res.send("Test open-sea"));

app.get("/token/:token_id", (req, res) => {
    console.log("/token/:token_id");
    const tokenId = parseInt(req.params.token_id).toString();
    const filePath = path.join(__dirname, `./metadatas/metadata_${tokenId}.json`);

    if (fs.existsSync(filePath)) {
        const jsonFile = fs.readFileSync(filePath, "utf-8");
        res.send(jsonFile);
        console.log(jsonFile);
    } else {
        res.send(`not found metadata. token id: ${tokenId}}`);
        console.log(`not found metadata. token id: ${tokenId}}`);
    }
});

app.get("/images/:image_id", (req, res) => {
    console.log("/images/:image_id");
    const imageId = parseInt(req.params.image_id).toString();
    const filePath = path.join(__dirname, `./images/Alien${imageId}.png`);

    if (fs.existsSync(filePath)) {
        res.sendFile(filePath);
        console.log(`image path: ${filePath}`);
    } else {
        res.send(`not found image. image id: ${imageId}}`);
        console.log(`not found image. image id: ${imageId}}`);
    }
});

app.listen(port, () => {
    console.log("Node app is running on port", port);

    // 이벤트를 확인하기 위해서는 웹소켓 provider를 제공해야 한다
    const caver = new Caver("wss://api.baobab.klaytn.net:8652/");

    // event check
    try {
        // @ts-ignore
        const smartContract = new caver.klay.Contract(AlienKIP17Token_ABI, AlienKIP17Token_ADDR);
        smartContract.events.Mint(null, (err, event) => {
            if (event.event === "Mint") {
                // 여기서 Metadata에 관련된 데이터를 만들어 줘야 합니다..
                console.log("\nMint event!");
                console.log(`owner: ${event.returnValues.owner}`);
                console.log(`tokenId: ${event.returnValues.tokenId}`);
                console.log("\n");

                // json 파일 생성
                // open sea에서 제공하는 json 형식에 맞춰 재작 합니다
                // https://docs.opensea.io/docs/metadata-standards
                const tokenId = event.returnValues.tokenId;
                const imageId = 91;

                // egg 상태가 아니라면 아래와 같이
                const level = 1;
                const hashPower = 22;
                const filePath = path.join(__dirname, `./metadatas/metadata_${tokenId}.json`);
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
                fs.writeFile(
                    filePath,
                    JSON.stringify({
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
                    }),
                    (err) => {
                        if (err) {
                            console.error(err);
                        }
                    }
                );
            }
        });
    } catch (e) {}
});
