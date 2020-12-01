let loading = 0

export default (isLoading, countModifier, nuxtContext) => {
  loading += countModifier
  console.info(`[apollo] loading ${isLoading} ${loading} ${countModifier}`)
}
