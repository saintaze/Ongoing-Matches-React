beforeEach(() => {
    cy.visit('/')
  })
  
  it('has title', () => {
    cy.contains('Ongoing Games')
  })