<template>
  <img alt="Vue logo" src="./assets/logo.png" />
  <HelloWorld msg="Welcome to Your Vue.js + TypeScript App" />
  <waterfull :list="list" :column="3" ref="waterfullRef">
    <template #item="{ item }">
      <div class="product-wrapper">
        <img class="img" src="./assets/logo.png" main-img-tag alt="" />
        <div class="name">{{ item.name }}</div>
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
import HelloWorld from "./components/HelloWorld.vue";
import waterfull from "../waterfull.vue";
interface FileItem {
  url: string;
  height: number;
  [propName: string]: any;
}
const mockData = [
  {
    url: "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fcar0.autoimg.cn%2Fupload%2F2013%2F2%2F18%2Fu_20130218165304639264.jpg&refer=http%3A%2F%2Fcar0.autoimg.cn&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1633792128&t=823e20174c1dc2d29e21e31a30d0adda",
    height: 200,
    name: "aaaa",
  },
  {
    url: "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fpic27.nipic.com%2F20130321%2F11311030_163344572176_2.jpg&refer=http%3A%2F%2Fpic27.nipic.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1633792128&t=7a9ea4822de11af0b517af3da243aa94",
    height: 300,
    name: "bbbb",
  },
  {
    url: "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fa2.att.hudong.com%2F43%2F41%2F300326546728132696419076507.jpg&refer=http%3A%2F%2Fa2.att.hudong.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1633792128&t=7a3e6b39f6545760bfd29cc7c505f541",
    height: 230,
    name: "cccc",
  },
  {
    url: "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fpic23.nipic.com%2F20120730%2F8820441_171402261000_2.jpg&refer=http%3A%2F%2Fpic23.nipic.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1633792128&t=dd20589f0fc06b686e1fd8374d40e706",
    height: 280,
    name: "eeee",
  },
  {
    url: "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimg.pconline.com.cn%2Fimages%2Fupload%2Fupc%2Ftx%2Fphotoblog%2F1404%2F26%2Fc5%2F33596317_33596317_1398517630015_mthumb.jpg&refer=http%3A%2F%2Fimg.pconline.com.cn&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1633792128&t=a57f86806fc4c1296374326219f19b87",
    height: 100,
    name: "dddd",
  },
];
export default defineComponent({
  name: "App",
  components: {
    waterfull,
    HelloWorld,
  },
  setup() {
    let list = ref<FileItem[]>([]);
    const waterfullRef = ref(null);
    onMounted(async () => {
      setTimeout(async () => {
        list.value = mockData;
        await nextTick();
        (
          waterfullRef.value as unknown as DefineComponent<
            Record<string, unknown>,
            Record<string, unknown>,
            any
          >
        ).execWaterfull();
      }, 3000);
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
  border-radius: 10px;
  border: 1px solid #999;
  padding: 10px;
  height: 100%;
  box-sizing: border-box;
}
.img {
  height: auto;
  width: 100%;
}
</style>
