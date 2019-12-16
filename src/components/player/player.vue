<template>
  <div class="player" v-show="playlist.length > 0">
    <transition name="normal"
      @enter="enter"
      @after-enter="afterEnter"
      @leave="leave"
      @after-leave="afterLeave"
    >
      <div class="normal-player" v-show="fullScreen">
        <div class="background">
          <img width="100%" height="100%" :src="currentSong.image">
        </div>
        <div class="top">
          <div class="back" @click="back">
            <i class="icon-back"></i>
          </div>
          <h1 class="title" v-html="currentSong.name"></h1>
          <h2 class="subtitle" v-html="currentSong.singer"></h2>
        </div>
        <div class="middle">
          <div class="middle-l">
            <div class="cd-wrapper" ref="cdWrapper">
              <div class="cd">
                <img class="image" :class="cdCls" :src="currentSong.image">
              </div>
            </div>
            <div class="playing-lyric-wrapper">
              <div class="playing-lyric"></div>
            </div>
          </div>
        </div>
        <div class="bottom">
          <div class="dot-wrapper"></div>
          <div class="progress-wrapper"></div>
          <div class="operators">
            <div class="icon i-left">
              <i class="icon-sequence"></i>
            </div>
            <div class="icon i-left">
              <i class="icon-prev"></i>
            </div>
            <div class="icon i-center">
              <i @click="togglePlaying" :class="playIcon"></i>
            </div>
            <div class="icon i-right">
              <i class="icon-next"></i>
            </div>
            <div class="icon i-right">
              <i class="icon-not-favorite"></i>
            </div>
          </div>
        </div>
      </div>
    </transition>
    <transition name="mini">
      <div class="mini-player" v-show="!fullScreen" @click="open">
        <div class="icon">
          <div class="imgWrapper">
            <img width="40" height="40" :class="cdCls" :src="currentSong.image">
          </div>
        </div>
        <div class="text">
          <h2 class="name" v-html="currentSong.name"></h2>
          <p class="desc" v-html="currentSong.singer"></p>
        </div>
        <div class="control">
          <i @click.stop="togglePlaying" class="icon-mini" :class="miniIcon"></i>
        </div>
        <div class="control">
          <i class="icon-playlist"></i>
        </div>
      </div>
    </transition>
    <audio ref="audio" :src="currentSong.url"></audio>
  </div>
</template>
<script>
import { mapGetters, mapMutations } from 'vuex'
import animations from 'create-keyframe-animation'
import { prefixStyle } from 'common/js/dom'

const transform = prefixStyle('transform')

