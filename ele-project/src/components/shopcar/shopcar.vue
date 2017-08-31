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
    </div>
</template>

<script>


export default {
  name: 'shopcar',
  props: {
    selectFoods: {
      type: Array,
      default() {
        return [{
          price:1,
          count:1
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
    payDesc(){
      if(this.totalprice === 0){
        return `￥${deliveryPrice}元起送`;
      }else if(this.totalprice<this.minPrice){
        let diff = this.minPrice - this.totalprice;
        return `还差￥${diff}元起送`;
      }else{
        return '去结算';
      }
    },
    payclass(){
      if(this.totalprice>=this.minPrice){
        return 'enough'
      }else{
         return 'not-enough'
      }
    }
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
        &.not-enough{
          background: #2b333b;
        }
        &.enough{
          background: #00b43c;
          color: rgba(255, 255, 255,1);
        }
      }
    }
  }
}
</style>
