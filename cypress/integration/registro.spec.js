

describe('Teste do registro.br', ()=>{
    const baseUrl = "https://registro.br/busca-dominio/";
    it('Deveria ser posssivel consultar um dominio valido que esteja disponivel', ()=>{
        cy.visit(baseUrl);

        cy.get('#is-avail-field').type('batatinha.com.br');
        cy.get('button').click();
        cy.get('.is-avail-response').should('be.visible');
    });

    it('Deveria ser possivel consultar um dominio valido mesmo que não digite completamente', ()=> {
        cy.visit(baseUrl);

        cy.get('#is-avail-field').type('batatinha123');
        cy.get('button').click();
        cy.get('.is-avail-response').should('be.visible');
    });

    it('Deveria ser possível consultar um dominio valido e que não esteja disponivel', ()=>{
        cy.visit(baseUrl);
        cy.get('#is-avail-field').type('batatinha.com.br');
        cy.get('button').click();
        cy.get('.is-avail-response-not-available').should('be.visible');
    });

    it('Deveria não ser possível consultar um dominio se não digitou nada', ()=>{
        cy.visit(baseUrl);
        cy.get('button').click();
        cy.get('.font-6').should('contains.text', 'Preencha o campo acima com o domínio que deseja registrar');
    });

    it('Deveria dar erro se tentar consultar com menos de 2 caracteres', ()=>{
        cy.visit(baseUrl);
        cy.get('#is-avail-field').type('a');
        cy.get('button').click();
        cy.get('.font-6').should('contains.text', 'Tamanho mínimo de 2 e máximo de 26 caracteres, não incluindo a categoria.');
    });


    it('Deveria dar erro se tentar consultar com mais de 26 caracteres', ()=>{
        cy.visit(baseUrl);
        cy.get('#is-avail-field').type('aweqewqioiojeqwqweoiqwehieqwhoqweweqhihiqwewqeihqweihewqhioqweoqoewhiieqwwqehieqwoiqwe');
        cy.get('button').click();
        cy.get('.font-6').should('contains.text', 'Tamanho mínimo de 2 e máximo de 26 caracteres, não incluindo a categoria.');
    });

    it('Deveria dar erro se tentar consultar com caracteres especiais', ()=>{
        cy.visit(baseUrl);
        cy.get('#is-avail-field').type('@@@@@@@@##/**/');
        cy.get('button').click();
        cy.get('.font-6').should('contains.text', 
        'Caracteres válidos são letras ');
    });

})