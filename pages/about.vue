<template>
  <div :class="$mq" class="page About">
    <h1>About</h1>
    <p
      class
    >Lorem ipsum dolor sit amet consectetur adipisicing elit. Non dolorum, consectetur quasi in, repellat assumenda, debitis voluptatibus deserunt culpa voluptatem numquam temporibus esse eveniet architecto impedit. Similique iure voluptatum earum? Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequatur amet odit velit laboriosam libero doloremque totam? Totam ratione, dolore omnis, molestiae laboriosam maxime ad a excepturi, quisquam est rerum eum. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Totam, voluptatem? Natus excepturi odio nemo quaerat quas, fugiat mollitia facere dicta amet officia iusto nulla voluptatibus. Sequi aperiam voluptas fuga doloremque!</p>
  </div>
</template>

<script>
export default {
  name: 'about',
  head() {
    return {
      title: `Prismic Blog: About`
    }
  }
}
</script>

<style lang="scss">
.About {
  p {
    padding-top: 24px;
    line-height: 2;
    max-width: 1000px;
  }
}
</style>