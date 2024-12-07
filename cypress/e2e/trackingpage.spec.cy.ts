describe("Tracking Page", () => {
  it("Change Pending to Signed", () => {
    cy.visit("http://localhost:8000/");
    cy.selectPDFFile();
    cy.signDocument('[data-testid="input-email"]', "usuario@ejemplo.com");
    cy.get(".upload-document > .MuiStack-root > .MuiButtonBase-root").should(
      "be.disabled"
    );
    cy.redirectToTracking("#nav-link-tracking");
    cy.get(".list-items__container > :nth-child(2)").click();

    cy.get('.list-items__container > span').contains("Signed");
  });

  it("Change Pending to Declined", () => {
    cy.visit("http://localhost:8000/");
    cy.selectPDFFile();
    cy.signDocument('[data-testid="input-email"]', "usuario@ejemplo.com");
    cy.get(".upload-document > .MuiStack-root > .MuiButtonBase-root").should(
      "be.disabled"
    );
    cy.redirectToTracking("#nav-link-tracking");
    cy.get(".list-items__container > :nth-child(3)").click();

    cy.get('.list-items__container > span').contains("Declined");
  });
});
