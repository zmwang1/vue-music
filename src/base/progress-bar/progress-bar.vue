<template>
  <div class="progress-bar" ref="progressBar" @click="progressClick">
    <div class="bar-inner">
      <div class="progress" ref="progress"></div>
      <div class="progress-btn-wrapper" ref="progressBtn"
        @touchstart.prevent="progressTouchStart"
        @touchmove.prevent="progressTouchMove"
        @touchend="progressTouchEnd"
      >
        <div class="progress-btn"></div>
      </div>
    </div>
  </div>
</template>
<script>
import { prefixStyle } from 'common/js/dom'

const transform = prefixStyle('transform')
const progressBtnWidth = 16

export default {
  props: {
    percent: {
      type: Number,
      default: 0
    }
  },
  created () {
    this.touch = {}
  },
  watch: {
    percent (newPercent) {
      if (newPercent > 0 && !this.touch.initiated) {
        let barWidth = this.$refs.progressBar.clientWidth - progressBtnWidth
        let offsetWidth = barWidth * newPercent
        this._offset(offsetWidth)
      }
    }
  },
  methods: {
    progressTouchStart (e) {
      this.touch.initiated = true
      this.touch.startX = e.touches[0].pageX
      this.touch.left = this.$refs.progress.clientWidth
    },
    progressTouchMove (e) {
      if (!this.touch.initiated) {
        return false
      }
      let deltaX = e.touches[0].pageX - this.touch.startX
      let offsetWidth = Math.min(Math.max(0, deltaX + this.touch.left), this.$refs.progressBar.clientWidth - progressBtnWidth)
      this._offset(offsetWidth)
    },
    progressTouchEnd () {
      this.touch.initiated = false
      this._triggerPercent()
    },
    progressClick (e) {
      const rect = this.$refs.progressBar.getBoundingClientRect()
      const offsetWidth = e.pageX - rect.left
      // 这里当我们点击 progressBtn 的时候，e.offsetX 获取不对
      // this._offset(e.offsetX)
      this._offset(offsetWidth)
      this._triggerPercent()
    },
    _triggerPercent () {
      this.$emit('percentChange', this._getPercent())
    },
    _offset (offsetWidth) {
      this.$refs.progress.style.width = `${offsetWidth}px`
      this.$refs.progressBtn.style[transform] = `translate3d(${offsetWidth}px, 0, 0)`
    },
    _getPercent () {
      let barWidth = this.$refs.progressBar.clientWidth - progressBtnWidth
      return this.$refs.progress.clientWidth / barWidth
    }
  }
}
</script>
<style scoped>
.progress-bar {
  height: .6rem;
}
.bar-inner {
  position: relative;
  top: .26rem;
  height: .08rem;
  background: rgba(0, 0, 0, 0.3);
}
.progress {
  position: absolute;
  height: 100%;
  background: #ffcd32;
}
.progress-btn-wrapper {
  position: absolute;
  left: -0.16rem;
  top: -0.26rem;
  width: .6rem;
  height: .6rem;
}
.progress-btn {
  position: relative;
  top: .14rem;
  left: .14rem;
  box-sizing: border-box;
  width: .32rem;
  height: .32rem;
  border: 3px solid #fff;
  border-radius: 50%;
  background: #ffcd32;
}
</style>
