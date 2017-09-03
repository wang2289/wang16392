<template lang="html">
      <div class="food" v-show='showFlag' >
          <div class="food-content"> 
              <div class="image-header"> 
                  <img :src="food.image">
                  <div  class="back" @click='hide'>
                  <i class="icon-add_circle"></i>
                  </div>
              </div>
              <div class="content"> 
                  <h1 class="title">{{food.name}}</h1>
                  <div class="detail"> 
                      <span class="sell-count">月售{{food.sellCount}}份</span>
                      <span class="rating">好评率{{food.rating}}%</span>
                  </div>
                  <div class="price"> 
                      <span class="now">￥{{food.price}}</span>
                      <span class="old" v-show='food.oldPrice'>￥{{food.oldPrice}}</span>
                  </div>

                  <div class="cartcontrol-wrapeer"> 
                    <Cartcontrol :food="food"></Cartcontrol>
                  </div>
                  <div  @click.stop.prevent='addFirst' class="buy" v-show="!food.count || food.count === 0">加入购物车</div>
              </div>
             <Split  v-show="food.info"></Split>
             <div class="info" v-show="food.info"> 
                  <h1 class="title">商品信息</h1>
                  <p class="text">{{food.info}}</p>
             </div>
             <Split></Split>
             <div class="rating"> 
                <h1 class="title">商品评价</h1>
                <rating-select v-on:ratselect='ratingselect' v-on:contentto='contenttoggle' :select-type='selectType' :only-content='onlyContent' :desc="desc" :ratings='food.ratings'></rating-select>
                <div class="rating-wrapper"> 
                    <ul v-show="food.ratings && food.ratings.length">
                      <li v-show="needShow(rating.rateType,rating.text)" v-for='rating in food.ratings' class="item"> 
                          <div class="user"> 
                              <span class="name">{{rating.username}}</span>
                              <img class="avatar" width="12" height="12" :src="rating.avatar">
                          </div>
                          <div class="time">{{rating.rateTime | formatDate}}</div>
                          <p class="text"> 
                              <span :class='{"icon-arrow_lift":rating.rateType === 0,"icon-check_circle":rating.rateType === 1}'></span>
                              {{rating.text}}
                          </p>
                      </li>
                    </ul>
                    <div class="no-rating" v-show="!food.ratings || !food.ratings.length">暂无评价</div> 
                </div>
             </div>
          </div>
      </div>
</template>

<script>
import BScroll from 'better-scroll';
import Vue from 'vue';
import Cartcontrol from '@/components/cartcontrol/cartcontrol'
import Split from '@/components/split/split'
import RatingSelect from '@/components/ratings/ratings'


const positive = 0 ;
const negative = 1;
const all = 2;

