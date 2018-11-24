<template>
  <div class="container">
    <figure class="pic-figure">
      <img
        :alt="data.pic.alt"
        :src="data.pic.src"
      >
      <figcaption class="size2-text">
        <span
          ref="ola"
          class="transparent color-animation"
        >OLA</span>
        <span
          ref="olu"
          class="color1 slide-down top-animation"
        >OLU</span>
        <br>
        <span
          ref="big"
          class="color1 slide-up bottom-animation"
        >BIG</span>
        <span
          ref="gie"
          class="transparent color-animation"
        >GIE</span>
        <br>
        EMMANUEL
      </figcaption>
    </figure>
    <figure class="blurb-figure">
      <p class="size1-text">
        Software engineer at nowhere;
        Feel free to browse at your leisure.
      </p>
      <hr>
      <div>
        <template v-for="link in data.links">
          <a
            target="_blank"
            :href="link.href"
            :key="link.href"
          >
            <img
              :alt="link.alt"
              :src="link.src"
            >
          </a>
          &nbsp;
        </template>
        <p class="size1-text"> or email me at {{ data.email }} </p>
      </div>
    </figure>
  </div>
</template>

<script>
import Data from '@/scripts/data.js';
import $ from 'jquery';

export default {
  name: "About",
  props: {
    data: {
      type: Object,
      required: true
    }
  },
  mounted: function() {
    const refs = this.$refs;
    $(
      () => {
        // bigolu animation
        refs.big.classList.remove('slide-up');
        refs.olu.classList.remove('slide-down');
        refs.ola.classList.remove('transparent');
        refs.gie.classList.remove('transparent');
      }
    );
  }
};
</script>

<style scoped lang="scss">
.container {
  padding: 3%;
  display: grid;
  grid-template-columns: 50% 50%;
  grid-template-rows: 100%;

  .pic-figure {
    display: flex;
    flex-flow: column nowrap;
    justify-content: center;
    align-items: center;

    img {
      display: block;
      height: 70%;
      max-height: 436px;
      max-width: 407px;
    }

    figcaption {
      text-align: center;
      height: 30%;
      width: 100%;

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

      .slide-up {
        bottom: .69em;
      }

      .slide-down {
        top: .69em;
      }
    }
  }

  .blurb-figure {
    display: flex;
    flex-flow: column nowrap;
    justify-content: center;

    p {
      padding: 2%;
    }

    hr {
      height: 2px;
      width: 100%;
      color: $color3;
    }

    div {
      padding: 2%;

      p {
        display: inline;
      }
    }
  }
}

@media only screen 
  and (max-device-width: 768px)
  and (orientation: portrait)
{
  .container {
    display: grid;
    grid-template-rows: 50% 50%;
    grid-template-columns: 100%;

    .blurb-figure {
      justify-content: center;
      flex-flow: row nowrap;
      align-items: center;
      text-align: center;

      hr {
        height: 80%;
        width: 2px;
      }

      p {
        width: 48%;
      }

      div {
        width: 48%;
      }
    }
  }
}
</style>