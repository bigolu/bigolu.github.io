<template>
  <ul class="size1-text">
    <template v-for="route in routes"> 
      &nbsp;
      <router-link
        :key="route.path"
        :to="route.path"
      >{{ route.name }}</router-link>
    </template>
  </ul>
</template>

<script>
export default {
  name: "Nav",
  props: {
    routes: {
      type: Array,
      required: true
    }
  }
};
</script>

<style scoped lang="scss">
ul {
  box-shadow: 0 0 2px $color3;
  display: flex;
  flex-flow: row wrap;
  justify-content: flex-start;
  align-items: center;
  align-content: center;
  a {
    text-decoration: none;
    font-weight: bold;
    &.router-link-exact-active, &:hover {
	    border-bottom: 2px solid $color1;
    }
  }
}
</style>