export default {
  name: 'food',
  props:{
    food:{
      type:Object
    }
  },
  components:{Cartcontrol,Split,RatingSelect},
  data () {
    return {
      showFlag:false,
      selectType:all,
      onlyContent:true,
      desc:{
        all:'全部',
        positive:'推荐',
        negative:'吐槽'
      }
    }
  },
  methods:{
    addFirst(event){
      this.$emit("cartadd",event.toElement);
      Vue.set(this.food,'count',1);
    },
    show(){
      this.showFlag = true;
      this.selectType = all;
      this.onlyContent=false;
      this.$nextTick(()=>{
        if(!this.scroll){
          this.scroll = new BScroll('.food',{
              click:true
          });
        }else{
          this.scroll.refresh();
        }
      })
    },
    hide(){
      this.showFlag = false;
    },
    needShow(type,text){
      if(this.onlyContent && !text){
          return false;
      }
      if(this.selectType === all){
        return true;
      }else{
        return type === this.selectType;
      }
    },
    ratingselect: function (type) {
      this.selectType = type;
      this.$nextTick(()=>{
          this.scroll.refresh();
      })
    },
    contenttoggle: function (target) {
      this.onlyContent = target;
      this.$nextTick(()=>{
          this.scroll.refresh();
      })
    },
  },
  filters: {
    formatDate(time){
      let date = new Date(time);
      let fmt = 'yyyy-MM-dd hh:mm';
      if(/(y+)/.test(fmt)){
        fmt = fmt.replace(RegExp.$1,(date.getFullYear()+" ").substr(4-RegExp.$1.length));
      }
      let o={
        'M+':date.getMonth() + 1,
        'd+':date.getDate(),
        'h+':date.getHours(),
        'm+':date.getMinutes(),
        's+':date.getSeconds()
      };
      for(let k in o){
        if(new RegExp(`(${k})`).test(fmt)){
          let str = o[k] + '';
          fmt = fmt.replace(RegExp.$1,(RegExp.$1.length === 1)?str:(('00'+str).substr(str.length)))
        }
      }
      return  fmt;
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style  lang="less" scoped >
.food{
  position: fixed;
  left: 0;
  top: 0;
  bottom:48px ;
  z-index: 30;
  width: 100%;
  transition: all .4s ease;
  background: #fff;
  
  .food-content{
    .image-header{
      position: relative;
      width: 100%;
      height: 0;
      padding-top: 100%;
      img{
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
      }
      .back{
        position: absolute;
        top: 10px;
        left: 0px;
        i{
          display: block;
          padding: 10px;
          font-size: 20px;
          color: #fff;
        }
      }
    }
    .content{
      position: relative;
      padding: 18px;
      .title{
        font-weight:700 ;
        font-size:14px ;
        line-height: 14px;
        margin-bottom: 8px;
        color: rbg(7,17,27);
      }
      .detail{
        margin-bottom: 18px;
        height: 10px;
        line-height: 10px;
        font-size: 0px;
        .sell-count{
          font-size: 10px;
          color: rgb(147,153,159);
          margin-right: 12px;
        }
        .rating{
          font-size: 10px;
          color: rgb(147,153,159);
          margin-right: 12px;
        }
      }
      .price{
          font-weight:700 ;
          line-height:24px ;
         .now{
            margin-right: 8px;
            font-size: 14px;
            color: rgb(240,20,20);
         }
         .old{
            text-decoration: line-through;
            font-size: 10px;
            color:rgb(7,17,27);
         }
      }
    }
    .cartcontrol-wrapeer{
      position: absolute;
      right: 12px;
      bottom: 12px;
    }
    .buy{
      position: absolute;
      right: 18px;
      bottom: 18px;
      z-index: 10px;
      height: 24px;
      line-height: 24px;
      padding: 0 12px;
      box-sizing:border-box;
      font-size: 10px;
      border-radius: 12px;
      color: #fff;
      background: rgb(0,160,220);
    }

    .info{
      padding: 18px;
      .title{
        line-height: 14px;
        margin-bottom: 6px;
        font-size: 14px;
        color: rgb(7,17,27);
      }
      .text{
        line-height: 24px;
        padding: 0 8px;
        font-size: 12px;
        color: rgb(77,85,93);
      }
    }

    .rating{
      padding-top: 18px;
      .title{
        line-height: 14px;
        margin-left: 18px;
        font-size: 14px;
        color: rgb(7,17,27);
      }
      .rating-wrapper{
        padding: 0 18px;
        .item{
            position: relative;
            padding: 16px 0;
            border-bottom: 1px solid rgba(7,17,27,0.1);
            .user{
              position: absolute;
              right: 0;
              top: 16px;
              line-height: 12px;
              font-size: 0px;
              .name{
                display: inline-block;
                margin-right: 6px;
                vertical-align: top;
                font-size: 10px;
                color: rgb(147,153,159);
              }
              .avatar{
                border-radius: 50%;
              }
            }
            .time{
              margin-bottom: 6px;
              line-height: 12px;
              font-size: 10px;
              color: rgb(147,153,159);
            }
            .text{
              line-height: 16px;
              font-size: 12px;
              color:rgb(7,17,27) ;
              .icon-arrow_lift{
                line-height: 12px;
                margin-right: 4px;
                font-size: 12px;
                color: rgb(0,160,220);
              }
              .icon-check_circle{
                line-height: 12px;
                margin-right: 4px;
                font-size: 12px;
                color: rgb(147,153,159);
              }
            }
        }
        .no-rating{
          padding: 16px 0;
          font-size: 12px;
          color: rgb(147,153,159);
        }
      }
    }
  }
}
</style>
