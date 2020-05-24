<!-- 报告对比 -->
<template>
    <div class='contrast' style="background:rgba(247,248,250,1);">
        <el-container>
            <el-header>
                <Header :show="show" style="position: fixed;width: 100%;z-index: 999;background:rgba(255,255,255,1);box-shadow:0px 2px 10px 0px rgba(174,171,201,0.35);"></Header>
            </el-header>
            <el-container class="body-container">
                <el-header>
                    <div class="contrast-title">专家型销售测评——报告对比</div>
                </el-header>
                <el-main style="min-width:1120px;background-color: #fff;padding: 0px;box-shadow:0px 2px 20px 0px rgba(174,171,201,0.35);border-radius:2px;">
                    <div class="contrast-box">
                        <div class="table-count">
                            <ul>
                                <li class="table-adv"></li>
                                <li class="table-title" style="border-bottom:1px solid rgba(231,231,231,1);">基本信息</li>
                                <li class="table-left-count">年龄</li>
                                <li class="table-left-count">性别</li>
                                <li class="table-left-count">学历</li>
                                <li class="table-title" style="border-bottom:1px solid rgba(231,231,231,1);">作答分析</li>
                                <li class="table-left-count">作答时常</li>
                                <li class="table-left-count">作答一致性</li>
                                <li class="table-left-count">结论有效性</li>
                                <li class="table-title" style="border-bottom:1px solid rgba(231,231,231,1);">报告总述</li>
                                <li class="table-left-count">总得分</li>
                                <li class="table-left-count">能力等级</li>
                                <li class="table-left-count">组织排名</li>
                                <li class="table-left-count">全国排名</li>
                                <li class="table-left-count">详细描述</li>
                                <template v-for="node in (tableData[0]||{}).dimension">
                                    <template v-if="node.show&&node.name">
                                        <li class="table-title" style="border-bottom:1px solid rgba(231,231,231,1);">{{node.name}}</li>
                                        <li class="table-left-count" v-for="n in node.child">
                                            <el-popover placement="right" width="400" trigger="hover">
                                                <div style="font-size:16px;font-weight:600;">定义</div>
                                                <div style="font-size:14px;color:rgba(50,53,65,1);margin-top: 10px;">{{n.definition}}</div>
                                                <el-button type="text" slot="reference" style="color: #323541">{{n.name}} <i class="el-icon-question" style="color: #5960ED;"></i></el-button>
                                            </el-popover>
                                        </li>
                                    </template>
                                    <template v-for="node in (tableData[0]||{}).proposal">
                                        <template v-if="node.show&&node.name">
                                            <li class="table-title" style="border-bottom:1px solid rgba(231,231,231,1);">{{node.name}}</li>
                                            <li class="table-left-count">推荐指数</li>
                                            <li class="table-left-count" style="height: 352px;line-height: 352px;">建议详情</li>
                                        </template>
                                    </template>
                                </template>
                            </ul>
                        </div>
                        <div v-for="(item, index) in tableData" :key="index" class="table-count" style="width: 170px">
                            <ul>
                                <li class="table-adv" style="width: 170px;"><img :src="item.userMsg.avatar" alt=""><br>{{item.name}}<br>
                                    <el-button type="text" @click="removeReport(index)" class="dele" v-if="index>0"><img src="@/assets/del.png" alt="" style="width: 13px;height:13px;"></el-button>
                                </li>
                                <li class="table-title noPd" style="width: 170px;border-bottom:1px solid rgba(231,231,231,1);"></li>
                                <li class="table-right-count" style="width: 170px;">{{item.userMsg.age}}</li>
                                <li class="table-right-count" style="width: 170px;">{{item.userMsg.info.gender==1?'男':'女'}}</li>
                                <li class="table-right-count" style="width: 170px;">{{item.userMsg.educationName}}</li>
                                <li class="table-title noPd" style="width: 170px;border-bottom:1px solid rgba(231,231,231,1);"></li>
                                <li class="table-right-count" style="color:#67C23A;width: 170px;">{{item.timeTotal}}分钟</li>
                                <li class="table-right-count" style="color:#67C23A;width: 170px;">{{item.matchArr.type==1?'正常':'异常'}}</li>
                                <li class="table-right-count" style="width: 170px;">{{(item.matchArr.type!=1||item.timeNormal!=1)?"无效":"有效"}}</li>
                                <li class="table-title noPd" style="width: 170px;border-bottom:1px solid rgba(231,231,231,1);"></li>
                                <li class="table-right-count" style="width: 170px;">{{item.total1}}</li>
                                <li class="table-right-count" style="width: 170px;">{{item.summary.title}}</li>
                                <li class="table-right-count" style="width: 170px;">{{(item.main.order||0).toFixed(2)}}%</li>
                                <li class="table-right-count" style="width: 170px;">{{(item.main.orderAll||0).toFixed(2)}}%</li>
                                <li class="table-right-count" style="width: 170px;">
                                    <el-popover placement="right" width="400" trigger="click">
                                        <div v-html="(item.matchArr.type!=1||item.timeNormal!=1)?item.rule2:item.rule1"></div>
                                        <el-button type="text" slot="reference">查看</el-button>
                                    </el-popover>
                                </li>
                                <template v-for="node in item.dimension">
                                    <template v-if="node.show&&node.name">
                                        <li class="table-title noPd" style="width: 170px;border-bottom:1px solid rgba(231,231,231,1);"></li>
                                        <li class="table-right-count" style="width: 170px;" v-for="n in node.child">
                                            {{n.lvName}}
                                        </li>
                                    </template>
                                    <template v-for="node in item.proposal">
                                        <template v-if="node.show&&node.name">
                                            <li class="table-title noPd" style="width: 170px;border-bottom:1px solid rgba(231,231,231,1);"></li>
                                            <li class="table-right-count" style="width: 170px;">
                                                <el-rate style="display: inline-block" disabled :show-text="false" :colors="['#5960ED', '#5960ED', '#5960ED']" score-template="{node.color}">
                                                </el-rate>
                                            </li>
                                            <li class="table-right-count" style="width: 170px;font-size:14px;color:rgba(50,53,65,1);font-weight:normal;min-height: 352px;line-height:20px;overflow:hidden">
                                                <div style="margin:31px;">{{node.content}}</div>
                                            </li>
                                        </template>
                                    </template>
                                </template>
                            </ul>
                        </div>
                        <div class="table-count" style="width: 170px">
                            <ul>
                                <li class="table-adv" style="width: 170px">
                                    <el-button @click="showUser = true" type="info" icon="el-icon-plus" circle style="width:60px;height:60px;background:rgba(242,242,242,1);border: 0px;color: #7777;margin-top:55px;"></el-button>
                                    <br>
                                    <el-button @click="showUser = true" type="text" style="color:#323541">点击添加</el-button>
                                </li>
                                <li class="table-title noPd" style="width: 170px;border-bottom:1px solid rgba(231,231,231,1);"></li>
                                <li class="table-left-count" style="width: 170px"></li>
                                <li class="table-left-count" style="width: 170px"></li>
                                <li class="table-left-count" style="width: 170px"></li>
                                <li class="table-title noPd" style="width: 170px;border-bottom:1px solid rgba(231,231,231,1);"></li>
                                <li class="table-left-count" style="width: 170px"></li>
                                <li class="table-left-count" style="width: 170px"></li>
                                <li class="table-left-count" style="width: 170px"></li>
                                <li class="table-title noPd" style="width: 170px;border-bottom:1px solid rgba(231,231,231,1);"></li>
                                <li class="table-left-count" style="width: 170px"></li>
                                <li class="table-left-count" style="width: 170px"></li>
                                <li class="table-left-count" style="width: 170px"></li>
                                <li class="table-left-count" style="width: 170px"></li>
                                <li class="table-left-count" style="width: 170px"></li>
                                <template v-for="node in (tableData[0]||{}).dimension">
                                    <template v-if="node.show&&node.name">
                                        <li class="table-title noPd" style="width: 170px;border-bottom:1px solid rgba(231,231,231,1);"></li>
                                        <li class="table-left-count" v-for="n in node.child"></li>
                                    </template>
                                    <template v-for="node in (tableData[0]||{}).proposal">
                                        <template v-if="node.show&&node.name">
                                            <li class="table-title noPd" style="width: 170px;border-bottom:1px solid rgba(231,231,231,1);"></li>
                                            <li class="table-left-count" style="width: 170px"></li>
                                            <li class="table-left-count" style="height: 352px;line-height: 352px;width: 170px"></li> -->
                                        </template>
                                    </template>
                                </template>
                            </ul>
                        </div>
                    </div>
                </el-main>
            </el-container>
        </el-container>
        <el-dialog title="添加成员进行对比" :visible.sync="showUser" center="" width="364px">
            <el-select v-model="value2" multiple collapse-tags style="width:324px;" placeholder="请选择">
                <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
            </el-select>
            <span slot="footer" class="dialog-footer">
                <el-button @click="showUser = false">取 消</el-button>
                <el-button type="primary" @click="setReports()">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>
