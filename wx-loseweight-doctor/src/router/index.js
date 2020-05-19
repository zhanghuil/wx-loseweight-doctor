import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
	routes: [
		{
			path: '/',
			name: 'index',
			component: resolve => require(['@/components/index'], resolve),
			meta: {
				title: '患者',
				requiresAuth: true  // 添加表示需要验证
			}
		},
		{
			path: '/search',
			name: 'search',
			component: resolve => require(['@/components/search'], resolve),
			meta: {
				title: '患者'
			}
		},
		{
			path: '/patientList',
			name: 'patientList',
			component: resolve => require(['@/components/patientList'], resolve),
			meta: {
				title: '患者'
			}
		},
		{
			path: '/patientGroup',
			name: 'patientGroup',
			component: resolve => require(['@/components/patientGroup'], resolve),
			meta: {
				title: '患者组'
			}
		},
		{
			path: '/lookInfo',
			name: 'lookInfo',
			component: resolve => require(['@/components/lookInfo'], resolve),
		},
		{
			path: '/lookPlan',
			name: 'lookPlan',
			component: resolve => require(['@/components/lookPlan'], resolve),
			meta: {
				title: '减重方案'
			}
		},
		{
			path: '/doctorCard',
			name: 'doctorCard',
			component: resolve => require(['@/components/doctorCard'], resolve),
			meta: {
				title: '医师名片'
			}
		},
		{
			path: '/login',
			name: 'login',
			component: resolve => require(['@/components/login'], resolve),
			meta: {
				title: '医学减重医生平台'
			}
		},
		{
			path: '/forgetPwd',
			name: 'forgetPwd',
			component: resolve => require(['@/components/forgetPwd'], resolve),
			meta: {
				title: '忘记密码'
			}
		},
		{
			path: '/editPwd',
			name: 'editPwd',
			component: resolve => require(['@/components/editPwd'], resolve),
			meta: {
				title: '修改密码'
			}
		},
		{
			path: '/my',
			name: 'my',
			component: resolve => require(['@/components/my'], resolve),
			meta: {
				title: '我的'
			}
		},
		{
			path: '/myInfo',
			name: 'myInfo',
			component: resolve => require(['@/components/myInfo'], resolve),
			meta: {
				title: '我的信息'
			}
		},
		{
			path: '/mailBox',
			name: 'mailBox',
			component: resolve => require(['@/components/mailBox'], resolve),
			meta: {
				title: '我的信息'
			}
		},
		{
			path: '/groupMag',
			name: 'groupMag',
			component: resolve => require(['@/components/groupMag'], resolve),
			meta: {
				title: '患者组管理'
			}
		},
		{
			path: '/editGroup',
			name: 'editGroup',
			component: resolve => require(['@/components/editGroup'], resolve)
		},
		{
			path: '/draftPlan',
			name: 'draftPlan',
			component: resolve => require(['@/components/draftPlan'], resolve),
			meta: {
				title: '制定减重方案'
			}
		},
		{
			path: '/InsertTemplate',
			name: 'InsertTemplate',
			component: resolve => require(['@/components/InsertTemplate'], resolve),
			meta: {
				title: '插入模板'
			}
		},
	]
})
