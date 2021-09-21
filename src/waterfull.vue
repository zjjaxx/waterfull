<!--  -->
<template>
  <div class="waterfull" ref="waterfull" :style="{ height: listHeight + 'px' }">
    <template v-for="(item, index) in list" :key="index">
      <div class="__list_item__" :style="listStyle[index]">
        <slot name="item" :item="item"></slot>
      </div>
    </template>
  </div>
</template>

<script lang="ts">
import {
  PropType,
  defineComponent,
  reactive,
  onMounted,
  ref,
  toRefs,
  computed,
  watch,
  nextTick,
} from "vue";
import _ from "lodash";
import { FileItem, ItemStyle } from "@/types/index";
import { throttle } from "./util/index";
export default defineComponent({
  props: {
    list: {
      type: Array as PropType<FileItem[]>,
      required: true,
    },
    column: {
      type: Number,
      required: true,
    },
  },
  components: {},
  setup(props) {
    const { column, list } = toRefs(props);
    const waterfull = ref(null);
    //瀑布流排列样式
    const listStyle = ref<ItemStyle[]>([]);
    //瀑布流总体高度
    const listHeight = ref(0);
    //瀑布流排列高度计算相关数组
    let heightList = new Array(column.value).fill(0);
    //开始布局
    const layout = async () => {
      await calcListStyle();
      await nextTick();
      execWaterfull();
    };
    //图片预加载 和初始化listStyle
    const calcListStyle = async () => {
      //可能存在padding
      const listWidth = document.defaultView
        ? parseFloat(
            document.defaultView.getComputedStyle(
              waterfull.value as unknown as HTMLElement
            ).width
          )
        : (waterfull.value as unknown as HTMLElement).clientWidth;
      console.log("listWidth", document.body.offsetWidth);
      const itemWidth = listWidth / column.value;
      //图片预加载
      const imgsPromise: Promise<boolean>[] = [];

      listStyle.value = list.value.map((item, index) => {
        if (listStyle.value[index]) {
          return listStyle.value[index];
        } else {
          imgsPromise.push(
            new Promise((resolve, reject) => {
              const imgElement = new Image();
              imgElement.src = item.url;
              imgElement.onload = () => {
                resolve(true);
              };
              imgElement.onerror = () => {
                resolve(false);
              };
            })
          );
          return {
            width: itemWidth + "px",
            top: "",
            left: "",
            loaded: false,
            opacity: 0,
          };
        }
      });
      await Promise.all(imgsPromise);
    };
    //执行瀑布流排序
    const execWaterfull = () => {
      const listItemElements: HTMLElement[] = Array.from(
        document.querySelectorAll(".__list_item__")
      );
      listItemElements.forEach((element, index) => {
        //已经执行过瀑布流排序的return
        if (listStyle.value[index].loaded) {
          return;
        }
        const elementHeight = element.offsetHeight;
        const _index = heightList.findIndex(
          (item: number) => item == Math.min(...heightList)
        );
        listStyle.value[index] = Object.assign(listStyle.value[index], {
          top: `${heightList[_index]}px`,
          left: `${_index * parseFloat(listStyle.value[index].width)}px`,
          loaded: true,
          opacity: 1,
        });

        heightList[_index] += elementHeight;
        listHeight.value = Math.max(...heightList);
      });
    };
    //当list数据发生变化时，重新布局
    watch(() => _.cloneDeep(list), layout);
    onMounted(() => {
      layout();
      //当窗口大小发生改变时，重新布局
      const resizeCallback = throttle(() => {
        //listStyle heightList 重置
        heightList = new Array(column.value).fill(0);
        listStyle.value = [];
        layout();
      }, 300);
      window.onresize = resizeCallback;
    });
    return {
      listStyle,
      waterfull,
      listHeight,
      execWaterfull,
    };
  },
});
</script>
<style lang="less" scoped>
//@import url(); 引入公共css类
.waterfull {
  position: relative;
  .__list_item__ {
    position: absolute;
    transition: all 0.3s ease;
    animation: show 0.3s ease;
  }
}
@keyframes show {
  0% {
    transform: scale(0.7);
  }
  100% {
    transform: scale(1);
  }
}
</style>
