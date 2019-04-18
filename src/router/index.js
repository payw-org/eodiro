import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../components/Home'
import EodiroApp from '../components/EodiroApp'
import SelectBuilding from '../components/SelectBuilding'
import SelectFloor from '../components/SelectFloor'
import NotFound from '../components/NotFound'

Vue.use(VueRouter)

export default new VueRouter({
  mode: 'history',
  routes: [
    {
      path: '/',
      component: Home
    },
    {
      path: '/buildings',
      component: EodiroApp,
      children: [
        {
          path: '',
          component: SelectBuilding
        },
        {
          path: ':buildingID',
          component: SelectFloor
        }
      ]
    },
    {
      path: '*',
      component: NotFound
    }
  ]
})