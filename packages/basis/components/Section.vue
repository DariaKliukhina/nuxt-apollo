<template>
  <section class="section">
    <slot />
  </section>
</template>

<script>
export default {
  name: 'Section',
}
</script>

<style lang="stylus" scoped>
$mobile = $MOBILE;
$mobile_tablet = $MOBILE_TABLET;
$tablet = $TABLET;
$tablet_desktop = $TABLET_DESKTOP;
$desktop = $DESKTOP;
$desktop_large = $DESKTOP_LARGE;
$containerSideOffsetTablet = $CONTAINER_SIDE_OFFSET_TABLET;
$containerSideOffsetMobile = $CONTAINER_SIDE_OFFSET_MOBILE;

.section {
  &--content {
    padding: 10rem 0;

    @media $tablet {
      padding: 6rem 0;
    }

    @media $mobile {
      padding: 4rem 0;
    }
}
}

.is-debug .section {
  box-shadow: inset 0 0 0 1px rgba(0, 255, 255, 0.5);
}

@media $mobile {
  .section {
    padding: 2rem $containerSideOffsetMobile
  }
}

@media $tablet {
  .section {
    padding: 4.5rem $containerSideOffsetTablet
  }
}

@media $desktop {
  .section {
    padding: 8rem 0;
  }
}
</style>
