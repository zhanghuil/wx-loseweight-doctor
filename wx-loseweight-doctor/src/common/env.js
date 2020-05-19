/**
 * 配置编译环境和线上环境之间的切换
 * 
 * webApi: 域名地址
 */

let webApi = '';

// 公司测试地址
if (process.env.NODE_ENV == 'development') {   //这是生产环境
    webApi = 'https://soa.wincome.group/aplan.loseweight' 
}
if (process.env.NODE_ENV == 'production') {  //本地测试环境
    webApi = 'https://soa.wincome.group/aplan.loseweight'
}

/*// 医院正式地址
// 大连微信病人餐版本
// 域名：yk.dt.xxtmeal.cn
// 开发者ID (AppID)：wx6c249e4c2ed56cdc
if (process.env.NODE_ENV == 'development' || process.env.NODE_ENV == 'production') {
    homePage = `http://yk.dt.xxtmeal.cn/`
    wechatAppId = 'wx6c249e4c2ed56cdc'
    webApi = homePage + 'patientOrdering.api' //微信相关
    SApi = homePage + 'WeChatAPI' //外网
    PApi = homePage + 'PatientNew'
}
*/

export {
	webApi
}