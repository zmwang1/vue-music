<template>
  <div class="m-header">
    <div class="icon"></div>
    <h1 class="title">Chicken Music</h1>
    <div class="people"><i class="icon-mine"></i></div>
  </div>
</template>
<script>
export default {}
</script>
<style scoped>
  .m-header {
    width: 100%;
    height: .88rem;
    color: #ffcd32;
    position: relative;
    background: #222;
    text-align: center;
  }
  .icon {
    width: .6rem;
    height: .64rem;
    background-image: url('../../common/image/logo.png');
    background-size: 100% 100%;
    display: inline-block;
    margin-top: .12rem;
  }
  .title {
    height: .88rem;
    line-height: .88rem;
    font-size: 18px;
    display: inline-block;
    vertical-align: top;
  }
  .people {
    width: .4rem;
    position: absolute;
    top: .26rem;
    right: .12rem;
  }
  .people i {
    font-size: 20px;
  }
</style>
