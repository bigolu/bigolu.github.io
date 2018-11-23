<template>
  <div class="about-container">
    <div class="about-pic">
      <img
        :alt="pic.alt"
        :src="pic.src"
      >
      <p><span class="ola hide-text">OLA</span><span class="olu">OLU</span> <br> <span class="big">BIG</span><span class="gie hide-text">GIE</span> <br> EMMANUEL</p>
    </div>
    <div class="about-text">
      <div class="blurb-container">
        <p class="blurb">
          Software engineer at (hmm dunno yet);
          Feel free to browse at your leisure.
        </p>
      </div>
      <div class="links-container">
        <template v-for="link in links">
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
        <p> or email me at {{ email }} </p>
      </div>
    </div>
  </div>
</template>

<script>
import Data from '@/scripts/data.js';
import $ from 'jquery';

export default {
  name: "About",
  data: function() {
    return Data.about;
  },
  created: function() {
    $(function(){ 
      console.log($('.ola'));
      $('.big, .olu').animate(
      {top: 0, bottom: 0},
      3000,
      function() {
        $('.ola, .gie').addClass('show-text');
      }
    ); 
    
    });
  }
};
</script>

<style scoped lang="scss">
.about-container {
  padding: 2%;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr;
}

.about-pic {
  display: flex;
  flex-flow: column nowrap;
  img {
    padding: 3%;
    flex-grow: 3;
    height: 20px;
    width: 50%;
    margin: auto;
  }
  p {
    flex-grow: 1;
    text-align: center;
    .hide-text {
      color: transparent;
      transition: color 3s ease-in-out;
    }
    .show-text {
      color: $text-color;
    }
    .big, .olu {
      color: $link-hover-color;
    }
    .big {
      position: relative;
      bottom: .69em;
    }
    .olu {
      position: relative;
      top: .69em;
    }
    font-size: 2em;
  }
}

.about-text {
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  .blurb-container {
    display: table;
    border-bottom: 1px solid rgba(0,0,0,0.25);
  }
  .blurb {
    display: table-cell;
    padding: 3%;
    font-size: 1.5em;
  }
  .links-container {
    padding: 3%;
    font-weight: bold;
  }
}

@media only screen 
  and (max-device-width: 480px)
  and (orientation: portrait)
{
  .about-container {
    grid-template-columns: 1fr;
    grid-template-rows: 1fr 1fr;
  }
}
</style>