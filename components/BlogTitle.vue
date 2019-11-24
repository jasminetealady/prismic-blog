<template>
  <h2>{{ $prismic.richTextAsPlain(title) }}</h2>
</template>

<script>
export default {
  props: ["title"]
};
</script>