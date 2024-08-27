import { execSync } from "child_process";
import * as puppeteer from "puppeteer";

async function installBrowser(): Promise<void> {
  console.log("Starting browser installation...");
  try {
    // This will trigger the browser download if it's not already present
    const browser = await puppeteer.launch();
    await browser.close();
    console.log("Browser installation completed successfully.");
  } catch (error) {
    console.error("Error during browser installation:", error);
    // If the above fails, try a manual installation
    try {
      console.log("Attempting manual browser installation...");
      execSync("node node_modules/puppeteer/install.js", { stdio: "inherit" });
      console.log("Manual browser installation completed successfully.");
    } catch (manualError) {
      console.error("Manual browser installation failed:", manualError);
      throw manualError;
    }
  }
}

export default installBrowser;
