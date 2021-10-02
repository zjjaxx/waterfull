<template>
  <img alt="Vue logo" src="./assets/logo.png" />
  <waterfull :list="listInfo.list" :column="2">
    <template #item="{ item }">
      <div class="product-wrapper">
        <div class="product">
          <img class="img" :src="item.url" alt="" />
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

import { waterfull } from "../index";
import { throttle } from "../util/index";
import axios from "axios";
interface FileItem {
  url: string;
  [propName: string]: any;
}
interface Params {
  page: number;
  [propName: string]: any;
}
interface ListInfo {
  params: Params;
  list: FileItem[];
  finish: boolean;
  loading: boolean;
}
export default defineComponent({
  name: "App",
  components: {
    waterfull,
  },
  setup() {
    const listInfo: ListInfo = reactive({
      list: [],
      finish: false,
      loading: false,
      params: {
        page: 0,
        pageSize: 10,
      },
    });
    const api = async () => {
      if (listInfo.loading || listInfo.finish) {
        return;
      }
      listInfo.loading = true;
      try {
        const params = Object.assign({}, listInfo.params, {
          page: listInfo.params.page + 1,
        });
        const res = await axios.get("/api/getImgs", { params });
        if (res.data.length) {
          listInfo.list = [...listInfo.list, ...res.data];
          listInfo.params.page++;
        } else {
          listInfo.finish = true;
        }
      } catch (error) {
        console.log("error is", error);
      }
      listInfo.loading = false;
    };
    //节流
    const throttle_api = throttle(api, 300);
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
      listInfo,
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
      border-radius: 10px 10px 0 0;
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
