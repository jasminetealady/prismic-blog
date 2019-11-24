<template>
  <input v-model="searchQuery" placeholder="..." />
</template>

<script>
export default {
  data() {
    return {
      query: ""
    };
  },
  computed: {
    searchQuery: {
      get() {
        return this.query;
      },
      set(value) {
        this.query = value;
        this.filterBySearch(value);
      }
    }
  },
  methods: {
    filterBySearch(query) {
      const Prismic = require("prismic-javascript");
      this.$store.commit("loading", true);
      this.$store.commit("setSearchQuery", query);
      Prismic.getApi("https://luxe-progressive.prismic.io/api/v2")
        .then(function(api) {
          return api.query([
            Prismic.Predicates.at("document.type", "post"),
            Prismic.Predicates.fulltext("document", query)
          ]);
        })
        .then(response => this.$store.commit("setPosts", response.results));
      this.$store.commit("loading", false);
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/style.scss";
input::placeholder {
  text-align: center;
  padding: 0;
  margin: 0;
  color: $primarycolor;
}

input {
  border: solid 1px rgba(0, 0, 0, 0.1);
  padding: 0.5rem;
  width: 200px;
  background-color: #fff;
  border-radius: 5px;
  margin-right: 0.5rem;
  display: flex;
  align-items: center;
}
</style>