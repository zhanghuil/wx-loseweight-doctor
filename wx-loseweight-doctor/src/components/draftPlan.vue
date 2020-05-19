<template>
    <div class="pb70">
        <div v-show="pageIndex == 1">
            <div class="yk_wx_cell" @click="showDatePicker">
                <div class="cell_bd flex-center">
                    <div>
                        <img src="../assets/time@2x.png" class="img" alt="" />
                    </div>
                    <div class="ml10 f16">方案时间</div>
                </div>
                <div class="cell_ft">
                    <span class="mr10">{{ planDate }}</span>
                    <i class="icon cubeic-arrow"></i>
                </div>
            </div>
            <div class="panelBox">
                <div class="infoTit">
                    <div class="rel">
                        <div class="title b">阶段减重目标</div>
                        <div class="bg_img"></div>
                    </div>
                </div>
                <div class="tc targetBox">
                    <input
                        class="targetInput"
                        type="number"
                        @input="oninput"
                        v-model="num"
                    />
                    <span class="f12 c-6d">kg</span>
                </div>
            </div>
            <div class="panelBox">
                <div class="navList">
                    <div
                        v-for="(item, index) in tabs"
                        :key="index"
                        class="weui-navbar__item"
                        :class="activeIndex == index ? 'on' : ''"
                        @click="tabClick(index)"
                    >
                        <div class="weui-navbar__title">{{ item }}</div>
                    </div>
                </div>
                <!-- 高蛋白 -->
                <div v-show="activeIndex == 0" class="pb15">
                    <div class="infoTit">
                        <div class="rel">
                            <div class="title b">供给量（日）</div>
                            <div class="bg_img"></div>
                        </div>
                        <div class="weightScale" @click="display = true">
                            补充瘦体重
                        </div>
                    </div>
                    <div class="wrapper4 p15">
                        <div class="PanelPlan2">
                            <div class="L">
                                <div class="f24 lh24">
                                    800
                                </div>
                                <div class="f12">大卡</div>
                            </div>
                            <div class="R">
                                <div class="itemList">
                                    <div class="df">
                                        <div class="w90">蛋白质</div>
                                        <div class="f14 c-3a">
                                            480g
                                        </div>
                                    </div>
                                </div>
                                <div class="itemList">
                                    <div class="df">
                                        <div class="w90">脂肪</div>
                                        <div class="f14 c-3a">
                                            160g
                                        </div>
                                    </div>
                                </div>
                                <div class="itemList">
                                    <div class="df">
                                        <div class="w90">碳水化合物</div>
                                        <div class="f14 c-3a">
                                            80g
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- 轻断食 -->
                <div v-show="activeIndex == 1" class="pb15">
                    <div class="infoTit">
                        <div class="rel">
                            <div class="title b">断食日供给量（日）</div>
                            <div class="bg_img"></div>
                        </div>
                    </div>
                    <div class="f14 c-6d px15">800大卡</div>
                    <div class="infoTit mt10">
                        <div class="rel">
                            <div class="title b">非断食日供给量（日）</div>
                            <div class="bg_img"></div>
                        </div>
                        <div class="weightScale">补充瘦体重</div>
                    </div>
                    <div class="wrapper4 p15">
                        <div class="PanelPlan2">
                            <div class="L">
                                <div class="f24 lh24">
                                    800
                                </div>
                                <div class="f12">大卡</div>
                            </div>
                            <div class="R">
                                <div class="itemList">
                                    <div class="df">
                                        <div class="w90">蛋白质</div>
                                        <div class="f14 c-3a">
                                            480g
                                        </div>
                                    </div>
                                </div>
                                <div class="itemList">
                                    <div class="df">
                                        <div class="w90">脂肪</div>
                                        <div class="f14 c-3a">
                                            160g
                                        </div>
                                    </div>
                                </div>
                                <div class="itemList">
                                    <div class="df">
                                        <div class="w90">碳水化合物</div>
                                        <div class="f14 c-3a">
                                            80g
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- 限能量 -->
                <div v-show="activeIndex == 2" class="pb15">
                    <div class="infoTit">
                        <div class="rel">
                            <div class="title b">供给量（日）</div>
                            <div class="bg_img"></div>
                        </div>
                        <div class="weightScale">补充瘦体重</div>
                    </div>
                    <div class="wrapper4 p15">
                        <div class="PanelPlan2">
                            <div class="L">
                                <div class="f24 lh24">
                                    800
                                </div>
                                <div class="f12">大卡</div>
                            </div>
                            <div class="R">
                                <div class="itemList">
                                    <div class="df">
                                        <div class="w90">蛋白质</div>
                                        <div class="f14 c-3a">
                                            480g
                                        </div>
                                    </div>
                                </div>
                                <div class="itemList">
                                    <div class="df">
                                        <div class="w90">脂肪</div>
                                        <div class="f14 c-3a">
                                            160g
                                        </div>
                                    </div>
                                </div>
                                <div class="itemList">
                                    <div class="df">
                                        <div class="w90">碳水化合物</div>
                                        <div class="f14 c-3a">
                                            80g
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- 饮食要求 -->
        <div v-show="pageIndex == 2">
            <ul class="requireBox">
                <li class="px75 py20">
                    <div>
                        <span class="tag">1</span>
                    </div>
                    <div class="py15">少油清淡</div>
                    <p class="f16">
                        植物油每天15克（一勺半）以内 每日食盐6g（1盖）以内
                    </p>
                </li>
                <li class="py20">
                    <div class="mt10">
                        <span class="tag">2</span>
                    </div>
                    <div class="py15">要求减重期间不吃的食物</div>
                    <div class="pt20 pb5">含糖食物：</div>
                    <p class="f14">
                        甜饮料（有糖/无糖）；<br />甜点，饼干，巧克力，蛋糕，奶油面包，<br />糯米类粘食（汤圆、粽子、艾窝窝等）；<br />生活中的烟、酒
                    </p>
                    <div class="pt20 pb5">高油食物：</div>
                    <p class="px15 f14">
                        全脂奶、所有坚果、超市包装小食品、油炸油煎食物、各种“酱”（蛋黄酱、沙拉酱、面酱、炸酱、芝麻酱等）
                    </p>
                    <div class="pt20 pb5">各种高脂肉类：</div>
                    <p class="f14 px15">
                        内脏、荤油、肥肉、排骨、浓肉汤、烧烤、麻辣烫、火腿、香肠、鸡爪、猪蹄、肉皮等
                    </p>
                </li>
            </ul>
        </div>
        <!-- 饮食方案 -->
        <div v-show="pageIndex == 3">
            <div class="dietPlanTop">
                <div class="item" @click="showTmp = true">
                    <i class="iconfont icon-baocun"></i> 保存模板
                </div>
                <div class="item" @click="InsertTmp">
                    <i class="iconfont icon-charu"></i> 插入模板
                </div>
            </div>
            <!-- 饮食方案 start-->
            <div class="dietPlan">
                <ul>
                    <li>
                        <div class="tag">
                            <span>非断食日</span>
                        </div>
                        <div class="con con2">
                            <div class="panelCon">
                                <div class="flex-between">
                                    <div class="f16 c-3a">
                                        早餐
                                        <i
                                            class="c-fb iconfont icon-bitian-"
                                        ></i>
                                    </div>
                                    <div class="f14 c-6d">7:00</div>
                                </div>
                                <ol class="mt15">
                                    <li>
                                        <div class="wrap">
                                            <div class="f14 c-3a">
                                                主食（粗细搭配）
                                            </div>
                                            <div class="pr10">
                                                <input placeholder="请输入" />
                                                <span class="f14 c-6d">克</span>
                                            </div>
                                        </div>
                                    </li>
                                    <li>
                                        <div class="wrap">
                                            <div class="f14 c-3a">
                                                蛋白质类食物
                                            </div>
                                            <div class="pr10">
                                                <input placeholder="请输入" />
                                                <span class="f14 c-6d">克</span>
                                            </div>
                                        </div>
                                        <p class="desc">
                                            1 个鸡蛋＋牛奶/豆浆 250ml
                                        </p>
                                    </li>
                                </ol>
                            </div>
                            <div class="panelCon">
                                <div class="flex-between">
                                    <div class="f16 c-3a">
                                        全天饮水量
                                    </div>
                                </div>
                                <ol class="mt15">
                                    <li>
                                        <div class="wrap">
                                            <div class="f14 c-3a">
                                                全天饮水量
                                            </div>
                                            <div class="pr10">
                                                <input placeholder="请输入" />
                                                <span class="f14 c-6d">ml</span>
                                            </div>
                                        </div>
                                    </li>
                                </ol>
                            </div>
                        </div>
                    </li>
                    <li>
                        <div class="tag">
                            <span>断食日</span>
                        </div>
                        <div class="con con2">
                            <div class="panelCon">
                                <div class="flex-between">
                                    <div class="f16 c-3a">
                                        早餐
                                        <i
                                            class="c-fb iconfont icon-bitian-"
                                        ></i>
                                    </div>
                                    <div class="f14 c-6d">7:00</div>
                                </div>
                                <ol class="mt15">
                                    <li>
                                        <div class="wrap">
                                            <div class="f14 c-3a">
                                                主食（粗细搭配）
                                            </div>
                                            <div class="pr10">
                                                <input placeholder="请输入" />
                                                <span class="f14 c-6d">克</span>
                                            </div>
                                        </div>
                                    </li>
                                    <li>
                                        <div class="wrap">
                                            <div class="f14 c-3a">
                                                蛋白质类食物
                                            </div>
                                            <div class="pr10">
                                                <input placeholder="请输入" />
                                                <span class="f14 c-6d">克</span>
                                            </div>
                                        </div>
                                        <p class="desc">
                                            1 个鸡蛋＋牛奶/豆浆 250ml
                                        </p>
                                    </li>
                                </ol>
                            </div>
                            <div class="panelCon">
                                <div class="flex-between">
                                    <div class="f16 c-3a">
                                        全天饮水量
                                    </div>
                                </div>
                                <ol class="mt15">
                                    <li>
                                        <div class="wrap">
                                            <div class="f14 c-3a">
                                                全天饮水量
                                            </div>
                                            <div class="pr10">
                                                <input placeholder="请输入" />
                                                <span class="f14 c-6d">ml</span>
                                            </div>
                                        </div>
                                    </li>
                                </ol>
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
            <!-- 饮食方案 end -->
        </div>
        <!-- 食谱执行说明 -->
        <div v-show="pageIndex == 4">
            <ul class="requireBox requireBox2">
                <li class="py20">
                    <div>
                        <span class="tag">1</span>
                    </div>
                    <div class="py15">
                        主食、蛋白质食物、蔬菜的量都是指食材生重
                    </div>
                    <div class="desc_meal">
                        <i class="iconfont icon-yinhao"></i>
                        <span>100克主食</span>
                        <i class="iconfont icon-quote-right"></i>
                    </div>
                    <div class="equalImg">=</div>
                    <div class="lh24">
                        100克大米/白面/杂面/小米<br />
                        100克挂面 <br />
                        100克梳打饼干 <br />
                        240克米饭 <br />
                        120克馒头/面包 <br />
                        5×100g土豆/红薯/山药<br />
                    </div>
                    <p class="py20">
                        <img src="../assets/tip@2x.png" alt="" class="tipImg" />
                        <span>每天主食一半或者1/3是粗粮</span>
                    </p>
                </li>
            </ul>
        </div>
        <!-- 运动方案 -->
        <div v-show="pageIndex == 5">
            <ul class="sportsProgram">
                <li class="pb25">
                    <div class="tag">
                        <span>有氧运动</span>
                    </div>
                    <div class="con">
                        <div class="p15">
                            <checkbox
                                :isMultiply="true"
                                :options="options"
                                :name="name"
                                @toparents="childByValueCheck"
                            ></checkbox>
                        </div>
                        <div class="line"></div>
                        <div class="f16 c-3a px15 pt15">建议运动频率与时长</div>
                        <div class="panelCon">
                            <ol>
                                <li>
                                    <div class="wrap">
                                        <div class="f14 c-3a">
                                            每周运动
                                        </div>
                                        <div class="pr10">
                                            <input placeholder="请输入" />
                                            <span class="f14 c-6d">次</span>
                                        </div>
                                    </div>
                                </li>
                                <li>
                                    <div class="wrap">
                                        <div class="f14 c-3a">
                                            每次
                                        </div>
                                        <div class="pr10">
                                            <input placeholder="请输入" />
                                            <span class="f14 c-6d">分钟</span>
                                        </div>
                                    </div>
                                </li>
                                <li>
                                    <div class="wrap">
                                        <div class="f14 c-3a">
                                            心率达到
                                        </div>
                                        <div class="pr10">
                                            <input placeholder="请输入" />
                                            <span class="f14 c-6d"
                                                >次/分钟</span
                                            >
                                        </div>
                                    </div>
                                </li>
                            </ol>
                        </div>
                    </div>
                </li>
                <li>
                    <div class="tag">
                        <span>阻抗运动</span>
                    </div>
                    <div class="con">
                        <div class="f16 c-3a px15 pt15">建议抗阻运动项目</div>
                        <div class="f12 c-6d px15 mt10">
                            APP（Keep，轻+，Fit 等）；哑铃操；健身房器械锻炼等
                        </div>
                        <div class="panelCon">
                            <ol>
                                <li>
                                    <div class="wrap">
                                        <div class="f14 c-3a">
                                            每周运动
                                        </div>
                                        <div class="pr10">
                                            <input placeholder="请输入" />
                                            <span class="f14 c-6d">次</span>
                                        </div>
                                    </div>
                                </li>
                                <li>
                                    <div class="wrap">
                                        <div class="f14 c-3a">
                                            每次
                                        </div>
                                        <div class="pr10">
                                            <input placeholder="请输入" />
                                            <span class="f14 c-6d">分钟</span>
                                        </div>
                                    </div>
                                </li>
                                <li>
                                    <div class="wrap">
                                        <div class="f14 c-3a">
                                            心率达到
                                        </div>
                                        <div class="pr10">
                                            <input placeholder="请输入" />
                                            <span class="f14 c-6d"
                                                >次/分钟</span
                                            >
                                        </div>
                                    </div>
                                </li>
                            </ol>
                        </div>
                    </div>
                </li>
            </ul>
        </div>
        <!-- 复诊与随访 -->
        <div v-show="pageIndex == 6">
            <ul class="p15">
                <li class="wrapper2">
                    <div class="f16 c-3a">下次复诊</div>
                    <checkbox
                        :isMultiply="true"
                        :options="options"
                        :name="name"
                        @toparents="childByValueCheck"
                    ></checkbox>
                    <div class="yk_wx_cell yk-wx-cell2" @click="showDateFollow">
                        <div class="cell_bd flex-center">
                            <div>
                                <img
                                    src="../assets/time@2x.png"
                                    class="img"
                                    alt=""
                                />
                            </div>
                            <div class="ml10 f14">复诊时间</div>
                        </div>
                        <div class="cell_ft">
                            <span class="mr10">{{ followDate }}</span>
                            <i class="icon cubeic-arrow"></i>
                        </div>
                    </div>
                </li>
                <li class="wrapper2">
                    <div class="f16 c-3a">随访计划</div>
                    <checkbox
                        :options="options"
                        :name="name"
                        @toparents="childByValueCheck"
                    ></checkbox>
                </li>
            </ul>
        </div>

        <div class="footerEdit" v-show="pageIndex == 1">
            <button class="yk-btn" @click="nextTap">下一步</button>
        </div>
        <div class="footerEdit" v-show="pageIndex > 1">
            <button class="yk-btn yk-btn-def" @click="prevTap">上一步</button>
            <button class="yk-btn" @click="nextTap">下一步</button>
        </div>
        <div class="footerEdit" v-show="pageIndex == 6">
            <button class="yk-btn yk-btn-def" @click="prevTap">上一步</button>
            <button class="yk-btn" @click="submitTap">完成</button>
        </div>
        <!-- 底部弹窗  -->
        <!-- 体重刻度尺 -->
        <drawerFoot
            title="瘦体重"
            :display.sync="display"
            :width="drawerWidth"
            :height="drawerHeight"
            @cancle="cancle"
            @confirm="confirm"
        >
            <div>
                <div class="weightRuler">
                    <span class="f24 c-3a pl10">{{ NumValue }}</span>
                    <span class="f14 c-6d">kg</span>
                </div>
                <ruler
                    @post-NumValue="rulerNum"
                    :NowNum="NumValue"
                    :maxNum="400"
                    :minNum="10"
                ></ruler>
            </div>
        </drawerFoot>
        <!-- 保存模板 saveTemplate -->
        <drawerFoot
            title="保存模板"
            :display.sync="showTmp"
            :width="drawerWidth"
            :height="drawerHeight"
            @cancle="cancle"
            @confirm="confirm"
        >
            <div class="mx15">
                <textarea
                    class="tmpTxtArea"
                    rows="3"
                    maxlength="30"
                    placeholder="输入模板名称，不超过30字"
                ></textarea>
            </div>
        </drawerFoot>
    </div>
