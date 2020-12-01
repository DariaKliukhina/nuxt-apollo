<template>
  <transition
    ref="transition"
    :name="fromRightSide ? 'popup-from-right-side' : 'popup-anim'"
    tag="div"
  >
    <div v-if="isShown" class="popup">
      <div
        class="background"
        :class="{ 'transparent-bg': transparentBackground }"
        @click.self.stop="hide"
      />
      <div
        ref="scroll"
        class="scroll-wrapper"
        :class="{ 'is-fullsize': isFullSize }"
        @click.self.stop="hide"
      >
        <div
          class="container"
          :class="{ 'is-fullsize': isFullSize, 'is-fullwidth': isFullWidth }"
        >
          <button
            class="hide"
            :class="{ 'is-inner': innerHideIcon }"
            type="button"
            @click="hide"
          >
            <slot name="popup-hide-icon">
              <div class="hide-icon" />
            </slot>
          </button>

          <div class="content" :class="{ 'is-fullsize': isFullSize }">
            <slot />
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock'
import Bowser from 'bowser'

export default {
  props: {
    isShown: {
      type: Boolean,
      default: false,
    },
    isFullSize: {
      type: Boolean,
      default: false,
    },
    isFullWidth: {
      type: Boolean,
      default: false,
    },
    innerHideIcon: {
      type: Boolean,
      default: false,
    },
    dontLock: {
      type: Boolean,
      default: false,
    },
    fromRightSide: {
      type: Boolean,
      default: false,
    },
    transparentBackground: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    isIos() {
      const userAgent = Bowser.getParser(window.navigator.userAgent)
      const isSafari = userAgent.getBrowserName().toLowerCase() === 'safari'
      return userAgent.getOSName().toLowerCase() === 'ios' && isSafari
    },
  },
  watch: {
    isShown(status) {
      if (status) {
        document.body.addEventListener('keyup', this.initHideEvents, false)
        if (!this.dontLock) {
          this.scrollLock()
        }
      } else {
        localStorage.setItem('onboarding', 'true')
        document.body.removeEventListener('keyup', this.initHideEvents, false)
        if (!this.dontLock) {
          this.scrollUnlock()
        }
      }
    },
  },
  methods: {
    hide() {
      this.$emit('hide-popup')
    },
    initHideEvents(e) {
      if (e.keyCode === 27) {
        this.hide()
      }
    },
    scrollLock() {
      this.$nextTick(() => {
        disableBodyScroll(this.$refs.scroll, {
          reserveScrollBarGap: true,
          allowTouchMove: (el) => {
            while (el && el !== document.body) {
              if (el.getAttribute('body-scroll-lock-ignore') !== null) {
                return true
              }

              el = el.parentNode
            }
          },
        })
        if (this.isIos) {
          document.body.style.overflow = 'hidden'
        }
      })
    },
    scrollUnlock() {
      enableBodyScroll(this.$refs.scroll)
      this.$nextTick(() => {
        if (this.isIos) {
          document.body.style.removeProperty('overflow')
        }
      })
    },
  },
}
</script>

<style lang="stylus" scoped>
$mobile = $MOBILE;
$tablet = $TABLET;
$mobile_tablet = $MOBILE_TABLET;
$topIndex = $zLayerPopups;

.popup {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: $topIndex;
  display: flex;
  justify-content: space-between;
  overflow: hidden;
  margin: auto;
  opacity: 1;
  transform: translateY(0);

  >.background {
    square(100%);
    position: fixed;
    top: 0;
    left: 0;
    z-index: 1;
    background: rgba(black, 0.7);
    &.transparent-bg {
      background: transparent;
    }
  }

  .scroll-wrapper {
    position: relative;
    z-index: 2;
    display: flex;
    flex-flow: row wrap;
    align-items: center;
    overflow-x: hidden;
    overflow-y: auto;
    width: 100%;

    @media $mobile {
      height: var(--vp-height);
      display: block;
      -webkit-overflow-scrolling touch;
    }

    &.is-fullsize {
      overflow: hidden;
    }
  }

  .container {
    position: relative;
    z-index: 2;
    margin: auto;
    max-width: 90%;
    width: fit-content;
    height: fit-content;

    /* pointer-events: auto; */
    &.is-fullwidth {
      max-width: 100%;
      width: 100%;
      height: 100%;
    }
  }

  .content {
    padding: 1px;
    border-radius: 8px;
    background: white;

    &.is-fullsize {
      @media $mobile {
        width: 100%;
        height: 100%;
        border-radius: 0;
      }
    }
  }

  .hide {
    position: absolute;
    top: -7rem;
    right: 0;
    padding: 0;
    width: 5rem;
    height: 5rem;
    border-width: 0;
    background: none;
    transition: opacity 0.3s ease;

    &:focus {
      outline: 0;
      opacity: 0.8;
    }

    &:hover {
      .hide-icon {
        opacity: 0.6;
      }
    }

    &:active {
      opacity: 0.3;
    }

    &.is-inner {
      top: 2rem;
      right: 2rem;
      z-index: 3;
    }
  }

  .hide-icon {
    display: block;
    padding: 0;
    width: 100%;
    height: 100%;
    color: #fff;
    cursor: pointer;
    // Компенсация смешения при вращении
    transform: translateX(0.3em);

    &:after, &:before {
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      margin: auto;
      width: 1px;
      height: 100%;
      background: currentColor;
      content: '';
    }

    &:after {
      transform: rotate(-45deg);
    }

    &:before {
      transform: rotate(45deg);
    }

    &.is-inner {
      color: #000;
    }
  }

  @media $mobile {
    .container {
      margin: 7rem auto 3rem;
      max-width: 90%;

      &.is-fullsize {
        margin: 0;
        min-height: 100%;
        max-width: 100%;
        width: 100%;
      }
    }

    .content {
      background-color: white;
    }

    .hide {
      top: -5rem;
      z-index: 2;
      width: 3rem;
      height: 3rem;
    }

    .hide {
      /* top: 1rem; */
      /* right: 1rem; */
      /* width: 3rem; */
      /* height: 3rem; */
      /* z-index: 2 */
    }

    .hide-icon {
      width: 3rem;
      height: 3rem;

      &:after, &:before {
        height: 100%;
      }
    }
  }

  &.popup-anim-leave-active {
    transition: opacity 0.15s ease-in-out;
  }

  &.popup-anim-enter-active {
    transition: opacity 0.35s ease-in-out;
  }

  &.popup-anim-enter, &.popup-anim-leave, &.popup-anim-leave-active {
    opacity: 0;
  }
}
</style>
