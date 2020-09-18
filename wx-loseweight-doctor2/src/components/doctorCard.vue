<template>
    <div class="doctorBox">
        <div class="cardImg">
            <img
                v-if="doctorInfo.HeadImg"
                class="img"
                :src="doctorInfo.HeadImg"
                @error="imgError()"
            />
            <!-- 0-男 1-女 -->
            <template v-if="!doctorInfo.HeadImg">
                <template v-if="doctorInfo.Sex == 0">
                    <img src="../assets/man@2x.png" class="img" />
                </template>
                <template v-else>
                    <img src="../assets/woman.png" class="img" />
                </template>
            </template>
        </div>
        <div class="c-7a pl10 f14 pb10">
            <span class="f22 c-3a mr10">{{ doctorInfo.Name }}</span
            >医生
        </div>
        <div class="f14 c-7a pl10">
            {{ doctorInfo.HosName }} {{ doctorInfo.DeptName }}
        </div>
        <div class="qrcode">
            <img :src="QRcode" />
        </div>
    </div>
</template>

<script>
import { webApi } from '../request/env'
import { yktoast } from '../common/js/util'
import storage from '../common/js/storage'
export default {
    name: 'doctorCard',
    data() {
        return {
            errorImg0: require('@/assets/man@2x.png'),
            errorImg1: require('@/assets/woman.png'),
            doctorInfo: {},
            QRcode: ''
        }
    },
    created() {
        this.getDoctorInfoNew()
        this.getJZMZDoctorQRCode()
    },
    methods: {
        imgError() {
            let img = event.srcElement
            if (this.doctorInfo.Sex == 0) img.src = this.errorImg0
            else img.src = this.errorImg1
            img.onerror = null //防止闪图
        },
        //获取医生信息
        getDoctorInfoNew() {
            let AccountId = storage.getItem('AccountId')
            var _this = this
            let url = this.api.userApi.GetDoctorInfoNew
            let data = {
                AccountId: AccountId
            }
            this.$fetchPost(url, data, 150).then(response => {
                let result = response.data.data //请求返回数据
                if (result.status == 0) {
                    // console.log(result.data)
                    _this.doctorInfo = result.data
                } else {
                    yktoast(result)
                }
            })
        },
        //获取二维码
        getJZMZDoctorQRCode() {
            let AccountId = storage.getItem('AccountId')
            var _this = this
            let url = this.api.userApi.GetJZMZDoctorQRCode
            let data = {
                doctorId: AccountId
            }
            this.$fetchGet(url, data, 188).then(response => {
                let result = response.data.data //请求返回数据
                if (!result) {
                    yktoast(result)
                }

                this.QRcode = webApi + result
            })
        }
    }
}
</script>

<style scoped lang="less">
.doctorBox {
    background: #ffffff;
    box-shadow: 0 2px 10px 0 rgba(120, 121, 164, 0.1);
    border-radius: 4px;
    margin: 30px;
    padding: 10px;
    overflow: hidden;
}

.cardImg,
.cardImg .img {
    width: 295px;
    height: 295px;
    margin-bottom: 20px;
}
.qrcode {
    width: 80px;
    height: 80px;
    background: #ececec;
    border-radius: 2px;
    margin: 30px 0 0;
    float: right;
    img {
        width: 80px;
        height: 80px;
    }
}
</style>