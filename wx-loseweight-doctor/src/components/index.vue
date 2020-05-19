<template>
    <div>
        <div class="header">
            <div class="wrapperH">
                <i
                    class="icon iconfont icon-shaixuan"
                    @click="display = true"
                ></i>
                <div class="searchBox" @click="searchTap">
                    <i class="icon iconfont icon-sousuo"></i>
                    <span class="c-a f14 ml10">输入患者称呼或手机号搜索</span>
                </div>
                <i
                    class="icon iconfont icon-qrcode"
                    @click="lookDoctorCard"
                ></i>
            </div>
        </div>
        <div class="contenter">
            <div class="menuTab">
                <div class="menuWrap">
                    <div
                        v-for="(item, index) in navList"
                        :key="index"
                        class="navBarItem"
                        :class="activeIndex == index ? 'on' : ''"
                    >
                        <div class="item" @click="tabClick(index, item.id)">
                            {{ item.name }}
                        </div>
                    </div>
                </div>
            </div>
            <div class="listPanel" v-show="activeIndex === 0">
                <div
                    class="item"
                    @click="lookDetails(item.PatientID, item.Name)"
                    v-for="(item, index) in patientsList"
                    :key="index"
                >
                    <div>
                        <img
                            class="txImg"
                            :src="item.AvatarUrl"
                            @error="imgError()"
                        />
                    </div>
                    <div>
                        <p>
                            <strong>{{ item.Name }}</strong>
                            <span
                                >{{ item.Weight }}kg，{{
                                    item.Sex == 1 ? '男' : '女'
                                }}，{{ item.Age }}岁</span
                            >
                        </p>
                        <p class="time">
                            首诊：{{ item.DiagnoseDate | formatDateStr }}
                        </p>
                        <p class="time">
                            计划下次复诊：{{
                                item.ReVisitingDate | formatDateStr
                            }}
                        </p>
                    </div>
                </div>
            </div>
        </div>
        <div class="footer">
            <ul class="footerWrap">
                <li class="on">
                    <div>
                        <img
                            class="img"
                            src="../assets/icon1-2@2x.png"
                            alt=""
                        />
                    </div>
                    <div>患者</div>
                </li>
                <router-link to="/my">
                    <li>
                        <div>
                            <img
                                class="img"
                                src="../assets/icon3-1@2x.png"
                                alt=""
                            />
                        </div>
                        <div>我的</div>
                    </li>
                </router-link>
            </ul>
        </div>
        <!-- 筛选 -->
        <drawer
            :display.sync="display"
            :width="drawerWidth"
            :height="drawerHeight"
        >
            <div class="drawerPanel">
                <div class="f14 c-7a mb15">更新时间</div>
                <ul class="chooseTime">
                    <li v-for="(item, index) in timeList" :key="index">
                        <div
                            @click="tabTimeClick(index)"
                            class="item"
                            :class="timeIndex == index ? 'on' : ''"
                        >
                            {{ item.name }}
                        </div>
                    </li>
                </ul>
                <div class="f14 c-7a mb15 mt30">分组</div>
                <!-- 多选 -->
                <Options
                    :options="checkedList"
                    :isMultiply="true"
                    @toparents="childByValueGroup"
                ></Options>
                <div class="f14 c-7a mb15 mt30">医生</div>
                <!-- 单选 -->
                <Options
                    :options="doctorList"
                    @toparents="childByValueDoc"
                ></Options>
            </div>
        </drawer>
        <!-- 筛选end -->
        <!-- 左滑删除使用 -->
        <!-- <div v-for="(item,index) in leftList" :key="index">
            <leftSlider :index="1" @deleteItem="deleteItem">
                <div style="height: 1.16rem;width: 100%;border:1px solid #ccc;background:#fff">
                    {{ item.text }}
                </div>
            </leftSlider>
        </div> -->
    </div>
</template>

