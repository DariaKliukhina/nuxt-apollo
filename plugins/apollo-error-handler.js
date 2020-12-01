export default (
  { graphQLErrors, networkError, operation, forward },
  nuxtContext
) => {
  console.error('Global error handler')
  // console.error(graphQLErrors, networkError, operation, forward, nuxtContext)
  nuxtContext.error(404, '/error')
}
