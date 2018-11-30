<script>
import Nav from "@/components/Nav.vue";
import Data from '@/scripts/data.js';
import About from '@/views/About.vue';
import Name from '@/views/Name.vue';
import Portfolio from '@/views/Portfolio.vue';

export default {
  name: "App",
  render() {
    return (
      <div id="app-container">
        <Nav routes={Object.keys(Data)} />
        <div id="sections-container" class="container">
          <Name />
          <About data={Data.about} />
          <Portfolio data={Data.portfolio} />
          <a
            id="resume"
            href={Data.resume.href}
            target="_blank"
          >
            <button id="resume" class="btn" type="button"> resume </button>
          </a>
          <p id="footer"> Made with <a target="_blank" href="https://bcrikko.github.io/NES.css/"> NES.css </a> and <a target="_blank" href="https://vuejs.org/"> Vue.js </a> </p>
        </div>
      </div>
    );
  },
  components: { Nav, About, Name, Portfolio }
};
</script>

<style scoped lang="scss">
#sections-container {
  &:after {
    border: none;
  }

  & > * {
    margin-bottom: 3%;
  }

  #resume {
    margin-left: auto;
    margin-right: auto;
    display: block;
  }

  #footer {
    text-align: right;
    margin-bottom: 0;

    a {
      color: $link-color;
    }
  }
}
</style>
