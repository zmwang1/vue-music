<template>
  <div class="music-list">
    <div class="back">
      <i class="icon-back"></i>
    </div>
    <h1 class="title" v-html="title"></h1>
    <div class="bg-image" :style="bgStyle" ref="bgImage">
      <div class="play-wrapper">
        <div class="play">
          <i class="icon-play"></i>
          <span class="text">随机播放全部</span>
        </div>
      </div>
      <div class="filter"></div>
    </div>
    <div class="bg-layer" ref="layer"></div>
    <scroll :data="songs" class="list" ref="list">
      <div class="song-list-wrapper">
        <song-list :songs="songs"></song-list>
      </div>
    </scroll>
  </div>
</template>
<script>
import Scroll from 'base/scroll/scroll'
import SongList from 'base/song-list/song-list'

export default {
  mounted () {
    this.imageHeight = this.$refs.bgImage.clientHeight
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
  components: {
    Scroll,
    SongList
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
</style>
