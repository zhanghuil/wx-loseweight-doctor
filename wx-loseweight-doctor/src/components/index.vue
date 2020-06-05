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
                        :class="queryType == item.id ? 'on' : ''"
                    >
                        <div class="item" @click="tabClick(item.id)">
                            {{ item.name }}
                        </div>
                    </div>
                </div>
            </div>
            <div class="listPanel">
                <div v-for="(item, index) in patientsList" :key="index">
                    <leftSlider
                        :index="index"
                        :id="item.PatientID"
                        @deleteItem="deleteItem"
                    >
                        <paItem :item="item" @lookTap="lookDetails"></paItem>
                    </leftSlider>
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
            @resetTap="resetTap"
            @confirmTap="confirmTap"
            ref="drawerFilter"
        >
            <div class="drawerPanel">
                <div class="f14 c-7a mb15">更新时间</div>
                <ul class="chooseTime">
                    <li v-for="(item, index) in timeList" :key="index">
                        <div
                            @click="tabTimeClick(item.id)"
                            class="item"
                            :class="timeIndex == item.id ? 'on' : ''"
                        >
                            {{ item.name }}
                        </div>
                    </li>
                </ul>
                <div class="f14 c-7a mb15 mt30">分组</div>
                <!-- 多选 -->
                <Options
                    :options="checkedList"
                    :selectPatientGroup="selectPatientGroup"
                    :isMultiply="true"
                    @toparents="childByValueGroup"
                ></Options>
                <template v-if="doctorList && doctorList.length > 0">
                    <div class="f14 c-7a mb15 mt30">医生</div>
                    <!-- 多选 -->
                    <Options
                        :options="doctorList"
                        :selectPatientGroup="selectDoctorGroup"
                        :isMultiply="true"
                        @toparents="childByValueDoc"
                    ></Options>
                </template>
            </div>
        </drawer>
        <!-- 筛选end -->
        <!-- 搜索 -->
        <search
            ref="search"
            :patientsListSearch="patientsListSearch"
            @searchVal="childSearchVal"
            @cancelBtn="cancelSearchTap"
        ></search>
    </div>
</template>

