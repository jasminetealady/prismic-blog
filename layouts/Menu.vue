<template>
  <div ref="menu" class="menu">
    <nav>
      <nuxt-link to="/">Musings</nuxt-link>
      <nuxt-link to="/about">About</nuxt-link>
      <a target="_blank" href="https://www.berniesanders.com">Bernie</a>
    </nav>
  </div>
</template>

<script>
export default {
  watch: {
    $route(to, from) {
      if (to.path === "/blog" || to.path === "/" || to.path === "/about") {
        this.$emit("routeChanged");
      }
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/style.scss";
.menu {
  display: flex;
  justify-content: center;
  width: 250px;
  height: 100vh;
  background-color: $primarycolor;
  position: absolute;
  top: 0;
  left: 0;
  z-index: -1;

  nav {
    display: flex;
    align-items: center;
    flex-direction: column;
    margin-top: 8rem;
    color: white;
    text-transform: lowercase;
    font-size: 1.25rem;
    font-weight: 600;

    a {
      margin: 1rem 0;
    }
  }
}
</style>