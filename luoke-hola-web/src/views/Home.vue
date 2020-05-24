<!--  -->
<template>
    <div class='home'>
        <div class='home-header' style="min-width: 1200px;" :class="isFixed ? 'tmNo' : 'tm'">
            <div class="logo">
                <a href="/"><img :src="isFixed ? require('../assets/logo.png') : require('../assets/logo-home.png')" alt=""></a>
            </div>
            <div class="user-menu">
                <div class="login" v-if="userLogin">
                    <!-- <el-button type="primary" @click="goUrl('/workbench')">登录/注册</el-button> -->
                    <el-button type="text" @click="goUrl('/login')" :class="isFixed ? 'blue' : 'fff'">登录/注册</el-button>
                </div>
                <div class="user" v-if="!userLogin">
                    <el-button type="text" @click="goUrl('/Workbench')" :class="isFixed ? 'blue' : 'fff'" style="font-size:14px;font-weight: 400;">
                        进入管理后台
                    </el-button>
                    <el-popover placement="bottom" width="" popper-class="noP" trigger="hover">
                        <el-button style="width:100%;border: 0px;" @click="loginOut">退出</el-button>
                        <el-button slot="reference" type="text" :class="isFixed ? 'blue' : 'fff'" style="font-size:14px;margin-right: 20px;font-weight: 400;">
                            <img style="width:30px;border-radius: 50%;float:left;margin: -10px 11px 0px 25px;" :src="loginUserMsg.avatar" alt="">
                            {{loginUserMsg.nickname}}
                        </el-button>
                    </el-popover>
                </div>
            </div>
            <div class="user-menu">
            </div>
        </div>
        <el-carousel height="570px">
            <el-carousel-item v-for="(item, index) in imgs" :key="index">
                <div class="imgBack" :style="{background: 'url('+item.img+') center center no-repeat #5960ED'}"></div>
            </el-carousel-item>
        </el-carousel>
        <div class="home-banner-btn" v-if="navigation.length != 0">
            <div class="home-banner-btn-list">
                <div class="home-banner-list-left">
                    <i class="el-icon-goods"></i>
                </div>
                <div class="home-banner-list-left">
                    <div class="home-banner-list-left-title">校招选才</div>
                    <div class="home-banner-list-left-count">精准助力企业校招</div>
                </div>
            </div>
            <div class="home-banner-btn-list">
                <div class="home-banner-list-left">
                    <i class="el-icon-shopping-cart-2"></i>
                </div>
                <div class="home-banner-list-left">
                    <div class="home-banner-list-left-title">免费专区</div>
                    <div class="home-banner-list-left-count">测评免费享，限时体验</div>
                </div>
            </div>
        </div>
        <div class="box">
            <template v-for="item in lists">
                <template v-if="!item.papers.length"></template>
                <div class="column" v-else-if="item.classify.length>1||item.showClassify">
                    <div class="box">
                        <div class="column-title">{{item.name}}</div>
                        <div class="column-introduce">{{item.info}}</div>
                        <el-tabs v-model="activeName">
                            <template v-for="(node, i) in item.classify">
                                <el-tab-pane :label="node.name" :name="'classify'+i">
                                    <div class="column-count" style="padding: 20px 0 34px 0;">
                                        <template v-for="(n, i1) in node.papers">
                                            <div class="column-count-listd" v-if="i1<3" style="margin: 0px;text-align:center;">
                                                <img :src="n.pcImg||n.img" alt="" style="width:303px;height: 162px;">
                                                <div class="column-count-list-title">{{n.name}}</div>
                                                <div class="column-count-list-count">{{n.info}}</div>
                                                <div class="column-count-list-main" v-if="n.measureDimension.length">
                                                    <div class="column-count-list-main-title"><img src="@/assets/iaia.png" alt=""
                                                                                                   style="width: 18px;height:20px;margin-right: 10px;">测量维度
                                                    </div>
                                                    <ul style="list-style: none;">
                                                        <li v-for="(itemList, indexList) in n.measureDimension" :key="indexList" v-if="indexList<4"><span
                                                                style="font-weight: bold;margin-right: 5px;margin-left: 12px;">·</span>{{itemList}}
                                                        </li>
                                                    </ul>
                                                </div>
                                                <div class="column-count-list-btn">
                                                    <el-button type="primary" style="width: 164px;"
                                                               @click="goUrld('/EvaluationDetails',item.name,item.id, n.name, n.id)">查看详情
                                                    </el-button>
                                                </div>
                                            </div>
                                        </template>
                                        <div class="moreHome" v-if="node.papers.length>3">
                                            <el-button type="text" @click="goUrls('/EvaluationIndex', item.id)"
                                                       style="width: 50px;line-height:25px;font-size:18px;margin-top: 243px;">查<br>看<br>更<br>多<br><img
                                                    src="@/assets/arry-left.png" alt="" style="width:14px;"></el-button>
                                        </div>
                                    </div>
                                </el-tab-pane>
                            </template>
                        </el-tabs>
                    </div>
                </div>
                <div class="column" :class="navigation.length != 0 ? 'toptop': ''" v-else>
                    <div class="column-title">{{item.name}}</div>
                    <div class="column-introduce">{{item.paperInfo}}</div>
                    <div class="column-btn" v-if="item.papers.length>3">
                        <el-button type="text" @click="goUrls('/EvaluationIndex', item.id)" style="font-size:18px;">查看更多{{item.name}}相关测评 >></el-button>
                    </div>
                    <div class="column-count">
                        <div class="column-count-list" v-for="(itemed, indexed) in item.papers" :key="indexed+'aaa'" v-if="indexed < 3"
                             :class="item.papers.length == 1 ? 'left1': item.papers.length == 2 ? '' : ''">
                            <img :src="itemed.pcImg||itemed.img" alt="">
                            <div class="column-count-list-title">{{itemed.name}}</div>
                            <div class="column-count-list-count">{{itemed.info}}</div>
                            <div class="column-count-list-main" v-if="itemed.measureDimension.length">
                                <div class="column-count-list-main-title"><img src="@/assets/iaia.png" alt=""
                                                                               style="width: 18px;height:20px;margin-right: 10px;"> 测量维度
                                </div>
                                <ul style="list-style: none;">
                                    <li v-for="(itemList, indexList) in itemed.measureDimension" :key="indexList" v-if="indexList<4"><span
                                            style="font-weight: bold;margin-right: 5px;margin-left: 12px;">·</span>{{itemList}}
                                    </li>
                                </ul>
                            </div>
                            <div class="column-count-list-btn">
                                <el-button type="primary" @click="goUrld('/EvaluationDetails',item.name,item.id, itemed.name, itemed.id)"
                                           style="width:164px;height:40px;">查看详情
                                </el-button>
                            </div>
                        </div>
                    </div>
                </div>
            </template>
        </div>
        <div class="footer">
            <div class="footer-top">
                <div class="footer-top-left">
                    <div class="footer-list">电话：4008877091</div>
                    <div class="footer-list">邮箱：hz@luoke101.com</div>
                    <div class="footer-list">地址：福建省厦门市思明区望海路61号</div>
                </div>
                <div class="footer-top-right">
                    <div class="footer-code">
                        <img src="@/assets/qrCode.jpg" alt="">
                        <div class="footer-code-count">扫码关注<br>好啦测评公众号</div>
                    </div>
                    <div class="footer-code">
                        <img src="@/assets/miniProgram.jpg" alt="">
                        <div class="footer-code-count">扫码关注<br>好啦测评小程序</div>
                    </div>
                </div>
            </div>
            <div class="footer-bottom">罗课（厦门）网络科技有限公司 Copyright ©2019 <a href="http://www.miitbeian.gov.cn" target="_blank" style="color: #ffffff">闽ICP备19024736号-2</a>
            </div>
        </div>
        <div class="advadv" v-if="!hasFreeTick&&!userLogin">
            <el-button type="text" @click="showTickGet"><img src="@/assets/lq.png" alt=""></el-button>
        </div>
        <div class="adv-count" :style="{height: scrollerHeight}" v-if="advsd">
            <div class="adv-main">
                <img src="@/assets/advs.png" alt="" class="advs">
                <div class="qcodes">
                    <div class="qcode-count">
                        <img :src="qrcode" alt="">
                    </div>
                </div>
                <el-button type="text" @click="showTickGet"><img src="@/assets/close.png" alt="" class="close"></el-button>
                <!-- <el-button type="text" @click="goodAdv = true"><img src="@/assets/close.png" alt="" class="close"></el-button> -->
            </div>
        </div>
        <el-dialog title="" :visible.sync="goodAdv" width="404px">
            <div style="font-size: 64px;text-align: center;color: #67C23A;"><i class="el-icon-circle-check"></i></div>
            <div style="font-size:16px;color:rgba(50,53,65,1);text-align: center;">您已获得1张测评体验券</div>
            <el-button type="primary" style="width:266px;height:50px;font-size:16px;margin-left: 48px;margin-top: 54px;"
                       @click="goUrls('/EvaluationIndex', columnId_ticket)">点击前往{{columnName}}
            </el-button>
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
                isGetTick: false,
                columnName: "",
                isLogin: false,
                freeTickId: "",
                columnId_ticket: "",
                hasFreeTick: false,
                qrcode: "",
                loginData: {},
                loginUserMsg: {},
                goodAdv: false,
                advsd: false,
                userLogin: true,
                imgs: [],
                lists: [],
                activeName: 'classify0',
                papapers: [],
                navigation: [],
                isFixed: false
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
            showTickGet() {
                var _this = this;
                _this.advsd = !_this.advsd;
                if (_this.advsd) {
                    _this.isGetTick = true;
                    if (!_this.GLOBAL.token) {
                        _this.checkPCLogin();
                    } else {
                        _this.checkTick();
                    }
                } else {
                    _this.isGetTick = false;
                }
            },
            //获取微信二维码
            getQrcode() {
                var _this = this;
                _this.doAjax({
                    url: 'pcLogin',
                    method: "post",
                    data: {
                        getTick: true,
                        isLogin: _this.GLOBAL.token ? true : false,
                    },
                    success: function(ret) {
                        var data = ret.data;
                        data.now = new Date().getTime();
                        _this.loginData = data;
                        QRCode.toDataURL(_this.loginData.url, {
                            errorCorrectionLevel: "L",
                            margin: 2
                        }, function(err, url) {
                            _this.qrcode = url;
                        });
                    }
                });
            },
            //检查用户登录
            checkPCLogin() {
                var _this = this;
                if (!_this.advsd) return;
                _this.doAjax({
                    url: 'checkPCLogin',
                    method: "post",
                    data: {
                        "key": _this.loginData.key
                    },
                    success: function(ret) {
                        var token = ret.data;
                        if (!token) {
                            setTimeout(_this.checkPCLogin, 1000); //每秒重复请求
                            return;
                        }
                        //存储token到本地缓存--完成登录操作
                        _this.GLOBAL.token = token;
                        _this.GLOBAL.tokenGetTime = new Date().getTime();
                        localStorage.setItem("tokenMsg", JSON.stringify({
                            token: token,
                            tokenGetTime: _this.GLOBAL.tokenGetTime
                        }));
                        _this.checkTick();
                    }
                });
            },
            checkTick(ones) {
                var _this = this;
                var loginData = _this.loginData;
                var now = new Date().getTime();
                var t = (now - loginData.now) / 1000;
                if (t >= loginData.time) {
                    //刷新二维码
                    _this.getQrcode();
                    return;
                }
                _this.doAjax({
                    url: 'getMyticket',
                    method: "get",
                    data: {
                        page: 1,
                        pageSize: 1000,
                        type: 2
                    },
                    success: function(ret) {
                        ret = ret.data;
                        var hasFreeTick = false;
                        ret.forEach(function(n) {
                            if (n.type == 1) {
                                hasFreeTick = true;
                                if (n.count) {
                                    _this.freeTickId = n.id;
                                    _this.columnName = n.column.name;
                                    _this.columnId_ticket = n.column.id;
                                    _this.GLOBAL.freeTickId = _this.freeTickId;
                                    _this.GLOBAL.columnId_ticket = _this.columnId_ticket;
                                }
                            }
                        });
                        if (hasFreeTick) {
                            _this.hasFreeTick = true;
                            _this.advsd = false;
                            if (_this.isGetTick) {
                                _this.goodAdv = true;
                            }
                            if (!_this.isLogin) {
                                _this.goUrl("/");
                            }
                            return;
                        }
                        if (ones) {
                            _this.getQrcode();
                            return;
                        }
                        _this.hasFreeTick = false;
                        if (!_this.advsd) return;
                        setTimeout(_this.checkTick, 1000); //每秒重复请求
                    }
                });
            },
            handleScroll() {
                let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop // 滚动条偏移量
                // let offsetTop = document.querySelector('#boxFixed').offsetTop;  // 要滚动到顶部吸附的元素的偏移量
                this.isFixed = scrollTop > 0 ? true : false; // 如果滚动到顶部了，this.isFixed就为true
            }
        },
        //生命周期 - 创建完成（可以访问当前this实例）
        created() {
            var _this = this;
            if (_this.GLOBAL.token) {
                _this.isLogin = true;
                _this.doAjax({
                    url: 'getUserDetail',
                    method: "get",
                    data: {},
                    success: function(ret) {
                        _this.GLOBAL.loginUserMsg = ret.data;
                        _this.loginUserMsg = ret.data;
                        localStorage.setItem("loginUserMsg", JSON.stringify(_this.loginUserMsg));
                        // _this.getMyTeamList();
                        _this.checkUserTeam(function() {
                            _this.checkTick(true);
                        });
                    }
                });
            } else {
                _this.isLogin = false;
                _this.getQrcode();
            }
        },
        //生命周期 - 挂载完成（可以访问DOM元素）
        mounted() {
            var _this = this
            window.addEventListener('scroll', this.handleScroll)
            axios.get(this.GLOBAL.baseURL + 'getHomeSetting')
                .then(function(response) {
                    console.log(response);
                    if (response.status == 200) {
                        _this.imgs = response.data.pcImgs
                        _this.papapers = response.data.papers
                        _this.navigation = response.data.navigation
                    }
                })
                .catch(function(error) {
                    console.log(error);
                });
            axios.get(this.GLOBAL.baseURL + 'getColumnList')
                .then(function(response) {
                    // console.log(response);
                    if (response.status == 200) {
                        _this.lists = response.data.data
                    }
                })
                .catch(function(error) {
                    console.log(error);
                });

            var token = _this.GLOBAL.token;
            if (token) {
                _this.userLogin = false
            }

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
    .fff {
        color: #fff;
    }

    .bbule {
        color: #5960ed;
    }

    .moreHome {
        float: left;
    }

    .el-tab-pane {
        margin-left: 24px;
        border: 1px solid #eee;
        width: 1160px;
        border-radius: 4px;
    }

    .adv-count {
        text-align: center;
        position: fixed;
        z-index: 999;
        top: 0px;
        width: 100%;
        background: rgba(0, 0, 0, 0.6);
        overflow: hidden;
    }

    .adv-main {
        width: 275px;
        position: relative;
        margin: 132px auto;
    }

    .adv-count .advs {
        width: 247px;
        height: 323px;
        display: block;
        margin: auto;
    }

    .adv-count .qcodes {
        width: 189px;
        height: 195px;
        margin: auto;
        background: url('../assets/qcodes.png');
        background-size: 189px 195px;
        overflow: hidden;
    }

    .adv-count .qcodes .qcode-count {
        width: 100px;
        height: 100px;
        background: rgba(255, 255, 255, 1);
        border-radius: 2px;
        margin: 22px 45px;
    }

    .adv-count .qcodes .qcode-count img {
        width: 100%;
        height: 100%;
    }

    .adv-count .close {
        width: 24px;
        height: 24px;
        position: absolute;
        top: 0px;
        right: 0;
    }

    .advadv {
        width: 163px;
        height: 104px;
        position: fixed;
        z-index: 999;
        right: 0px;
        top: 50%;
    }

    .advadv img {
        width: 100%;
        height: 100%;
    }

    .left1 {
        margin-left: 35% !important;
    }

    .left2 {
        margin-left: 10% !important;
    }

    .toptop {
        margin-top: 108px !important;
    }

    .imgBack {
        // background: center center no-repeat rgb(245, 245, 245);
        width: 100%;
        height: 570px;
    }

    .footer {
        height: 266px;
        background: rgba(92, 97, 113, 1);
        color: rgba(255, 255, 255, 1);
        margin-top: 50px;
        min-width: 1200px;
    }

    .footer .footer-top {
        overflow: hidden;
    }

    .footer .footer-top .footer-top-left {
        float: left;
        margin-left: 10%;
        margin-top: 40px;
    }

    .footer .footer-top .footer-top-left .footer-list {
        margin-bottom: 12px;
    }

    .footer .footer-top .footer-top-right {
        float: right;
        margin-right: 10%;
        overflow: hidden;
        margin-top: 40px;

    }

    .footer .footer-top .footer-top-right .footer-code {
        float: left;
        width: 100px;
        text-align: center;
        margin-left: 54px;
    }

    .footer .footer-top .footer-top-right .footer-code img {
        background-color: #fff;
        width: 100%;
    }

    .footer .footer-top .footer-top-right .footer-code .footer-code-count {
        font-size: 14px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: rgba(255, 255, 255, 1);
        line-height: 20px;
        margin-top: 10px;
    }

    .footer .footer-bottom {
        margin-top: 20px;
        text-align: center;
    }

    .home .column-count {
        overflow: hidden;
        padding-bottom: 20px;
    }

    .home .column-count-list {
        width: 370px;
        float: left;
        min-height: 557px;
        border-radius: 4px;
        border: 1px solid rgba(236, 238, 246, 1);
        margin-left: 2%;
        margin-top: 30px;
        transition: .4s;
        position: relative;
    }

    .home .column-count-listd {
        width: 313px;
        float: left;
        min-height: 506px;
        border-radius: 4px;
        padding: 0 27px;
        // border:1px solid rgba(236,238,246,1);
        position: relative;
        border-right: 1px solid rgba(232, 235, 237, 1);
    }

    .home .column-count-list:hover {
        box-shadow: 0 2px 8px 0 rgba(186, 181, 225, 0.5);
        transition: .4s
    }

    .home .column-count-list img {
        width: 100%;
        height: 198px;
        border-top-left-radius: 4px;
        border-top-right-radius: 4px;
    }

    .home .column-count-listd img {
        width: 100%;
        height: 198px;
        border-top-left-radius: 4px;
        border-top-right-radius: 4px;
    }

    .home .column-count-list .column-count-list-title {
        font-size: 18px;
        font-family: PingFangSC-Semibold, PingFang SC;
        font-weight: 600;
        color: rgba(50, 53, 65, 1);
        margin-left: 20px;
        margin-top: 20px;
    }

    .home .column-count-listd .column-count-list-title {
        font-size: 18px;
        font-family: PingFangSC-Semibold, PingFang SC;
        font-weight: 600;
        color: rgba(50, 53, 65, 1);
        margin-top: 20px;
    }

    .home .column-count-list .column-count-list-count {
        font-size: 14px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: rgba(92, 97, 113, 1);
        margin-left: 20px;
        height: 60px;
        margin-top: 12px;
        margin-right: 20px;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 3;
        overflow: hidden;
        margin-bottom: 20px;
    }

    .home .column-count-listd .column-count-list-count {
        font-size: 14px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: rgba(92, 97, 113, 1);
        height: 60px;
        margin: 12px auto 0;
        width: 294px;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 3;
        overflow: hidden;
        margin-bottom: 20px;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 3;
        overflow: hidden;
    }

    .home .column-count-list .column-count-list-main {
        margin-left: 20px;
    }

    .home .column-count-list .column-count-list-main .column-count-list-main-title {
        font-size: 14px;
        font-family: PingFangSC-Semibold, PingFang SC;
        font-weight: 600;
        color: rgba(50, 53, 65, 1);
        line-height: 20px;
    }

    .home .column-count-list .column-count-list-main ul {
        margin-top: 10px;
    }

    .home .column-count-list .column-count-list-main li {
        font-size: 14px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: rgba(92, 97, 113, 1);
        margin-left: 20px;
    }

    .home .column-count-list .column-count-list-btn {
        width: 164px;
        position: absolute;
        bottom: 20px;
        left: 103px;
    }

    .home .column-count-listd .column-count-list-main {
        // margin-left: 20px;
    }

    .home .column-count-listd .column-count-list-main .column-count-list-main-title {
        font-size: 14px;
        font-family: PingFangSC-Semibold, PingFang SC;
        font-weight: 600;
        color: rgba(50, 53, 65, 1);
        line-height: 20px;
        margin-top: 60px;
    }

    .home .column-count-listd .column-count-list-main ul {
        margin-top: 10px;
    }

    .home .column-count-listd .column-count-list-main li {
        font-size: 14px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: rgba(92, 97, 113, 1);
        margin-left: 20px;
    }

    .home .column-count-listd .column-count-list-btn {
        width: 164px;
        position: absolute;
        bottom: 0px;
        left: 103px;
    }

    .home {
        background-color: #fff;
        min-width: 1200px;
    }

    .home .column {
        margin-top: 60px;

    }

    .home .column .column-title {
        font-size: 36px;
        font-family: PingFangSC-Semibold, PingFang SC;
        font-weight: 600;
        color: rgba(50, 53, 65, 1);
        text-align: center;
    }

    .home .column .column-introduce {
        font-size: 18px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: rgba(50, 53, 65, 1);
        margin-top: 10px;
        text-align: center;
    }

    .home .column .column-btn {
        font-size: 18px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: rgba(89, 96, 237, 1);
        margin-top: 10px;
        text-align: center;
    }

    .home-header {
        height: 60px;

        overflow: hidden;
        position: fixed;
        width: 100%;
        top: 0px;
        z-index: 999;
    }

    .tm {
        background-color: rgba(0, 0, 0, 0);
    }

    .tmNo {
        background-color: rgba(255, 255, 255, 1);
        border-bottom: 1px solid #eeeeee;
    }

    .home-header .logo {
        height: 60px;
        line-height: 60px;
        float: left;

    }

    .home-header .logo img {
        width: 93px;
        float: left;
        margin-top: 17px;
        margin-left: 15px;
    }

    .home-header .logo div {
        font-size: 14px;
        float: left;
        margin-left: 10px;
        font-weight: bolder;
        color: #5960ed;
    }

    .home-header .nav {
        float: left;
        margin-left: 59px;
        font-weight: bold;
    }

    .home-header .user-menu {
        float: right;
        line-height: 60px;
        margin-right: 15px;
    }

    .home-header .user-menu .login {
        margin-right: 15px;
    }

    .el-menu--horizontal > .el-menu-item.is-active {
        background-color: #fff !important;
    }

    .home .home-banner-btn {
        position: absolute;
        top: 523px;
        z-index: 999;
        overflow: hidden;
        left: 35%;
        height: 110px;
    }

    .home .home-banner-btn .home-banner-btn-list {
        background-color: #fff;
        box-shadow: 0px 2px 6px 0px rgba(186, 181, 225, 0.5);
        border-radius: 4px;
        width: 283px;
        float: left;
        height: 95px;
        margin-right: 20px;
    }

    .home-banner-list-left {
        float: left;
        font-size: 44px;
        color: #5960ED;
        margin: 24px;
    }

    .home-banner-list-left-title {
        font-size: 18px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: rgba(50, 53, 65, 1);
    }

    .home-banner-list-left-count {
        font-size: 14px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: rgba(144, 145, 156, 1);
        margin-top: 10px;
    }
</style>
