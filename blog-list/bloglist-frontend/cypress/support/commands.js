// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })

Cypress.Commands.add('createUser', function({ username, password, name }) {
  cy.request('POST', 'http://localhost:3001/api/users', {
    username,
    password,
    name
  });
});

Cypress.Commands.add('login', function({ username, password }) {
  cy.request('POST', 'http://localhost:3001/api/login', {
    username,
    password,
  }).then((res) => {
    window.localStorage.setItem('localBlogAppUser', JSON.stringify(res.body));
  });
});

Cypress.Commands.add('createNote', function({ title, author, url }) {
  cy.request({
    url: 'http://localhost:3001/api/blogs',
    method: 'POST',
    body: {
      title,
      author,
      url
    },
    headers: {
      'Authorization': `bearer ${JSON.parse(window.localStorage.getItem('localBlogAppUser')).token}`
    }
  });
});

Cypress.Commands.add('addLikes', function({ content ,likes }) {
  cy.contains(content).parent().find('.blogDetails-button').click();
  for(let i = 0; i < likes; i += 1) {
    cy.contains(content).parent().find('.like-button').click();
  }
});
