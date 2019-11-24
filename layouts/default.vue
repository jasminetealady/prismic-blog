<template>
  <div class="app-wrapper">
    <MenuIcon v-if="!overlay" @open="toggleNav" />
    <ExitIcon v-if="overlay" @close="toggleNav" />
    <Menu @routeChanged="exitNav" />
    <div @click.self="exitSearch" ref="site" class="SiteWrapper">
      <div v-if="overlay" @click.self="exitNav" class="Overlay"></div>
      <Title />
      <Twitter />
      <font-awesome-icon
        ref="searchIcon"
        @click="toggleSearch"
        id="Search"
        size="lg"
        v-if="$route.path === '/'"
        :icon="['fas', 'search']"
      />
      <div ref="search" class="SearchMenu">
        <div class="flex-center">
          <h3>Search Posts</h3>
          <Search />
        </div>
      </div>

      <nuxt />
    </div>
  </div>
</template>

<script>
import Title from "./Title";
import Menu from "../layouts/Menu";
import Twitter from "../components/icons/TwitterIcon";
import MenuIcon from "../components/icons/MenuIcon";
import ExitIcon from "../components/icons/ExitIcon";
import Search from "../components/Search";

export default {
  components: { Title, Menu, Twitter, MenuIcon, ExitIcon, Search },
  head() {
    return {
      title: "Luxe Progressive"
    };
  },
  data() {
    return {
      overlay: false,
      menuWidth: "250px",
      searchMenuHeight: "50px",
      boxShadow: "0 30px 75px 0 rgba(10, 25, 41, 0.1)"
    };
  },
  methods: {
    toggleSearch() {
      if (!this.searchOpen()) {
        this.$refs.search.style.top = 0;
        this.$refs.search.style.boxShadow = this.boxShadow;
      } else {
        this.$refs.search.style.top = `-${this.searchMenuHeight}`;
        this.$refs.search.style.boxShadow = "";
      }
    },
    toggleNav() {
      if (this.navClosed()) {
        this.$refs.site.style.left = this.menuWidth;
        this.exitSearch();
        this.overlay = true;
      } else {
        this.$refs.site.style.left = "0px";
        this.overlay = false;
      }
    },
    marginLeft() {
      return this.$refs.site.style.left;
    },
    searchOpen() {
      return (
        this.$refs.search.style.top === "0px" ||
        this.$refs.search.style.top === "0px"
      );
    },
    navClosed() {
      return this.marginLeft() === "0px" || this.marginLeft() === "";
    },
    exitNav() {
      if (!this.navClosed()) {
        this.toggleNav();
      }
    },
    exitSearch() {
      if (this.searchOpen()) {
        this.toggleSearch();
      }
    }
  }
};
</script>

<style lang="scss">
@import "@/assets/scss/style.scss";

.SiteWrapper {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 1;
  background: $bgcolor;
  min-height: 100vh;
  transition: 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  display: flex;
  flex-direction: column;
  align-items: center;

  .Overlay {
    width: 100%;
    min-height: 100vh;
    background: rgba(255, 255, 255, 0.7);
    position: absolute;
    z-index: 999;
  }

  .SearchMenu {
    width: 100%;
    height: 50px;
    background: $primarycolor;
    position: absolute;
    top: -50px;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    transition: 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);

    h3 {
      color: #fff;
      font-weight: 800;
      text-transform: lowercase;
      font-size: 1.25rem;
      margin-right: 1rem;
    }
  }
}

#Search {
  margin: 0;
  top: 1rem;
  right: 1rem;
  position: absolute;
}

#Bars,
#Times {
  position: fixed;
  z-index: 100;
  margin: 0;
  top: 1rem;
  left: 1rem;
  z-index: 10;
  cursor: pointer;
}
</style>
