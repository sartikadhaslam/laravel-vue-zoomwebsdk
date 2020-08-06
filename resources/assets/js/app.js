
/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */

require('./bootstrap');


window.Vue = require('vue');

import VueRouter from 'vue-router';
Vue.use(VueRouter);

import VueAxios from 'vue-axios';
import axios from 'axios';

import App from './App.vue';
Vue.use(VueAxios, axios);

import Join from './components/Join';
import Meeting from './components/Meeting';


const routes = [
  {
    path: '/',
    name: 'join',
    component: Join
  },
  {
    path: '/meeting',
    name: 'meeting',
    component: Meeting
  }
];

const router = new VueRouter({
  mode: 'history',
  routes: routes
});

const app = new Vue(Vue.util.extend({ router }, App)).$mount('#app');
