import Vue from 'vue'
import VueRouter from 'vue-router'
const Home = () => import(/* webpackChunkName: "eodiro-components" */ 'Components/Home.vue')
const EodiroApp = () => import(/* webpackChunkName: "eodiro-components" */ 'Components/EodiroApp.vue')
const SelectBuilding = () => import(/* webpackChunkName: "eodiro-components" */ 'Components/SelectBuilding.vue')
const SelectFloor = () => import(/* webpackChunkName: "eodiro-components" */ 'Components/SelectFloor.vue')
const Result = () => import(/* webpackChunkName: "eodiro-components" */ 'Components/Result.vue')
const NotFound = () => import(/* webpackChunkName: "eodiro-components" */ 'Components/NotFound.vue')

Vue.use(VueRouter)

let routes1 = [
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

let routes2 = [
  {
    path: '/',
    component: Home,
    name: 'home'
  },
  {
    path: '/university',
    component: undefined,
    name: 'university'
  },
  {
    path: '/:universityVendor',
    component: EodiroApp,
    children: [
      {
        path: '',
        component: SelectBuilding,
        name: 'building'
      },
      {
        path: ':buildingID',
        component: SelectFloor,
        name: 'floor'
      },
      {
        path: ':buildingID/:floorID',
        component: Result,
        name: 'result'
      }
    ]
  }
]

export default new VueRouter({
  mode: 'history',
  routes: routes2
})