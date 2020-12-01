<template>
  <div
    v-show="isDebug"
    v-if="env.appEnv !== 'production'"
    class="debug-wrapper"
  >
    <div class="debug-service">
      <button
        class="debug-service-close"
        type="button"
        @click.prevent="toggleDebug"
      >
        &times;
      </button>
      <button type="button" @click.prevent="toggleDebugOutline">
        Toggle Outline
      </button>
      <br />
      <br />
      <form class="debug-form" @change="setModelToLS">
        <details>
          <summary>
            Desktop
            <span v-if="mediaQuery.value === 'desktop'">*</span>
          </summary>
          <fieldset>
            <label>
              Container width
              <input v-model="containerWidthDesktop" placeholder="96rem" />
            </label>
            <label>
              Columns count
              <input
                v-model="columnsDesktop"
                placeholder="12"
                type="number"
                min="5"
                max="24"
              />
            </label>
            <label>
              Gap size (rem)
              <input
                v-model="gapDesktop"
                placeholder="2"
                type="number"
                min="0"
                max="20"
              />
            </label>
          </fieldset>
        </details>
        <details>
          <summary>
            Tablet
            <span v-if="mediaQuery.value === 'tablet'">*</span>
          </summary>
          <fieldset>
            <label>
              Container width
              <input v-model="containerWidthTablet" placeholder="100%" />
            </label>
            <label>
              Columns count
              <input
                v-model="columnsTablet"
                placeholder="8"
                type="number"
                min="5"
                max="24"
              />
            </label>
            <label>
              Gap size (rem)
              <input
                v-model="gapTablet"
                placeholder="1.5"
                type="number"
                min="0"
                max="20"
              />
            </label>
          </fieldset>
        </details>
        <details>
          <summary>
            Mobile
            <span v-if="mediaQuery.value === 'mobile'">*</span>
          </summary>
          <fieldset>
            <label>
              Container width
              <input v-model="containerWidthMobile" placeholder="100%" />
            </label>
            <label>
              Columns count
              <input
                v-model="columnsMobile"
                placeholder="4"
                type="number"
                min="2"
                max="12"
              />
            </label>
            <label>
              Gap size (rem)
              <input
                v-model="gapMobile"
                placeholder="1"
                type="number"
                min="0"
                max="20"
              />
            </label>
          </fieldset>
        </details>
      </form>
      <div class="debug-env">
        <details>
          <summary>env</summary>
          <div>mode: {{ env.appMode }}</div>
          <div>env: {{ env.appEnv }}</div>
          <div>assetsUrl:{{ env.assetsUrl }}</div>
          <div>ssrUrl:{{ env.ssrUrl }}</div>
          <div>spaUrl:{{ env.spaUrl }}</div>
          <div>gqApiPath:{{ env.gqApiPath }}</div>
          <div>restApiPath:{{ env.restApiPath }}</div>
        </details>
      </div>
    </div>
    <div id="debug" class="debug">
      <f-section>
        <f-container class="debug-container">
          <div class="debug-content">
            <div
              v-for="(i, index) in Number(columnsDesktop)"
              :key="`columns-${index}`"
            />
          </div>
        </f-container>
      </f-section>
    </div>
    <!-- prettier-ignore -->
    <component :is="'style'">
      @media screen and (max-width: 767px) {
      {{ rootSelector }} #debug .debug-container {
      width: {{ containerWidthMobile }}
      }
      {{ rootSelector }} #debug .debug-content {
      grid-template-columns: repeat( {{ Number(columnsMobile) }}, auto);
      grid-gap: {{ Number(gapMobile) }}rem;
      }
      }
      @media screen and (min-width: 768px) {
      {{ rootSelector }} #debug .debug-container {
      width: {{ containerWidthTablet }}
      }
      {{ rootSelector }} #debug .debug-content {
      grid-template-columns: repeat( {{ Number(columnsTablet) }}, auto);
      grid-gap: {{ Number(gapTablet) }}rem;
      }
      }
      @media screen and (min-width: 1024px) {
      {{ rootSelector }} #debug .debug-container {
      width: {{ containerWidthDesktop }}
      }
      {{ rootSelector }} #debug .debug-content {
      grid-template-columns: repeat( {{ Number(columnsDesktop) }}, auto);
      grid-gap: {{ Number(gapDesktop) }}rem;
      }
      }
    </component>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { Section as FSection, Container as FContainer } from '@/packages/basis'

const IS_DEBUG = 'isDebug'
const IS_DEBUG_OUTLINE = 'isDebugOutline'
const DEBUG_GRID = 'debugGrid'

