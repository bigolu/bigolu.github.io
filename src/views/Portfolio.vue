<template>
  <div id="portfolio-section-container">
    <section
      class="container with-title"
      id="skills-section-container"
    >
      <h1 class="title">
        skills
      </h1>
      <ul id="skills-list">
        <li
          v-for="(skillList, category) in data.skills"
          :key="category"
          class="skill-category"
        >
          {{ category }}: {{ skillList }}
        </li>
      </ul>
    </section>
    <section
      class="container with-title"
      id="experience-section-container"
    >
      <h1 class="title">
        experience
      </h1>
      <figure
        v-for="e in data.experience"
        :key="e.description"
      >
        <img
          :alt="e.image.alt"
          :src="e.image.src"
        >
        <figcaption> {{ e.title }} - {{ e.description }} </figcaption>
      </figure>
    </section>
    <section
      class="container with-title"
      id="projects-section-container"
    >
      <h1 class="title">
        projects
      </h1>
      <figure
        v-for="p in data.projects"
        :key="p.title"
      >
        <img
          :alt="p.image.alt"
          :src="p.image.src"
        >
        <figcaption>
          {{ p.title }} - {{ p.description }}
          <a
            v-for="link in p.links"
            :key="link.href"
            :href="link.href"
            class="link"
          >{{ link.text }}</a>
        </figcaption>
      </figure>
    </section>
  </div>
</template>

<script>
export default {
  name: "Portfolio",
  props: {
    data: {
      type: Object,
      required: true
    }
  },
};
</script>

<style scoped lang="scss">
#portfolio-section-container {
    & > * {
        margin-bottom: 2%;
    }
}

.link {
    text-decoration: underline !important;
    margin-right: 20px;
    color: #e76e55;

    &:last-child {
      margin-right: 0;
    }
}

#skills-list {
  list-style: none;
  padding-left: 0;

  .skill {
    margin-right: 3%;

    &:last-child {
      margin-right: 0;
    }
  }
}
</style>
