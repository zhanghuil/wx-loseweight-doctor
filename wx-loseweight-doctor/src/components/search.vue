<template>
    <div>
        <div class="searchTop">
            <div class="searchBox">
                <i class="icon icon-sousuo"></i>
                <input
                    class="input"
                    type="text"
                    v-model.trim="searchVal"
                    placeholder="输入患者称呼或手机号搜索"
                    @focus="focusShow"
                />
                <i
                    v-show="blurHidden"
                    class="clear cubeic-wrong"
                    @click="clearInput"
                ></i>
            </div>
            <div class="cancelBtn" @click="cancelBtn">取消</div>
        </div>
        <div class="searchList">
            <div class="item">
                <div>
                    <img class="txImg" src="../assets/tx1.png" alt="" />
                </div>
                <div>
                    <p>
                        <strong>李芳</strong>
                        <span>120kg，女，23岁</span>
                    </p>
                    <p class="time">首诊：2020-03-01</p>
                </div>
            </div>
        </div>
        <!-- 无内容 -->
        <div class="emptyBox">
            <img class="emptyImg" src="../assets/empty@2x.png" alt="" />
            <p>无相关结果</p>
        </div>
    </div>
</template>

<script>
export default {
    name: 'search',
    data() {
        return {
            searchVal: '',
            blurHidden: false
        }
    },
    methods: {
        focusShow(i) {
            this.blurHidden = true
        },
        clearInput(i) {
            if (this.searchVal) {
                this.searchVal = ''
            }
        },
        cancelBtn() {
            this.$router.go(-1) //返回上一层
        }
    },
    mounted() {
        document
            .querySelector('body')
            .setAttribute('style', 'background-color:#f7f7f7')
    },
    beforeDestroy() {
        document.querySelector('body').setAttribute('style', '')
    }
}
</script>

<style lang="less" scoped>
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