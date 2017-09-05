<template lang="html">
<transition name="fade">
    <div class="seller">
        <div class="seller-content">
          <div class="overview">
            <h1 class="title">{{seller.name}}</h1>
            <div class="desc">
              <star :size="36" :score='seller.score'></star>
              <span class="text">({{seller.ratingCount}})</span>
              <span class="text">月售{{seller.sellCount}}单</span>
            </div>
            <ul class="remark"> 
              <li class="block"> 
                <h2>起送价</h2>
                <div class="content"> 
                  <span class="stress">{{seller.minPrice}}</span>元
                </div>
              </li>
              <li class="block"> 
                <h2>商家配送</h2>
                <div class="content"> 
                  <span class="stress">{{seller.deliveryPrice}}</span>元
                </div>
              </li>
              <li class="block"> 
                <h2>平均配送时间</h2>
                <div class="content"> 
                  <span class="stress">{{seller.deliveryTime}}</span>元
                </div>
              </li>
            </ul>
            <div class="favorite"> 
              <span class="icon-favorite" :class="{'active':favorite}" @click="togglefavor"></span>
              <span class="text">{{favoriteText}}</span>
            </div>
          </div>
          <Split></Split>
          <div class="bulletin"> 
            <h1 class="title">公告与活动</h1>
            <div class="content-wrapper"> 
              <p class="content">{{seller.bulletin}}</p>
            </div>
            <ul v-if="seller.supports" class="supports"> 
              <li class="support-item" v-for="item in seller.supports">
                <span class='icon' :class='classMap[item.type]'></span>
                <span class="text">{{item.description}}</span>
              </li>
            </ul>
          </div>
          <Split></Split>
          <div class="pics">
            <h1 class="title">商家实景</h1>
            <div class="pic-wrapper">
              <ul class="pic-list">
                  <li class="pic-item" v-for="pic in seller.pics"> 
                    <img :src="pic" width='120' height="90">
                  </li>
              </ul>
            </div>
          </div>
          <Split></Split>
          <div class="info"> 
            <h1 class="title">商家信息</h1>
            <ul>
              <li class="info-item" v-for="info in seller.infos">{{info}}</li>
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

