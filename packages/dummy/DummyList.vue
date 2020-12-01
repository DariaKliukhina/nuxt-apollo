<template>
  <ul class="dummy-link-list">
    <li v-for="n in iterations" :id="'item-' + n" :key="n">
      <a :href="`#item-${n}`">nav-item-{{ n }}</a>
    </li>
  </ul>
</template>

<script>
export default {
  props: {
    iterations: {
      type: Number,
      default: 1,
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

.dummy-link-list {
  margin: 0;
  padding: 0.5rem;
  background: rgba(#81C784, 0.2);
  list-style: none;

  > li {
    font-weight: 600;

    &:before {
      content: '- ';
    }
  }

  > li + li {
    @media $desktop {
      margin-top: 1rem;
    }
  }
}
</style>
