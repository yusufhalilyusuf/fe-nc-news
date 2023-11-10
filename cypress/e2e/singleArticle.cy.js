describe('Article Page', () => { 
    it('should allow user to vote the article', () => {
        cy.visit('/articles/34')
        cy.get('section > :nth-child(1)').click()
        cy.get('.flex >').then(elements=>{
            const initial = Number((elements[1].innerText));
            elements[0].click();
            setTimeout(() => {
                expect(Number(elements[1].innerText)).to.eq(initial+1)
            }, 10);
        })
        cy.get('.flex >').eq(0).should('have.attr','disabled')
    });
 })