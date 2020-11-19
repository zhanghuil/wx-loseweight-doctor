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
                        <div class="item" @click="handleChange(item.id, index)">
                            {{ item.name }}
                        </div>
                    </div>
                </div>
            </div>
            <div
                class="emptyBox"
                v-show="patientsList && patientsList.length == 0"
            >
                <img class="emptyImg" src="../assets/empty@2x.png" alt="" />
                <p>无相关内容</p>
            </div>
            <div
                class="listPanelBox"
                ref="listPanelBox"
                v-show="patientsList && patientsList.length > 0"
            >
                <div class="content">
                    <!-- 刷新提示信息 -->
                    <div class="top-tip">
                        <span class="refresh-hook">{{ pulldownMsg }}</span>
                    </div>
                    <div class="listPanel">
                        <div v-for="(item, index) in patientsList" :key="index">
                            <!-- <leftSlider
                                :index="index"
                                :id="item.PatientID"
                                @deleteItem="deleteItem"
                            >
                            </leftSlider> -->
                            <paItem :item="item" @lookTap="lookDetails">
                                <!-- 删除操作 -->
                                <div class="editPBox">
                                    <div
                                        @click.stop.prevent="
                                            moreTap(item.PatientID)
                                        "
                                        class="p15"
                                    >
                                        <i
                                            class="icon iconfont icon-gengduomore10"
                                        ></i>
                                    </div>
                                    <div
                                        class="editPTxt"
                                        v-show="pid == item.PatientID"
                                    >
                                        <div class="arrow">
                                            <i></i>
                                            <span></span>
                                        </div>
                                        <div
                                            class="px15 py10"
                                            @click.stop.prevent="
                                                deleteItemTap(item.PatientID)
                                            "
                                        >
                                            删除
                                        </div>
                                    </div>
                                </div>
                                <!-- 删除操作 end -->
                            </paItem>
                        </div>
                        <div class="loading" v-show="loading">
                            {{ loadingTXT }}
                        </div>
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
        <!-- <search
            ref="search"
            :patientsListSearch="patientsListSearch"
            @searchVal="childSearchVal"
            @cancelBtn="cancelSearchTap"
        ></search> -->
        <!-- alert提示刷新成功 -->
        <div class="alert-hook" :style="{ display: alertHook }">刷新成功</div>
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
import BScroll from 'better-scroll'
export default {
    name: 'index',
    components: { drawer, Options, leftSlider, paItem, search },
    data() {
        return {
            pid: '',
            pageX: null,
            pageY: null,
            Loop: 0, //定时器
            pulldownMsg: '下拉刷新',
            alertHook: 'none',
            errorImg0: require('@/assets/p1.png'),
            errorImg1: require('@/assets/p2.png'),
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
            queryType: 1, //查询类型 0 全部 1今日患者 2明日患者
            display: false, //筛选弹窗
            drawerWidth: '280px',
            drawerHeight: '100%',
            //  上拉加载更多
            loading: false,
            loadingTXT: 'loading....',
            page: 1,
            totalPage: 0, //总页码
            TotalCount: 0, // 总条数
            isClickTab: false
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
        this.isFirstEnter = true
        // 只有第一次进入或者刷新页面后才会执行此钩子函数，使用keep-alive后（2+次）进入不会再执行此钩子函数
    },

    activated() {
        if (!this.$route.meta.isBack || this.isFirstEnter) {
            // 如果isBack是false，表明需要获取新数据，否则就不再请求，直接使用缓存的数据
            // 如果isFirstEnter是true，表明是第一次进入此页面或用户刷新了页面，需获取新数据
            // 执行自己写的页面的初始化
            this.init()
        }
        // 恢复成默认的false，避免isBack一直是true，导致下次无法获取数据
        this.$route.meta.isBack = false
        // 恢复成默认的false，避免isBack一直是true，导致每次都获取新数据
        this.isFirstEnter = false
    },
    mounted() {
        this.loadMore()
    },
    methods: {
        //点点按钮
        moreTap(id) {
            if (id == this.pid) {
                this.pid = ''
            } else {
                this.pid = id
            }
        },
        //删除患者
        deleteItemTap(id) {
            this.pid = ''
            this.deleteItem(id)
        },
        init() {
            let _queryType = storage.getItem('queryType')
            console.log(`获取缓存查询类型：${_queryType}`)
            if (_queryType) {
                this.queryType = _queryType
            }
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
        //加载更多start  tabClick
        async handleChange(id, index) {
            this.isClickTab = true
            this.scroll.refresh()
            this.scroll.maxScrollY = -300
            this.loadingTXT = 'loading....'
            this.queryType = id
            this.patientsList = []
            this.page = 1
            this.TotalCount = 0
            await this.getJZMZPatients()
            this.loadMore()
        },
        loadMore() {
            var _this = this
            this.$nextTick(() => {
                if (!this.scroll) {
                    this.scroll = new BScroll(this.$refs.listPanelBox, {
                        click: true,
                        probeType: 3,
                        useTransition: false,
                        scrollY: true,
                        bindToWrapper: true,
                        HWCompositing: true,
                        bounceTime: 700 //回弹时间
                    })
                    // 滑动过程中事件
                    this.scroll.on('scroll', pos => {
                        if (pos.y > 50) {
                            this.pulldownMsg = '释放立即刷新'
                        }
                    })
                    this.scroll.on('touchEnd', pos => {
                        //上拉刷新
                        if (pos.y > 30) {
                            setTimeout(() => {
                                //恢复刷新提示文本值
                                this.pulldownMsg = '下拉刷新'
                                this.page = 1
                                this.getJZMZPatients()
                                //刷新成功后提示
                                this.refreshalert()
                                //刷新列表后，重新计算滚动区域高度
                                this.scroll.refresh()
                            }, 500)
                        }
                    })

                    this.scroll.maxScrollY = -300
                    this.scroll.on('scrollEnd', pos => {
                        this.loading = true
                        if (_this.isClickTab) {
                            this.scroll.maxScrollY = -300
                        }
                        _this.isClickTab = false
                        if (_this.page == _this.totalPage) {
                            if (_this.TotalCount >= 10)
                                _this.loadingTXT = '---到底了---'
                            else _this.loadingTXT = ''
                            _this.loading = true
                            return
                        }
                        if (
                            this.scroll.y <= this.scroll.maxScrollY + 50 &&
                            this.loading
                        ) {
                            console.log('滚动加载数据')
                            _this.page++
                            _this.getJZMZPatients()
                            _this.loading = false
                        }
                    })
                } else {
                    _this.loading = false
                    _this.scroll.refresh()
                }
            })
        },
        //加载更多end
        //刷新成功提示
        refreshalert() {
            this.alertHook = 'block'
            setTimeout(() => {
                this.alertHook = 'none'
            }, 1000)
        },
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
                //removeByid
                _this.patientsList.splice(
                    _this.patientsList.findIndex(item => item.PatientID === id),
                    1
                )
                // _this.getJZMZPatients(1)
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
            // debugger
            //如果是科室负责人  医生选项不能为空
            if (this.doctorList) {
                if (!this.doctorId) {
                    yktoast('请至少选择一个医生')
                    return
                }
            }
            this.$refs.drawerFilter.closeByButton()
            let selMap = this.selectDoctorGroup.map(item => item.GroupID)
            this.doctorId = selMap.join(',')
            //缓存筛选器中的选中值 selectDoctorGroup
            // return
            storage.setObjItem('filterResultsGroup', this.currfilterInfo())
            console.log(this.currfilterInfo())
            this.getJZMZPatients(1)
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
                    //给筛选器赋值
                    let checkedValArray = filterInfo.doctorId.split(',')
                    _this.selectDoctorGroup = []
                    checkedValArray.forEach(n => {
                        let group = newDoctorList.find(e => e.GroupID == n)
                        if (
                            group &&
                            !_this.selectDoctorGroup.find(
                                k => k.GroupID == group.GroupID
                            )
                        )
                            _this.selectDoctorGroup.push(group)
                    })
                    // debugger
                }
                //end
            })
        },
        //获取减重患者病人
        getJZMZPatients(pageIndex) {
            // debugger
            var _this = this
            if (pageIndex && pageIndex == 1) {
                this.patientsList = []
                this.totalPage = 0
                this.page = pageIndex
            }
            let filterInfo = storage.getObjItem('filterResultsGroup')
            let DoctorId = filterInfo.doctorId
                ? filterInfo.doctorId
                : this.doctorId
            let UpdateTimeDay = filterInfo.timeIndex
                ? filterInfo.timeIndex
                : this.timeIndex
            let GroupId = filterInfo.checkedVal
                ? filterInfo.checkedVal
                : this.checkedVal
            let url = this.api.userApi.GetJZMZPatients
            let data = {
                PageIndex: this.page,
                PageSize: 10,
                Keyword: this.searchValue, //搜索关键词
                DoctorId: DoctorId,
                UpdateTimeDay: UpdateTimeDay, //更新时间天数 7,15,30
                GroupId: GroupId, // 分组
                QueryType: this.queryType //查询类型 0 全部 1今日患者 2明日患者
            }

            if (_this.page == 1) {
                _this.patientsList = []
            }
            this.$fetchPost(url, data, 4111).then(response => {
                let result = response.data.data //请求返回数据
                if (result.Data) {
                    _this.patientsList = _this.patientsList.concat(result.Data)
                    // debugger
                    _this.totalPage = result.Page.TotalPage
                    _this.TotalCount = result.Page.TotalCount
                }
                // yktoast()
            })
        },
        //搜索患者
        getJZMZPatientsSearch() {
            var _this = this
            let url = this.api.userApi.GetJZMZPatients
            let data = {
                PageIndex: this.page,
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
            this.page = 1
            this.getJZMZPatients()
        },
        // 更新时间
        tabTimeClick(id) {
            this.timeIndex = id
        },
        // 查看患者详情 手释放，如果在500毫秒内就释放，则取消长按事件，此时可以执行onclick应该执行的事件
        lookDetails(val) {
            storage.setItem('queryType', this.queryType)
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
            // debugger
            // childValue就是子组件传过来的值
            console.log(childValue)
            let selMap = childValue.map(item => item.GroupID)
            this.doctorId = selMap.join(',')
        },
        searchTap() {
            // this.$refs.search.show()
            this.$router.push({
                path: '/searchList',
                query: { type: this.queryType, doctorId: this.doctorId }
            })
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
    z-index: 101;
    top: 0;
    left: 0;
    width: 100%;
    height: 68px;
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
        z-index: 101;
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
    .listPanelBox {
        width: 100vw;
        height: 100vh;
        overflow: hidden;
    }
    /* 下拉、上拉提示信息 */
    .top-tip {
        position: absolute;
        top: 80px;
        left: 0;
        z-index: 1;
        width: 100%;
        height: 40px;
        line-height: 40px;
        text-align: center;
        color: #555;
        font-size: 14px;
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
.footer {
    z-index: 101;
}
.loading {
    text-align: center;
    padding: 30px 0;
    font-family: PingFangSC-Regular;
    font-size: 14px;
    color: #6d6d6d;
}
.emptyBox {
    padding-top: 240px;
    text-align: center;
    font-size: 14px;
    color: #6d6d6d;
    .emptyImg {
        width: 138px;
        height: 100px;
        margin-bottom: 20px;
    }
}
/* 全局提示信息 */
.alert-hook {
    display: none;
    position: fixed;
    top: 25%;
    left: 38%;
    z-index: 99;
    padding: 10px 20px;
    border-radius: 2px;
    text-align: center;
    color: #fff;
    font-size: 14px;
    background: rgba(0, 0, 0, 0.7);
}
</style>