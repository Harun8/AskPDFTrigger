import { app, InvocationContext, Timer } from "@azure/functions";
import { callScraper } from "../../cypress/e2e/spec.cy";
// import puppeteer from "puppeteer-core";
import puppeteer from "puppeteer";

import path = require("path");
export async function AskPDFTrigger(
  myTimer: Timer,
  context: InvocationContext
): Promise<void> {
  context.log("Timer function processed request.");
  console.log("calling scrape!!!!!!!!!!!");
  try {
    await scrape(context);
  } catch (error) {
    context.log("Error during scraping: ", error);
  }
}

app.timer("AskPDFTrigger", {
  schedule: "45 30 15 * * 1",
  handler: AskPDFTrigger,
});
async function scrape(context: InvocationContext) {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  await page.goto("https://www.askpdfs.io/preview");

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
