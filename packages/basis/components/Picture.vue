<template>
  <picture
    v-if="sources.length > 0"
    class="picture"
    :class="{ 'is-initial-size': isInitialSize }"
    :style="initialSizes"
  >
    <source
      v-for="(src, index) in sources"
      :key="index"
      :data-srcset="src.srcset"
      :type="src.type"
      :media="src.media ? src.media : false"
    />
    <img
      :data-srcset="fallback.srcset"
      :data-src="fallback.src"
      :src="fallback.lqi"
      :alt="alt"
      class="lazyload"
    />
  </picture>
</template>

<script>
import { mapState } from 'vuex'
export default {
  props: {
    id: {
      type: String,
      default: '_',
    },
    alt: {
      type: [String, Number],
      default: '',
    },
    source: {
      type: String,
      default: '',
    },
    contentType: {
      type: String,
      default: '',
    },
    sizes: {
      type: [Array, Object],
      default: () => [1600, 1600],
    },
    isInitialSize: {
      type: Boolean,
      default: true,
    },
    isCover: {
      type: Boolean,
      default: true,
    },
    quality: {
      type: Number,
      default: 80,
    },
    isLocal: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      sources: [],
      fallback: {},
      rootUrl: process.env.IMAGE_OPTIMIZER_URL,
    }
  },
  computed: {
    ...mapState(['mediaQuery']),
    mqList() {
      return this.mediaQuery.list
    },
    mqLargest() {
      return this.mqList[this.mqList.length - 1].key
    },
    initialSizes() {
      const mqKey = this.mediaQuery.mqKey
      // если надо растянуть на весь родитель или нет пропы размеров для картинки
      if (!this.isInitialSize || !this.sizes) {
        return {}
      }
      // если размеры картинки не привязаны к mq и просто массив из ширины и высоты
      if (Array.isArray(this.sizes)) {
        return {
          width: `${this.sizes[0] / 10}rem`,
          height: `${this.sizes[1] / 10}rem`,
        }
      }
      // если они объект и в нем есть текущее mq
      else if (mqKey in this.sizes) {
        return {
          width: `${this.sizes[mqKey][0] / 10}rem`,
          height: `${this.sizes[mqKey][1] / 10}rem`,
        }
      }
      // если нет берем последнее (десктоп)
      else {
        return {
          width: `${this.sizes[this.mqLargest][0] / 10}rem`,
          height: `${this.sizes[this.mqLargest][1] / 10}rem`,
        }
      }
    },
  },
  created() {
    if (this.sizes) {
      if (Array.isArray(this.sizes)) {
        const srcset = `${this.generateUrl([
          this.sizes[0],
          this.sizes[1],
        ])}, ${this.generateUrl([this.sizes[0] * 2, this.sizes[1] * 2])} 2x`
        this.sources.push({
          srcset,
          type: this.contentType,
          media: false,
        })

        this.fallback = {
          srcset,
          src: this.generateUrl([this.sizes[0], this.sizes[1]]),
          lqi: this.generateUrl([25, 25], true),
        }
      } else {
        for (const mq in this.sizes) {
          const srcset = `${this.generateUrl([
            this.sizes[mq][0],
            this.sizes[mq][1],
          ])}, ${this.generateUrl([
            this.sizes[mq][0] * 2,
            this.sizes[mq][1] * 2,
          ])} 2x`
          const mediaSize = this.mqList.find(
            (mqListItem) => mqListItem.key === mq
          ) || { value: 0 }
          this.sources.push({
            srcset,
            type: this.contentType,
            media:
              mediaSize.value !== Infinity
                ? `(max-width: ${mediaSize.value}px)`
                : '(min-width: 1024px)',
          })
          this.fallback = {
            srcset,
            src: this.generateUrl([
              this.sizes[this.mqLargest][0],
              this.sizes[this.mqLargest][1],
            ]),
            lqi: this.generateUrl([25, 25], true),
          }
        }
      }
    } else {
      console.error('we need 404 image url here')
    }
  },
  methods: {
    generateUrl(sizes, isLqi) {
      let result = this.source

      if (!this.isLocal) {
        const source = this.source.replace('/media/', '')
        const coverParam = this.isCover ? '?fit=cover' : ''
        const lqiParam = '?blur=10'

        result = `${this.rootUrl}/${source}/${sizes[0]}/${sizes[1]}/${
          isLqi ? 50 : this.quality
        }/${isLqi ? lqiParam : coverParam}`
      }

      return result
    },
  },
}
</script>

<style lang="stylus" scoped>
picture, img {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center center;
}

.is-initial-size {
  display: block;
  position: relative;
  top: auto;
  left: auto;

  img {
    position: relative;
    top: auto;
    left: auto;
  }
}
</style>
