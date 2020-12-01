<template>
  <div class="dummy">
    <slot>
      <f-container>
        <pre>{{ propses }}</pre>
      </f-container>
    </slot>
  </div>
</template>

<script>
export default {
  name: 'Dummy',
  data() {
    return {}
  },
  computed: {
    propses() {
      return this.$attrs
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

[class*='dummy-'] {
  padding: 2rem;
}

.dummy-col {
  padding: 2rem 0;
  background: rgba(#FFCC80, 0.2);
  box-shadow: inset 0 0 0 1px rgba(#FFCC80, 0.2);
  text-align: center;
  font-size: 1rem;
}

.dummy-section {
  min-height: 10rem;
  background: rgba(#80CBC4, 0.2);
  box-shadow: inset 0 0 0 1px rgba(#80CBC4, 0.2);
}

.dummy-container {
  min-height: 20rem;
  background: rgba(#81D4FA, 0.2);
  box-shadow: inset 0 0 0 1px rgba(#81D4FA, 0.2);
}

.dummy-header {
  height: 100%;
  background: rgba(#ef5350, 0.2);
}

.dummy-hero {
  height: 30rem;
  background: rgba(#EC407A, 0.2);
}

.dummy-navigation-header {
  height: 100%;
  background: rgba(#5C6BC0, 0.2);
}

.dummy-nav-sidebar-wrapper {
  height: 100%;
  background: rgba(#26C6DA, 0.2);

  @media $mobile_tablet {
    display: inline-block;
  }

  @media $desktop {
    display: flex;
    flex-direction: column;
    flex-wrap: nowrap;
    justify-content: space-between;
  }
}

.dummy-nav-list {
  background: rgba(#26A69A, 0.2);

  @media $desktop {
    flex-grow: 1;
  }

  @media $mobile_tablet {
    >>> ul {
      display: inline-flex;
      margin: 0;
      padding: 0;
      list-style: none;

      > li {
        padding: 0.35rem 1rem;
        white-space: nowrap;
      }
    }
  }
}

.dummy-logo, .dummy-nav-footer {
  min-height: 4rem;
  background: rgba(#42A5F5, 0.2);

  @media $mobile_tablet {
    display: none;
  }
}

.dummy-logo {
  height: 5rem;
}

.dummy-content-list-item {
  min-height: 20rem;
  background: rgba(#29B6F6, 0.2);
  box-shadow: inset 0 0 0 1px rgba(#29B6F6, 0.2);
}

.dummy-footer {
  height: 100%;
  background: rgba(#AB47BC, 0.2);
}
</style>
