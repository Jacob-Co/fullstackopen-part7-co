describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3001/api/testing/reset');
    cy.createUser({
      username: 'Test',
      password: '1234',
      name: 'Tester'
    });
    cy.visit('http://localhost:3000');
  });

  it('login form is shown', function() {
    cy.contains('Log in to Application');
    cy.contains('username');
    cy.contains('password');
    cy.contains('Login');
  });

  describe('Login', function() {
    it('succeeds with correct credentials', function() {
      cy.get('#username').type('Test');
      cy.get('#password').type('1234');
      cy.contains('Login').click();

      cy.get('.success').should('contain', 'Successfully signed in');
      cy.get('.success').should('have.css', 'color', 'rgb(0, 128, 0)');
    });

    it('failure with wrong credentials', function() {
      cy.get('#username').type('Test1');
      cy.get('#password').type('12345');
      cy.contains('Login').click();

      cy.get('.warning').should('contain', 'Invalid username or password');
      cy.get('.warning').should('have.css', 'color', 'rgb(255, 0, 0)');
    });
  });

  describe('When logged in', function() {
    beforeEach(function() {
      cy.login({ username: 'Test', password: '1234' });
      cy.visit('http://localhost:3000');
    });

    it('A blog can be created', function() {
      cy.contains('create a new blog').click();
      cy.get('#title').type('Test Blog');
      cy.get('#author').type('Me');
      cy.get('#url').type('Test.com');
      cy.get('#blogCreate-button').click();
      cy.contains('Test Blog Me');
    });

    describe('With a few notes created', function() {
      beforeEach(function() {
        cy.createNote( {
          title: 'For the likes',
          author: 'Liker',
          url: 'like.com'
        });

        cy.visit('http://localhost:3000');
      });

      it('A blog can be liked', function() {
        cy.contains('likes: 0');
        cy.addLikes({ content: 'For the likes Liker', likes: 1 });
        cy.contains('likes: 1');
      });

      it('A blog can be deleted', function() {
        cy.get('html').should('contain', 'For the likes Liker');
        cy.get('.blogDetails-button').click();
        cy.get('.delete-button').click();
        cy.get('html').should('not.contain', 'For the likes Liker');
      });

      it('Can\'t delete a blog you didn\'t create', function() {
        cy.createUser({
          username: 'Test2',
          password: '12342',
          name: 'Tester2'
        });
        cy.contains('logout').click();
        cy.login({ username: 'Test2', password: '12342' });
        cy.visit('http://localhost:3000');

        cy.get('.blogDetails-button').click();
        cy.get('.delete-button').click();
        cy.get('.warning').should('contain', 'You don\'t have permission to delete that');
        cy.get('.warning').should('have.css', 'color', 'rgb(255, 0, 0)');
      });

      it.only('Sorts blogs by likes from most to least', function() {
        cy.createNote({ title: '3 likes', author: 'Liker', url: 'like.com' });
        cy.createNote({ title: '2 likes', author: 'Liker', url: 'like.com' });
        cy.createNote({ title: '1 likes', author: 'Liker', url: 'like.com' });
        cy.visit('http://localhost:3000');

        cy.addLikes({ content: '3 likes Liker', likes: 3 });
        cy.addLikes({ content: '2 likes Liker', likes: 2 });
        cy.addLikes({ content: '1 likes Liker', likes: 1 });

        cy.get('.blog')
          .then((res) => res[0])
          .should('contain', '3 likes Liker');
        cy.get('.blog')
          .then((res) => res[0])
          .should('not.contain', '2 likes Liker');
        cy.get('.blog')
          .then((res) => res[1])
          .should('contain', '2 likes Liker');
        cy.get('.blog')
          .then((res) => res[2])
          .should('contain', '1 likes Liker');
      });
    });
  });
});