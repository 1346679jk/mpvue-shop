<template>
  <div>
    <!-- 搜索 -->
    <search-bar></search-bar>
    <!-- 轮播图 -->
    <swiper indicator-dots autoplay>
      <swiper-item v-for="(item,index) in imgUrls" :key="index">
        <img :src="item" class="slide-image">
      </swiper-item>
    </swiper>
    <!-- 菜单 -->
    <div class="menu">
      <img v-for="(item, index) in menus" :src="item.image_src" :key="index">
    </div>
    <!-- 楼层 -->
    <div class="floor" v-for="(item,index) in floors" :key="index">
      <div class="floor-title">
        <img :src="item.floor_title.image_src" alt>
      </div>
      <div class="floor-content">
        <div class="left">
          <img :src="item.product_list[0].image_src" alt>
        </div>
        <div class="right">
          <img v-for="(img, i) in item.product_list" :key="i" v-if="i > 0" :src="img.image_src" alt>
        </div>
      </div>
    </div>
    <!-- 回到顶部 -->
    <div class="to-top" @click="goTop" v-if="isShow">
      ︿
      <p>顶部</p>
    </div>
  </div>
</template>

<script>
import request from "../../utils/request.js";
import SearchBar from "../../components/searchbar.vue";
export default {
  created() {
    this.initData();
  },
  data() {
    return {
      imgUrls: [],
      menus: [],
      floors: [],
      isShow: false
    };
  },
  components: {
    "search-bar": SearchBar
  },
  methods: {
    async initData() {
      // 轮播图接口调用
      let res = await request("home/swiperdata");
      // console.log(res);
      let list = res.data.message;
      this.imgUrls = list.map(item => {
        return item.image_src;
      });
      // 菜单接口调用
      let menuRes = await request("home/catitems");
      // console.log(menuRes);
      this.menus = menuRes.data.message;
      // 楼层调用
      let floorRes = await request("home/floordata");
      this.floors = floorRes.data.message;
      // console.log(this.floors);
    },
    goTop() {
      mpvue.pageScrollTo({
        scrollTop: 0
      });
    }
  },
  onPageScroll(event) {
    this.isShow = event.scrollTop > 50;
  },
  onPullDownRefresh() {
    this.initData();
  }
};
</script>

<style scoped>
.slide-image {
  width: 750rpx;
}
.menu {
  display: flex;
  justify-content: space-around;
}
.menu img {
  width: 128rpx;
  height: 140rpx;
}
.floor {
  margin-top: 20rpx;
}
.floor .floor-title img {
  width: 100%;
  height: 80rpx;
}
.floor .floor-content {
  display: flex;
  padding: 20rpx;
}
.floor .floor-content .left {
  width: 240rpx;
}
.floor .floor-content .left img {
  width: 240rpx;
  height: 385rpx;
}
.floor .floor-content .right {
  flex: 1;
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
}
.floor .floor-content .right img {
  width: 232rpx;
  height: 188rpx;
  border-radius: 4px;
}
.to-top {
  width: 100rpx;
  height: 100rpx;
  border-radius: 50%;
  background-color: rgba(255, 255, 255, 0.8);
  position: fixed;
  right: 40rpx;
  bottom: 40rpx;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 28rpx;
}
</style>
