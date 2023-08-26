// cypress/support/index.d.ts
declare namespace Cypress {
    interface Chainable<Subject> {
      getBySel(dataTestAttribute: string): Chainable<JQuery<HTMLElement>>;
    }
  }
  