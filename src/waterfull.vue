<!--  -->
<template>
  <div class="waterfull" ref="waterfull" :style="{ height: listHeight + 'px' }">
    <template v-for="(item, index) in listStyle" :key="index">
      <div class="list-item" :style="listStyle[index]">
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
        console.log("list change----");
        execWaterfull();
      }
    );
    const execWaterfull = () => {
      let heightList = [0, 0, 0];
      //可能存在padding
      const listWidth = document.defaultView
        ? parseFloat(
            document.defaultView!.getComputedStyle(
              waterfull.value as unknown as HTMLElement
            ).width
          )
        : (waterfull.value as unknown as HTMLElement).clientWidth;

      const itemWidth = listWidth / column.value;
      list.value.forEach((item: FileItem, index: number) => {
        const _index = heightList.findIndex(
          (item: number) => item == Math.min(...heightList)
        );
        heightList[_index] += item.height;
        listStyle[index] = {
          height: `${item.height}px`,
          width: `${itemWidth}px`,
          top: `${heightList[_index]}px`,
          left: `${_index * itemWidth}px`,
        };
      });
      listHeight.value = Math.max(...heightList);
    };
    onMounted(() => {
      execWaterfull();
    });
    return {
      listStyle,
      waterfull,
      listHeight,
    };
  },
});
</script>
<style lang="less" scoped>
//@import url(); 引入公共css类
.waterfull {
  position: relative;
  .list-item {
    position: absolute;
  }
}
</style>
