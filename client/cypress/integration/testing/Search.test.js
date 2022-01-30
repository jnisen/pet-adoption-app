/// <reference types="cypress" />


describe('Search Functionality', () => {

    beforeEach(() => {

        cy.visit('/home')

        cy.get('[data-cy=icon-button]')
            .should('exist')
            .click()

        cy.get('[data-cy=search-button]')
            .should('exist')
            .click()
    })

    it('Basic Search', () => {

        const pet = Math.random() >= 0.5 ? 'Cat' : 'Dog';

        cy.get('[data-cy=type-search]')
            .should('exist')
            .click()

        cy.get('li').contains(`${pet}`).click()

        cy.get('[data-cy=search-button]')
            .should('exist')
            .click()

        if (pet === 'Dog') {

            cy.get('[data-cy=grid-search]')
                .should('exist')
                .should('have.length.greaterThan', 0)
        } else {
            cy.get('[data-cy=p-search]')
                .should('exist')
                .invoke('text')
                .should('equal', 'No Pets Founded')
        }


    })

    it.only('Advance Search', () => {

        const pet = Math.random() >= 0.5 ? 'Cat' : 'Dog';

        cy.get('[data-cy=toggle-search]')
            .should('exist')
            .click()

        cy.get('[data-cy=type-search]')
            .should('exist')
            .click()

        cy.get('li').contains(`${pet}`).click()


        cy.get('[data-cy=status-search]')
            .should('exist')
            .click()

        cy.get('li').contains('Available').click()


        cy.get('[data-cy=search-button]')
            .should('exist')
            .click()

        if (pet === 'Dog') {

            cy.get('[data-cy=grid-search]')
                .should('exist')
                .should('have.length.greaterThan', 0)
        } else {
            cy.get('[data-cy=p-search]')
                .should('exist')
                .invoke('text')
                .should('equal', 'No Pets Founded')
        }

    })
})
