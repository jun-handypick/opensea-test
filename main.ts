import express from "express";
import path from "path";
import Caver from "caver-js";
import AlienKIP17Token_ABI from "./AlienKIP17Token_ABI";
import AlienKIP17Token_ADDR from "./AlienKIP17Token_ADDR";
import fs from "fs";

const app = express();
const port = process.env.PORT || 5000;

app.get("/token/:token_id", (req, res) => {
    const tokenId = parseInt(req.params.token_id).toString();
    const filePath = path.join(__dirname, `./metadatas/metadata_${tokenId}.json`);

    if (fs.existsSync(filePath)) {
        const jsonFile = fs.readFileSync(filePath, "utf-8");
        res.setHeader("Content-Type", "application/json");
        res.send(jsonFile);
    } else {
        res.send(`not found metadata. token id: ${tokenId}}`);
    }
});

app.get("/images/:image_id", (req, res) => {
    const imageId = parseInt(req.params.image_id).toString();
    // const filePath = path.join(__dirname, `./images/Alien${imageId}.png`);
    const filePath = path.join(__dirname, `./images/EggTest.gif`);

    if (fs.existsSync(filePath)) {
        res.sendFile(filePath);
    } else {
        res.send(`not found image. image id: ${imageId}}`);
    }
});

function mintEvent() {
    // 이벤트를 확인하기 위해서는 웹소켓 provider를 제공해야 한다
    const caver = new Caver("wss://api.baobab.klaytn.net:8652/");

    // event check
    try {
        // @ts-ignore
        const smartContract = new caver.klay.Contract(AlienKIP17Token_ABI, AlienKIP17Token_ADDR);
        smartContract.events.Mint(null, (err, event) => {
            if (event.event === "Mint") {
                // Mint 이벤트가 발생하면, Mint 관련된 데이터를
                // db나 json 파일에 저장해야 합니다.
                // db 에 저장한다면, get() "/images/:image_id" 함수가 호출되면
                // open sea 의 metadata 방식으로 전달

                const tokenId = event.returnValues.tokenId;
                const imageId = 91;
                const level = 1;
                const hashPower = 22;
                const status = "Egg";

                // json 파일 생성
                // open sea에서 제공하는 json 형식에 맞춰 재작 합니다
                // https://docs.opensea.io/docs/metadata-standards

                const filePath = path.join(__dirname, `./metadatas/metadata_${tokenId}.json`);
                fs.writeFile(
                    filePath,
                    JSON.stringify({
                        name: tokenId,
                        description: "kop alien token",
                        image: `https://opensea--test.herokuapp.com/images/${imageId}`,
                        attributes: [
                            {
                                trait_type: "Status",
                                value: status,
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
}

app.listen(port, () => {
    console.log("Node app is running on port", port);

    mintEvent();
});
