<template>
  <section
    class="container with-title"
    id="about-section-container"
  >
    <h1 class="title">
      about
    </h1>
    <div id="about-section-content">
      <picture>
        <source
          :srcset="data.pic.static_src"
          media="(prefers-reduced-motion: reduce)"
        >
        <img
          id="biggie"
          :srcset="data.pic.src"
          :alt="data.pic.alt"
        >
      </picture>
      <p>
        Hey, I'm Biggie and I'm a software engineer. You can find me on
        <template v-for="link in data.links">
          <a
            class="link"
            target="_blank"
            :href="link.href"
            :key="link.href"
          >{{ link.name }}</a>,
        </template>
        or email me at {{ data.email }}
      </p>
    </div>
  </section>
</template>

<script>
export default {
  name: "About",
  props: {
    data: {
      type: Object,
      required: true
    }
  },
};
</script>

<style scoped lang="scss">
#about-section-content {
  display: flex;
  flex-flow: row nowrap;
  align-items: center;

  .logo {
    margin-right: 3%;

    &:last-child {
      margin-right: 0;
    }
  }

.link {
    text-decoration: underline !important;
    color: #e76e55;
}

  @media (max-width: 780px) {
    flex-flow: column nowrap;
    #biggie {
      width: 100%;
    }
  }
}
</style>
