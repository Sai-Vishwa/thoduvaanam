const puppeteer = require('puppeteer');

async function verifySubmission(req,res) {
    console.log("im called");
    const divStr = "#qd-content > "+
            "div:nth-child(1) > "+"div:nth-child(4) > "+"div:nth-child(1) > "+"div:nth-child(1) > "
            +"div:nth-child(1) > "+"div:nth-child(2) > "+"div:nth-child(1) > "+"div:nth-child(1) > "
            +"div:nth-child(1) > "+"div:nth-child(1) > span";
    console.log(divStr)
    try{

        (async ()=>{
            console.log("function triggered")
            const browser = await puppeteer.launch({
                executablePath: "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
                headless: false,
                args:['--user-data-dir=C:\\Users\\SaivishwaramRamkumar\\AppData\\Local\\Google\\Chrome\\User Data']
            });
            console.log("browser is accessed")
            const page = await browser.newPage();
            console.log("new page created")

            
            await page.goto(req.body.url);
            console.log("webpage is opened")
            await page.waitForSelector("#qd-content")
            const status = await page.evaluate(()=>{
                console.log("inside the eval")
                const div = document.querySelector("#qd-content > div:nth-child(1) > div:nth-child(4) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > span");
                console.log("div is found")
                return div?div.textContent():"error"
            });
            res.status(200).json({
                msg:status
            })
            console.log("response is sent")
            browser.close();
        })();
    }
    catch(error){
        console.log(error);
        res.status(400).json({
            err:"Error verifying submission"
        })
    }
}

module.exports={
    verifySubmission
}