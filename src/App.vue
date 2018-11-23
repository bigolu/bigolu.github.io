<template>
  <div class="app-container">
    <Nav :routes="routes" />
    <router-view />
  </div>
</template>

<script>
import Nav from "@/components/Nav.vue";

export default {
  name: "App",
  components: { Nav },
  data: function() {
    return {
      routes: this.$router.options.routes
    };
  }
};
</script>

<style scoped lang="scss">
.app-container {
  height: 100%;
  width: 100%;
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 1fr 11fr;
}
</style>
