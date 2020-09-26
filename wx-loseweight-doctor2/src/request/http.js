import axios from 'axios'
import qs from 'qs'
import storage from '../common/js/storage'
import { encryption } from '../common/js/util'
import Vue from 'vue';  //1.引入vue
let v = new Vue();  //2.新创建一个vue实例

// 通过axios.defaults.timeout设置默认的请求超时时间。例如超过了10s，就会告知用户当前请求超时，请刷新等。
axios.defaults.timeout = 30000;
// let currentDate = formatDate(new Date(), 'yyyy-MM-dd hh:mm:ss');

//POST传参序列化(添加请求拦截器)
axios.interceptors.request.use((config) => {
	//在发送请求之前做某件事
	// if (config.method === 'post') {
	// 	config.data = qs.stringify(config.data);
	// }
	return config;
}, (error) => {
	console.log('错误的传参')
	return Promise.reject(error);
});

//返回状态判断(添加响应拦截器)
// axios.interceptors.response.use((res) => {
// 	//对响应数据做些事
// 	if (!res.data.success) {
// 		return Promise.resolve(res);
// 	}
// 	return res;
// }, (error) => {
// 	console.log('网络异常')
// 	return Promise.reject(error);
// });

axios.interceptors.response.use(
	response => {
		console.log(response.data.code)
		if (response.data.code === 4003) {
			Toast({
				mes: '您没有权限操作！',
				timeout: 1500,
				callback: () => {
					router.go(-1);
				}
			});

			return false;
		}
		if (response.data.code === -1) {
			localStorage.removeItem('Token')
			router.push({
				path: "/login",
				querry: { redirect: router.currentRoute.fullPath }//从哪个页面跳转
			})
		}
		return response
	},
	err => {
		if (err.code === 'ECONNABORTED' && err.message.indexOf('timeout') !== -1) {
			Toast({
				mes: '网络异常，连接超时...',
				timeout: 1500
			});
		}
		return Promise.reject(err)
	}
)

//返回一个Promise(发送post请求)
var timestamp = Date.parse(new Date())
timestamp = (timestamp / 1000).toString()


export function fetchPost(url, params, authCode) {
	const toast = v.$createToast({
		txt: 'Loading...',
		mask: true
	})
	const tokenValue = storage.getItem('Token') || ''
	toast.show()
	return new Promise((resolve, reject) => {
		axios.post(url, qs.stringify(params), {
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded',
				token: tokenValue,
				wincomeflag: encryption(authCode, timestamp),
				wincometimestamp: timestamp
			}
		})
			.then(response => {
				resolve(response);
				toast.hide()
			}, err => {
				reject(err);
				toast.hide()
			})
			.catch((error) => {
				reject(error)
				toast.hide()
			})
	})
}
//返回一个Promise(发送put请求)
export function fetchPut(url, params, authCode) {
	const toast = v.$createToast({
		txt: 'Loading...',
		mask: true
	})
	const tokenValue = storage.getItem('Token') || ''
	toast.show()
	return new Promise((resolve, reject) => {
		axios.put(url, params, {
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded',
				token: tokenValue,
				wincomeflag: encryption(authCode, timestamp),
				wincometimestamp: timestamp
			}
		})
			.then(response => {
				resolve(response);
				toast.hide()
			}, err => {
				reject(err);
				toast.hide()
			})
			.catch((error) => {
				reject(error)
				toast.hide()
			})
	})
}
//返回一个Promise(发送get请求)
export function fetchGet(url, param, authCode) {
	const toast = v.$createToast({
		txt: 'Loading...',
		mask: true
	})
	const tokenValue = storage.getItem('Token') || ''
	toast.show()
	return new Promise((resolve, reject) => {
		axios.get(url, {
			params: param,
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded',
				token: tokenValue,
				wincomeflag: encryption(authCode, timestamp),
				wincometimestamp: timestamp
			}
		})
			.then(response => {
				resolve(response)
				toast.hide()
			}, err => {
				reject(err)
				toast.hide()
			})
			.catch((error) => {
				reject(error)
				toast.hide()
			})
	})
}
//返回一个Promise(发送delete请求)
export function fetchDelete(url, param, authCode) {
	const toast = v.$createToast({
		txt: 'Loading...',
		mask: true
	})
	const tokenValue = storage.getItem('Token') || ''
	toast.show()
	return new Promise((resolve, reject) => {
		axios.delete(url, {
			params: param,
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded',
				token: tokenValue,
				wincomeflag: encryption(authCode, timestamp),
				wincometimestamp: timestamp
			}
		})
			.then(response => {
				resolve(response)
				toast.hide()
			}, err => {
				reject(err)
				toast.hide()
			})
			.catch((error) => {
				reject(error)
				toast.hide()
			})
	})
}
//(发送post请求  ，文件上传)
export function fetchPostFile(url, params, authCode) {
	const toast = v.$createToast({
		txt: 'Loading...',
		mask: true
	})
	const tokenValue = storage.getItem('Token') || ''
	toast.show()
	return new Promise((resolve, reject) => {
		axios.post(url, params, {
			headers: {
				'Content-Type': 'multipart/form-data',
				token: tokenValue,
				wincomeflag: encryption(authCode, timestamp),
				wincometimestamp: timestamp
			}
		})
			.then(response => {
				resolve(response);
				toast.hide()
			}, err => {
				reject(err);
				toast.hide()
			})
			.catch((error) => {
				reject(error)
				toast.hide()
			})
	})
}
export default {
	fetchPost,
	fetchPut,
	fetchGet,
	fetchDelete,
	fetchPostFile
}
