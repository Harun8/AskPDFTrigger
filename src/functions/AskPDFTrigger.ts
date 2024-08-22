import { app, InvocationContext, Timer } from "@azure/functions";
import { callScraper } from "../../cypress/e2e/spec.cy";
import puppeteer from "puppeteer-core";
export async function AskPDFTrigger(
  myTimer: Timer,
  context: InvocationContext
): Promise<void> {
  context.log("Timer function processed request.");
  scrape();
}

app.timer("AskPDFTrigger", {
  schedule: "45 30 15 * * 1",
  handler: AskPDFTrigger,
});
async function scrape() {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  await page.goto("https://www.askpdfs.io/preview");

  // You can add your scraping logic here
  await page.waitForSelector('[id="message"]');
  await page.type('[id="message"]', "hi");
  await page.click("button.bg-blue-500.text-white.rounded.p-2.mt-2");

  // Add other logic as needed
  await browser.close();
}
