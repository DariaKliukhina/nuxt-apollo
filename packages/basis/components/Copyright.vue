<template>
  <a class="logo" href="https://pinkman.ru?utm_source=cuprum" target="_blank">
    <div class="text">
      <slot />
    </div>
    <div v-if="isNeedLogo" class="logo-icon">
      <svg-icon name="logo-pinkman" />
    </div>
  </a>
</template>

<script>
export default {
  name: 'Copyright',
  props: {
    isNeedLogo: {
      type: Boolean,
      default: false,
    },
    copyrightText: {
      type: String,
      default: '',
    },
  },
}
</script>

<style lang="stylus" scoped>
$mobile = $MOBILE;
$tablet = $TABLET;
$desktop = $DESKTOP;

$textColor = white;
$pinkColor = #ED1C80;
$fontSize = 1.4rem;
$iconSize = 12rem;
$iconHeight = 3rem;
$font-family = inherit;

.logo {
  display: inline-flex;
  justify-content: flex-start;
  align-items: center;
  color: $textColor;
  text-decoration: none;
  font-size: $fontSize;
  font-family: $font-family;

  &:active, &:focus {
    .pink {
      color: $pinkColor;
    }
  }

  @media $desktop {
    &:hover {
      .pink {
        color: $pinkColor;
      }
    }
  }

  .pink {
    margin-right: 0.5rem;
    transition: color 125ms ease;
  }

  .logo-icon {
    margin-left: 0.7rem;
    width: $iconSize;
    height: $iconHeight;
  }
}

@media $tablet {
  .logo {
    font-size: 1.4rem;
    line-height: 1.2;
  }
}

@media $mobile {
  .logo {
    font-size: 1.3rem;
    line-height: 1.2;
  }
}
</style>
