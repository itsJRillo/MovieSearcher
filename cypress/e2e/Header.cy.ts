// cypress/integration/header.spec.js
describe('Header Component', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('renders the header with navigation links', () => {
    cy.get('img[alt="logo Shoten"]').should('be.visible');

    cy.get('nav').within(() => {
      cy.contains('Home').should('be.visible');
      cy.contains('Search').should('be.visible');
      cy.contains('My List').should('be.visible');
      cy.contains('Movies').should('be.visible');
      cy.contains('TV Series').should('be.visible');
    });

    cy.get('select').should('be.visible');
  });

  it('opens the profile dropdown on hover and allows logout', () => {
    cy.get('[alt="Profile icon"]').should('be.visible');
    cy.get('[alt="Profile icon"]').trigger('mouseover');
    cy.getBySel('dropdown-menu').should('be.visible');

    cy.contains('Account').should('be.visible');
    cy.contains('My List').should('be.visible');
    cy.contains('Logout').should('be.visible');

    cy.contains('Logout').click();
  });

  it('changes language when selected', () => {
    cy.get('select').select('ES');
  });
});
