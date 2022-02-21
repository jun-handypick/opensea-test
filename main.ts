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
    const tokenId = parseInt(req.params.token_id).toString();

    const imageId = 91;

    // egg 상태가 아니라면 아래와 같이
    const level = 1;
    const hashPower = 22;
    fs.writeFileSync(
        `./metadatas/metadata_${tokenId}.json`,
        JSON.stringify({
            name: tokenId,
            description: "kop alien token",
            image: `https://opensea--test.herokuapp.com/token/${imageId}`,
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
        })
    );

    const jsonFile = fs.readFileSync(`./metadatas/metadata_${tokenId}.json`, "utf-8");

    res.send(jsonFile);
    console.log(jsonFile);
});

app.get("/images/:image_id", (req, res) => {
    const imageId = parseInt(req.params.image_id).toString();
    res.sendFile(path.join(__dirname, `./images/Alien${imageId}.png`));
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
                fs.writeFile(
                    `./metadatas/metadata_${tokenId}.json`,
                    JSON.stringify({
                        name: tokenId,
                        description: "kop alien token",
                        image: `https://opensea--test.herokuapp.com/images/${imageId}`,
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
