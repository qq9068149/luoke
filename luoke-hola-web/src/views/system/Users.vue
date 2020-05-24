<!--  -->
<template>
    <div class='system users'>
        <el-header>
            <Header :showNav="showNav" :userLogin="userLogin" :activeIndex="activeIndex"></Header>
        </el-header>
        <el-container class="body-container">
            <el-aside width="220px">
                <Nav :activeIndex="navIndex"></Nav>
            </el-aside>
            <el-main>
                <div class="main-div">
                    <div class="main-div-title"><span>组织内部员工</span> / <span style="font-size:14px;color:rgba(144,145,156,1);">{{form.name}} （{{form.mobile}}）</span></div>
                    <div class="main-div-count">
                        <div class="main-div-count-top">
                            <div class="main-div-count-top">
                                <div class="main-div-count-top-left">
                                    <div class="users-name">{{form.name}} （{{form.mobile}}）</div>
                                    <div class="users-count">
                                        <span>部门：{{form.department}}</span>
                                        <span>工号：{{form.code||""}}</span>
                                    </div>
                                </div>
                                <div class="main-div-count-top-right">
                                    <el-button type="text" style="color:rgba(245,108,108,1);" @click="delSel"><i class="el-icon-delete"></i> 从组织中删除此员工</el-button>
                                </div>
                            </div>
                        </div>
                        <div class="main-div-count-bottom" style="min-height:700px;">
                            <el-tabs v-model="activeName" @tab-click="handleClick">
                                <el-tab-pane label="个人资料" name="first">
                                    <el-form ref="form" :model="form" label-width="80px" style="marign-top: 20px;">
                                        <el-form-item label="姓名">
                                            <el-input v-model="form.name"></el-input>
                                        </el-form-item>
                                        <el-form-item label="工号">
                                            <el-input v-model="form.code" placeholder="请输入工号"></el-input>
                                        </el-form-item>
                                        <el-form-item label="手机号">
                                            <el-input v-model="form.mobile"></el-input>
                                        </el-form-item>
                                        <el-form-item label="性别">
                                            <el-radio-group v-model="form.sex">
                                                <el-radio label="男"></el-radio>
                                                <el-radio label="女"></el-radio>
                                            </el-radio-group>
                                        </el-form-item>
                                        <el-form-item label="邮箱">
                                            <el-input v-model="form.email" placeholder="请输入邮箱"></el-input>
                                        </el-form-item>
                                        <el-form-item label="所属部门">
                                            <el-select v-model="form.parentName" placeholder="请选择" @change="departmentChange">
                                                <el-option v-for="item in options" :key="item.label" :label="item.label" :value="item.label">
                                                </el-option>
                                            </el-select>
                                        </el-form-item>
                                        <el-form-item label="岗位">
                                            <el-button style="width:300px;background:rgba(255,255,255,1);border-radius:4px;font-size:14px;color:rgba(144,147,153,1);" @click="shows = true">{{form.duty||'选择岗位'}}</el-button>
                                        </el-form-item>
                                        <el-form-item label="入职时间">
                                            <el-date-picker v-model="form.entryTime" type="date" placeholder="选择日期">
                                            </el-date-picker>
                                        </el-form-item>
                                        <el-form-item label="学历">
                                            <el-select v-model="form.education" placeholder="请选择">
                                                <el-option v-for="item in educations" :key="item" :label="item" :value="item">
                                                </el-option>
                                            </el-select>
                                        </el-form-item>
                                        <el-form-item>
                                            <el-button type="primary" @click="addIt">保存</el-button>
                                        </el-form-item>
                                    </el-form>
                                </el-tab-pane>
                                <el-tab-pane label="测评报告" name="second" style="min-height:650px">
                                    <el-table :data="tableData" border style="width: 100%">
                                        <el-table-column prop="date" label="日期">
                                        </el-table-column>
                                        <el-table-column prop="name" label="姓名">
                                        </el-table-column>
                                        <el-table-column prop="address" label="地址">
                                        </el-table-column>
                                        <el-table-column label="操作" width="100">
                                            <template slot-scope="scope">
                                                <el-button @click="handleClick(scope.row)" type="text" size="small">查看报告</el-button>
                                            </template>
                                        </el-table-column>
                                    </el-table>
                                    <div class="main-div-nav">
                                        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="currentPage3" :page-size="100" layout="prev, pager, next, jumper" :total="1000">
                                        </el-pagination>
                                    </div>
                                </el-tab-pane>
                            </el-tabs>
                        </div>
                    </div>
                </div>
                <el-dialog title="选择岗位" :visible.sync="shows" id="pList">
                    <el-container style="height: 378px; border: 1px solid #eee;width: 960px;">
                        <el-aside width="250px" style="border-right: 1px solid #e7e7e7;">
                            <el-menu :default-active="activeKey" @select="handleSelect">
                                <template v-for="(node,index) in industryList">
                                    <el-submenu :index="index+''" v-if="node.children">
                                        <template slot="title">
                                            <span>{{node.name}}</span>
                                        </template>
                                        <el-menu-item-group>
                                            <template v-for="(n,i) in node.children">
                                                <el-menu-item :index="(index+'-'+i)" v-if="n.name!='不限'">{{n.name}}</el-menu-item>
                                            </template>
                                        </el-menu-item-group>
                                    </el-submenu>
                                    <el-menu-item :index="index+''" v-else-if="node.name!='不限'">
                                        <span slot="title">{{node.name}}</span>
                                    </el-menu-item>
                                </template>
                            </el-menu>
                        </el-aside>
                        <el-container style="width: 699px;">
                            <el-header class="post-header" style="padding: 0px;">
                                {{titles}}岗位细分
                            </el-header>
                            <el-main style="padding-top: 0px;" class="qwe">
                                <div class="post-count">
                                    <div class="post-count-list" v-for="(item, index) in postList" :key="index">
                                        <el-button type="text" class="default" :class="keys == item ? 'changeColor' : ''" @click="changeColord(item)">{{item}}</el-button>
                                    </div>
                                </div>
                                <div style="width:760px;height:1px;background:rgba(216,216,216,1);"></div>
                                <div class="post-count">
                                    <div class="more">
                                        <el-button type="text" style="font-size:14px;padding-top: 0px;" v-if="!mores" @click="mores = true">查看更多</el-button>
                                    </div>
                                    <div class="post-count-list" v-if="mores" v-for="(item, index) in postListMore" :key="index">
                                        <el-button type="text" class="default" :class="keys == item ? 'changeColor' : ''" @click="changeColord(item)">{{item}}</el-button>
                                    </div>
                                    <div class="post-count-list" v-if="mores" v-for="(item, index) in postListMores" :key="index">
                                        <el-button type="text" class="default" :class="keys == item ? 'changeColor' : ''" @click="changeColord(item)">{{item}}</el-button>
                                        <i class="el-icon-circle-close" :class="keys == item ? 'changeColor' : ''" @click="dddd(index)" style=""></i>
                                    </div>
                                    <div v-if="mores">
                                        <el-button style="width:150px;height:40px;margin-right: 21px;margin-left: 21px;color:#5C6171;" class="button-new-tag" v-if="!inputVisible" @click="showInput"><i class="el-icon-circle-plus-outline" style="font-size: 21px;float: left;margin-top: -3px;"></i> 添加更多</el-button>
                                        <el-input ref="saveTagInput" class="input-new-tag" v-if="inputVisible" v-model="inputValue" @keyup.enter.native="handleInputConfirm" @blur="handleInputConfirm">
                                        </el-input>
                                    </div>
                                </div>
                            </el-main>
                        </el-container>
                    </el-container>
                    <span slot="footer" class="dialog-footer">
                        <el-button @click="sureSelDuty(1)">取 消</el-button>
                        <el-button type="primary" @click="sureSelDuty(2)">确 定</el-button>
                    </span>
                </el-dialog>
            </el-main>
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
        return {
            mores: false,
            shows: false,
            inputVisible: false,
            inputValue: '',
            titles: "",
            activeKey: "0-1",
            industryList: [],
            postList: [],
            postListMore: [],
            postListMores: [],
            teamDetail: {},
            keys: "",

            value: '',
            form: {},
            activeName: 'first',
            options: [],
            optionsIds: {},
            showForm: false,
            currentPage3: 5,
            showNav: true,
            userLogin: false,
            activeIndex: '3',
            navIndex: '3',
            tableData: [],
            educations: [
                '小学',
                '初中',
                '高中',
                '中技（中专 / 技校 / 职高）',
                '大专',
                '本科',
                '硕士研究生',
                'MBA',
                '博士研究生'
            ],
        };
    },
    //监听属性 类似于data概念
    computed: {},
    //监控data中的数据变化
    watch: {},
    //方法集合
    methods: {
        changeColord(item) {
            if (this.keys = item) {} else {
                this.keys = item
            }
        },
        dddd(val) {
            //移除自定义职位
            this.postListMores.splice(this.postListMores.indexOf(val), 1);
            this.hasEditMyDuty = true;
        },
        showInput() {
            this.inputVisible = true;
            this.$nextTick(_ => {
                this.$refs.saveTagInput.$refs.input.focus();
            });
        },
        handleInputConfirm() {
            //添加自定义职位
            let inputValue = this.inputValue;
            if (inputValue) {
                this.keys = inputValue;
                this.postListMores.push(inputValue);
            }
            this.inputVisible = false;
            this.inputValue = '';
            this.hasEditMyDuty = true;
        },
        handleSelect(key) {
            this.activeKey = key;
            key = key.split("-");
            var list = this.industryList;
            var obj = list[key[0]];
            if (key[1] != null) {
                obj = obj.children[key[1]];
            }
            var name = obj.name;
            var dutys = obj.dutys;
            var hotDutys = obj.hotDutys;
            var teamDutys = this.teamDutys || {};
            this.postList = hotDutys || [];
            this.postListMore = dutys || [];
            this.postListMores = JSON.parse(JSON.stringify(teamDutys[name] || []));
            this.titles = name;
        },
        //设置职位
        sureSelDuty(type) {
            if (type == 1) {
                //取消
                this.handleSelect(this.activeKey);
                this.shows = false;
                return;
            }
            this.form.duty = this.keys;
            this.shows = false;
            if (this.hasEditMyDuty) {
                var key = this.activeKey.split("-");
                var list = this.industryList;
                var obj = list[key[0]];
                if (key[1] != null) {
                    obj = obj.children[key[1]];
                }
                var name = obj.name;
                var teamDutys = this.teamDutys || {};
                teamDutys[name] = this.postListMores;
                this.updateTeamDutys(teamDutys);
            }
        },
        //更新团队自定义职业
        updateTeamDutys(dutys) {
            var _this = this;
            _this.doAjax({
                url: "updateTeamDutys",
                method: "post",
                data: {
                    dutys: JSON.stringify(dutys)
                },
                success: function(ret) {
                    _this.loadTeamDetail();
                }
            });
        },
        /**
         * 行业列表获取
         */
        loadIndustryList() {
            var _this = this;
            _this.doAjax({
                url: 'industryList',
                method: "get",
                data: {
                    page: 1,
                    pageSize: 1000,
                },
                success: function(ret) {
                    ret = ret.data.data;
                    var optionse = [];
                    var optionseObj = {};
                    ret.forEach(function(node) {
                        var parent = node.parent;
                        if (!parent) {
                            optionse.push({
                                name: node.name,
                                hotDutys: node.hotDutys || [],
                                dutys: node.dutys || []
                            });
                        } else {
                            optionseObj[parent.name] = optionseObj[parent.name] || [];
                            optionseObj[parent.name].push({
                                name: node.name,
                                hotDutys: node.hotDutys || [],
                                dutys: node.dutys || []
                            });
                        }
                    });
                    optionse.forEach(function(node) {
                        node["children"] = optionseObj[node.name];
                    });
                    _this.industryList = optionse;
                    _this.handleSelect("0-1");
                }
            });
        },
        //团队信息
        loadTeamDetail() {
            var _this = this;
            _this.doAjax({
                url: "myTeamDetail",
                method: "get",
                data: {
                    id: _this.GLOBAL.teamId
                },
                success: function(ret) {
                    var teamDetail = ret.data;
                    _this.teamDutys = teamDetail.dutys || {};
                    _this.teamDetail = teamDetail;
                }
            });
        },

        departmentChange(val) {
            var id = this.optionsIds[val];
            this.form.departmentId = id;
        },
        handleClick(row) {
            console.log(row);
        },
        handleSizeChange(val) {
            console.log(`每页 ${val} 条`);
        },
        handleCurrentChange(val) {
            console.log(`当前页: ${val}`);
        },
        loadDepartment() {
            var _this = this;
            _this.doAjax({
                url: "teamOrgList",
                method: "get",
                data: {
                    type: 1
                },
                success: function(ret) {
                    var list = ret.data;
                    var tableData = {};
                    var parents = {};
                    var optionsIds = {};
                    list.forEach(function(node) {
                        optionsIds[node.name] = node.id;
                        parents[node.id] = {
                            value: node.id,
                            label: node.name
                        };
                        if (node.parent) {
                            var parent = node.parent;
                            tableData[parent] = tableData[parent] || [];
                            tableData[parent].push({
                                value: node.id,
                                label: node.name
                            });
                        }
                    });
                    var arr = [];
                    for (var id in parents) {
                        var node = parents[id];
                        node["children"] = tableData[node.value];
                        if (!node.children) {
                            arr.push(node);
                        }
                    }
                    _this.optionsIds = optionsIds;
                    _this.options = arr;
                }
            });
        },
        delSel() {
            var _this = this;
            var form = _this.form;
            _this.$confirm("你将要从组织名单中移除“" + form.name + "”，是否继续？", '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                var id = form.id;
                _this.updateEdit({
                    isDel: true,
                    ids: [id]
                });
            }).catch(() => {});
        },
        addIt() {
            var _this = this;
            var form = _this.form;
            if (form.entryTime) {
                form.entryTime = _this.dateFormat(form.entryTime, "yyyy-MM-dd");
            }
            _this.updateEdit(form);
        },
        updateEdit(data) {
            var _this = this;
            _this.doAjax({
                url: "editTeamOrg",
                data: data,
                method: "post",
                success: function() {
                    _this.$message({
                        message: "操作成功",
                        type: "success"
                    });
                    _this.goUrl("/SystemStaff");
                }
            });
        },
    },
    //生命周期 - 创建完成（可以访问当前this实例）
    created() {
        var memberDetail = localStorage.getItem("memberDetail");
        // localStorage.removeItem("memberDetail");
        this.form = JSON.parse(memberDetail);
        this.loadDepartment();
        this.loadIndustryList();
        this.loadTeamDetail();
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
.system .main-div-count-bottom {
    position: relative;
    margin-top: 20px;
}

.system .main-div-count-top {
    overflow: hidden;
}

.system .main-div-count-top .main-div-count-top-left {
    float: left;
}

.system .main-div-count-top .main-div-count-top-left .users-name {
    font-size: 16px;
    font-family: PingFangSC-Semibold, PingFang SC;
    font-weight: 600;
    color: rgba(50, 53, 65, 1);
}

.system .main-div-count-top .main-div-count-top-left .users-count {
    font-size: 12px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: rgba(92, 97, 113, 1);
    margin-top: 10px;
}

.system .main-div-count-top .main-div-count-top-left .users-count span {
    margin-right: 20px;
}

.system .main-div-count-top .main-div-count-top-right {
    float: right;
}

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
    position: absolute;
    bottom: 0px;
    width: 80%;
    left: 10%;
}

