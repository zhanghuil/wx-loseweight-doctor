/**
 * api 接口
 */

import { webApi } from '../common/env'

const userApi = {
	JZDoctorPhoneLogin: webApi + '/api/System/Auth/JZDoctorPhoneLogin', //验证码登录
	GetCodeNew: webApi + '/api/System/Login/GetCodeNew', //获取验证码 
	JZDoctorPhonePasswordLogin: webApi + '/api/System/Auth/JZDoctorPhonePasswordLogin', //验证码登录 
	SubmitPwd: webApi + '/api/System/Doctor/SubmitPwd', //忘记密码
	ModifyPwd: webApi + '/api/System/Doctor/ModifyPwd', //修改密码
	GetJZMZPatients: webApi + '/api/System/JZMZPatient/GetJZMZPatients',  //获取减重病人
	GetJZMZPatient: webApi + '/api/System/JZMZPatient/GetJZMZPatient',  //获取减重病人详情信息
	GetWeightRecordByType: webApi + '/api/System/WeightRecord/GetWeightRecordByType', //获取患者体重记录  
	GetRecordedRegistrations: webApi + '/api/System/MedicalRecord/GetRecordedRegistrations', //获取病人完成的评估表 
	GetWeightLossPlans: webApi + '/api/System/MedicalRecord/GetWeightLossPlans', //获取病人减重方案列表
	GetPatientWeightLossPlan: webApi + '/api/System/MedicalRecord/GetPatientWeightLossPlan', //获取减重方案
	GetPatientMedical: webApi + '/api/System/Patient/GetPatientMedical',  //获取病人医生信息
	GetDoctorInfoNew: webApi + '/api/System/Doctor/GetDoctorInfoNew',  //医生信息 
	EditEmail: webApi + '/api/System/Doctor/EditEmail',  //修改邮箱地址











}
export default {
	userApi
}