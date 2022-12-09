<script>
import Data from '@/scripts/data.js';
import AboutSection from '@/views/AboutSection.vue';
import NameSection from '@/views/NameSection.vue';
import PortfolioSection from '@/views/PortfolioSection.vue';

export default {
  name: "App",
  render() {
    return (
      <div id="app-container">
        <div id="sections-container" class="container">
          <NameSection />
          <AboutSection data={Data.about} />
          <PortfolioSection data={Data.portfolio} />
          <span id="resume-container">
            <a
              id="resume"
              href={Data.resume.href}
              target="_blank"
            >
              <button id="resume" class="btn" type="button"> resume </button>
            </a>
          </span>
        </div>
        <p id="footer"> Made with <a target="_blank" href="https://bcrikko.github.io/NES.css/"> NES.css </a> and <a target="_blank" href="https://vuejs.org/"> Vue.js </a> </p>
      </div>
    );
  },
  components: { AboutSection: AboutSection, NameSection: NameSection, PortfolioSection: PortfolioSection }
};
</script>

<style scoped lang="scss">
#sections-container {
  max-width: 1280px;
  margin: auto;

  &:after {
    border: none;
  }

  & > * {
    margin-bottom: 20px;
  }

  #resume-container {
    display: flex;
    justify-content: center;
  }
}

#footer {
  text-align: right;
  margin-bottom: 10px;
  margin-right: 15px;
  font-size: 12px;

  a {
    color: $link-color;
  }
}
</style>
