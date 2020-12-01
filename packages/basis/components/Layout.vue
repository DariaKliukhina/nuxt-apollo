<template>
  <div class="page-wrapper">
    <header class="page-header">
      <slot name="page-header" />
    </header>
    <main class="page-content">
      <slot name="page-content" />
    </main>
    <footer class="page-footer">
      <slot name="page-footer" />
    </footer>

    <client-only>
      <f-debug root-selector="#__layout" />
    </client-only>
  </div>
</template>

<script>
import { debounce } from 'throttle-debounce'
import {
  Debug as FDebug,
  mediaQueryHandler,
  scrollBarWidthHandler,
  userAgentHandler,
} from '@/packages/basis'

export default {
  name: 'Layout',
  components: {
    FDebug,
  },
  computed: {},
  watch: {},
  mounted() {
    if (process.browser) {
      window.addEventListener(
        'resize',
        debounce(50, () => {
          mediaQueryHandler(this.$store)
        }),
        false
      )
      mediaQueryHandler(this.$store)
      scrollBarWidthHandler(this.$store)
      userAgentHandler(this.$store)
    }
  },
  beforeDestroy() {
    window.removeEventListener('resize', mediaQueryHandler, false)
  },
}
</script>

<style lang="stylus" scoped>
$navIndex = $zLayerNav;
$mobile = $MOBILE;
$mobile_tablet = $MOBILE_TABLET;
$tablet = $TABLET;
$tablet_desktop = $TABLET_DESKTOP;
$desktop = $DESKTOP;
$desktop_large = $DESKTOP_LARGE;

.page-wrapper {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.page-header {
  position: relative;
  top: 0;
  z-index: $navIndex;
}

.page-content {
  position: relative;
  flex: auto;
  background: inherit;
}
</style>
