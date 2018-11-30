<template>
  <ul class="size1-text">
    <template v-for="route in routes"> 
      <a
        :key="route"
        :href="`#${route}`"
      >{{ route }}</a>
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
  display: flex;
  flex-flow: row wrap;
  justify-content: flex-start;
  align-items: flex-end;
  align-content: flex-end;
  padding: 1%;
  border: 6px double $color2;
  display: none;

  a {
    margin: 0 1% 0 1%;
  }
}
</style>