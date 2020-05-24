<!--  -->
<template>
    <div class='system'>
        <el-header>
            <Header :showNav="showNav" :userLogin="userLogin" :activeIndex="activeIndex"></Header>
        </el-header>
        <el-container class="body-container">
            <el-aside width="220px">
                <Nav :activeIndex="navIndex"></Nav>
            </el-aside>
            <el-main>
                <div class="main-div">
                    <div class="main-div-title">组织信息</div>
                    <div class="main-div-count">
                        <div class="main-div-list">
                            <div class="main-div-list-title">组织名称：</div>
                            <div class="main-div-list-count">{{teamDetail.name}} <el-button type="text" @click="showFormDlg(3)">修改</el-button>
                            </div>
                        </div>
                        <div class="main-div-list">
                            <div class="main-div-list-title">所属行业：</div>
                            <div class="main-div-list-count">{{teamDetail.certConfig.vocation||"未设置"}} <el-button type="text" @click="showFormDlg(1)">修改</el-button>
                            </div>
                        </div>
                        <div class="main-div-list">
                            <div class="main-div-list-title">会员状态：</div>
                            <div class="main-div-list-count" style="color:rgba(230,162,60,1);" v-if="isvip2">标准版会员</div>
                            <div class="main-div-list-count" style="color:rgba(230,162,60,1);" v-else-if="isvip1">体验版会员</div>
                            <div class="main-div-list-count" style="color:rgba(230,162,60,1);" v-else>免费版会员</div>
                        </div>
                        <div class="main-div-list">
                            <div class="main-div-list-title">企业认证：</div>
                            <div class="main-div-list-count">
                                <el-button type="text" @click="showFormDlg(2)">立即认证</el-button>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="main-div" style="padding-bottom:10px;">
                    <div class="main-div-title">组织卡券</div>
                    <div class="main-div-count">
                        <div class="main-div-table">
                            <el-table :data="myTicks" border style="width: 100%">
                                <el-table-column type="index" label="序号" width="50px">
                                </el-table-column>
                                <el-table-column prop="name" label="卡券名称" width="200px">
                                </el-table-column>
                                <el-table-column prop="count" label="数量" width="80px">
                                </el-table-column>
                                <el-table-column prop="endTime" label="有效期" width="180px">
                                </el-table-column>
                                <el-table-column prop="mindMsg" label="使用说明" min-width="200px">
                                </el-table-column>
                                <!--  <el-table-column fixed="right" label="操作">
                                    <template slot-scope="scope">
                                    </template>
                                </el-table-column> -->
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
        <el-dialog title="企业认证" :visible.sync="showForm" style="text-align: left;" width="900px">
            <el-form ref="form" :model="form" label-width="80px">
                <el-form-item label="企业名称">
                    <el-input v-model="form.name" style="width: 240px;" placeholder="请输入"></el-input>
                </el-form-item>
                <el-form-item label="团队规模">
                    <el-select v-model="form.memberNum" placeholder="请选择" style="width:240px;">
                        <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="营业执照">
                    <div class="lists">
                        <div class="lists-title">请上传</div>
                        <el-upload class="upload-demo" drag action="/hola/upOneImg" :before-upload="checkFile" :on-success="upSuccess">
                            <i class="el-icon-upload"></i>
                            <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
                            <div class="el-upload__tip" slot="tip">只能上传jpg/png文件</div>
                        </el-upload>
                    </div>
                    <div class="lists">
                        <div class="lists-title">示例</div>
                        <img src="@/assets/shi.png" alt="" class="shi">
                    </div>
                </el-form-item>
                <el-form-item label="">
                    <div class="form-a">营业执照上传须知</div>
                    <ul class="form-b">
                        <li>营业执照清晰完善，不能剪裁</li>
                        <li>不支持手机屏幕截图和电脑翻拍图片</li>
                        <li>营业执照的黑白复印件、扫描件，需加盖公司红色公章</li>
                        <li>营业执照与企业名称一致</li>
                    </ul>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="showForm = false">取 消</el-button>
                <el-button type="primary" @click="updatedTeam">确 定</el-button>
            </span>
        </el-dialog>
        <el-dialog title="修改行业" :visible.sync="team" width="500px">
            <el-form ref="form" :model="form" label-width="70px">
                <el-form-item label="所属行业">
                    <el-cascader-panel v-model="vocation" :options="optionse"></el-cascader-panel>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="team = false">取 消</el-button>
                <el-button type="primary" @click="updatedTeam">确 定</el-button>
            </span>
        </el-dialog>
        <el-dialog title="修改组织名称" :visible.sync="editName" width="500px">
            <el-form ref="form" :model="form" :rules="rules" label-width="0">
                <el-form-item label="" prop="name">
                    <div>请输入组织名称</div>
                    <el-input v-model="form.name"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="editName = false">取 消</el-button>
                <el-button type="primary" @click="updatedTeam">确 定</el-button>
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
            editName: false,
            isvip1: false,
            isvip2: false,
            vocation: [],
            myTicks: [],
            teamDetail: {
                certConfig: {}
            },
            optionse: [],
            team: false,
            form: {

            },
            rules: {
                name: [{
                    required: true,
                    message: '请输入组织名称',
                    trigger: 'blur'
                }],
            },
            options: [{
                value: '15人以下',
                lable: '15人以下'
            }, {
                value: '15-50人',
                lable: '15-50人'
            }, {
                value: '50-150人',
                lable: '50-150人'
            }, {
                value: '150-500人',
                lable: '150-500人'
            }, {
                value: '500-1000人',
                lable: '500-1000人'
            }, {
                value: '1000人以上',
                lable: '1000人以上'
            }],
            showForm: false,
            currentPage3: 5,
            showNav: true,
            userLogin: false,
            activeIndex: '3',
            navIndex: '1',
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
                message: "营业执照上传失败，请重试",
                type: "error"
            });
            var certConfig = this.certConfig;
            certConfig.cert = url;
            this.certConfig = certConfig;
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
        showFormDlg(type) {
            //编辑企业认证
            var obj = this.teamDetail.certConfig || {};
            obj = JSON.parse(JSON.stringify(obj));
            this.form = obj;
            if (type == 1) {
                this.team = true;
                this.vocation = (obj.vocation || "").split("-")
            }
            if (type == 2) {
                this.showForm = true;
            }
            if (type == 3) {
                this.editName = true;
            }
        },
        getTickList() {
            var _this = this;
            _this.doAjax({
                url: 'getMyticket',
                method: "get",
                data: {
                    page: 1,
                    pageSize: 1000,
                },
                success: function(ret) {
                    ret = ret.data;
                    _this.myTicks = ret;
                }
            });
        },
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
                    var obj = teamDetail.certConfig || {};
                    _this.vocation = (obj.vocation || "").split("-")
                    _this.teamDetail = teamDetail;
                }
            });
        },
        updatedTeam() {
            var _this = this;
            var form = _this.form;
            var vocation = _this.vocation;
            vocation = vocation[0] + (vocation[1] ? ("-" + vocation[1]) : "");
            var obj = {
                name: form.name,
                vocation: vocation,
                memberNum: form.memberNum,
                cert: form.imgurl
            };
            var oldCertConfig = _this.teamDetail.certConfig || {};
            obj = Object.assign(oldCertConfig, obj);
            if (!obj.name) {
                _this.$message({
                    message: "请输入组织名称",
                    type: "error"
                });
                return;
            }
            _this.doAjax({
                url: "updateTeamMember",
                method: "post",
                data: {
                    id: _this.GLOBAL.teamId,
                    type: 4,
                    certConfig: obj
                },
                success: function(ret) {
                    _this.$message({
                        message: "操作成功",
                        type: "success"
                    });
                    _this.showForm = false;
                    _this.team = false;
                    _this.editName = false;
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
                                value: node.name,
                                label: node.name
                            });
                        } else {
                            optionseObj[parent.name] = optionseObj[parent.name] || [];
                            optionseObj[parent.name].push({
                                value: node.name,
                                label: node.name
                            });
                        }
                    });
                    optionse.forEach(function(node) {
                        node["children"] = optionseObj[node.value];
                    });
                    _this.optionse = optionse;
                }
            });
        }
    },
    //生命周期 - 创建完成（可以访问当前this实例）
    created() {
        this.loadTeamDetail();
        this.getTickList();
        this.loadIndustryList();
        this.isvip1 = this.GLOBAL.isvip1;
        this.isvip2 = this.GLOBAL.isvip2;
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

.system .main-div .main-div-count {
    padding: 20px 20px 0px;
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