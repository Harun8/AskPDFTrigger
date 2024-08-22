export const callScraper = () => {
  describe("Free plan", () => {
    it("You should see the free pricing plans", () => {
      cy.visit("https://www.askpdfs.io/preview");

      // Store the element reference
      cy.get(`[id="message"]`).as("messageField");

      // Ensure the element exists, then wait and type into it
      cy.get("@messageField").should("exist").wait(5000);
      cy.get("@messageField").type("hi");
      // btn doesnt have an id or attribute so using the tailwind class to find it
      cy.get("button.bg-blue-500.text-white.rounded.p-2.mt-2").click();

      // Wait for the div with specific classes to be displayed
      cy.get(
        "div.whitespace-pre-line.mt-4.mb-4.pl-4.py-4.ml-2.mr-2.flex.justify-start.rounded-lg.text-blue-500.font-semibold.bg-zinc-200.dark\\:bg-gray-800"
      ).should("be.visible");
    });

    // it("You should be able to click the button the get signed up ", () => {
    //   cy.get(`[data-testid="cypress-freeTierBtn"]`).should("exist");
    // });
  });
};
