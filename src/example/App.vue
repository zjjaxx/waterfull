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
interface FileItem {
  url: string;
  [propName: string]: any;
}
const mockData = [
  {
    url: "https://img10.360buyimg.com/mobilecms/s272x272_jfs/t1/205605/4/4895/147398/61349fafEfd0de2de/caa0e846acc5cde6.jpg!q70.dpg.webp",
    name: "买一只送一只】土记 新鲜2年散养土鸡 活鸡现杀现发老母鸡肉 生鲜走地鸡笨鸡柴鸡整鸡 杀前约3斤左右 整只装",
  },
  {
    url: "https://img2.baidu.com/it/u=2510891666,2454567058&fm=26&fmt=auto&gp=0.jpg",
    name: "夏天抖音同款贵夫人香水女士淡香清新妇留香法国桂花 贵夫人粉红限量版 一瓶 80mL",
  },
  {
    url: "https://img1.baidu.com/it/u=686675228,2481849275&fm=26&fmt=auto&gp=0.jpg",
    name: "百雀羚面膜女保湿化妆品护肤品套装 小雀幸补水紧致面膜30片装(静润、紧弹、清滢、澄净、清澈随机发",
  },
  {
    url: "https://img2.baidu.com/it/u=464821280,3817344866&fm=253&fmt=auto&app=120&f=JPEG?w=400&h=400",
    name: "三只松鼠每日坚果 750g/30袋 中秋送礼坚果礼盒零食大礼包儿童孕妇节日混合干果腰果夏威夷果核桃仁开心果",
  },
  {
    url: "https://img0.baidu.com/it/u=2903307764,2383671696&fm=253&fmt=auto&app=120&f=JPEG?w=641&h=483",
    name: "苏泊尔（SUPOR）电饭煲电饭锅4L新蓝钻球釜内胆特色烘焙 发面功能2-6人多功能家用智能电饭煲40FC873",
  },
];
export default defineComponent({
  name: "App",
  components: {
    waterfull,
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
    border-radius: 10px;
    background-color: #fff;
    .img {
      height: auto;
      width: 100%;
    }
    .name {
      margin-top: 5px;
      width: 100%;
      font-size: 14px;
      height: 36px;
      line-height: 18px;
      overflow: hidden;
      display: -webkit-box; //将对象作为弹性伸缩盒子模型显示;
      text-overflow: ellipsis; //溢出部分用省略号代替
      -webkit-line-clamp: 2; //设置文本显示两行
      -webkit-box-orient: vertical; //从上到下排列子元素;
      white-space: normal;
    }
  }
}
</style>
