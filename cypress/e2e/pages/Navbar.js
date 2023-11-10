 export default class Navbar{
    get homePage(){
        return cy.get('.avtive')
    }

    get articles(){
        return cy.get('[href="/articles"]')
    }

    get topics(){
        return cy.get('[href="/articles/topics"]')
    }

    get users(){
        return cy.get('#myTopnav > :nth-child(4)')
    }

    get contact(){
        return cy.get('#myTopnav > :nth-child(5)')
    }
}