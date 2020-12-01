module.exports = {
  client: {
    service: {
      name: 'fes',
      // URL to the GraphQL API
      url: 'http://localhost:2001/api/content/fes/graphql',
    },
    // Files processed by the extension
    includes: ['apollo/**/*.vue', 'apollo/**/*.js', 'apollo/**/*.gql'],
  },
}
