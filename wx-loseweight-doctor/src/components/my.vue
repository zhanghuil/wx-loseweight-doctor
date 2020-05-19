<template>
    <div class="contenter">
        <!-- <cube-button @click="showToast">show toast</cube-button> -->
        <div class="myTop">
            <div class="myTopCon">
                <img src="../assets/tx1.png" class="img" alt="" />
                <div class="con">
                    <p class="name">{{doctorInfo.Name}}<i class="icon cubeic-arrow"></i></p>
                    <p class="hos">{{doctorInfo.HosName}}</p>
                </div>
                <div class="qCodeimg">
                    <i class="icon iconfont icon-qrcode"></i>
                </div>
            </div>
        </div>
        <div class="myList">
            <ul>
                <router-link to="/myInfo">
                    <li>
                        <div class="L">
                            <div>
                                <img
                                    class="cell_icon"
                                    src="../assets/personal_1@2x.png"
                                    alt=""
                                />
                            </div>
                            <div>我的信息</div>
                        </div>
                        <div><i class="icon cubeic-arrow"></i></div>
                    </li>
                </router-link>
                <router-link to="/doctorCard">
                    <li>
                        <div class="L">
                            <div>
                                <img
                                    class="cell_icon"
                                    src="../assets/personal_2@2x.png"
                                    alt=""
                                />
                            </div>
                            <div>我的名片</div>
                        </div>
                        <div><i class="icon cubeic-arrow"></i></div>
                    </li>
                </router-link>
                <router-link to="/groupMag">
                    <li>
                        <div class="L">
                            <div>
                                <img
                                    class="cell_icon"
                                    src="../assets/personal_4@2x.png"
                                    alt=""
                                />
                            </div>
                            <div>患者组管理</div>
                        </div>
                        <div><i class="icon cubeic-arrow"></i></div>
                    </li>
                </router-link>
                <li>
                    <div class="L">
                        <div>
                            <img
                                class="cell_icon"
                                src="../assets/personal_5@2x.png"
                                alt=""
                            />
                        </div>
                        <div>减重方案模板管理</div>
                    </div>
                    <div><i class="icon cubeic-arrow"></i></div>
                </li>
            </ul>
        </div>
        <div class="exitBox">退出</div>
        <div class="footer">
            <ul class="footerWrap">
                <router-link to="/">
                    <li>
                        <div>
                            <img
                                class="img"
                                src="../assets/icon1-1@2x.png"
                                alt=""
                            />
                        </div>
                        <div>患者</div>
                    </li>
                </router-link>
                <li class="on">
                    <div>
                        <img
                            class="img"
                            src="../assets/icon3-2@2x.png"
                            alt=""
                        />
                    </div>
                    <div>我的</div>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
import { yktoast } from '../common/js/util'
import storage from '../common/js/storage'
export default {
    name: 'my',
    components: {},
    data() {
        return {
            doctorInfo: {}
        }
    },
    created() {
        this.getDoctorInfoNew()
    },
    methods: {
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
                    console.log(result.data)
                    _this.doctorInfo = result.data
                } else {
                    yktoast(result)
                }
            })
        },
        showToast() {
            this.$createToast({
                txt: '我是弹窗',
                type: 'txt'
            }).show()
        }
    }
}
</script>

<style lang="less" scoped>
// .contenter {
//     height: 100%;
//     position: fixed;
//     width: 100%;
//     background: #f7f7f7;
// }
.myTop {
    position: relative;
    height: 170px;
    background: url(../assets/bg2@2x.png) top center no-repeat;
    background-size: 100% 100%;
    .myTopCon {
        padding: 30px 15px;
        display: flex;
        align-items: center;
        .img {
            width: 68px;
            height: 68px;
            border-radius: 50%;
            border: 3px solid #ffffff;
        }
        .con {
            margin-left: 15px;
            color: #ffffff;
            .name {
                display: flex;
                align-items: center;
                font-size: 18px;
                color: #ffffff;
                .icon {
                    font-size: 12px;
                    margin-left: 9px;
                }
            }
            .hos {
                padding-top: 14px;
                opacity: 0.8;
                font-size: 14px;
            }
        }
        .qCodeimg {
            position: absolute;
            top: 15px;
            right: 15px;
            .icon {
                color: #ffffff;
                font-size: 24px;
            }
        }
    }
}
.myList {
    background: #ffffff;
    box-shadow: 0 4px 10px 0 rgba(96, 73, 245, 0.06);
    border-radius: 2px;
    position: relative;
    top: -36px;
    margin: 0 15px;
    ul {
        padding: 0 15px;
        li {
            display: flex;
            justify-content: space-between;
            position: relative;
            align-items: center;
            font-size: 16px;
            color: #5a5a5a;
            padding: 16px 0;
            border-bottom: 1px solid #f2f2f2;
            .L {
                display: flex;
                position: relative;
                align-items: center;
                .cell_icon {
                    width: 24px;
                    height: 24px;
                    margin: 0 9px 0 4px;
                }
            }
        }
    }
}
.exitBox {
    background: #ffffff;
    box-shadow: 0 4px 10px 0 rgba(96, 73, 245, 0.06);
    border-radius: 2px;
    margin: -21px 15px 0;
    font-size: 16px;
    color: #ff6c42;
    text-align: center;
    padding: 20px 0;
}
.footer {
    width: 100%;
    background: #ffffff;
    position: fixed;
    left: 0;
    bottom: 0;
    border-top: 1px solid #e7e7f1;
    .footerWrap {
        display: flex;
        justify-content: space-between;
        color: #4a4a4a;
        font-size: 11px;
        padding: 5px 90px 4px;
    }
    .footerWrap .on {
        color: #6049f5;
    }
    .footerWrap .img {
        width: 24px;
        height: 24px;
        margin-bottom: 4px;
    }
}
</style>
