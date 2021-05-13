<template>
  <section
    class="container with-title"
    id="about-section-container"
  >
    <h1 class="title">
      about
    </h1>
    <div id="about-section-content">
      <img
        id="biggie"
        :alt="data.pic.alt"
        :src="data.pic.src"
      >
      <p>
        Hey, I'm Biggie and I'm a software engineer
        --
        You can find me on 
        <span class="logos">
          <template v-for="link in data.links">
            <a
              class="logo"
              target="_blank"
              :href="link.href"
              :key="link.href"
            >
              <img
                :alt="link.alt"
                :src="link.src"
              >
            </a>
          </template>
        </span>
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
