<template>
  <div class="col" :class="colModifer">
    <slot />
  </div>
</template>

<script>
function colVaidator(value) {
  return typeof value === 'number' ? true : ['hide', 'auto'].includes(value)
}
export default {
  name: 'Col',
  props: {
    col: {
      type: [Number, String],
      default: 'auto',
      validator: colVaidator,
    },
    lg: {
      type: [Number, String],
      default: null,
      validator: colVaidator,
    },
    md: {
      type: [Number, String],
      default: null,
      validator: colVaidator,
    },
    sm: {
      type: [Number, String],
      default: null,
      validator: colVaidator,
    },
    isNoGrow: {
      type: Boolean,
      default: false,
    },
    aligment: {
      type: String,
      default: 'start',
      validator(value) {
        return ['start', 'end', 'center', 'baseline', 'stretch'].includes(value)
      },
    },
  },
  computed: {
    colModifer() {
      let aligment = ''
      switch (this.aligment) {
        case 'end':
          aligment = 'as-fe '
          break
        case 'center':
          aligment = 'as-c '
          break
        case 'baseline':
          aligment = 'as-b '
          break
        case 'stretch':
          aligment = 'as-s '
          break
        case 'start':
        default:
          aligment = ''
      }
      const colsLg = this.lg ? `col-lg-${this.lg} ` : ''
      const colsMd = this.md ? `col-md-${this.md} ` : ''
      const colsSm = this.sm ? `col-sm-${this.sm} ` : ''
      const cols = this.lg && this.md && this.sm ? '' : `col-${this.col} `

      const isNoGrow = this.isNoGrow ? 'no-grow ' : ''
      return `${cols}${colsLg}${colsMd}${colsSm}${aligment}${isNoGrow}`
    },
  },
}
</script>

<style lang="stylus" scoped>
$mobile = $MOBILE;
$mobile_tablet = $MOBILE_TABLET;
$tablet = $TABLET;
$tablet_desktop = $TABLET_DESKTOP;
$desktop = $DESKTOP;
$desktop_large = $DESKTOP_LARGE;
$containerWidthDesktop = $CONTAINER_WIDTH_DESKTOP + $COL_GAP_DESKTOP / 2;
$colCountDesktop = $COL_COUNT_DESKTOP;
$colGapDesktop = ($COL_GAP_DESKTOP / 2);
$containerWidthTablet = $CONTAINER_WIDTH_TABLET;
$colCountTablet = $COL_COUNT_TABLE;
$colGapTablet = ($COL_GAP_TABLET / 2);
$containerWidthMobile = $CONTAINER_WIDTH_MOBILE;
$colCountMobile = $COL_COUNT_MOBILE;
$colGapMobile = ($COL_GAP_MOBILE / 2);

.col {
  flex-grow: 1;
  flex-basis: 0;
  max-width: 100%;

  for $colNum in (1 .. $colCountDesktop) {
    &.col-{$colNum} {
      position: relative;
      flex: 0 0 floor(($colNum / $colCountDesktop) * 100%, 6);
      min-height: 1px;
      max-width: floor(($colNum / $colCountDesktop) * 100%, 6);
    }
  }

  &.col-auto {
    flex: 1 1 (100% / $colCountDesktop);
    max-width: none;
    width: auto;
  }

  &.no-grow {
    flex-grow: 0 !important;
  }

  &.as-c {
    align-self: center;
  }

  &.as-s {
    align-self: stretch;
  }

  &.as-b {
    align-self: baseline;
  }

  &.as-fs {
    align-self: flex-start;
  }

  &.as-fe {
    align-self: flex-end;
  }

  .no-gap & {
    padding-right: 0 !important;
    padding-left: 0 !important;
  }

  .is-debug {
    .row.no-gap & {
      box-shadow: inset 0 0 0 1px rgba(96, 125, 139, 0.4) !important;
    }
  }
}

@media $desktop {
  .is-debug .col {
    box-shadow: 'inset 0 0 0 1px rgba(96,125,139,0.4), inset %s 0 0 0 rgba(128,203,196 ,0.2), inset -%s 0 0 0 rgba(128,203,196 ,0.2)' % ($colGapDesktop $colGapDesktop);
  }

  .col {
    padding-right: $colGapDesktop;
    padding-left: $colGapDesktop;

    for $colNum in (1 .. $colCountDesktop) {
      &.col-lg-{$colNum} {
        flex: 0 0 floor(($colNum / $colCountDesktop) * 100%, 6);
        max-width: floor(($colNum / $colCountDesktop) * 100%, 6);
      }
    }

    &-lg-hide {
      display: none;
    }
  }
}

@media $tablet {
  .is-debug .col {
    box-shadow: 'inset 0 0 0 1px rgba(96,125,139,0.4), inset %s 0 0 0 rgba(128,203,196 ,0.2), inset -%s 0 0 0 rgba(128,203,196 ,0.2)' % ($colGapTablet $colGapTablet);
  }

  .col {
    padding-right: $colGapTablet;
    padding-left: $colGapTablet;

    for $colNum in (1 .. $colCountTablet) {
      &.col-md-{$colNum} {
        flex: 0 0 floor(($colNum / $colCountTablet) * 100%, 6);
        max-width: floor(($colNum / $colCountTablet) * 100%, 6);
      }
    }

    &-md-hide {
      display: none;
    }
  }
}

@media $mobile {
  .is-debug .col {
    box-shadow: 'inset 0 0 0 1px rgba(96,125,139,0.4), inset %s 0 0 0 rgba(128,203,196 ,0.2), inset -%s 0 0 0 rgba(128,203,196 ,0.2)' % ($colGapMobile $colGapMobile);
  }

  .col {
    padding-right: $colGapMobile;
    padding-left: $colGapMobile;

    for $colNum in (1 .. $colCountMobile) {
      &.col-sm-{$colNum} {
        flex: 0 0 floor(($colNum / $colCountMobile) * 100%, 6);
        max-width: floor(($colNum / $colCountMobile) * 100%, 6);
      }
    }

    &-sm-hide {
      display: none;
    }
  }
}
</style>
