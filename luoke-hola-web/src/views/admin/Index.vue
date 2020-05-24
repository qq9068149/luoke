<!--  -->
<template>
    <div class='admin'>
        <el-header>
            <Header :showNav="showNav" :userLogin="userLogin" :activeIndex="activeIndex"></Header>
        </el-header>
        <el-container class="body-container">
            <el-aside width="220px">
                <Nav :activeIndex="navIndex"></Nav>
            </el-aside>
            <el-main>
                <div class="main-div">
                    <div class="main-div-title">权限管理</div>
                    <div class="main-div-count">
                        <div class="main-div-list">
                            <div class="main-div-list-count">超级管理员（1）</div>
                            <div class="main-div-list-admin">权限：测评购买 | 测评发放 | 查看、分享报告 | 企业认证 | 充值 | 组织管理</div>
                        </div>
                        <div class="main-div-user">
                            <div style="float: left;">
                                <img :src="teamDetail.adminUser.avatar||''" alt="" style="width: 50px;border-radius: 50%;">
                            </div>
                            <div style="float: left;margin-left: 10px;font-size:16px;color:rgba(50,53,65,1);font-weight:600;">{{teamDetail.adminUser.nickname}}</div>
                            <div style="float: left;margin-left: 10px;margin-top: 22px;font-size:12px;color:rgba(255,255,255,1);width:26px;height:17px;background-color:rgba(103,194,58,1);line-height:17px;text-align: center;">我</div>
                            <div style="float: left;margin-left: 40px;">
                                <el-button type="text" @click="au = true">转让权限</el-button>
                            </div>
                        </div>
                        <div class="main-div-power">
                            <div class="main-div-power-top">
                                <div class="main-div-power-top-left">
                                    <div class="main-div-power-name">子管理员（{{teamDetail.adminMember.length}}）</div>
                                    <div class="main-div-power-au">权限：购买、发放、体验测评/查看报告</div>
                                </div>
                                <div class="main-div-power-top-left">
                                    <el-popover placement="bottom" width="200" trigger="click">
                                        <div class="hovered">
                                            <div style="font-size:14px;font-weight:bold;">微信扫码邀请他人进入团队</div>
                                            <div style="font-size:12px;color:rgba(144,145,156,1);">二维码六小时内有效</div>
                                            <div>
                                                <img :src="qrcode2" alt="" style="width:114px;margin-top: 10px;">
                                            </div>
                                        </div>
                                        <el-button style="padding:0;margin-left:20px;" type="text" slot="reference" @click="teamInvite(2)"><img src="@/assets/user.png" alt=""></el-button>
                                    </el-popover>
                                </div>
                            </div>
                            <div class="main-div-table">
                                <el-table :data="teamDetail.adminMember" border style="width: 100%">
                                    <el-table-column label="序号" type="index" width="50px">
                                    </el-table-column>
                                    <el-table-column prop="nickname" label="姓名">
                                    </el-table-column>
                                    <el-table-column prop="createdAt" label="加入时间">
                                    </el-table-column>
                                    <el-table-column label="操作" width="100">
                                        <template slot-scope="scope">
                                            <el-button @click="handleClick(scope.row)" type="text" size="small">删除</el-button>
                                        </template>
                                    </el-table-column>
                                </el-table>
                            </div>
                        </div>
                        <div class="main-div-power" style="margin-top:20px;">
                            <div class="main-div-power-top">
                                <div class="main-div-power-top-left">
                                    <div class="main-div-power-name">普通成员（{{teamDetail.member.length}}）</div>
                                    <div class="main-div-power-au">权限：查看他人分享给自己的报告/体验免费测评</div>
                                </div>
                                <div class="main-div-power-top-left">
                                    <el-popover placement="bottom" width="200" trigger="click">
                                        <div class="hovered">
                                            <div style="font-size:14px;font-weight:bold;">微信扫码邀请他人进入团队</div>
                                            <div style="font-size:12px;color:rgba(144,145,156,1);">二维码六小时内有效</div>
                                            <div>
                                                <img :src="qrcode1" alt="" style="width:114px;margin-top: 10px;">
                                            </div>
                                        </div>
                                        <el-button type="text" style="padding:0;margin-left:20px;" slot="reference" @click="teamInvite(1)"><img src="@/assets/user.png" alt=""></el-button>
                                    </el-popover>
                                </div>
                            </div>
                            <div class="main-div-table">
                                <el-table :data="teamDetail.member" border style="width: 100%">
                                    <el-table-column type="index" label="序号" width="50px">
                                    </el-table-column>
                                    <el-table-column prop="nickname" label="姓名">
                                    </el-table-column>
                                    <el-table-column prop="createdAt" label="加入时间">
                                         <template slot-scope="scope">
                                            {{dateFormat(scope.row.createdAt,"yyyy-MM-dd hh:mm")}}
                                        </template>
                                    </el-table-column>
                                    <el-table-column label="操作" width="100">
                                        <template slot-scope="scope">
                                            <el-button @click="handleClick(scope.row)" type="text" size="small">删除</el-button>
                                        </template>
                                    </el-table-column>
                                </el-table>
                            </div>
                        </div>
                    </div>
                </div>
            </el-main>
        </el-container>
        <el-dialog title="超级管理员权限移交" :visible.sync="au" center width="364px">
            <div class="au-show">请选择要移交的成员</div>
            <div class="au-count">
                <el-select v-model="selNewAdmin" placeholder="请选择">
                    <el-option v-for="item in (teamDetail.members||[])" :key="item.objectId" :label="item.nickname" :value="item.objectId">
                    </el-option>
                </el-select>
            </div>
            <div class="au-btn">
                <el-button @click="au = false">取消</el-button>
                <el-button type="primary" @click="saveNewAdmin()">确认移交</el-button>
            </div>
        </el-dialog>
    </div>
