import Vue from 'vue'

import VueRouter from 'vue-router'
Vue.use(VueRouter)

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);

import mavonEditor from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'
Vue.use(mavonEditor)

import axios from 'axios'
import VueAxios from 'vue-axios'
Vue.use(VueAxios,axios);

import app from './App.vue'
import router from './router.js'
var vn = new Vue({
    el: '#app',
    data: {
        
    },
    methods: {

    },
    render: c => c(app),
    router
})