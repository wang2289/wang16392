<template lang="html">
    <div class="shopcar" >
      <div class="content">
          <div class="content-left">
              <div class="log-wrapper"> 
                <div class="log" :class="{'highlight':totalcount>0}">
                  <span class="icon-close"  :class="{'highlight':totalcount>0}"></span>
                </div>
                <div class="num" v-show="totalcount>0">{{totalcount}}</div>
              </div>
              <div class="price"  :class="{'highlight':totalprice>0}">￥{{totalprice}}</div>
              <div class="desc">另需配送费￥{{deliveryPrice}}元</div>
          </div>
          <div class="content-right" >
            <div class="pay" :class="payclass">
              {{payDesc}}
            </div>
          </div>
      </div>
      <div class="ball-container">
        <!--<transition-group name="list" tag="p">
          <span v-for="item in balls" v-bind:key="item.show" class="list-item">
            {{item.show}}
          </span>
        </transition-group>-->
        <transition-group v-on:before-enter="beforeEnter"
  v-on:enter="enter"
  v-on:after-enter="afterEnter" tag="div">
        <div v-for="ball in balls" v-show="ball.show"  v-bind:key="ball.show" class="ball">
          <div class='inner inner-hook'></div>
        </div>
        </transition-group>
      </div>
    </div>
</template>

<script>


export default {
  name: 'shopcar',
  data() {
    return {
      balls: [{
        show: false
      }, {
        show: false
      }, {
        show: false
      }, {
        show: false
      }, {
        show: false
      }],
      dropBall: []
    }
  },
  props: {
    selectFoods: {
      type: Array,
      default() {
        return [{
          price: 1,
          count: 1
        }];
      }
    },
    deliveryPrice: {
      type: Number,
      default: 0
    },
    minPrice: {
      type: Number,
      default: 0
    }
  },
  computed: {
    totalprice() {
      let total = 0;
      this.selectFoods.forEach((food) => {
        total += food.price * food.count;
      });
      return total;
    },
    totalcount() {
      let count = 0;
      this.selectFoods.forEach((food) => {
        count += food.count;
      });
      return count;
    },
    payDesc() {
      if (this.totalprice === 0) {
        return `￥${this.minPrice}元起送`;
      } else if (this.totalprice < this.minPrice) {
        let diff = this.minPrice - this.totalprice;
        return `还差￥${diff}元起送`;
      } else {
        return '去结算';
      }
    },
    payclass() {
      if (this.totalprice >= this.minPrice) {
        return 'enough'
      } else {
        return 'not-enough'
      }
    }
  },
  methods: {
    drop(el) {
      console.log(el);
      for (let i = 0; i < this.balls.length; i++) {
        let ball = this.balls[i];
        if (!ball.show) {
          ball.show = true;
          ball.el = el;
          this.dropBall.push(ball);
          
          return;
        }
      } 
    },
    // transition: {
    //   drop: {
        beforeEnter(el) {
          let count = this.balls.length;
          while (count--) {
            let ball = this.balls[count];
            if (ball.show) {
              let rect = ball.el.getBoundingClientRect();
              //点击的球相对于视口的x,y的值
              let x = rect.left - 32;
              let y = -(window.innerHeight - rect.top - 22);
              el.style.display = "";
              el.style.webkitTransfrom = `translate3d(0,${y}px,0)`;
              el.style.transfrom = `translate3d(0,${y}px,0)`;
              // console.log(el)
              let inner = el.getElementsByClassName('inner-hook')[0];
              inner.style.webkitTransfrom = `translate3d(${x}px,0,0)`;
              inner.style.transfrom = `translate3d(${x}px,0,0)`;
            }
          }
        },
        enter(el) {
          /*触发浏览器重绘*/
          let rf = el.offsetHeight;
          this.$nextTick(() => {
            el.style.webkitTransfrom = 'translate3d(0,0,0)';
            el.style.transfrom = 'translate3d(0,0,0)';
            let inner = el.getElementsByClassName('inner-hook')[0];
            inner.style.webkitTransfrom = 'translate3d(0,0,0)';
            inner.style.transfrom = 'translate3d(0,0,0)';
          })
        },
        afterEnter(el) {
          // console.log(this.dropBall[0]);
          let ball = this.dropBall[0];
          if (ball) {
            ball.show = false;
            el.style.display = "none";
          }
        }
    //   }
    // }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped >
.shopcar {
  position: fixed;
  left: 0px;
  bottom: 0px;
  z-index: 50;
  width: 100%;
  height: 48px;
  .content {
    display: flex;
    background: #141d27;
    .content-left {
      flex: 1; //需要自适应
      .log-wrapper {
        display: inline-block;
        position: relative;
        top: -10px;
        margin: 0 12px;
        padding: 6px;
        width: 56px;
        height: 56px;
        box-sizing: border-box;
        vertical-align: top;
        border-radius: 50%;
        background: #141d27;
        .log {
          width: 100%;
          height: 100%;
          border-radius: 50%;
          background: #2b343c;
          text-align: center;
          &.highlight {
            background: rgb(0, 160, 220);
          }
          span {
            line-height: 44px;
            font-size: 24px;
            color: #80858a;
            &.highlight {
              color: #fff;
            }
          }
        }
        .num {
          position: absolute;
          top: 0px;
          right: 0px;
          width: 24px;
          height: 16px;
          line-height: 16px;
          text-align: center;
          color: #fff;
          border-radius: 16px;
          font-size: 9px;
          font-weight: 700;
          box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.4);
          background: rgb(240, 20, 20);
        }
      }
      .price {
        display: inline-block;
        font-size: 16px;
        vertical-align: top;
        line-height: 24px;
        margin-top: 12px;
        padding-right: 12px;
        box-sizing: border-box;
        border-right: 1px solid rgba(255, 255, 255, 0.1);
        font-weight: 700;
        color: rgba(255, 255, 255, 0.4);
        &.highlight {
          color: rgba(255, 255, 255, 1);
        }
      }
      .desc {
        display: inline-block;
        vertical-align: top;
        line-height: 24px;
        margin: 12px 0 0 12px;
        font-size: 10px;
        color: rgba(255, 255, 255, 0.4);
      }
    }
    .content-right {
      flex: 0 0 105px; //固定宽度
      .pay {
        height: 48px;
        line-height: 48px;
        text-align: center;
        font-size: 12px;
        font-weight: 700;
        background: #2b333b;
        color: rgba(255, 255, 255, 0.4);
        &.not-enough {
          background: #2b333b;
        }
        &.enough {
          background: #00b43c;
          color: rgba(255, 255, 255, 1);
        }
      }
    }
  }
  .ball-container {
    .ball {
      position: fixed;
      left: 32px;
      bottom: 22px;
      z-index: 200;
      &.v-enter {
        transition: all 0.4s cubic-bezier(0.49, -0.29, 0.75, 0.41);
        .inner {
          width: 16px;
          height: 16px;
          border-radius: 50%;
          background: rgb(0, 160, 220);
          transition: all 0.4s linear;
        }
      }
    }
  }
}
</style>
