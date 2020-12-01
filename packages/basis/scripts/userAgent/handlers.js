import bowser from 'bowser'

export default (store = {}, actionName = 'userAgent/update') => {
  if (typeof store.dispatch === 'function') {
    const userAgent = bowser.getParser(window.navigator.userAgent)
    const platform = userAgent.getPlatform()
    let browserName = userAgent.getBrowserName().toLowerCase()
    const os = userAgent.getOSName()
    if (browserName === 'internet explorer') {
      browserName = 'explorer'
    }
    const systemData = {
      browserName,
      os,
      platform,
    }
    store.dispatch(actionName, systemData)
  }
}
