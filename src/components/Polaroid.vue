<template>
  <div class="polaroid-container">
    <div class="image-container"> <slot name="image" /> </div>
    <div class="caption-container"> <slot name="caption" /> </div>
  </div>
</template>

<script>
export default {
  name: "Polaroid",
};
</script>

<style lang="scss" scoped>
.polaroid-container {
  height: 100%;
  width: 100%;
  display: grid;
  grid-template-columns: 100%;
  grid-template-rows: 70% 30%;
  border: 1px solid #ccc;
  box-shadow: 0 4px 6px rgba(0,0,0,.3);
  background-color: white;

  .image-container {
    border-bottom: 1px solid $color3;
    padding: 5%;
  }
}
</style>
