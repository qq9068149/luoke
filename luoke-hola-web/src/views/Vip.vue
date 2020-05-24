<!--  -->
<template>
    <div class='vips' style="background-color: #fff" :style="{height: scrollerHeight}">
        <div class="vip-header" style="box-shadow: rgba(000, 000, 000, 0.1) 0px 2px 21px 0px;">
            <a href="/"><img src="@/assets/logo.png" alt="" class="vip-logo"></a>
            <div class="vip-user">
                <el-popover placement="bottom" width="" popper-class="noP" trigger="hover">
                    <el-button style="width:100%;border: 0px;" @click="loginOut">退出</el-button>
                    <el-button slot="reference" type="text" style="font-size:16px;margin-right: 20px;color:rgba(50,53,65,1);"><img style="width:30px;border-radius: 50%;float:left;margin: -10px 11px 0px 25px;" :src="loginUserMsg.avatar" alt="">{{teamDetail.name}}</el-button>
                </el-popover>
            </div>
        </div>
        <div class="box" style="overflow: hidden;margin-top:2px;border-radius:8px;border: 1px solid #e7e7e7;box-shadow: rgba(000, 000, 000, 0.1) 0px 2px 21px 0px;margin-top: 20px  ">
            <div class="fl vip-count-title">
                <!-- <div class="vip-count-top">
                <div style="font-size:26px;font-weight:600;color:rgba(50,53,65,1);margin:81px 0px 0px 40px;">价格</div>
                <div style="width:249px;font-size:16px;color:rgba(50,53,65,1);margin:13px 0px 0px 40px;">我们提供不同的功能服务组合，让不同需求的用户感到物超所值</div>
                <div style="width:108px;height:5px;background:rgba(216,216,216,1);margin:21px 0px 0px 40px;"></div>
                <div class="vip-count-list-title" style="margin:56px 0px 0px 40px;">微信小程序</div>
            </div> -->
                <div class="vip-count-top">
                    <div style="font-size:26px;font-weight:600;color:rgba(50,53,65,1);margin: 50px 0 0 40px;">{{teamDetail.name}}</div>
                    <div style="font-size:16px;color:rgba(144,145,156,1);margin: 12px 0 0 38px;"><img src="@/assets/novip.png" style="width: 18px;height: 18px;float: left;margin: 2px 4px 0 0px;" alt="">
                        <span v-if="isvip1">体验版会员</span>
                        <span v-else-if="isvip2">标准版会员</span>
                        <span v-else>免费版会员</span>
                    </div>
                    <div style="width:249px;font-size:14px;color:rgba(245,108,108,1);margin: 25px 0 0 38px;" v-if="isEndTime">会员已到期，如需继续使用PC端，请升级VIP</div>
                    <div class="vip-count-list-title" style="margin:71px 0px 0px 40px;">微信小程序</div>
                </div>
                <div class="vip-count-list vip-count-list-color">测评购买/发放</div>
                <div class="vip-count-list ">测评报告查看</div>
                <div class="vip-count-list vip-count-list-color">通用测评兑换券</div>
                <div class="vip-count-list vip-count-list-title">PC电脑客户端</div>
                <div class="vip-count-list vip-count-list-color">短信批量发放测评</div>
                <div class="vip-count-list">组织成员批量导入与管理</div>
                <div class="vip-count-list vip-count-list-color">报告下载与导出</div>
                <div class="vip-count-list">报告对比统计报表</div>
            </div>
            <div class="fl vip-count-lists">
                <div class="vip-count-top">
                    <div class="vip-box">
                        <div style="font-size:20px;color:rgba(144,145,156,1);font-weight:600;margin-top:79px;">免费版</div>
                        <div style="font-size:30px;font-weight:600;color:rgba(144,145,156,1);margin-top:20px;">¥0</div>
                    </div>
                </div>
                <div class="vip-count-list vip-count-list-color text-c"><i class="el-icon-check" style="font-size: 22px;font-weight: bold;color: #67C23A;"></i></div>
                <div class="vip-count-list text-c"><i class="el-icon-check" style="font-size: 22px;font-weight: bold;color: #67C23A;"></i></div>
                <div class="vip-count-list vip-count-list-color"></div>
                <div class="vip-count-list vip-count-list-title"></div>
                <div class="vip-count-list vip-count-list-color"></div>
                <div class="vip-count-list"></div>
                <div class="vip-count-list vip-count-list-color"></div>
                <div class="vip-count-list"></div>
            </div>
            <div class="fl vip-count-lists">
                <div class="vip-count-top">
                    <div class="vip-box" style="overflow: hidden;border:0px;background:linear-gradient(152deg,rgba(41,166,255,1) 0%,rgba(53,95,255,1) 100%);box-shadow:0px 2px 21px 0px rgba(43,154,255,0.6);color:rgba(252,254,255,1);">
                        <div style="font-size:20px;font-weight:600;margin:27px 0px 0px 0px;">标准版会员</div>
                        <div style="font-size:30px;font-weight:600;margin:15px 0px 0px 0px;">¥2980 <span style="font-size:18px;">/年</span></div>
                        <div style="font-size:16px;text-decoration: line-through;margin:12px 0px 0px 0px;">原价：¥4300</div>
                        <div style="margin:24px 0px 0px 0px;">
                            <el-button @click="buyVip(2)" style="width:174px;color:rgba(44,147,255,1);font-size:18px;font-weight:600;">立即开通</el-button>
                        </div>
                    </div>
                </div>
                <div class="vip-count-list vip-count-list-color text-c"><i class="el-icon-check" style="font-size: 22px;font-weight: bold;color: #67C23A;"></i></div>
                <div class="vip-count-list  text-c"><i class="el-icon-check" style="font-size: 22px;font-weight: bold;color: #67C23A;"></i></div>
                <div class="vip-count-list vip-count-list-color text-c" style="font-size:16px;font-weight:600;"><span style="color:#F56C6C">78</span><span style="color: #323541;">张测评通用测评兑换券</span></div>
                <div class="vip-count-list text-c"></div>
                <div class="vip-count-list vip-count-list-color text-c"></div>
                <div class="vip-count-list text-c"></div>
                <div class="vip-count-list vip-count-list-color text-c"></div>
                <div class="vip-count-list"></div>
            </div>
            <div class="fl vip-count-lists">
                <div class="vip-count-top">
                    <div class="vip-box" style="overflow: hidden;border:0px;background:linear-gradient(152deg,rgba(255,175,125,1) 0%,rgba(255,92,0,1) 100%);box-shadow:0px 2px 21px 0px rgba(255,92,0,0.55);color:rgba(252,254,255,1);">
                        <div style="font-size:20px;font-weight:600;margin:27px 0px 0px 0px;">专业版会员</div>
                        <div style="font-size:30px;font-weight:600;margin:15px 0px 0px 0px;">¥4980 <span style="font-size:18px;">/年</span></div>
                        <div style="font-size:16px;text-decoration: line-through;margin:12px 0px 0px 0px;">原价：¥7800</div>
                        <div style="margin:24px 0px 0px 0px;">
                            <el-button @click="buyVip(2)" style="width:174px;color:#FF630B;font-size:18px;font-weight:600;">立即开通</el-button>
                        </div>
                    </div>
                </div>
                <div class="vip-count-list vip-count-list-color text-c"><i class="el-icon-check" style="font-size: 22px;font-weight: bold;color: #67C23A;"></i></div>
                <div class="vip-count-list  text-c"><i class="el-icon-check" style="font-size: 22px;font-weight: bold;color: #67C23A;"></i></div>
                <div class="vip-count-list vip-count-list-color text-c" style="font-size:16px;font-weight:600;"><span style="color:#F56C6C">148</span><span style="color: #323541;">张测评通用测评兑换券</span></div>
                <div class="vip-count-list text-c"></div>
                <div class="vip-count-list vip-count-list-color text-c"><i class="el-icon-check" style="font-size: 22px;font-weight: bold;color: #67C23A;"></i></div>
                <div class="vip-count-list text-c"><i class="el-icon-check" style="font-size: 22px;font-weight: bold;color: #67C23A;"></i></div>
                <div class="vip-count-list vip-count-list-color text-c"><i class="el-icon-check" style="font-size: 22px;font-weight: bold;color: #67C23A;"></i></div>
                <div class="vip-count-list text-c"><i class="el-icon-check" style="font-size: 22px;font-weight: bold;color: #67C23A;"></i></div>
            </div>
        </div>
        <el-dialog class="payDlg" title="" v-if="payQrcode" :visible.sync="payDlg" width="419px" center>
            <img :src="payQrcode" alt="" width="150px" height="150px">
            <div class="mind">请使用微信扫描此二维码进行支付</div>
            <el-button type="primary" @click="checkPay(true)">我已完成支付</el-button>
        </el-dialog>
    </div>
