// components
export { default as Section } from './components/Section.vue'
export { default as Container } from './components/Container.vue'
export { default as Debug } from './components/Debug.vue'
export { default as Layout } from './components/Layout.vue'
export { default as Row } from './components/Row.vue'
export { default as Col } from './components/Col.vue'
export { default as Picture } from './components/Picture.vue'
export { default as Copyright } from './components/Copyright.vue'
export { default as Burger } from './components/Burger.vue'
export { default as Popup } from './components/Popup.vue'
export { default as Share } from './components/Share.vue'

// store
export { mediaQueryStore, mediaQueryHandler } from './scripts/mediaQuery'
export {
  scrollBarWidthStore,
  scrollBarWidthHandler,
} from './scripts/scrollBarWidth'
export { userAgentStore, userAgentHandler } from './scripts/userAgent'

// scripts
export { pageHead, siteHead } from './scripts/head'
export { default as pluralize } from './scripts/pluralize'
export { default as getLocaleData } from './scripts/getLocaleData'
