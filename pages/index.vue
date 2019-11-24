<template>
  <div :class="$mq" class="page">
    <div v-if="postsExist" :class="$mq" class="BlogWrapper">
      <BlogPost :class="$mq" v-for="post in posts()" :key="post.id" class="BlogPost" :post="post"></BlogPost>
    </div>

    <div v-else-if="loading()" class="BlogWrapper">
      <img src="../components/icons/spinner.svg" />
    </div>

    <div v-else class="Error">
      <p>
        * Sorry! No posts found matching
        <strong>"{{ searchQuery() }}."</strong> Try another search term *
      </p>
    </div>
  </div>
</template>

<script>
import Prismic from "prismic-javascript";
import PrismicConfig from "~/prismic.config.js";
import BlogPost from "~/components/BlogPost.vue";
import Search from "~/components/Search.vue";

export default {
  components: {
    BlogPost,
    Search
  },
  data() {
    return {
      noPostsFound: false
    };
  },
  created() {
    this.$store.commit("setPosts", this.dataPosts);
  },
  methods: {
    posts() {
      return this.$store.state.posts;
    },
    loading() {
      return this.$store.state.loading;
    },
    searchQuery() {
      return this.$store.state.searchQuery;
    }
  },
  computed: {
    postsExist() {
      return this.posts().length !== 0;
    }
  },
  head() {
    return {
      title: "Luxe Progressive: Musings"
    };
  },
  async asyncData({ context, error, req }) {
    try {
      const api = await Prismic.getApi(PrismicConfig.apiEndpoint, { req });

      const blogPosts = await api.query(
        Prismic.Predicates.at("document.type", "post"),
        { orderings: "[my.post.date desc]" }
      );

      debugger;

      return {
        dataPosts: blogPosts.results
      };
    } catch (e) {
      error({
        statusCode: 404,
        message: "Blog posts could not be retrieved at this time."
      });
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/style.scss";

.BlogWrapper {
  width: 100%;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  grid-row-gap: 2rem;
  grid-column-gap: 1rem;
  justify-items: center;
  width: 100%;
  margin-top: 2rem;

  &.mobile {
    grid-template-columns: 1fr;
  }

  img {
    height: 80px;
  }
}

.Error {
  font-size: 1.1rem;
  color: $primarycolor;
  margin-top: 2rem;
}
</style>