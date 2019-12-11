<template>
  <scroll class="listview" :data="data" ref="listview" :listenScroll="listenScroll" @scroll="scroll" :probeType="probeType">
    <ul>
      <li v-for="(group, i) of data" :key="i" class="list-group" ref="listGroup">
        <h2 class="list-group-title">{{group.title}}</h2>
        <ul>
          <li @click="selectItem(item)" v-for="item of group.items" :key="item.id" class="list-group-item">
            <img class="avatar" v-lazy="item.avatar">
            <span class="name">{{item.name}}</span>
          </li>
        </ul>
      </li>
    </ul>
    <div class="list-shortcut" @touchstart.stop.prevent="onShortcutTouchStart" @touchmove.stop.prevent="onShortcutTouchMove">
      <ul>
        <li class="item" :class="{'current': currentIndex === index}" v-for="(item, index) of shortcutList" :key="index" :data-index="index">{{item}}</li>
      </ul>
    </div>
    <div class="list-fixed" v-show="fixedTitle" ref="fixed">
      <div class="fixed-title">{{fixedTitle}}</div>
    </div>
  </scroll>
</template>
<script>
import Scroll from 'base/scroll/scroll'
import { getData } from 'common/js/dom'

const ANCHOR_HEIGHT = 18
const TITLE_HEIGHT = 30

export default {
  data () {
    return {
      listenScroll: true,
      probeType: 3,
      scrollY: -1,
      currentIndex: 0,
      listHeight: [],
      diff: -1
    }
  },
  created () {
    this.touch = {}
  },
  props: {
    data: {
      type: Array,
      default: () => {
        return []
      }
    }
  },
  computed: {
    shortcutList () {
      return this.data.map((item) => {
        return item.title.substr(0, 1)
      })
    },
    fixedTitle () {
      if (this.scrollY > 0) {
        return ''
      }
      return this.data[this.currentIndex] ? this.data[this.currentIndex].title : ''
    }
  },
  watch: {
    data () {
      setTimeout(() => {
        this._calculateHeight()
      }, 20)
    },
    scrollY (newY) {
      if (newY > 0) {
        this.currentIndex = 0
        return
      }
      let list = this.listHeight
      for (let i = 0, iLen = list.length - 1; i < iLen; i++) {
        let height1 = list[i]
        let height2 = list[i + 1]
        if (-newY >= height1 && -newY < height2) {
          this.currentIndex = i
          this.diff = height2 + newY
          return
        }
      }
      this.currentIndex = list.length - 2
    },
    diff (newVal) {
      let fixedTop = newVal < TITLE_HEIGHT ? newVal - TITLE_HEIGHT : 0
      if (this.fixedTop === fixedTop) {
        return
      }
      this.fixedTop = fixedTop
      this.$refs.fixed.style.transform = `translate3d(0, ${fixedTop}px, 0)`
    }
  },
  components: {
    Scroll
  },
  methods: {
    selectItem (item) {
      this.$emit('select', item)
    },
    onShortcutTouchStart (e) {
      let anchorIndex = getData(e.target, 'index')
      let firstTouch = e.touches[0]
      this.touch.y1 = firstTouch.pageY
      this.touch.anchorIndex = anchorIndex
      this._scrollTo(anchorIndex)
    },
    onShortcutTouchMove (e) {
      let firstTouch = e.touches[0]
      this.touch.y2 = firstTouch.pageY
      let delta = (this.touch.y2 - this.touch.y1) / ANCHOR_HEIGHT | 0
      let anchorIndex = parseInt(this.touch.anchorIndex) + delta
      this._scrollTo(anchorIndex)
    },
    scroll (pos) {
      this.scrollY = pos.y
    },
    _scrollTo (index) {
      if (!index && index !== 0) {
        return
      }
      if (index < 0) {
        index = 0
      } else if (index > this.listHeight.length - 2) {
        index = this.listHeight.length - 2
      }
      this.$refs['listview'].scrollToElement(this.$refs.listGroup[index], 0)
      this.scrollY = this.$refs.listview.scroll.y
    },
    _calculateHeight () {
      this.listHeight = []
      let list = this.$refs.listGroup
      let height = 0
      this.listHeight.push(height)
      for (let i = 0, iLen = list.length; i < iLen; i++) {
        let item = list[i]
        height += item.clientHeight
        this.listHeight.push(height)
      }
    }
  }
}
</script>
<style scoped>
.listview {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
  background: #222;
}
.list-group {
  padding-bottom: .6rem;
}
.list-group-title {
  height: .6rem;
  line-height: .6rem;
  padding-left: .4rem;
  font-size: 12px;
  color: rgba(255, 255, 255, 0.5);
  background: #333;
}
.list-group-item {
  display: flex;
  align-items: center;
  padding: .4rem 0 0 .6rem;
}
.avatar {
  width: 1rem;
  height: 1rem;
  border-radius: 50%;
}
.name {
  margin-left: .4rem;
  font-size: 14px;
  color: rgba(255, 255, 255, 0.5);
}
.list-shortcut {
  width: .4rem;
  padding: .4rem 0;
  position: absolute;
  top: 50%;
  right: 0;
  transform: translateY(-50%);
  z-index: 30;
  border-radius: .2rem;
  text-align: center;
  background: rgba(0, 0, 0, 0.3);
}
.list-shortcut .item {
  line-height: 1;
  font-size: 12px;
  padding: .06rem;
  color: rgba(255, 255, 255, 0.5);
}
.item.current {
  color: #ffcd32;
}
.list-fixed {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
}
.list-fixed .fixed-title {
  height: .6rem;
  line-height: .6rem;
  padding-left: .4rem;
  color: rgba(255, 255, 255, 0.5);
  font-size: 12px;
  background: #333;
}
</style>
