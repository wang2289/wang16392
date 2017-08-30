<template lang="html">
  <div class="header">
    <div class="content-wrapper">
      <div class="avatar">
        <img width="64" height="64" :src="seller.avatar">
      </div>
      <div class="content"> 
        <div class="title"> 
          <span class="brand"></span>
          <span class="name">{{seller.name}}</span>
        </div>
        <div class="description"> 
            {{seller.description}}/{{seller.deliveryTime}}分钟送达
        </div>
        <div v-if="seller.supports" class="support"> 
          <span class="icon" :class="classMap[seller.supports[0].type]"></span>
          <span class="text">{{seller.supports[0].description}}</span>
        </div>
      </div>
      <div v-if="seller.supports" class="support-count" @click="showDetail">
        <span class="count">{{seller.supports.length}}个</span>
        <i>></i>
      </div>
    </div>
    <!--公告-->
    <div class="bulletin-wrapper" @click="showDetail"> 
        <span class="bulletin-title"></span><span class="bulletin-text">{{seller.bulletin}}</span>
        <i>></i>
    </div>
    <div class="background"> <img :src='seller.avatar' width="100%" height="100%"></div>
    <!--弹窗-->
     <transition name="showRouter"> 
    <div v-show="detailShow" class="detail"> 
        <div class="detail-wrapper clearfix"> 
            <div class="detail-main"> 
                <h1 class="name">{{seller.name}}</h1>
                <div class="star-warpper">
                  <star :size="48" :score="seller.score"></star> 
                </div>
                <div class='title'> 
                  <div class='line'></div>
                  <div class='text'>优惠信息</div>
                  <div class='line'></div>
                </div>
                <ul v-if="seller.supports" class="supports"> 
                  <li class="support-item" v-for="item in seller.supports">
                    <span class='icon' :class='classMap[item.type]'></span>
                    <span class="text">{{item.description}}</span>
                  </li>
                </ul>
                <div class='title'> 
                  <div class='line'></div>
                  <div class='text'>商家公告</div>
                  <div class='line'></div>
                </div>
                <div class="bulletin">
                  <p>{{seller.bulletin}}</p>
                </div>
            </div>
        </div>
        <div class="detail-close" @click="closeDetail"><i>X</i></div>
    </div>
     </transition> 
  </div>
</template>

<script>
// import VHeader from './components/Header/Header.vue'
import Star from '@/components/star/star.vue'
export default {
  name: 'header',
  components: {
    Star
  },
  props: {
    seller: {
      type: Object
    }
  },

  data() {
    return {
      detailShow: false
    }
  },
  methods: {
    showDetail() {
      this.detailShow = true;
    },
    closeDetail() {
      this.detailShow = false;
    }
  },
  created() {
    this.classMap = ['decrease', 'discount', 'guarante', 'invoice', 'special']
  }
}
</script>

