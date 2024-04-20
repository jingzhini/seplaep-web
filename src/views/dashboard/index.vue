<template>
  <div class="dashboard-container">
    <div class="dashboard-text">欢迎您: {{ name }}</div>

    <!-- <panel-group @handleSetLineChartData="handleSetLineChartData" /> -->
    <panel-group />
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import PanelGroup from "./components/PanelGroup";

export default {
  name: "Dashboard",
  components: {
    PanelGroup,
  },
  computed: {
    ...mapGetters(["name"]),
  },
};
</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
</style>
