import VueRouter from 'vue-router'

import main from './components/main.vue'
import index from './components/main/index.vue'
import article from './components/main/article.vue'
import error from './components/main/error.vue'
import archive from './components/main/archive.vue'
import about from './components/main/about.vue'

var router = new VueRouter({
    routes: [
        { path: '/', redirect: '/main' },
        {
            path: '/main',
            component: main,
            children: [
                { path: '/', redirect: 'index' },
                { path: 'index', component: index },
                { path: 'article/:id', component: article },
                { path: 'article', component: article, name: 'haha' },
                { path: 'error', component: error },
                { path: 'archive', component: archive },
                { path: 'about', component: about}
            ]
        }
    ]
})

export default router