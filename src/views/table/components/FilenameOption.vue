<template>
  <div style="display: inline-block">
    <label class="radio-label" style="padding-left: 0">name: </label>
    <el-input
      v-model="filename"
      placeholder="Please enter ……"
      style="width: 345px"
      prefix-icon="el-icon-document"
    />

    <el-button
      v-waves
      class="filter-item"
      type="primary"
      icon="el-icon-search"
      @click="handleFilter"
    >
      查询
    </el-button>
    <el-button
      class="filter-item"
      style="margin-left: 10px"
      type="primary"
      icon="el-icon-edit"
      @click="handleCreate"
    >
      添加
    </el-button>
    <!-- <a
        href="https://panjiachen.github.io/vue-element-admin-site/feature/component/excel.html"
        target="_blank"
        style="margin-left: 15px"
      >
        <el-tag type="info">Documentation</el-tag>
      </a> -->
  </div>
</template>

<script>
import { Message } from "element-ui";
import waves from "@/directive/waves"; // waves directive

export default {
  directives: { waves },
  props: {
    value: {
      type: String,
      default: "",
    },
  },
  computed: {
    filename: {
      get() {
        return this.value;
      },
      set(val) {
        this.$emit("input", val);
      },
    },
  },
  data() {
    return {};
  },
  methods: {
    handleSearch() {
      Message.info("you hass click it once!");
    },
    handleFilter() {},
    handleCreate() {},
  },
};
</script>

<style lang="scss" scoped>
.filter-item {
  display: inline-block;
  vertical-align: middle;
  margin: 0 0 10px 10px;
}
</style>
