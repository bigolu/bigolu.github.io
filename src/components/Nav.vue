<template>
  <div class="nav-container">
    <ul class="nav-list">
      <template v-for="route in routes"> 
        &nbsp;
        <router-link
          :key="route.path"
          :to="route.path"
        >
          {{ route.name }}
        </router-link>
      </template>
    </ul>
  </div>
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
$link-border: 2px solid transparent;
$active-link-border: 2px solid $link-hover-color;

.nav-container {
  font-size: 1.5em;
  box-shadow: 0 0 2px rgba(0,0,0,0.25);
}

.nav-list {
  height: 100%;
  display: flex;
  flex-flow: row wrap;
  justify-content: flex-start;
  align-items: center;
  align-content: center;
  a {
    font-weight: bold;
    &.router-link-exact-active {
	    border-bottom: $active-link-border;
    }
    text-decoration: none;
	  border-bottom: $link-border;
  }
  a:hover {
    border-bottom: $active-link-border;
  }
}
</style>
