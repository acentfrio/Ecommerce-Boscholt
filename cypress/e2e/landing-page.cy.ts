/// <reference types="cypress" />

describe('Landing Page', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000')
  })
  it('should change theme from dark to light', () => {
    // First ensure we're in dark mode
    cy.get('html').should('have.class', 'dark')

    // Click theme toggle button and select light theme
    cy.get('[data-testid="theme-toggle"]').click()
    cy.contains('Light').click()

    // Verify theme changed to light
    cy.get('html').should('not.have.class', 'dark')
    cy.get('html').should('have.css', 'color-scheme', 'light')

    cy.contains('Dark').click()
    cy.get('html').should('have.css', 'color-scheme', 'dark')
  })

  it('should handle Google OAuth signin flow', () => {
    // Click the sign in link
    cy.get('a[href="/api/auth/signin"]').click()

    // Verify redirect to auth page
    cy.url().should('include', '/api/auth/signin')

    // Click Google sign in option
    cy.contains('Sign in with Google').click()

    // Note: We can't fully test the Google OAuth flow in Cypress
    // as it involves external redirects and popups
    // Instead we can verify the initial navigation and button clicks
    
    // Alternatively, we could stub/mock the OAuth flow:
    /*
    cy.window().then(win => {
      cy.stub(win, 'open').as('windowOpen')
    })
    cy.get('@windowOpen').should('be.called')
    */
  })

})