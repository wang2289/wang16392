<template lang="html">
<transition name="fade">
    <div class="ratings">
      <div class="ratings-content"> 
        <div class="overview"> 
          <div class="overview-left"> 
            <h1 class='score'>{{seller.score}}</h1>
            <div class="title">综合评分</div>
            <div class="rank">高于周边商家{{seller.rankRate}}%</div>
          </div>
          <div class="overview-right"> 
              <div class="score-wrapper"> 
                <span class="title">服务态度</span>
                <star :size="36" :score="seller.serviceScore"></star>
                <span class="score">{{seller.serviceScore}}</span>
              </div> 
               <div class="score-wrapper"> 
                <span class="title">商品评分</span>
                <star :size="36" :score="seller.foodScore"></star>
                <span class="score">{{seller.foodScore}}</span>
              </div> 
              <div class="delivery-wrapper">
                <span class="title">送达时间</span>
                <span class="delivery">{{seller.deliveryTime}}</span>
              </div>   
          </div>          
        </div>
        <Split></Split>
        <rating-select  v-on:ratingselect='ratingselects' v-on:contenttoggle='contenttoggles' :select-type='selectType' :only-content='onlyContent'  :ratings='ratings'></rating-select>
        <div class='rating-wrapper'>
          <ul>
            <li v-show="needShow(rating.rateType,rating.text)" v-for='rating in ratings' class="item">
                <div class="avatar"> 
                  <img width='28' height="28" :src="rating.avatar">
                </div>
                <div class="content">
                  <h1 class="name">{{rating.username}}</h1>
                  <div class="star-wrapper">
                    <star :size="24" :score="rating.score"></star>
                    <span  class="delivery" v-show="rating.deliveryTime">{{rating.deliveryTime}}</span>
                  </div>
                  <p class="text">{{rating.text}}</p>
                  <div class="recommend" v-show="rating.recommend && rating.recommend.length"> 
                     <span class="icon-arrow_lif
                     t"></span>
                     <span class="item" v-for="item in rating.recommend">{{item}}</span>
                  </div>
                  <div class="time">
                    {{rating.rateTime | formatDate}}
                  </div>
                </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
    </transition>
</template>

<script>
import BScroll from 'better-scroll';
import Star from '@/components/star/star.vue'
import Split from '@/components/split/split'
import RatingSelect from '@/components/ratingselect/ratingselect'

const positive = 0;
const negative = 1;
const all = 2;
export default {
  name: 'ratings',
  components: {
    Star,
    Split,
    RatingSelect
  },
  data() {
    return {
      ratings: [],
      selectType: all,
      onlyContent: true
    }
  },
  props: {
    seller: {
      type: Object
    }
  },
  methods:{
    needShow(type,text){
      // console.log(type,text);
      if(this.onlyContent && !text){
          return false;
      }
      if(this.selectType === all){
        return true;
      }else{
        return type === this.selectType;
      }
    },
     ratingselects: function (type) {
      this.selectType = type;
      this.$nextTick(()=>{
          this.scroll.refresh();
      })
    },
    contenttoggles: function (target) {
      //  console.log(target);
      this.onlyContent = target;
      this.$nextTick(()=>{
          this.scroll.refresh();
      })
    }
  },
  created() {
    this.axios.get('/api/ratings').then(res => {
      res = res.data;
      this.ratings = res.data;
      this.$nextTick(() => {
        this.scroll = new BScroll('.ratings', {
          click: true
        });
      })
    });
  },
  filters: {
    formatDate(time) {
      let date = new Date(time);
      let fmt = 'yyyy-MM-dd hh:mm';
      if (/(y+)/.test(fmt)) {
        fmt = fmt.replace(RegExp.$1, (date.getFullYear() + " ").substr(4 - RegExp.$1.length));
      }
      let o = {
        'M+': date.getMonth() + 1,
        'd+': date.getDate(),
        'h+': date.getHours(),
        'm+': date.getMinutes(),
        's+': date.getSeconds()
      };
      for (let k in o) {
        if (new RegExp(`(${k})`).test(fmt)) {
          let str = o[k] + '';
          fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : (('00' + str).substr(str.length)))
        }
      }
      return fmt;
    }
  }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style  lang="less" scoped >
