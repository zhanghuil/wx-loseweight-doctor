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
	if (config.method === 'post') {
		config.data = qs.stringify(config.data);
	}
	return config;
}, (error) => {
	console.log('错误的传参')
	return Promise.reject(error);
});

//返回状态判断(添加响应拦截器)
axios.interceptors.response.use((res) => {
	//对响应数据做些事
	if (!res.data.success) {
		return Promise.resolve(res);
	}
	return res;
}, (error) => {
	console.log('网络异常')
	return Promise.reject(error);
});

//返回一个Promise(发送post请求)
var tokenValue = storage.getItem('Token') || ''
var timestamp = Date.parse(new Date())
timestamp = (timestamp / 1000).toString()


export function fetchPost(url, params, authCode) {
	const toast = v.$createToast({
		txt: 'Loading...',
		mask: true
	})
	toast.show()
	return new Promise((resolve, reject) => {
		axios.post(url, params, {
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
	toast.show()
	return new Promise((resolve, reject) => {
		axios.get(url, { params: param }, {
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
export function fetchDelete(url, param) {
	return new Promise((resolve, reject) => {
		axios.delete(url, { params: param })
			.then(response => {
				resolve(response)
			}, err => {
				reject(err)
			})
			.catch((error) => {
				reject(error)
			})
	})
}
export default {
	fetchPost,
	fetchGet
}
