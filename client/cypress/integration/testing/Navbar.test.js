/// <reference types="cypress" />

let cookie;

describe('Navbar Functionalitiy', () => {

    beforeEach(() => {
        cy.visit('/')
    })

    it('Move from Sign Up to Login', () => {

        cy.get('[data-cy=signup-navbar]')
            .should('exist')
            .click()

        cy.get('[data-cy=login-signup-navbar]')
            .should('exist')
            .click()

        cy.get('[data-cy=login-title]')
            .should('exist')
            .invoke('text')
            .should('equal', 'Login')
    })

    it('Show swal alert before created a user', () => {
        cy.get('[data-cy=signup-navbar]')
            .should('exist')
            .click()

        cy.get('[data-cy=first-name-signup]')
            .should('exist')
            .type('Pet')

        cy.get('[data-cy=last-name-signup]')
            .should('exist')
            .type('Pet')

        cy.get('[data-cy=email-signup]')
            .should('exist')
            .type('pepe@pepe2.com')

        cy.get('[data-cy=phone-signup]')
            .should('exist')
            .type('1235123123412')

        cy.get('[data-cy=password-signup]')
            .should('exist')
            .type('Ab12345')

        cy.get('[data-cy=confirm-password-signup]')
            .should('exist')
            .type('Ab123456')

        cy.get('[data-cy=signup-button]')
            .should('exist')
            .click()

        cy.on('window:alert', (str) => {
            expect(str)
                .to.equal('Password Not Matches')
        })

        cy.wait(1000)
        cy.contains('Ok').click()
    })

    it.only('Creater User', () => {

        cy.get('[data-cy=signup-navbar]')
            .should('exist')
            .click()

        cy.get('[data-cy=first-name-signup]')
            .should('exist')
            .type('Pet')

        cy.get('[data-cy=last-name-signup]')
            .should('exist')
            .type('Pet')

        cy.get('[data-cy=email-signup]')
            .should('exist')
            .type('pepe@pepe2.com')

        const randomPhone = Math.floor(1000 + Math.random() * 90000000)
        cy.get('[data-cy=phone-signup]')
            .should('exist')
            .type(`${randomPhone}`)

        cy.get('[data-cy=password-signup]')
            .should('exist')
            .type('Ab123456')


        cy.get('[data-cy=confirm-password-signup]')
            .should('exist')
            .type('Ab123456')

        cy.get('[data-cy=signup-button]')
            .should('exist')
            .click()
        
        cy.log('created new user')

    })

    it('Login', () => {
        cy.get('[data-cy=login-navbar]')
            .should('exist')
            .click()

        cy.get('[data-cy=email-login]')
            .should('exist')
            .type('lior@pepe.com')

        cy.get('[data-cy=password-login]')
            .should('exist')
            .type('Ab123456')

        cy.get('[data-cy=login-button]')
            .should('exist')
            .click()

        cy.on('window:alert', (str) => {
            expect(str)
                .to.equal('Login Success')
        })

        cy.wait(2000)
        cy.contains('OK').click()


        cy.getCookie('token')
            .should('exist').then((c) => {
                cookie = c.value
                
            })
        
        
    })
})
