<!-- Workbench 工作台 -->
<template>
    <div class='workbench'>
        <el-container>
            <el-header>
                <Header :showNav="showNav" :userLogin="userLogin" :activeIndex="activeIndex"></Header>
            </el-header>
            <el-container class="body-container">
                <el-aside width="300px">
                    <Vip></Vip>
                </el-aside>
                <el-main>
                    <div class="main-top">
                        <div class="main-top-title">测评推荐</div>
                        <div class="main-top-count">
                            <div class="main-top-list" v-for="item in hotPaper" :key="item.id" @click="changePage('/EvaluationDetails',{'path':'/Workbench','pathName':'工作台','name':item.name,'id':item.id})">
                                <img :src="item.paperImg||item.img" alt="">
                                <div class="list-title">{{item.name}}</div>
                                <div class="list-yy">
                                    <img src="@/assets/cp.png" alt="" style="width: 12px;height: 15px;">
                                    <span style="font-size:12px;color:rgba(144,145,156,1);margin-left: 6px;">{{item.praiseCount}}人觉得有用</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="main-top main-bottom">
                        <div class="main-top-title">最新报告</div>
                        <div class="main-top-count main-bottom-count" style="padding: 20px;">
                            <el-table :data="tableData" border style="width: 100%">
                                <el-table-column type="index" label="序号" width="180"></el-table-column>
                                <el-table-column prop="people.name" label="被测者" width="180"></el-table-column>
                                <el-table-column prop="paper.name" label="测评名称"></el-table-column>
                                <el-table-column prop="createdAt" label="完成时间">
                                    <template slot-scope="scope">{{dateFormat(scope.row.createdAt,"yyyy-MM-dd hh:mm")}}</template>
                                </el-table-column>
                                <el-table-column label="操作" width="100">
                                    <template slot-scope="scope">
                                        <el-button type="text" size="small" @click="goUrls('/ManageDetails',scope.row.id)">查看报告</el-button>
                                    </template>
                                </el-table-column>
                            </el-table>
                        </div>
                    </div>
                </el-main>
            </el-container>
        </el-container>
        <el-dialog title="请完善团队信息" :visible.sync="team" width="707px">
            <el-form ref="form" :model="form" label-width="100px">
                <el-form-item label="组织名称">
                    <el-input v-model="form.name" placeholder="请输入企业名称"></el-input>
                </el-form-item>
                <el-form-item label="联系人电话">
                    <el-input v-model="form.mobile" placeholder="请输入电话"></el-input>
                </el-form-item>
                <el-form-item label="所属行业">
                    <el-cascader-panel v-model="vocation" :options="optionse"></el-cascader-panel>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="team = false">取 消</el-button>
                <el-button type="primary" @click="updatedTeam">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>
<script>
import Header from '@/components/Header.vue'
import Vip from '@/components/Vip.vue'

export default {
    //import引入的组件需要注入到对象中才能使用
    components: {
        Header,
        Vip
    },
    data() {
        return {
            teamDetail: {
                certConfig: {}
            },
            loginUserMsg: {},
            optionse: [],
            form: {
                name: ''
            },
            vocation: [],
            team: false,
            hotPaper: [],
            showNav: true,
            userLogin: false,
            activeIndex: '1',
            tableData: [],
            userDetail: {}
        };
    },
    //监听属性 类似于data概念
    computed: {},
    //监控data中的数据变化
    watch: {},
    //方法集合
    methods: {
        updatedTeam() {
            var _this = this;
            var form = _this.form;
            var vocation = _this.vocation;
            vocation = vocation[0] + (vocation[1] ? ("-" + vocation[1]) : "");
            var obj = {
                name: form.name,
                mobile: form.mobile,
                vocation: vocation,
            };
            var oldCertConfig = _this.teamDetail.certConfig || {};
            obj = Object.assign(oldCertConfig, obj);
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
                    _this.team = false;
                    _this.loadTeamDetail();
                    if (window.refreshPage) {
                        window.refreshPage();
                    }
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
                    teamDetail.certConfig = teamDetail.certConfig || {};
                    _this.form = teamDetail.certConfig;
                    _this.teamDetail = teamDetail;
                    _this.vocation = (teamDetail.certConfig.vocation || "").split("-");
                    if (!_this.form.name) {
                        _this.team = true;
                    } else {
                        _this.team = false;
                    }
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
        // dateFormat(date) {
        //     //日期格式化
        //     return this.dateFormat(date, "yyyy-MM-dd hh:mm");
        // },
    },
    //生命周期 - 创建完成（可以访问当前this实例）
    created() {
        var _this = this;
        _this.loadTeamDetail();
        _this.loadIndustryList();
        _this.doAjax({
            url: 'getHomeSetting',
            method: "get",
            success: function(response) {
                if (response.status == 200) {
                    _this.hotPaper = response.data.hotPaper
                }
            }
        });
    },
    //生命周期 - 挂载完成（可以访问DOM元素）
    mounted() {
        var _this = this;
        _this.loginUserMsg = _this.GLOBAL.loginUserMsg;
        _this.doAjax({
            url: 'getReportList',
            method: "get",
            data: {
                type: 1,
                page: 1,
                pageSize: 1000
            },
            success: function(response) {
                console.log('reportlist:', response.data);
                if (response.status == 200) {
                    _this.tableData = response.data.data;
                }
            }
        })
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
.workbench .el-dialog__body {
    padding: 20px 61px;
}

.list-yy {
    margin-top: 6px;
}

.workbench .body-container {
    padding: 20px 15px;
}

.workbench .el-main {
    padding: 0px;
}

.workbench .main-top {
    background: rgba(255, 255, 255, 1);
    box-shadow: 0px 2px 6px 0px rgba(223, 223, 223, 0.27);
    border-radius: 2px;
}

.workbench .main-bottom {
    margin-top: 20px;
}

.workbench .main-bottom .main-bottom-count {
    padding: 31px 2%;
}

.workbench .main-top .main-top-title {
    padding: 15px 20px;
    font-size: 14px;
    font-family: PingFangSC-Semibold, PingFang SC;
    font-weight: 600;
    color: rgba(50, 53, 65, 1);
    letter-spacing: 1px;
    border-bottom: 1px solid #E8EBED;
    border-radius: 2px 2px 0px 0px;
}

.workbench .main-top .main-top-count {
    overflow: hidden;
    padding: 15px 20px;
}

.workbench .main-top .main-top-count .main-top-list {
    float: left;
    width: 194px;
    margin: 0 20px 0 0;
}

.workbench .main-top .main-top-count .main-top-list img {
    width: 194px;
    height: 103px;
    border-radius: 5px;
    box-shadow: 0px 2px 6px 0px rgba(223, 223, 223, 0.27);
}

.workbench .main-top .main-top-count .main-top-list .list-title {
    font-size: 14px;
    font-family: PingFangSC-Semibold, PingFang SC;
    font-weight: 600;
    color: rgba(50, 53, 65, 1);
    line-height: 20px;
    margin-top: 10px;
}

.workbench .main-top .main-top-footer {
    font-size: 12px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: rgba(144, 145, 156, 1);
    line-height: 17px;
    padding: 10px 0px;
}
</style>