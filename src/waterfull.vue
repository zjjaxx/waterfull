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
} from "vue";
import _ from "lodash";
import { FileItem, ItemStyle } from "@/types/index";
let heightList = [0, 0, 0];
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

    const listStyle = ref<ItemStyle[]>([]);
    const listHeight = ref(0);
    watch(
      () => _.cloneDeep(list),
      () => {
        //执行瀑布流排列
        execWaterfull();
      }
    );
    const execWaterfull = () => {
      //可能存在padding
      const listWidth = document.defaultView
        ? parseFloat(
            document.defaultView.getComputedStyle(
              waterfull.value as unknown as HTMLElement
            ).width
          )
        : (waterfull.value as unknown as HTMLElement).clientWidth;

      const itemWidth = listWidth / column.value;
      listStyle.value = list.value.map((item) => ({
        width: itemWidth + "px",
        top: "",
        left: "",
      }));
      const imgList: HTMLImageElement[] = Array.from(
        document.querySelectorAll(".__list_item__ img[main-img-tag]")
      );
      //图片加载
      const imgLoad = (imgList: HTMLImageElement[]) => {
        imgList.forEach((img, index) => {
          //判断之前是否加载过
          if (img.src != list.value[index].url) {
            (img as HTMLImageElement).src = list.value[index].url;
            img.onload = () => {
              let parentElement = img.parentElement;
              while (parentElement) {
                if (parentElement.className.includes("__list_item__")) {
                  break;
                } else {
                  parentElement = parentElement.parentElement;
                }
              }
              const parentElementHeight = parentElement!.offsetHeight;
              console.log(
                "parentElementHeight",
                parentElement,
                document.defaultView?.getComputedStyle(parentElement!).height
              );
              const _index = heightList.findIndex(
                (item: number) => item == Math.min(...heightList)
              );
              listStyle.value[index] = Object.assign(listStyle.value[index], {
                top: `${heightList[_index]}px`,
                left: `${_index * itemWidth}px`,
              });
              heightList[_index] += parentElementHeight;
            };
          }
        });
      };
      imgLoad(imgList);
    };
    onMounted(() => {});
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
  }
}
</style>
