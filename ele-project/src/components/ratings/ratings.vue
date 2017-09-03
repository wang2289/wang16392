<template lang="html">
      <div class="ratingselect">
        <div class="rating-type"> 
            <span @click='select(2)' class="block positive" :class='{"active":selectType === 2}'>{{desc.all}}<span class="count">{{ratings.length}}</span></span>
            <span  @click='select(1)' class="block positive" :class='{"active":selectType === 1}'>{{desc.positive}}<span class="count">{{positives.length}}</span></span>
            <span  @click='select(0)' class="block negative" :class='{"active":selectType === 0}'>{{desc.negative}}<span class="count">{{negatives.length}}</span></span>
        </div>
        <div class="switch"  @click="toggleContent" :class="{'on':onlyContent}"> 
            <span class="icon-keyboard_arrow_right"></span>
            <span class="text">只看有内容的评价</span>
        </div>
      </div>
</template>

<script>
import VScroll from '@/base/scroll/scroll'

const positive = 0 ;
const negative = 1;
const all = 2;

export default {
  name: 'ratingselect',
  props:{
    ratings:{
      type:Array,
      default(){
        return [];
      }
    },
    selectType:{
      type:Number,
      default:all
    },
    onlyContent:{
      type:Boolean,
      default:false
    },
    //tab的文案
    desc:{
      type:Object,
      default(){
        return{
          all:'全部',
          positive : '满意',
          negative:'不满意'
        }
      }
    }
  },
  computed:{
    positives(){
      return this.ratings.filter((rating)=>{
        return rating.rateType === positive;
      });
    },
    negatives(){
      return this.ratings.filter((rating)=>{
        return rating.rateType === negative;
      });
    }
  },
  methods:{
    select(type){
      this.selectType = type;
      this.$emit("ratingselect",type);
    },
    toggleContent(event){
      this.onlyContent = !onlyContent;
      this.$emit("contenttoggle",this.onlyContent);
    }
  },
  data () {
    return {
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style  lang="less" scoped >
.ratingselect{
  .rating-type{
     padding: 18px 0;
     margin: 0 18px;
     border-bottom: 1px solid rgba(7,17,27,0.1);
     font-size: 0px;
     .block{
      display: inline-block;
      padding: 8px 12px;
      margin-right: 8px;
      line-height: 16px;
      border-radius: 1px;
      font-size: 12px;
      color:rgb(77,85,93);
      &.active{
        color:#fff;
      }
      .count{
        font-size: 8px;
        margin-left: 2px;
      }
      &.positive{
        background:rgba(0,160,220,0.2);
        &.active{
          background:rgba(0,160,220,1);
        }
      }
      &.negative{
        background: rgba(77,85,93,0.2);
        &.active{
          background:rgba(77,85,93,1);
        }
      }
     }
  }
  .switch{
    padding: 12px 18px;
    line-height: 24px;
    border-bottom: 1px solid rgba(7,17,27,0.1);
    color: rgb(147,153,159);
    font-size: 0px;
    &.on{
      .icon-keyboard_arrow_right{
        color: #00c850;
      }
    }
    .icon-keyboard_arrow_right{
      display:inline-block;
      vertical-align: top;
      font-size: 24px;
      margin-right: 4px;
      
    }
    .text{
      display:inline-block;
      vertical-align: top;
      font-size: 12px;
    }
  }
}
</style>
