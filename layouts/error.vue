<template>
  <div class="page">
    <h1 v-if="error.statusCode === 404">Page Not Found</h1>
    <p class="padding-bottom-2" v-if="error.statusCode === 404">
      * If you are receiving this error when trying to navigate to
      <code>/blog</code> from within this site, please note that I am working to fix this issue. Temporarily, you can refresh the blog route and search the posts, but for now will not be able to access an individual post.
    </p>
    <h1 v-else>Oh no! An error occurred</h1>
    <nuxt-link to="/" style="text-decoration: underline;">Return Home</nuxt-link>
  </div>
</template>
<script>
export default {
  props: ["error"],
  layout: "default",
  head() {
    return {
      title: "Luxe Progressive"
    };
  }
};
</script>