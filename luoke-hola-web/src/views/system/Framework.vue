<!--  -->
<template>
    <div class='system frame'>
        <el-header>
            <Header :showNav="showNav" :userLogin="userLogin" :activeIndex="activeIndex"></Header>
        </el-header>
        <el-container class="body-container">
            <el-aside width="220px">
                <Nav :activeIndex="navIndex"></Nav>
            </el-aside>
            <el-main>
                <div class="main-div">
                    <div class="main-div-title">部门架构</div>
                    <div class="main-div-count" style="min-height: 474px;">
                        <el-tree :data="data" node-key="id" default-expand-all :expand-on-click-node="false" :render-content="renderContent">
                        </el-tree>
                    </div>
                </div>
            </el-main>
            <el-dialog :title="dlgTitle" :visible.sync="showEditDlg" width="500px">
                <el-form ref="form" :model="form" label-width="0">
                    <el-form-item label="" prop="">
                        <div>{{editName}}</div>
                        <el-select v-model="form.editVal" placeholder="请选择" v-if="form.edType=='移动到'" style="width:100%;">
                            <el-option v-for="item in selArr" :key="item.id" :label="item.label" :value="item.id" v-if="item.id!=form.id&&item.id!=form.fullData.parent">
                            </el-option>
                        </el-select>
                        <el-input v-model="form.editVal" v-else></el-input>
                    </el-form-item>
                </el-form>
                <span slot="footer" class="dialog-footer">
                    <el-button @click="showEditDlg = false">取 消</el-button>
                    <el-button type="primary" @click="updatedDept()">确 定</el-button>
                </span>
            </el-dialog>
        </el-container>
    </div>
</template>
<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import Header from '@/components/Header.vue'
import Nav from '@/views/system/Nav.vue'
export default {
    //import引入的组件需要注入到对象中才能使用
    components: {
        Header,
        Nav
    },
    data() {
        //这里存放数据
        const data = [];
        return {
            form: {

            },
            selArr: [],
            showEditDlg: false,
            dlgTitle: "",
            editName: "",
            data: [],
            showNav: true,
            userLogin: false,
            activeIndex: '3',
            navIndex: '2',
        };
    },
    //监听属性 类似于data概念
    computed: {},
    //监控data中的数据变化
    watch: {},
    //方法集合
    methods: {
        updatedDept() {
            var _this = this;
            var form = _this.form;
            var edType = form.edType;
            var successFun = function() {};
            var data = "";
            switch (edType) {
                case "重命名":
                    if (!form.editVal) {
                        _this.$message({
                            message: "请输入名称",
                            type: "error"
                        });
                        return;
                    }
                    data = {
                        id: form.id,
                        name: form.editVal
                    };
                    successFun = function() {
                        _this.showEditDlg = false;
                        _this.$message({
                            message: "修改成功",
                            type: "success"
                        });
                        _this.loadList();
                    };
                    break;
                case "新增":
                    if (!form.editVal) {
                        _this.$message({
                            message: "请输入名称",
                            type: "error"
                        });
                        return;
                    }
                    data = {
                        departmentId: form.id,
                        name: form.editVal
                    };
                    successFun = function() {
                        _this.showEditDlg = false;
                        _this.$message({
                            message: "新增成功",
                            type: "success"
                        });
                        _this.loadList();
                    };
                    break;
                case "移动到":
                    if (!form.editVal) {
                        _this.$message({
                            message: "请选择移动到哪个部门",
                            type: "error"
                        });
                        return;
                    }
                    data = {
                        id: form.id,
                        name: form.label,
                        departmentId: form.editVal
                    };
                    successFun = function() {
                        _this.showEditDlg = false;
                        _this.$message({
                            message: "移动成功",
                            type: "success"
                        });
                        _this.loadList();
                    };
                    break;
                case "删除":
                    var children = form.children;
                    var ids = [form.id];

                    function getIds(arr, cb) {
                        arr.forEach(function(n) {
                            if (n.children) {
                                getIds(n.children);
                            }
                            ids.push(n.id);
                        });
                        cb && cb();
                    }

                    function toNext() {
                        data = {
                            isDel: true,
                            ids: ids
                        };
                        successFun = function() {
                            _this.$message({
                                message: "删除成功",
                                type: "success"
                            });
                            _this.loadList();
                        };
                    }
                    if (children) {
                        getIds(children, toNext);
                    } else {
                        toNext();
                    }
                    break;
            }
            if (!data) return;
            _this.doAjax({
                url: "editTeamOrgDept",
                method: "post",
                data: data,
                success: successFun
            });
        },
        handleCommand(command) {
            var _this = this;
            var name = command.name;
            var data = command.data;
            data["edType"] = name;
            switch (name) {
                case "重命名":
                    _this.dlgTitle = "重命名";
                    _this.editName = "请输入新名称";
                    data["editVal"] = data.label;
                    _this.form = JSON.parse(JSON.stringify(data));
                    _this.showEditDlg = true;
                    break;
                case "新增":
                    _this.dlgTitle = "新增";
                    _this.editName = "请输入要新增的名称";
                    _this.form = JSON.parse(JSON.stringify(data));
                    _this.showEditDlg = true;
                    break;
                case "移动到":
                    _this.dlgTitle = "部门移动";
                    _this.editName = "将“" + data.label + "”移动到";
                    _this.form = JSON.parse(JSON.stringify(data));
                    _this.showEditDlg = true;
                    break;
                case "删除":
                    _this.form = JSON.parse(JSON.stringify(data));
                    _this.$confirm("将删除“" + data.label + "”及其子节点，是否继续", '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(() => {
                        _this.updatedDept();
                    }).catch(() => {});
                    break;
            }
        },
        renderContent(h, { node, data, store }) {
            var rightClass = "";
            if (data.id == -1) {
                rightClass = "elNone";
            }
            return (
                <span class="custom-tree-node" style="width: 100%;">
            <span>{node.label}</span>
            <span style="float: right;" class={rightClass}>
              <el-dropdown trigger="click" on-command={this.handleCommand}>
                <span class="el-dropdown-link">
                    <i class="el-icon-more"></i>
                </span>
                <el-dropdown-menu class="myDropMenu" slot="dropdown">
                    <el-dropdown-item command={{data:data,name:"重命名"}}>重命名</el-dropdown-item>
                    <el-dropdown-item command={{data:data,name:"新增"}}>新增</el-dropdown-item>
                    <el-dropdown-item command={{data:data,name:"移动到"}}>移动到</el-dropdown-item>
                    <el-dropdown-item command={{data:data,name:"删除"}}>删除</el-dropdown-item>
                </el-dropdown-menu>
                </el-dropdown>
            </span>
          </span>);
        },
        loadList() {
            var _this = this;
            _this.doAjax({
                url: "teamOrgList",
                method: "get",
                data: {
                    type: 1,
                    departmentId: _this.value || "",
                    keyword: _this.input || ""
                },
                success: function(ret) {
                    var list = ret.data;
                    var tableData = {};
                    var teamName = "";
                    var arr1 = [];
                    var selArr = [];
                    list.forEach(function(node) {
                        var parent = node.parent;
                        if (parent) {
                            tableData[parent] = tableData[parent] || [];
                            tableData[parent].push({
                                id: node.id,
                                label: node.name,
                                fullData: node
                            });
                        } else {
                            arr1.push({
                                id: node.id,
                                label: node.name,
                                fullData: node
                            });
                        }
                        selArr.push({
                            id: node.id,
                            label: node.name,
                        });
                        teamName = node.team.name
                    });
                    _this.selArr = selArr;
                    arr1 = _this.checkChild(arr1, tableData);
                    _this.data = [{
                        id: "-1",
                        label: teamName,
                        children: arr1
                    }];
                }
            });
        },
        checkChild(arr, obj) {
            var _this = this;
            arr.forEach(function(node) {
                if (obj[node.id]) {
                    obj[node.id] = _this.checkChild(obj[node.id], obj);
                    node["children"] = obj[node.id];
                }
            });
            return arr;
        }
    },
    //生命周期 - 创建完成（可以访问当前this实例）
    created() {
        this.loadList();
    },
    //生命周期 - 挂载完成（可以访问DOM元素）
    mounted() {

    },
    beforeCreate() {}, //生命周期 - 创建之前
    beforeMount() {}, //生命周期 - 挂载之前
    beforeUpdate() {}, //生命周期 - 更新之前
    updated() {}, //生命周期 - 更新之后
    beforeDestroy() {}, //生命周期 - 销毁之前
    destroyed() {}, //生命周期 - 销毁完成
    activated() {}, //如果页面有keep-alive缓存功能，这个函数会触发
}
</script>
<style lang='scss' scoped>
//@import url(); 引入公共css类
.system .lists {
    width: 50%;
    float: left;
}

