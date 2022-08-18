<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" size="small" :inline="true" v-show="showSearch" label-width="68px">
      <el-form-item label="查询人姓名" prop="infoName">
        <el-input
          v-model="queryParams.infoName"
          placeholder="请输入查询人姓名"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="班尼特基础攻击" prop="bntRoleAttack">
        <el-input
          v-model="queryParams.bntRoleAttack"
          placeholder="请输入班尼特基础攻击"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="班尼特武器攻击" prop="bntEaponAttack">
        <el-input
          v-model="queryParams.bntEaponAttack"
          placeholder="请输入班尼特武器攻击"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="班尼特大招倍率" prop="bntLv">
        <el-input
          v-model="queryParams.bntLv"
          placeholder="请输入班尼特大招倍率"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="角色名字" prop="roleName">
        <el-input
          v-model="queryParams.roleName"
          placeholder="请输入角色名字"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="角色基础攻击力" prop="roleAttack">
        <el-input
          v-model="queryParams.roleAttack"
          placeholder="请输入角色基础攻击力"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="角色武器攻击力" prop="roleWeaponAttack">
        <el-input
          v-model="queryParams.roleWeaponAttack"
          placeholder="请输入角色武器攻击力"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="羽毛攻击" prop="zgjFeatherAttack">
        <el-input
          v-model="queryParams.zgjFeatherAttack"
          placeholder="请输入羽毛攻击"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="圣遗物副属性" prop="zgjRelicAttribute">
        <el-input
          v-model="queryParams.zgjRelicAttribute"
          placeholder="请输入圣遗物副属性"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="攻击增加区" prop="zgjAttackUp">
        <el-input
          v-model="queryParams.zgjAttackUp"
          placeholder="请输入攻击增加区"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="元素增伤" prop="hurtupElement">
        <el-input
          v-model="queryParams.hurtupElement"
          placeholder="请输入元素增伤"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="大招增伤" prop="hurtupBigmove">
        <el-input
          v-model="queryParams.hurtupBigmove"
          placeholder="请输入大招增伤"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="角色等级" prop="fyRoleLv">
        <el-input
          v-model="queryParams.fyRoleLv"
          placeholder="请输入角色等级"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="怪物等级" prop="fyGwLv">
        <el-input
          v-model="queryParams.fyGwLv"
          placeholder="请输入怪物等级"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="无视防御减免" prop="fyWsfy">
        <el-input
          v-model="queryParams.fyWsfy"
          placeholder="请输入无视防御减免"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="怪物抗性" prop="kxGw">
        <el-input
          v-model="queryParams.kxGw"
          placeholder="请输入怪物抗性"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="减少抗性" prop="kxLessen">
        <el-input
          v-model="queryParams.kxLessen"
          placeholder="请输入减少抗性"
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
          v-hasPermi="['system:roleinfo:add']"
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
          v-hasPermi="['system:roleinfo:edit']"
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
          v-hasPermi="['system:roleinfo:remove']"
        >删除</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="warning"
          plain
          icon="el-icon-download"
          size="mini"
          @click="handleExport"
          v-hasPermi="['system:roleinfo:export']"
        >导出</el-button>
      </el-col>
      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table v-loading="loading" :data="roleinfoList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="id" align="center" prop="id" />
      <el-table-column label="查询人姓名" align="center" prop="infoName" />
      <el-table-column label="班尼特基础攻击" align="center" prop="bntRoleAttack" />
      <el-table-column label="班尼特武器攻击" align="center" prop="bntEaponAttack" />
      <el-table-column label="班尼特大招倍率" align="center" prop="bntLv" />
      <el-table-column label="角色名字" align="center" prop="roleName" />
      <el-table-column label="角色基础攻击力" align="center" prop="roleAttack" />
      <el-table-column label="角色武器攻击力" align="center" prop="roleWeaponAttack" />
      <el-table-column label="羽毛攻击" align="center" prop="zgjFeatherAttack" />
      <el-table-column label="圣遗物副属性" align="center" prop="zgjRelicAttribute" />
      <el-table-column label="攻击增加区" align="center" prop="zgjAttackUp" />
      <el-table-column label="元素增伤" align="center" prop="hurtupElement" />
      <el-table-column label="大招增伤" align="center" prop="hurtupBigmove" />
      <el-table-column label="角色等级" align="center" prop="fyRoleLv" />
      <el-table-column label="怪物等级" align="center" prop="fyGwLv" />
      <el-table-column label="无视防御减免" align="center" prop="fyWsfy" />
      <el-table-column label="怪物抗性" align="center" prop="kxGw" />
      <el-table-column label="减少抗性" align="center" prop="kxLessen" />
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['system:roleinfo:edit']"
          >修改</el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['system:roleinfo:remove']"
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

    <!-- 添加或修改原神角色信息对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="500px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="查询人姓名" prop="infoName">
          <el-input v-model="form.infoName" placeholder="请输入查询人姓名" />
        </el-form-item>
        <el-form-item label="班尼特基础攻击" prop="bntRoleAttack">
          <el-input v-model="form.bntRoleAttack" placeholder="请输入班尼特基础攻击" />
        </el-form-item>
        <el-form-item label="班尼特武器攻击" prop="bntEaponAttack">
          <el-input v-model="form.bntEaponAttack" placeholder="请输入班尼特武器攻击" />
        </el-form-item>
        <el-form-item label="班尼特大招倍率" prop="bntLv">
          <el-input v-model="form.bntLv" placeholder="请输入班尼特大招倍率" />
        </el-form-item>
        <el-form-item label="角色名字" prop="roleName">
          <el-input v-model="form.roleName" placeholder="请输入角色名字" />
        </el-form-item>
        <el-form-item label="角色基础攻击力" prop="roleAttack">
          <el-input v-model="form.roleAttack" placeholder="请输入角色基础攻击力" />
        </el-form-item>
        <el-form-item label="角色武器攻击力" prop="roleWeaponAttack">
          <el-input v-model="form.roleWeaponAttack" placeholder="请输入角色武器攻击力" />
        </el-form-item>
        <el-form-item label="羽毛攻击" prop="zgjFeatherAttack">
          <el-input v-model="form.zgjFeatherAttack" placeholder="请输入羽毛攻击" />
        </el-form-item>
        <el-form-item label="圣遗物副属性" prop="zgjRelicAttribute">
          <el-input v-model="form.zgjRelicAttribute" placeholder="请输入圣遗物副属性" />
        </el-form-item>
        <el-form-item label="攻击增加区" prop="zgjAttackUp">
          <el-input v-model="form.zgjAttackUp" placeholder="请输入攻击增加区" />
        </el-form-item>
        <el-form-item label="元素增伤" prop="hurtupElement">
          <el-input v-model="form.hurtupElement" placeholder="请输入元素增伤" />
        </el-form-item>
        <el-form-item label="大招增伤" prop="hurtupBigmove">
          <el-input v-model="form.hurtupBigmove" placeholder="请输入大招增伤" />
        </el-form-item>
        <el-form-item label="角色等级" prop="fyRoleLv">
          <el-input v-model="form.fyRoleLv" placeholder="请输入角色等级" />
        </el-form-item>
        <el-form-item label="怪物等级" prop="fyGwLv">
          <el-input v-model="form.fyGwLv" placeholder="请输入怪物等级" />
        </el-form-item>
        <el-form-item label="无视防御减免" prop="fyWsfy">
          <el-input v-model="form.fyWsfy" placeholder="请输入无视防御减免" />
        </el-form-item>
        <el-form-item label="怪物抗性" prop="kxGw">
          <el-input v-model="form.kxGw" placeholder="请输入怪物抗性" />
        </el-form-item>
        <el-form-item label="减少抗性" prop="kxLessen">
          <el-input v-model="form.kxLessen" placeholder="请输入减少抗性" />
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
import { listRoleinfo, getRoleinfo, delRoleinfo, addRoleinfo, updateRoleinfo } from "@/api/system/roleinfo";