</template>
<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import QRCode from "qrcode";
export default {
    //import引入的组件需要注入到对象中才能使用
    components: {},
    data() {
        //这里存放数据
        return {
            isvip1: false,
            isvip2: false,
            isEndTime: false,
            orderId: "",
            payQrcode: "",
            payDlg: false,
            loginUserMsg: {},
            teamDetail: {}
        };
    },
    //监听属性 类似于data概念
    computed: {
        scrollerHeight: function() {
            return (window.innerHeight) + 'px';
        }
    },
    //监控data中的数据变化
    watch: {},
    //方法集合
    methods: {
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
                    _this.teamDetail = teamDetail;
                    _this.checkUserVip(teamDetail,_this);
                }
            });
        },
        buyVip(type) {
            var _this = this;
            _this.doAjax({
                url: "buyVip",
                method: "post",
                data: {
                    payPC: true,
                    type: type
                },
                success: function(ret) {
                    ret = ret.data;
                    if (!ret.orderId) {
                        _this.$message({
                            message: ret,
                            type: "success"
                        });
                        return;
                    }
                    QRCode.toDataURL(ret.code_url, {
                        errorCorrectionLevel: "L",
                        margin: 2
                    }, function(err, url) {
                        _this.payQrcode = url;
                        _this.payDlg = true;
                    });
                    _this.orderId = ret.orderId;
                    _this.checkPay();
                }
            });
        },
        checkPay(checkOnes) {
            //微信支付购买VIP
            var _this = this;
            if ((!_this.payDlg && !checkOnes) || !_this.orderId) return;
            _this.doAjax({
                url: "checkOrderStatus",
                method: "post",
                data: {
                    id: _this.orderId
                },
                success: function(ret) {
                    if (ret.data == "true") {
                        _this.$message({
                            message: "购买成功",
                            type: "success"
                        });
                        _this.payDlg = false;
                        _this.loadTeamDetail();
                    } else {
                        if (checkOnes) return;
                        setTimeout(_this.checkPay, 1000);
                    }
                }
            });
        },
    },
    //生命周期 - 创建完成（可以访问当前this实例）
    created() {
        var _this = this;
        this.loginUserMsg = this.GLOBAL.loginUserMsg || {};
        _this.loadTeamDetail();
    },
    //生命周期 - 挂载完成（可以访问DOM元素）
    mounted() {

    },
    beforeCreate() {}, //生命周期 - 创建之前
    beforeMount() {}, //生命周期 - 挂载之前
    beforeUpdate() {}, //生命周期 - 更新之前
    updated() {}, //生命周期 - 更新之后
    beforeDestroy() {
        this.payDlg = false;
    }, //生命周期 - 销毁之前
    destroyed() {}, //生命周期 - 销毁完成
    activated() {}, //如果页面有keep-alive缓存功能，这个函数会触发
}
</script>
<style lang='scss' scoped>
//@import url(); 引入公共css类
.fl {
    float: left;

}

