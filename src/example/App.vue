<template>
  <img alt="Vue logo" src="./assets/logo.png" />
  <waterfull :list="list" :column="2" ref="waterfullRef">
    <template #item="{ item }">
      <div class="product-wrapper">
        <div class="product">
          <img class="img" :src="item.url" main-img-tag alt="" />
          <div class="name">{{ item.name }}</div>
        </div>
      </div>
    </template>
  </waterfull>
</template>

<script lang="ts">
import {
  defineComponent,
  nextTick,
  onMounted,
  reactive,
  ref,
  watch,
} from "vue";
import type { DefineComponent } from "vue";
import waterfull from "../waterfull.vue";
import { throttle } from "../util/index";
import axios from "axios";
interface FileItem {
  url: string;
  [propName: string]: any;
}
export default defineComponent({
  name: "App",
  components: {
    waterfull,
  },
  setup() {
    let list = ref<FileItem[]>([]);
    const waterfullRef = ref(null);
    const api = async () => {
      try {
        const res = await axios.get("/api/getImgs");
        list.value = [...list.value, ...res.data];
      } catch (error) {
        console.log("error is", error);
      }
    };
    //节流
    const throttle_api = throttle(api, 100);
    const startListenScroll = () => {
      window.onscroll = () => {
        const element = document.documentElement || document.body;
        const windowHeight = element.clientHeight;
        const scrollHeight = element.scrollHeight;
        const scrollTop = element.scrollTop;
        if (scrollTop + windowHeight + 80 > scrollHeight) {
          throttle_api();
        }
      };
    };
    onMounted(async () => {
      await api();
      //监听触底事件
      startListenScroll();
    });
    return {
      list,
      waterfullRef,
    };
  },
});
</script>

<style lang="less">
* {
  margin: 0;
  padding: 0;
  background-color: #eee;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
.product-wrapper {
  padding: 10px;
  box-sizing: border-box;
  .product {
    padding-bottom: 10px;
    border-radius: 10px;
    background-color: #fff;
    .img {
      height: auto;
      width: 100%;
    }
    .name {
      padding: 0 5px;
      margin-top: 5px;
      width: 100%;
      font-size: 14px;
      height: 36px;
      line-height: 18px;
      box-sizing: border-box;
      overflow: hidden;
      display: -webkit-box; //将对象作为弹性伸缩盒子模型显示;
      text-overflow: ellipsis; //溢出部分用省略号代替
      -webkit-line-clamp: 2; //设置文本显示两行
      -webkit-box-orient: vertical; //从上到下排列子元素;
      white-space: normal;
      background-color: #fff;
    }
  }
}
</style>
