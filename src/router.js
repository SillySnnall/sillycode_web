import VueRouter from 'vue-router'
import Bolg from './page/Bolg.vue'
import BolgDetail from './page/BolgDetail.vue'
import WriteBolg from './page/WriteBolg.vue'

const router = new VueRouter({
    mode: 'history',
    routes: [
        { path: '/bolg', name: 'bolg', component: Bolg },
        { path: '/bolgdetail', name: 'bolgdetail', component: BolgDetail },
        { path: '/writebolg', name: 'writebolg', component: WriteBolg },
    ]
})

export default router