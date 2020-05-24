<!-- 测评管理 -->
<template>
    <div>
        <div class="main-top-count-bottom" v-if="showInfo">
            <div class="codes-left">
                <el-form ref="form" label-width="200px" style="width:400px;marign: auto;">
                    <el-form-item label="选择二维码有效时间">
                        <el-select v-model="time" placeholder="请选择二维码有效时间">
                            <el-option label="3天" value="3天"></el-option>
                            <el-option label="3天" value="3天"></el-option>
                        </el-select>
                    </el-form-item>
                </el-form>
                <div class="codes-info" style="width: 300px;">注：每生成一张邀请二维码，将扣除一份可用测评余额；若在二维码失效后，测评未被作答，系统将自动返还测评余额；</div>
                <el-button type="primary" @click="useCode">生成二维码</el-button>
            </div>
            <div class="codes-left" style="border: 0px;">
                <div class="codes-title">二维码样式预览</div>
                <div class="codes-img">
                    <img src="@/assets/code.png" alt="">
                </div>
            </div>
        </div>
        <div class="main-top-count-bottom" v-if="!showInfo" style="min-height: 533px;">
            <div style="font-size: 38px;color: #67C23A;margin-top: 30px;font-weight: bold;float:left">
                <i class="el-icon-check"></i>
            </div>
            <div style="font-size: 14px;color: #67C23A;margin-top: 45px;margin-left: 25px;float:left">测评生成成功</div>
            <div style="clear:both;"></div>
            <div class="qcode">
                <div class="qcode-left" style="width:20%">
                    <div class="qcode-img">
                        <img :src="qrcode" alt="">
                    </div>
                </div>
                <div class="qcode-left" style="width:50%;margin-top: 160px;margin-left: 90px;">
                    <el-button type="primary" style="width:301px;" @click="downQrcode">下载二维码</el-button>
                    <div></div>
                    <el-button type="text" style="color:rgba(92,97,113,1);margin-left: 95px;" @click="goUrl('/ManageRecord')"><i class="el-icon-search"></i> 查看发放记录</el-button>
                </div>
            </div>
        </div>
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
            pData: {},
            qrcode: "",
            showInfo: true,
            showNav: true,
            time: ""
        };
    },
    //监听属性 类似于data概念
    computed: {},
    //监控data中的数据变化
    watch: {},
    //方法集合
    methods: {
        downQrcode() {
            window.open(this.qrcode);
        },
        useCode() {
            var _this = this;
            var count = _this.pData.count;
            var vip = _this.pData.vip;
            if (count <= 0 && !vip) {
                _this.$message({
                    message: "测评可用数量不足",
                    type: "error"
                });
                return;
            }
            _this.loading = true;
            _this.toSharePaper({
                pcQrcode: "1"
            }, function(data) {
                _this.qrcode = data.img;
                _this.showInfo = false
                _this.loading = false
                _this.loadPaperDetail();
            });
        }
    },
    //生命周期 - 创建完成（可以访问当前this实例）
    created() {
        this.pData = this.getPartantData();
    },
    //生命周期 - 挂载完成（可以访问DOM元素）
    mounted() {

    },
    props: {
        getPartantData: Function,
        toSharePaper: Function,
        loadPaperDetail: Function
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

.qcode {
    overflow: hidden;
    margin-top: 15px;
}

.qcode-left {
    float: left;
}

.qcode-img {
    width: 228px;
    height: 406px;
}

.qcode-img img {
    width: 100%;
    height: 406px;
}

.codes-left {
    float: left;
    width: 49%;
    height: 533px;
    border-right: 1px solid #e7e7e7;
    padding-top: 30px;
}

.codes-left .el-button {
    width: 40%;
    margin-left: 30%;
}

.codes-left .codes-info {
    font-size: 12px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: rgba(245, 108, 108, 1);
    text-align: center;
    padding-top: 30px;
    padding-bottom: 30px;
    margin: auto;
}

.codes-left .codes-title {
    font-size: 14px;
    font-family: PingFangSC-Semibold, PingFang SC;
    font-weight: 600;
    color: rgba(50, 53, 65, 1);
    text-align: center;
    padding-bottom: 30px;
}

.codes-img {
    width: 228px;
    margin: auto;
}

.codes-img img {
    width: 228px;
    height: 406px;
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
    box-shadow: 0px 2px 20px 0px rgba(148, 148, 148, 0.27);
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