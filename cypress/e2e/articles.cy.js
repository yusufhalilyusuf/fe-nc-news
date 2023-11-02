describe('Articles page', () => {
   it('should have sortby with date, votes and comment count options ', () => {
    cy.visit('/articles')
    cy.get('[name=sort_by] option').then(options=>{
      const actual = [...options].map(option=>{return option.text});
       cy.log(actual)
       expect(actual).to.deep.eq(['Date', 'Votes', 'Comment Count'])
    })
   }); 
});