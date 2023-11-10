import Navbar from "./Navbar";

export default class ArticlePage extends Navbar{
    visit() {
        cy.visit("/articles")
      }
    get sortBy(){
         return cy.get(':nth-child(1) > .center')
    }

    applySortby(option){
        this.sortBy.select(option)
    }

    get orderBy(){
        return cy.get('#order')
    }

    applyOrderBy(option){
        this.orderBy.select(option)
    }

    selectArticleByIndex(index){
        cy.get(`.main > :nth-child(4) > :nth-child(${index})`)
    }

}