<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import Header from '@/components/DetailHeader.vue'
export default {
    //import引入的组件需要注入到对象中才能使用
    components: {
        Header
    },
    data() {
        //这里存放数据
        return {
            selIds: [],
            id: "",
            showUser: false,
            show: false,
            tableData: [],
            value: 4,
            options: [],
            value2: [],
            childOrder: {}
        };
    },
    //监听属性 类似于data概念
    computed: {},
    //监控data中的数据变化
    watch: {},
    //方法集合
    methods: {
        setReports() {
            var _this = this;
            var arr = _this.value2;
            arr.forEach(function(id) {
                _this.setReport(id);
            });
        },
        setReport(id) {
            var _this = this;
            _this.getReport(id, function(report) {
                var tableData = _this.tableData;
                tableData.push(report);
                _this.tableData = tableData;
            });
        },
        removeReport(i) {
            this.tableData.split(i, 0);
        },
        getReportList() {
            var _this = this;
            _this.doAjax({
                url: 'getReportList',
                method: "get",
                data: {
                    id: _this.paperId,
                    type: 1,
                    page: 1,
                    pageSize: 1000
                },
                success: function(response) {
                    if (response.status == 200) {
                        var list = [];
                        response.data.data.forEach(function(node) {
                            if (_this.selIds.indexOf(node.id) != -1) return;
                            list.push({
                                value: node.id,
                                label: node.people.name
                            });
                        });
                        _this.options = list;
                    }
                }
            });
        },
        getReport(id, cb) {
            var _this = this;
            id = id || _this.id;
            var _this = this;
            _this.doAjax({
                url: "getReport",
                method: "get",
                data: {
                    id: id
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
                    ret["timeNormal"] = timeNormal;
                    ret["id"] = id;
                    var total1Full = ret.total1;
                    ret.total1 = +ret.total1.toFixed(0);
                    var proposal = ret.proposal || [];
                    ret["proposalShow"] = false;
                    ret["showDimension"] = false;
                    var objs = ret.dimension;
                    var childOrder = _this.childOrder;
                    for (var n in objs) {
                        if (objs[n].show) {
                            ret["showDimension"] = true;
                        }
                        var newChild = [];
                        childOrder[n] = childOrder[n] || [];
                        var keys = Object.keys(objs[n].child);
                        objs[n].child[keys[0]]["active"] = "active";
                        var arr = objs[n].child;
                        for (var i in arr) {
                            var node = arr[i];
                            var newi = childOrder[n].indexOf(node.name);
                            if (newi == -1) {
                                newChild.push(node);
                                childOrder[n].push(node.name);
                            } else {
                                newChild[newi] = node;
                            }
                        }
                        objs[n].child = newChild;
                    }
                    proposal.forEach(function(n) {
                        if (n.show) {
                            ret["proposalShow"] = true;
                        }
                    });
                    _this.childOrder = childOrder;
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
                            ret = Object.assign(ret, r.data);
                            if (cb) return cb(ret);
                        }
                    });
                }
            });
        },
        handleEdit(index, row) {
            console.log(index, row);
        },
        handleDelete(index, row) {
            console.log(index, row);
        }
    },
    //生命周期 - 创建完成（可以访问当前this实例）
    created() {
        var _this = this;
        var id = _this.$route.query.id;
        _this.id = id;
        _this.selIds = [id];
        _this.getReport(id, function(report) {
            _this.paperId = report.paper.id;
            _this.tableData = [report];
            _this.getReportList();
        });
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
//@import url(); 引入公共css类'
.noPd {
    padding: 0px !important;
}

.dele {
    position: absolute;
    top: 15px;
    right: 15px;
    width: 13px;
    height: 13px;
}

.dele img {
    margin: 0px !important;
}

.table-count ul li {
    // margin:  1px 0px;
}

.table-title {
    font-size: 18px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: rgba(50, 53, 65, 1);
    height: 52px;
    line-height: 52px;
    background: rgba(248, 248, 248, 1);
    padding-left: 13px;
    overflow: hidden;
}

.table-left-count {
    width: 187px;
    height: 46px;
    line-height: 46px;
    text-align: center;
    background-color: #fff;
    font-size: 14px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: rgba(50, 53, 65, 1);
    border-bottom: 1px solid rgba(231, 231, 231, 1);
}

.table-right-count {
    width: 187px;
    height: 46px;
    line-height: 46px;
    text-align: center;
    background-color: #fff;
    font-size: 16px;
    font-family: PingFangSC-Semibold, PingFang SC;
    font-weight: 600;
    color: rgba(50, 53, 65, 1);
    border-bottom: 1px solid rgba(231, 231, 231, 1);
}

.table-count {
    list-style: none;
    display: -webkit-box;
    -webkit-overflow-scrolling: touch;
    -ms-overflow-style: none;
    overflow: -moz-scrollbars-none;
    width: 187px;
    float: left;
    border-right: 1px solid #F8F8F8
}

.table-adv {
    width: 187px;
    height: 197px;
    background-color: #fff;
    text-align: center;
    font-size: 18px;
    font-weight: 600;
    color: rgba(50, 53, 65, 1);
    position: relative;
    border: 1px solid rgba(231, 231, 231, 1);
}

.table-adv img {
    width: 60px;
    height: 60px;
    border-radius: 50%;
    margin-top: 55px;
}

.contrast .body-container {
    padding: 40px;
}

.contrast-title {
    font-size: 22px;
    font-family: PingFangSC-Semibold, PingFang SC;
    font-weight: 600;
    color: rgba(50, 53, 65, 1);
}

.table-titles {
    width: 170px;
    float: left;
}
</style>