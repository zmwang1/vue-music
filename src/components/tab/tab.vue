<template>
  <div class="tab">
    <router-link tag="div" to="/recommend"><span>推荐</span></router-link>
    <router-link tag="div" to="/singer"><span>歌手</span></router-link>
    <router-link tag="div" to="/rank"><span>排行</span></router-link>
    <router-link tag="div" to="/search"><span>搜索</span></router-link>
  </div>
</template>
<style scoped>
.tab {
  width: 100%;
  height: .88rem;
  display: flex;
  font-size: 14px;
  color: rgba(204, 204, 204, 0.5);
}
.tab div {
  flex: 1;
  text-align: center;
  height: 100%;
  line-height: .88rem;
}
.tab div span {
  padding-bottom: .1rem;
}
.tab .router-link-active span {
  color: rgb(204, 159, 20);
  border-bottom: 2px solid #ffcd32;
}
</style>