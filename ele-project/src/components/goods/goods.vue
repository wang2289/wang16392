<template lang="html">
    <div class="goods">
        <div class="menu-wrapper" ref="menuwrapper">
          <ul>
            <li v-for='(item,index) in goods' :class="{'current':currentIndex===index}" @click="selectMenu(index)">
              <span class="text">
                <span v-show="item.type>0" class="icon" :class='classMap[item.type]'></span>{{item.name}}
              </span>
            </li>
          </ul>
        </div>
        <div class="foods-wrapper" ref="foodswrapper">       
            <ul>   
              <li v-for='item in goods' class="food-list food-list-hook">
                <h1>{{item.name}}</h1>
                <ul> 
                    <li @click='selectFood(food)' v-for='food in item.foods' class="food-item"> 
                        <div class="icon">
                          <img width="57" height="57" :src="food.icon">
                        </div> 
                        <div class="content">
                          <h2 class="name">{{food.name}}</h2>
                          <p class="desc">{{food.description}}</p>
                          <div class="extra"> 
                              <span class="count">月售{{food.sellCount}}份</span>
                              <span>好评率{{food.rating}}%</span>
                          </div>
                          <div class="price">
                            <span class="now">￥{{food.price}}</span>
                            <span class="old" v-show='food.oldPrice'>￥{{food.oldPrice}}</span>
                          </div>
                          <div class="cartcontrol-wrapper">
                            <Cartcontrol  v-on:cartadd='cartadds' :food="food"></Cartcontrol>
                          </div>
                        </div>       
                    </li>
                </ul>
              </li>
            </ul>
        </div>
        <shopcar ref="shopcart" :select-foods="selectFoods" :delivery-price="seller.deliveryPrice" :min-price="seller.minPrice" ></shopcar>
        <transition name="showRouter">
        <food :food="selectedFood" ref='food'></food>
        </transition>
    </div>
</template>

<script>
import BScroll from 'better-scroll';
import food from '@/components/food/food'
import shopcar from '@/components/shopcar/shopcar'
import Cartcontrol from '@/components/cartcontrol/cartcontrol'
export default {
  name: 'goods',
  props: {
    seller: {
      type: Object
    }
  },
  components:{
     shopcar,
     food,
     Cartcontrol
  },
  data() {
    return {
      goods: [],
      listHeight:[],
      scrollY:0,
      selectedFood:{}
    }
  },
  computed:{
    currentIndex(){
      for (let i=0; i<this.listHeight.length; i++) {
        let height1=this.listHeight[i];
        let height2=this.listHeight[i+1];
        if( !height2 || this.scrollY>=height1 && this.scrollY<height2){
          return i;
          console(i)
        }
      }
      return 0;
    },
    selectFoods(){
      let foods=[];
      this.goods.forEach((good)=>{
          good.foods.forEach((food)=>{
              if(food.count){
                foods.push(food);
              }
          })
      })
      return foods;
    }
  },
  created() {
    this.classMap = ['decrease', 'discount', 'guarante', 'invoice', 'special']

    this.axios.get('/api/goods').then(res => {
      res = res.data;
      this.goods = res.data;
      //dom结构加载结束
      this.$nextTick(() => {
          this._initScroll();
          this._calculateHeight();
      })
    });
  },
  methods:{
    cartadds: function (target) {
      this._drop(target);
    },
    selectFood(food){
      this.selectedFood = food;
      this.$refs.food.show();
    },
    selectMenu(index){
      // if(!event._constructed){
      //     return;
      // }
      let foodlist = document.querySelectorAll('.food-list-hook');
      let el = foodlist[index];
      this.foodsScroll.scrollToElement(el,300);
    },
    _drop(target){
      this.$nextTick(()=>{
        this.$refs.shopcart.drop(target);
      })
    },
    _initScroll(){
      this.meunScroll = new BScroll('.menu-wrapper',{
        click:true
      });
      this.foodsScroll = new BScroll('.foods-wrapper', {
        click:true,
        //探针作用，实时监测滚动位置
        probeType: 3
      });
      this.foodsScroll.on('scroll',(pos)=>{
          this.scrollY = Math.abs(Math.round(pos.y));
      })
    },
    _calculateHeight(){
      //console.log(document.querySelector('.food-list-hook').clientHeight);
        let foodlist = document.querySelectorAll('.food-list-hook');
        let height=0;
        this.listHeight.push(height);
        for (let i =0; i < foodlist.length; i++) {
          let item = foodlist[i];
          height += item.clientHeight;
          this.listHeight.push(height);
        }
        // console.log(this.listHeight);
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less" >
.showRouter-enter-active {
  transition: all .4s ease;
}
.showRouter-leave-active {
  transition: all 0.4 ease;
}
.showRouter-enter, .showRouter-leave-active {
  transform: translateX(-100%);
  opacity: 0;
}
.goods {
  display: flex;
  position: absolute;
  top: 174px;
  width: 100%;
  bottom: 46px;
  overflow: hidden;
  .menu-wrapper {
    flex: 0 0 80px;
    width: 80px;
    background: #f3f5f7;
    ul{
     /* text-align: center;*/
    }
    li {
      display: table;
      height: 54px;
      width: 54px;
      line-height: 14px;
      padding: 0 12px;
      &.current{
          margin-top: -1px;
          position: relative;
          z-index: 10;
          background: #fff;
          font-weight: 700;
          .text{
            border:0px solid #fff;
          }
      }
      .icon {
        display: inline-block;
        width: 12px;
        height: 12px;
        vertical-align: top;
        margin-right: 2px;
        background-size: 12px 12px;
        background-repeat: no-repeat;
        &.decrease {
          background-image: url('decrease_3@2x.png');
        }
        &.discount {
          background-image: url('discount_3@2x.png');
        }
        &.guarante {
          background-image: url('guarantee_3@2x.png');
        }
        &.invoice {
          background-image: url('invoice_3@2x.png');
        }
        &.special {
          background-image: url('special_3@2x.png');
        }
      }
      .text{
        font-size: 12px;
        display: table-cell;
        width: 56px;
        vertical-align: middle;
        border-bottom: 1px solid rgba(7, 17, 27,0.1)
      }
    }
  }
  .foods-wrapper {
    flex: 1;
    h1{
      padding-left: 14px;
      height: 26px;
      line-height: 26px;
      border-left: 2px solid #d9dde1;
      font-size: 12px;
      color:rgb(147,153,159);
      background:#f3f5f7 ;
    }
    .food-item{
      display: flex;
      margin: 18px;
      border-bottom: 1px solid  rgba(7, 17, 27,0.1);
      padding-bottom: 18px;
      position: relative;
      &:last-child{
        border-bottom: 0px solid  rgba(7, 17, 27,0.1);
        margin-bottom: 0px;
      }
      .icon {
          flex: 0 0 57px;
          margin-right: 10px;
      }
      .content{
        flex: 1;
        .name{
          margin: 2px 0 8px 0;
          height: 14px;
          line-height: 14px;
          font-size: 14px;
          color: rgb(7,17,27);
        }
        .desc{
          margin-bottom: 8px;
          line-height: 12px;
          font-size: 10px;
          color:rgb(147,153,159);
        }
        .extra{
          line-height: 10px;
          font-size: 10px;
          color:rgb(147,153,159);
          .count{
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
        .cartcontrol-wrapper{
          position: absolute;
          right: 0px;
          bottom: 12px;
        }
      }
    }
  }

}
</style>
