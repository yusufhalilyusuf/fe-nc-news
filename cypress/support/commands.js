// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add('areItemsOrdered',(order='Date',sort='Descending')=>{
cy.get('p.box').should()
})


// then(res=>{
//     const actual = [...res].map((item)=>{
//         return item.innerText.replaceAll(/\D/gi,'')
//     })
//     if(sort==='Descending'){
//         cy.log('hi')
//         expect(actual).to.deep.eq([...actual].sort().reverse())
//     }else{
//         cy.log('ho')
//         expect(actual).to.deep.eq([...actual].sort())
//     }
// })