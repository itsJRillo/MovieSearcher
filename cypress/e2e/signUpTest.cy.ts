describe("Sign up", () => {
  beforeEach(() => {
    cy.visit("http://localhost:5173/");
  });

  it("EmptyHeader component is rendering", () => {
    cy.getBySel("EmptyHeader").should("be.visible");
  });

  it("Sign up and verify endpoint and header", () => {
    cy.getBySel("toSignupButton").click();
    cy.url().should("include", "/sign-up");

    cy.getBySel("signupContainer")
      .should("be.visible")
      .then(() => {
        cy.getBySel("signupUserInput").type("GazelXVII");
        cy.getBySel("signupEmailInput").type("juan2@gmail.com");
        cy.getBySel("signupPasswordInput").type("hola12345");
        cy.getBySel("signupRepasswordInput").type("hola12345");
        cy.getBySel("submitSignup").click();
      });
  });
});
