<template lang="html">
    <div class="cartcontrol" >
      <transition name="fade">
      <div class="cart-decrease " v-show="food.count>0" @click='decreaseCart'>
        <span class="inner icon-shopping_cart"></span>
      </div>
      </transition>
      <div class="cart-count" v-show="food.count>0">{{food.count}}</div>
      <div class="cart-add icon-thumb_down" @click='addCart'></div>
    </div>
</template>
<script>
import Vue from 'vue';
export default {
  name: 'cartcontrol',
  props: {
    food: {
      type: Object
    }
  },
  created() {

  },
  methods: {
    addCart(event) {
      if (!this.food.count) {
        Vue.set(this.food, 'count', 1)
      } else {
        this.food.count++;
      }
      // console.log(event.toElement);
      this.$emit("cartadd",event.toElement);
    },
    decreaseCart() {
      if (this.food.count) {
        this.food.count--;
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped >
.fade-enter-active,
.fade-leave-active {
  /* 结束状态*/
  transition: opacity .5s;
  transform: translate3d(0, 0, 0);
  .inner {
    transform: rotate(0deg)
  }
}

.fade-enter,
.fade-leave-to
/* 初始状态*/
{
  opacity: 0;
  transform: translate3d(24px, 0, 0);
  .inner {
    transform: rotate(180deg)
  }
}

.cartcontrol {
  font-size: 0px;
  .cart-decrease {
    display: inline-block;
    padding: 6px;
    line-height: 20px;
    font-size: 20px;
    color: rgb(0, 160, 220);
    transition: all 0.4s linear;
    .inner {
      display: inline-block;
      line-height: 24px;
      font-size: 20px;
      color: rgb(0, 160, 220);
      transition: all 0.4s linear;
    }
  }
  .cart-count {
    display: inline-block;
    padding: 6px 0px 6px 0px;
    line-height: 24px;
    font-size: 24px;
    color: rgb(0, 160, 220);
    vertical-align: top;
    width: 12px;
    padding-top: 6px;
    line-height: 24px;
    text-align: center;
    font-size: 10px;
    color: rgb(147, 153, 159);
  }
  .cart-add {
    display: inline-block;
    padding: 6px;
    line-height: 24px;
    font-size: 20px;
    color: rgb(0, 160, 220)
  }
}
</style>