export default {
  name: 'Debug',
  components: {
    FSection,
    FContainer,
  },
  props: {
    rootSelector: {
      type: String,
      default: '#root',
    },
  },
  data() {
    const {
      containerWidthDesktop = '131rem',
      gapDesktop = 3.2,
      columnsDesktop = 12,
      containerWidthTablet = 'auto',
      gapTablet = 4,
      columnsTablet = 8,
      containerWidthMobile = 'auto',
      gapMobile = 2,
      columnsMobile = 4,
    } = JSON.parse(localStorage.getItem(DEBUG_GRID)) || {}

    return {
      [IS_DEBUG]: false,
      [IS_DEBUG_OUTLINE]: false,
      containerWidthDesktop,
      gapDesktop,
      columnsDesktop,
      containerWidthTablet,
      gapTablet,
      columnsTablet,
      containerWidthMobile,
      gapMobile,
      columnsMobile,
      body: document.body,
      env: {
        appMode: process.env.APP_MODE,
        appEnv: process.env.APP_ENV,
        assetsUrl: process.env.IMAGE_OPTIMIZER_PATH,
        ssrUrl: process.env.BACKEND_PRIVATE_URL,
        spaUrl: process.env.BACKEND_PUBLIC_URL,
        gqApiPath: process.env.GQ_API_PATH,
        restApiPath: process.env.REST_API_PATH,
      },
    }
  },
  computed: {
    ...mapState(['mediaQuery']),
  },
  beforeDestroy() {
    if (process.browser) {
      document.removeEventListener('keydown', this.toggleDebugKeyPress)
    }
  },

  mounted() {
    if (process.browser) {
      document.addEventListener('keydown', this.toggleDebugKeyPress)
    }
    this.setDebug(
      IS_DEBUG_OUTLINE,
      'is-debug-outline',
      this.getDebugFromLS(IS_DEBUG_OUTLINE)
    )
    this.setDebug(IS_DEBUG, 'is-debug', this.getDebugFromLS(IS_DEBUG))
  },
  methods: {
    setModelToLS() {
      const {
        containerWidthDesktop = '131rem',
        gapDesktop = 3.2,
        columnsDesktop = 12,
        containerWidthTablet = '100%',
        gapTablet = 2,
        columnsTablet = 12,
        containerWidthMobile = '100%',
        gapMobile = 2,
        columnsMobile = 12,
      } = this
      const localStorageValue = JSON.stringify({
        containerWidthDesktop,
        gapDesktop,
        columnsDesktop,
        containerWidthTablet,
        gapTablet,
        columnsTablet,
        containerWidthMobile,
        gapMobile,
        columnsMobile,
      })
      localStorage.setItem(DEBUG_GRID, localStorageValue)
    },

    getDebugFromLS(key) {
      const { value = false } = JSON.parse(localStorage.getItem(key)) || {}
      return value
    },

    setDebug(key, className, value) {
      this[key] = value
      localStorage.setItem(
        key,
        JSON.stringify({
          value,
        })
      )
      this.body.classList[value ? 'add' : 'remove'](className)
    },

    toggleDebugOutline() {
      this.setDebug(
        IS_DEBUG_OUTLINE,
        'is-debug-outline',
        !this.getDebugFromLS(IS_DEBUG_OUTLINE)
      )
    },

    toggleDebug() {
      this.setDebug(IS_DEBUG, 'is-debug', !this.getDebugFromLS(IS_DEBUG))
    },

    toggleDebugKeyPress(event) {
      if (event.altKey && event.shiftKey && event.ctrlKey) {
        this.setDebug(IS_DEBUG, 'is-debug', !this.getDebugFromLS(IS_DEBUG))
      }
    },
  },
}
</script>

<style lang="stylus">
.is-debug-outline {
  * {
    outline: 1px dotted rgba(red, 0.5);
  }

  * * {
    outline: 1px dotted rgba(green, 0.5);
  }

  * * * {
    outline: 1px dotted rgba(orange, 0.5);
  }

  * * * * {
    outline: 1px dotted rgba(blue, 0.5);
  }

  * * * * * {
    outline: 1px solid rgba(red, 0.5);
  }

  * * * * * * {
    outline: 1px solid rgba(green, 0.5);
  }

  * * * * * * * {
    outline: 1px solid rgba(orange, 0.5);
  }

  * * * * * * * * {
    outline: 1px solid rgba(blue, 0.5);
  }

  * * * * * * * * * {
    outline: 1px solid rgba(aliceblue, 0.5);
  }

  * * * * * * * * * * {
    outline: 1px solid rgba(antiquewhite, 0.5);
  }

  * * * * * * * * * * * {
    outline: 1px solid rgba(aqua, 0.5);
  }

  * * * * * * * * * * * * {
    outline: 1px solid rgba(aquamarine, 0.5);
  }

  * * * * * * * * * * * * * {
    outline: 1px solid rgba(blueviolet, 0.5);
  }

  * * * * * * * * * * * * * * {
    outline: 1px solid rgba(brown, 0.5);
  }

  * * * * * * * * * * * * * * * {
    outline: 1px solid rgba(burlywood, 0.5);
  }

  * * * * * * * * * * * * * * * * {
    outline: 1px solid rgba(cadetblue, 0.5);
  }
}
</style>

