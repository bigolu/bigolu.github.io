<template>
  <section id="name-section-container">
    <span class="olaolu">
      <span
        ref="ola"
        class="transparent color-animation"
      >OLA</span>
      <span
        ref="olu"
        class="olu slide-down top-animation"
      >OLU</span>
    </span>
    <br>
    <span class="biggie">
      <span
        ref="big"
        class="big slide-up bottom-animation"
      >BIG</span>
      <span
        ref="gie"
        class="transparent color-animation"
      >GIE</span>
    </span>
    <br>
    EMMANUEL
  </section>
</template>

<script>
import Data from '@/scripts/data.js';
import $ from 'jquery';

export default {
  name: "NameSection",
  mounted: function() {
    const refs = this.$refs;
    $(
      () => {
        // bigolu animation
        refs.big.classList.remove('slide-up');
        refs.olu.classList.remove('slide-down');
        setTimeout(
          () => {
            refs.ola.classList.remove('transparent');
            refs.gie.classList.remove('transparent');
          },
          1000
        );
      }
    );
  }
};
</script>

<style lang="scss" scoped>
#name-section-container {
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-content: center;
  align-items: center;
  font-size: 3rem;


  @media (max-width: 780px) {
    font-size: 2rem;
  }
}

.color-animation {
transition: color 1s ease-in-out;
}

.transparent {
color: transparent;
background-color: transparent;
}

.top-animation {
position: relative;
transition: all 1s ease 0s;
top: 0;
}

.bottom-animation {
position: relative;
transition: bottom 1s ease 0s;
bottom: 0;
}

.top-animation, .bottom-animation {
color: $color5;
}

.slide-up {
bottom: .69em;
}

.slide-down {
top: .69em;
}

.big, .olu {
    color: $color1;
}
</style>