</template>

<script>
// /Resource/LoseWeigthPlan/dietexecexplain.png   饮食要求
// /Resource/LoseWeigthPlan/dietrequire.png  食谱执行说明
import ruler from '@/components/ruler'
import drawerFoot from '@/components/drawerFoot'
import checkbox from '@/components/checkbox'
import { formatDate } from '../common/js/date'
export default {
    name: 'draftPlan',
    components: { drawerFoot, ruler, checkbox },
    data() {
        return {
            pageIndex: 1,
            display: false, //体重弹窗
            showTmp: false, //保存模板弹窗
            drawerWidth: '100%',
            drawerHeight: '245px',
            planDate: '', //方案时间
            followDate: '请选择', //复诊时间
            num: 0.0, //减重目标
            tabs: ['高蛋白', '轻断食', '限能量'],
            activeIndex: 0,
            NumValue: 100,

            imgUrl: '',

            name: '建议有氧运动项目',
            options: [
                {
                    label: '快走',
                    value: '1',
                    checked: false
                },
                {
                    label: '慢跑',
                    value: '2',
                    checked: false
                },
                {
                    label: '游泳',
                    value: '3',
                    checked: false
                },
                {
                    label: '跳绳',
                    value: '4',
                    checked: false
                },
                {
                    label: '健身车',
                    value: '5',
                    checked: false
                },
                {
                    label: '瑜伽',
                    value: '6',
                    checked: false
                }
            ]
        }
    },
    computed: {},
    filters: {},
    created() {
        this.planDate = formatDate(new Date(), 'yyyy-MM-dd')
    },
    methods: {
        //子组件传递刻度表
        rulerNum(value) {
            this.NumValue = value
        },
        tabClick(e) {
            this.activeIndex = e
        },
        cancle() {
            console.log('点击了取消')
        },
        confirm() {
            console.log('点击了确定')
        },
        oninput(e) {
            // 通过正则过滤小数点后两位
            e.target.value =
                e.target.value.match(/^\d*(\.?\d{0,1})/g)[0] || null

            console.log('e', e.target.value)
        },
        //方案时间
        showDatePicker() {
            if (!this.datePicker) {
                this.datePicker = this.$createDatePicker({
                    title: '选择方案时间',
                    min: new Date(2008, 7, 8),
                    max: new Date(2020, 9, 20),
                    value: new Date(),
                    onSelect: this.selectHandle,
                    onCancel: this.cancelHandle
                })
            }
            this.datePicker.show()
        },
        selectHandle(date, selectedVal, selectedText) {
            this.planDate = selectedText.join('-')
        },
        //复诊时间
        showDateFollow() {
            if (!this.datePicker) {
                this.datePicker = this.$createDatePicker({
                    title: '选择复诊时间',
                    min: new Date(2008, 7, 8),
                    max: new Date(2020, 9, 20),
                    value: new Date(),
                    onSelect: this.selectHandleF,
                    onCancel: this.cancelHandle
                })
            }
            this.datePicker.show()
        },
        selectHandleF(date, selectedVal, selectedText) {
            this.followDate = selectedText.join('-')
        },
        cancelHandle() {
            console.log('点击了取消')
        },
        //上一步
        prevTap() {
            if (this.pageIndex > 1) this.pageIndex--
            console.log(`当前页码：${this.pageIndex}`)
        },
        //下一步
        nextTap() {
            this.pageIndex++
            console.log(`当前页码：${this.pageIndex}`)
            if (this.pageIndex == 2) document.title = '饮食要求'
            if (this.pageIndex == 4) document.title = '食谱执行说明'
            if (this.pageIndex == 5) document.title = '运行方案'
            if (this.pageIndex == 6) document.title = '复诊与随访'
        },
        //完成
        submitTap() {
            console.log('点击完成提交')
        },
        InsertTmp() {
            this.$router.push({
                path: '/InsertTemplate'
            })
        },

        // 多选组件值 分组
        childByValueCheck(childValue) {
            // childValue就是子组件传过来的值
            console.log(childValue)
            // debugger  checkedVal
            let val = childValue
        }
    }
}
</script>

