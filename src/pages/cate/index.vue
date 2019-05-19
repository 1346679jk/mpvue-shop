<template>
  <div>
    <!-- 搜索条 -->
    <search-bar></search-bar>
    <!-- 菜单和内容 -->
    <div class="content">
      <div class="left">
        <div
          @click="changeBrand(index)"
          class="menu-item"
          v-for="(item,index) in cate"
          :key="index"
          :class="{active: currentId == index}"
        >{{item.cat_name}}</div>
      </div>
      <div class="right">
        <div class="brand-item" v-for="item1 in getRightData" :key="item1.cat_id">
          <div class="brand-title">{{item1.cat_name}}</div>
          <div class="brand-list">
            <div class="brand" v-for="(img, i) in item1.children" :key="i">
              <img :src="img.cat_icon" alt>
              <p>{{img.cat_name}}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import request from "../../utils/request.js";
import SearchBar from "../../components/searchbar.vue";
export default {
  created() {
    this.cateData();
  },
  data() {
    return {
      cate: [],
      currentId: 0
    };
  },
  computed: {
    getRightData() {
      let ret = this.cate.length > 0 && this.cate[this.currentId].children;
      // console.log(ret);
      return ret;
    }
  },
  methods: {
    async cateData() {
      let ret = await request("categories");
      // console.log(ret);
      this.cate = ret.data.message;
      // console.log(this.cate);
    },
    changeBrand(index) {
      this.currentId = index;
    }
  },
  components: {
    "search-bar": SearchBar
  }
};
</script>

<style scoped lang="scss">
@import "main.scss";
</style>
