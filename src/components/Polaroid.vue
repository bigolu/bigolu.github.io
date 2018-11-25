<template>
  <div class="polaroid-container">
    <div
      class="image-container"
      :style="`background-color: ${imageColor};`"
    >
      <slot name="image" />
    </div>
    <div
      class="caption-container"
      :style="`background-color: ${captionColor};`"
    >
      <slot name="caption" />
    </div>
  </div>
</template>

<script>
export default {
  name: "Polaroid",
  props: {
    captionColor: {
      type: String,
      required: false,
      default: 'white'
    },
    imageColor: {
      type: String,
      required: false,
      default: 'white'
    }
  }
};
</script>

<style lang="scss" scoped>
.polaroid-container {
  height: 100%;
  width: 100%;
  display: grid;
  grid-template-columns: 100%;
  grid-template-rows: 60% 40%;
  border: 1px solid #ccc;
  box-shadow: 0 4px 6px rgba(0,0,0,.3);
  border-radius: 2px;

  .image-container {
    padding: 3%;
  }
}
</style>
