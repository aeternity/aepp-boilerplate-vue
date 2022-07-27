// https://docs.cypress.io/api/introduction/api.html

describe('HomeView.vue', () => {
  it('Verifies wallet', () => {
    cy.visit('/')
    cy.contains('h1', 'Welcome To Aeternity')

    cy.get('.wallet-address', { timeout: 15000 }).should('contain', 'ak_')
  })
})
