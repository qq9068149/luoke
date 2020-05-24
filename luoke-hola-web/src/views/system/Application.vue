<!--  -->
<template>
<div class='system users'>
    <el-header>
        <Header :showNav="showNav" :userLogin="userLogin" :activeIndex="activeIndex"></Header>
    </el-header>
    <el-container class="body-container">
        <el-aside width="220px">
            <Nav :activeIndex="navIndex"></Nav>
        </el-aside>
        <el-main>
            <div class="main-div">
                <div class="main-div-title">组织外部应聘者 / <span style="font-size:14px;color:rgba(144,145,156,1);">林威</span></div>
                <div class="main-div-count">
                    <div class="main-div-count-top">
                        <div class="main-div-count-top">
                            <div class="main-div-count-top-left">
                                <div class="users-name">林威</div>
                            </div>
                            <div class="main-div-count-top-right">
                                <el-button type="text" style="color:rgba(245,108,108,1);"><i class="el-icon-delete"></i> 删除此应聘者</el-button>
                            </div>
                        </div>
                    </div>
                    <div class="main-div-count-bottom" style="min-height:700px;">
                        <el-tabs v-model="activeName" @tab-click="handleClick">
                            <el-tab-pane label="个人资料" name="first">
                                <el-form ref="form" :model="form" label-width="80px" style="marign-top: 20px;position: relative;">
                                    <el-form-item label="照片" style="position: absolute;right:240px;overflow:hiiden;">
                                        <el-upload
                                            class="avatar-uploader"
                                            action="https://jsonplaceholder.typicode.com/posts/"
                                            :show-file-list="false">
                                            <img v-if="imageUrl" :src="imageUrl" class="avatar">
                                            <div style="width:100%;text-align:left;"><el-button type="text" style="font-size:16px;">重新上传</el-button></div>
                                            <!-- <i v-else class="el-icon-plus avatar-uploader-icon"></i> -->
                                        </el-upload>
                                    </el-form-item>
                                    <el-form-item label="姓名" style="float:left">
                                        <el-input v-model="form.name"></el-input>
                                    </el-form-item>
                                    <div style="clear:both"></div>
                                    <el-form-item label="手机号" style="float:left">
                                        <el-input v-model="form.phone"></el-input>
                                    </el-form-item>
                                    <div style="clear:both"></div>
                                    <el-form-item label="性别" style="float:left">
                                        <el-radio-group v-model="form.resource">
                                            <el-radio label="男"></el-radio>
                                            <el-radio label="女"></el-radio>
                                        </el-radio-group>
                                    </el-form-item>
                                    <div style="clear:both"></div>
                                    <el-form-item label="邮箱" style="float:left">
                                        <el-input v-model="form.email" placeholder="请输入邮箱"></el-input>
                                    </el-form-item>
                                    <div style="clear:both"></div>
                                    <el-form-item label="所属部门" style="float:left">
                                        <el-select v-model="value" placeholder="请选择">
                                            <el-option
                                            v-for="item in options"
                                            :key="item.value"
                                            :label="item.label"
                                            :value="item.value">
                                            </el-option>
                                        </el-select>
                                    </el-form-item>
                                    <div style="clear:both"></div>
                                    <el-form-item label="岗位" style="float:left">
                                        <el-select v-model="value" placeholder="请选择">
                                            <el-option
                                            v-for="item in options"
                                            :key="item.value"
                                            :label="item.label"
                                            :value="item.value">
                                            </el-option>
                                        </el-select>
                                    </el-form-item>
                                    <div style="clear:both"></div>
                                    <el-form-item label="入职时间" style="float:left">
                                        <el-date-picker
                                            v-model="form.date1"
                                            type="date"
                                            placeholder="选择日期" style="float:left">
                                        </el-date-picker>
                                    </el-form-item>
                                    <div style="clear:both"></div>
                                    <el-form-item label="学历">
                                        <el-select v-model="value" placeholder="请选择">
                                            <el-option
                                            v-for="item in options"
                                            :key="item.value"
                                            :label="item.label"
                                            :value="item.value">
                                            </el-option>
                                        </el-select>
                                    </el-form-item>
                                    <div style="clear:both"></div>
                                    <el-form-item>
                                        <el-button type="primary" style="float:left">保存</el-button>
                                    </el-form-item>
                                </el-form>
                            </el-tab-pane>
                            <el-tab-pane label="测评报告" name="second" style="min-height:650px">
                                <el-table
                                    :data="tableData"
                                    border
                                    style="width: 100%">
                                    <el-table-column
                                    prop="date"
                                    label="日期">
                                    </el-table-column>
                                    <el-table-column
                                    prop="name"
                                    label="姓名">
                                    </el-table-column>
                                    <el-table-column
                                    prop="address"
                                    label="地址">
                                    </el-table-column>
                                    <el-table-column
                                    label="操作"
                                    width="100">
                                    <template slot-scope="scope">
                                        <el-button @click="handleClick(scope.row)" type="text" size="small">查看报告</el-button>
                                    </template>
                                    </el-table-column>
                                </el-table>
                                <div class="main-div-nav">
                                    <el-pagination
                                        @size-change="handleSizeChange"
                                        @current-change="handleCurrentChange"
                                        :current-page.sync="currentPage3"
                                        :page-size="100"
                                        layout="prev, pager, next, jumper"
                                        :total="1000">
                                    </el-pagination>
                                </div>
                            </el-tab-pane>
                        </el-tabs>
                    </div>
                </div>
            </div>
        </el-main>
    </el-container>
