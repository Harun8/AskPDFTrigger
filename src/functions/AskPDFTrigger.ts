import { app, InvocationContext, Timer } from "@azure/functions";
import { callScraper } from "../../cypress/e2e/spec.cy";

export async function AskPDFTrigger(
  myTimer: Timer,
  context: InvocationContext
): Promise<void> {
  context.log("Timer function processed request.");
  callScraper();
}

app.timer("AskPDFTrigger", {
  schedule: "45 30 15 * * 1",
  handler: AskPDFTrigger,
});
