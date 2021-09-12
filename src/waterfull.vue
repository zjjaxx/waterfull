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
    const listStyle: ItemStyle[] = reactive([]);
    const listHeight = ref(0);
    watch(
      () => _.cloneDeep(list),
      () => {
        //执行瀑布流排列
        execWaterfull();
      }
    );
    const execWaterfull = () => {
      let imgLoadList: Promise<boolean>[] = [];
      let imgLazyStartIndex = 0;
      let imgLazyEndIndex = 0;
      const imgList: HTMLImageElement[] = Array.from(
        document.querySelectorAll(".__list_item__ img[main-img-tag]")
      );
      //图片懒加载
      const imgLazy = (imgList: HTMLImageElement[]) => {
        let _index = 0;
        let first = true;
        imgList.forEach((img, index) => {
          //判断图片位子 是否加载
          console.log(
            " document.documentElement.clientHeight",
            img.getBoundingClientRect().top,
            document.documentElement.clientHeight
          );
          if (
            img.getBoundingClientRect().top <
            document.documentElement.clientHeight
          ) {
            //判断之前是否加载过
            if (img.src != list.value[index].url) {
              if (!imgLoadList[index]) {
                const _img = new Image();
                _img.src = list.value[index].url;
                imgLoadList[index] = new Promise((resolve, reject) => {
                  _img.onload = () => {
                    (img as HTMLImageElement).src = list.value[index].url;
                    resolve(true);
                  };
                  _img.onerror = () => {
                    resolve(true);
                  };
                });
              }
            }
          }
          //图片在视口下方不加载
          else {
            if (first) {
              _index = index;
              first = false;
            }
          }
        });
        return _index;
      };
      window.onscroll = () => {
        imgLazyEndIndex = imgLazy(imgList);
        _execWaterfull();
      };
      imgLazyEndIndex = imgLazy(imgList);
      //等待懒加载图片完成 进行瀑布流布局
      const _execWaterfull = () => {
        imgLoadList.length &&
          Promise.all(imgLoadList).then(() => {
            let _listHeight = Array.from(
              document.querySelectorAll(".__list_item__")
            ).map((item) => (item as HTMLElement).offsetHeight);
            //可能存在padding
            const listWidth = document.defaultView
              ? parseFloat(
                  document.defaultView.getComputedStyle(
                    waterfull.value as unknown as HTMLElement
                  ).width
                )
              : (waterfull.value as unknown as HTMLElement).clientWidth;

            const itemWidth = listWidth / column.value;
            list.value
              .slice(imgLazyStartIndex, imgLazyEndIndex)
              .forEach((item: FileItem, index: number) => {
                const _index = heightList.findIndex(
                  (item: number) => item == Math.min(...heightList)
                );
                listStyle[index + imgLazyStartIndex] = {
                  height: `${_listHeight[index + imgLazyStartIndex]}px`,
                  width: `${itemWidth}px`,
                  top: `${heightList[_index]}px`,
                  left: `${_index * itemWidth}px`,
                };
                heightList[_index] += _listHeight[index + imgLazyStartIndex];
              });
            listHeight.value = Math.max(...heightList);
            imgLazyStartIndex = imgLazyEndIndex;
          });
      };
      _execWaterfull();
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
