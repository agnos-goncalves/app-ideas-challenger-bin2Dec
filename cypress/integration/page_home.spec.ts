describe('Check Binary Page Converter', () => {
  beforeEach(()=>{
    cy.visit('http://localhost:8080');
  })

  it('when insert valid binary should show list results with binary and decimal value', () => {
    cy.get('.form-conversor-binary__field').type('1111')
    cy.get('.form-conversor-binary__btn').click();
    cy.get('.box-converter-result__item').contains('1111');
    cy.get('.box-converter-result__item').contains('15');
  })

  it('when insert invalid binary should show message invalid value and result list should void', () => {
    cy.get('.form-conversor-binary__field').type('1111a')
    cy.get('.form-conversor-binary__message').should('be.visible') 
    cy.get('.form-conversor-binary__btn').click();
    cy.get('.box-converter-result').should('be.empty');
  })
  
})