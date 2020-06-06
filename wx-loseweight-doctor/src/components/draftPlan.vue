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
                        <i
                            v-show="targetNumError"
                            class="icon iconfont icon-wuuiconsuotanhao tipsIcon"
                        ></i>
                        <div class="title b">阶段减重目标</div>
                        <div class="bg_img"></div>
                    </div>
                </div>
                <div class="tc targetBox">
                    <input
                        class="targetInput"
                        type="text"
                        @input="oninput"
                        v-model="targetNum"
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
                        :class="activeVal == item.value ? 'on' : ''"
                        @click="tabClick(item.value)"
                    >
                        <div class="weui-navbar__title">{{ item.name }}</div>
                    </div>
                </div>
                <!-- 高蛋白 -->
                <div v-show="activeVal == 'HighProtein'" class="pb15">
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
                                    {{ planSupply.energy }}
                                </div>
                                <div class="f12">大卡</div>
                            </div>
                            <div class="R">
                                <div class="itemList">
                                    <div class="df">
                                        <div class="w90">蛋白质</div>
                                        <div class="f14 c-3a">
                                            {{ planSupply.protein }}g
                                        </div>
                                    </div>
                                </div>
                                <div class="itemList">
                                    <div class="df">
                                        <div class="w90">脂肪</div>
                                        <div class="f14 c-3a">
                                            {{ planSupply.fat }}g
                                        </div>
                                    </div>
                                </div>
                                <div class="itemList">
                                    <div class="df">
                                        <div class="w90">碳水化合物</div>
                                        <div class="f14 c-3a">
                                            {{ planSupply.CHO }}g
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- 轻断食 -->
                <div v-show="activeVal == 'FastDiet'" class="pb15">
                    <div class="infoTit">
                        <div class="rel">
                            <div class="title b">断食日供给量（日）</div>
                            <div class="bg_img"></div>
                        </div>
                    </div>
                    <div class="f14 c-6d px15">
                        {{ planSupply.fastingSupply }}大卡
                    </div>
                    <div class="infoTit mt10">
                        <div class="rel">
                            <div class="title b">非断食日供给量（日）</div>
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
                                    {{ planSupply.energy }}
                                </div>
                                <div class="f12">大卡</div>
                            </div>
                            <div class="R">
                                <div class="itemList">
                                    <div class="df">
                                        <div class="w90">蛋白质</div>
                                        <div class="f14 c-3a">
                                            {{ planSupply.protein }}g
                                        </div>
                                    </div>
                                </div>
                                <div class="itemList">
                                    2
                                    <div class="df">
                                        <div class="w90">脂肪</div>
                                        <div class="f14 c-3a">
                                            {{ planSupply.fat }}g
                                        </div>
                                    </div>
                                </div>
                                <div class="itemList">
                                    <div class="df">
                                        <div class="w90">碳水化合物</div>
                                        <div class="f14 c-3a">
                                            {{ planSupply.CHO }}g
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- 限能量 -->
                <div v-show="activeVal == 'LimitEnergy'" class="pb15">
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
                                    {{ planSupply.energy }}
                                </div>
                                <div class="f12">大卡</div>
                            </div>
                            <div class="R">
                                <div class="itemList">
                                    <div class="df">
                                        <div class="w90">蛋白质</div>
                                        <div class="f14 c-3a">
                                            {{ planSupply.protein }}g
                                        </div>
                                    </div>
                                </div>
                                <div class="itemList">
                                    <div class="df">
                                        <div class="w90">脂肪</div>
                                        <div class="f14 c-3a">
                                            {{ planSupply.fat }}g
                                        </div>
                                    </div>
                                </div>
                                <div class="itemList">
                                    <div class="df">
                                        <div class="w90">碳水化合物</div>
                                        <div class="f14 c-3a">
                                            {{ planSupply.CHO }}g
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
            <img class="mealDesImg" :src="dietrequireUrl" />
            <ul class="requireBox dn">
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
                <!-- 高蛋白、限能量饮食方案 -->
                <div
                    class="con"
                    v-show="
                        activeVal == 'HighProtein' || activeVal == 'LimitEnergy'
                    "
                >
                    <div
                        class="panelCon"
                        v-for="(item,
                        index) in DietQuestionnaire.QuestionGroups"
                        :key="index"
                    >
                        <div class="flex-between rel">
                            <i
                                v-show="item.TargetNumError"
                                class="icon iconfont icon-wuuiconsuotanhao tipsIcon tipsIcon2"
                            ></i>
                            <div class="f16 c-3a">
                                {{ item.Name }}
                                <i
                                    v-show="item.IsRequired"
                                    class="c-fb iconfont icon-bitian-"
                                ></i>
                            </div>
                            <div class="f14 c-6d">{{ item.Description }}</div>
                        </div>
                        <ol class="mt15">
                            <li v-for="(n, idx) in item.Questions" :key="idx">
                                <div class="wrap">
                                    <div class="f14 c-3a">{{ n.Name }}</div>
                                    <div class="pr10">
                                        <template v-if="n.TypeCode == 'Num'">
                                            <template v-if="n.Precision > 0">
                                                <input
                                                    @input="
                                                        checkInput(
                                                            index,
                                                            idx,
                                                            'DecimalValue'
                                                        )
                                                    "
                                                    placeholder="请输入"
                                                    v-model="
                                                        n.QuestionAnswerInfo
                                                            .DecimalValue
                                                    "
                                                />
                                            </template>
                                            <template v-else>
                                                <input
                                                    @input="
                                                        checkInput(
                                                            index,
                                                            idx,
                                                            'IntValue'
                                                        )
                                                    "
                                                    placeholder="请输入"
                                                    v-model="
                                                        n.QuestionAnswerInfo
                                                            .IntValue
                                                    "
                                                />
                                            </template>
                                        </template>
                                        <template
                                            v-else-if="n.TypeCode == 'Text'"
                                        >
                                            <input
                                                @input="
                                                    checkInput(
                                                        index,
                                                        idx,
                                                        'StrValue'
                                                    )
                                                "
                                                placeholder="请输入"
                                                v-model="
                                                    n.QuestionAnswerInfo
                                                        .StrValue
                                                "
                                            />
                                        </template>
                                        <span class="f14 c-6d">{{
                                            n.Suffix
                                        }}</span>
                                    </div>
                                </div>
                                <p class="desc" v-show="n.Description">
                                    {{ n.Description }}
                                </p>
                            </li>
                        </ol>
                    </div>
                </div>
                <!-- 轻断食饮食方案 -->
                <ul v-show="activeVal == 'FastDiet'">
                    <li>
                        <div class="tag">
                            <span>非断食日</span>
                        </div>
                        <div class="con con2">
                            <div
                                class="panelCon"
                                v-for="(item,
                                index) in DietQuestionnaire.QuestionGroups"
                                :key="index"
                            >
                                <div class="flex-between rel">
                                    <i
                                        v-show="item.TargetNumError"
                                        class="icon iconfont icon-wuuiconsuotanhao tipsIcon tipsIcon2"
                                    ></i>
                                    <div class="f16 c-3a">
                                        {{ item.Name }}
                                        <i
                                            v-show="item.IsRequired"
                                            class="c-fb iconfont icon-bitian-"
                                        ></i>
                                    </div>
                                    <div class="f14 c-6d">
                                        {{ item.Description }}
                                    </div>
                                </div>
                                <ol class="mt15">
                                    <li
                                        v-for="(n, idx) in item.Questions"
                                        :key="idx"
                                    >
                                        <div class="wrap">
                                            <div class="f14 c-3a">
                                                {{ n.Name }}
                                            </div>
                                            <div class="pr10">
                                                <template
                                                    v-if="n.TypeCode == 'Num'"
                                                >
                                                    <template
                                                        v-if="n.Precision > 0"
                                                    >
                                                        <input
                                                            @input="
                                                                checkInput(
                                                                    index,
                                                                    idx,
                                                                    'DecimalValue'
                                                                )
                                                            "
                                                            placeholder="请输入"
                                                            v-model="
                                                                n
                                                                    .QuestionAnswerInfo
                                                                    .DecimalValue
                                                            "
                                                        />
                                                    </template>
                                                    <template v-else>
                                                        <input
                                                            @input="
                                                                checkInput(
                                                                    index,
                                                                    idx,
                                                                    'IntValue'
                                                                )
                                                            "
                                                            placeholder="请输入"
                                                            v-model="
                                                                n
                                                                    .QuestionAnswerInfo
                                                                    .IntValue
                                                            "
                                                        />
                                                    </template>
                                                </template>
                                                <template
                                                    v-else-if="
                                                        n.TypeCode == 'Text'
                                                    "
                                                >
                                                    <input
                                                        @input="
                                                            checkInput(
                                                                index,
                                                                idx,
                                                                'StrValue'
                                                            )
                                                        "
                                                        placeholder="请输入"
                                                        v-model="
                                                            n.QuestionAnswerInfo
                                                                .StrValue
                                                        "
                                                    />
                                                </template>
                                                <span class="f14 c-6d">{{
                                                    n.Suffix
                                                }}</span>
                                            </div>
                                        </div>
                                        <p class="desc" v-show="n.Description">
                                            {{ n.Description }}
                                        </p>
                                    </li>
                                </ol>
                            </div>
                        </div>
                    </li>
                    <li>
                        <div class="tag">
                            <span>断食日</span>
                        </div>
                        <div class="con con2" v-if="DietEkadeshQuestionnaire">
                            <div
                                class="panelCon"
                                v-for="(item,
                                index) in DietEkadeshQuestionnaire.QuestionGroups"
                                :key="index"
                            >
                                <div class="flex-between rel">
                                    <i
                                        v-show="item.TargetNumError"
                                        class="icon iconfont icon-wuuiconsuotanhao tipsIcon tipsIcon2"
                                    ></i>
                                    <div class="f16 c-3a">
                                        {{ item.Name }}
                                        <i
                                            v-show="item.IsRequired"
                                            class="c-fb iconfont icon-bitian-"
                                        ></i>
                                    </div>
                                    <div class="f14 c-6d">
                                        {{ item.Description }}
                                    </div>
                                </div>
                                <ol class="mt15">
                                    <li
                                        v-for="(n, idx) in item.Questions"
                                        :key="idx"
                                    >
                                        <div class="wrap">
                                            <div class="f14 c-3a">
                                                {{ n.Name }}
                                            </div>
                                            <div class="pr10">
                                                <template
                                                    v-if="n.TypeCode == 'Num'"
                                                >
                                                    <template
                                                        v-if="n.Precision > 0"
                                                    >
                                                        <input
                                                            @input="
                                                                checkInput(
                                                                    index,
                                                                    idx,
                                                                    'DecimalValue',
                                                                    1
                                                                )
                                                            "
                                                            :disabled="
                                                                n.IsFixed
                                                            "
                                                            placeholder="请输入"
                                                            v-model="
                                                                n
                                                                    .QuestionAnswerInfo
                                                                    .DecimalValue
                                                            "
                                                        />
                                                    </template>
                                                    <template v-else>
                                                        <input
                                                            @input="
                                                                checkInput(
                                                                    index,
                                                                    idx,
                                                                    'IntValue',
                                                                    1
                                                                )
                                                            "
                                                            :disabled="
                                                                n.IsFixed
                                                            "
                                                            placeholder="请输入"
                                                            v-model="
                                                                n
                                                                    .QuestionAnswerInfo
                                                                    .IntValue
                                                            "
                                                        />
                                                    </template>
                                                </template>
                                                <template
                                                    v-else-if="
                                                        n.TypeCode == 'Text'
                                                    "
                                                >
                                                    <input
                                                        @input="
                                                            checkInput(
                                                                index,
                                                                idx,
                                                                'StrValue',
                                                                1
                                                            )
                                                        "
                                                        :disabled="n.IsFixed"
                                                        placeholder="请输入"
                                                        v-model="
                                                            n.QuestionAnswerInfo
                                                                .StrValue
                                                        "
                                                    />
                                                </template>
                                                <span class="f14 c-6d">{{
                                                    n.Suffix
                                                }}</span>
                                            </div>
                                        </div>
                                        <p class="desc" v-show="n.Description">
                                            {{ n.Description }}
                                        </p>
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
            <img class="mealDesImg" :src="dietexecexplainUrl" />
            <ul class="requireBox requireBox2 dn">
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
                        <div class="p15 rel">
                            <checkbox
                                :isMultiply="true"
                                :options="sportEvent"
                                ref="validIsCheck"
                                name="建议有氧运动项目"
                                @toparents="childByValueCheck"
                            ></checkbox>
                        </div>
                        <div class="line"></div>
                        <div class="px15 pt15">
                            <div class="rel">
                                <i
                                    v-show="adviseSportsError"
                                    class="icon iconfont icon-wuuiconsuotanhao tipsIcon tipsIcon3"
                                ></i>
                                <div class="f16 c-3a">
                                    建议运动频率与时长
                                </div>
                            </div>
                        </div>

                        <div class="panelCon">
                            <ol>
                                <li
                                    v-for="(item, index) in adviseSports"
                                    :key="index"
                                >
                                    <div class="wrap">
                                        <div class="f14 c-3a">
                                            {{ item.Name }}
                                        </div>
                                        <div class="pr10">
                                            <template v-if="item.Precision > 0">
                                                <input
                                                    type="text"
                                                    @input="
                                                        checkNum(
                                                            index,
                                                            'DecimalValue',
                                                            'adviseSports'
                                                        )
                                                    "
                                                    placeholder="请输入"
                                                    v-model="
                                                        item.QuestionAnswerInfo
                                                            .DecimalValue
                                                    "
                                                />
                                            </template>
                                            <template v-else>
                                                <input
                                                    type="text"
                                                    @input="
                                                        checkNum(
                                                            index,
                                                            'IntValue',
                                                            'adviseSports'
                                                        )
                                                    "
                                                    placeholder="请输入"
                                                    v-model="
                                                        item.QuestionAnswerInfo
                                                            .IntValue
                                                    "
                                                />
                                            </template>
                                            <span class="f14 c-6d">{{
                                                item.Suffix
                                            }}</span>
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
                        <div class="px15 pt15">
                            <div class="rel">
                                <i
                                    v-show="ZmotionError"
                                    class="icon iconfont icon-wuuiconsuotanhao tipsIcon tipsIcon3"
                                ></i>
                                <div class="f16 c-3a">
                                    建议抗阻运动项目
                                </div>
                            </div>
                        </div>
                        <div class="f12 c-6d px15 mt10">
                            APP（Keep，轻+，Fit 等）；哑铃操；健身房器械锻炼等
                        </div>
                        <div class="panelCon">
                            <ol>
                                <li
                                    v-for="(item, index) in Zmotion"
                                    :key="index"
                                >
                                    <div class="wrap">
                                        <div class="f14 c-3a">
                                            {{ item.Name }}
                                        </div>
                                        <div class="pr10">
                                            <template v-if="item.Precision > 0">
                                                <input
                                                    type="text"
                                                    @input="
                                                        checkNum(
                                                            index,
                                                            'DecimalValue',
                                                            'Zmotion'
                                                        )
                                                    "
                                                    placeholder="请输入"
                                                    v-model="
                                                        item.QuestionAnswerInfo
                                                            .DecimalValue
                                                    "
                                                />
                                            </template>
                                            <template v-else>
                                                <input
                                                    type="text"
                                                    @input="
                                                        checkNum(
                                                            index,
                                                            'IntValue',
                                                            'Zmotion'
                                                        )
                                                    "
                                                    placeholder="请输入"
                                                    v-model="
                                                        item.QuestionAnswerInfo
                                                            .IntValue
                                                    "
                                                />
                                            </template>
                                            <span class="f14 c-6d">{{
                                                item.Suffix
                                            }}</span>
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
                    <checkbox
                        :options="isReVisitingOptions"
                        name="下次复诊"
                        @toparents="childByValueCheckR"
                        ref="validIsCheckR"
                    ></checkbox>
                    <div
                        v-show="reVisitTime"
                        class="yk_wx_cell yk-wx-cell2"
                        @click="showDateFollow"
                    >
                        <div class="cell_bd flex-center rel">
                            <i
															v-show="followDateError"
                                class="icon iconfont icon-wuuiconsuotanhao tipsIcon tipsIcon6"
                            ></i>
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
                    <!-- <div class="f16 c-3a">随访计划</div> -->
                    <checkbox
                        :options="followOptions"
                        name="随访计划"
                        @toparents="childByValueCheckF"
                        ref="validIsCheckF"
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
            ref="drawerWeight"
        >
            <div>
                <div class="weightRuler">
                    <span class="f24 c-3a pl10">{{ NumValue }}</span>
                    <span class="f14 c-6d">kg</span>
                </div>
                <ruler
                    @post-NumValue="rulerNum"
                    :NowNum="1000"
                    :maxNum="4000"
                    :minNum="100"
                    :ispoint="true"
                ></ruler>
            </div>
        </drawerFoot>
        <!-- 保存模板 saveTemplate -->
        <drawerFoot
            title="保存模板"
            :display.sync="showTmp"
            :width="drawerWidth"
            :height="drawerHeight"
            @cancle="cancleTmp"
            @confirm="confirmTmp"
            ref="drawertemplate"
        >
            <div class="mx15">
                <textarea
                    v-model="templateName"
                    class="tmpTxtArea"
                    rows="3"
                    maxlength="30"
                    placeholder="输入模板名称，不超过30字"
                ></textarea>
            </div>
        </drawerFoot>
        <!-- 插入模板 start-->
        <template v-if="templatesList && templatesList.length > 0">
            <InsertTemplate
                ref="insTmp"
                :list="templatesList"
                @selGroupTmp="selGroupTmp"
                @cancle="cancleInsTmp"
                @confirm="confirmInsTmp"
            ></InsertTemplate>
        </template>
        <!-- 插入模板 end -->
    </div>
