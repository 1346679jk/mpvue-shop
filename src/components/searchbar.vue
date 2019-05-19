<template>
  <div>
    <div class="search">
      <div class="search-bar">
        <icon type="search"/>
        <span>搜索</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  }
};
</script>

<style lang="scss" scoped>
.search {
  background-color: #eb4450;
  padding: 10px;
  .search-bar {
    background-color: #fff;
    text-align: center;
    icon {
      vertical-align: middle;
    }
  }
}
</style>
