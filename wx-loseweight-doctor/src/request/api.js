/**
 * api 接口
 */

import { webApi } from './env'

const userApi = {
	JZDoctorPhoneLogin: webApi + '/api/System/Auth/JZDoctorPhoneLogin', //验证码登录
	GetCodeNew: webApi + '/api/System/Login/GetCodeNew', //获取验证码 
	JZDoctorPhonePasswordLogin: webApi + '/api/System/Auth/JZDoctorPhonePasswordLogin', //验证码登录 
	DoctorResetPassword: webApi + '/api/System/Auth/DoctorResetPassword', //忘记密码
	ModifyPwd: webApi + '/api/System/Doctor/ModifyPwd', //修改密码
	GetJZMZPatients: webApi + '/api/System/JZMZPatient/GetJZMZPatients',  //获取减重病人
	ShieldPatient: webApi + '/api/System/JZMZPatient/ShieldPatient',  //屏蔽患者
	GetJZMZPatient: webApi + '/api/System/JZMZPatient/GetJZMZPatient',  //获取减重病人详情信息
	GetWeightRecordByType: webApi + '/api/System/WeightRecord/GetWeightRecordByType', //获取患者体重记录  
	GetRecordedRegistrations: webApi + '/api/System/MedicalRecord/GetRecordedRegistrations', //获取病人完成的评估表 
	GetWeightLossPlans: webApi + '/api/System/MedicalRecord/GetWeightLossPlans', //获取病人减重方案列表
	GetPatientWeightLossPlan: webApi + '/api/System/MedicalRecord/GetPatientWeightLossPlan', //获取减重方案
	CopyWeightLossPlan: webApi + '/api/System/MedicalRecord/CopyWeightLossPlan', //复制减重方案
	GetPatientEmptyWeightLossPlan: webApi + '/api/System/MedicalRecord/GetPatientEmptyWeightLossPlan',  //获取空白减重方案--制定方案
	SavePatientWeightLossPlan: webApi + '/api/System/MedicalRecord/SavePatientWeightLossPlan',  //保存减重方案
	RecallPatientWeightLossPlan: webApi + '/api/System/MedicalRecord/RecallPatientWeightLossPlan',  //撤回减重方案 
	GetWeightLossSchedule: webApi + '/api/System/MedicalRecord/GetWeightLossSchedule',  //获取患者减重计划
	SetReVisitingDate: webApi + '/api/System/MedicalRecord/SetReVisitingDate',  //设置下次复诊时间
	SetFollowUpVisitDate: webApi + '/api/System/MedicalRecord/SetFollowUpVisitDate',  //设置随访周期
	SetJZServerState: webApi + '/api/System/JZMZPatient/SetJZServerState',   //设置减重服务状态
	
	GetPatientMedical: webApi + '/api/System/Patient/GetPatientMedical',  //获取病人医生信息
	GetJZMZDoctorQRCode: webApi + '/api/System/Doctor/GetJZMZDoctorQRCode', //获取减重门诊公众号医生二维码
	GetDoctorInfoNew: webApi + '/api/System/Doctor/GetDoctorInfoNew',  //医生信息 
	GetSubDoctor: webApi + '/api/System/Doctor/GetSubDoctor',  //获取下级医生
	EditEmail: webApi + '/api/System/Doctor/EditEmail',  //修改邮箱地址
	GetPatientGroups: webApi + '/api/System/PatientGroup/GetPatientGroups',  //查询医生下的患者组
	GetPatientGroup: webApi + '/api/System/PatientGroup/GetPatientGroup',  //获取患者组信息
	AddPatientGroup: webApi + '/api/System/PatientGroup/AddPatientGroup', //添加患者组 
	EditPatientGroup: webApi + '/api/System/PatientGroup/EditPatientGroup', //编辑患者组
	DeletePatientGroup: webApi + '/api/System/PatientGroup/DeletePatientGroup',  //删除患者组 
	SetJZMZPatientGroup: webApi + '/api/System/JZMZPatient/SetJZMZPatientGroup',  //设置患者的分组

	GetPatientFollowUpVisit: webApi + '/api/System/MedicalRecord/GetPatientFollowUpVisit',  //获取患者随访信息
	GetPatientDiagnose: webApi + '/api/System/MedicalRecord/GetPatientDiagnose',  //获取患者首诊信息
	UpdateInfoByDoctor: webApi + '/api/System/JZMZPatient/UpdateInfoByDoctor',  //修改患者信息（姓名）

	GetPatientWeightLossPlanTypes: webApi + '/api/System/WeightLossPlanTemplate/GetPatientWeightLossPlanTypes', //获取减重方案模板分类列表
	GetPatientWeightLossPlanTemplates: webApi + '/api/System/WeightLossPlanTemplate/GetPatientWeightLossPlanTemplates',  //获取减重方案模板列表 
	GetPatientWeightLossPlanTemplate: webApi + '/api/System/WeightLossPlanTemplate/GetPatientWeightLossPlanTemplate',  //获取减重方案模板详情
	GetPatientEmptyWeightLossPlanTemplate: webApi + '/api/System/WeightLossPlanTemplate/GetPatientEmptyWeightLossPlanTemplate',  //获取空白减重方案模板
	SaveWeightLossPlanTemplate: webApi + '/api/System/WeightLossPlanTemplate/SaveWeightLossPlanTemplate',  //保存减重方案模板
	DeleteTemplate: webApi + '/api/System/WeightLossPlanTemplate/DeleteTemplate',  //删除减重方案模板

	GetEmptyDoctorAssess: webApi + '/api/System/MedicalRecord/GetEmptyDoctorAssess',  //获取空白评估表
	GetDoctorAssess: webApi + '/api/System/MedicalRecord/GetDoctorAssess',  //获取评估表
	SaveDoctorAssess: webApi + '/api/System/MedicalRecord/SaveDoctorAssess',  //保存评估表
	DeleteDoctorAssess: webApi + '/api/System/MedicalRecord/DeleteDoctorAssess',  //删除评估表
	UploadDoctorAssessImg: webApi + '/api/System/File/UploadDoctorAssessImg', //上传文件

}
export default {
	userApi
}