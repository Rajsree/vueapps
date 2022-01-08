const puppeteer = require('puppeteer');
const express = require('express');

const path = require('path');
const cors = require('cors');

const app = express();
app.use('/static', express.static(path.join(__dirname, 'public')));
app.use(cors())

app.use(express.json());


app.post("/screenshot", async(req,res) => {

    //set Path and ID
    const ID = (new Date().getTime().toString(36));
    const loc = "./public/screenshots/" + ID + ".png";

    //start Browser
    const browser = await puppeteer.launch( {
        defaultViewport : {
            width : 1920,
            height: 1080
        },
        ignoreDefaultArgs : ["--disable-extensions"]
    })

    //open page
    const page = await browser.newPage();
    await page.goto(req.body.url);

    //Take screenshot
    await page.screenshot({path : loc});

    await browser.close();

    res.json({
        success: true,
        ID
    })
})
app.listen(5000, () => {
    console.log("server has started on port 5000")
})