<style lang="stylus" scoped>
$colCountDesktop = $COL_COUNT_DESKTOP;
$colCountTablet = $COL_COUNT_TABLE;
$colCountMobile = $COL_COUNT_MOBILE;
$containerWidthDesktop = $CONTAINER_WIDTH_DESKTOP;
$containerSideOffsetDesktop = $CONTAINER_SIDE_OFFSET_DESKTOP;
$containerWidthTablet = $CONTAINER_WIDTH_TABLET;
$containerSideOffsetTablet = $CONTAINER_SIDE_OFFSET_TABLET;
$containerWidthMobile = $CONTAINER_WIDTH_MOBILE;
$containerSideOffsetMobile = $CONTAINER_SIDE_OFFSET_MOBILE;
$colGapDesktop = $COL_GAP_DESKTOP;
$colGapTablet = $COL_GAP_TABLET;
$colGapMobile = $COL_GAP_MOBILE;

.debug-wrapper {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1000000;
  display: none;
  width: 100%;
  height: 0;

  .debug-service {
    position: absolute;
    top: 0;
    right: 0;
    z-index: 1000;
    padding: 20px;
    background: rgba(#000, 0.5);
    color: white;
    font-size: 14px;
    cursor: pointer;

    .debug-service-close {
      position: absolute;
      top: 10px;
      right: 10px;
      display: block;
      margin: 0;
      padding: 0;
      width: 30px;
      height: 30px;
      border: 0;
      background: black;
      color: white;
      font-size: 16px;
      line-height: 30px;
    }

    input {
      display: block;
      margin: 5px 0 12px;
      padding: 3px 5px;
      font-size: 12px;
      min-width: 48px;
    }

    button {
      font-size: 14px;
    }

    details {
      margin-bottom: 10px;

      summary {
        font-size: 16px;
      }

      fieldset {
        margin: 10px -5px 0 -5px;
        padding: 5px;
        border: 0;
        box-shadow: 0 0 1px 1px rgba(255, 255, 255, 0.6);
      }
    }

    a {
      color: white;
      text-decoration: underline;
    }
  }

  .is-debug & {
    display: block;
  }
}

#debug {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;

  .section {
    height: 100%;
    padding: 0;
  }

  .debug-container {
    margin: auto;
    padding-top: 0;
    padding-bottom: 0;
    width: 100%;
    height: inherit;
  }

  .debug-content {
    display: grid;
    padding: 0;
    width: 100%;
    height: 100%;
    background: transparent;
    grid-auto-rows: minmax(100%, auto);

    div {
      margin: 0;
      // background-color: rgba(0, 0, 0, 0.2);
      background: linear-gradient(-45deg, rgba(#000, .1), rgba(#E91E63, .2))
      // box-shadow: -1px 0 0 0 rgba(0, 0, 0, 0.2), 1px 0 0 0 rgba(0, 0, 0, 0.2);
    }
  }
}

@media $desktop {
  #debug {
    .debug-container {
      width: $containerWidthDesktop;
      box-shadow: '-%s 0 0 0 #8a2be226, %s 0 0 0 #8a2be226' % ($containerSideOffsetDesktop $containerSideOffsetDesktop);
    }

    .debug-content {
      grid-template-columns: repeat($colCountDesktop, auto);
      // margin: 0 0 - ($colGapDesktop / 2);
      grid-gap: $colGapDesktop;

      div {
        // margin: 0 ($colGapDesktop / 2);
      }
    }
  }
}

@media $tablet {
  #debug {
    .debug-container {
      width: $containerWidthTablet;
      box-shadow: '-%s 0 0 0 #8a2be226, %s 0 0 0 #8a2be226' % ($containerSideOffsetTablet $containerSideOffsetTablet);

      &.container {
        padding: 0;
      }
    }

    .debug-content {
      grid-template-columns: repeat($colCountTablet, auto);
      grid-gap: $colGapTablet;

      // margin: 0 0 - ($colGapTablet / 2);
      div {
        // margin: 0 ($colGapTablet / 2);
      }
    }
  }
}

@media $mobile {
  #debug {
    .debug-container {
      width: $containerWidthMobile;
      box-shadow: '-%s 0 0 0 #8a2be226, %s 0 0 0 #8a2be226' % ($containerSideOffsetMobile $containerSideOffsetMobile);

      &.container {
        padding: 0;
      }
    }

    .debug-content {
      width: 100%;
      grid-template-columns: repeat($colCountMobile, auto);
      grid-gap: $colGapMobile;

      div {
        // grid-column-gap
      }
    }
  }
}
</style>
