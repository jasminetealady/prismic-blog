<template>
  <nuxt-link :to="link">
    <Pin />
    <BlogTitle :title="title" />
    <span class="Date">{{ formattedDate }}</span>
    <p>{{getFirstParagraph(post, 100)}}</p>
  </nuxt-link>
</template>

<script>
import LinkResolver from '~/plugins/link-resolver.js'
import Pin from '../components/icons/PinIcon'
import BlogTitle from '../components/BlogTitle'

export default {
  components: {
    Pin,
    BlogTitle
  },
  props: ['post'],
  data: function() {
    return {
      link: '',
      formattedDate: '',
      title: ''
    }
  },
  name: 'blog-post',
  methods: {
    // Function to get the first paragraph of text in a blog post and limit the displayed text at 300 characters
    getFirstParagraph(post, characterLimit) {
      const textLimit = characterLimit
      const slices = post.data.body
      let firstParagraph = ''
      let haveFirstParagraph = false

      slices.map(function(slice) {
        if (!haveFirstParagraph && slice.slice_type == 'text') {
          slice.primary.text.forEach(function(block) {
            if (block.type == 'paragraph' && !haveFirstParagraph) {
              firstParagraph += block.text
              haveFirstParagraph = true
            }
          })
        }
      })

      const limitedText = firstParagraph.substr(0, textLimit)

      if (firstParagraph.length > textLimit) {
        return limitedText.substr(0, limitedText.lastIndexOf(' ')) + '...'
      } else {
        return firstParagraph
      }
    }
  },
  created() {
    ;(this.link = LinkResolver(this.post)),
      (this.formattedDate = Intl.DateTimeFormat('en-US', {
        year: 'numeric',
        month: 'short',
        day: '2-digit'
      }).format(new Date(this.post.data.date)))
    this.title = this.post.data.title
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/style.scss';

.BlogPost {
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
  box-shadow: $boxshadow;
  border-radius: 7px;
  padding: 2rem 2rem 1rem 2rem;
  border: solid 1px rgba(0, 0, 0, 0.04);
  width: 250px;
  height: 250px;
  background-color: $bgcolor;

  &:hover {
    transform: scale(1.02);
    transition: all 0.5s ease-in-out;
  }

  &.mobile {
    width: 300px;
    height: 300px;
  }

  #Pin {
    position: relative;
    z-index: 1;
    top: -2.5rem;
  }

  h2 {
    color: $primarycolor;
    font-weight: 600;
    padding-bottom: 0.5rem;
    margin-bottom: 0.5rem;
    border-bottom: solid 1px $primarycolor;
    cursor: pointer;
  }

  .Date {
    color: rgba(0, 0, 0, 0.5);
    margin: 1rem 0;
    font-size: 0.75rem;
  }

  p {
    line-height: 1.5;
    overflow: hidden;
  }
}
</style>