.system .lists .shi {
    width: 250px;
}

.system .lists .lists-title {
    font-size: 16px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: rgba(144, 145, 156, 1);
}

.system .form-a {
    font-size: 14px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: rgba(245, 108, 108, 1);
}

.system .form-b {
    font-size: 12px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: rgba(92, 97, 113, 1);
    line-height: 17px;
}

.system .main-div-nav {
    text-align: center;
    padding: 20px 0px;
}

.system .main-div {
    width: 98%;
    background-color: #fff;
}

.system .main-div .main-div-title {
    background-color: #FAFAFA;
    height: 50px;
    line-height: 50px;
    padding-left: 20px;
    font-size: 14px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: bold;
    color: rgba(50, 53, 65, 1);
    letter-spacing: 1px;
    border-bottom: 1px solid #eee;
}

.frame .main-div .main-div-count {
    padding: 20px;
    overflow: hidden;
}

.system .main-div .main-div-count .main-div-list {
    overflow: hidden;
    float: left;
    width: 50%;
    margin-bottom: 20px;
}

.system .main-div .main-div-count .main-div-list .main-div-list-title {
    float: left;
    font-size: 14px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: rgba(92, 97, 113, 1);
}

.system .main-div .main-div-count .main-div-list .main-div-list-count {
    float: left;
    font-size: 14px;
    font-family: PingFangSC-Semibold, PingFang SC;
    font-weight: 600;
    color: rgba(50, 53, 65, 1);
}

.system .main-div .main-div-count .main-div-list .main-div-list-count .el-button {
    padding: 0px;
}
</style>
<style>
.system .main-div .el-tree-node__content {
    height: 40px !important;
}

.myDropMenu {
    width: 82px;
    margin-top: -10px !important;
    margin-right: -10px !important;
}

.myDropMenu .popper__arrow {
    left: 60px !important;
}

.elNone {
    display: none !important;
}
</style>