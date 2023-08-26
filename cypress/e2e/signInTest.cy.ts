describe("Sign in", () => {
  beforeEach(() => {
    cy.visit("https://shoten-itsjrillo.netlify.app/");
  });

  it("EmptyHeader component is rendering", () => {
    cy.getBySel("EmptyHeader").should("be.visible");
  });

  it("Sign in and verify endpoint", () => {
    cy.getBySel("loginContainer")
      .should("be.visible")
      .then(() => {
        cy.getBySel("inputUserLogin").type("GazelXVI");
        cy.getBySel("inputPasswordLogin").type("hola12345");
        cy.getBySel("submitLogin").click();
      });

    cy.url().should("include", "/home");
    cy.getBySel("Header").should("be.visible");
  });
});
