import { mount, shallowMount } from "@vue/test-utils";
import Waterfull from "@/waterfull.vue";
import { nextTick } from "@vue/runtime-core";
const mockList = [
  {
    url: "https://b3logfile.com/file/2021/09/caa0e846acc5cde6.jpg_q70.dpg-d649516d.webp",
    name: "买一只送一只】土记 新鲜2年散养土鸡 活鸡现杀现发老母鸡肉 生鲜走地鸡笨鸡柴鸡整鸡 杀前约3斤左右 整只装",
  },
  {
    url: "https://b3logfile.com/file/2021/09/u_4241162085_3588743387_fm_26_fmt_auto_gp_0-ffa7bbd7.webp",
    name: "夏天抖音同款贵夫人香水女士淡香清新妇留香法国桂花 贵夫人粉红限量版 一瓶 80mL",
  },
  {
    url: "https://b3logfile.com/file/2021/09/u_2510891666_2454567058_fm_26_fmt_auto-beeae6b9.webp",
    name: "百雀羚面膜女保湿化妆品护肤品套装 小雀幸补水紧致面膜30片装(静润、紧弹、清滢、澄净、清澈随机发",
  },
  {
    url: "https://b3logfile.com/file/2021/09/u_2102736929_2417598652_fm_26_fmt_auto-f077634c.webp",
    name: "苏泊尔（SUPOR）电饭煲电饭锅4L新蓝钻球釜内胆特色烘焙 发面功能2-6人多功能家用智能电饭煲40FC873",
  },
  {
    url: "https://b3logfile.com/file/2021/09/src_http___bpic.588ku.com_element_origin_min_pic_16_07_04_17577a32ae4b66a-696c18a2.jpeg",
    name: "三只松鼠每日坚果 750g/30袋 中秋送礼坚果礼盒零食大礼包儿童孕妇节日混合干果腰果夏威夷果核桃仁开心果",
  },
];

describe("Waterfull.vue", () => {
  it("Waterfull exit", () => {
    const wrapper = mount(Waterfull, {
      props: { list: mockList, column: 2 },
    });
    expect(wrapper.exists()).toBe(true);
  });
  it("list number test", () => {
    const wrapper = mount(Waterfull, {
      props: { list: mockList, column: 2 },
    });
    expect(wrapper.findAll(".__list_item__").length).toEqual(5);
  });
});
