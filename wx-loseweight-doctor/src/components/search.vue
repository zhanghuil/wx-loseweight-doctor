<template>
    <transition name="move">
        <div v-show="showFlag" class="searchContent">
            <cube-scroll ref="scrollSearch">
                <div>
                    <div class="searchTop">
                        <div class="searchBox">
                            <i class="icon iconfont icon-sousuo"></i>
                            <input
                                class="input"
                                type="text"
                                v-model.trim="searchVal"
                                placeholder="输入患者称呼或手机号搜索"
                                @focus="focusShow"
                                @keyup.enter="searchEnterFun"
                            />
                            <i
                                v-show="blurHidden"
                                class="clear cubeic-wrong"
                                @click="clearInput"
                            ></i>
                        </div>
                        <div class="cancelBtn" @click="cancelBtn">取消</div>
                    </div>
                    <div
                        class="searchList"
                        v-show="
                            patientsListSearch && patientsListSearch.length > 0
                        "
                    >
                        <div
                            v-for="(item, index) in patientsListSearch"
                            :key="index"
                        >
                            <paItem
                                :item="item"
                                @lookTap="lookDetails"
                            ></paItem>
                        </div>
                    </div>
                    <!-- 无内容 -->
                    <div
                        class="emptyBox"
                        v-show="
                            searchEmptyCon &&
                                patientsListSearch &&
                                patientsListSearch.length == 0
                        "
                    >
                        <img
                            class="emptyImg"
                            src="../assets/empty@2x.png"
                            alt=""
                        />
                        <p>无相关结果</p>
                    </div>
                </div>
            </cube-scroll>
        </div>
    </transition>
</template>

<script>
import leftSlider from '@/components/public/leftSlider'
import paItem from '@/components/public/paItem'
export default {
    props: {
        patientsListSearch: {
            type: Array
        }
    },
    components: { leftSlider, paItem },
    data() {
        return {
            showFlag: false, //显示搜索页面
            searchVal: '',
            blurHidden: false,
            searchEmptyCon: false //默认不显示搜索空图片
        }
    },
    created() {},
    methods: {
        refreshCard() {
            this.$refs.scrollSearch.refresh()
        },
        show() {
            this.showFlag = true
            this.$nextTick(() => {
                this.refreshCard()
            })
        },
        hide() {
            this.showFlag = false
        },
        //回车搜索
        searchEnterFun: function(e) {
            this.searchEmptyCon = true
            // 使用 which 和 keyCode 属性来解决兼容问题
            var keyCode = window.event ? e.keyCode : e.which
            var val = e.target.value
            console.log('回车搜索', keyCode, e)
            if (keyCode == 13 && val) {
                this.$emit('searchVal', val)
            }
        },
        lookDetails(val) {
            //患者详情页
            this.$router.push({
                path: '/patientList',
                query: { userId: val.id, userName: val.name }
            })
        },
        focusShow(i) {
            this.blurHidden = true
        },
        clearInput(i) {
            if (this.searchVal) {
                this.searchVal = ''
            }
        },
        cancelBtn() {
            this.hide()
            this.searchVal = ''
            this.searchEmptyCon = false
            this.$emit('cancelBtn')
        }
    }
}
</script>

<style lang="less" scoped>
.searchContent {
    position: fixed;
    left: 0;
    top: 0;
    bottom: 48px;
    z-index: 101;
    width: 100%;
    height: 100%;
    background: #f7f7f7;
    transform: translate3d(0, 0, 0);
    &.move-enter-active,
    &.move-leave-active {
        transition: all 0.2s linear;
    }
    &.move-enter,
    &.move-leave-active {
        transform: translate3d(100%, 0, 0);
    }
}
.searchTop {
    background: #ffffff;
    padding: 15px;
    display: flex;
    align-items: center;
    font-size: 14px;
    .icon {
        font-size: 18px;
        color: #3a3a3a;
    }
    .cancelBtn {
        color: #616161;
    }
    .input {
        width: 100%;
        font-size: 14px;
        color: #6d6d6d;
        margin-left: 10px;
        &:focus {
            outline: none;
        }
    }
    .clear {
        font-size: 18px;
        color: #aaaaaa;
    }
}
.searchBox {
    margin: 0 15px 0 0;
    flex: 1;
    padding: 9px 13px;
    background: #ffffff;
    border: 1px solid #b4b5d9;
    border-radius: 20px;
    display: flex;
    align-items: center;
}
.searchList {
    padding: 20px 15px;
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
.emptyBox {
    padding-top: 150px;
    text-align: center;
    font-size: 14px;
    color: #6d6d6d;
    .emptyImg {
        width: 138px;
        height: 100px;
        margin-bottom: 20px;
    }
}
</style>