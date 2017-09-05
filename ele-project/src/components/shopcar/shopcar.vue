<template lang="html">
<div class="shopcars">
    <div class="shopcar" >
      <div class="content" @click="toggleList">
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
          <div class="content-right" @click.stop.prevent="pay">
            <div class="pay" :class="payclass">
              {{payDesc}}
            </div>
          </div>
      </div>
      <div class="ball-container">
        <div  v-for="ball in balls">
          <transition  name="drop"  @before-enter="beforeEnter"
          @enter="enter"
          @after-enter="afterEnter">
            <div  v-show="ball.show"  class="ball">
              <div class='inner inner-hook'></div>
            </div>
          </transition>
        </div>
      </div>
      <transition name="fade"> 
      <div class="shopcart-list" v-show='listshow'> 
          <div class="list-header"> 
            <h1 class="title">购物车</h1>
            <span class="empty" @click="empty">清空</span>
          </div>
          <div class="list-content" > 
            <ul> 
                <li class="food" v-for="food in selectFoods"> 
                    <span class="name">{{food.name}}</span>
                    <div class="price"> 
                        <span>￥{{food.price*food.count}}</span>
                    </div>
                    <div class="cartontrol-warpper"> 
                        <Cartcontrol :food="food" v-on:cartadd='shopcartadds'></Cartcontrol>
                    </div>
                </li>
            </ul>
          </div>
      </div>
      </transition>
    </div>
    <transition name="showRouter"> 
      <div class="list-mask" v-show="listshow" @click="hideList"> 
      </div>
    </transition>
</div>
</template>

<script>
import BScroll from 'better-scroll';
import Cartcontrol from '@/components/cartcontrol/cartcontrol'

export default {
  name: 'shopcar',
  components:{
    Cartcontrol
  },
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
      dropBall: [],
      fold:true
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
    },
    listshow(){
       if (!this.totalcount) {
          this.fold = true;
          return false;
        } 
        let show = !this.fold;
        if(show){
            this.$nextTick(()=>{
              if(!this.scroll){
                this.scroll = new BScroll('.list-content',{
                  click:true
                });
              }else{
                this.scroll.refresh();
              }
            })
        }
        return show;
    }
  },
  methods: {
    shopcartadds(el){
      this.drop(el);
    },
    drop(el) {
      // console.log(el);
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
    empty(){
      this.selectFoods.forEach((food)=>{
          food.count = 0;
      })
    },
    hideList(){
      this.fold = true;
    },
    toggleList(){
      if(!this.totalcount){
          return;
      }
      this.fold = !this.fold;
    },
    pay(){
      if(this.totalprice < this.minPrice){
        return;
      }
      window.alert(`支付${this.totalprice}`);
    },
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
          el.style.webkitTransform = `translate3d(0,${y}px,0)`;
          el.style.transform = `translate3d(0,${y}px,0)`;
          let inner = el.getElementsByClassName('inner-hook')[0];
          inner.style.webkitTransform = `translate3d(${x}px,0,0)`;
          inner.style.transform= `translate3d(${x}px,0,0)`;
        }
      }
    },
    enter(el,done) {
      /*触发浏览器重绘*/
      let rf = el.offsetHeight;
      this.$nextTick(() => {
        el.style.webkitTransform = 'translate3d(0,0,0)';
        el.style.transform = 'translate3d(0,0,0)';
        let inner = el.getElementsByClassName('inner-hook')[0];
        inner.style.webkitTransform = 'translate3d(0,0,0)';
        inner.style.transform = 'translate3d(0,0,0)';
        el.addEventListener('transitionend',done)
      })
    },
    afterEnter(el) {
      let ball = this.dropBall.shift();
      if (ball) {
        ball.show = false;
        el.style.display = "none";
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped >

.fade-enter-active {
  transition: all .3s ease-in-out;
}
.fade-leave-active {
  transition: all .3s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}
.fade-enter, .fade-leave-active {
  transform: translateY(100%);
  opacity: 0;
}
.showRouter-enter-active,
.showRouter-leave-active {
  /* 结束状态*/
  opacity: 1;
  transform: translateY(0);
}

.showRouter-enter,
.showRouter-leave-to
/* 初始状态*/
{

  opacity: 0;
  
}
.shopcars{
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
      .shopcart-list{
        position: absolute;
        top: 0px;
        left:0px;
        z-index: -1;
        width: 100%;
        transform: translateY(-100%);
        transition: all .8s ease;
        .list-header{
          height: 40px;
          line-height: 40px;
          padding: 0 18px;
          background: #f3f5f7;
          border-bottom: 1px solid rgba(7,17,27,0.1);
          .title{
            float: left;
            font-size: 14px;
            color: rgb(7,17,27);
          }
          .empty{
            float: right;
            font-size: 12px;
            color: rgb(0,160,220);
          }
        }
        .list-content{
           padding: 0 18px; 
           max-height: 217px;
           background: #fff;
           overflow: hidden;
           .food{
            position: relative;
            padding: 12px 0;
            box-sizing:border-box;
            border-bottom: 1px solid rgba(7,17,27,0.1);
            .name{
              line-height: 24px;
              font-size: 14px;
              color: rgb(7,17,27);
            }
            .price{
              position: absolute;
              bottom: 12px;
              right: 90px;
              line-height: 24px;
              font-size: 14px;
              font-weight: 700;
              color: rgb(240,20,20);
            }
            .cartontrol-warpper{
              position: absolute;
              right: 0px;
              bottom: 6px;

            }
           }
        }
      }
    }
    .list-mask{
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      z-index: 40;
      background: rgba(7,17,27,0.6);
      transition: all .3s ease;
    }
}
</style>
