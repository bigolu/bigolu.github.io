<template>
  <div class="container">
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
.container {
  height: 100%;
  width: 100%;
  display: grid !important;
  grid-template-columns: 100%;
  grid-template-rows: 60% 40%;
  padding: 0;

  .image-container {
    height: 100%;
    width: 100%
  }

  .caption-container {
    height: 100%;
    width: 100%;
    font-size: 1.3rem;
  }
}
</style>
