<!--  -->
<template>
    <div class='manage-detail' style="background:rgba(247,248,250,1);">
        <el-container>
            <el-header>
                <Header :show="show" :id="id" style="position: fixed;width: 100%;z-index: 999;background-color: #fff"></Header>
            </el-header>
            <el-container class="body-container" style="padding-top: 20px;">
                <!--  <div class="time-out" style="position: fixed;width: 100%;z-index: 999;top: 60px;">
                    <i class="el-icon-info"></i>
                    报告结论已过期。建议再次邀请被测者进行测评。
                    <el-button type="text">查看详情</el-button>
                </div> -->
            </el-container>
            <el-container class="body-container">
                <div class="box">
                    <el-aside width="250px" class="nav-left" style="padding: 10px 10px;">
                        <!-- <Nav :activeIndex="navIndex"></Nav> -->
                        <el-menu style="height: 860px;background-color: #fff;box-shadow:0px 2px 10px 0px rgba(174,171,201,0.35);border-radius:0px 10px 0px 0px;" :default-active="navIndex" class="el-menu-vertical-demo" background-color="#FFFFFF" active-text-color="#5960ED">
                            <el-menu-item index="1" @click="goYe(1)">
                                <span slot="title">作答有效性分析</span>
                            </el-menu-item>
                            <el-menu-item index="2" @click="goYe(2)">
                                <span slot="title">{{report.summaryName||'报告总述'}}</span>
                            </el-menu-item>
                            <el-menu-item index="3" @click="goYe(3)" v-if="report.showModelIntroduce&&report.dimension['1']">
                                <span slot="title">{{report.modelIntroduceName||'模型介绍'}}</span>
                            </el-menu-item>
                            <template v-for="(item,index) in (report.dimension||{})">
                                <el-menu-item :index="'dimension'+index" @click="goYe((+index+4))" v-if="item.name&&item.show">
                                    <span slot="title">{{item.name}}</span>
                                </el-menu-item>
                            </template>
                            <template v-for="(item,index) in (report.proposal||[])">
                                <el-menu-item :index="'proposal'+index" @click="goYe((+index+6))" v-if="item.name">
                                    <span slot="title">{{item.name}}</span>
                                </el-menu-item>
                            </template>
                        </el-menu>
                    </el-aside>
                    <el-main style="width: 930px;float:left;margin-left: 240px;padding-top:10px;">
                        <div class="">
                            <div class="manage-top shadow" id="anchor-1">
                                <div class="manage-top-title">{{report.paper.name}}测评报告 <span>报告生成时间：{{report.finishTime}}</span></div>
                                <div class="manage-top-user">
                                    <div class="manage-top-user-list">
                                        <div class="manage-top-user-list-info">
                                            <div style="font-size:16px;font-weight:600;color:rgba(50,53,65,1);">测试者姓名：{{report.userMsg.username}}</div>
                                            <div style="font-size:14px;color:rgba(92,97,113,1);margin-top: 10px;"><span style="padding-left: 0px;">年龄：{{report.userMsg.age}}</span> <span style="border-left: 1px solid #e7e7e7;border-right: 1px solid #e7e7e7;">性别：{{report.userMsg.info.gender==1?'男':'女'}}</span> <span>学历：{{report.userMsg.educationName}}</span></div>
                                        </div>
                                        <div class="manage-top-user-list-btn">
                                            <!-- <el-button type="primary" round>查看考试照片</el-button> -->
                                            <el-image style="width:118px; height:28px;border-radius:13px;" :src="url" :preview-src-list="[report.userMsg.imgUrl]">
                                            </el-image>
                                        </div>
                                    </div>
                                </div>
                                <div class="manage-top-list" v-if="report.show">
                                    <div class="manage-top-list-main" style="padding-bottom: 25px;" v-if="report.showAnswerTime">
                                        <div class="manage-top-list-main-title"><i class="el-icon-time"></i> 作答时长</div>
                                        <div class="manage-top-list-main-info" :style="(report.timeNormal==1?'':'color: #F56C6C')">{{report.timeTotal}}分钟</div>
                                        <div :class="'manage-top-info '+(report.timeNormal==1?'displayNo':'')">
                                            {{report.answerTimeTxt}}
                                        </div>
                                    </div>
                                    <div class="manage-top-list-main" style="border-left: 1px solid #e7e7e7;border-right: 1px solid #e7e7e7;" v-if="report.optionChoose">
                                        <div class="manage-top-list-main-title"><i class="el-icon-s-operation"></i> 选项分布</div>
                                        <div class="manage-top-list-main-info">正常</div>
                                        <div class="manage-top-info displayNo">
                                            本测评参考作答时间为15-20分钟，林威的作答时间过长，在答题时存在过多思考掩饰自我的可能性。
                                        </div>
                                    </div>
                                    <div class="manage-top-list-main" v-if="report.matchArr.show">
                                        <div class="manage-top-list-main-title"><i class="el-icon-s-data"></i> 作答一致性</div>
                                        <div class="manage-top-list-main-info" :style="report.matchArr.type==1?'':'color: #F56C6C'">{{report.matchArr.type==1?'正常':'异常'}}</div>
                                        <div :class="'manage-top-info '+(report.matchArr.type==1?'displayNo':'')">
                                            {{report.matchArr.txt}}
                                        </div>
                                    </div>
                                </div>
                                <div style="" class="asd" v-if="report.rule">{{(report.matchArr.type!=1||report.timeNormal!=1)?report.rule2:report.rule1}}</div>
                            </div>
                            <div id="anchor-2"></div>
                            <div class="manage-lists" v-if="report.showSummary">
                                <div class="manage-lists-title">{{report.summaryName}}</div>
                                <!--<div class="manage-lists-count shadow">-->
                                <!--<div class="manage-lists-count-one" style="width: 20%;box-shadow:0px 2px 8px 0px rgba(207,216,240,0.79);border-radius:10px;">-->
                                <!--<div class="one-title">{{report.summaryDefinitionName}}</div>-->
                                <!--<div class="one-info">{{report.title}}</div>-->
                                <!--<div class="one-img" style="position: relative">-->
                                <!--<el-progress width="79"  type="circle" :show-text='false' color="#5960ED" :percentage="report.total1||0"></el-progress>-->
                                <!--<span style="position: absolute;left: 40%;top: 35%;font-size:16px;color:rgba(89,96,237,1);font-weight:600;">{{report.total1}}分</span>-->
                                <!--</div>-->
                                <!--</div>-->
                                <!--<div class="manage-lists-count-one" style="width: 20%;margin-right: 35px;">-->
                                <!--<div class="one-lists" style="">-->
                                <!--<el-progress color="#5960ED" :percentage="(report.main.order||0)" :show-text='false' style=""></el-progress>-->
                                <!--<div class="one-lists-info">组织排名：<span>{{(report.main.order||0).toFixed(2)}}%</span></div>-->
                                <!--</div>-->
                                <!--<div class="one-lists" style="margin-top: 18px;">-->
                                <!--<el-progress :percentage="(report.main.orderAll||0)" :show-text='false' style=""></el-progress>-->
                                <!--<div class="one-lists-info">全国排名：<span>{{(report.main.orderAll||0).toFixed(2)}}%</span></div>-->
                                <!--</div>-->
                                <!--</div>-->
                                <!--<div class="manage-lists-count-one" style="width: 50%;" v-if="report.summary.txt">-->
                                <!--<div class="manage-lists-p" style="border: 0px;" v-html="report.summary.txt"></div>-->
                                <!--</div>-->
                                <!--</div>-->
                                <div class="box111">
                                    <div class="div1">
                                        <div class="content">
                                            <div class="one-title">{{report.summaryDefinitionName}}</div>
                                            <div class="one-info">{{report.title}}</div>
                                            <div class="one-img" style="position: relative">
                                                <el-progress :width="79" type="circle" :show-text='false' color="#5960ED" :percentage="report.total1||0"></el-progress>
                                                <span style="position: absolute;left: 30%;top: 35%;font-size:16px;color:rgba(89,96,237,1);font-weight:600;">{{report.total1}}分</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="div2">
                                        <div class="div3">
                                            <div class="div5">
                                                <div class="content">
                                                    <el-progress color="#5960ED" :percentage="(report.main.order||0)" :show-text='false' style=""></el-progress>
                                                    <!--<div class="one-lists-info">组织排名：<span>{{(report.main.order||0).toFixed(2)}}%</span></div>-->
                                                    <div class="one-lists-info" style="white-space:nowrap; ">组织排名：<span>{{(report.main.order||0).toFixed(2)}}%</span></div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="div4">
                                            <div class="div6">
                                                <div class="content">
                                                    <el-progress :percentage="(report.main.orderAll||0)" :show-text='false' style=""></el-progress>
                                                    <div class="one-lists-info" style="white-space:nowrap; ">全国排名：<span>{{(report.main.orderAll||0).toFixed(2)}}%</span></div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="txt" v-if="report.summary.txt">
                                        <div style="border: 0px;min-height: 238px;" v-html="report.summary.txt"></div>
                                    </div>
                                </div>
                            </div>
                            <div id="anchor-3"></div>
                            <div class="manage-lists" v-if="report.showModelIntroduce&&report.dimension['1']">
                                <div class="manage-lists-title">{{report.modelIntroduceName||'模型介绍'}}</div>
                                <div class="manage-lists-count shadow">
                                    <div class="manage-lists-p" v-html="report.modelIntroduceTxt"></div>
                                    <div class="manage-lists-count-title" style="border: 0px;">针对关系型销售的岗位胜任特点，好啦测评总结出的其岗位胜任模型如下：</div>
                                    <div class="manage-lists-count-list" style="padding-top: 0px;">
                                        <div class="list-info" v-for="item in report.dimension">{{item.name}}</div>
                                    </div>
                                </div>
                            </div>
                            <template v-for="(item,index) in report.dimension">
                                <div class="manage-lists" v-if="item.show&&item.name" :id="'anchor-'+(+index+4)">
                                    <div class="manage-lists-title">{{item.name}}</div>
                                    <div class="manage-lists-count shadow">
                                        <div class="two flex" v-if="item.showTotal||item.rankOrg||item.rankAll">
                                            <div class="two-list flex-main" :style="(item.rankOrg||item.rankAll)?'border-right: 1px solid #e7e7e7;':''" v-if="item.showTotal">
                                                <div class="two-list-title">得分</div>
                                                <div class="two-list-mark">{{item.total}}分</div>
                                            </div>
                                            <div class="two-list flex-main" :style="(item.rankAll)?'border-right: 1px solid #e7e7e7;':''" v-if="item.rankOrg">
                                                <div class="two-list-title">组织排名</div>
                                                <div class="two-list-mark">{{index==0?(report.d1.order||0).toFixed(2):(report.d2.order||0).toFixed(2)}}%</div>
                                            </div>
                                            <div class="two-list flex-main" v-if="item.rankAll">
                                                <div class="two-list-title">全国排名</div>
                                                <div class="two-list-mark">{{index==0?(report.d1.orderAll||0).toFixed(2):(report.d2.orderAll||0).toFixed(2)}}%</div>
                                            </div>
                                        </div>
                                        <div v-if="item.lvDesc" class="manage-lists-p" style="margin-top: 25px;padding-bottom: 40px" v-html="item.lvDesc"></div>
                                        <div class="three" v-if="item.chartType!=1">
                                            <!-- <img src="@/assets/aaa.png" alt="">
                                            <div class="three-info three-1">冒险精神</div>
                                            <div class="three-info three-2">开放性</div>
                                            <div class="three-info three-3">坚韧性</div>
                                            <div class="three-info three-4">成就动机</div>
                                            <div class="three-info three-5">主动性</div>
                                            <div class="three-info three-6">自我效能</div>
                                            <div class="three-info three-7">内控制倾向</div> -->
                                            <div :id="'chart_'+index">
                                            </div>
                                        </div>
                                        <template v-for="(node,i) in item.child">
                                            <div class="four">
                                                <div class="four-title">
                                                    <div class="four-bord"></div>
                                                    <div class="four-title-count">{{node.name}}：</div>
                                                    <div class="four-title-info" :style="'color:'+node.color+';'">{{node.lvName}}</div>
                                                </div>
                                                <div class="four-count" style="" v-for="n in node.lvTexts">
                                                    <div class="four-count-title">{{n.title}}:</div>
                                                    <div class="four-count-p" v-html="n.content"></div>
                                                </div>
                                            </div>
                                        </template>
                                    </div>
                                </div>
                            </template>
                            <template v-for="item in report.proposal">
                                <div class="manage-lists" v-if="item.show" :id="'anchor-'+(+index+6)">
                                    <div class="manage-lists-title">{{item.name}}</div>
                                    <div class="manage-lists-count shadow">
                                        <div class="manage-lists-count-title" style="width: 100%;">
                                            推荐指数
                                            <el-rate :value="item.color" style="display: inline-block" disabled :show-text="false" :colors="['#5960ED', '#5960ED', '#5960ED']" score-template="{item.color}">
                                            </el-rate>
                                        </div>
                                        <div class="manage-lists-p" style="padding-top: 15px;border:0px;" v-html="item.content"></div>
                                    </div>
                                </div>
                            </template>
                            <div class="manage-footer">
                                <!-- <div class="manage-footer-title">使用说明</div> -->
                                <div class="manage-footer-p" v-html="report.statement"></div>
                                <div class="manage-footer-info">好啦测评© Copyright</div>
                            </div>
                        </div>
                    </el-main>
                </div>
            </el-container>
        </el-container>
    </div>
