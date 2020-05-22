<template>
    <div class="pb70">
        <div class="tmpList" v-show="list.length > 0">
            <Options :options="list" @toparents="childByValue"></Options>
        </div>
        <div class="footerEdit" v-show="list.length > 0">
            <button class="yk-btn yk-btn-def">取消</button>
            <button class="yk-btn">确定</button>
        </div>
        <div v-show="list.length == 0" class="noTmp">
            <div class="wrap">
                <img src="../assets/empty@2x.png" alt="" />
                <p class="f14 c-6d noTxt">暂无相关模板</p>
                <p class="f16 c-73" @click="goBack">返回</p>
            </div>
        </div>
    </div>
</template>

<script>
import Options from '@/components/public/options'
export default {
    name: 'InsertTemplate',
    components: { Options },
    data() {
        return {
            list: [
                // {
                //     label: '模板名称1',
                //     id: '1',
                //     checked: false
                // },
                // {
                //     label: '模板名称2',
                //     id: '2',
                //     checked: false
                // }
            ]
        }
    },
    methods: {
        childByValue(childValue) {
            // childValue就是子组件传过来的值 radioVal
            console.log(childValue)
            let val = childValue
        },
        goBack() {
            this.$router.go(-1) //返回上一层
        }
    }
}
</script>

<style lang="less">
.tmpList {
    margin: 15px;
    .chooser-list li {
        padding: 15px;
        background: #ffffff;
        box-shadow: 0 2px 10px 0 rgba(120, 121, 164, 0.1);
        border-radius: 4px;
        font-size: 16px;
        color: #3a3a3a;
    }
}
.noTmp {
    position: fixed;
    width: 100%;
    height: 100%;
    z-index: 10;
    left: 0;
    top: 0;
    text-align: center;
    .wrap {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        img {
            width: 138px;
            height: 100px;
        }
        .noTxt {
            margin: 20px 0 40px;
        }
    }
}
</style>