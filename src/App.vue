<script>
import Nav from "@/components/Nav.vue";

export default {
  name: "App",
  render() {
    return (
      <div class="container">
        <Nav routes={this.$router.options.routes} />
        <router-view />
      </div>
    );
  },
  components: { Nav },
};
</script>

<style scoped lang="scss">
.container {
  height: 100%;
  display: grid;
  grid-template-columns: 100%;
  grid-template-rows: 8% 92%;
}
</style>
