<template>
  <div class="recommend">
    <scroll ref="scroll" class="recommend-content" :data="distList">
      <div>
        <div v-if="recommends.length" class="slider-wrapper">
          <div class="slider-content">
            <slider>
              <div v-for="item of recommends" :key="item.id">
                <a :href="item.linkUrl">
                  <img @load="loadImage" :src="item.picUrl">
                </a>
              </div>
            </slider>
          </div>
        </div>
        <div class="recommend-list">
          <h1 class="list-title">热门歌单推荐</h1>
          <ul>
            <li v-for="item of distList" :key="item.dissid" class="item">
              <div class="icon">
                <img width="60" height="60" v-lazy="item.imgurl">
              </div>
              <div class="text">
                <h2 class="name">{{item.creator.name}}</h2>
                <p class="desc">{{item.dissname}}</p>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <div class="loading-container" v-show="!distList.length">
        <loading></loading>
      </div>
    </scroll>
  </div>
</template>
<script>
import { getRecommend, getDiscList } from 'api/recommend'
import Slider from 'base/slider/slider'
import Scroll from 'base/scroll/scroll'
import Loading from 'base/loading/loading'
import { ERR_OK } from 'api/config'
export default {
  data () {
    return {
      recommends: [{
        linkUrl: 'http://y.qq.com/w/album.html?albummid=000noDOiltPulN',
        picUrl: 'http://y.gtimg.cn/music/photo_new/T003R720x288M000001uyBZe2TmW4K.jpg',
        id: 9735
      },
      {
        linkUrl: 'http://y.qq.com/w/album.html?albummid=000noDOiltPulN',
        picUrl: 'http://y.gtimg.cn/music/photo_new/T003R720x288M000002QYALd2wezSX.jpg',
        id: 9689
      }],
      distList: [],
      checkloaded: false
    }
  },
  mounted () {
    this._getRecommend()
    this._getDistList()
  },
  components: {
    Slider,
    Scroll,
    Loading
  },
  methods: {
    _getRecommend () {
      getRecommend().then((res) => {
        if (res.code === ERR_OK) {
          this.recommends = res.data
        }
      })
    },
    _getDistList () {
      getDiscList().then((res) => {
        this.distList = res.data.list
      })
    },
    loadImage () {
      if (!this.checkloaded) {
        setTimeout(() => {
          this.$refs['scroll'].refresh()
        }, 20)
        this.checkloaded = true
      }
    }
  }
}
</script>
<style scoped>
.recommend {
  width: 100%;
  position: fixed;
  top: 1.76rem;
  bottom: 0;
}
.recommend-content {
  height: 100%;
  overflow: hidden;
}
.slider-wrapper {
  position: relative;
  width: 100%;
  height: 0;
  padding-top: 40%;
  overflow: hidden;
}
.slider-content {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
.recommend-list .list-title {
  height: 1.3rem;
  line-height: 1.3rem;
  text-align: center;
  color: rgb(204, 159, 20);
  font-size: 14px;
}
.recommend-list .item {
  display: flex;
  padding: 0 .4rem .4rem .4rem;
  box-sizing: border-box;
  align-items: center;
}
.item .icon {
  width: 1.2rem;
  padding-right: .4rem;
}
.item .icon img {
  width: 100%;
  display: block;
}
.item .text {
  flex-direction: column;
  justify-content: center;
  display: flex;
  flex: 1;
  line-height: .4rem;
  overflow: hidden;
  font-size: 14px;
}
.text .name {
  margin-bottom: .2rem;
  color: #fff;
}
.text .desc {
  color: rgba(255,255,255,0.3);
}
.loading-container {
  position: absolute;
  width: 100%;
  top: 50%;
  transform: translateY(-50%);
}
</style>