.system .main-div {
    width: 98%;
    background-color: #fff;
}

.system .main-div .main-div-title {
    background-color: #FAFAFA;
    height: 40px;
    line-height: 40px;
    padding-left: 20px;
    font-size: 15px;
    font-family: PingFangSC-Regular, PingFang SC;
    /*font-weight: bold;*/
    color: rgba(50, 53, 65, 1);
    letter-spacing: 1px;
    border-bottom: 1px solid #eee;
}

.system .main-div .main-div-count {
    padding: 20px 20px;
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
.qwe::-webkit-scrollbar {
    display: none;
}

.default {
    color: #323541;
}

.more {
    text-align: center;
}

.post-count {
    width: 100%;
    overflow: hidden;
    padding: 21px 0;
}

.select {
    color: #5960ED;
}

.changeColor {
    color: #5960ED;
}

.post-count-list {
    float: left;
    margin-right: 21px;
    margin-left: 21px;
    margin-bottom: 10px;
}

.post-count-list .el-button:hover {
    color: #5960ED;
    background: rgba(238, 239, 254, 1);
}

.post-count-list .el-button {
    text-align: center;
    width: 150px;
    height: 40px;
    border-radius: 4px;
    font-size: 14px;
    color: #333;
}

.button-new-tag:hover {
    background: #EEEFFE !important;
    color: #5960ED !important;
    border: 1px solid #EEEFFE !important;
}

.default {
    color: #323541;
}

.changeColor {
    color: #5960ED;
}

.post-count-list .el-button:hover {
    color: #5960ED;
    background: rgba(238, 239, 254, 1);
}

.post-header {
    height: 40px !important;
    background-color: rgba(250, 250, 250, 1);
    line-height: 40px;
    font-size: 14px;
    color: rgba(50, 53, 65, 1);
    padding-left: 30px !important;
    width: 100%;
}

#pList .el-dialog {
    width: 960px;
}

#pList .el-dialog__body {
    padding: 0;
}

#pList .el-aside {
    color: #333;
}
</style>