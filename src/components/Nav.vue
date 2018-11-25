<template>
  <ul class="size1-text">
    <template v-for="route in routes"> 
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
  align-items: flex-end;
  align-content: flex-end;
  border-bottom: 1px solid #ccc;
  box-shadow: 0 1px 2px rgba(0,0,0,.3);

  a {
    margin: 0 1% 0 1%;
    text-decoration: none;
    font-weight: bold;
    &.router-link-exact-active {
	    border-bottom: 2px solid $color1;
    }
    &:hover:not(.router-link-exact-active) {
      border-bottom: 2px solid transparent;
    }
  }
}
</style>