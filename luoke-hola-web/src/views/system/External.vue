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
                        组织外部应聘者
                    </div>
                    <div class="main-div-count" style="min-height: 700px;">
                        <div class="main-div-btn">
                            <div class="main-div-btn-left">
                                <div class="search">
                                    <div style="float: left;margin-right: 5px;">
                                        <el-input v-model="input" placeholder="姓名/手机号"></el-input>
                                    </div>
                                    <div style="float:left;">
                                        <el-button icon="el-icon-search" type="primary">搜索</el-button>
                                    </div>
                                </div>
                            </div>
                            <div class="main-div-btn-right">
                                <el-button type="primary" :disabled="true" icon="el-icon-upload2" @click="showDel3 = true">转为内部员工</el-button>
                                <el-button type="primary" :disabled="true" icon="el-icon-delete" @click="showDel2 = true">批量删除</el-button>
                            </div>
                        </div>
                        <div class="main-div-table">
                            <el-table :data="tableData" border @selection-change="handleSelectionChange" style="width: 100%">
                                <el-table-column type="selection">
                                </el-table-column>
                                <el-table-column prop="name" label="姓名">
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
                                        <el-button @click="handleClick(scope.row)" type="text" size="small">删除</el-button>
                                        <el-button type="text" size="small" @click="toEdit(scope.row)">编辑</el-button>
                                    </template>
                                </el-table-column>
                            </el-table>
                        </div>
                        <div class="main-div-nav">
                            <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="currentPage3"
                                           :page-size="100" layout="prev, pager, next, jumper" :total="1000">
                            </el-pagination>
                        </div>
                    </div>
                </div>
            </el-main>
        </el-container>
        <el-dialog title="提示" :visible.sync="showDel" width="30%">
            <span>你将从名单中永久移除选中的应聘者，是否继续？</span>
            <span slot="footer" class="dialog-footer">
                <el-button @click="showDel = false">取 消</el-button>
                <el-button type="primary" @click="showDel = false">确 定</el-button>
            </span>
        </el-dialog>
        <el-dialog title="提示" :visible.sync="showDel2" width="30%">
            <span>你将从名单中永久移除选中的应聘者，是否继续？</span>
            <span slot="footer" class="dialog-footer">
                <el-button @click="showDel2 = false">取 消</el-button>
                <el-button type="primary" @click="showDel2 = false">确 定</el-button>
            </span>
        </el-dialog>
        <el-dialog title="提示" :visible.sync="showDel3" width="30%">
            <span>应聘者将被移动至组织名单中，是否继续</span>
            <span slot="footer" class="dialog-footer">
                <el-button @click="showDel3 = false">取 消</el-button>
                <el-button type="primary" @click="showDel3 = false">确 定</el-button>
            </span>
        </el-dialog>
        <el-dialog title="批量导入员工信息" :visible.sync="showImport">
            <div class="imported">
                <div class="imported-title">步骤</div>
                <div class="imported-step">
                    <div class="imported-step-list">
                        1、下载Excel模版 (
                        <el-button type="text" @click="getExcel">点击下载</el-button>
                        )
                    </div>
                    <div class="imported-step-bord"></div>
                    <div class="imported-step-list">2、填写数据</div>
                    <div class="imported-step-bord"></div>
                    <div class="imported-step-list">3、上传文件</div>
                    <div class="imported-step-bord"></div>
                    <div class="imported-step-list">4、点击导入</div>
                </div>
                <div class="imported-form">
                    <el-upload ref="uploadExcel" class="upload-demo" drag :auto-upload="false" :data="{token:token,teamId:teamId}" action="/hola/importExternal"
                               :on-success="handleFileChange">
                        <i class="el-icon-upload"></i>
                        <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
                    </el-upload>
                    <el-button type="primary" @click="submitExcel" style="width:174px; margin-top: 22px;">导入</el-button>
                </div>
            </div>
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
                showUsers: false,
                showDel: false,
                showDel2: false,
                showDel3: false,
                user: '',
                showImport: false,
                options: [],
                value: '',
                input: '',
                currentPage3: 5,
                showNav: true,
                userLogin: false,
                activeIndex: '3',
                navIndex: '4',
                tableData: [],
                form: {
                    name: '',
                    phone: '',
                    date1: '',
                    date2: '',
                    delivery: false,
                    type: [],
                    resource: '',
                    desc: ''
                }
            };
        },
        //监听属性 类似于data概念
        computed: {},
        //监控data中的数据变化
        watch: {},
        //方法集合
        methods: {
            getExcel() {
                window.open("https://admin.luoke101.com/外部人员导入模板.xlsx");
            },
            handleClick(row) {
                console.log(row);
                this.showDel = true
                this.user = row.name
            },
            handleSizeChange(val) {
                console.log(`每页 ${val} 条`);
            },
            handleCurrentChange(val) {
                console.log(`当前页: ${val}`);
            },
            handleSelectionChange(val) {
                console.log(val)
            },
            submitExcel() {
                this.$refs.uploadExcel.submit();
            },
        },
        //生命周期 - 创建完成（可以访问当前this实例）
        created() {

        },
        //生命周期 - 挂载完成（可以访问DOM元素）
        mounted() {

        },
        beforeCreate() {
        }, //生命周期 - 创建之前
        beforeMount() {
        }, //生命周期 - 挂载之前
        beforeUpdate() {
        }, //生命周期 - 更新之前
        updated() {
        }, //生命周期 - 更新之后
        beforeDestroy() {
        }, //生命周期 - 销毁之前
        destroyed() {
        }, //生命周期 - 销毁完成
        activated() {
        }, //如果页面有keep-alive缓存功能，这个函数会触发
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