<style lang="less" scoped>
.showRouter-enter-active {
  transition: all .4s ease;
}
.showRouter-leave-active {
  transition: all 0 ease;
}
.showRouter-enter, .showRouter-leave-active {
  transform: translateY(-150px);
  opacity: 0;
}
.header {
  color: #fff;
  background: rgba(7, 17, 27, 0.4);
  position: relative;
  overflow: hidden;
  .content-wrapper {
    padding: 24px 12px 18px 24px;
    font-size: 0px;
    position: relative;
    .avatar {
      display: inline-block;
      font-size: 14px;
      vertical-align: top;
      img {
        border-radius: 2px;
      }
    }
    .content {
      display: inline-block;
      margin-left: 16px;
      font-size: 14px;
      .title {
        margin: 2px 0px 8px 0px;

        .brand {
          display: inline-block;
          width: 30px;
          height: 18px;
          background: url('brand@2x.png');
          background-size: 30px 18px;
          background-repeat: no-repeat;
          vertical-align: top;
        }
        .name {
          margin-left: 6px;
          font-size: 16px;
          line-height: 18px;
          font-weight: normal;
        }
      }
      .description {
        margin-bottom: 10px;
        line-height: 12px;
        font-size: 12px;
      }
      .support {
        .icon {
          display: inline-block;
          width: 12px;
          height: 12px;
          vertical-align: top;
          margin-right: 4px;
          background-size: 12px 12px;
          background-repeat: no-repeat;
          &.decrease {
            background-image: url('decrease_1@2x.png');
          }
          &.discount {
            background-image: url('discount_1@2x.png');
          }
          &.guarante {
            background-image: url('guarantee_1@2x.png');
          }
          &.invoice {
            background-image: url('invoice_1@2x.png');
          }
          &.special {
            background-image: url('special_1@2x.png');
          }
        }
        .text {
          line-height: 12px;
          font-size: 10px !important;
          vertical-align: 2px;
        }
      }
    }
    .support-count {
      position: absolute;
      right: 12px;
      bottom: 14px;
      padding: 0 8px;
      border-radius: 14px;
      background: rgba(0, 0, 0, 0.2);
      text-align: center;
      height: 24px;
      line-height: 24px;
    }
    .count {
      font-size: 10px;
    }
    i {
      font-size: 10px;
    }
  }
  .bulletin-wrapper {
    background: rgba(7, 17, 27, 0.2);
    height: 28px;
    line-height: 28px;
    padding: 0px 22px 0px 12px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    position: relative;
    .bulletin-title {
      display: inline-block;
      width: 22px;
      height: 12px;
      margin-top: 8px;
      background: url('bulletin@2x.png');
      background-size: 100% 100%;
    }
    .bulletin-text {
      vertical-align: top;
      font-size: 10px;
      margin: 0px 4px;
    }
    i {
      font-size: 10px;
      color: #fff;
      position: absolute;
      right: 12px;
      top: 3px;
    }
  }
  .background {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: -1;
    filter: blur(10px);
  }
  .detail {
    position: fixed;
    z-index: 100;
    width: 100%;
    height: 100%;
    overflow: auto;
    background: rgba(7, 17, 27, 0.7);
    top: 0px;
    left: 0px;
    transition: all .4s ease;
    backdrop-filter:blur(10px);
    .detail-wrapper {
      min-height: 100%;
      width: 100%;
      .detail-main {
        margin-top: 64px;
        padding-bottom: 64px;
        .name {
          line-height: 16px;
          text-align: center;
          font-size: 16px;
          font-weight: 700;
        }
        .star-warpper {
          text-align: center;
          margin-top: 18px;
          padding: 2px 0px;
        }
        .title {
          display: flex;
          width: 80%;
          margin: 28px auto 24px auto;
          .line {
            flex: 1;
            position: relative;
            top: -6px;
            border-bottom: 1px solid rgba(255, 255, 255, 0.2)
          }
          .text {
            padding: 0 12px;
            font-size: 14px;
            font-weight: 700px;
          }
        }
        .bulletin{
          width: 80%;
          margin: 0 auto;
          p{
            padding: 0 12px;
            line-height: 24px;
            font-size: 12px;
          }
        }
        .supports {
          width: 80%;
          margin: 0 auto;
          li {
            padding: 0 12px;
            margin-bottom: 12px;
            font-size: 0px;
            &:last-child {
              margin-bottom: 0px;
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
              background-image: url('decrease_2@2x.png');
            }
            &.discount {
              background-image: url('discount_2@2x.png');
            }
            &.guarante {
              background-image: url('guarantee_2@2x.png');
            }
            &.invoice {
              background-image: url('invoice_2@2x.png');
            }
            &.special {
              background-image: url('special_2@2x.png');
            }
          }
          .text{
            line-height: 16px;
          }
        }
      }
    }
    .detail-close {
      position: relative;
      width: 32px;
      height: 32px;
      margin: -64px auto 0 auto;
      clear: both;
      font-size: 32px;
      i {
        font-style: normal;
      }
    }
  }
}
</style>
