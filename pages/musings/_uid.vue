<template>
  <div class="page" :data-wio-id="documentId">
    <nuxt-link to="../">
      <font-awesome-icon
        id="back"
        size="lg"
        :icon="['fas', 'angle-double-left']"
      />
    </nuxt-link>
    <div class="BlogPost">
      <h1>{{ $prismic.richTextAsPlain(document.title) }}</h1>

      <span class="Date">{{ formattedDate }}</span>

      <section v-for="(slice, index) in slices" :key="'slice-' + index">
        <template v-if="slice.slice_type === 'text'">
          <text-slice :slice="slice"></text-slice>
        </template>

        <template v-else-if="slice.slice_type === 'quote'">
          <quote-slice :slice="slice"></quote-slice>
        </template>

        <template v-else-if="slice.slice_type === 'image_with_caption'">
          <image-caption-slice :slice="slice"></image-caption-slice>
        </template>
      </section>
    </div>
  </div>
</template>

<script>
import Prismic from "prismic-javascript";
import PrismicConfig from "~/prismic.config.js";
//Importing all the slices components
import TextSlice from "~/components/slices/TextSlice.vue";
import QuoteSlice from "~/components/slices/QuoteSlice.vue";
import ImageCaptionSlice from "~/components/slices/ImageCaptionSlice.vue";

export default {
  components: {
    TextSlice,
    QuoteSlice,
    ImageCaptionSlice
  },
  head() {
    return {
      title: `Luxe Progressive: ${this.postTitle}`
    };
  },
  async asyncData({ params, error, req }) {
    try {
      // Query to get API object
      const api = await Prismic.getApi(PrismicConfig.apiEndpoint, { req });

      // Query to get post content
      const post = await api.getByUID("post", params.uid);

      // Returns data to be used in template
      return {
        document: post.data,
        documentId: post.id,
        slices: post.data.body,
        postTitle: post.data.title[0].text,
        formattedDate: Intl.DateTimeFormat("en-US", {
          year: "numeric",
          month: "short",
          day: "2-digit"
        }).format(new Date(post.data.date))
      };
    } catch (e) {
      // Returns error page
      error({
        statusCode: 404,
        message: "This blog post could not be retrieved at this time."
      });
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/style.scss";

a {
  color: $primarycolor;
}

#back {
  position: absolute;
  top: 1rem;
  right: 1rem;
}

.BlogPost {
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
  box-shadow: $boxshadow;
  border-radius: 7px;
  padding: 4rem;
  border: solid 1px rgba(0, 0, 0, 0.04);
  width: 100%;
  max-width: 800px;
  height: 100%;
  background-color: $bgcolor;
  line-height: 1.5;

  h1 {
    font-size: 1.5rem;
    margin-bottom: 1rem;
  }

  span {
    margin-bottom: 1rem;
  }
}
</style>
