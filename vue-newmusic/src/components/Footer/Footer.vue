<template>
  <transition name="fade">
    <div class="footer">
      <div class="mini-music">
        <div class="music-img">
          <img  ref="img" >
        </div>
        <div class="music-name">
          <p></p>
          <div class="progress">
            <span class="start"></span>
            <div ref="progressBar" class="progress-bar">
              <div class="now" ref="now" ></div>
            </div>
            <span class="end"></span>
          </div>
        </div>
        <div class="music-control">
          <i></i>
        </div>
      </div>
    </div>

  </transition>
</template>

<script>
import 'babel-polyfill'
export default {
  name: 'hello4',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
.fade-enter-active {
  transition: all .3s ease-in-out;
}
.fade-leave-active {
  transition: all .3s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}
.fade-enter, .fade-leave-active {
  transform: translateY(50px);
  opacity: 0;
}
  .footer {
    background: #B72712;
    width: 100%;
    height: 70px;
    position:absolute;
    bottom:0;
    text-align: center;

    .mini-music {
      display: flex;
      height: 70px;
      line-height: 70px;

      .music-img {
        width: 60px;
        height: 60px;
        display: flex;
        justify-content: center;
        align-items: center;
        margin:5px 0 0 20px;
        img {
          width: 60px;
          height: 60px;
          border-radius: 50%;
          background-size: contain;
          cursor: pointer;
        }
      }
      .music-name {
        flex: 5;
        color: white;
        overflow: hidden;
        position: relative;
        width: 100%;

        p {
          position: relative;
          z-index: 1;
          height: 40px;
          line-height: 40px;
          overflow: hidden;
          white-space: nowrap;
          // cursor: pointer;
        }
        .progress {
          position: absolute;
          width: 100%;
          top: 10px;
          left: 0;
          span.start {
            position: absolute;
            left: 6px;
            // padding-right: 5px;
          }
          span.end {
            position: absolute;
            right: 4px;
            // padding-left: 5px;
          }
          @media screen and(min-width: 600px) {
            span.start {
              position: absolute;
              left: 26px;
            }
            span.end {
              position: absolute;
              right: 30px;
            }
          }
          .progress-bar {
            position: relative;
            width: 50%;
            height: 5px;
            display: inline-block;
            background-color: rgba(255, 255, 255, .5);
            vertical-align: 2px;
            border-radius: 3px;
            cursor: pointer;

            .now {
              position: absolute;
              left: 0;
              display: inline-block;
              max-width: 100%;
              // width: 70%;
              height: 5px;
              background-color: #31c27c;
            }
            .now::after {
              content: "";
              position: absolute;
              left: 100%;
              width: 2px;
              height: 6px;
              background-color: white;
            }
          }
        }
      }
      .music-control {
        flex: 1.5;
        i {
          padding-right: 10px;
          width: 45px;
          height: 45px;
          margin-top: 13px;
          display: inline-block;
          cursor: pointer;
          border-radius: 22px;
        }
        .play-icon {
          background: url(./play.svg) no-repeat;
          background-size: contain;

        }
        .pause-icon {
          background: url(./pause.svg) no-repeat;
          background-size: contain;
        }
      }
    }
  }
</style>
