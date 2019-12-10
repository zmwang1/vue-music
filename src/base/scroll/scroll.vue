<template>
  <div ref="wrapper">
    <slot></slot>
  </div>
</template>
<script>
import BScroll from 'better-scroll'
export default {
  props: {
    probeType: {
      type: Number,
      default: 1
    },
    click: {
      type: Boolean,
      default: false
    },
    data: {
      type: Array,
      default: () => {
        return []
      }
    },
    listenScroll: {
      type: Boolean,
      default: false
    }
  },
  mounted () {
    setTimeout(() => {
      this._initScroll()
    }, 20)
  },
  watch: {
    data () {
      this.refresh()
    }
  },
  methods: {
    _initScroll () {
      this.scroll = new BScroll(this.$refs['wrapper'], {
        probeType: this.probeType,
        click: this.click
      })

      if (this.listenScroll) {
        let vm = this
        this.scroll.on('scroll', (pos) => {
          vm.$emit('scroll', pos)
        })
      }
    },
    disable () {
      this.scroll && this.scroll.disable()
    },
    enable () {
      this.scroll && this.scroll.enable()
    },
    refresh () {
      this.scroll && this.scroll.refresh()
    },
    scrollTo () {
      this.scroll && this.scroll.scrollTo.apply(this.scroll, arguments)
    },
    scrollToElement () {
      this.scroll && this.scroll.scrollToElement.apply(this.scroll, arguments)
    }
  }
}
</script>
<style scoped>

</style>