</template>
<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import Header from '@/components/Header.vue'
import Nav from '@/views/system/Nav.vue'
import QRCode from "qrcode";
export default {
    //import引入的组件需要注入到对象中才能使用
    components: {
        Header,
        Nav
    },
    data() {
        //这里存放数据
        return {
            qrcode1: "",
            qrcode2: "",
            teamDetail: {
                adminUser: {},
                adminMember: [],
                member: []
            },
            selNewAdmin: "",
            value: [],
            au: false,
            options: [],
            showForm: false,
            currentPage3: 5,
            showNav: true,
            userLogin: false,
            activeIndex: '3',
            navIndex: '5',
            tableData: []
        };
    },
    //监听属性 类似于data概念
    computed: {},
    //监控data中的数据变化
    watch: {},
    //方法集合
    methods: {
        getQrcode(key, url) {
            var _this = this;
            QRCode.toDataURL(url, {
                errorCorrectionLevel: "L",
                margin: 2
            }, function(err, imgUrl) {
                _this[key] = imgUrl;
            });
        },
        teamInvite(type) {
            //成员邀请
            var _this = this;
            var teamId = _this.teamDetail.objectId;
            var adminMember = _this.teamDetail.adminMember || [];
            var member = _this.teamDetail.member || [];
            var key = "teamMsg_" + teamId + "_" + type;
            var inviteUrl = "https://hola.luoke101.com/haola/ti?key=" + key;
            if (type == 1 && member.length >= 5) {
                //普通成员
                _this.$message({
                    message: "最多添加5个普通成员",
                    type: "error"
                });
                return;
            }
            if (type == 2 && adminMember.length >= 3) {
                //子管理员
                _this.$message({
                    message: "最多添加3个子管理员",
                    type: "error"
                });
                return;
            }
            if (type == 1 && !_this.qrcode1) {
                _this.getQrcode("qrcode1", inviteUrl);
            }
            if (type == 2 && !_this.qrcode2) {
                _this.getQrcode("qrcode2", inviteUrl);
            }
            _this.doAjax({
                url: "getTeamInvite",
                method: "post",
                data: {
                    id: teamId,
                    role: type
                },
                success: function(ret) {
                    // console.log(ret);
                }
            });
        },
        saveNewAdmin() {
            //转让管理员
            var _this = this;
            if (!_this.selNewAdmin) return;
            var postData = {
                id: _this.teamDetail.objectId,
                type: 5,
                teamUserId: _this.selNewAdmin
            };
            _this.$confirm("确认转让管理员？", '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                _this.doAjax({
                    url: "updateTeamMember",
                    method: "post",
                    data: postData,
                    success: function() {
                        _this.$message({
                            message: "删除成功",
                            type: "success"
                        });
                        _this.loadTeamDetail();
                    }
                });
            }).catch(() => {});
        },
        handleClick(row) {
            //删除成员
            var _this = this;
            var postData = {
                id: _this.teamDetail.objectId,
                type: 3,
                teamUserId: row.objectId
            };
            _this.$confirm("确认删除该成员？", '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                _this.doAjax({
                    url: "updateTeamMember",
                    method: "post",
                    data: postData,
                    success: function() {
                        _this.$message({
                            message: "删除成功",
                            type: "success"
                        });
                        _this.loadTeamDetail();
                    }
                });
            }).catch(() => {});
        },
        handleSizeChange(val) {
            console.log(`每页 ${val} 条`);
        },
        handleCurrentChange(val) {
            console.log(`当前页: ${val}`);
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
                    var members = teamDetail.members || [];
                    var memberRole = teamDetail.memberRole || {};
                    var adminMember = []; //管理员
                    var member = []; //普通成员
                    members.forEach(function(node) {
                        if (node) {
                            var id = node.objectId;
                            var role = memberRole[id] || 1;
                            if (role == 2) {
                                adminMember.push(node);
                            } else {
                                member.push(node);
                            }
                        }
                    });
                    teamDetail["adminMember"] = adminMember;
                    teamDetail["member"] = member;
                    _this.teamDetail = teamDetail;
                }
            });
        }
    },
    //生命周期 - 创建完成（可以访问当前this实例）
    created() {
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
.admin .au-show {
    text-align: center;
}

.admin .au-count {
    text-align: center;
    margin-top: 25px;
}

.admin .au-btn {
    text-align: center;
    margin-top: 60px;
}

.admin .main-div-power .main-div-power-top {
    overflow: hidden;
}

.admin .main-div-power .main-div-power-top .main-div-power-top-left {
    float: left;
}

.admin .main-div-power .main-div-power-top .main-div-power-top-left .main-div-power-name {
    font-size: 16px;
    font-family: PingFangSC-Semibold, PingFang SC;
    font-weight: 600;
    color: rgba(50, 53, 65, 1);
}

.admin .main-div-power .main-div-power-top .main-div-power-top-left .main-div-power-au {
    font-size: 14px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: rgba(144, 145, 156, 1);
    margin-top: 10px;
}

.admin .main-div-power .main-div-power-top .main-div-power-top-left img {
    width: 60px;
    /*margin-left: 20px;*/
}

.admin .main-div-power {
    padding-top: 20px;
    border-top: 1px solid #E5E5E5;
}

.admin .main-div-user {
    height: 60px;
    line-height: 60px;
    overflow: hidden;
}

.admin .main-div-list-admin {
    font-size: 14px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: rgba(144, 145, 156, 1);
    margin-top: 10px;
}

.admin .lists {
    width: 50%;
    float: left;

}

.admin .lists .shi {
    width: 250px;
}

.admin .lists .lists-title {
    font-size: 16px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: rgba(144, 145, 156, 1);
}

.admin .form-a {
    font-size: 14px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: rgba(245, 108, 108, 1);
}

.admin .form-b {
    font-size: 12px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: rgba(92, 97, 113, 1);
    line-height: 17px;
}

.admin .main-div-nav {
    text-align: center;
    padding: 20px 0px;
}

.admin .main-div {
    width: 98%;
    background-color: #fff;
}

.admin .main-div .main-div-title {
    background-color: #FAFAFA;
    height: 50px;
    line-height: 50px;
    padding-left: 20px;
    font-size: 14px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: rgba(50, 53, 65, 1);
    letter-spacing: 1px;
    border-bottom: 1px solid #eee;
}

.admin .main-div .main-div-count {
    padding: 20px;
    overflow: hidden;
    min-height: 600px;
}

.admin .main-div .main-div-count .main-div-list {
    overflow: hidden;
    margin-bottom: 20px;
}

.admin .main-div .main-div-count .main-div-list .main-div-list-title {
    float: left;
    font-size: 14px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: rgba(92, 97, 113, 1);
}

.admin .main-div .main-div-count .main-div-list .main-div-list-count {
    font-size: 16px;
    font-family: PingFangSC-Semibold, PingFang SC;
    font-weight: 600;
    color: rgba(50, 53, 65, 1);
}

.admin .main-div .main-div-count .main-div-list .main-div-list-count .el-button {
    padding: 0px;
}
</style>