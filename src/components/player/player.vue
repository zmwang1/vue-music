<template>
  <div class="player" v-show="playlist.length > 0">
    <div class="normal-player" v-show="fullScreen">
      <div class="background">
        <img width="100%" height="100%">
      </div>
      <div class="top">
        <div class="back">
          <i class="icon-back"></i>
        </div>
        <h1 class="title"></h1>
        <h2 class="subtitle"></h2>
      </div>
      <div class="middle">
        <div class="middle-l">
          <div class="cd-wrapper">
            <div class="cd">
              <img class="image">
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
          <div class="icon i-left"></div>
          <div class="icon i-left"></div>
          <div class="icon i-center"></div>
          <div class="icon i-right"></div>
          <div class="icon i-right"></div>
        </div>
      </div>
    </div>
    <div class="mini-player" v-show="!fullScreen">
      <div class="icon">
        <div class="imgWrapper">
          <img width="40" height="40">
        </div>
      </div>
      <div class="text"></div>
      <div class="control"></div>
      <div class="control"></div>
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters([
      'playlist',
      'fullScreen'
    ])
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
  bottom: 50px;
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
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.5);
}
.dot.active {
  width: 20px;
  border-radius: 5px;
  background: rgba(255, 255, 255, 0.8);
}
.bottom .progress-wrapper {
  display: flex;
  align-items: center;
  width: 80%;
  margin: 0px auto;
  padding: 10px 0;
}
.progress-wrapper .time {
  color: #fff;
  font-size: 12px;
  flex: 0 0 30px;
  line-height: 30px;
  width: 30px;
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
}
/* color: $color-theme-d;
  i
    font-size: 30px;
.i-left
  text-align: right;
.i-center
  padding: 0 20px;
  text-align: center;
  i
    font-size: 40px;
.i-right
  text-align: left;
.icon-favorite
  color: $color-sub-theme; */
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
.mini-player .text {
  display: flex;
  flex-direction: column;
  justify-content: center;
  flex: 1;
  line-height: .4rem;
  overflow: hidden;
}
.mini-player .control {
  flex: 0 0 .6rem;
  width: .6rem;
  padding: 0 .2rem;
}
</style>
