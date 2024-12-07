/// <reference types="cypress" />
// ***********************************************
// This example commands.ts shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
//
// declare global {
//   namespace Cypress {
//     interface Chainable {
//       login(email: string, password: string): Chainable<void>
//       drag(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       dismiss(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       visit(originalFn: CommandOriginalFn, url: string, options: Partial<VisitOptions>): Chainable<Element>
//     }
//   }
// }

declare global {
  namespace Cypress {
    interface Chainable {
      selectPDFFile(): Chainable<void>;
      signDocument(selector: string, email: string): Chainable<void>;
      redirectToTracking(selector: string): Chainable<void>;
    }
  }
}

Cypress.Commands.add("selectPDFFile", () => {
  cy.get("label").selectFile("cypress/fixtures/Javier-Delgado-CV.pdf");
  cy.get(".custom-file-input__files > span").contains("Javier-Delgado-CV.pdf");
});

Cypress.Commands.add("signDocument", (selector: string, email: string) => {
  cy.get(".upload-document > .MuiStack-root > .MuiButtonBase-root").click();

  cy.get(selector, { withinSubject: null }).should("exist");
  cy.get(selector).type(email);
  cy.get(".sign-document > .MuiStack-root > .MuiButtonBase-root").click();
});

Cypress.Commands.add("redirectToTracking", (selector: string) => {
  cy.get(selector).click({ force: true });

  cy.get("h2").contains("Documentos");
  cy.get(".list-items").should("have.length", 1);
});
