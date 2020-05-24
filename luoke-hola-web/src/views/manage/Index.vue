<!-- 测评管理 -->
<template>
    <div class='manageIndex'>
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
                            <div class="main-top-title-left" style="">测评列表</div>
                            <div class="main-top-title-right">
                                <el-button size="mini" @click="goUrl('/ManageRecord')" style="height: 30px;background-color:#FAFAFA;">查看发放记录</el-button>
                            </div>
                        </div>
                        <div class="main-top-count" v-if="paperList.length != 0">
                            <div class="main-top-list" v-for="(item,index) in (paperList||[])" :key="index">
                                <img :src="item.paper.setting.img" alt="">
                                <div class="list-title">{{item.paper.name}}</div>
                                <div class="list-count" v-if="!vip&&item.paper.setting.price>0">剩余{{(item.freeCount||0)+(item.buyCount||0)-(item.count||0)}}份</div>
                                <div class="list-count" v-else>不限量</div>
                                <div class="list-btn">
                                    <el-button type="primary" @click="goUrl('/ManageRelease?id='+item.id)" style="width: 100px;height: 30px;line-height: 0;font-size: 12px">立即发放</el-button>
                                </div>
                            </div>
                        </div>
                        <div class="main-top-count" v-if="paperList.length == 0" style="height: 235px;text-align: center">
                            <div style="font-size:18px;color:rgba(92,97,113,1);margin-top: 91px;">当前还没有测评，<el-button type="text" style="font-size:18px;" @click="goUrl('/')">去购买</el-button>
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
            vip: false,
            showNav: true,
            userLogin: false,
            activeIndex: '2',
            navIndex: '1',
            paperList: []
        };
    },
    //监听属性 类似于data概念
    computed: {},
    //监控data中的数据变化
    watch: {},
    //方法集合
    methods: {

    },
    //生命周期 - 创建完成（可以访问当前this实例）
    created() {

    },
    //生命周期 - 挂载完成（可以访问DOM元素）
    mounted() {
        var _this = this;
        _this.vip = _this.GLOBAL.isvip1;
        _this.doAjax({
            url: 'sharePaperList',
            method: "get",
            data: {
                type: 1,
                page: 1,
                pageSize: 1000
            },
            success: function(response) {
                if (response.status == 200) {
                    _this.paperList = response.data.data;
                }
            }
        });
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
.manageIndex .main-top {
    background: rgba(255, 255, 255, 1);
    box-shadow: 0px 2px 6px 0px rgba(223, 223, 223, 0.27);
    border-radius: 2px;
}

.manageIndex .main-top .main-top-title {
    height: 50px;
    line-height: 50px;
    font-size: 14px;
    font-family: PingFangSC-Semibold, PingFang SC;
    font-weight: 600;
    color: rgba(50, 53, 65, 1);
    letter-spacing: 1px;
    border-bottom: 1px solid #E8EBED;
    overflow: hidden;
    padding: 0 20px;
}

.manageIndex .main-top .main-top-count {
    overflow: hidden;
}

.manageIndex .main-top .main-top-count .main-top-list {
    float: left;
    width: 25%;
    padding: 20px 0;
    text-align: center;
    border-right: 1px solid rgba(229, 229, 229, 1);
    border-bottom: 1px solid rgba(229, 229, 229, 1);
    margin-left: -1px;
}

.manageIndex .main-top .main-top-count .main-top-list img {
    width: 194px;
    height: 103px;
    box-shadow: 0 2px 4px 0 rgba(203, 203, 203, 0.5);
    border-radius: 6px;
}

.manageIndex .main-top .main-top-count .main-top-list .list-title {
    font-size: 16px;
    font-family: PingFangSC-Semibold, PingFang SC;
    font-weight: 600;
    color: rgba(50, 53, 65, 1);
    line-height: 30px;
}

.manageIndex .main-top .main-top-count .main-top-list .list-count {
    font-size: 12px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: rgba(245, 108, 108, 1);
}

.manageIndex .main-top .main-top-count .main-top-list .list-btn {
    margin-top: 15px;
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