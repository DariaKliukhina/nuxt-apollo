export default (store = {}, actionName = 'mediaQuery/update') => {
  if (typeof store.dispatch === 'function') {
    const m = 768
    const t = 1024
    const d = Infinity
    const innerWidth =
      window.innerWidth ||
      document.documentElement.clientWidth ||
      document.body.clientWidth
    let currentMediaName = 'mobile'
    let currentMediaKey = 'sm'
    store.state.mediaQuery.list.forEach((media) => {
      if (innerWidth > media.value) {
        currentMediaKey = media.key
      }
    })

    const viewPortHeight = `${window.innerHeight}px`
    document.documentElement.style.setProperty('--vp-height', viewPortHeight)
    if (innerWidth < m) {
      currentMediaName = 'mobile'
    } else if (innerWidth >= m && innerWidth < t) {
      currentMediaName = 'tablet'
    } else if (innerWidth >= t && innerWidth < d) {
      currentMediaName = 'desktop'
    }
    store.dispatch(actionName, { currentMediaKey, currentMediaName })
  }
}
