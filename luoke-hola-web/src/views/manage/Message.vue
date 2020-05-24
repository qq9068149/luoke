<!-- 测评管理 -->
<template>
    <div class='release email'>
        <div class="main-top-count-bottom" v-if="showInfo">
            <el-tabs v-model="activeName" type="card" stretch class="main-top-tabs">
                <el-tab-pane label="添加测试者" name="first">
                    <el-form ref="form" :model="form" label-width="80px">
                        <el-form-item label="姓名">
                            <el-input v-model="form.name" placeholder="姓名"></el-input>
                        </el-form-item>
                        <el-form-item label="手机">
                            <el-input v-model="form.mobile" placeholder="输入手机号"></el-input>
                        </el-form-item>
                        <el-form-item label="岗位">
                            <el-button style="width:240px;background:rgba(255,255,255,1);border-radius:4px;font-size:14px;color:rgba(144,147,153,1);" @click="shows = true">{{form.duty||'选择岗位'}}</el-button>
                        </el-form-item>
                        <el-form-item label="身份">
                            <el-radio-group v-model="form.resource" @change="shen">
                                <el-radio label="应聘者"></el-radio>
                                <el-radio label="内部员工"></el-radio>
                            </el-radio-group>
                        </el-form-item>
                        <el-form-item label="来源渠道" v-if="nono">
                            <el-input v-model="form.region" placeholder="输入来源渠道"></el-input>
                            <!-- <el-select v-model="form.region" placeholder="点击选择">
                                <el-option label="区域一" value="shanghai"></el-option>
                                <el-option label="区域二" value="beijing"></el-option>
                            </el-select> -->
                        </el-form-item>
                    </el-form>
                    <el-button type="primary" class="form-btn" @click="addInvite">添加到邀请列表</el-button>
                    <div class="form-bottom">
                        <div class="form-bottom-top">最近发送</div>
                        <div class="form-bottom-list">
                            <!--  <el-button type="text" size="min">张三</el-button>
                            <el-button type="text" size="min">张三</el-button>
                            <el-button type="text" size="min">张三</el-button>
                            <el-button type="text" size="min">张三</el-button>
                            <el-button type="text" size="min">张三</el-button>
                            <el-button type="text" size="min">张三</el-button> -->
                        </div>
                    </div>
                </el-tab-pane>
                <el-tab-pane label="从组织名单中添加" name="second" class="ddd">
                    <el-menu class="el-menu-vertical-demo">
                        <el-submenu index="1">
                            <template slot="title">
                                <span>内部员工</span>
                            </template>
                            <el-menu-item-group>
                                <el-tree :data="pData.memberList" :props="treeProps" node-key="id" show-checkbox @check-change="handleCheckChange">
                                </el-tree>
                            </el-menu-item-group>
                        </el-submenu>
                    </el-menu>
                    <div class="btn-aaa">
                        <el-button type="primary" @click="addInvite1">添加到邀请列表</el-button>
                    </div>
                </el-tab-pane>
            </el-tabs>
            <div class="bottom-mid">
                <i class="el-icon-right"></i>
            </div>
            <div class="bottom-right">
                <div class="bottom-right-box">
                    <div class="bottom-right-title">已选择：{{selUsers.length}}人</div>
                    <div class="bottom-right-count">
                        <div class="user-lists" v-for="(node,index) in selUsers">
                            <div class="user-lists-name fl">{{node.name}}</div>
                            <div class="user-lists-phone fl">{{node.mobile}}</div>
                            <div class="user-lists-btn fr" @click="removeIt(index)"><i class="el-icon-close"></i></div>
                            <div class="user-lists-type fr">{{node.duty}}</div>
                        </div>
                    </div>
                </div>
                <div class="user-lists-release">
                    <el-button type="primary" @click="invitationd(1)">邀请测评</el-button>
                </div>
            </div>
        </div>
        <div class="main-top-count-bottom" v-if="!showInfo" style="min-height: 533px;text-align: center">
            <div style="font-size: 38px;color: #67C23A;margin-top: 50px;font-weight: bold;">
                <i class="el-icon-check"></i>
            </div>
            <div style="font-size: 14px;color: #67C23A;">测评已发送</div>
            <div>
                <el-button @click="invitationd(2)" type="primary" style="margin-top: 50px;width:301px;height:40px;background:rgba(89,96,237,1);border-radius:4px;">继续发放</el-button>
            </div>
            <div style="margin-top: 20px;font-size:14px;color:rgba(92,97,113,1);"><i class="el-icon-search"></i>
                <el-button type="text" style="color:rgba(92,97,113,1);" @click="goUrl('/ManageRecord')">查看发放记录</el-button>
            </div>
        </div>
        <el-dialog title="选择岗位" :visible.sync="shows" style="">
            <el-container style="height: 378px; border: 1px solid #eee;width: 960px;">
                <el-aside width="250px" style="border-right: 1px solid #e7e7e7;">
                    <el-menu :default-active="activeKey" @select="handleSelect">
                        <template v-for="(node,index) in pData.industryList">
                            <el-submenu :index="index+''" v-if="node.children">
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
export default {
    //import引入的组件需要注入到对象中才能使用
    components: {},
    data() {
        //这里存放数据
        return {
            selUsers1: {},
            hasEditMyDuty: false,
            pData: {},
            selUsers: [],
            buyMode: '',
            nono: true,
            inputVisible: false,
            inputValue: '',
            mores: false,
            postList: [], //热门职位
            postListMore: [], //常见职位
            postListMores: [], //自定义职位
            titles: '互联网行业', //当前选中的行业
            activeKey: '0-1',
            shows: false,
            keys: '',
            userBuy: false,
            showInfo: true,
            showNav: true,
            userLogin: true,
            activeIndex: '2',
            navIndex: '1',
            activeName: 'first',
            form: {

            },
            treeProps: {
                label: 'label',
                children: 'children',
            },
            count: 1
        };
    },
    //监听属性 类似于data概念
    computed: {},
    //监控data中的数据变化
    watch: {},
    //方法集合
    methods: {
        //添加到发放列表
        addInvite1() {
            var _this = this;
            var list = _this.selUsers1;
            var cNum = Object.keys(list).length;
            var count = _this.pData.count;
            var vip = _this.pData.vip;
            var nowCount = _this.selUsers.length + cNum;
            if (count <= nowCount && !vip) {
                _this.$message({
                    message: "测评可用数量不足",
                    type: "error"
                });
                return;
            }
            for (var id in list) {
                if (list[id].mobile) {
                    list[id]["resource"] = "内部员工";
                    _this.selUsers.push(list[id]);
                }
            }
            _this.selUsers1 = {};
        },
        addInvite() {
            var _this = this;
            if (_this.form.mobile.length != 11) {
                _this.$message({
                    message: "请填写11位手机号",
                    type: "error"
                });
                return;
            }
            var count = _this.pData.count;
            var vip = _this.pData.vip;
            var nowCount = _this.selUsers.length;
            if (count <= nowCount && !vip) {
                _this.$message({
                    message: "测评可用数量不足",
                    type: "error"
                });
                return;
            }
            _this.selUsers.push(_this.form);
            _this.form = {};
        },
        removeIt(index) {
            var _this = this;
            _this.$confirm("确认移除人员？", '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                _this.selUsers.splice(index, 1);
            }).catch(() => {});
        },
        //设置职位
        sureSelDuty(type) {
            if (type == 1) {
                //取消
                this.pData = this.getPartantData();
                this.handleSelect(this.activeKey);
                this.shows = false;
                return;
            }
            this.form.duty = this.keys;
            this.shows = false;
            if (this.hasEditMyDuty) {
                var key = this.activeKey.split("-");
                var list = this.pData.industryList;
                var obj = list[key[0]];
                if (key[1] != null) {
                    obj = obj.children[key[1]];
                }
                var name = obj.name;
                var teamDutys = this.pData.teamDutys || {};
                teamDutys[name] = this.postListMores;
                this.updateTeamDutys(teamDutys);
            }
        },
        dddd(val) {
            //移除自定义职位
            this.postListMores.splice(this.postListMores.indexOf(val), 1);
            this.hasEditMyDuty = true;
        },
        shen(val) {
            // console.log(val)
            if (val == '内部员工') {
                this.nono = false
            } else {
                this.nono = true
            }
        },
        handleSelect(key) {
            this.activeKey = key;
            key = key.split("-");
            var list = this.pData.industryList;
            var obj = list[key[0]];
            if (key[1] != null) {
                obj = obj.children[key[1]];
            }
            var name = obj.name;
            var dutys = obj.dutys;
            var hotDutys = obj.hotDutys;
            var teamDutys = this.pData.teamDutys || {};
            this.postList = hotDutys || [];
            this.postListMore = dutys || [];
            this.postListMores = JSON.parse(JSON.stringify(teamDutys[name] || []));
            this.titles = name;
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
        inArray(arr, item) {
            for (var i = 0; i < arr.length; i++) {
                if (arr[i] == item) {
                    return true;
                }
            }
            return false;
        },
        changeColord(item) {
            if (this.keys = item) {} else {
                this.keys = item
            }
        },
        invitationd(type) {
            var _this = this;
            if (type == 1) {
                //发送测评给选中人员
                _this.toSharePapers(0);
                return;
            }
            _this.showInfo = true;
        },
        toSharePapers(i) {
            var _this = this;
            var list = _this.selUsers;
            if (!list[i]) {
                _this.showInfo = false;
                _this.selUsers = [];
                _this.loadPaperDetail();
                return;
            }
            list[i]["sendType"] = "message";
            _this.toSharePaper(list[i], function(data) {
                i += 1;
                _this.toSharePapers(i);
            });
        },
        handleCheckChange(data, checked, indeterminate) {
            // console.log(data, checked, indeterminate);
            this.changeSelUser1(data, checked);
        },
        changeSelUser1(data, checked) {
            var _this = this;
            var fullData = data.fullData;
            var id = fullData.id;
            var type = fullData.type;
            var children = data.children;
            if (children && children.length) {
                children.forEach(function(n) {
                    _this.changeSelUser1(n, checked);
                });
            } else if (type == 2) {
                if (checked) {
                    this.selUsers1[id] = fullData;
                } else {
                    delete this.selUsers1[id];
                }
            }
        },
        loadNode(node, resolve) {

        }
    },
    //生命周期 - 创建完成（可以访问当前this实例）
    created() {
        this.pData = this.getPartantData();
        console.log(this.pData)
        this.handleSelect("0-1");
    },
    props: {
        getPartantData: Function,
        toSharePaper: Function,
        loadPaperDetail: Function,
        updateTeamDutys: Function
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
.qwe::-webkit-scrollbar {
    display: none;
}

.more {
    text-align: center;
}

.post-count {
    width: 100%;
    overflow: hidden;
    padding: 21px 0;
}

.post-count-list {
    float: left;
    margin-right: 21px;
    margin-left: 21px;
    margin-bottom: 10px;
}

.select {
    color: #5960ED;
}

.post-count-list .el-button {
    text-align: center;
    width: 150px;
    height: 40px;
    border-radius: 4px;
    // border:1px solid rgba(238,238,238,1);
    font-size: 14px;
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

.el-dialog {
    width: 960px;
}

.el-aside {
    color: #333;
}

.bottom-right-box {
    box-shadow: 0px 2px 20px 0px rgba(148, 148, 148, 0.27);
    height: 457px;
}

.btn-aaa {
    position: absolute;
    bottom: 0px;
    height: 70px;
    border-top: 1px solid rgba(216, 216, 216, 1);
    width: 100%;
}

.btn-aaa .el-button {
    width: 292px;
    height: 40px;
    text-align: center;
    // line-height: 40px;
    margin: 15px 0 0 34px;
}

.user-lists-release {
    position: absolute;
    width: 30%;
    left: 35%;
    bottom: 20px;
}

.user-lists-release button {
    width: 100%;
}

.user-lists {
    font-size: 14px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: rgba(50, 53, 65, 1);
    line-height: 20px;
    letter-spacing: 1px;
    height: 50px;
    line-height: 50px;
    border-bottom: 1px solid #eee;
}

.user-lists .user-lists-name {
    width: 20%;
    text-align: center;
}

.user-lists .user-lists-phone {
    width: 30%;
    text-align: center;
}

.user-lists .user-lists-type {
    width: 30%;
    text-align: center;
}

.user-lists .user-lists-btn {
    width: 10%;
    text-align: center;
}

.user-lists .user-lists-btn:hover {
    color: #5960ED;
}

.fl {
    float: left;
}

.fr {
    float: right;

}

.bottom-right {
    width: 40%;
    // box-shadow:0px 2px 20px 0px rgba(148, 148, 148, 0.27);
    float: left;
    min-height: 545px;
    position: relative;
}

.bottom-right-title {
    height: 65px;
    background: rgba(245, 247, 254, 1);
    border-radius: 2px 2px 0px 0px;
    line-height: 65px;
    padding-left: 20px;
    font-weight: bold;
}

.bottom-mid {
    float: left;
    margin: 264px 38px 0 38px;
}

.bottom-mid i {
    font-size: 24px;
}

.release .form-btn {
    width: 80%;
    margin-left: 10%;
}

.form-bottom {
    margin-left: 20px;
    margin-top: 20px;
}

.form-bottom .form-bottom-top {
    font-size: 12px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: rgba(144, 147, 153, 1);
    line-height: 16px;
}

.form-bottom .form-bottom-list button {
    font-size: 14px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: rgba(89, 96, 237, 1);
    line-height: 20px;
}

.main-top-count-bottom {
    padding: 19px 20px 40px 20px;
    overflow: hidden;

}

.main-top-tabs {
    width: 356px;
    box-shadow: 0px 2px 20px 0px rgba(148, 148, 148, 0.27);
    float: left;
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
    margin-top: 15px;
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
</style>