describe("Not Found Page", () => {
  it("visit not found page", () => {
    cy.visit("http://localhost:8000/frfr");
    cy.get("h1").contains("404 - Page Not Found");
    cy.get("p").contains("Oops! The page you are looking for does not exist.");
    cy.get(".management-system > div > a").contains("Go to Home");
  });

  it("redirect to home from Notfoundpage", () => {
    cy.visit("http://localhost:8000/frfr");
    cy.get("h1").contains("404 - Page Not Found");
    cy.get("p").contains("Oops! The page you are looking for does not exist.");
    cy.get(".management-system > div > a").contains("Go to Home");
    cy.get(".management-system > div > a").click()
  });
});
