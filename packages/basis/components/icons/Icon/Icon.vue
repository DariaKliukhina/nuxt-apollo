<template>
  <component
    :is="href ? 'a' : 'div'"
    :href="href ? href : false"
    class="icon"
    :style="{ borderColor: borderColor ? borderColor : false }"
  >
    <client-only>
      <base-svg-icon
        :icon-name="iconName"
        :fill="fill"
        :stroke="stroke"
        scope="icons"
      />
    </client-only>
  </component>
</template>

<script>
import BaseSvgIcon from '@/packages/utils/Svg/Svg.vue'
export default {
  components: {
    BaseSvgIcon,
  },
  props: {
    href: {
      type: String,
      default: null,
    },
    iconName: {
      type: String,
      default: 'default',
    },
    fill: {
      type: String,
      default: null,
    },
    stroke: {
      type: String,
      default: null,
    },
    borderColor: {
      type: String,
      default: null,
    },
    title: {
      type: String,
      default: '',
    },
  },
}
</script>

<style lang="stylus" scoped>
$containerSize = 4rem;
$iconSize = 2.2rem;


$text = var(--color-accent-inverse);
$bg = var(--color-accent);


.icon {
  display: flex;
  justify-content: center;
  align-items: center;
  width: $containerSize;
  height: $containerSize;
  color: $text;
  cursor: pointer;

  svg {
    width: $iconSize;
    height: $iconSize;
  }

  &.icon--clear {
    width: $iconSize;
    height: $iconSize;
  }

  &.icon--round {
    border-radius: 50%;
    background: $bg;
  }

  &.icon--bordered {
    border-width: 1px;
    border-style: solid;
    border-radius: 50%;
    background: transparent;
  }
}

a.icon {
  transition: all 0.125s ease;

  &:hover {
    opacity: 0.5;
  }
}
</style>
