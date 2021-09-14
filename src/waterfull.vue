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
    let heightList = new Array(column.value).fill(0);
    watch(
      () => _.cloneDeep(list),
      async () => {
        //重新计算listStyle
        calcListStyle();
        await nextTick();
        //执行瀑布流排序
        execWaterfull();
      }
    );
    const calcListStyle = () => {
      //可能存在padding
      const listWidth = document.defaultView
        ? parseFloat(
            document.defaultView.getComputedStyle(
              waterfull.value as unknown as HTMLElement
            ).width
          )
        : (waterfull.value as unknown as HTMLElement).clientWidth;

      const itemWidth = listWidth / column.value;
      listStyle.value = list.value.map((item, index) => {
        if (listStyle.value[index]) {
          return listStyle.value[index];
        } else {
          return {
            width: itemWidth + "px",
            top: "",
            left: "",
            loaded: false,
          };
        }
      });
    };
    const execWaterfull = () => {
      const imgList: HTMLImageElement[] = Array.from(
        document.querySelectorAll(".__list_item__ img[main-img-tag]")
      );
      const calc = (img: HTMLImageElement, index: number) => {
        let parentElement = img.parentElement;
        while (parentElement) {
          if (parentElement.className.includes("__list_item__")) {
            break;
          } else {
            parentElement = parentElement.parentElement;
          }
        }
        const parentElementHeight = parentElement!.offsetHeight;
        const _index = heightList.findIndex(
          (item: number) => item == Math.min(...heightList)
        );
        listStyle.value[index] = Object.assign(listStyle.value[index], {
          top: `${heightList[_index]}px`,
          left: `${_index * parseFloat(listStyle.value[index].width)}px`,
          loaded: true,
        });

        heightList[_index] += parentElementHeight;
        listHeight.value = Math.max(...heightList);
      };
      //图片加载
      const imgLoad = (imgList: HTMLImageElement[]) => {
        imgList.forEach((img, index) => {
          //判断之前是否加载过
          if (!listStyle.value[index].loaded) {
            if (img.complete) {
              calc(img, index);
            } else {
              img.onload = () => {
                calc(img, index);
              };
            }
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
