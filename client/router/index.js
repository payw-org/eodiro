import Vue from 'vue'
import VueRouter from 'vue-router'
const Home = () => import(/* webpackChunkName: "eodiro-components" */ 'Components/Home.vue')
const EodiroApp = () => import(/* webpackChunkName: "eodiro-components" */ 'Components/EodiroApp.vue')
const SelectBuilding = () => import(/* webpackChunkName: "eodiro-components" */ 'Components/SelectBuilding.vue')
const SelectFloor = () => import(/* webpackChunkName: "eodiro-components" */ 'Components/SelectFloor.vue')
const Result = () => import(/* webpackChunkName: "eodiro-components" */ 'Components/Result.vue')
const NotFound = () => import(/* webpackChunkName: "eodiro-components" */ 'Components/NotFound.vue')
const University = () => import(/* webpackChunkName: "eodiro-components" */ 'Components/University.vue')

Vue.use(VueRouter)

export default new VueRouter({
  mode: 'history',
  routes: [
    {
      path: '/',
      component: Home,
      name: 'home',
      meta: {
        title: {
          'ko': '어디로',
          'en': 'eodiro',
          'zh': 'eodiro',
          'fr': 'eodiro'
        }
      }
    },
    {
      path: '/404',
      component: NotFound,
      name: '404',
      meta: {
        title: {
          'ko': '페이지를 찾을 수 없음',
          'en': 'Page Not Found',
          'zh': '頁面未找到',
          'fr': 'Page Non Trouvée'
        }
      }
    },
    {
      path: '/developers',
      component: NotFound,
      name: 'developers',
      meta: {
        title: {
          'ko': '개발자 정보',
          'en': 'Developer Information',
          'zh': '開發者信息',
          'fr': 'Informations Développeur'
        }
      }
    },
    {
      path: '/university',
      component: EodiroApp,
      children: [
        {
          path: '',
          component: University,
          name: 'university',
          meta: {
            title: {
              'ko': '대학교 선택',
              'en': 'Select University',
              'zh': '大學選擇',
              'fr': 'Sélection Universitaire'
            }
          }
        }
      ]
    },
    {
      path: '/:universityVendor',
      component: EodiroApp,
      children: [
        {
          path: '',
          component: SelectBuilding,
          name: 'building',
          meta: {
            title: {
              'ko': '건물 선택',
              'en': 'Select a Building',
              'zh': '選擇建築',
              'fr': 'Sélectionnez Un Bâtiment'
            }
          }
        },
        {
          path: ':buildingID',
          component: SelectFloor,
          name: 'floor',
          meta: {
            title: {
              'ko': '층 선택', 
              'en': 'Select a Floor',
              'zh': '地板選擇',
              'fr': 'Sélection DU Sol'
            }
          }
        },
        {
          path: ':buildingID/:floorID',
          component: Result,
          name: 'result',
          meta: {
            title: {
              'ko': '강의실 현황',
              'en': 'Classroom Status',
              'zh': '課堂狀況',
              'fr': 'Statut DE La Classe'
            }
          }
        }
      ]
    },
    {
      path: '*',
      component: NotFound
    }
  ]
})