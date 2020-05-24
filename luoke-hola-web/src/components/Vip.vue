<!-- VIP -->
<template>
    <div class='vip' :style="{height: scrollerHeight}">
        <el-dropdown trigger="click">
            <span class="el-dropdown-link" style="width:270px;height:46px;">
                {{teamDetail.name}}<img src="@/assets/arrow.png" alt="">
            </span>
            <el-dropdown-menu slot="dropdown">
                <el-dropdown-item v-for="(item,index) in teamList" :key="index" @click="changeTeam(item.objectId)">{{item.name}}</el-dropdown-item>
                <!-- <el-dropdown-item icon="el-icon-plus" divided>创建新的组织</el-dropdown-item> -->
            </el-dropdown-menu>
        </el-dropdown>
        <br>
        <img src="@/assets/vip.png" alt="" class="vip-img">
        <div class="vip-name">
            <span v-if="isvip1">体验版会员</span>
            <span v-else-if="isvip2">标准版会员</span>
            <span v-else>免费试用版</span>
        </div>
        <div class="vip-time">
            <span v-if="isvip1"></span>
            <span v-else-if="isvip2"></span>
            <span v-else>PC端试用</span>剩余：{{endDays}}天</div>
        <el-button type="warning" class="vip-btn" @click="goUrlsd('/Vip')" v-if="!isvip1&&!isvip2">升级VIP</el-button>
        <br>
        <el-button type="text" style="margin-top: 20px;margin-left: 0px;" @click="showForm = true">企业认证</el-button>
        <br>
        <img src="@/assets/code.png" alt="" class="vip-code">
        <div class="vip-text">扫码体验好啦测评小程序</div>
        <el-dialog title="企业认证" :visible.sync="showForm" style="text-align: left;" width="900px">
            <el-form ref="form" label-width="80px">
                <el-form-item label="企业名称">
                    <el-input v-model="certConfig.name" style="width: 240px;" placeholder="请输入"></el-input>
                </el-form-item>
                <el-form-item label="团队规模">
                    <el-select v-model="certConfig.memberNum" placeholder="请选择" style="width:240px;">
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
                    <div class="lists" style="margin-left: 80px;">
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
                <el-button type="primary" @click="saveIt">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>
<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';

export default {
    //import引入的组件需要注入到对象中才能使用
    components: {},
    data() {
        //这里存放数据
        return {
            isvip1: false,
            isvip2: false,
            isEndTime: false,
            endDays: 0,
            showForm: false,
            teamDetail: {},
            teamList: [],
            certConfig: {
                cert: "",
                memberNum: "",
                name: ""
            },
            options: [{
                value: '15人以下',
                label: '15人以下'
            }, {
                value: '15-50人',
                label: '15-50人'
            }, {
                value: '50-150人',
                label: '50-150人'
            }, {
                value: '150-500人',
                label: '150-500人'
            }, {
                value: '500-1000人',
                label: '500-1000人'
            }, {
                value: '1000人以上',
                label: '1000人以上'
            }],
        };
    },
    //监听属性 类似于data概念
    computed: {
        scrollerHeight: function() {
            return (window.innerHeight - 60 - 60) + 'px';
        }
    },
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
        saveIt() {
            //企业认证上传
            var _this = this;
            var obj = _this.certConfig;
            if (!obj.name) {
                _this.$message({
                    message: "请填写企业名称",
                    type: "error"
                });
                return;
            }
            if (!obj.memberNum) {
                _this.$message({
                    message: "请选择企业规模",
                    type: "error"
                });
                return;
            }
            if (!obj.cert) {
                _this.$message({
                    message: "请上传企业营业执照",
                    type: "error"
                });
                return;
            }
            _this.doAjax({
                url: "updateTeamMember",
                method: "post",
                data: {
                    type: 4,
                    certConfig: obj
                },
                success: function(ret) {
                    _this.showForm = false;
                    _this.$alert("认证成功");
                    _this.getTeamDetail();
                    _this.getMyTeamList();
                }
            });
        },
        changeTeam(id) {
            if (!id) return;
            _this.GLOBAL.teamId = id;
            this.getTeamDetail();
        },
        getMyTeamList() {
            var _this = this;
            _this.doAjax({
                url: 'myTeamList',
                method: "get",
                data: {
                    page: 1,
                    pageSize: 1000,
                },
                success: function(ret) {
                    if (!ret.data.length) {
                        //无团队
                        return;
                    }
                    _this.teamList = ret.data;
                }
            });
        },
        getTeamDetail() {
            var _this = this;
            _this.doAjax({
                url: "myTeamDetail",
                method: "get",
                data: {
                    id: _this.GLOBAL.teamId
                },
                success: function(ret) {
                    var teamDetail = ret.data;
                    if (!teamDetail) return;
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
                    _this.certConfig = teamDetail.certConfig || _this.certConfig;
                    _this.checkUserVip(teamDetail, _this);
                }
            });
        }
    },
    //生命周期 - 创建完成（可以访问当前this实例）
    created() {
        var _this = this;
        window.refreshPage = function() {
            _this.getMyTeamList();
            _this.getTeamDetail();
        };
        window.refreshPage();
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

.vip .lists {
    // width: 390px;
    float: left;
}

.vip .lists .shi {
    width: 250px;
}

.vip .lists .lists-title {
    font-size: 16px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: rgba(144, 145, 156, 1);
}

.vip .form-a {
    font-size: 14px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: rgba(245, 108, 108, 1);
}

.vip .form-b {
    font-size: 12px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: rgba(92, 97, 113, 1);
    line-height: 17px;
}

.vip {
    width: 280px;
    background: rgba(255, 255, 255, 1);
    box-shadow: 0px 2px 6px 0px rgba(223, 223, 223, 0.27);
    border-radius: 2px;
    text-align: center;
    padding-top: 20px;
}

.vip .el-dropdown-link {
    width: 97px;
    height: 20px;
    font-size: 14px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: rgba(50, 53, 65, 1);
    line-height: 20px;
}

.vip .el-dropdown-link img {
    width: 8px;
    height: 5px;
    margin-left: 15px;
    float: right;
    margin-top: 8px;
}

.vip .vip-img {
    width: 60px;
    margin-top: 20px;
}

.vip .vip-name {
    width: 100%;
    height: 20px;
    font-size: 14px;
    font-family: PingFangSC-Semibold, PingFang SC;
    font-weight: bolder;
    color: rgba(50, 53, 65, 1);
    line-height: 20px;
    letter-spacing: 1px;
    text-align: center;
    margin-top: 8px;
}

.vip .vip-time {
    height: 17px;
    font-size: 12px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: rgba(230, 162, 60, 1);
    line-height: 17px;
    letter-spacing: 1px;
    margin-top: 5px;
}

.vip .vip-btn {
    width: 210px;
    height: 40px;
    background: linear-gradient(270deg, rgba(227, 195, 138, 1) 0%, rgba(244, 223, 190, 1) 100%);
    border-radius: 4px;
    border: 0px;
    margin-top: 37px;
}

.vip .vip-code {
    width: 80px;
    margin-top: 172px;
}

.vip .vip-text {
    height: 20px;
    font-size: 14px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: rgba(50, 53, 65, 1);
    line-height: 20px;
    letter-spacing: 1px;
}
</style>