export default {
  name: 'seller',
  components: {
    Split,
    Star
  },
  data(){
    return{
      favorite:(()=>{
        return this.loadfrom(this.seller.id,'favorite',false);
      })(),
    }
  },
  computed:{
    favoriteText(){
      return this.favorite ? "已收藏":"收藏";
    }
  },
  created() {
    this.classMap = ['decrease', 'discount', 'guarante', 'invoice', 'special']
  },
  watch:{
    'seller'(){
      console.log(1);
      this.initScroll();
    }
  },
  methods:{
    togglefavor(){
      this.favorite = !this.favorite;
      localStorage.favorite = this.favorite;
      this.saveTolocal(this.seller.id,'favorite',this.favorite)
    },
    saveTolocal(id,key,value){
      let seller=window.localStorage._seller_;
      if(!seller){
        seller = {};
        seller[id] = {};
      }else{
        seller = JSON.parse(seller);
        if(!seller[id]){
            seller[id] = {};
        }
      }
      seller[id][key]=value;
      window.localStorage._seller_ = JSON.stringify(seller)
    },
    loadfrom(id,key,value){
      let seller=window.localStorage._seller_;
      if(!seller){
        return value;
      }
      seller = JSON.parse(seller)[id];
      if(!seller){
        return value;
      }
      let ret = seller[key];
      return ret || value;
    },
    initScroll(){
      if(!this.scroll){
          this.scroll = new BScroll('.seller-content',{
              click:true
          });
        }else{
          this.scroll.refresh();
        }
    }
  },
  ready(){
    console.log(1);
      this.initScroll();
      // if(this.seller.pics){

      // }
  },
  props: {
    seller: {
      type: Object
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style  lang="less" scoped  >
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
.seller {
  position: absolute;
  top: 174px;
  bottom: 0;
  left: 0;
  width: 100%;
  // overflow: hidden;
  .seller-content {
    .overview {
      padding: 18px;
      position: relative;
      .title {
        margin-bottom: 8px;
        line-height: 14px;
        color: rgb(7, 17, 27);
        font-size: 14px;
      }
      .desc {
        padding-bottom: 18px;

        border-bottom: 1px solid rgba(7, 17, 27, 0.1);
        font-size: 0;
        .star {
          display: inline-block;
          margin-right: 8px;
          vertical-align: top;
        }
        .text {
          display: inline-block;
          margin-right: 12px;
          line-height: 18px;
          font-size: 10px;
          vertical-align: top;
          color: rgb(77, 85, 93);
        }
      }
      .remark {
        display: flex;
        padding-top: 18px;
        .block {
          flex: 1;
          text-align: center;
          border-right: 1px solid rgba(7, 17, 27, 0.1);
          &:last-child {
            border: none;
          }
          h2 {
            margin-bottom: 4px;
            line-height: 10px;
            font-size: 10px;
            color: rgb(147, 153, 159);
          }
          .content {
            line-height: 24px;
            font-size: 10px;
            color: rgb(7, 17, 27);
            .stress {
              font-size: 24px;
            }
          }
        }
      }
      .favorite{
        position: absolute;
        width: 50px;
        right:11px;
        top:18px;
        text-align: center;
        .icon-favorite{
          display: block;
          margin-bottom: 4px;
          color: #d4d6d9;
          line-height: 24px;
          font-size: 24px;
          &.active{
            color: rgb(240, 20, 20);
          }
        }
        .text{
          font-size:10px ;
          line-height: 10px;
          color: rgb(77, 85, 93);
        }
      }
    }
    .bulletin {
      padding: 18px 18px 0px 18px;
      .title {
        margin-bottom: 8px;
        line-height: 14px;
        color: rgb(7, 17, 27);
        font-size: 14px;
      }
      .content-wrapper {
        padding: 0px 12px 16px 12px;
        border-bottom: 1px solid rgba(7, 17, 27, 0.1);
        .content {
          line-height: 24px;
          font-size: 12px;
          color: rgb(240, 20, 20);
        }
      }
    }
    .supports {
      width: 80%;
      margin: 0 auto;
      li {
        padding: 16px 12px;
        margin-bottom: 12px;
        font-size: 0px;
        border-bottom: 1px solid rgba(7, 17, 27, 0.1);
        &:last-child {
          margin-bottom: 0px;
          border:none
        }
        span {
          font-size: 12px;
          line-height: 12px;
          vertical-align: top;
        }
      }
      .icon {
        display: inline-block;
        width: 16px;
        height: 16px;
        vertical-align: 3px;
        margin-right: 6px;
        background-size: 16px 16px;
        background-repeat: no-repeat;
        &.decrease {
          background-image: url('decrease_4@2x.png');
        }
        &.discount {
          background-image: url('discount_4@2x.png');
        }
        &.guarante {
          background-image: url('guarantee_4@2x.png');
        }
        &.invoice {
          background-image: url('invoice_4@2x.png');
        }
        &.special {
          background-image: url('special_4@2x.png');
        }
      }
      .text {
        line-height: 16px;
        font-size: 12px;
        color: rgb(7, 17, 27);
      }
    }
    .pics{
      padding:18px;
      .title {
        margin-bottom: 12px;
        line-height: 14px;
        color: rgb(7, 17, 27);
        font-size: 14px;
      }
      .pic-wrapper{
          width: 100%;
          overflow: hidden;
          white-space: nowrap;
          height: 90px;
        .pic-list{
          font-size: 0px;
          overflow-x: scroll;
          height: 95px;
          .pic-item{
            display: inline-block;
            margin-right: 6px;
            width: 120px;
            height: 90px;
            &:last-child{
              margin: 0px;
            }
          }
        }
      }
    }
    .info{
      padding: 18px 18px 0px 18px;
      .title {
        padding-bottom: 8px;
        line-height: 14px;
        color: rgb(7, 17, 27);
        font-size: 14px;
        border-bottom: 1px solid rgba(7, 17, 27, 0.1);
      }
      .info-item{
        padding: 16px 12px;
        line-height: 16px;
        border-bottom: 1px solid rgba(7, 17, 27, 0.1);
        font-size: 12px;
        &:last-child{
          border: none;
        }
      }
    }
  }
}
</style>
