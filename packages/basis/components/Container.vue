<template>
  <div class="container">
    <slot />
  </div>
</template>

<script>
export default {
  name: 'Container',
}
</script>

<style lang="stylus" scoped>
$mobile = $MOBILE;
$mobile_tablet = $MOBILE_TABLET;
$tablet = $TABLET;
$tablet_desktop = $TABLET_DESKTOP;
$desktop = $DESKTOP;
$desktop_large = $DESKTOP_LARGE;
$containerWidthDesktop = $CONTAINER_WIDTH_DESKTOP;
$containerWidthTablet = $CONTAINER_WIDTH_TABLET;
$containerWidthMobile = $CONTAINER_WIDTH_MOBILE;

.container {
  margin-right: auto;
  margin-left: auto;
  min-height: 100%;
  height: inherit;

  & + .container {
    margin-top: 1rem;
  }
}

@media $mobile {
  .container {
    width: $containerWidthMobile;
  }
}

@media $tablet {
  .container {
    width: $containerWidthTablet;
  }
}

@media $desktop {
  .container {
    width: $containerWidthDesktop;
  }
}
</style>