</template>

<script>
import { webApi } from '../request/env'
import ruler from '@/components/public/ruler'
import drawerFoot from '@/components/public/drawerFoot'
import checkbox from '@/components/public/checkbox'
import { yktoast, convertKey } from '../common/js/util'
import storage from '../common/js/storage'
import { formatDate } from '../common/js/date'
import InsertTemplate from '@/components/InsertTemplate'
const math = require('mathjs')
export default {
    name: 'draftPlan',
    components: { drawerFoot, ruler, checkbox, InsertTemplate },
    data() {
        return {
            planId: '', //减重方案id
            templateName: '', //模板名称
            templatesList: [], //模板列表
            selGroupTmpId: '', //选中模板id
            dietexecexplainUrl:
                webApi + '/Resource/LoseWeigthPlan/dietexecexplain.png', //食谱执行说明
            dietrequireUrl: webApi + '/Resource/LoseWeigthPlan/dietrequire.png', //饮食要求
            planSupply: {
                energy: '', //能量
                protein: '', //蛋白质
                fat: '', //脂肪
                CHO: '', //碳水化合物
                fastingSupply: '' //断食日供给量
            }, //方案供给量
            patientInfo: {}, //患者信息
            doctorInfo: {}, //医生信息
            doctorId: '', //医生id

            planInfo: {},
            sportEvent: [], //运动项目
            sportEventChecked: [], //选中的运动项目

            adviseSports: [], //建议运动
            adviseSportsError: false,
            Zmotion: [], //阻抗运动
            ZmotionError: false,
            DietQuestionnaire: {}, //方案  非断食日
            DietEkadeshQuestionnaire: {}, //轻断食断食日饮食方案

            pageIndex: 2,
            display: false, //体重弹窗
            showTmp: false, //保存模板弹窗
            drawerWidth: '100%',
            drawerHeight: '245px',
            planDate: '', //方案时间
						followDate: '请选择', //复诊时间
						followDateError:false,
            targetNum: '0.0', //减重目标
            targetNumError: false, //减重目标是否为空||‘000.0’
            tabs: [
                {
                    name: '高蛋白',
                    value: 'HighProtein'
                },
                {
                    name: '轻断食',
                    value: 'FastDiet'
                },
                {
                    name: '限能量',
                    value: 'LimitEnergy'
                }
            ], //方案类型
            activeVal: 'HighProtein',
            NumValue: 100, //瘦体重默认值
            LBW: '', //瘦体重

            imgUrl: '',

            isReVisitingOptions: [
                //下次复诊
                {
                    Name: '不需要',
                    value: false
                },
                {
                    Name: '需要',
                    value: true
                }
            ],
            IsReVisiting: false, //是否需要复诊
            reVisitTime: false, //复诊时间选择框默认隐藏
            followOptions: [
                //随访计划
                {
                    Name: '不需要',
                    value: '-1'
                },
                {
                    Name: '每周',
                    value: '7'
                },
                {
                    Name: '每月',
                    value: '30'
                }
            ],
            FollowUpVisitPlan: '' //随访周期计划 = ['0', '7', '14', '30', '90', '180', '360', '-1'],
        }
    },
    computed: {},
    filters: {},
    created() {
        if (this.pageIndex == 1) document.title = '制定减重方案'
        this.planDate = formatDate(new Date(), 'yyyy-MM-dd')
        this.getJZMZPatient()
        this.getDoctorInfoNew()
        // 方案id
        let planId = this.$route.query.planId
        if (planId) {
            this.planId = planId
            this.getPatientWeightLossPlan()
        }

        let AccountId = storage.getItem('AccountId')
        this.doctorId = AccountId
    },
    methods: {
        //子组件传递刻度表
        rulerNum(value) {
            this.NumValue = value
        },
        //刻度尺选择
        cancle() {
            console.log('点击了取消刻度尺选择')
            this.$refs.drawerWeight.closeByButton()
        },
        confirm() {
            console.log(`点击了确定刻度尺选择--${this.NumValue}`)
            this.$refs.drawerWeight.closeByButton()
            this.LBW = this.NumValue
            this.filtersPlanSupply(this.patientInfo)
        },
        getAnswerArr(array) {
            let questionInfoArr = []
            let questionGroups = array
            for (let i = 0; i < questionGroups.length; i++) {
                let array = questionGroups[i].Questions
                for (let j = 0; j < array.length; j++) {
                    // debugger
                    const element = array[j]
                    if (element.TypeCode == 'Num') {
                        //是数值
                        if (element.Precision > 0) {
                            //小数值
                            var items = {
                                DecimalValue: '',
                                QuestionID: ''
                            }
                            items.DecimalValue =
                                element.QuestionAnswerInfo.DecimalValue
                        } else {
                            //整数值
                            var items = {
                                IntValue: '',
                                QuestionID: ''
                            }
                            items.IntValue = element.QuestionAnswerInfo.IntValue
                        }
                    } else if (element.TypeCode == 'Text') {
                        //字符串
                        var items = {
                            StrValue: '',
                            QuestionID: ''
                        }
                        items.StrValue = element.QuestionAnswerInfo.DecimalValue
                    }
                    items.QuestionID = element.QuestionAnswerInfo.QuestionID
                    questionInfoArr.push(items)
                }
            }
            return questionInfoArr
            console.log(questionInfoArr)
        },
        //获取饮食方案答案数据
        getAnswerStr(typeCode) {
            // typeCode 模板类型
            if (typeCode == 'HighProtein' || typeCode == 'LimitEnergy') {
                //高蛋白、限能量饮食
                let arr = this.getAnswerArr(
                    this.DietQuestionnaire.QuestionGroups
                )
                this.DietAnswerInfoStr = JSON.stringify(arr)
                this.EkadeshDietAnswerInfoStr = ''
            } else {
                //断食日
                let arr = this.getAnswerArr(
                    this.DietQuestionnaire.QuestionGroups
                )
                let arrFasts = this.getAnswerArr(
                    this.DietEkadeshQuestionnaire.QuestionGroups
                )
                this.DietAnswerInfoStr = JSON.stringify(arr)
                this.EkadeshDietAnswerInfoStr = JSON.stringify(arrFasts)
            }
        },
        // 获取运动方案答案-有氧运动项目
        childByValueCheck(childValue) {
            if (!childValue || childValue.length <= 0) {
                this.sportEventChecked = []
                return
            }
            // childValue就是子组件传过来的值
            console.log(childValue)
            let val = childValue
            let questionID = val[0].QuestionID //题目ID
            let questionIDArr = val.map(n => n.ID)
            this.sportEventChecked = [
                {
                    QuestionID: questionID,
                    StrValue: questionIDArr.join(',')
                }
            ]
        },
        //获取运动方案答案-运动频率与时长(阻抗运动项目)
        getSportsAnswerStr(array) {
            let questionInfoArr = []
            let questionGroups = array
            for (let i = 0; i < questionGroups.length; i++) {
                const element = questionGroups[i]

                if (element.Precision > 0) {
                    //小数值
                    var items = {
                        DecimalValue: '',
                        QuestionID: ''
                    }
                    items.DecimalValue = element.QuestionAnswerInfo.DecimalValue
                } else {
                    //整数值
                    var items = {
                        IntValue: '',
                        QuestionID: ''
                    }
                    items.IntValue = element.QuestionAnswerInfo.IntValue
                }

                items.QuestionID = element.QuestionAnswerInfo.QuestionID
                questionInfoArr.push(items)
            }
            // debugger
            return questionInfoArr
            console.log(questionInfoArr)
        },

        //取消保存模板操作
        cancleTmp() {
            console.log('点击了取消保存模板')
            this.$refs.drawertemplate.closeByButton()
        },
        //保存模板
        confirmTmp() {
            console.log(`点击了确定保存模板`)
            let templateName = this.templateName
            if (!templateName) {
                yktoast('请输入模板名称')
                return
            }
            this.getAnswerStr(this.activeVal)
            // 保存减重方案模板
            var _this = this
            let AccountId = storage.getItem('AccountId')
            let url = this.api.userApi.SaveWeightLossPlanTemplate
            let data = {
                TemplateName: templateName, //模板名称
                DoctorID: AccountId, //模板制定医生ID
                HospID: this.doctorInfo.HosId, //医院ID
                TypeCode: this.activeVal, //模板类型
                DietAnswerInfoStr: this.DietAnswerInfoStr,
                EkadeshDietAnswerInfoStr: this.EkadeshDietAnswerInfoStr
            }
            console.log(data)
            this.$fetchPost(url, data, 4332).then(response => {
                let result = response.data.data //请求返回数据
                if (result.State == 0) {
                    //保存成功
                    yktoast(result.Msg)
                    this.$refs.drawertemplate.closeByButton()
                } else {
                    yktoast(result.Msg)
                }
            })
        },
        // 频率与时长控制数字键盘，仅能输入整数，且不超过3位数
        checkNum(index, type, sportDataName) {
            //let value =  this.adviseSports[index].QuestionAnswerInfo[type]
            let value = this[sportDataName][index].QuestionAnswerInfo[type]

            let convertValue
            if (value) {
                value = value.replace(/[^\d.]/g, '') //清除"数字"和"."以外的字符
                value = value.substring(0, 3)
            }
            if (value == null || value == undefined) convertValue = ''
            else if (value == '00') convertValue = 0
            else convertValue = value.replace(/[^0-9]/g, '')

            this[sportDataName][index].QuestionAnswerInfo[type] = convertValue
            if (convertValue) this[sportDataName + 'Error'] = false
        },
        //饮食方案   可以整数或小数，整数部分最多可输入4位，小数部分最多可输入1位
        //DietQuestionnaire 0||null :非断食日，1：轻断食断食日饮食方案
        checkInput(index, idx, type, isDietQuestionnaire) {
            let questionnaires = this.DietQuestionnaire
            if (isDietQuestionnaire == 1)
                questionnaires = this.DietEkadeshQuestionnaire
            let value =
                questionnaires.QuestionGroups[index].Questions[idx]
                    .QuestionAnswerInfo[type]

            let convertValue = this.dealYinShiInputVal(value)
            questionnaires.QuestionGroups[index].Questions[
                idx
            ].QuestionAnswerInfo[type] = convertValue

            if (convertValue) {
                //查找是否存在其他为空的
                let isValid = true
                this.dealYinShiInputVal(value)
                if (questionnaires.QuestionGroups[index].IsRequired) {
                    for (
                        let questionIndex = 0;
                        questionIndex <
                        questionnaires.QuestionGroups[index].Questions.length;
                        questionIndex++
                    ) {
                        //具体题目
                        let question =
                            questionnaires.QuestionGroups[index].Questions[
                                questionIndex
                            ]
                        if (!question.IsRequired) continue
                        //找到类型 DecimalValue int。。 text..
                        let type = this.getTypeName(
                            question.TypeCode,
                            question.Precision
                        )
                        //找到input值
                        let value =
                            questionnaires.QuestionGroups[index].Questions[
                                questionIndex
                            ].QuestionAnswerInfo[type]
                        if (!value || !parseFloat(value)) {
                            isValid = false
                        }
                    }
                }
                if (isValid) {
                    this.$set(
                        questionnaires.QuestionGroups[index],
                        'TargetNumError',
                        false
                    )
                }
            }
        },
        //饮食方案 校验
        dealYinShiInputVal(value) {
            if (value == null || value == undefined) return ''
            value = value.replace(/^0*(0\.|[1-9])/, '$1')
            value = value.replace(/[^\d.]/g, '') //清除"数字"和"."以外的字符
            value = value.replace(/^\./g, '') //验证第一个字符是数字而不是字符
            value = value.replace(/\.{1,}/g, '.') //只保留第一个.清除多余的
            value = value
                .replace('.', '$#$')
                .replace(/\./g, '')
                .replace('$#$', '.')
            value = value.replace(/^(\-)*(\d*)\.(\d).*$/, '$1$2.$3') //只能输入1个小数
            value =
                value.indexOf('.') > 0
                    ? value.split('.')[0].substring(0, 4) +
                      '.' +
                      value.split('.')[1]
                    : value.substring(0, 4)
            return value
        },
        oninput(e) {
            this.targetNum = this.dealInputVal(this.targetNum)
            console.log(`减重目标：${this.targetNum}`)
        },
        //阶段减重目标
        dealInputVal(value) {
            value = value.replace(/^0*(0\.|[1-9])/, '$1')
            value = value.replace(/[^\d.]/g, '') //清除"数字"和"."以外的字符
            value = value.replace(/^\./g, '') //验证第一个字符是数字而不是字符
            value = value.replace(/\.{1,}/g, '.') //只保留第一个.清除多余的
            value = value
                .replace('.', '$#$')
                .replace(/\./g, '')
                .replace('$#$', '.')
            value = value.replace(/^(\-)*(\d*)\.(\d).*$/, '$1$2.$3') //只能输入1个小数
            value =
                value.indexOf('.') > 0
                    ? value.split('.')[0].substring(0, 3) +
                      '.' +
                      value.split('.')[1]
                    : value.substring(0, 3)
            if (parseFloat(value)) this.targetNumError = false
            return value
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
                    console.log(result.data)
                    _this.doctorInfo = result.data
                } else {
                    yktoast(result)
                }
            })
        },
        //获取患者详情
        getJZMZPatient() {
            var _this = this
            let url = this.api.userApi.GetJZMZPatient
            let data = {
                patientId: this.$route.query.userId
            }
            this.$fetchGet(url, data, 4112).then(response => {
                let result = response.data.data //请求返回数据
                if (!result) {
                    yktoast(result)
                    return
                }
                //供给量
                /**  默认高蛋白
								 * 默认无瘦体重，根据标准体重开始运算供给量
									·标准体重kg=目前身高(cm)-105
									·推荐能量摄入E=标准体重*20kcal
									·蛋白质PRO=能量×30%
									·脂肪FAT=能量×30%
									·碳水化合物CHO=能量×40%
								 */
                _this.patientInfo = result
                _this.filtersPlanSupply(result)
            })
        },
        //计算供给量
        filtersPlanSupply(result) {
            // Number(math.format(a*b,14)).toFixed(1)
            const precision = 14 //num表示精度，最大为14，表示单一文本框最大的数字位数，包括小数点前后
            if (
                this.activeVal == 'HighProtein' ||
                this.activeVal == 'FastDiet'
            ) {
                //高蛋白 轻断食
                if (this.LBW > 0) {
                    //有瘦体重
                    let BMR = Number(
                        math.format(370 + 21.6 * this.LBW, precision)
                    ).toFixed(1)
                    this.planSupply.energy = Number(
                        math.format(BMR * 1.2 - 500, precision)
                    ).toFixed(1)
                    this.planSupply.protein = Number(
                        math.format(this.LBW * 2.2, precision)
                    ).toFixed(1)
                    let energy = this.planSupply.energy
                    this.planSupply.fat = Number(
                        math.format(energy * 0.3, precision)
                    ).toFixed(1)
                    this.planSupply.CHO = Number(
                        math.format(energy * 0.4, precision)
                    ).toFixed(1)
                } else {
                    //无瘦体重
                    let _basicW = Number(
                        math.format(result.Height - 105, precision)
                    ).toFixed(1) //标准体重
                    this.planSupply.energy = Number(
                        math.format(_basicW * 20, precision)
                    ).toFixed(1)
                    this.planSupply.protein = Number(
                        math.format(_basicW * 0.3, precision)
                    ).toFixed(1)
                    this.planSupply.fat = Number(
                        math.format(_basicW * 0.3, precision)
                    ).toFixed(1)
                    this.planSupply.CHO = Number(
                        math.format(_basicW * 0.4, precision)
                    ).toFixed(1)
                }

                /**
								 * 【轻断食】
									断食日
									男：推荐能量摄入E=600kcal 
									女：推荐能量摄入E=500kcal
								 */
                if (result.Sex == 0) {
                    //男
                    this.planSupply.fastingSupply = 600
                } else {
                    this.planSupply.fastingSupply = 500
                }
            } else if (this.activeVal == 'LimitEnergy') {
                //限能量
                if (this.LBW > 0) {
                    //有瘦体重
                    let BMR = Number(
                        math.format(370 + 21.6 * this.LBW, precision)
                    ).toFixed(1)
                    this.planSupply.energy = Number(
                        math.format(BMR * 1.2 - 500, precision)
                    ).toFixed(1)
                    let enery = this.planSupply.energy
                    this.planSupply.protein = Number(
                        math.format(enery * 0.2, precision)
                    ).toFixed(1)
                    this.planSupply.fat = Number(
                        math.format(enery * 0.2, precision)
                    ).toFixed(1)
                    this.planSupply.CHO = Number(
                        math.format(enery * 0.6, precision)
                    ).toFixed(1)
                } else {
                    //无瘦体重
                    let _basicW = Number(
                        math.format(result.Height - 105, precision)
                    ).toFixed(1) //标准体重
                    this.planSupply.energy = Number(
                        math.format(_basicW * 20, precision)
                    ).toFixed(1)
                    this.planSupply.protein = Number(
                        math.format(_basicW * 0.2, precision)
                    ).toFixed(1)
                    this.planSupply.fat = Number(
                        math.format(_basicW * 0.2, precision)
                    ).toFixed(1)
                    this.planSupply.CHO = Number(
                        math.format(_basicW * 0.6, precision)
                    ).toFixed(1)
                }
            }
        },
        //切换方案类型
        tabClick(e) {
            this.activeVal = e
            this.filtersPlanSupply(this.patientInfo)
        },
        //方案时间
        showDatePicker() {
            if (!this.datePicker) {
                this.datePicker = this.$createDatePicker({
                    title: '选择方案时间',
                    // min: new Date(2008, 7, 8),
                    // max: new Date(2020, 9, 20),
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
                    onCancel: this.cancelHandleF
                })
            }
            this.datePicker.show()
        },
        selectHandleF(date, selectedVal, selectedText) {
						this.followDate = selectedText.join('-')
						this.followDateError = false
            console.log(`复诊时间：${this.followDate}`)
        },
        cancelHandleF() {
            console.log('点击了取消')
        },
        //设置每一页标题
        setPageTit() {
            if (this.pageIndex == 1) document.title = '制定减重方案'
            if (this.pageIndex == 2) document.title = '饮食要求'
            if (this.pageIndex == 3) {
                if (this.activeVal == 'HighProtein') {
                    document.title = '高蛋白饮食方案'
                    return
                } else if (this.activeVal == 'FastDiet') {
                    document.title = '轻断食饮食方案'
                    return
                } else if (this.activeVal == 'LimitEnergy') {
                    document.title = '限能量饮食方案'
                    return
                }
            }
            if (this.pageIndex == 4) document.title = '食谱执行说明'
            if (this.pageIndex == 5) document.title = '运行方案'
            if (this.pageIndex == 6) document.title = '复诊与随访'
        },
        //上一步
        prevTap() {
            if (this.pageIndex > 1) this.pageIndex--
            this.setPageTit()
            console.log(`当前页码：${this.pageIndex}`)
        },
        getTypeName(code, precision) {
            let name = ''
            switch (code) {
                case 'Num':
                    if (precision > 0) name = 'DecimalValue'
                    else name = 'IntValue'
                    break
                case 'Text':
                    name = 'StrValue'
                    break
                default:
                    name = ''
            }
            return name
        },
        validQuestionnairesCommon(questionnaires) {
            let isValid = true
            //筛选必填项
            let requireQuestionGroup = questionnaires
            // .filter(
            //     n => n.IsRequired == true
            // )
            if (!requireQuestionGroup || requireQuestionGroup.length <= 0)
                return true

            //循环校验
            for (let index = 0; index < requireQuestionGroup.length; index++) {
                if (!requireQuestionGroup[index].IsRequired) continue
                if (!isValid) break
                for (
                    let questionIndex = 0;
                    questionIndex <
                    requireQuestionGroup[index].Questions.length;
                    questionIndex++
                ) {
                    //具体题目
                    let question =
                        requireQuestionGroup[index].Questions[questionIndex]
                    if (!question.IsRequired) continue
                    //找到类型 DecimalValue int。。 text..
                    let type = this.getTypeName(
                        question.TypeCode,
                        question.Precision
                    )
                    //找到input值
                    let value =
                        questionnaires[index].Questions[questionIndex]
                            .QuestionAnswerInfo[type]

                    //校验
                    if (!value || !parseFloat(value)) {
                        this.$set(
                            requireQuestionGroup[index],
                            'TargetNumError',
                            true
                        )
                        yktoast('有未填写项')
                        isValid = false
                        break
                    }
                    this.$set(
                        requireQuestionGroup[index],
                        'TargetNumError',
                        false
                    )
                }
            }
            return isValid
        },
        validYinShi2() {
            let isValid = true
            //高蛋白、限能量饮食方案
            if (
                this.activeVal == 'HighProtein' ||
                this.activeVal == 'LimitEnergy'
            ) {
                //DietQuestionnaire
                isValid = this.validQuestionnairesCommon(
                    this.DietQuestionnaire.QuestionGroups
                )
            } else if (this.activeVal == 'FastDiet') {
                //轻断食
                isValid = this.validQuestionnairesCommon(
                    this.DietQuestionnaire.QuestionGroups
                )
                if (!isValid) return isValid
                isValid = this.validQuestionnairesCommon(
                    this.DietEkadeshQuestionnaire.QuestionGroups
                )
            }
            return isValid
        },
        //下一步
        nextTap() {
            console.log(`当前页码：${this.pageIndex}`)
            // debugger
            if (this.pageIndex == 1) {
                if (!this.targetNum || !parseFloat(this.targetNum)) {
                    this.targetNumError = true
                    yktoast('有未填写项')
                    return
                }
            } else if (this.pageIndex == 2) {
                //饮食方案
                if (!this.planId) {
                    this.GetPatientEmptyWeightLossPlan() //获取空模板
                }
                this.GetPatientWeightLossPlanTemplates() //获取模板列表
            } else if (this.pageIndex == 3) {
                this.getAnswerStr(this.activeVal)
                let isValid = this.validYinShi2()
                if (!isValid) return
            } else if (this.pageIndex == 5) {
                //1、建议有氧运动项目
                let isCheck = this.$refs.validIsCheck.validIsCheck()
                if (!isCheck) {
                    yktoast('有未填写项')
                    return
                }
                //todo 20200606 方法提出来
                //2、建议运动频率与时长
                //adviseSports
                let adviseSportsValid = true
                for (
                    let adviseSportsIndex = 0;
                    adviseSportsIndex < this.adviseSports.length;
                    adviseSportsIndex++
                ) {
                    let item = this.adviseSports[adviseSportsIndex]
                    let value = item.QuestionAnswerInfo.DecimalValue
                    if (item.Precision <= 0) {
                        value = item.QuestionAnswerInfo.IntValue
                    }

                    if (!value || !parseFloat(value)) {
                        adviseSportsValid = false
                        break
                    }
                }
                if (!adviseSportsValid) {
                    this.adviseSportsError = true
                    yktoast('有未填写项')
                    return
                }
                //阻抗运动
                //Zmotion
                let ZmotionValid = true
                for (let index = 0; index < this.Zmotion.length; index++) {
                    let item = this.Zmotion[index]
                    let value = item.QuestionAnswerInfo.DecimalValue
                    if (item.Precision <= 0) {
                        value = item.QuestionAnswerInfo.IntValue
                    }

                    if (!value || !parseFloat(value)) {
                        ZmotionValid = false
                        break
                    }
                }
                if (!ZmotionValid) {
                    this.ZmotionError = true
                    yktoast('有未填写项')
                    return
                }

                let sportEvent = this.sportEventChecked //运动项目
                let sportsTime = this.getSportsAnswerStr(this.adviseSports) //运动频率与时长
                let sportsTimeZ = this.getSportsAnswerStr(this.Zmotion) //阻抗运动
                let newArr = [...sportEvent, ...sportsTime, ...sportsTimeZ]
                this.SportsAnswerInfoStr = JSON.stringify(newArr)
            }

            this.pageIndex++
            this.setPageTit()
        },
        //获取方案模板列表
        GetPatientWeightLossPlanTemplates() {
            var _this = this
            let url = this.api.userApi.GetPatientWeightLossPlanTemplates
            let data = {
                doctorId: this.doctorId,
                typeCode: this.activeVal
            }
            this.$fetchGet(url, data, 4330).then(response => {
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
                let newTmpList = convertKey(listNew, ['GroupID', 'GroupName'])
                _this.templatesList = newTmpList
            })
        },
        //取消插入模板
        cancleInsTmp() {
            console.log('取消插入模板')
        },
        //确定插入模板
        confirmInsTmp() {
            console.log('确定插入模板')
            if (!this.selGroupTmpId) {
                yktoast('请选择模板')
                return
            }
            this.$refs.insTmp.hide()
            // if (!this.selGroupTmpId) {
            //     this.GetPatientEmptyWeightLossPlan()
            //     return
            // }
            var _this = this
            let url = this.api.userApi.GetPatientWeightLossPlanTemplate
            let data = {
                templateId: this.selGroupTmpId
            }
            this.$fetchGet(url, data, 4331).then(response => {
                let result = response.data.data //请求返回数据
                if (!result) {
                    yktoast(result)
                    return
                }
                _this.DietQuestionnaire = result.DietQuestionnaire
                _this.DietEkadeshQuestionnaire = result.DietEkadeshQuestionnaire
            })
        },
        selGroupTmp(val) {
            if (val.length > 0) {
                console.log(
                    `选择的模板名称--${val[0].GroupID}--${val[0].GroupName}`
                )
                let tmpID = val[0].GroupID
                this.selGroupTmpId = tmpID
            } else {
                this.selGroupTmpId = ''
            }
        },
        //获取减重方案-编辑复制
        getPatientWeightLossPlan() {
            var _this = this
            let url = this.api.userApi.GetPatientWeightLossPlan
            let data = {
                planId: this.$route.query.planId
            }
            this.$fetchGet(url, data, 4112).then(response => {
                let result = response.data.data //请求返回数据
                if (!result) {
                    yktoast(result)
                    return
                }
                _this.planInfo = result

                _this.DietQuestionnaire = result.DietQuestionnaire
                _this.DietEkadeshQuestionnaire = result.DietEkadeshQuestionnaire

                _this.sportEvent =
                    result.SportsQuestionnaire.QuestionGroups[0].Questions[0].QuestionOptions
                _this.adviseSports =
                    result.SportsQuestionnaire.QuestionGroups[1].Questions
                _this.Zmotion =
                    result.SportsQuestionnaire.QuestionGroups[2].Questions
            })
        },
        //获取空白减重方案
        GetPatientEmptyWeightLossPlan() {
            var _this = this
            let url = this.api.userApi.GetPatientEmptyWeightLossPlan
            let data = {
                typeCode: this.activeVal
            }
            this.$fetchGet(url, data, 4112).then(response => {
                let result = response.data.data //请求返回数据
                if (result) {
                    _this.planInfo = result

                    _this.DietQuestionnaire = result.DietQuestionnaire
                    _this.DietEkadeshQuestionnaire =
                        result.DietEkadeshQuestionnaire

                    _this.sportEvent =
                        result.SportsQuestionnaire.QuestionGroups[0].Questions[0].QuestionOptions
                    _this.adviseSports =
                        result.SportsQuestionnaire.QuestionGroups[1].Questions
                    _this.Zmotion =
                        result.SportsQuestionnaire.QuestionGroups[2].Questions
                } else {
                    yktoast(result)
                }
            })
        },
        //完成
        submitTap() {
            console.log('点击完成提交')
            
            //复诊与随访 校验必填项
            //1、下次复诊
            let isCheck = this.$refs.validIsCheckR.validIsCheck()
            if (!isCheck) {
                yktoast('有未填写项')
                return
            }
            if (this.IsReVisiting && (this.followDate==''|| this.followDate == '请选择')) {
                //需要下次复诊
								yktoast('请选择复诊时间')
								this.followDateError = true
                return
						}
						this.followDateError = false
            //2、随访计划
            isCheck = this.$refs.validIsCheckF.validIsCheck()
            if (!isCheck) {
                yktoast('有未填写项')
                return
            }

            // 保存减重方案
            var _this = this
            let AccountId = storage.getItem('AccountId')
            let url = this.api.userApi.SavePatientWeightLossPlan
            let data = {
                PatientID: this.$route.query.userId, //患者ID
                DoctorID: AccountId, //方案制定医生ID
                TypeCode: this.activeVal, //方案类型
                PlanDate: this.planDate, //方案日期
                WeightLossGoals: this.targetNum, //减重目标
                LBW: this.LBW, //瘦体重
                IsReVisiting: this.IsReVisiting, //是否需要复诊 ,
                ReVisitingDate: this.followDate, //复诊时间
                FollowUpVisitPlan: this.FollowUpVisitPlan, //随访周期计划
                DietAnswerInfoStr: this.DietAnswerInfoStr, //饮食问卷答案字符
                EkadeshDietAnswerInfoStr: this.EkadeshDietAnswerInfoStr, //断食日饮食问卷答案字符
                SportsAnswerInfoStr: this.SportsAnswerInfoStr //运动问卷答案字符
            }
            this.$fetchPost(url, data, 4108).then(response => {
                let result = response.data.data //请求返回数据
                if (result) {
                    yktoast('已推送方案给患者')
                    _this.$router.go(-1)
                } else {
                    yktoast(result)
                }
            })
        },
        //插入模板
        InsertTmp() {
            this.$refs.insTmp.show()
        },
        //复诊
        childByValueCheckR(childValue) {
            console.log(childValue)
            let val = childValue[0].value
            if (val) {
								this.reVisitTime = true
								if(this.followDate&&this.followDate!='请选择') this.followDateError = false
            } else {
								this.reVisitTime = false
								this.followDate = ''
								this.followDateError = false
            }
            this.IsReVisiting = val
            console.log(`是否需要复诊：${val}`)
        },
        //随访计划 单选
        childByValueCheckF(childValue) {
            console.log(childValue)
            this.FollowUpVisitPlan = childValue[0].value
        }
    }
}
</script>

<style lang="less">
.tipsIcon {
    color: #fc7a56;
    position: absolute;
    font-size: 12px;
    left: -13px;
    top: 2px;
}
.tipsIcon2 {
    font-size: 12px !important;
    top: 2.5px;
}
.tipsIcon6 {
    top: 8px;
}
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
    &::placeholder {
        font-size: 26px;
        color: #3a3a3a;
    }
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
                    width: 80px;
                    font-size: 16px;
                    color: #3a3a3a;
                    text-align: right;
                    margin-right: 7px;
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
.mealDesImg {
    width: 100%;
}
</style>