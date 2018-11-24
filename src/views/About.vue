<template>
  <div class="about-container">
    <div class="container">
      <div class="foo">
        <Polaroid>
          <img
            slot="image"
            :alt="data.pic.alt"
            :src="data.pic.src"
          >
          <figcaption
            slot="caption"
            class="size2-text"
          >
            <span class="olaolu">
              <span
                ref="ola"
                class="transparent color-animation"
              >OLA</span>
              <span
                ref="olu"
                class="color1 slide-down top-animation"
              >OLU</span>
            </span>
            <br>
            <span class="biggie">
              <span
                ref="big"
                class="color1 slide-up bottom-animation"
              >BIG</span>
              <span
                ref="gie"
                class="transparent color-animation"
              >GIE</span>
            </span>
            <br>
            EMMANUEL
          </figcaption>
        </Polaroid>
      </div>
    </div>
    <figure class="blurb-figure size2-text">
      <p>
        Software engineer at &lt;tbd&gt;
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
        <p> or email me at {{ data.email }} </p>
      </div>
    </figure>
  </div>
</template>

<script>
import Data from '@/scripts/data.js';
import $ from 'jquery';
import Polaroid from '@/components/Polaroid.vue'

export default {
  name: "About",
  props: {
    data: {
      type: Object,
      required: true
    }
  },
  components: {Polaroid},
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
  display: flex;
  flex-flow: row nowrap;
  justify-content: center;
  align-items: center;
  padding: 5%;

  .foo {
    height: 100%;
    width: 90%;

    img {
      max-height: 436px;
      max-width: 407px;
      height: 100%;
      width: 100%;
      display: block;
      margin: auto;
    }

    figcaption {
      text-align: center;
      height: 100%;
      width: 100%;
      display: flex;
      flex-flow: column nowrap;
      justify-content: center;
      align-content: center;
      align-items: center;

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
}

.about-container {
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
  .about-container {
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