</div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import Header from '@/components/Header.vue'
import Nav from '@/views/system/Nav.vue'
export default {
//import引入的组件需要注入到对象中才能使用
components: {
     Header,
     Nav
},
data() {
//这里存放数据
return {
    value: '',
    imageUrl: require('../../assets/adv.jpg'),
    form: {
          name: '林威',
          phone: '15216470832',
          email: '',
          date1: '',
          date2: '',
          delivery: false,
          type: [],
          resource: '',
          desc: ''
        },
    activeName: 'first',
     options: [{
          value: '选项1',
          label: '黄金糕'
        }, {
          value: '选项2',
          label: '双皮奶'
        }, {
          value: '选项3',
          label: '蚵仔煎'
        }, {
          value: '选项4',
          label: '龙须面'
        }, {
          value: '选项5',
          label: '北京烤鸭'
        }],
    showForm: false,
    currentPage3: 5,
    showNav: true,
    userLogin: false,
    activeIndex: '3',
    navIndex: '4',
    tableData: [{
          date: '2016-05-02',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1518 弄',
          zip: 200333
        }, {
          date: '2016-05-04',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1517 弄',
          zip: 200333
        }, {
          date: '2016-05-01',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1519 弄',
          zip: 200333
        }, {
          date: '2016-05-03',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1516 弄',
          zip: 200333
        }]
};
},
//监听属性 类似于data概念
computed: {},
//监控data中的数据变化
watch: {},
//方法集合
methods: {
    handleClick(row) {
        console.log(row);
      },
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
      }
},
//生命周期 - 创建完成（可以访问当前this实例）
created() {

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
.avatar {
    width:167px;
    height:157px;
    display: block;
    border:1px solid rgba(0,0,0,0.18);
   
  }
.system .main-div-count-bottom{
    position: relative;
    margin-top: 20px;
}
.system .main-div-count-top{
    overflow: hidden;
}
.system .main-div-count-top .main-div-count-top-left{
    float: left;
}
.system .main-div-count-top .main-div-count-top-left .users-name{
    font-size:16px;
    font-family:PingFangSC-Semibold,PingFang SC;
    font-weight:600;
    color:rgba(50,53,65,1);
}
.system .main-div-count-top .main-div-count-top-left .users-count{
    font-size:12px;
    font-family:PingFangSC-Regular,PingFang SC;
    font-weight:400;
    color:rgba(92,97,113,1);
    margin-top: 10px;
}
.system .main-div-count-top .main-div-count-top-left .users-count span{
    margin-right: 20px;
}
.system .main-div-count-top .main-div-count-top-right{
    float: right;
}
.system .lists{
    width: 50%;
    float: left;
}
.system .lists .shi{
    width: 250px;
}
.system .lists .lists-title{
    font-size:16px;
    font-family:PingFangSC-Regular,PingFang SC;
    font-weight:400;
    color:rgba(144,145,156,1);
}
.system .form-a{
    font-size:14px;
    font-family:PingFangSC-Regular,PingFang SC;
    font-weight:400;
    color:rgba(245,108,108,1);
}
.system .form-b{
    font-size:12px;
    font-family:PingFangSC-Regular,PingFang SC;
    font-weight:400;
    color:rgba(92,97,113,1);
    line-height:17px;
}
.system .main-div-nav{
    text-align: center;
    padding: 20px 0px;
    position: absolute;
    bottom: 0px;
    width: 80%;
    left: 10%;
}
.system .main-div{
    width: 98%;
    background-color: #fff;
}
.system .main-div .main-div-title{
    background-color: #FAFAFA;
    height: 40px;
    line-height: 40px;
    padding-left: 20px;
    font-size:14px;
    font-family:PingFangSC-Regular,PingFang SC;
    font-weight:bold;
    color:rgba(50,53,65,1);
    letter-spacing:1px;
    border-bottom: 1px solid #eee;
}
.system .main-div .main-div-count{
    padding: 20px 20px;
    overflow: hidden;
}
.system .main-div .main-div-count .main-div-list{
    overflow: hidden;
    float: left;
    width: 50%;
    margin-bottom: 20px;
}
.system .main-div .main-div-count .main-div-list .main-div-list-title{
    float: left;
    font-size:14px;
    font-family:PingFangSC-Regular,PingFang SC;
    font-weight:400;
    color:rgba(92,97,113,1);
}
.system .main-div .main-div-count .main-div-list .main-div-list-count{
    float: left;
    font-size:14px;
    font-family:PingFangSC-Semibold,PingFang SC;
    font-weight:600;
    color:rgba(50,53,65,1);
}
.system .main-div .main-div-count .main-div-list .main-div-list-count .el-button{
    padding: 0px;
}
</style>