.fade-enter-active {
  transition: all .3s ease-in-out;
}
// .fade-leave-active {
//   transition: all .3s cubic-bezier(1.0, 0.5, 0.8, 1.0);
// }
.fade-enter {
  transform: translateX(150px);
 opacity: 0;
}
.ratings {
  position: absolute;
  top: 174px;
  bottom: 0;
  left: 0;
  width: 100%;
  overflow: hidden;
  .overview {
    display: flex;
    padding: 18px 0;
    .overview-left {
      flex: 0 0 137px;
      width: 137px;
      border-right: 1px solid rgba(7, 17, 27, 0.1);
      text-align: center;
      @media only screen and (max-width: 320px) {
        flex: 0 0 120px;
        width: 120px;
      }
      .score {
        margin-bottom: 6px;
        line-height: 28px;
        font-size: 24px;
        color: rgb(255, 153, 0);
      }
      .title {
        margin-bottom: 8px;
        line-height: 12px;
        font-size: 12px;
        color: rgb(7, 17, 27);
      }
      .rank {
        padding-bottom: 6px;
        line-height: 10px;
        font-size: 10px;
        color: rgb(147, 153, 159)
      }
    }
    .overview-right {
      flex: 1;
      padding: 6px 0 6px 12px;
      @media only screen and (max-width: 320px) {
        padding-left:6px;
      }
      .score-wrapper {
        margin-bottom: 8px;
        font-size: 0;
        .title {
          display: inline-block;
          font-size: 12px;
          color: rgb(7, 17, 27);
          line-height: 18px;
        }
        .star {
          display: inline-block;
          margin: 0 12px;
          vertical-align: top;
        }
        .score {
          display: inline-block;
          line-height: 18px;
          vertical-align: top;
          font-size: 12px;
          color: rgb(255, 253, 0);
        }
      }
      .delivery-wrapper {
        font-size: 0;
        .title {
          // display: inline-block;
          font-size: 12px;
          color: rgb(7, 17, 27);
          line-height: 18px;
        }
        .delivery {
          font-size: 12px;
          color: rgb(147, 153, 159);
          margin-left: 12px;
          line-height: 12px;
          font-size: 10px;
          color: rgb(147, 153, 159);
        }
      }
    }
  }
  .rating-wrapper {
    padding: 0 18px;
    .item {
      display: flex;
      padding: 18px 0;
      border-bottom: 1px solid rgba(7, 17, 27, 0.1);
      .avatar {
        flex: 0 0 28px;
        width: 28px;
        margin-right: 12px;
        img {
          border-radius: 50%;
        }
      }
      .content {
        flex: 1;
        position: relative;
        .name {
          margin-bottom: 4px;
          line-height: 12px;
          font-size: 10px;
          color: rgb(7, 17, 27);
        }
        .star-wrapper {
          margin-bottom: 6px;
          font-size: 0px;
          .star {
            display: inline-block;
            vertical-align: top;
            margin-right: 6px;
          }
          .deliver {
            display: inline-block;
            vertical-align: top;
          }
        }
        .text {
          line-height: 18px;
          color: rgb(7, 17, 27);
          font-size: 12px;
          margin-bottom: 8px;
        }
        .recommend {
          line-height: 16px;
          font-size: 0px;
          .icon-arrow_lift {
            display: inline-block;
            margin: 0 8px 4px 0;
            font-size: 9px;
            color: rgb(0, 160, 220)
          }
          .item {
            display: inline-block;
            margin: 0 8px 4px 0;
            font-size: 9px;
            padding: 0 6px;
            border: 1px solid rgba(7, 17, 27, 0.1);
            border-radius: 1px;
            color: rgb(147, 153, 159);
            background: #fff;
          }
        }
        .time {
          position: absolute;
          top: 0;
          right: 0;
          line-height: 12px;
          font-size: 10px;
          color: rgb(147, 153, 159);
        }
      }
    }
  }
}
</style>