export default {
  computed: {
    playIcon () {
      return this.playing ? 'icon-pause' : 'icon-play'
    },
    miniIcon () {
      return this.playing ? 'icon-pause-mini' : 'icon-play-mini'
    },
    cdCls () {
      return this.playing ? 'play' : ''
    },
    ...mapGetters([
      'playlist',
      'fullScreen',
      'currentSong',
      'playing'
    ])
  },
  watch: {
    currentSong () {
      this.$nextTick(() => {
        this.$refs.audio.play()
      })
    },
    playing (newPlaying) {
      let audio = this.$refs.audio
      this.$nextTick(() => {
        newPlaying ? audio.play() : audio.pause()
      })
    }
  },
  methods: {
    back () {
      this.setFullScreen(false)
    },
    open () {
      this.setFullScreen(true)
    },
    enter (el, done) {
      const {x, y, scale} = this._getPosAndScale()
      let animation = {
        0: {
          transform: `translate3d(${x}px, ${y}px, 0) scale(${scale})`
        },
        60: {
          transform: `translate3d(0, 0, 0) scale(1.1)`
        },
        100: {
          transform: `translate3d(0, 0, 0) scale(1)`
        }
      }
      animations.registerAnimation({
        name: 'move',
        animation: animation,
        presets: {
          duration: 400,
          easing: 'linear'
        }
      })
      animations.runAnimation(this.$refs['cdWrapper'], 'move', done)
    },
    afterEnter (el) {
      animations.unregisterAnimation('move')
      this.$refs.cdWrapper.style.animation = ''
    },
    leave (el, done) {
      let {x, y, scale} = this._getPosAndScale()
      this.$refs.cdWrapper.style.transition = 'all 0.4s'
      this.$refs.cdWrapper.style[transform] = `translate3d(${x}px, ${y}px, 0) scale(${scale})`

      let timer = setTimeout(done, 400)
      this.$refs.cdWrapper.addEventListener('transitionend', () => {
        clearTimeout(timer)
        done()
      })
    },
    afterLeave (el) {
      this.$refs.cdWrapper.style.transition = ''
      this.$refs.cdWrapper.style[transform] = ''
    },
    togglePlaying () {
      this.setPlayingState(!this.playing)
    },
    _getPosAndScale () {
      const targetWidth = 40
      const paddingLeft = 40
      const paddingBottom = 30
      const paddingTop = 80
      const width = window.innerWidth * 0.8

      let x = -(window.innerWidth / 2 - paddingLeft)
      let y = (window.innerHeight - paddingTop - paddingBottom - width / 2)
      let scale = targetWidth / width

      return {x, y, scale}
    },
    ...mapMutations({
      setFullScreen: 'SET_FULL_SCREEN',
      setPlayingState: 'SET_PLAYING_STATE'
    })
  }
}
</script>
<style scoped>
.player .normal-player {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 150;
  background: #222;
}
.normal-player .background {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
  opacity: 0.6;
  filter: blur(20px)
}
.normal-player .top {
  position: relative;
  margin-bottom: .5rem;
}
.normal-player .middle {
  position: fixed;
  width: 100%;
  top: 1.6rem;
  bottom: 3.4rem;
  white-space: nowrap;
  font-size: 0;
}
.normal-player .bottom {
  position: absolute;
  bottom: 1rem;
  width: 100%;
}
.top .back {
  position: absolute;
  top: 0;
  left: .12rem;
  z-index: 50;
}
.top .back .icon-back {
  display: block;
  padding: .18rem;
  font-size: 22px;
  color: #ffcd32;
  transform: rotate(-90deg);
}
.top .title {
  width: 70%;
  margin: 0 auto;
  line-height: .8rem;
  text-align: center;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-size: 18px;
  color: #fff;
}
.top .subtitle {
  line-height: .4rem;
  font-size: 14px;
  text-align: center;
  color: #fff;
}
.middle .middle-l {
  display: inline-block;
  width: 100%;
  height: 0;
  padding-top: 80%;
  vertical-align: top;
  position: relative;
}
.middle-l .cd-wrapper {
  position: absolute;
  left: 10%;
  top: 0;
  width: 80%;
  height: 100%;
  box-sizing: border-box;
}
.cd-wrapper .cd {
  width: 100%;
  height: 100%;
  border-radius: 50%;
}
.cd .image {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  border-radius: 50%;
  border: 10px solid rgba(255, 255, 255, 0.1);
}
.cd .play {
  animation: rotate 20s linear infinite;
}
.playing-lyric-wrapper {
  width: 80%;
  margin: .6rem auto 0;
  overflow: hidden;
  text-align: center;
}
.playing-lyric-wrapper .playing-lyric {
  height: .4rem;
  line-height: .4rem;
  font-size: 14px;
  color: rgba(255, 255, 255, 0.5);
}
.bottom {
  position: absolute;
  bottom: 1rem;
  width: 100%;
}
.bottom .dot-wrapper {
  text-align: center;
  font-size: 0;
}
.dot-wrapper .dot {
  display: inline-block;
  vertical-align: middle;
  margin: 0 4px;
  width: .16rem;
  height: .16rem;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.5);
}
.dot.active {
  width: .4rem;
  border-radius: .1rem;
  background: rgba(255, 255, 255, 0.8);
}
.bottom .progress-wrapper {
  display: flex;
  align-items: center;
  width: 80%;
  margin: 0 auto;
  padding: .2rem 0;
}
.progress-wrapper .time {
  color: #fff;
  font-size: 12px;
  flex: 0 0 .6rem;
  line-height: .6rem;
  width: .6rem;
}
.time.time-l {
  text-align: left;
}
.time.time-r {
  text-align: right;
}
.progress-wrapper .progress-bar-wrapper {
  flex: 1;
}
.bottom .operators {
  display: flex;
  align-items: center;
}
.operators .icon {
  flex: 1;
  color: #ffcd32;
}
.icon.disable {
  color: rgba(255, 205, 49, 0.5);
}
.icon i {
  font-size: 30px;
}
.i-left {
  text-align: right;
}
.i-center {
  padding: 0 .4rem;
  text-align: center;
}
.i-center i {
  font-size: 40px;
}
.i-right {
  text-align: left;
}
.icon-favorite {
  color: #d93f30;
}
.player .mini-player {
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 1.2rem;
  z-index: 180;
  background: #333;
  display: flex;
  align-items: center;
}
.mini-player .icon {
  flex: 0 0 .8rem;
  width: .8rem;
  height: .8rem;
  padding: 0 .2rem 0 .4rem;
}
.mini-player .icon .imgWrapper {
  width: 100%;
  height: 100%;
}
.imgWrapper img {
  border-radius: 50%;
}
.imgWrapper .play {
  animation: rotate 10s linear infinite
}
.mini-player .text {
  display: flex;
  flex-direction: column;
  justify-content: center;
  flex: 1;
  line-height: .4rem;
  overflow: hidden;
}
.text .name {
  margin-bottom: .04rem;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  font-size: 14px;
  color: rgb(204, 204, 204);
}
.text .desc {
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  font-size: 12px;
  color: rgba(204, 204, 204, 0.3);
}
.mini-player .control {
  flex: 0 0 .6rem;
  width: .6rem;
  padding: 0 .2rem;
}
.icon-play-mini, .icon-pause-mini, .icon-playlist {
  font-size: 30px;
  color: rgba(255,205,49,0.5);
}
.control .icon-mini {
  font-size: 32px;
  position: absolute;
  left: 0;
  top: 0;
}
.normal-enter-active, .normal-leave-active {
  transition: all 0.4s;
}
.normal-enter-active .top, .normal-enter-active .bottom, .normal-leave-active .top, .normal-leave-active .bottom {
  transition: all 0.4s cubic-bezier(0.86, 0.18, 0.82, 1.32)
}
.normal-enter, .normal-leave-to {
  opacity: 0;
}
.normal-enter .top, .normal-leave-to .top {
  transform: translate3d(0, -2rem, 0);
}
.normal-enter .bottom, .normal-leave-to .bottom {
  transform: translate3d(0, 2rem, 0);
}
.mini-enter-active, .mini-leave-active {
  transition: all .4s;
}
.mini-enter, .mini-leave-to {
  opacity: 0;
}

@keyframes rotate {
  0% {transform: rotate(0);}
  100% {transform: rotate(360deg);}
}
</style>
