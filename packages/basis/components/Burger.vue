<template>
  <div
    class="burger"
    :class="{ 'is-active': opened }"
    @click="$emit('update', !opened)"
  >
    <span class="bar" />
    <span class="bar" />
  </div>
</template>

<script>
export default {
  name: 'Burger',
  model: {
    event: 'update',
    prop: 'opened',
  },
  props: {
    opened: {
      type: Boolean,
      required: true,
    },
  },
}
</script>

<style scoped lang="stylus">
$burgerColor = currentColor

.burger {
  position: relative;
  margin-left: 1.5rem;
  width: 30px;
  height: 30px;
}
.bar {
  height: 1px;
  width: 100%;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto;
  opacity: 1;
  background-color: $burgerColor;
  transition all 0.15s ease-in-out;

  &:nth-child(1) {
    transform translateY(-3px)
  }
  &:nth-child(2) {
    transform translateY(3px)
  }
}
.burger.is-active .bar {
  transition all 0.35s ease-in-out;
  &:nth-child(1) {
    transform rotate(12deg)
  }
  &:nth-child(2) {
    transform rotate(-12deg)
  }
}
</style>
