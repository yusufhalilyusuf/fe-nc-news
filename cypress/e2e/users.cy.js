/// <reference types="Cypress" />

describe("Users page", () => {

  before(()=>{
    cy.visit('/users').then(win=>{

      cy.spy(win.localStorage,'setItem').as('setUser');
      cy.spy(win.localStorage,'getItem').as('getUser');
    })
  })
  it("should show all users", () => {
    cy.visit("/users");
    cy.get(".article").should("have.length", "6");
  });

  it("should allow user to select any of the users on the list", () => {
    cy.visit("/users");
    cy.get(".article").eq(0).click();
    cy.getAllLocalStorage().should("not.be.empty");
    cy.getAllLocalStorage()
      .its("https://fe-news.netlify.app")
      .then((res) => {
        expect(res.auth).contains("tickle122");
      });
  });
  it.only("should allow user to re-select another users on the list", () => {
    cy.visit("/users");
    cy.get('[value="tickle122"] > :nth-child(3)').then((avt) => {
      cy.log(avt.text());
    });
    cy.get('[value="tickle122"] > :nth-child(3)').click();
    cy.get(".avt").should("have.attr", "src").should("include", "1953");
    
    
    cy.getAllLocalStorage().should("not.be.empty");
    cy.getAllLocalStorage()
      .its("https://fe-news.netlify.app")
      .then((res) => {
        expect(res.auth).contains("tickle122");
      });
      cy.get('[value="grumpy19"] > :nth-child(3)').click();
      cy.getAllLocalStorage()
      .its("https://fe-news.netlify.app")
      .then((res) => {
        expect(res.auth).contains("grumpy19");
      });
      // cy.get('@setUser').should('have.been.called')
  });
});
