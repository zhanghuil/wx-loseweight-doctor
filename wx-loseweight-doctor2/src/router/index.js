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
				keepAlive: true,
				isBack: false, //用于判断上一个页面是哪个
				title: '患者',
				requiresAuth: true  // 添加表示需要验证
			}
		},
		{
			path: '/patientList',
			name: 'patientList',
			component: resolve => require(['@/components/patientList'], resolve),
			meta: {
				title: '患者',
				requiresAuth: true  // 添加表示需要验证
			}
		},
		{
			path: '/searchList',
			name: 'searchList',
			component: resolve => require(['@/components/searchList'], resolve)
		},
		{
			path: '/patientGroup',
			name: 'patientGroup',
			component: resolve => require(['@/components/patientGroup'], resolve),
			meta: {
				title: '患者组',
				requiresAuth: true  // 添加表示需要验证
			}
		},
		{
			path: '/lookInfo',
			name: 'lookInfo',
			component: resolve => require(['@/components/lookInfo'], resolve),
			meta: {
				requiresAuth: true  // 添加表示需要验证
			}
		},
		{
			path: '/lookPlan',
			name: 'lookPlan',
			component: resolve => require(['@/components/lookPlan'], resolve),
			meta: {
				title: '减重方案',
				requiresAuth: true  // 添加表示需要验证
			}
		},
		{
			path: '/doctorCard',
			name: 'doctorCard',
			component: resolve => require(['@/components/doctorCard'], resolve),
			meta: {
				title: '医师名片',
				requiresAuth: true  // 添加表示需要验证
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
				title: '我的',
				requiresAuth: true  // 添加表示需要验证
			}
		},
		{
			path: '/demo',
			name: 'demo',
			component: resolve => require(['@/components/demo'], resolve),
			meta: {
				title: '示例',
				requiresAuth: true  // 添加表示需要验证
			}
		},
		{
			path: '/myInfo',
			name: 'myInfo',
			component: resolve => require(['@/components/myInfo'], resolve),
			meta: {
				title: '我的信息',
				requiresAuth: true  // 添加表示需要验证
			}
		},
		{
			path: '/mailBox',
			name: 'mailBox',
			component: resolve => require(['@/components/mailBox'], resolve),
			meta: {
				title: '我的信息',
				requiresAuth: true  // 添加表示需要验证
			}
		},
		{
			path: '/groupMag',
			name: 'groupMag',
			component: resolve => require(['@/components/groupMag'], resolve),
			meta: {
				title: '患者组管理',
				requiresAuth: true  // 添加表示需要验证
			}
		},
		{
			path: '/templateMag',
			name: 'templateMag',
			component: resolve => require(['@/components/templateMag'], resolve),
			meta: {
				title: '模板管理',
				requiresAuth: true  // 添加表示需要验证
			}
		},
		{
			path: '/templateList',
			name: 'templateList',
			component: resolve => require(['@/components/templateList'], resolve),
			meta: {
				title: '',
				requiresAuth: true  // 添加表示需要验证
			}
		},
		{
			path: '/editTemplate',
			name: 'editTemplate',
			component: resolve => require(['@/components/editTemplate'], resolve)
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
				title: '制定减重方案',
				requiresAuth: true  // 添加表示需要验证
			}
		},
		{
			path: '/doctorEvalForm',
			name: 'doctorEvalForm',
			component: resolve => require(['@/components/doctorEvalForm'], resolve),
			meta: {
				title: '医生评估表',
				requiresAuth: true  // 添加表示需要验证
			}
		},
		{
			path: '/setTime',
			name: 'setTime',
			component: resolve => require(['@/components/setTime'], resolve),
			meta: {
				title: '复诊',
				requiresAuth: true  // 添加表示需要验证
			}
		},
	]
})
