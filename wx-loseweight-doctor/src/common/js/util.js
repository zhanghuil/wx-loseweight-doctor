import md5 from 'js-md5';
import storage from './storage'
import Cube from 'cube-ui'

import Vue from 'vue';  //1.引入vue
let v = new Vue();  //2.新创建一个vue实例

export function convertKey(arr, key) {
	let newArr = [];
	arr.forEach((item, index) => {
		let newObj = {};
		for (var i = 0; i < key.length; i++) {
			newObj[key[i]] = item[Object.keys(item)[i]]
		}
		newArr.push(newObj);
	})
	// console.log(newArr)
	return newArr;
}

/**
 * 提示框toast
 * @param {*} number 
 * @param {*} currentDate 
 */
export function yktoast(txt) {
	//3.在新的实例上使用组件
	v.$createToast({
		time: 1000,
		txt: txt,
		type: 'txt'
	}).show()
}

/**
 * API接口参数加密
 * @example authCode内容为：接口编号+当前日期
 * @return 64196cb63ebf712f750ede4c0584222d
 */
export function encryption(number, currentDate) {
	let authCode = ''
	var str = [currentDate, number].map(authCodeStr).join('+');
	authCode = md5(str)
	// console.log(str)
	return authCode
}

function authCodeStr(n) {
	n = n.toString()
	return n
}
/**
 * 获取当前日期
 * @param {*} date 
 * @param {*} fmt 
 */
export function formatDate(date, fmt) {
	if (/(y+)/.test(fmt)) {
		fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
	}
	let o = {
		'M+': date.getMonth() + 1,
		'd+': date.getDate(),
		'h+': date.getHours(),
		'm+': date.getMinutes(),
		's+': date.getSeconds()
	};
	for (let k in o) {
		if (new RegExp(`(${k})`).test(fmt)) {
			let str = o[k] + '';
			fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : padLeftZero(str));
		}
	}
	return fmt;
};
