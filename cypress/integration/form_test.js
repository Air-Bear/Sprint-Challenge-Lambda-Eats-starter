describe("form - testing our form inputs", function() {
	beforeEach(()=>{
		cy.visit("http://localhost:3000/pizza");
	})

	it("fill out form and submit", function(){
		cy.get('[data-cy="text"]').type("this is some test text").should("have.value", "this is some test text");
		cy.get('[data-cy="pepper"]').check().should("be.checked");
		cy.get('[data-cy="onion"]').check().should("be.checked");
		cy.get('[data-cy="submit"]').click();
	})
});