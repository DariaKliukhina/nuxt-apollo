export default function getLocaleData(data, lang = 'en') {
  if (typeof data === 'object') {
    return data === null
      ? null
      : Array.isArray(data)
      ? data.map((value) => getLocaleData(value, lang))
      : (() => {
          if (lang in data) return getLocaleData(data[lang], lang)
          else if ('pc' in data) return getLocaleData(data.pc, lang)
          return Object.fromEntries(
            Object.entries(data).map(([key, value]) => [
              key,
              getLocaleData(value, lang),
            ])
          )
        })()
  } else {
    return data
  }
}
