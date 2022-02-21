import express from "express";
import path from "path";
import Caver from "caver-js";
import AlienKIP17Token_ABI from "./AlienKIP17Token_ABI";
import AlienKIP17Token_ADDR from "./AlienKIP17Token_ADDR";

const PORT = 5000;

const app = express()
    .set("port", PORT)
    .set("views", path.join(__dirname, "views"))
    .set("view engine", "ejs");

app.use(express.static(path.join(__dirname, "public")));

app.get("/token/:token_id", (req, res) => {
    const tokenId = parseInt(req.params.token_id).toString();
    // 여기서 db가 있다면 db 와 연동

    const data = {
        name: tokenId,
        attributes: {
            status: "egg",
        },
    };
    res.send(data);
    console.log(data);
});

app.listen(app.get("port"), () => {
    console.log("Node app is running on port", app.get("port"));

    // 이벤트를 확인하기 위해서는 웹소켓 provider를 제공해야 한다
    const caver = new Caver("wss://api.baobab.klaytn.net:8652/");

    // event check
    try {
        // @ts-ignore
        const smartContract = new caver.klay.Contract(AlienKIP17Token_ABI, AlienKIP17Token_ADDR);
        smartContract.events.Mint(null, (err, event) => {
            if (event.event === "Mint") {
                // 여기서 Metadata에 관련된 데이터를 만들어 줘야 한다 만들어 줘야 합니다..
                console.log("\nMint event!");
                console.log(`owner: ${event.returnValues.owner}`);
                console.log(`tokenId: ${event.returnValues.tokenId}`);
                console.log("\n");
            }
        });
    } catch (e) {}
});
