import { Button } from "@/components/ui/button"
import { mount } from "cypress/react18"

describe('Button Component', () => {
  it('renders default button correctly', () => {
    mount(<Button>Click me</Button>)
    
    cy.get('button')
      .should('exist')
      .and('have.text', 'Click me')
      .and('not.be.disabled')
  })

  it('handles click events', () => {
    const onClickSpy = cy.spy().as('onClickSpy')
    mount(<Button onClick={onClickSpy}>Click me</Button>)

    cy.get('button').click()
    cy.get('@onClickSpy').should('have.been.calledOnce')
  })

  it('renders different variants correctly', () => {
    const variants = ['default', 'destructive', 'outline', 'secondary', 'ghost', 'link'] as const
    
    variants.forEach(variant => {
      mount(<Button variant={variant}>Button</Button>)
      
      // Check if variant-specific classes are applied
      cy.get('button').should('have.class', variant === 'default' ? 'bg-primary' : `variant-${variant}`)
    })
  })

  it('renders different sizes correctly', () => {
    const sizes = ['default', 'sm', 'lg', 'icon'] as const
    
    sizes.forEach(size => {
      mount(<Button size={size}>Button</Button>)
      
      // Verify size-specific classes
      if (size === 'sm') {
        cy.get('button').should('have.class', 'h-9')
      } else if (size === 'lg') {
        cy.get('button').should('have.class', 'h-11')
      } else if (size === 'icon') {
        cy.get('button').should('have.class', 'h-10')
      }
    })
  })

  it('handles disabled state correctly', () => {
    mount(<Button disabled>Disabled Button</Button>)
    
    cy.get('button')
      .should('be.disabled')
      .and('have.css', 'cursor', 'not-allowed')
      
    // Verify click handler isn't called when disabled
    const onClickSpy = cy.spy().as('onClickSpy')
    mount(<Button disabled onClick={onClickSpy}>Disabled Button</Button>)
    
    cy.get('button').click({ force: true })
    cy.get('@onClickSpy').should('not.have.been.called')
  })

  it('handles loading state correctly', () => {
    mount(
      <Button disabled aria-busy={true}>
        Loading
      </Button>
    )
    
    cy.get('button')
      .should('be.disabled')
      .and('have.attr', 'aria-busy', 'true')
  })

  it('maintains accessibility attributes', () => {
    mount(<Button aria-label="Test button">Click me</Button>)
    
    cy.get('button')
      .should('have.attr', 'aria-label', 'Test button')
      .and('have.attr', 'role', 'button')
  })
}) 