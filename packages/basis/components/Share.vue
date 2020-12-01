<template>
  <div class="share">
    <button
      v-for="item in items"
      :key="item.name"
      type="button"
      class="share__item"
      @click="onShareClick(item.iconName)"
    >
      <icon
        :icon-name="item.iconName"
        :border-color="item.color"
        :fill="item.color"
        class="icon--round"
      />
    </button>
  </div>
</template>

<script>
import Icon from '@/packages/basis/components/icons/Icon/Icon.vue'
export default {
  components: {
    Icon,
  },
  props: {
    items: {
      type: Array,
      default: () => [
        {
          name: 'vk',
          iconName: 'vk',
        },
        {
          name: 'telegram',
          iconName: 'telegram',
        },
        {
          name: 'twitter',
          iconName: 'twitter',
        },
      ],
    },
  },
  data() {
    return {
      modalWidth: 626,
      modalHeight: 436,
      linkList: {
        facebook: 'https://www.facebook.com/sharer.php?u=',
        vk: 'https://vk.com/share.php?url=',
        whatsapp: 'https://api.whatsapp.com/send?text=',
        telegram: 'https://telegram.me/share/url?url=',
        twitter: 'https://twitter.com/intent/tweet?url=',
        email: 'mailto:?body=',
      },
    }
  },
  methods: {
    setModalSize(currentUrl) {
      if (this.modalHeight > document.documentElement.clientHeight) {
        this.modalHeight = document.documentElement.clientHeight
      }
      if (this.modalWidth > document.documentElement.clientWidth) {
        this.modalWidth = document.documentElement.clientWidth
      }
      window.open(
        currentUrl,
        '',
        `toolbar=0,status=0,width=${this.modalWidth},height=${this.modalHeight}`
      )
    },
    onShareClick(iconName) {
      const url = this.linkList[iconName]
      const currentUrl = `${url}${window.location.href}`
      this.setModalSize(currentUrl)
    },
  },
}
</script>

<style lang="stylus" scoped>
$desktop = $DESKTOP;
$mobile_tablet = $MOBILE_TABLET;

.share {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;

  &__item {
    display: block;
    margin: 0 1.5rem 1.5rem 0;
    padding: .5rem;
    outline: 0;
    border: 0;
    background: none;
    @media $desktop {
      &:hover {
        .icon--round {
          color: var(--color-accent);
          background-color: var(--color-accent-inverse)
        }
      }
    }
    @media $mobile_tablet {
      &:active {
        .icon--round {
          color: var(--color-accent);
          background-color: var(--color-accent-inverse)
        }
      }
    }
  }
}

.icon--round {
  transition: color .25s ease, background-color .25s ease;
}
</style>
