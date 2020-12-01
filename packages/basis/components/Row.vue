<template>
  <div class="row" :class="rowModifer">
    <slot />
  </div>
</template>

<script>
export default {
  name: 'Row',
  props: {
    aligment: {
      type: String,
      default: 'start',
      validator(value) {
        return ['start', 'end', 'center', 'baseline', 'stretch'].includes(value)
      },
    },
    justify: {
      type: String,
      default: 'start',
      validator(value) {
        return [
          'start',
          'end',
          'center',
          'space-around',
          'space-between',
        ].includes(value)
      },
    },
    isColumn: {
      type: Boolean,
      default: false,
    },
    isWrap: {
      type: Boolean,
      default: true,
    },
    isNoGap: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    rowModifer() {
      let aligment = ''
      let justify = ''
      const isWrap = this.isWrap ? '' : 'no-wrap '
      const isColumn = this.isColumn ? 'flex-column ' : ''
      const isNoGap = this.isNoGap ? 'no-gap ' : ''
      switch (this.aligment) {
        case 'end':
          aligment = 'ai-fe '
          break
        case 'center':
          aligment = 'ai-c '
          break
        case 'baseline':
          aligment = 'ai-b '
          break
        case 'stretch':
          aligment = 'ai-s '
          break
        case 'start':
        default:
          aligment = ''
      }
      switch (this.justify) {
        case 'end':
          justify = 'jc-e '
          break
        case 'center':
          justify = 'jc-c '
          break
        case 'space-around':
          justify = 'jc-sa '
          break
        case 'space-between':
          justify = 'jc-sb '
          break
        case 'start':
        default:
          justify = ''
      }

      return `${isNoGap}${aligment}${justify}${isColumn}${isWrap}`
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
$colGapDesktop = ($COL_GAP_DESKTOP / 2);
$colGapTablet = ($COL_GAP_TABLET / 2);
$colGapMobile = ($COL_GAP_MOBILE / 2);

.is-debug .row {
  box-shadow: inset 0 0 0 1px rgba(255, 0, 255, 0.5);
}

.row {
  display: flex;
  flex-wrap: wrap;
  margin-right: '-%s' % $colGapDesktop;
  margin-left: '-%s' % $colGapDesktop;

  &.no-gap {
    margin-right: 0 !important;
    margin-left: 0 !important;
  }

  &.flex-column {
    flex-direction: column;
  }

  &.no-wrap {
    flex-wrap: nowrap !important;
  }

  &.ai-c {
    align-items: center;
  }

  &.ai-s {
    align-items: stretch;
  }

  &.ai-b {
    align-items: baseline;
  }

  &.ai-fs {
    align-items: flex-start;
  }

  &.ai-fe {
    align-items: flex-end;
  }

  &.jc-sa {
    justify-content: space-around;
  }

  &.jc-sb {
    justify-content: space-between;
  }

  &.jc-c {
    justify-content: center;
  }

  &.jc-fe {
    justify-content: flex-end;
  }
}

@media $tablet {
  .row {
    display: flex;
    flex-wrap: wrap;
    margin-right: '-%s' % $colGapTablet;
    margin-left: '-%s' % $colGapTablet;
  }
}

@media $mobile {
  .row {
    display: flex;
    flex-wrap: wrap;
    margin-right: '-%s' % $colGapMobile;
    margin-left: '-%s' % $colGapMobile;
  }
}
</style>
