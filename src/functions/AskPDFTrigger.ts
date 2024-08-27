import { app, InvocationContext, Timer } from "@azure/functions";
import * as puppeteer from "puppeteer";
import installBrowser from "../install-browser";

export async function AskPDFTrigger(
  myTimer: Timer,
  context: InvocationContext
): Promise<void> {
  context.log("Timer function processed request.");
  console.log("calling scrape!!!!!!!!!!!");
  try {
    await installBrowser();
    await scrape(context);
  } catch (error) {
    context.log("Error during scraping: ", error);
  }
}

app.timer("AskPDFTrigger", {
  schedule: "0 */1 * * * *",
  handler: AskPDFTrigger,
});
async function scrape(context: InvocationContext) {
  const browser = await puppeteer.launch({
    headless: true,
    // executablePath:
    //   "./node_modules/puppeteer/.local-chromium/win64-1036745/chrome-win/chrome.exe",

    args: ["--no-sandbox", "--disable-setuid-sandbox"], // These flags are often necessary for Azure
  });
  const page = await browser.newPage();
  await page.goto("https://www.askpdfs.io/preview", {
    waitUntil: "networkidle0",
  });

  context.log("Scraping in progress...");

  try {
    await page.waitForSelector('[id="message"]');
    await page.type('[id="message"]', "hi");
    await page.click("button.bg-blue-500.text-white.rounded.p-2.mt-2");

    context.log("Scraping completed.");
  } catch (err) {
    context.log("Error during scraping: ", err);
  } finally {
    await browser.close();
  }
}
