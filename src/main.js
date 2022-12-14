import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'amfe-flexible'
import {
  NavBar, Form, Field, Button, Tabbar,
  TabbarItem, Icon, Tab, Tabs,
  Cell, List, PullRefresh, ActionSheet, Popup,
  Row, Col, Badge, Search, Divider,
  CellGroup, Tag, Image as VanImage, Dialog,
  DatetimePicker
} from 'vant'

Vue.use(NavBar)
Vue.use(Form)
Vue.use(Field)
Vue.use(Button)
Vue.use(Tabbar)
Vue.use(TabbarItem)
Vue.use(Icon)
Vue.use(Tab)
Vue.use(Tabs)
Vue.use(Cell)
Vue.use(List)
Vue.use(PullRefresh)
Vue.use(ActionSheet)
Vue.use(Popup)
Vue.use(Badge)
Vue.use(Row)
Vue.use(Col)
Vue.use(Search)
Vue.use(Divider)
Vue.use(CellGroup)
Vue.use(Tag)
Vue.use(VanImage)
Vue.use(Dialog)
Vue.use(DatetimePicker)
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