export default {
  name: "Roleinfo",
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
      // 原神角色信息表格数据
      roleinfoList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        infoName: null,
        bntRoleAttack: null,
        bntEaponAttack: null,
        bntLv: null,
        roleName: null,
        roleAttack: null,
        roleWeaponAttack: null,
        zgjFeatherAttack: null,
        zgjRelicAttribute: null,
        zgjAttackUp: null,
        hurtupElement: null,
        hurtupBigmove: null,
        fyRoleLv: null,
        fyGwLv: null,
        fyWsfy: null,
        kxGw: null,
        kxLessen: null
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
    /** 查询原神角色信息列表 */
    getList() {
      this.loading = true;
      listRoleinfo(this.queryParams).then(response => {
        this.roleinfoList = response.rows;
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
        infoName: null,
        bntRoleAttack: null,
        bntEaponAttack: null,
        bntLv: null,
        roleName: null,
        roleAttack: null,
        roleWeaponAttack: null,
        zgjFeatherAttack: null,
        zgjRelicAttribute: null,
        zgjAttackUp: null,
        hurtupElement: null,
        hurtupBigmove: null,
        fyRoleLv: null,
        fyGwLv: null,
        fyWsfy: null,
        kxGw: null,
        kxLessen: null
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
      this.title = "添加原神角色信息";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const id = row.id || this.ids
      getRoleinfo(id).then(response => {
        this.form = response.data;
        this.open = true;
        this.title = "修改原神角色信息";
      });
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.id != null) {
            updateRoleinfo(this.form).then(response => {
              this.$modal.msgSuccess("修改成功");
              this.open = false;
              this.getList();
            });
          } else {
            addRoleinfo(this.form).then(response => {
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
      this.$modal.confirm('是否确认删除原神角色信息编号为"' + ids + '"的数据项？').then(function() {
        return delRoleinfo(ids);
      }).then(() => {
        this.getList();
        this.$modal.msgSuccess("删除成功");
      }).catch(() => {});
    },
    /** 导出按钮操作 */
    handleExport() {
      this.download('system/roleinfo/export', {
        ...this.queryParams
      }, `roleinfo_${new Date().getTime()}.xlsx`)
    }
  }
};
</script>
