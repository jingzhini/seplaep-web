<template>
  <div class="app-container">
    <!-- 顶部输入框，查询按钮等 -->

    <div>
      <FilenameOption v-model="name" />
      <!-- <AutoWidthOption v-model="autoWidth" /> -->
      <!-- <BookTypeOption v-model="bookType" /> -->
    </div>

    <!-- 分页列表 -->
    <el-table
      v-loading="listLoading"
      :data="list"
      element-loading-text="Loading"
      border
      fit
      highlight-current-row
    >
      <el-table-column align="center" label="用户ID" width="95">
        <template slot-scope="scope">
          <!-- {{ scope.$index }} -->
          {{ scope.row.id }}
        </template>
      </el-table-column>

      <el-table-column label="name">
        <template slot-scope="scope">
          {{ scope.row.name }}
        </template>
      </el-table-column>
      <el-table-column label="nickName">
        <template slot-scope="scope">
          {{ scope.row.nickName }}
        </template>
      </el-table-column>

      <el-table-column label="avatar">
        <template slot-scope="scope">
          <img
            :src="getImgUrl(scope.row.avatar)"
            style="width: 50px; height: 50px"
          />
          <!-- {{ this. }} -->
        </template>
      </el-table-column>

      <el-table-column label="sex">
        <template slot-scope="scope">
          {{ scope.row.sex }}
        </template>
      </el-table-column>

      <el-table-column label="phone">
        <template slot-scope="scope">
          {{ scope.row.phone }}
        </template>
      </el-table-column>

      <el-table-column label="password">
        <template slot-scope="scope">
          {{ scope.row.password }}
        </template>
      </el-table-column>

      <el-table-column label="role">
        <template slot-scope="scope">
          {{ scope.row.role }}
        </template>
      </el-table-column>

      <!-- <el-table-column label="Author" width="110" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.author }}</span>
          </template>
        </el-table-column>
        <el-table-column label="Pageviews" width="110" align="center">
          <template slot-scope="scope">
            {{ scope.row.pageviews }}
          </template>
        </el-table-column> -->

      <el-table-column
        class-name="status-col"
        label="deleteStatus"
        width="110"
        align="center"
      >
        <template slot-scope="scope">
          <!-- <el-tag :type="scope.row.deleteStatus | statusFilter"> -->
          <el-tag
            :type="
              (scope.row.deleteStatus === 0 ? 'published' : 'deleted')
                | statusFilter
            "
          >
            {{ scope.row.deleteStatus }}
            <!-- {{ scope.row.deleteStatus === 0 ? "published" : "deleted" }} -->
          </el-tag>
        </template>
      </el-table-column>

      <el-table-column
        align="center"
        prop="creatTime"
        label="creatTime"
        width="200"
      >
        <template slot-scope="scope">
          <i class="el-icon-time" />
          <span>{{ scope.row.creatTime }}</span>
        </template>
      </el-table-column>

      <el-table-column
        align="center"
        prop="updateTime"
        label="updateTime"
        width="200"
      >
        <template slot-scope="scope">
          <i class="el-icon-time" />
          <span>{{ scope.row.updateTime }}</span>
        </template>
      </el-table-column>

      <!-- 操作列 -->
      <el-table-column
        label="Actions"
        align="center"
        width="230"
        class-name="small-padding fixed-width"
      >
        <template slot-scope="{ row, $index }">
          <el-button type="primary" size="mini" @click="handleUpdate(row)">
            修改
          </el-button>
          <!-- <el-button v-if="row.status!='published'" size="mini" type="success" @click="handleModifyStatus(row,'published')">
              发布
            </el-button> -->
          <!-- <el-button v-if="row.status!='draft'" size="mini" @click="handleModifyStatus(row,'draft')">
              草稿
            </el-button> -->
          <el-button
            v-if="row.deleteStatus != 1"
            size="mini"
            type="danger"
            @click="handleDelete(row, $index)"
          >
            删除
          </el-button>
          <el-button
            v-if="row.deleteStatus != 0"
            size="mini"
            type="danger"
            @click="handleDelete(row, $index)"
          >
            取消删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页 -->
    <pagination
      v-show="total > 0"
      :total="total"
      :page.sync="listQuery.current"
      :limit.sync="listQuery.size"
      @pagination="fetchData"
    />
  </div>
</template>

<script>
import { getList } from "@/api/table";
import { getFullImgUrl } from "@/utils/index";
import FilenameOption from "./components/FilenameOption";
import AutoWidthOption from "./components/AutoWidthOption";
import BookTypeOption from "./components/BookTypeOption";
import { Pagination } from "@/components/Pagination";
import waves from "@/directive/waves"; // waves directive

export default {
  components: { FilenameOption, AutoWidthOption, BookTypeOption, Pagination },
  directives: { waves },
  filters: {
    statusFilter(status) {
      const statusMap = {
        published: "success",
        draft: "gray",
        deleted: "danger",
      };
      return statusMap[status];
    },
  },
  data() {
    return {
      list: null,
      listLoading: true,
      name: "",
      // autoWidth: true,
      // bookType: "xlsx",
      total: 0,
      listQuery: {
        current: 1,
        size: 5,
      },
    };
  },
  created() {
    this.fetchData();
  },
  methods: {
    // getList() {
    //   this.listLoading = true;
    //   fetchList(this.listQuery).then((response) => {
    //     this.list = response.data.items;
    //     this.total = response.data.total;

    //     // Just to simulate the time of the request
    //     setTimeout(() => {
    //       this.listLoading = false;
    //     }, 1.5 * 1000);
    //   });
    // },
    getImgUrl(url) {
      return getFullImgUrl(url);
    },
    fetchData() {
      this.listLoading = true;
      // const params = { current: 1, size: 5 };
      getList(this.listQuery).then((response) => {
        this.list = response.data.records;
        this.total = response.data.total;
        this.listLoading = false;

        console.log("this.list :>> ", this.list);
      });
    },
    handleUpdate(row) {
      this.temp = Object.assign({}, row); // copy obj
      this.temp.timestamp = new Date(this.temp.timestamp);
      this.dialogStatus = "update";
      this.dialogFormVisible = true;
      this.$nextTick(() => {
        this.$refs["dataForm"].clearValidate();
      });
    },
    handleModifyStatus(row, status) {
      this.$message({
        message: "操作Success",
        type: "success",
      });
      row.status = status;
    },
    handleDelete(row, index) {
      this.$notify({
        title: "Success",
        message: "Delete Successfully",
        type: "success",
        duration: 2000,
      });
      this.list.splice(index, 1);
    },
  },
};
</script>
