<!-- 测评管理 -->
<template>
    <div class='release'>
        <el-container>
            <el-header>
                <Header :showNav="showNav" :userLogin="userLogin" :activeIndex="activeIndex"></Header>
            </el-header>
            <el-container class="body-container">
                <el-aside width="220px" class="nav-left">
                    <Nav :activeIndex="navIndex"></Nav>
                </el-aside>
                <el-main>
                    <div class="main-top">
                        <div class="main-top-title">
                            查看测评报告
                        </div>
                        <div class="main-top-count">
                            <div class="main-top-count-screen">
                                <el-select v-model="selPaperId" placeholder="选择测评" @change="loadList">
                                    <el-option v-for="item in paperIdsArr" :key="item.value" :label="item.label" :value="item.value">
                                    </el-option>
                                </el-select>
                                <el-select v-model="selType" placeholder="筛选类型" style="margin-left: 20px;" @change="loadList">
                                    <el-option v-for="item in typesArr" :key="item.value" :label="item.label" :value="item.value">
                                    </el-option>
                                </el-select>
                            </div>
                            <div class="main-top-count-table">
                                <div class="tables">
                                    <el-table :data="tableData" border style="width: 100%">
                                        <el-table-column type="index" label="序号" width="50"></el-table-column>
                                        <el-table-column prop="createdAt" label="发放时间">
                                            <template slot-scope="scope">
                                                {{dateFormat(scope.row.createdAt,"yyyy-MM-dd hh:mm")}}
                                            </template>
                                        </el-table-column>
                                        <el-table-column prop="paper.name" label="测评名称"></el-table-column>
                                        <el-table-column prop="shareMsg.sendType" label="邀请方式">
                                            <template slot-scope="scope">
                                                {{sendTypeName((scope.row.shareMsg||{}).sendType)}}
                                            </template>
                                        </el-table-column>
                                        <el-table-column prop="status" label="状态">
                                            <template slot-scope="scope">
                                                {{scope.row.status==2?'已完成':scope.row.status==3?'已撤销':scope.row.status==1?'作答中':'待领取'}}
                                            </template>
                                        </el-table-column>
                                        <el-table-column prop="people.name" label="姓名">
                                            <template slot-scope="scope">
                                                {{(scope.row.shareMsg||{}).name||scope.row.people.name}}
                                            </template>
                                        </el-table-column>
                                        <el-table-column prop="people.mobilePhoneNumber" label="电话">
                                            <template slot-scope="scope">
                                                {{(scope.row.shareMsg||{}).mobile||scope.row.people.mobilePhoneNumber}}
                                            </template>
                                        </el-table-column>
                                        <el-table-column prop="shareMsg.resource" label="类型"></el-table-column>
                                        <el-table-column prop="shareMsg.department" label="部门"></el-table-column>
                                        <el-table-column prop="shareMsg.duty" label="岗位"></el-table-column>
                                        <el-table-column fixed="right" label="操作" width="100">
                                            <template slot-scope="scope">
                                                <el-button @click="goUrls('/ManageDetails',scope.row.id)" type="text" size="small">查看报告</el-button>
                                            </template>
                                        </el-table-column>
                                    </el-table>
                                </div>
                                <!-- <div class="tables-nav">
                                    <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="currentPage3" :page-size="100" layout="prev, pager, next, jumper" :total="1000">
                                    </el-pagination>
                                </div> -->
                            </div>
                        </div>
                    </div>
                </el-main>
            </el-container>
        </el-container>
    </div>
