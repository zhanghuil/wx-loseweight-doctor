/**
 * 配置编译环境和线上环境之间的切换
 * 
 * webApi: 域名地址
 */

let webApi = '';

if (process.env.NODE_ENV == 'development' || process.env.NODE_ENV == 'production') {
	webApi = window.apiObj.webApi
}

export {
	webApi
}