<script>
import leftSlider from '@/components/leftSlider.vue'
import Options from '@/components/options'
import drawer from '@/components/drawer'
import { yktoast } from '../common/js/util'
import storage from '../common/js/storage'
import { formatDate } from '../common/js/date'
export default {
    name: 'index',
    components: { drawer, Options, leftSlider },
    data() {
        return {
            errorImg: require('@/assets/tx1.png'),
            patientsList: [], //患者列表
            accountId: '',
            leftList: [
                {
                    text: '苹果',
                    id: 1
                },
                {
                    text: '香蕉',
                    id: 2
                }
            ],
            radioVal: [],
            checkedVal: [],
            checkedList: [
                {
                    label: '高蛋白组',
                    value: 1,
                    checked: true
                },
                {
                    label: '轻断食组',
                    value: 2,
                    checked: false
                }
            ],
            doctorList: [
                {
                    label: '陈威',
                    id: '1',
                    checked: true
                },
                {
                    label: '林明鑫',
                    id: '2',
                    checked: false
                }
            ],
            timeList: [
                {
                    id: 1,
                    name: '7天'
                },
                {
                    id: 2,
                    name: '15天'
                },
                {
                    id: 3,
                    name: '30天'
                }
            ],
            navList: [
                {
                    id: '1',
                    name: '今日患者'
                },
                {
                    id: '2',
                    name: '明日患者'
                },
                {
                    id: '0',
                    name: '全部患者'
                }
            ],
            queryType: 0, //查询类型 0 全部 1今日患者 2明日患者
            activeIndex: 0,
            display: false, //筛选弹窗
            drawerWidth: '280px',
            drawerHeight: '100%',
            timeIndex: 0
        }
    },
    filters: {
        formatDateStr: function(time) {
            if (time != null && time != '') {
                var date = new Date(time)
                return formatDate(date, 'yyyy-MM-dd')
            } else {
                return ''
            }
        }
    },
    created() {
        let AccountId = storage.getItem('AccountId')
        if (AccountId) this.accountId = AccountId
        console.log(`AccountId：${AccountId}`)

        this.getJZMZPatients() //获取减重病人
    },
    methods: {
        imgError() {
            let img = event.srcElement
            img.src = this.errorImg
            img.onerror = null //防止闪图
        },
        //获取减重病人
        getJZMZPatients() {
            var _this = this
            let url = this.api.userApi.GetJZMZPatients
            let data = {
                PageIndex: 0,
                PageSize: 10,
                Keyword: '', //搜索关键词
                DoctorId: this.accountId,
                UpdateTimeDay: 0, //更新时间天数 7,15,30
                GroupId: '', // 分组
                QueryType: this.queryType //查询类型 0 全部 1今日患者 2明日患者
            }
            this.$fetchPost(url, data, 4111).then(response => {
                let result = response.data.data //请求返回数据
                if (result.Data) {
                    _this.patientsList = result.Data
                }
                // yktoast()
            })
        },

        close() {
            this.isshow = false
        },
        open() {
            this.isshow = true
        },
        //切换tab项
        tabClick(index, id) {
            this.activeIndex = index
            this.queryType = id
        },
        // 更新时间
        tabTimeClick(index) {
            this.timeIndex = index
        },
        lookDetails(id, name) {
            this.$router.push({
                path: '/patientList',
                query: { userId: id, userName: name }
            })
        },
        //查看医生名片
        lookDoctorCard() {
            this.$router.push({
                path: '/doctorCard'
            })
        },
        // 多选组件值 分组
        childByValueGroup(childValue) {
            // childValue就是子组件传过来的值
            console.log(childValue)
            // debugger  checkedVal
            let val = childValue
        },
        //医生
        childByValueDoc(childValue) {
            // childValue就是子组件传过来的值 radioVal
            console.log(childValue)
            let val = childValue
        },
        searchTap() {
            this.$router.push({
                path: '/search'
            })
        }
    }
}
</script>

<style lang="less" scoped>
.header {
    background: #ffffff;
    position: fixed;
    z-index: 10;
    top: 0;
    left: 0;
    width: 100%;
    .wrapperH {
        display: flex;
        align-items: center;
        padding: 15px 20px;
        .icon {
            font-size: 18px;
            color: #3a3a3a;
        }
        .searchBox {
            margin: 0 15px;
            flex: 1;
            padding: 9px 13px;
            background: #ffffff;
            border: 1px solid #b4b5d9;
            border-radius: 20px;
            display: flex;
            align-items: center;
        }
    }
}
.contenter {
    .menuTab {
        background: #f7f7f7;
        position: fixed;
        z-index: 10;
        top: 68px;
        left: 0;
        width: 100%;
        .menuWrap {
            display: flex;
            justify-content: space-between;
            padding: 20px 50px 30px;
        }
    }
    .navBarItem {
        position: relative;
        &.on {
            .item {
                color: #6049f5;
                font-weight: bold;
            }
            &::after {
                content: '';
                position: absolute;
                bottom: -10px;
                left: 50%;
                margin-left: -8px;
                width: 16px;
                height: 4px;
                background: #6049f5;
                border-radius: 2.5px;
            }
        }
        .item {
            font-size: 14px;
            color: #6d6d6d;
        }
    }
    .listPanel {
        padding: 132px 15px 52px;
        .item {
            margin-bottom: 10px;
            padding: 15px;
            background: #ffffff;
            background: #ffffff;
            box-shadow: 0 2px 10px 0 rgba(120, 121, 164, 0.1);
            border-radius: 4px;
            display: flex;
            align-items: center;
            font-size: 14px;
            color: #6d6d6d;
            .txImg {
                width: 50px;
                height: 50px;
                border-radius: 50%;
                margin-right: 10px;
            }
            strong {
                font-size: 16px;
                color: #3a3a3a;
            }
            .time {
                padding-top: 10px;
                font-size: 12px;
                color: #aaaaaa;
            }
        }
    }
}
// 筛选
.drawerPanel {
    .chooseTime {
        display: flex;
        justify-content: space-between;
        .item {
            background: #f9f8fd;
            border-radius: 2px;
            font-size: 14px;
            color: #b4b5d9;
            padding: 8px 0;
            width: 70px;
            box-sizing: border-box;
            text-align: center;
            margin-right: 15px;
            &.on {
                background: #7362f5;
                color: #ffffff;
            }
        }
    }
}
</style>