</template>
<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import Header from '@/components/Header.vue'
import Nav from '@/views/manage/Nav.vue'
export default {
    //import引入的组件需要注入到对象中才能使用
    components: {
        Header,
        Nav
    },
    data() {
        //这里存放数据
        return {
            showNav: true,
            userLogin: false,
            activeIndex: '2',
            navIndex: '2',
            paperIdsArr: [{
                label: "选择测评",
                value: ""
            }],
            paperIds: [],
            typesArr: [{
                label: "选择类型",
                value: ""
            }, {
                label: "员工",
                value: "员工"
            }, {
                label: "应聘者",
                value: "应聘者"
            }],
            selPaperId: '',
            selType: '',
            tableData: [],
            currentPage3: 5,
        };
    },
    //监听属性 类似于data概念
    computed: {},
    //监控data中的数据变化
    watch: {},
    //方法集合
    methods: {
        sendTypeName(name) {
            var obj = {
                "message": "短信",
                "email": "邮件"
            };
            return obj[name] || "其他";
        },
        handleClick() {

        },
        handleSizeChange() {

        },
        handleCurrentChange() {

        },
        loadList() {
            var _this = this;
            var paperIdsArr = _this.paperIdsArr;
            var paperIds = _this.paperIds;
            var selPaperId = _this.selPaperId;
            var selType = _this.selType;
            _this.doAjax({
                url: 'getReportList',
                method: "get",
                data: {
                    type: 1,
                    page: 1,
                    pageSize: 1000
                },
                success: function(response) {
                    if (response.status == 200) {
                        var arr = [];
                        response.data.data.forEach(function(n) {
                            var paper = n.paper;
                            var paperId = paper.id;
                            var shareMsg = n.shareMsg || {};
                            if (paperIds.indexOf(paperId) == -1) {
                                paperIds.push(paperId);
                                paperIdsArr.push({
                                    label: paper.name,
                                    value: paper.id
                                });
                            }
                            if (selPaperId && selPaperId == paperId) {
                                arr.push(n);
                            } else if (selType && selType == shareMsg.resource) {
                                arr.push(n);
                            } else if (!selType && !selPaperId) {
                                arr.push(n);
                            }
                        });
                        _this.tableData = arr;
                        _this.paperIds = paperIds;
                        _this.paperIdsArr = paperIdsArr;
                    }
                }
            });
        }
    },
    //生命周期 - 创建完成（可以访问当前this实例）
    created() {
        this.loadList();
    },
    //生命周期 - 挂载完成（可以访问DOM元素）
    mounted() {},
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
.main-top-count-screen {
    padding: 20px;
}

.tables {
    width: 96%;
    margin-left: 20px;
    min-height: 561px;
}

.tables-nav {
    width: 70%;
    text-align: center;
    margin: auto;
    padding-bottom: 15px;
}

.main-top-count-top {
    overflow: hidden;
    border-bottom: 1px solid #eee;
    padding: 30px 20px;
}

.main-top-count-top .top-main-img {
    width: 194px;
    height: 103px;
    display: block;
    float: left;
    border-radius: 10px;
}

.main-top-count-top .main-top-count-main {
    float: left;
    margin-left: 20px;
}

.main-top-count-top .main-top-count-main .top-count-title {
    font-size: 16px;
    font-family: PingFangSC-Semibold, PingFang SC;
    font-weight: 600;
    color: rgba(50, 53, 65, 1);
}

.main-top-count-top .main-top-count-main .top-count-btn {
    margin-top: 10px;
}

.main-top-count-top .main-top-count-main .top-count-p {
    font-size: 12px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: rgba(92, 97, 113, 1);
    line-height: 17px;
    margin-top: 10px;
}

.main-top-count-top .main-top-count-main .top-count-btn button {}

.release .main-top {
    background: rgba(255, 255, 255, 1);
    box-shadow: 0px 2px 6px 0px rgba(223, 223, 223, 0.27);
    border-radius: 2px;
}

.release .main-top .main-top-title {
    padding: 15px 20px;
    font-size: 14px;
    font-family: PingFangSC-Semibold, PingFang SC;
    font-weight: 600;
    color: rgba(50, 53, 65, 1);
    letter-spacing: 1px;
    border-bottom: 1px solid #E8EBED;
    overflow: hidden;
}

.release .main-top .main-top-count {
    overflow: hidden;
}

.release .main-top .main-top-count .main-top-list {
    float: left;
    width: 32%;
    margin: 13px 0%;
    text-align: center;
    padding: 50px 0px;
}

.release .main-top .main-top-count .main-top-list img {
    width: 5%;
    border-radius: 5px;
}

.release .main-top .main-top-count .main-top-list .list-title {
    font-size: 16px;
    font-family: PingFangSC-Semibold, PingFang SC;
    font-weight: 600;
    color: rgba(50, 53, 65, 1);
    line-height: 30px;
    margin-top: 13px;
}

.release .main-top .main-top-count .main-top-list .list-count {
    // color:rgba(245,108,108,1);
    font-size: 14px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: rgba(92, 97, 113, 1);
    line-height: 20px;
    letter-spacing: 1px;
    margin-top: 10px;
}

.release .main-top .main-top-count .main-top-list .list-btn {
    margin-top: 25px;
}

.main-top-title-left {
    float: left;
}

.main-top-title-right {
    float: right;
}

.border-list {
    border-left: 1px solid #eee;
    border-right: 1px solid #eee;
}
</style>