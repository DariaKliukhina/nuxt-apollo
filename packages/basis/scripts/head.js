export const pageHead = (params = {}) => {
  const { title = '', seoDescription = '', seoImage = null } = params

  return {
    title,
    meta: [
      {
        hid: 'og:title',
        property: 'og:title',
        content: title,
      },
      {
        hid: 'og:description',
        property: 'og:description',
        content: seoDescription.replace(/<\/?[^>]+(>|$)/g, ''),
      },
      {
        hid: 'og:image',
        property: 'og:image',
        content: seoImage,
      },
    ],
  }
}

export const siteHead = (params = {}) => {
  const { color = '#85754E', title = null, links = [], script = [] } = params
  return {
    title: title || process.env.npm_package_name || '',
    meta: [
      {
        charset: 'utf-8',
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1, viewport-fit=cover',
      },
      {
        name: 'format-detection',
        content: 'telephone=no',
      },
      {
        name: 'msapplication-TileColor',
        content: color,
      },
      {
        name: 'theme-color',
        content: color,
      },
    ],
    script: [...script],
    link: [
      {
        rel: 'apple-touch-icon',
        sizes: '180x180',
        href: '/apple-touch-icon.png',
      },
      {
        rel: 'icon',
        sizes: '32x32',
        type: 'image/png',
        href: '/favicon-32x32.png',
      },
      {
        rel: 'icon',
        sizes: '16x16',
        type: 'image/png',
        href: '/favicon-16x16.png',
      },
      {
        rel: 'icon',
        type: 'image/ico',
        href: '/favicon.ico',
      },
      {
        rel: 'manifest',
        href: '/site.webmanifest',
      },
      {
        rel: 'mask-icon',
        href: '/safari-pinned-tab.svg',
        color,
      },
      ...links,
    ],
  }
}
