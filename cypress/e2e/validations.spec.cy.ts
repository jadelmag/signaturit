describe("Check validations", () => {
  it("Clear info when file is uploaded", () => {
    cy.visit("http://localhost:8000/");
    cy.selectPDFFile();
    cy.get(".upload-document > .MuiStack-root > .MuiButtonBase-root").click();

    cy.get(
      ".management-system__clear-button > .MuiStack-root > .MuiButtonBase-root"
    ).click();
    cy.get(".upload-document > .MuiStack-root > .MuiButtonBase-root").should(
      "be.disabled"
    );
  });

  it("Enter email not valid and turn it valid", () => {
    cy.visit("http://localhost:8000/");
    cy.selectPDFFile();
    cy.get(".upload-document > .MuiStack-root > .MuiButtonBase-root").click();
    cy.get('[data-testid="input-email"]').type("usuario@ejemplo,com");
    cy.get('[data-testid="svg"]').click();
    cy.get(
      ':nth-child(2) > .custom-input-email-container > [data-testid="input-email"]'
    ).type("usuario2@ejemplo.com");

    cy.get(".sign-document > .MuiStack-root > .MuiButtonBase-root").should(
      "be.disabled"
    );
  });

  it("Enter email valid and clear data", () => {
    cy.visit("http://localhost:8000/");
    cy.selectPDFFile();
    cy.get(".upload-document > .MuiStack-root > .MuiButtonBase-root").click();

    cy.get('[data-testid="input-email"]').type("usuario@ejemplo.com");
    cy.get('.management-system__clear-button > .MuiStack-root > .MuiButtonBase-root').click();
    cy.get('.upload-document > .MuiStack-root > .MuiButtonBase-root').should(
      "be.disabled"
    );
  });
});
