<template>
  <div class="song-list">
    <ul>
      <li class="item" v-for="(song, i) of songs" :key="i">
        <div class="content">
          <h2 class="name">{{song.name}}</h2>
          <p class="desc">{{getDesc(song)}}</p>
        </div>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  props: {
    songs: {
      type: Array,
      default: () => {
        return []
      }
    }
  },
  methods: {
    getDesc (song) {
      return `${song.singer}·${song.album}`
    }
  }
}
</script>
<style scoped>
.item {
  height: 1.28rem;
  display: flex;
  align-items: center;
  box-sizing: border-box;
  font-size: 14px;
}
.item .content {
  flex: 1;
  line-height: .4rem;
  overflow: hidden;
}
.content .name {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  color: #fff;
}
.content .desc {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  color: rgba(255,255,255,0.3);
  margin-top: .08rem;
}
</style>
