import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import Workbench from '../views/Workbench.vue'
import Vip from '../views/Vip.vue'
import createTeam from '../views/createTeam'
import ManageIndex from '../views/manage/Index.vue'
import ManageRelease from '../views/manage/Release.vue'
import ManageMessage from '../views/manage/Message.vue'
import ManageEmaill from '../views/manage/Email.vue'
import ManageCode from '../views/manage/Code.vue'
import ManageRecord from '../views/manage/Record.vue'
import ManagePresentation from '../views/manage/Presentation.vue'
import ManageDetails from '../views/manage/Details.vue'
import ManageContrast from '../views/manage/Contrast.vue'
import SystemIndex from '../views/system/Index.vue'
import SystemFramework from '../views/system/Framework.vue'
import SystemStaff from '../views/system/Staff.vue'
import SystemUsers from '../views/system/Users.vue'
import SystemExternal from '../views/system/External.vue'
import SystemApplication from '../views/system/Application.vue'
import AdminIndex from '../views/admin/Index.vue'
import EvaluationIndex from '../views/evaluation/Index.vue'
import EvaluationDetails from '../views/evaluation/Details.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/Vip',
    name: 'Vip',
    component: Vip
  },
  {
    path: '/createTeam',
    name: 'createTeam',
    component: createTeam
  },
  {
    path: '/ManageIndex',
    name: 'ManageIndex',
    component: ManageIndex
  },
  {
    path: '/ManageRelease',
    name: 'ManageRelease',
    component: ManageRelease
  },
  {
    path: '/ManageMessage',
    name: 'ManageMessage',
    component: ManageMessage
  },
  {
    path: '/ManageEmaill',
    name: 'ManageEmaill',
    component: ManageEmaill
  },
  {
    path: '/ManageCode',
    name: 'ManageCode',
    component: ManageCode
  },
  {
    path: '/ManagePresentation',
    name: 'ManagePresentation',
    component: ManagePresentation
  },
  {
    path: '/ManageDetails',
    name: 'ManageDetails',
    component: ManageDetails
  },
  {
    path: '/ManageContrast',
    name: 'ManageContrast',
    component: ManageContrast
  },
  {
    path: '/ManageRecord',
    name: 'ManageRecord',
    component: ManageRecord
  },
  {
    path: '/workbench',
    name: 'workbench',
    component: Workbench
  },
  {
    path: '/SystemIndex',
    name: 'SystemIndex',
    component: SystemIndex
  },
  {
    path: '/SystemFramework',
    name: 'SystemFramework',
    component: SystemFramework
  },
  {
    path: '/SystemStaff',
    name: 'SystemStaff',
    component: SystemStaff
  },
  {
    path: '/SystemUsers',
    name: 'SystemUsers',
    component: SystemUsers
  },
  {
    path: '/SystemExternal',
    name: 'SystemExternal',
    component: SystemExternal
  },
  {
    path: '/SystemApplication',
    name: 'SystemApplication',
    component: SystemApplication
  },
  {
    path: '/AdminIndex',
    name: 'AdminIndex',
    component: AdminIndex
  },
  {
    path: '/EvaluationIndex',
    name: 'EvaluationIndex',
    component: EvaluationIndex
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/EvaluationDetails',
    name: 'EvaluationDetails',
    component: EvaluationDetails
  }
]

const router = new VueRouter({
  //mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
