import Vue from 'vue'
import VueRouter from 'vue-router'
// import Home from '../components/Home'
// import EodiroApp from '../components/EodiroApp'
// import SelectBuilding from '../components/SelectBuilding'
// import SelectFloor from '../components/SelectFloor'
// import Result from '../components/Result'
// import NotFound from '../components/NotFound'
const Home = () => import(/* webpackChunkName: "eodiro-components" */ '../components/Home.vue')
const EodiroApp = () => import(/* webpackChunkName: "eodiro-components" */ '../components/EodiroApp.vue')
const SelectBuilding = () => import(/* webpackChunkName: "eodiro-components" */ '../components/SelectBuilding.vue')
const SelectFloor = () => import(/* webpackChunkName: "eodiro-components" */ '../components/SelectFloor.vue')
const Result = () => import(/* webpackChunkName: "eodiro-components" */ '../components/Result.vue')
const NotFound = () => import(/* webpackChunkName: "eodiro-components" */ '../components/NotFound.vue')

Vue.use(VueRouter)

export default new VueRouter({
  mode: 'history',
  routes: [
    {
      path: '/',
      component: Home,
      name: 'home'
    },
    {
      path: '/buildings',
      component: EodiroApp,
      children: [
        {
          path: '',
          component: SelectBuilding,
          name: 'buildings'
        },
        {
          path: ':buildingID/floors',
          component: SelectFloor,
          name: 'floors'
        },
        {
          path: ':buildingID/floors/:floorID',
          component: Result,
          name: 'result'
        }
      ]
    },
    {
      path: '*',
      component: NotFound
    }
  ]
})