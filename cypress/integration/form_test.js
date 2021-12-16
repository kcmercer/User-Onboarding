import { iteratee } from "lodash"
import { hasUncaughtExceptionCaptureCallback } from "process"

describe('Form App', () => {
    beforeEach(() => {
        cy.visit('http://localhost:3000/')
    })

    const inputFirstName = () => cy.get('input[name=first_name]');
    const inputEmail = () => cy.get('input[name=email]');
    const inputPassword = () => cy.get('input[name=password]');
    const inputTos = () => cy.get('input[name=tos]');
    const submitButton = () => cy.get('button[id="submit"]')
    const allErrors = () => cy.get('div[id="errors"]')

    describe('if these dont pass, panic', () => {

        it('heres hoping', () => {
            expect(1 + 2).to.equal(3); // strict
            expect(2 + 2).not.to.equal(5);  // strict
            expect({}).not.to.equal({}); // strict
            expect({}).to.eql({}); // lax
        })

        it('cypress sees what it should', () => {
            inputFirstName().should('exist');
            inputEmail().should('exist');
            inputPassword().should('exist');
            inputTos().should('exist');
        })
    })

    describe('all fields work', () => {

        it('inputs can take text', () => {
            inputFirstName()
                .should('have.value', '')
                .type('Smitty')
                .should('have.value', 'Smitty')

            inputEmail()
                .should('have.value', '')
                .type('WerbenJagerManJensen@bbmail.com')
                .should('have.value', 'WerbenJagerManJensen@bbmail.com')

            inputPassword()
                .should('have.value','')
                .type('Iwasnumber1!')
                .should('have.value','Iwasnumber1!')
        })

        it('checkbox checkable', () => {
            inputTos()
                .should('be.not.checked')
                .check()
                .should('be.checked')
        })

        it('fields required to submit', () => {
            submitButton()
                .should('be.disabled')
        })
    })
    
    describe('final tests', () => {

        it('validation error occurs', () => {
            inputTos()
                .check()
                .uncheck()
            allErrors()
                .contains('Please read and accept our Terms of Service!')
                
        })

        it('button enabled when required fields filled', () => {
            inputFirstName()
                .type('Smitty')
            inputEmail()
                .type('WerbenJagerManJensen@bbmail.com')
            inputPassword()
                .type('Iwasnumber1!')
            inputTos()
                .check()
            submitButton()
                .should('be.enabled')
                .click()
        })
    })
})