<template>
  <div id="app">
    <!-- 主界面部分 -->
    <transition name="show">
      <div class="index">
        <!-- 头部 -->
        <v-header :seller="seller"></v-header>
        <div class="tab">
          <div class="item">
            <router-link to="/goods">商品</router-link>
          </div>
          <div class="item">
            <router-link to="/ratings">评论</router-link>
          </div>
          <div class="item">
            <router-link to="/seller">商家</router-link>
          </div>
        </div>
        <!-- router控制的Tab页内容 -->
        <router-view></router-view>
        <!-- 尾部mini播放器 -->
      </div>
    </transition>
    <!-- 播放界面 -->
    <transition name="showIndex">
    </transition>

    <!-- 隐藏的audio标签 -->
    <audio></audio>
  </div>
</template>

<script>
import VHeader from './components/Header/Header.vue'


export default {
  name: 'app',
  components: {
    VHeader
  },
  data() {
    return {
      seller:{},
    }
  },
  created(){
    this.axios.get('/api/seller').then(res =>{
        console.log(res);
        res=res.data;
        this.seller = res.data;
        console.log(this.seller);
    });
  }
}
</script>


<style lang="less">
@import "./common/style/base.less";
.showIndex-enter-active {
  transition: all .4s ease-out;
}

.showIndex-leave-active {
  transition: all 0 ease;
}

.showIndex-enter,
.showIndex-leave-active {
  transform: translateY(350px);
  opacity: 0;
}

.show-enter-active {
  transition: all .4s ease;
}

.show-leave-active {
  transition: all 0 ease-out;
}

.show-enter,
.show-leave-active {
  transform: translateX(-350px);
  opacity: 0;
}

.down-enter-active {
  transition: all .2s ease-in-out;
}

.down-leave-active {
  transition: all .4s ease-in-out;
}

.down-enter,
.down-leave-active {
  transform: translateY(-250px);
  opacity: 0;
}

#app,
.index {
  position: relative;
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  font-family: 'Microsoft Yahei';
  div.search-page {
    position: absolute;
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
    z-index: 1;

    .search-input {
      position: relative;
      flex: 1.1;
      width: 100%;
      background-color: white;
      border: none;
      input {
        width: 90%;
        height: 100%;
        padding: 0 55px 0 30px;
        outline: none;
        border: none;
        font-size: 1.2rem;
      }
      i.icon-search {
        position: absolute;
        top: 9px;
        right: 55px;
        display: inline-block;
        width: 25px;
        height: 25px;
        background: url('./assets/search.svg') no-repeat;
        background-size: contain;
      }
      span {
        display: inline-block;
        position: absolute;
        right: 10px;
        top: 10px;
        width: 23px;
        height: 23px;
        background: url('./assets/close.svg') no-repeat;
        background-size: contain;
      }
    }
    .mask {
      flex: 15;
    }
  }
  .tab {
      display: flex;
      border-bottom: 1px solid rgba(7,17,27,0.1);
      a {
        display: block;
        text-decoration: none;
        width: 100%;
        color: #000;
        font-size: 16px;
        color: rgb(77,85,93)
      }
      a::after {
        background-color: rgba(255, 255, 255, .2);
        height: 1px;
        bottom: -2px;
      }
      a.active{
        color: rgb(240,20,20)
      }
      a:hover{
         color: rgb(240,20,20)   
      }
      .item {
        display: inline-block;
        flex: 1;
        text-align: center;
        padding-top: 10px;
        padding-bottom: 10px;
      }
    }
}

</style>