<script>
import qs from 'qs'
import leftSlider from '@/components/public/leftSlider'
import Options from '@/components/public/options'
import drawer from '@/components/public/drawer'
import paItem from '@/components/public/paItem'
import search from '@/components/search'
import { yktoast, convertKey } from '../common/js/util'
import storage from '../common/js/storage'
import { formatDate } from '../common/js/date'
export default {
    name: 'index',
    components: { drawer, Options, leftSlider, paItem, search },
    data() {
        return {
            errorImg0: require('@/assets/tx1.png'),
            errorImg1: require('@/assets/tx2.png'),
            patientsList: [], //患者列表
            patientsListSearch: [], //搜索患者列表
            accountId: '', //默认登录医生id
            doctorId: '', //医生id 多个 科室负责人
            checkedVal: '', //选中的患者组值
            checkedList: [], //患者组
            selectPatientGroup: [], //重置选中的值
            selectDoctorGroup: [], //重置医生选中
            searchValue: '', //关键词
            doctorList: [], //下属医生
            timeList: [
                {
                    id: 7,
                    name: '7天'
                },
                {
                    id: 15,
                    name: '15天'
                },
                {
                    id: 30,
                    name: '30天'
                }
            ],
            timeIndex: '', //更新时间默认值
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
            drawerHeight: '100%'
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
        if (!storage.getItem('Token') || !storage.getItem('AccountId')) {
            this.$router.replace({
                path: '/login'
            })
            return
        }
        let AccountId = storage.getItem('AccountId')
        this.accountId = AccountId
        this.doctorId = AccountId
        console.log(`AccountId：${AccountId}`)

        this.getJZMZPatients() //获取减重病人
        this.getSubDoctor() //获取下属医生
        this.getPatientGroups() //患者组
    },
    methods: {
        //删除患者
        deleteItem: function(id) {
            console.log('删除这个患者')
            this.$createDialog({
                type: 'confirm',
                content: '是否删除此患者',
                confirmBtn: {
                    text: '确定',
                    active: true,
                    disabled: false,
                    href: 'javascript:;'
                },
                cancelBtn: {
                    text: '取消',
                    active: false,
                    disabled: false,
                    href: 'javascript:;'
                },
                onConfirm: () => {
                    this.shieldPatient(id)
                },
                onCancel: () => {
                    console.log('点击取消按钮')
                }
            }).show()
        },
        //屏蔽患者
        shieldPatient(id) {
            let AccountId = storage.getItem('AccountId')
            var _this = this
            let url = this.api.userApi.ShieldPatient
            let data = {
                Value: AccountId
            }
            this.$fetchPut(
                `${url}?patientId=${id}`,
                qs.stringify(data),
                4114
            ).then(response => {
                let result = response.data.data //请求返回数据
                if (!result) {
                    yktoast(result)
                    return
                }
                yktoast('删除成功')
                _this.getJZMZPatients()
            })
        },
        //筛选重置操作
        resetTap() {
            this.timeIndex = ''
            this.checkedVal = ''
            this.doctorId = ''
            this.selectPatientGroup = []
            this.selectDoctorGroup = []
        },
        //获取当前筛选器中的信息
        currfilterInfo() {
            return {
                timeIndex: this.timeIndex,
                checkedVal: this.checkedVal,
                doctorId: this.doctorId
            }
        },
        //筛选确定操作
        confirmTap() {
            //如果是科室负责人  医生选项不能为空
            if (this.doctorList) {
                if (!this.doctorId) {
                    yktoast('请至少选择一个医生')
                    return
                }
            }
            this.$refs.drawerFilter.closeByButton()
            this.getJZMZPatients()
            //缓存筛选器中的选中值
            storage.setObjItem('filterResultsGroup', this.currfilterInfo())
        },
        imgError() {
            let img = event.srcElement
            img.src = this.errorImg0
            img.onerror = null //防止闪图
        },
        //获取患者组
        getPatientGroups() {
            var _this = this
            let url = this.api.userApi.GetPatientGroups
            let data = {
                doctorId: this.accountId
            }
            this.$fetchGet(url, data, 4121).then(response => {
                let result = response.data.data //请求返回数据
                if (!result) {
                    yktoast(result)
                    return
                }
                _this.checkedList = result

                // 获取筛选器的缓存信息
                let filterInfo = storage.getObjItem('filterResultsGroup')
                if (filterInfo) {
                    //给筛选器赋值
                    _this.timeIndex = filterInfo.timeIndex
                    let checkedValArray = filterInfo.checkedVal.split(',')
                    checkedValArray.forEach(n => {
                        let group = result.find(e => e.GroupID == n)
                        if (group) _this.selectPatientGroup.push(group)
                    })
                    console.log(_this.selectPatientGroup)
                }
                //end
            })
        },
        // 获取下级医生
        getSubDoctor() {
            var _this = this
            let url = this.api.userApi.GetSubDoctor
            let data = {
                doctorId: this.accountId
            }
            this.$fetchGet(url, data, 177).then(response => {
                let result = response.data.data //请求返回数据
                if (!result) {
                    yktoast(result)
                    return
                }
                //重新组装数组符合组件
                let listNew = result.map(item => {
                    let { ID, Name } = item
                    return { ID, Name }
                })
                let newDoctorList = convertKey(listNew, [
                    'GroupID',
                    'GroupName'
                ])
                _this.doctorList = newDoctorList
                //赋默认值
                let defaultDoctor = newDoctorList.filter(
                    n => n.GroupID == _this.accountId
                )

                _this.selectDoctorGroup = defaultDoctor
                _this.doctorId = defaultDoctor[0].GroupID
                console.log(_this.selectDoctorGroup)
                // debugger
                // 获取筛选器的缓存信息
                let filterInfo = storage.getObjItem('filterResultsGroup')
                if (filterInfo) {
                    //给筛选器赋值  todo  有问题
                    let checkedValArray = filterInfo.doctorId.split(',')
                    checkedValArray.forEach(n => {
                        let group = newDoctorList.find(e => e.GroupID == n)
                        if (group) _this.selectDoctorGroup.push(group)
                    })
                }
                //end
            })
        },
        //获取减重患者病人
        getJZMZPatients() {
            var _this = this
            let url = this.api.userApi.GetJZMZPatients
            let data = {
                PageIndex: 0,
                PageSize: 10,
                Keyword: this.searchValue, //搜索关键词
                DoctorId: this.doctorId,
                UpdateTimeDay: this.timeIndex, //更新时间天数 7,15,30
                GroupId: this.checkedVal, // 分组
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
        //搜索患者
        getJZMZPatientsSearch() {
            var _this = this
            let url = this.api.userApi.GetJZMZPatients
            let data = {
                PageIndex: 0,
                PageSize: 10,
                Keyword: this.searchValue, //搜索关键词
                DoctorId: this.doctorId,
                UpdateTimeDay: this.timeIndex, //更新时间天数 7,15,30
                GroupId: this.checkedVal, // 分组
                QueryType: 0 //查询类型 0 全部 1今日患者 2明日患者
            }
            this.$fetchPost(url, data, 4111).then(response => {
                let result = response.data.data //请求返回数据
                if (result.Data) {
                    _this.patientsListSearch = result.Data
                }
                // yktoast()
            })
        },
        // close() {
        //     this.isshow = false
        // },
        // open() {
        //     this.isshow = true
        // },
        //切换头部患者列表tab项
        tabClick(id) {
            this.queryType = id
            this.getJZMZPatients()
        },
        // 更新时间
        tabTimeClick(id) {
            this.timeIndex = id
        },
        lookDetails(val) {
            this.$router.push({
                path: '/patientList',
                query: { userId: val.id, userName: val.name }
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
            let selMap = childValue.map(item => item.GroupID)
            this.checkedVal = selMap.join(',')
        },
        //医生
        childByValueDoc(childValue) {
            debugger
            // childValue就是子组件传过来的值
            console.log(childValue)
            let selMap = childValue.map(item => item.GroupID)
            this.doctorId = selMap.join(',')
        },
        searchTap() {
            this.$refs.search.show()
            // this.$router.push({
            //     path: '/search'
            // })
        },
        //搜索框值
        childSearchVal(childValue) {
            this.searchValue = childValue
            this.getJZMZPatientsSearch()
        },
        //取消搜索 清空关键词
        cancelSearchTap() {
            this.searchValue = ''
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
            align-items: flex-start;
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
            &:last-child {
                margin-right: 0;
            }
            &.on {
                background: #7362f5;
                color: #ffffff;
            }
        }
    }
}
</style>