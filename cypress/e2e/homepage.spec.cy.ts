describe("HomePage with out errors", () => {
  it("visit localhost", () => {
    cy.visit("http://localhost:8000/");
  });

  it("Select file on desktop", () => {
    cy.visit("http://localhost:8000/");
    cy.selectPDFFile();
  });

  it("Select pdf file and upload it", () => {
    cy.visit("http://localhost:8000/");
    cy.selectPDFFile();
    cy.get(".upload-document > .MuiStack-root > .MuiButtonBase-root").click();
    cy.get(".sign-document > .custom-step").contains("Paso 2");
  });

  it("Select pdf file and add signer email", () => {
    cy.visit("http://localhost:8000/");
    cy.selectPDFFile();
    cy.get(".upload-document > .MuiStack-root > .MuiButtonBase-root").click();

    cy.get('[data-testid="input-email"]', { withinSubject: null }).should(
      "exist"
    );
    cy.get('[data-testid="input-email"]').type("usuario@ejemplo.com");
    cy.get(".sign-document > .MuiStack-root > .MuiButtonBase-root").click();

    cy.get(".Toastify__toast-body > :nth-child(2)").contains("Firma enviada!");
  });

  it("Show Pendind Documents", () => {
    cy.visit("http://localhost:8000/");
    cy.selectPDFFile();
    cy.signDocument('[data-testid="input-email"]', "usuario@ejemplo.com");
    cy.get(".upload-document > .MuiStack-root > .MuiButtonBase-root").should(
      "be.disabled"
    );
    cy.redirectToTracking("#nav-link-tracking");
  });
});
