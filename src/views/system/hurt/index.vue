<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" size="small" :inline="true" v-show="showSearch" label-width="68px">
      <el-form-item label="查询人姓名" prop="hurtName">
        <el-input
          v-model="queryParams.hurtName"
          placeholder="请输入查询人姓名"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="最终攻击力乘区" prop="xcZgj">
        <el-input
          v-model="queryParams.xcZgj"
          placeholder="请输入最终攻击力乘区"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="技能倍率乘区" prop="xcJn">
        <el-input
          v-model="queryParams.xcJn"
          placeholder="请输入技能倍率乘区"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="元素增伤乘区" prop="xcHurtup">
        <el-input
          v-model="queryParams.xcHurtup"
          placeholder="请输入元素增伤乘区"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="怪物防御减免乘区" prop="xcFy">
        <el-input
          v-model="queryParams.xcFy"
          placeholder="请输入怪物防御减免乘区"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="怪物抗性乘区" prop="xcKx">
        <el-input
          v-model="queryParams.xcKx"
          placeholder="请输入怪物抗性乘区"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="爆伤乘区" prop="xcBs">
        <el-input
          v-model="queryParams.xcBs"
          placeholder="请输入爆伤乘区"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery">搜索</el-button>
        <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button>
      </el-form-item>
    </el-form>

    <el-row :gutter="10" class="mb8">
      <el-col :span="1.5">
        <el-button
          type="primary"
          plain
          icon="el-icon-plus"
          size="mini"
          @click="handleAdd"
          v-hasPermi="['system:hurt:add']"
        >新增</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="success"
          plain
          icon="el-icon-edit"
          size="mini"
          :disabled="single"
          @click="handleUpdate"
          v-hasPermi="['system:hurt:edit']"
        >修改</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="danger"
          plain
          icon="el-icon-delete"
          size="mini"
          :disabled="multiple"
          @click="handleDelete"
          v-hasPermi="['system:hurt:remove']"
        >删除</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="warning"
          plain
          icon="el-icon-download"
          size="mini"
          @click="handleExport"
          v-hasPermi="['system:hurt:export']"
        >导出</el-button>
      </el-col>
      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table v-loading="loading" :data="hurtList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="id" align="center" prop="id" />
      <el-table-column label="查询人姓名" align="center" prop="hurtName" />
      <el-table-column label="最终攻击力乘区" align="center" prop="xcZgj" />
      <el-table-column label="技能倍率乘区" align="center" prop="xcJn" />
      <el-table-column label="元素增伤乘区" align="center" prop="xcHurtup" />
      <el-table-column label="怪物防御减免乘区" align="center" prop="xcFy" />
      <el-table-column label="怪物抗性乘区" align="center" prop="xcKx" />
      <el-table-column label="爆伤乘区" align="center" prop="xcBs" />
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['system:hurt:edit']"
          >修改</el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['system:hurt:remove']"
          >删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    
    <pagination
      v-show="total>0"
      :total="total"
      :page.sync="queryParams.pageNum"
      :limit.sync="queryParams.pageSize"
      @pagination="getList"
    />

    <!-- 添加或修改原神伤害计算对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="500px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="查询人姓名" prop="hurtName">
          <el-input v-model="form.hurtName" placeholder="请输入查询人姓名" />
        </el-form-item>
        <el-form-item label="最终攻击力乘区" prop="xcZgj">
          <el-input v-model="form.xcZgj" placeholder="请输入最终攻击力乘区" />
        </el-form-item>
        <el-form-item label="技能倍率乘区" prop="xcJn">
          <el-input v-model="form.xcJn" placeholder="请输入技能倍率乘区" />
        </el-form-item>
        <el-form-item label="元素增伤乘区" prop="xcHurtup">
          <el-input v-model="form.xcHurtup" placeholder="请输入元素增伤乘区" />
        </el-form-item>
        <el-form-item label="怪物防御减免乘区" prop="xcFy">
          <el-input v-model="form.xcFy" placeholder="请输入怪物防御减免乘区" />
        </el-form-item>
        <el-form-item label="怪物抗性乘区" prop="xcKx">
          <el-input v-model="form.xcKx" placeholder="请输入怪物抗性乘区" />
        </el-form-item>
        <el-form-item label="爆伤乘区" prop="xcBs">
          <el-input v-model="form.xcBs" placeholder="请输入爆伤乘区" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm">确 定</el-button>
        <el-button @click="cancel">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { listHurt, getHurt, delHurt, addHurt, updateHurt } from "@/api/system/hurt";

export default {
  name: "Hurt",
  data() {
    return {
      // 遮罩层
      loading: true,
      // 选中数组
      ids: [],
      // 非单个禁用
      single: true,
      // 非多个禁用
      multiple: true,
      // 显示搜索条件
      showSearch: true,
      // 总条数
      total: 0,
      // 原神伤害计算表格数据
      hurtList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        hurtName: null,
        xcZgj: null,
        xcJn: null,
        xcHurtup: null,
        xcFy: null,
        xcKx: null,
        xcBs: null
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
      }
    };
  },
  created() {
    this.getList();
  },
  methods: {
    /** 查询原神伤害计算列表 */
    getList() {
      this.loading = true;
      listHurt(this.queryParams).then(response => {
        this.hurtList = response.rows;
        this.total = response.total;
        this.loading = false;
      });
    },
    // 取消按钮
    cancel() {
      this.open = false;
      this.reset();
    },
    // 表单重置
    reset() {
      this.form = {
        id: null,
        hurtName: null,
        xcZgj: null,
        xcJn: null,
        xcHurtup: null,
        xcFy: null,
        xcKx: null,
        xcBs: null
      };
      this.resetForm("form");
    },
    /** 搜索按钮操作 */
    handleQuery() {
      this.queryParams.pageNum = 1;
      this.getList();
    },
    /** 重置按钮操作 */
    resetQuery() {
      this.resetForm("queryForm");
      this.handleQuery();
    },
    // 多选框选中数据
    handleSelectionChange(selection) {
      this.ids = selection.map(item => item.id)
      this.single = selection.length!==1
      this.multiple = !selection.length
    },
    /** 新增按钮操作 */
    handleAdd() {
      this.reset();
      this.open = true;
      this.title = "添加原神伤害计算";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const id = row.id || this.ids
      getHurt(id).then(response => {
        this.form = response.data;
        this.open = true;
        this.title = "修改原神伤害计算";
      });
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.id != null) {
            updateHurt(this.form).then(response => {
              this.$modal.msgSuccess("修改成功");
              this.open = false;
              this.getList();
            });
          } else {
            addHurt(this.form).then(response => {
              this.$modal.msgSuccess("新增成功");
              this.open = false;
              this.getList();
            });
          }
        }
      });
    },
    /** 删除按钮操作 */
    handleDelete(row) {
      const ids = row.id || this.ids;
      this.$modal.confirm('是否确认删除原神伤害计算编号为"' + ids + '"的数据项？').then(function() {
        return delHurt(ids);
      }).then(() => {
        this.getList();
        this.$modal.msgSuccess("删除成功");
      }).catch(() => {});
    },
    /** 导出按钮操作 */
    handleExport() {
      this.download('system/hurt/export', {
        ...this.queryParams
      }, `hurt_${new Date().getTime()}.xlsx`)
    }
  }
};
</script>
