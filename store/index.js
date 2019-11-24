export const state = () => ({
  posts: [],
  loading: false,
  searchQuery: ""
});

export const mutations = {
  setPosts(state, posts) {
    state.posts = posts.sort((a, b) =>
      b.first_publication_date.localeCompare(a.first_publication_date)
    );
  },
  loading(state, loading) {
    state.loading = loading;
  },
  setSearchQuery(state, query) {
    state.searchQuery = query;
  }
};
