<template lang="html">
  <transition name="showRouter">
    <VScroll :data="musicData">
      <div class="music-list">
        <div v-for='(item,index) of musicData' class="music-item">
          <img :src="item.musicImgSrc" class="music-img"></img>
          <span class="music-name">{{ (index+1) + '.&nbsp; ' + item.name}}</span>
          <span class="del-icon">sdfsd </span>
        </div>
        fsdfgrg
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
<style scoped >

</style>
