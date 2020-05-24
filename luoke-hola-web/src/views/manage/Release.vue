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
                        <div class="main-top-title" @click="hideChild">
                            <el-breadcrumb separator="/">
                                <el-breadcrumb-item :to="{ path: '/ManageIndex' }">测评列表</el-breadcrumb-item>
                                <el-breadcrumb-item> <span :class="childPageName?'el-breadcrumb__inner is-link':''">发放测评</span></el-breadcrumb-item>
                                <el-breadcrumb-item v-if="childPageName"> {{childPageName}}</el-breadcrumb-item>
                            </el-breadcrumb>
                        </div>
                        <div class="main-top-count">
                            <div class="main-top-count-top">
                                <img :src="paperData.setting.img" alt="" class="top-main-img">
                                <div class="main-top-count-main">
                                    <div class="top-count-title">{{paperData.name}}</div>
                                    <div class="top-count-btn">
                                        <div style="float: left;width:81px;height:25px;line-height:25px;text-align: center;margin-top: 5px;margin-right: 10px;background:rgba(255,231,229,1);border-radius:13px;border:1px solid rgba(243,147,139,1);font-size:12px;color:#F56C6C;">
                                            <span v-if="!vip">剩余{{(recode.freeCount||0)+(recode.buyCount||0)-(recode.count||0)}}份</span>
                                            <span v-else>不限量</span>
                                        </div>
                                        <el-button type="text" @click="userBuy = true" v-if="!vip"><i class="el-icon-shopping-cart-1"></i> 购买更多</el-button>
                                    </div>
                                    <div class="top-count-p">{{paperData.info}}</div>
                                </div>
                            </div>
                            <template v-if="childPageName">
                                <div :is="childPage" :toSharePaper="toSharePaper" :updateTeamDutys="updateTeamDutys" :loadPaperDetail="loadPaperDetail" :getPartantData="getPartantData"></div>
                            </template>
                            <template v-else>
                                <div class="main-top-list">
                                    <img src="@/assets/dx.png" alt="">
                                    <div class="list-title">短信邀请</div>
                                    <div class="list-count">被邀请人员点击短信内链接进入测评</div>
                                    <div class="list-btn">
                                        <el-button type="primary" @click="showChild('短信邀请','child1')">立即邀请</el-button>
                                    </div>
                                </div>
                                <div class="main-top-list border-list">
                                    <img src="@/assets/yj.png" alt="">
                                    <div class="list-title">邮件邀请</div>
                                    <div class="list-count">被邀请人员点击电子邮箱内链接进入测评</div>
                                    <div class="list-btn">
                                        <el-button type="primary" @click="showChild('邮件邀请','child2')">立即邀请</el-button>
                                    </div>
                                </div>
                                <div class="main-top-list">
                                    <img src="@/assets/code.png" alt="">
                                    <div class="list-title">二维码邀请</div>
                                    <div class="list-count">被邀请人员识别二维码，完善个人信息后开始作答</div>
                                    <div class="list-btn">
                                        <el-button type="primary" @click="showChild('二维码邀请','child3')">立即邀请</el-button>
                                    </div>
                                </div>
                            </template>
                        </div>
                    </div>
                </el-main>
            </el-container>
        </el-container>
        <el-dialog title="" :visible.sync="userBuy" width="419px">
            <span>
                <div class="user-buy-top">
                    <div class="user-buy-left">
                        <img src="@/assets/loginImg.png" alt="">
                    </div>
                    <div class="user-buy-left">
                        <div class="user-buy-title">{{paperData.name}}</div>
                        <div class="user-buy-sale">单价：{{paperData.setting.price}}</div>
                    </div>
                </div>
                <div class="user-buy-form">
                    <el-input-number v-model="num" :min="1" :max="999" label="描述文字" @change="handleChange"></el-input-number>
                    <span class="user-buy-label">合计：</span>
                    <span class="user-buy-price">{{allPrice}}元</span>
                </div>
                <div class="user-buy-mode">
                    <div class="user-buy-mode-title">支付方式：</div>
                    <div class="user-buy-mode-count">
                        <div class="left">
                            <img src="@/assets/wx.png" alt="">
                            <span class="mode-title">微信支付</span>
                        </div>
                        <div class="right">
                            <el-radio v-model="buyMode" label="1"></el-radio>
                        </div>
                    </div>
                    <div class="user-buy-mode-count">
                        <div class="left">
                            <img src="@/assets/quan.png" alt="">
                            <span class="mode-title">用券兑换</span>
                        </div>
                        <div class="right"><span style="font-size:14px;color:rgba(144,145,156,1);margin-right: 19px;">{{(paperData.userPapersNum.freeTicket ||0)+ (paperData.userPapersNum.vipTicket||0)}}张券可用于本测评</span>
                            <el-radio v-model="buyMode" label="3"></el-radio>
                        </div>
                    </div>
                    <div class="user-buy-mode-btn">
                        <el-button type="primary" @click="buyed">立即购买</el-button>
                    </div>
                </div>
            </span>
        </el-dialog>
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
import ManageMessage from '@/views/manage/Message.vue'; //短信邀请
import ManageEmaill from '@/views/manage/Email.vue'; //邮件邀请
import ManageCode from '@/views/manage/Code.vue'; //二维码邀请

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
            teamDetail: {},
            industryList: [],
            childPageName: "",
            childPage: "",
            orderId: "",
            payQrcode: "",
            payDlg: false,
            userBuy: false,
            buyOk: false,
            vip: false,
            allPrice: 0,
            paperData: {
                userPapersNum: {},
                setting: {}
            },
            recode: {

            },
            buyMode: '1',
            num: 1,
            showNav: true,
            userLogin: false,
            activeIndex: '2',
            navIndex: '1',
            userBuy: false
        };
    },
    //监听属性 类似于data概念
    computed: {},
    //监控data中的数据变化
    watch: {},
    //方法集合
    methods: {
        toSharePaper(shareMsg, cb) {
            var _this = this;
            var id = _this.paperData.id;
            _this.doAjax({
                url: "toSharePaper",
                method: "post",
                data: {
                    id: id,
                    shareMsg: JSON.stringify(shareMsg)
                },
                success: function(ret) {
                    cb && cb(ret.data);
                }
            });
        },
        hideChild(e) {
            if (e.target.innerText == "发放测评") {
                this.childPageName = "";
                this.childPage = "";
            }
        },
        showChild(name, type) {
            if (type == "child1") {
                type = ManageMessage;
            }
            if (type == "child2") {
                type = ManageEmaill;
            }
            if (type == "child3") {
                type = ManageCode;
            }
            this.childPage = type;
            this.childPageName = name;
        },
        handleChange(value) {
            var price = this.paperData.setting.price
            this.allPrice = price * value
        },
        loadPaperDetail() {
            var _this = this;
            var id = _this.id;
            _this.doAjax({
                url: 'sharePaperList',
                method: "get",
                data: {
                    type: 1,
                    page: 1,
                    pageSize: 1000,
                    id: id
                },
                success: function(response) {
                    if (response.status == 200) {
                        _this.recode = response.data.data[0];
                        var paperId = _this.recode.paper.id;
                        _this.doAjax({
                            url: 'paperDetail',
                            method: "get",
                            data: {
                                id: paperId
                            },
                            success: function(response) {
                                _this.paperData = response.data;
                                _this.allPrice = response.data.setting.price;
                                var isVip1 = _this.GLOBAL.isvip1;
                                var isVip2 = _this.GLOBAL.isvip2;
                                _this.isVip = isVip1 || isVip2;
                            }
                        });
                    }
                }
            });
        },
        buyed() {
            var _this = this;
            var type = +_this.buyMode;
            var num = _this.num;
            var paperData = _this.paperData;
            _this.doAjax({
                url: "buyPaper",
                method: "post",
                data: {
                    payPC: true,
                    id: paperData.id,
                    count: num,
                    type: type || 1
                },
                success: function(ret) {
                    ret = ret.data;
                    if (type != 1) {
                        //用券购买
                        _this.$message({
                            message: "购买成功",
                            type: "success"
                        });
                        _this.payDlg = false;
                        _this.userBuy = false;
                        _this.loadPaperDetail();
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
            //微信支付购买测评
            var _this = this;
            if (!_this.payDlg || !_this.orderId) return;
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
                        _this.userBuy = false;
                        _this.loadPaperDetail();
                    } else {
                        if (checkOnes) return;
                        setTimeout(_this.checkPay, 1000);
                    }
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
                    _this.teamDetail = teamDetail;
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
                }
            });
        },
        loadMemberList() {
            var _this = this;
            _this.doAjax({
                url: "teamOrgList",
                method: "get",
                data: {},
                success: function(ret) {
                    var list = ret.data;
                    var tableData = {};
                    var arr1 = [];
                    list.forEach(function(node) {
                        var parent = node.parent;
                        var obj = {
                            id: node.id,
                            label: node.name,
                            fullData: node
                        };
                        if (parent) {
                            tableData[parent] = tableData[parent] || [];
                            tableData[parent].push(obj);
                        } else {
                            arr1.push(obj);
                        }
                    });
                    arr1 = _this.checkChild(arr1, tableData);
                    _this.memberList = arr1;
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
        },
        getPartantData() {
            var recode = this.recode;
            return {
                count: ((recode.freeCount || 0) + (recode.buyCount || 0) - (recode.count || 0)),
                vip: this.vip,
                teamDutys: this.teamDetail.dutys,
                industryList: this.industryList,
                memberList: this.memberList
            };
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
        }
    },
    //生命周期 - 创建完成（可以访问当前this实例）
    created() {
        var _this = this;
        var id = _this.$route.query.id;
        if (!id) return;
        _this.id = id;
        _this.vip = _this.GLOBAL.isvip1;
        _this.loadPaperDetail();
        _this.loadTeamDetail();
        _this.loadIndustryList();
        _this.loadMemberList();
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
.user-buy-mode {
    padding-top: 20px;
}

.user-buy-mode-title {
    font-size: 14px;
    font-family: PingFangSC-Semibold, PingFang SC;
    font-weight: 600;
    color: rgba(92, 97, 113, 1);
    margin-bottom: 10px;
}

.user-buy-mode-count {
    overflow: hidden;
    height: 40px;
    line-height: 40px;
}

.user-buy-mode-count .left {
    float: left;
}

.user-buy-mode-count .right {
    float: right;
}

.user-buy-mode-count img {
    width: 20px;
    float: left;
    margin-top: 10px;
    margin-right: 13px;
}

.user-buy-mode-btn .el-button {
    width: 359px;
    height: 47px;
    background: rgba(89, 96, 237, 1);
    border-radius: 4px;
    text-align: center;
    margin-top: 30px;
}

.mode-title {
    font-size: 14px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: rgba(50, 53, 65, 1);
}

.user-buy-form {
    height: 80px;
    line-height: 80px;
    border-bottom: 1px solid #D8D8D8;
}

.user-buy-label {
    font-size: 14px;
    font-family: PingFangSC-Semibold, PingFang SC;
    font-weight: 600;
    color: rgba(50, 53, 65, 1);
    margin-left: 32px;
}

.user-buy-price {
    font-size: 20px;
    font-family: PingFangSC-Semibold, PingFang SC;
    font-weight: 600;
    color: rgba(235, 47, 47, 1);
    margin-left: 4px;
}

.user-buy-top {
    overflow: hidden;
    padding-bottom: 20px;
    border-bottom: 1px solid #D8D8D8;
}

.user-buy-left {
    float: left;
}

.user-buy-left img {
    width: 136px;
    height: 73px;
}

.user-buy-title {
    height: 25px;
    font-size: 18px;
    font-family: PingFangSC-Semibold, PingFang SC;
    font-weight: 600;
    color: rgba(50, 53, 65, 1);
    margin-left: 28px;
}

.user-buy-sale {
    font-size: 14px;
    font-family: PingFangSC-Semibold, PingFang SC;
    font-weight: 600;
    color: rgba(235, 47, 47, 1);
    margin-left: 28px;
    margin-top: 8px;
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
    padding: 20px;
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