.text-c {
    text-align: center;
    padding-left: 0px !important;
}

.vip-box {
    width: 240px;
    height: 242px;
    border-radius: 8px;
    border: 1px solid rgba(231, 231, 231, 1);
    margin: 23px 21px;
    text-align: center;
}

.vip-count-lists {
    width: 280px;
    border-right: 1px solid #e7e7e7;
}

.vip-count-title {
    width: 356px;
    border-right: 1px solid #e7e7e7;
}

.vip-count-top {
    background-color: #fff;
    height: 293px;
    overflow: hidden;
}

.vip-count-list {
    height: 50px;
    line-height: 50px;
    background-color: #fff;
    margin-top: 1px;
    padding-left: 40px;
    font-size: 16px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: rgba(50, 53, 65, 1);
}

.vip-count-list-color {
    background: rgba(247, 247, 247, 1);
}

.vip-count-list-title {
    font-size: 18px;
    font-family: PingFangSC-Semibold, PingFang SC;
    font-weight: 600;
    color: rgba(89, 96, 237, 1);
}

.vips {}

.vip-header {
    overflow: hidden;
    height: 60px;
    background: rgba(255, 255, 255, 1);
    border-bottom: #e7e7e7 1px solid;
}

.vip-logo {
    float: left;
    width: 93px;
    height: 25px;
    margin: 17px 40px;
}

.vip-user {
    float: right;
    line-height: 60px;
    overflow: hidden;
}

.vip-user img {
    width: 26px;
    height: 26px;
    border: 1px solid rgba(151, 151, 151, 0.51);
    border-radius: 50%;
    float: left;
    margin-top: 17px;
}

.vip-user span {
    font-size: 16px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: rgba(50, 53, 65, 1);
    margin: 19px 40px 20px;
}

.payDlg img {
    display: block;
    width: 160px;
    height: 160px;
    margin: auto;
}

.payDlg .mind {
    margin-top: 40px;
    text-align: center;
    font-size: 14px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: rgba(50, 53, 65, 1);
    line-height: 20px;
    letter-spacing: 1px;
}

.payDlg .el-button {
    width: 301px;
    margin-top: 53px;
    margin-bottom: 142px;
    display: block;
    margin: 70px auto 30px;
}
</style>