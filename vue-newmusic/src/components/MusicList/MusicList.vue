<template lang="html">
  <transition name="showRouter">
    <VScroll :data="musicData">
      <div class="music-list">
        <div v-for='(item,index) of musicData' class="music-item">
          <img :src="item.musicImgSrc" class="music-img"></img>
          <span class="music-name">{{ (index+1) + '.&nbsp; ' + item.name}}</span>
          <span class="del-icon"></span>
        </div>
      </div>
    </VScroll>
  </transition>
</template>

<script>
import VScroll from '@/base/scroll/scroll'
export default {
  name: 'musiclist',
  components: {
    VScroll
  },
  computed: {
    musicData () {
      return this.$store.state.musicData
    },
    DOM () {
      return this.$store.state.DOM
    },
    isPlaying () {
      return this.$store.state.isPlaying
    }
  },
  watch: {
    musicData: {
      hander (val, oldVal) {
        localStorage.musics = JSON.stringify(val)
      },
      deep: true
    }
  },
  data () {
    return {
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less">
.showRouter-enter-active {
  transition: all .4s ease;
}

.showRouter-leave-active {
  transition: all 0 ease;
}

.showRouter-enter,
.showRouter-leave-active {
  transform: translateX(-150px);
  opacity: 0;
}

.music-list {
  padding: 4px;
  flex: 8;
  .music-item+.music-item {
    border-top: 1px solid rgba(0, 0, 0, .1);
  }
  .music-item {
    padding: 4px 6px 0 6px;
    position: relative;
    margin-bottom: 4px;
    border-radius: 5px;
    cursor: pointer;
    ;
    border: none;
    .music-img {
      width: 50px;
      height: 50px;
      border-radius: 50%;
    }
    span.music-name {
      display: inline-block;
      width: 65%;
      vertical-align: top;
      margin-top: 15px;
      margin-left: 10px;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      cursor: pointer;
      padding-bottom: 20px;
    }

    span.del-icon {
      display: inline-block;
      position: absolute;
      right: 10px;
      top: 20px;
      width: 20px;
      height: 20px;
      background: url('./del.svg');
      background-size: contain;
      cursor: pointer;
    }
  }
  .tips {
    text-align: center;
    margin: 12px auto;
    width: 200px;
    font-size: 80%;
    color: gray;
  }
}
</style>
