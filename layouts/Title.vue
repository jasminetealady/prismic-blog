<template>
  <div class="title flex-center-column">
    <h1>Luxe Progressive</h1>
    <h3>artful progressivism</h3>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/style.scss";
.title {
  padding: 4rem 0 2rem 0;

  h1 {
    color: $primarycolor;
    font-size: 2rem;
    font-weight: 600;
    padding: 2rem 0;
    text-transform: lowercase;
  }

  h3 {
    padding: 0 0 2rem 0;
    font-size: 1.25rem;
    border-bottom: solid 1px rgba(0, 0, 0, 0.2);
  }
}
</style>