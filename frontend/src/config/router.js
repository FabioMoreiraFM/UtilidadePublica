import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

import Content from '@/components/home/Content'
import CNPJSearch from '@/components/home/CNPJSearch'
import NetPayCalculator from '@/components/home/NetPayCalculator'
import Charts from '@/components/home/Charts'
import MissingPage from '@/template/MissingPage'
import Login from '@/template/Login'

const routes = [{
    name: 'home',
    path: '/',
    component: Content
},
{
    name: 'cnpjSearch',
    path: '/cnpjSearch',
    component: CNPJSearch
},
{
    name: 'netPayCalculator',
    path: '/netPayCalculator',
    component: NetPayCalculator
},
{
    name: 'charts',
    path: '/charts',
    component: Charts
},
{
    name: 'missingPage',
    path: '/missingPage',
    component: MissingPage
},
{
    name: 'signup',
    path: '/signup',
    component: Login
}]

export default new VueRouter( {
    mode: 'history',
    routes: routes
})