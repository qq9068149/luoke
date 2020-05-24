<!--  -->
<template>
    <div class='system staff'>
        <el-header>
            <Header :showNav="showNav" :userLogin="userLogin" :activeIndex="activeIndex"></Header>
        </el-header>
        <el-container class="body-container">
            <el-aside width="220px">
                <Nav :activeIndex="navIndex"></Nav>
            </el-aside>
            <el-main>
                <div class="main-div">
                    <div class="main-div-title" style="overflow: hidden;">
                        组织内部员工
                        <el-button style="float: right;margin: 10px 15px;" size="mini" @click="showImport = true">批量导入</el-button>
                    </div>
                    <div class="main-div-count" style="min-height: 700px;">
                        <div class="main-div-btn">
                            <div class="main-div-btn-left">
                                <div class="fl">
                                    <el-select v-model="value" placeholder="选择部门" @change="loadList">
                                        <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                                        </el-option>
                                    </el-select>
                                </div>
                                <div class="search">
                                    <div style="float: left;margin-right: 5px;">
                                        <el-input v-model="input" placeholder="姓名/手机号" @keyup.enter.native="loadList"></el-input>
                                    </div>
                                    <div style="float:left;">
                                        <el-button icon="el-icon-search" type="primary" @click="loadList">搜索</el-button>
                                    </div>
                                </div>
                            </div>
                            <div class="main-div-btn-right">
                                <el-button type="primary" icon="el-icon-plus" @click="showUsers = true">新增员工</el-button>
                                <el-button type="primary" :disabled="!sels.length" icon="el-icon-delete" @click="showDel2 = true">批量删除</el-button>
                            </div>
                        </div>
                        <div class="main-div-table">
                            <el-table :data="tableData" border @selection-change="handleSelectionChange" style="width: 100%">
                                <el-table-column type="selection">
                                </el-table-column>
                                <el-table-column prop="name" label="姓名">
                                    <template slot-scope="scope">
                                        <img v-if="scope.row.headerImg" :src="scope.row.headerImg" alt="" width="50px" height="50px" style="border-radius:50%;">
                                        {{scope.row.name}}
                                    </template>
                                </el-table-column>
                                <el-table-column prop="code" label="工号">
                                </el-table-column>
                                <el-table-column prop="parentName" label="部门">
                                </el-table-column>
                                <el-table-column prop="duty" label="岗位">
                                </el-table-column>
                                <el-table-column prop="mobile" label="手机">
                                </el-table-column>
                                <el-table-column prop="email" label="邮箱">
                                </el-table-column>
                                <el-table-column prop="report" label="报告" width="60px">
                                </el-table-column>
                                <el-table-column prop="createdAt" label="添加时间">
                                    <template slot-scope="scope">
                                        {{dateFormat(scope.row.createdAt,"yyyy-MM-dd hh:mm")}}
                                    </template>
                                </el-table-column>
                                <el-table-column fixed="right" label="操作">
                                    <template slot-scope="scope">
                                        <el-button @click="handleClick(scope.row)" type="text">删除</el-button>
                                        <el-button type="text" @click="toEdit(scope.row)">编辑</el-button>
                                    </template>
                                </el-table-column>
                            </el-table>
                        </div>
                        <!-- <div class="main-div-nav">
                            <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="currentPage3" :page-size="100" layout="prev, pager, next, jumper" :total="1000">
                            </el-pagination>
                        </div> -->
                    </div>
                </div>
            </el-main>
        </el-container>
        <el-dialog title="提示" :visible.sync="showDel" width="30%">
            <span>你将要从组织名单中移除“{{user}}”，是否继续？</span>
            <span slot="footer" class="dialog-footer">
                <el-button @click="showDel = false">取 消</el-button>
                <el-button type="primary" @click="delSel">确 定</el-button>
            </span>
        </el-dialog>
        <el-dialog title="提示" :visible.sync="showDel2" width="30%">
            <span>你将从组织中永久移出选中的员工，是否继续？</span>
            <span slot="footer" class="dialog-footer">
                <el-button @click="showDel2 = false">取 消</el-button>
                <el-button type="primary" @click="delSel">确 定</el-button>
            </span>
        </el-dialog>
        <el-dialog title="批量导入员工信息" :visible.sync="showImport" width="800px">
            <div class="imported">
                <div class="imported-title">步骤</div>
                <div class="imported-step">
                    <div class="imported-step-list">1、下载Excel模版 (<el-button type="text" @click="getExcel">点击下载</el-button>)</div>
                    <div class="imported-step-bord"></div>
                    <div class="imported-step-list">2、填写数据</div>
                    <div class="imported-step-bord"></div>
                    <div class="imported-step-list">3、上传文件</div>
                    <div class="imported-step-bord"></div>
                    <div class="imported-step-list">4、点击导入</div>
                </div>
                <div class="imported-form">
                    <el-upload ref="uploadExcel" class="upload-demo" drag :auto-upload="false" :data="{token:token,teamId:teamId}" action="/hola/importTeamOrg" :on-success="handleFileChange">
                        <i class="el-icon-upload"></i>
                        <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
                    </el-upload>
                    <el-button type="primary" style="width:174px; margin-top: 22px;" @click="submitExcel">导入</el-button>
                </div>
            </div>
        </el-dialog>
        <el-dialog title="新增员工" :visible.sync="showUsers" width="800px">
            <div class="users-form">
                <el-form ref="form" :model="form" label-width="80px" style="overflow: hidden;">
                    <el-form-item label="姓名" style="width:45%;padding-right: 20px;float:left;">
                        <el-input v-model="form.name" placeholder="请输入姓名"></el-input>
                    </el-form-item>
                    <el-form-item label="工号" style="width:45%;padding-right: 20px;float:left;">
                        <el-input v-model="form.code" placeholder="请输入工号"></el-input>
                    </el-form-item>
                    <el-form-item label="所属部门" style="width:45%;padding-right: 20px;float:left;">
                        <el-select v-model="form.department" placeholder="请选择" @change="departmentChange" style="width:100%;">
                            <el-option v-for="item in options" :key="item.label" :label="item.label" :value="item.label">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="手机" style="width:45%;padding-right: 20px;float:left;">
                        <el-input v-model="form.mobile" placeholder="请输入手机号"></el-input>
                    </el-form-item>
                    <el-form-item label="岗位" style="width:45%;padding-right: 20px;float:left;">
                        <el-button style="width:100%;background:rgba(255,255,255,1);border-radius:4px;font-size:14px;color:rgba(144,147,153,1);" @click="shows = true">{{form.duty||'选择岗位'}}</el-button>
                    </el-form-item>
                    <el-form-item label="入职时间" style="width:45%;padding-right: 20px;float:left;">
                        <el-date-picker v-model="form.entryTime" type="date" placeholder="选择日期" style="width:100%;">
                        </el-date-picker>
                    </el-form-item>
                    <el-form-item label="邮箱" style="width:45%;padding-right: 20px;float:left;">
                        <el-input v-model="form.email" placeholder="请输入邮箱"></el-input>
                    </el-form-item>
                    <el-form-item label="性别" style="width:45%;padding-right: 20px;float:left;">
                        <el-radio-group v-model="form.sex">
                            <el-radio label="男"></el-radio>
                            <el-radio label="女"></el-radio>
                        </el-radio-group>
                    </el-form-item>
                    <el-form-item label="学历" style="width:45%;padding-right: 20px;float:left;">
                        <el-select v-model="form.education" placeholder="请选择" style="width:100%;">
                            <el-option v-for="item in educations" :key="item" :label="item" :value="item">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="照片" style="float:left;">
                        <el-upload class="upload-demo" action="/hola/upOneImg" :limit="1" :before-upload="checkFile" :on-success="upSuccess" :show-file-list="false" accept=".jpg,.png">
                            <el-button size="small" type="primary" v-if="!form.headerImg">点击上传</el-button>
                            <img v-else :src="form.headerImg" alt="" width="50px" hieght="50px">
                            <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过1MB，只能上传一张</div>
                        </el-upload>
                    </el-form-item>
                </el-form>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="addIt">提 交</el-button>
            </span>
        </el-dialog>
        <el-dialog title="选择岗位" :visible.sync="shows" id="pList">
            <el-container style="height: 378px; border: 1px solid #eee;width: 960px;">
                <el-aside width="250px" style="border-right: 1px solid #e7e7e7;">
                    <el-menu :default-active="activeKey" @select="handleSelect">
                        <template v-for="(node,index) in industryList">
                            <el-submenu :index="index+''"" v-if="node.children">
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

            showUsers: false,
            showDel: false,
            showDel2: false,
            user: '',
            showImport: false,
            options: [],
            optionsIds: {},
            sels: [],
            value: '',
            input: '',
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
            form: {

            }
        };
    },
    //监听属性 类似于data概念
    computed: {},
    //监控data中的数据变化
    watch: {},
    //方法集合
    methods: {
        checkFile(file) {
            var _this = this;
            var type = file.type;
            if (["image/jpeg", "image/png"].indexOf(type) == -1) {
                _this.$message({
                    message: "请选中jpg或png的图片",
                    type: "error"
                });
                return false;
            }
        },
        upSuccess(url) {
            if (url.code) return _this.$message({
                message: "用户头像上传失败，请重试",
                type: "error"
            });
            this.form.headerImg = url;
            this.$forceUpdate();
        },
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
        getExcel() {
            window.open("https://admin.luoke101.com/组织人员导入模板.xlsx");
        },
        departmentChange(val) {
            var id = this.optionsIds[val];
            this.form.departmentId = id;
        },
        toEdit(data) {
            localStorage.setItem("memberDetail", JSON.stringify(data));
            this.goUrl('/SystemUsers');
        },
        submitExcel() {
            this.$refs.uploadExcel.submit();
        },
        handleFileChange(file, fileList) {
            //文件上传
            this.showImport = false;
            this.loadList();
        },
        handleClick(row) {
            var _this = this;
            _this.$confirm("你将要从组织名单中移除“" + row.name + "”，是否继续？", '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                _this.sels = [row];
                _this.delSel();
            }).catch(() => {});
        },
        handleSizeChange(val) {
            // console.log(`每页 ${val} 条`);
        },
        handleCurrentChange(val) {
            // console.log(`当前页: ${val}`);
        },
        handleSelectionChange(val) {
            this.sels = val;
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
                    var arr = [{
                        value: "",
                        label: "选择部门"
                    }];
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
        loadList() {
            var _this = this;
            _this.doAjax({
                url: "teamOrgList",
                method: "get",
                data: {
                    type: 2,
                    departmentId: _this.value || "",
                    keyword: _this.input || ""
                },
                success: function(ret) {
                    var list = ret.data;
                    _this.tableData = list;
                }
            });
        },
        delSel() {
            var sels = this.sels;
            var ids = [];
            sels.forEach(function(n) {
                ids.push(n.id);
            });
            this.updateEdit({
                isDel: true,
                ids: ids
            });
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
                    _this.showUsers = false;
                    _this.loadList();
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
    },
    //生命周期 - 创建完成（可以访问当前this实例）
    created() {
        var _this = this;
        _this.token = _this.GLOBAL.token;
        _this.teamId = _this.GLOBAL.teamId;
        _this.loadList();
        _this.loadDepartment();
        _this.loadTeamDetail();
        _this.loadIndustryList();
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
.system .imported .imported-form {
    margin-top: 30px;
    text-align: center;
}

.system .imported .imported-title {
    font-size: 14px;
    font-family: PingFangSC-Semibold, PingFang SC;
    font-weight: 600;
    color: rgba(50, 53, 65, 1);
    text-align: center;
}

.system .imported .imported-step {
    overflow: hidden;
    text-align: center;
    width: 80%;
    margin: auto;
    border-bottom: 1px solid #eee;
}

.system .imported .imported-step .imported-step-list {
    float: left;
    height: 60px;
    line-height: 60px;
    font-size: 14px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: rgba(92, 97, 113, 1);
}

.system .imported .imported-step .imported-step-bord {
    float: left;
    width: 42px;
    height: 1px;
    border-top: 1px solid rgba(216, 216, 216, 1);
    margin: 30px 10px 0 10px;
}

.system .fl {
    float: left;
    margin-right: 20px;
    width: 20%;
}

.system .search {
    float: left;
    width: 60%;
}

.system .main-div-btn {
    overflow: hidden;
    padding: 0 0 20px 0;
}

.system .main-div-btn .main-div-btn-left {
    float: left;
    width: 60%;
}

.system .main-div-btn .main-div-btn-right {
    float: right;
}

.system .lists {
    width: 40%;
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

.staff .main-div-nav {
    text-align: center;
    padding: 20px 0px;
    position: absolute;
    width: 70%;
    left: 15%;
    bottom: 0px;
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

.system .main-div .main-div-count {
    padding: 20px 20px 0px;
    overflow: hidden;
    position: relative;
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