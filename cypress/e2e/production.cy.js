describe("Create Product", () => {
    beforeEach(() => {
        cy.visit("http://localhost:5173")
    })
  
    it("should create a new product", () => {
        cy.get('button').contains('Add Product').click()

        cy.get('input[name="code"]').type("TEST02")
        cy.get('input[name="name"]').type("Produto Cypress 2")
        cy.get('input[name="value"]').type("20")
        
        cy.contains("Create Product").click()
        
        cy.contains("td", "Produto Cypress 2").should("exist")
    })

    it("should delete a product", () => {
        cy.contains("Delete").first().click()
    })
})