<style lang="less">
.weightRuler {
    text-align: center;
    padding: 1px 0 8px;
}
.panelBox {
    background: #ffffff;
    box-shadow: 0 2px 10px 0 rgba(120, 121, 164, 0.1);
    border-radius: 4px;
    margin: 15px 10px;
    .infoTit {
        padding: 15px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        .title {
            font-size: 16px;
            color: #3a3a3a;
        }
        .bg_img {
            position: absolute;
            left: 0;
            bottom: -4px;
            width: 50px;
            height: 9px;
            background-image: linear-gradient(
                90deg,
                rgba(115, 98, 245, 0.5) 0%,
                rgba(115, 98, 245, 0) 100%
            );
        }
    }
}
.targetBox {
    padding: 15px 0 35px;
}
.targetInput {
    width: 100px;
    border-bottom: 1px solid #d8d8e4;
    font-size: 26px;
    color: #3a3a3a;
    text-align: center;
    line-height: 26px;
}
.navList {
    display: flex;
    margin-top: 25px;
    padding: 20px 40px 25px;
    .weui-navbar__item {
        position: relative;
        display: block;
        flex: 1;
        text-align: center;
        padding: 3px 0;
        font-size: 14px;
        color: #6d6d6d;
        font-weight: bold;
    }

    .on:after {
        content: '';
        position: absolute;
        bottom: -7.5px;
        left: 50%;
        margin-left: -10px;
        width: 15px;
        height: 4px;
        background: #7362f5;
        border-radius: 2.5px;
    }
    .on .weui-navbar__title {
        font-family: PingFangSC-Medium;
        color: #6049f5;
    }
}
.wrapper4 {
    background: #f8f9fa;
    border-radius: 4px;
    margin: 0 15px;
}
.PanelPlan2 {
    display: flex;
}
.PanelPlan2 .L {
    background-image: linear-gradient(-41deg, #a1a7f8 0%, #c0c4ff 100%);
    border-radius: 4px;
    border-radius: 4px;
    width: 90px;
    height: 64px;
    color: #fff;
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: center;
}
.PanelPlan2 .R {
    flex: 1;
    padding-left: 25px;
    font-size: 12px;
    color: #aaaaaa;
}
.PanelPlan2 .R .itemList {
    position: relative;
    padding-left: 15px;
    padding: 4px 0 4px 15px;
    display: flex;
    align-items: center;
}
.PanelPlan2 .R .itemList::before {
    content: '';
    position: absolute;
    left: 0;
    top: 7px;
    width: 5px;
    height: 5px;
    background: #9198f7;
    box-shadow: 0 1px 3px 0 rgba(145, 152, 247, 0.4);
    border-radius: 50%;
}
.w90 {
    width: 90px;
}
.weightScale {
    font-size: 14px;
    color: #7362f5;
    background: #f0eff8;
    border-radius: 12px 0 0 12px;
    padding: 5px 6px 5px 10px;
    position: relative;
    right: -15px;
}
.requireBox {
    text-align: center;
    font-size: 16px;
    color: #3a3a3a;
    li:nth-child(even) {
        background: #fff;
    }
    .tag {
        margin: 0 auto;
        background: #7362f5;
        font-size: 24px;
        color: #ffffff;
        width: 40px;
        height: 40px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    p {
        color: #6d6d6d;
        text-align: center;
        line-height: 24px;
    }
    &.requireBox2 {
        li:nth-child(even) {
            background: #fafafa;
        }
        li:nth-child(odd) {
            background: #ffffff;
        }
        .desc_meal {
            font-size: 20px;
            color: #7362f5;
            padding: 20px 15px 10px;
            .iconfont {
                color: #c0bce2;
                font-size: 22px;
            }
        }
        .equalImg {
            font-size: 20px;
            color: #7362f5;
            padding-bottom: 6px;
        }
        .tipImg {
            width: 16px;
            height: 16px;
            vertical-align: middle;
        }
    }
}
// 饮食方案
.dietPlanTop {
    background: #fff;
    display: flex;
    .item {
        position: relative;
        padding: 15px 0;
        justify-content: center;
        flex: 1;
        font-size: 16px;
        color: #7362f5;
        display: flex;
        align-items: center;
        &:last-child::before {
            content: '';
            position: absolute;
            width: 1px;
            height: 24px;
            background: #d8d8e4;
            left: 0;
        }
        .iconfont {
            font-size: 20px;
            margin-right: 12px;
        }
    }
}
.dietPlan {
    padding: 15px;
    li {
        padding-bottom: 25px;
    }
    .tag {
        span {
            position: relative;
            z-index: 0;
            background: #9198f7;
            border-radius: 4px 4px 0 0;
            font-size: 14px;
            color: #ffffff;
            padding: 7px 15px 11px 15px;
            display: inline-block;
        }
    }
    .con {
        position: relative;
        z-index: 1;
        background: #ffffff;
        box-shadow: 0 2px 10px 0 rgba(120, 121, 164, 0.1);
        border-radius: 4px;
        &.con2 {
            top: -4px;
        }
    }
}
.panelCon {
    padding: 15px;
    border-bottom: 1px solid #f2f2f2;
    &:last-child {
        border: none;
    }
    .iconfont {
        font-size: 18px;
    }
    ol {
        background: #f8f9fa;
        border-radius: 4px;
        padding: 0 0 0 10px;
        li {
            border-bottom: 1px solid #f2f2f2;
            padding: 18px 0;
            &:last-child {
                border: none;
            }
            .wrap {
                display: flex;
                justify-content: space-between;
                align-items: center;
                input {
                    background: none;
                    width: 56px;
                    font-size: 16px;
                    color: #3a3a3a;
                }
            }
            .desc {
                font-size: 12px;
                color: #aaaaaa;
                margin-top: 10px;
            }
        }
    }
}
.tmpTxtArea {
    font-family: PingFangSC-Regular;
    margin-top: 10px;
    border: none;
    padding: 11px 15px;
    background: #f8f9fa;
    border-radius: 4px;
    width: 100%;
    box-sizing: border-box;
    font-size: 14px;
    line-height: 21px;
    color: #3a3a3a;
}
//运动方案
.sportsProgram {
    padding: 15px;
    li {
        .tag {
            span {
                position: relative;
                z-index: 0;
                background: #9198f7;
                border-radius: 4px 4px 0 0;
                font-size: 14px;
                color: #ffffff;
                padding: 7px 15px 11px 15px;
                display: inline-block;
            }
        }
        .con {
            position: relative;
            z-index: 1;
            background: #ffffff;
            box-shadow: 0 2px 10px 0 rgba(120, 121, 164, 0.1);
            border-radius: 4px;
            top: -4px;
        }
    }
}
.yk-wx-cell2 {
    margin-top: 19px;
    background: #f8f9fa;
    border-radius: 4px;
    font-size: 14px;
    color: #3a3a3a;
}
</style>