<template>
  <div class="music-list">
    <div class="back" @click="back">
      <i class="icon-back"></i>
    </div>
    <h1 class="title" v-html="title"></h1>
    <div class="bg-image" :style="bgStyle" ref="bgImage">
      <div class="play-wrapper" ref="playBtn" v-show="songs.length > 0">
        <div class="play">
          <i class="icon-play"></i>
          <span class="text">随机播放全部</span>
        </div>
      </div>
      <div class="filter" ref="filter"></div>
    </div>
    <div class="bg-layer" ref="layer"></div>
    <scroll :probe-type="probeType" :listen-scroll="listenScroll" @scroll="scroll" :data="songs" class="list" ref="list">
      <div class="song-list-wrapper">
        <song-list :songs="songs" @select="selectItem"></song-list>
      </div>
      <div v-show="!songs.length" class="loading-container">
        <loading></loading>
      </div>
    </scroll>
  </div>
</template>
<script>
import Scroll from 'base/scroll/scroll'
import Loading from 'base/loading/loading'
import SongList from 'base/song-list/song-list'
import { prefixStyle } from 'common/js/dom'
import { mapActions } from 'vuex'

const RESERVED_HEIGHT = 40
const transform = prefixStyle('transform')
const backdrop = prefixStyle('backdrop-filter')

export default {
  data () {
    return {
      scrollY: 0
    }
  },
  created () {
    this.probeType = 3
    this.listenScroll = true
  },
  mounted () {
    this.imageHeight = this.$refs.bgImage.clientHeight
    this.minTransalteY = -this.imageHeight + RESERVED_HEIGHT
    this.$refs.list.$el.style.top = `${this.imageHeight}px`
  },
  props: {
    title: {
      type: String,
      default: ''
    },
    songs: {
      type: Array,
      default: () => {
        return []
      }
    },
    bgImage: {
      type: String,
      default: ''
    }
  },
  computed: {
    bgStyle () {
      return `background-image: url(${this.bgImage})`
    }
  },
  watch: {
    scrollY (newY) {
      let translateY = Math.max(this.minTransalteY, newY)
      let zIndex = 0
      let scale = 1
      let blur = 0
      let precent = Math.abs(newY / this.imageHeight)

      if (newY > 0) {
        zIndex = 10
        scale = 1 + precent
      } else {
        blur = Math.min(20, precent * 20)
      }
      this.$refs.layer.style[transform] = `translate3d(0,${translateY}px, 0)`
      this.$refs.filter.style[backdrop] = `blur(${blur}px)`
      if (newY < this.minTransalteY) {
        zIndex = 10
        this.$refs.bgImage.style.paddingTop = 0
        this.$refs.bgImage.style.height = `${RESERVED_HEIGHT}px`
        this.$refs.playBtn.style.display = 'none'
      } else {
        this.$refs.bgImage.style.paddingTop = '70%'
        this.$refs.bgImage.style.height = 0
        this.$refs.playBtn.style.display = ''
      }
      this.$refs.bgImage.style.zIndex = zIndex
      this.$refs.bgImage.style[transform] = `scale(${scale})`
    }
  },
  components: {
    Scroll,
    SongList,
    Loading
  },
  methods: {
    scroll (pos) {
      this.scrollY = pos.y
    },
    back () {
      this.$router.back()
    },
    selectItem (item, index) {
      this.selectPlay({
        list: this.songs,
        index
      })
    },
    ...mapActions([
      'selectPlay'
    ])
  }
}
</script>
<style scoped>
.music-list {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 100;
  background: #222;
}
.back {
  position: absolute;
  top: 0;
  left: .12rem;
  z-index: 50;
}
.icon-back {
  display: block;
  padding: .2rem;
  font-size: 22px;
  color: #ffcd32;
}
.title {
  position: absolute;
  top: 0;
  left: 10%;
  width: 80%;
  height: .8rem;
  line-height: .8rem;
  text-align: center;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  color: #fff;
  font-size: 18px;
  z-index: 40;
}
.music-list .bg-image {
  position: relative;
  width: 100%;
  height: 0;
  padding-top: 70%;
  background-size: cover;
  transform-origin: top;
}
.music-list .play-wrapper {
  position: absolute;
  bottom: .4rem;
  width: 100%;
  z-index: 50;
}
.play {
  width: 2.7rem;
  padding: .14rem 0;
  margin: 0 auto;
  font-size: 0;
  border-radius: 2rem;
  border: 1px solid #ffcd32;
  color: #ffcd32;
  text-align: center;
  box-sizing: border-box;
}
.play .icon-play {
  display: inline-block;
  vertical-align: middle;
  margin-right: .12rem;
  font-size: 16px;
}
.play .text {
  display: inline-block;
  vertical-align: middle;
  font-size: 12px;
}
.filter {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(7, 17, 27, 0.4);
}
.list {
  position: absolute;
  top: 0;
  bottom: 0;
  width: 100%;
  background: #222;
}
.song-list-wrapper {
  padding: .4rem .6rem;
}
.bg-layer {
  position: relative;
  height: 100%;
  background: #222;
}
.loading-container {
  position: absolute;
  top: 50%;
  width: 100%;
  transform: translateY(-50%);
}
</style>