</template>
<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import Header from '@/components/DetailHeader.vue'
import Nav from '@/components/DetailNav.vue'
import echarts from 'echarts'
export default {
    //import引入的组件需要注入到对象中才能使用
    components: {
        Header,
        Nav
    },
    data() {
        //这里存放数据
        return {
            url: require('../../assets/bbtt.png'),
            srcList: [
                'https://fuss10.elemecdn.com/8/27/f01c15bb73e1ef3793e64e6b7bbccjpeg.jpeg',
                'https://fuss10.elemecdn.com/1/8e/aeffeb4de74e2fde4bd74fc7b4486jpeg.jpeg'
            ],
            id: "",
            report: {
                dimension: {},
                proposal: [],
                paper: {},
                userMsg: { "info": {} },
                matchArr: {},
                main: {},
            },
            show: true,
            value: 4,
            navIndex: '1'
        };
    },
    //监听属性 类似于data概念
    computed: {},
    //监控data中的数据变化
    watch: {},
    //方法集合
    methods: {
        goYe(key) {
            key = parseInt(key)
            var el = $('#anchor-' + key);
            if (el) {
                var t = el.offset().top;
                $("html,body").scrollTop(t - 65);
            }
        },
        toDraw(index) {
            let _this = this;
            var value_1 = _this.value_1;
            var indicator_1 = _this.indicator_1;
            var el = document.getElementById('chart_' + index);
            if (!el) return;
            let myChart = echarts.init(el);
            let option = {
                radar: [{
                    name: {
                        fontWeight: 400,
                        fontFamily: "PingFangSC-Regular",
                        color: "#323541",
                        fontSize: 18
                    },
                    indicator: indicator_1[index],
                    splitArea: {
                        areaStyle: {
                            color: ['#fff',
                                '#fff', '#fff',
                                '#fff', '#fff',
                            ]
                        }
                    },
                    splitLine: {
                        lineStyle: {
                            color: ['rgba(238, 238, 238, 0.2)', 'rgba(238, 238, 238, 0.3)', 'rgba(238, 238, 238, 0.5)', 'rgba(238, 238, 238, 0.6)', 'rgba(238, 238, 238, 0.7)', 'rgba(238, 238, 238, 0.8)']
                        }
                    },
                    axisLine: {
                        lineStyle: {
                            color: 'rgba(238, 238, 238, 0.8)'
                        }
                    }
                }],
                series: [{
                    type: 'radar',
                    tooltip: {
                        trigger: 'item'
                    },
                    lineStyle: {
                        color: "#FFCC20"
                    },
                    symbol: "roundRect",
                    itemStyle: {
                        normal: {
                            color: "#FFCC20",
                            borderColor: "#FFCC20",
                            areaStyle: {
                                type: 'default',
                                color: "rgba(251, 178, 60, 0.5)"
                            }
                        }
                    },
                    data: [{
                        value: value_1[index]
                    }]
                }]
            };
            myChart.setOption(option);

            //建议加上以下这一行代码，不加的效果图如下（当浏览器窗口缩小的时候）。超过了div的界限（红色边框）
            window.addEventListener('resize', function() { myChart.resize() });
        },
        handleSelect(key, keyPath) {
            console.log(key);
        },
        getReport() {
            var _this = this;
            var id = _this.id;
            var userInfo = _this.GLOBAL.loginUserMsg;
            _this.doAjax({
                url: "getReport",
                method: "get",
                data: {
                    id: id,
                    userMsg: JSON.stringify({
                        avatar: userInfo.avatar || "",
                        nickname: userInfo.nickname || ""
                    })
                },
                success: function(ret) {
                    ret = ret.data;
                    var now = new Date().getFullYear();
                    var userMsg = ret.userMsg || {};
                    var t = new Date(userMsg.birthday).getFullYear();
                    ret.userMsg.age = now - t + 1;
                    ret.finishTime = _this.dateFormat(ret.finishTime, "yyyy/MM/dd hh:mm");
                    var timeNormal = 1; //作答时长正常
                    var answeTimeSatr = +ret.answeTimeSatr;
                    var answeTimeEnd = +ret.answeTimeEnd;
                    var time = +ret.timeTotal;
                    if (time <= answeTimeSatr) {
                        //作答时长偏短
                        timeNormal = 2;
                    }
                    if (time >= answeTimeEnd) {
                        //作答时长偏长
                        timeNormal = 3;
                    }
                    ret["showDimension"] = false;
                    ret["timeNormal"] = timeNormal;
                    var value_1 = {};
                    var indicator_1 = {};
                    var value_2 = {};
                    var indicator_2 = {};
                    var objs = ret.dimension;
                    for (var n in objs) {
                        if (objs[n].show) {
                            ret["showDimension"] = true;
                        }
                        var keys = Object.keys(objs[n].child);
                        objs[n].child[keys[0]]["active"] = "active";
                        var arr = objs[n].child;
                        var newChild = [];
                        value_1[n] = value_1[n] || [];
                        indicator_1[n] = indicator_1[n] || [];
                        value_2[n] = value_2[n] || [];
                        indicator_2[n] = indicator_2[n] || [];
                        for (var i in arr) {
                            var node = arr[i];
                            value_1[n].push(node.average);
                            indicator_1[n].push({
                                text: node.name,
                                color: "#323541",
                                max: node.max || 5
                            });
                            indicator_2[n].push({
                                value: node.name,
                                textStyle: {
                                    fontWeight: 400,
                                    fontFamily: "PingFangSC-Regular",
                                    color: "#323541",
                                    fontSize: 14
                                }
                            });
                            value_2[n].push({
                                value: node.average,
                                itemStyle: {
                                    color: "#5186FF"
                                }
                            });
                            newChild.push(node);
                        }
                        newChild.sort(function(it1, it2) {
                            return it2.average - it1.average;
                        });
                        objs[n].child = newChild;
                    }
                    ret["id"] = id;
                    var total1Full = ret.total1;
                    ret.total1 = +ret.total1.toFixed(0);
                    var proposal = ret.proposal || [];
                    ret["proposalShow"] = false;
                    proposal.forEach(function(n) {
                        if (n.show) {
                            ret["proposalShow"] = true;
                        }
                    });
                    // _this.drawCircle(ret.total1);
                    ret["statement"] = ret["statement"].replace(/\n/g, "<br>").replace("<bold", "<span style='font-weight: 600;'").replace("</bold", "</span");
                    ret["noTeamMember"] = false;
                    ret["showPage"] = true;
                    ret["d1"] = {};
                    ret["d2"] = {};
                    ret["main"] = {};
                    _this.report = ret;
                    _this.value_1 = value_1;
                    _this.indicator_1 = indicator_1;
                    _this.value_2 = value_2;
                    _this.indicator_2 = indicator_2;
                    _this.doAjax({
                        url: "userOrderMsg",
                        method: "get",
                        data: {
                            id: ret.id,
                            paperId: ret.paper.id,
                            total: total1Full || 0,
                            totalD1: ret.dimension1Total || 0,
                            totalD2: ret.dimension2Total || 0
                        },
                        success: function(r) {
                            // that.setData(r);
                            _this.report = Object.assign(_this.report, r.data);
                            _this.toDraw(0);
                            _this.toDraw(1);
                        }
                    });
                }
            });
        },
    },
    //生命周期 - 创建完成（可以访问当前this实例）
    created() {
        var id = this.$route.query.id;
        this.id = id;
        this.navIndex = "1";
        this.getReport();
    },
    //生命周期 - 挂载完成（可以访问DOM元素）
    mounted() {

        // this.drawLine();
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
.txt {
    font-size: 18px;
    line-height: 30px;
}

.box111 {
    position: relative;
    /*border: 1px solid #ddd;*/
    padding-left: 405px;
    margin-top: 20px;
    background: rgba(255, 255, 255, 1);
    box-shadow: 0px 2px 10px 0px rgba(174, 171, 201, 0.35);
    border-radius: 4px;
    /*padding: 20px;*/
    padding-right: 20px;
    padding-top: 20px;
    padding-bottom: 20px;
}

.div1 {
    padding: 10px;
    /*background-color: #eee;*/
    position: absolute;
    top: 10px;
    bottom: 10px;
    left: 10px;
    width: 168px;
    box-shadow: rgba(207, 216, 240, 0.79) 0px 2px 8px 0px;
    border-radius: 10px;
}

.div2 {
    /*background-color: #eee;*/
    position: absolute;
    top: 10px;
    bottom: 10px;
    left: 208px;
    width: 167px;
    /*background-color: #eee;*/

}

.div3 {
    position: relative;
    height: 48%;
    margin-bottom: 4%;
}

.div4 {
    position: relative;
    height: 48%;
}

.div5 {
    padding: 10px;
    position: absolute;
    bottom: 5px;
    top: 0;
    left: 0;
    right: 0;
    /*background-color: red;*/
    box-shadow: 0px 2px 8px 0px rgba(207, 216, 240, 0.79);
    -webkit-border-radius: 10px;
    -moz-border-radius: 10px;
    border-radius: 10px;
}

.div6 {
    padding: 10px;
    top: 5px;
    bottom: 0;
    left: 0;
    right: 0;
    position: absolute;
    /*background-color: red;*/
    box-shadow: 0px 2px 8px 0px rgba(207, 216, 240, 0.79);
    -webkit-border-radius: 10px;
    -moz-border-radius: 10px;
    border-radius: 10px;
}

.content {
    /*color: #fff;*/
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    /*background-color: blue;*/
}

.asd {
    height: 60px;
    line-height: 60px;
    border-top: 1px solid #e7e7e7 !important;
    text-align: center;
    color: #F56C6C;
}

.nav-left {
    float: left;
    position: fixed;
}

.boxed {
    width: 890px;
}

.shadow {
    box-shadow: 0px 2px 10px 0px rgba(174, 171, 201, 0.35);
    border-radius: 4px;
}

.displayNo {
    display: none;
}

.time-out {
    text-align: center;
    width: 100%;
    font-size: 14px;
    color: rgba(50, 53, 65, 1);
    height: 40px;
    line-height: 40px;
    background: rgba(231, 231, 231, 1);
}

.manage-footer {
    text-align: center;
}

.manage-footer-title {
    font-size: 16px;
    font-family: PingFangSC-Semibold, PingFang SC;
    font-weight: 600;
    color: rgba(144, 145, 156, 1);
    margin-top: 40px;
}

.manage-footer-p {
    font-size: 14px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: rgba(144, 145, 156, 1);
    margin-top: 40px;
}

.manage-footer-info {
    font-size: 14px;
    font-family: PingFangSC-Semibold, PingFang SC;
    font-weight: 600;
    color: rgba(144, 145, 156, 1);
    margin-top: 27px;
    margin-bottom: 50px;
}

.four {
    overflow: hidden;
    margin-top: 60px;
}

.four .four-count:last-child {
    border: 0px !important;
}

.four-title {
    overflow: hidden;
    height: 40px;
    line-height: 40px;
    padding-bottom: 5px;
}

.four-bord {
    float: left;
    width: 10px;
    height: 30px;
    margin-top: 5px;
    border-radius: 4px;
    border: 1px solid rgba(89, 96, 237, 1);
}

.four-title-count {
    float: left;
    font-size: 22px;
    font-family: PingFangSC-Semibold, PingFang SC;
    font-weight: 600;
    color: rgba(0, 0, 0, 1);
    margin-left: 15px;
}

.four-title-info {
    float: left;
    font-size: 20px;
    font-family: PingFangSC-Semibold, PingFang SC;
    font-weight: 600;
    color: rgba(235, 47, 47, 1);
}

.four-count {
    border-bottom: 1px solid #e7e7e7;
    padding: 10px 0;
    margin-left: 28px;
}

.four-count-title {
    font-size: 18px;
    font-family: PingFangSC-Semibold, PingFang SC;
    font-weight: 600;
    color: rgba(50, 53, 65, 1);
}

.four-count-p {
    font-size: 16px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: rgba(50, 53, 65, 1);
    margin-top: 10px;
}

.three {
    padding-top: 20px;
    width: 533.5px;
    height: 350px;
    position: relative;
    margin: auto;
}

.three>div {
    width: 533.5px;
    height: 350px;
    position: relative;
    margin: auto;
}

.three img {
    width: 40%;
    position: absolute;
    left: 30%;
    top: 20%;
}

.three-info {
    font-size: 18px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: rgba(50, 53, 65, 1);
    position: absolute;
}

.three-1 {
    left: 43%;
    top: 10%;
}

.three-2 {
    left: 68%;
    top: 24%;
}

.three-3 {
    left: 72%;
    top: 54%;
}

.three-4 {
    left: 60%;
    top: 82%;
}

.three-5 {
    left: 30%;
    top: 82%;
}

.three-6 {
    left: 14%;
    top: 54%;
}

.three-7 {
    left: 16%;
    top: 24%;
}

.two {
    overflow: hidden;
    // width: 90%;
    // margin: auto;
    padding: 12px;
    box-shadow: 0px 6px 25px 0px rgba(204, 206, 255, 0.47);
    border-radius: 4px;
}

.two-list {
    float: left;
    width: 33%;
    text-align: center;
}

.two-list-title {
    font-size: 16px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: rgba(50, 53, 65, 1);
}

.two-list-mark {
    font-size: 35px;
    font-family: PingFangSC-Semibold, PingFang SC;
    font-weight: 600;
    color: rgba(89, 96, 237, 1);
    margin-top: 15px;
}

.manage-lists-count-one {
    float: left;
    /*height: 90%;*/
    margin-right: 10px;
    /*display: flex;*/
    /*align-items: center;*/
    /*justify-content: center;*/
}

.one-title {
    font-size: 16px;
    font-family: PingFangSC-Semibold, PingFang SC;
    font-weight: 600;
    color: rgba(50, 53, 65, 1);
    /*margin-top: 120px;*/
    text-align: center;
}

.one-info {
    font-size: 16px;
    font-family: PingFangSC-Semibold, PingFang SC;
    font-weight: 600;
    color: rgba(89, 96, 237, 1);
    margin-top: 10px;
    text-align: center;
}

.one-img {
    text-align: center;
    margin-top: 40px;
}

.one-lists {
    box-shadow: 0px 2px 8px 0px rgba(207, 216, 240, 0.79);
    border-radius: 10px;
    /*min-height: 200px;*/
    overflow: hidden;
    padding-left: 25px;
    padding-right: 25px;
}

.one-lists-info {
    font-size: 14px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: rgba(144, 145, 156, 1);
    margin-top: 6px;
}

.one-lists-info span {
    font-size: 16px;
    font-family: PingFangSC-Semibold, PingFang SC;
    font-weight: 600;
    color: rgba(50, 53, 65, 1);
}

.manage-lists-count-list {
    padding-top: 25px;
    overflow: hidden;
}

.manage-lists-count-list .list-info {
    float: left;
    width: 176px;
    height: 50px;
    border-radius: 25px;
    border: 1px solid rgba(89, 96, 237, 1);
    text-align: center;
    line-height: 50px;
    border-radius: 50px;
    font-size: 16px;
    color: rgba(89, 96, 237, 1);
    margin-right: 20px;
}

.manage-lists {
    margin-top: 40px;
}

.manage-lists-title {
    font-size: 22px;
    color: rgba(50, 53, 65, 1);
    font-weight: bold;
}

.manage-lists-count {
    margin-top: 20px;
    background: rgba(255, 255, 255, 1);
    box-shadow: 0px 2px 10px 0px rgba(174, 171, 201, 0.35);
    border-radius: 4px;
    padding: 20px;
    overflow: hidden;
    min-height: 200px;
}

.manage-lists-p {
    /*min-height: 238px;*/
    font-size: 18px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: rgba(50, 53, 65, 1);
    line-height: 30px;
    padding-bottom: 5px;
    border-bottom: 1px solid #e7e7e7;
}

.manage-lists-count-title {
    max-width: 360px;
    font-size: 18px;
    font-family: PingFangSC-Semibold, PingFang SC;
    font-weight: 600;
    color: rgba(50, 53, 65, 1);
    padding: 5px 0px 19px 0px;
    border-bottom: 1px solid #e7e7e7;
    line-height: 30px;
}

.manage-top-info {
    font-size: 14px;
    width: 60%;
    color: rgba(245, 108, 108, 1);
    margin-left: auto;
    margin-right: auto;
    margin-top: 15px;
    margin-bottom: 25px;
}

.manage-top-list {
    overflow: hidden;
    margin-top: 25px;
    display: flex;
    justify-content: center;
}

.manage-top-list-main {
    float: left;
    width: 33%;
    text-align: center;

}

.manage-top-list-main-title {
    font-size: 14px;
    font-weight: 400;
    color: rgba(0, 0, 0, 1);
}

.manage-top-list-main-info {
    font-size: 17px;
    color: rgba(103, 194, 58, 1);
    margin-top: 15px;
}

.manage-top-user {
    height: 100px;
    padding-left: 25px;
    border-bottom: 1px solid #e7e7e7;
}

.manage-top-user-list {
    overflow: hidden;
}

.manage-top-user-list-info {
    float: left;
    margin-top: 25px;
}

.manage-top-user-list-info span {
    padding: 0px 10px;
}

.manage-top-user-list-btn {
    line-height: 100px;
    float: left;
    margin-left: 60px;
}

.manage-top {
    background-color: #fff;
    overflow: hidden;
}

.manage-top-title {
    font-size: 22px;
    font-family: PingFangSC-Semibold, PingFang SC;
    font-weight: 600;
    color: rgba(50, 53, 65, 1);
    height: 80px;
    line-height: 80px;
    padding-left: 25px;
    border-bottom: 1px solid #e7e7e7;
}

.manage-top-title span {
    height: 17px;
    font-size: 12px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: rgba(50, 53, 65, 1);
    margin-left: 25px;
}
</style>