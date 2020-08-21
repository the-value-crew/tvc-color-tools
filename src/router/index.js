import Vue from 'vue'
import VueRouter from 'vue-router'
import ColorPicker from '../views/ColorPicker.vue'
import ColorPalette from '../views/ColorPalette.vue'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'ColorPicker',
    component: ColorPicker
  },
  {
    path: '/palette',
    name: 'ColorPalette',
    component: ColorPalette
  }
]

const router = new VueRouter({
  routes
})

export default router
