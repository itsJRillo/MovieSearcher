describe("Smoke test", () => {
  it("Main page is loading", () => {
    cy.visit("http://localhost:5173/");
  });
});
