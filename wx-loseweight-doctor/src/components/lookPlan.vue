<template>
    <div>
        <div class="pb30" v-show="planInfo">
            <div class="doctorPanel rel">
                <div class="doctorPanelCon">
                    <div class="panelTop">
                        <img class="txImg" src="../assets/tx1.png" />
                        <div class="txt">
                            <div class="">
                                <span class="f18 mr10">王晓敏</span>医生
                            </div>
                            <div class="mt10">
                                同济大学附属上海第十人民医院
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="wrapper py20 px15">
                <div class="PanelPlan1">
                    <div class="item">
                        <div class="title">阶段减重目标</div>
                        <div class="f16 c-3a b mt10">
                            减掉{{ planInfo.WeightLossPlan.WeightLossGoals }}kg
                        </div>
                    </div>
                    <div class="item">
                        <div class="line rel pl15">
                            <div class="title">减重方案</div>
                            <div class="f16 c-3a b mt10">
                                {{ planInfo.WeightLossPlan.Name }}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div v-if="planInfo.WeightLossPlan.TypeCode == 'FastDiet'">
                <!-- 轻断食 -->
                <div class="wrapper p15">
                    <div class="f16 c-3a b">非断食日供给量（日）</div>
                    <div class="PanelPlan2 mt15">
                        <div class="L">
                            <div class="f24 lh24">
                                {{ planInfo.WeightLossPlan.Energy }}
                            </div>
                            <div class="f12">大卡</div>
                        </div>
                        <div class="R">
                            <div class="itemList">
                                <div class="df">
                                    <div class="w90">蛋白质</div>
                                    <div class="f14 c-3a">
                                        {{ planInfo.WeightLossPlan.Protein }}g
                                    </div>
                                </div>
                            </div>
                            <div class="itemList">
                                <div class="df">
                                    <div class="w90">脂肪</div>
                                    <div class="f14 c-3a">
                                        {{ planInfo.WeightLossPlan.Fat }}g
                                    </div>
                                </div>
                            </div>
                            <div class="itemList">
                                <div class="df">
                                    <div class="w90">碳水化合物</div>
                                    <div class="f14 c-3a">
                                        {{ planInfo.WeightLossPlan.CHO }}g
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- 断食日  EkadeshiEnergy -->
                <div class="wrapper p15">
                    <div class="f16 c-3a b">断食日供给量（日）</div>
                    <div class="PanelPlan2 mt10">
                        <div class="L">
                            <div class="f24 lh24">
                                {{ planInfo.WeightLossPlan.EkadeshiEnergy }}
                            </div>
                            <div class="f12">大卡</div>
                        </div>
                    </div>
                </div>
            </div>
            <div v-else>
                <div class="wrapper p15">
                    <div class="f16 c-3a b">供给量（日）</div>
                    <div class="PanelPlan2 mt15">
                        <div class="L">
                            <div class="f24 lh24">
                                {{ planInfo.WeightLossPlan.Energy }}
                            </div>
                            <div class="f12">大卡</div>
                        </div>
                        <div class="R">
                            <div class="itemList">
                                <div class="df">
                                    <div class="w90">蛋白质</div>
                                    <div class="f14 c-3a">
                                        {{ planInfo.WeightLossPlan.Protein }}g
                                    </div>
                                </div>
                            </div>
                            <div class="itemList">
                                <div class="df">
                                    <div class="w90">脂肪</div>
                                    <div class="f14 c-3a">
                                        {{ planInfo.WeightLossPlan.Fat }}g
                                    </div>
                                </div>
                            </div>
                            <div class="itemList">
                                <div class="df">
                                    <div class="w90">碳水化合物</div>
                                    <div class="f14 c-3a">
                                        {{ planInfo.WeightLossPlan.CHO }}g
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="wrapper p15">
                <div class="f16 c-3a b">饮食要求</div>
                <div class="notifyDes mt15">
                    <div
                        class="txt"
                        :class="ellState ? 'ellipsis' : 'unellipsis'"
                    >
                        <div>{{ planInfo.WeightLossPlan.DietRequire }}</div>
                    </div>
                    <span
                        v-if="planInfo.WeightLossPlan.DietRequire.length > 20"
                        @click="toggleHandler(1)"
                        class="toggleTxt"
                        ><span class="spaceCon">{{
                            ellState ? '...　　　' : ''
                        }}</span
                        >{{ ellState ? '展开' : '收起' }}</span
                    >
                </div>
            </div>

            <!-- 减重食谱 -->
            <div class="wrapper p15">
                <div class="f16 c-3a b">减重食谱</div>
                <div v-if="planInfo.WeightLossPlan.TypeCode == 'FastDiet'">
                    <!-- 轻断食 -->
                    <div class="bigRecipesTabs">
                        <div class="bigNavBar">
                            <div
                                v-for="(item, index) in bigRecipesTabs"
                                :key="index"
                            >
                                <div
                                    class="item"
                                    :class="bigActiveIndex == index ? 'on' : ''"
                                    @click="BigTabClick(index)"
                                >
                                    <div class="weui-navbar__title">
                                        {{ item }}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="bigTabCon">
                            <!-- 非断食日 -->
                            <div
                                class="weui-tab recipesTabs"
                                v-show="bigActiveIndex == 0"
                            >
                                <cube-scroll
                                    ref="scroll"
                                    :data="
                                        planInfo.DietQuestionnaire
                                            .QuestionGroups
                                    "
                                    direction="horizontal"
                                    class="horizontal-scroll-list-wrap"
                                >
                                    <div class="list-wrapper">
                                        <div
                                            class="list-item"
                                            v-for="(item, index) in planInfo
                                                .DietQuestionnaire
                                                .QuestionGroups"
                                            :key="index"
                                        >
                                            <div
                                                :class="
                                                    activeIndex == index
                                                        ? 'navbar__itemOn'
                                                        : ''
                                                "
                                                class="navbar__item"
                                                @click="tabClick(index)"
                                            >
                                                {{ item.Name }}
                                            </div>
                                        </div>
                                    </div>
                                </cube-scroll>
                                <div class="tab__panel">
                                    <div
                                        v-for="(item, idx) in planInfo
                                            .DietQuestionnaire.QuestionGroups"
                                        :key="idx"
                                    >
                                        <div
                                            class="weui-tab__content"
                                            v-show="activeIndex == idx"
                                        >
                                            <div class="f14 c-6d">
                                                {{ item.Description }}
                                            </div>
                                            <div
                                                v-for="(meal,
                                                index) in item.Questions"
                                                :key="index"
                                            >
                                                <div class="df ju-between pt15">
                                                    <div>{{ meal.Name }}</div>
                                                    <div>
                                                        {{
                                                            meal.Precision > 1
                                                                ? meal
                                                                      .QuestionAnswerInfo
                                                                      .DecimalValue
                                                                : meal
                                                                      .QuestionAnswerInfo
                                                                      .IntValue
                                                        }}
                                                        {{ meal.Suffix }}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <!-- 断食日 -->
                            <div
                                class="weui-tab recipesTabs"
                                v-show="bigActiveIndex == 1"
                            >
                                <cube-scroll
                                    ref="scroll"
                                    :data="
                                        planInfo.DietQuestionnaire
                                            .QuestionGroups
                                    "
                                    direction="horizontal"
                                    class="horizontal-scroll-list-wrap"
                                >
                                    <div class="list-wrapper">
                                        <div
                                            class="list-item"
                                            v-for="(item, index) in planInfo
                                                .DietQuestionnaire
                                                .QuestionGroups"
                                            :key="index"
                                        >
                                            <div
                                                :class="
                                                    activeIndex == index
                                                        ? 'navbar__itemOn'
                                                        : ''
                                                "
                                                class="navbar__item"
                                                @click="tabClick(index)"
                                            >
                                                {{ item.Name }}
                                            </div>
                                        </div>
                                    </div>
                                </cube-scroll>
                                <div class="tab__panel">
                                    <div
                                        v-for="(item, idx) in planInfo
                                            .DietEkadeshQuestionnaire
                                            .QuestionGroups"
                                        :key="idx"
                                    >
                                        <div
                                            class="weui-tab__content"
                                            v-show="activeIndex == idx"
                                        >
                                            <div class="f14 c-6d">
                                                {{ item.Description }}
                                            </div>
                                            <div
                                                v-for="(meal,
                                                index) in item.Questions"
                                                :key="index"
                                            >
                                                <div class="df ju-between pt15">
                                                    <div>{{ meal.Name }}</div>
                                                    <div>
                                                        {{
                                                            meal.Precision > 1
                                                                ? meal
                                                                      .QuestionAnswerInfo
                                                                      .DecimalValue
                                                                : meal
                                                                      .QuestionAnswerInfo
                                                                      .IntValue
                                                        }}
                                                        {{ meal.Suffix }}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div v-else>
                    <!-- 高蛋白、限能量 -->
                    <div class="weui-tab recipesTabs">
                        <cube-scroll
                            ref="scroll"
                            :data="planInfo.DietQuestionnaire.QuestionGroups"
                            direction="horizontal"
                            class="horizontal-scroll-list-wrap"
                        >
                            <div class="list-wrapper">
                                <div
                                    class="list-item"
                                    v-for="(item, index) in planInfo
                                        .DietQuestionnaire.QuestionGroups"
                                    :key="index"
                                >
                                    <div
                                        :class="
                                            activeIndex == index
                                                ? 'navbar__itemOn'
                                                : ''
                                        "
                                        class="navbar__item"
                                        @click="tabClick(index)"
                                    >
                                        {{ item.Name }}
                                    </div>
                                </div>
                            </div>
                        </cube-scroll>
                        <div class="tab__panel">
                            <div
                                v-for="(item, idx) in planInfo.DietQuestionnaire
                                    .QuestionGroups"
                                :key="idx"
                            >
                                <div
                                    class="weui-tab__content"
                                    v-show="activeIndex == idx"
                                >
                                    <div class="f14 c-6d">
                                        {{ item.Description }}
                                    </div>
                                    <div
                                        v-for="(meal, index) in item.Questions"
                                        :key="index"
                                    >
                                        <div class="df ju-between pt15">
                                            <div>{{ meal.Name }}</div>
                                            <div>
                                                {{
                                                    meal.Precision > 1
                                                        ? meal
                                                              .QuestionAnswerInfo
                                                              .DecimalValue
                                                        : meal
                                                              .QuestionAnswerInfo
                                                              .IntValue
                                                }}
                                                {{ meal.Suffix }}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- 食谱end -->
            </div>

            <div class="wrapper p15">
                <div class="f16 c-3a b">食谱执行说明</div>
                <div class="notifyDes mt15">
                    <div
                        class="txt"
                        :class="ellState2 ? 'ellipsis' : 'unellipsis'"
                    >
                        <div>{{ planInfo.WeightLossPlan.DietExecExplain }}</div>
                    </div>
                    <span
                        v-if="
                            planInfo.WeightLossPlan.DietExecExplain.length > 20
                        "
                        @click="toggleHandler(2)"
                        class="toggleTxt"
                        ><span class="spaceCon">{{
                            ellState2 ? '...　　　' : ''
                        }}</span
                        >{{ ellState2 ? '展开' : '收起' }}</span
                    >
                </div>
            </div>
            <div class="wrapper p15">
                <div class="f16 c-3a b">运动建议</div>
                <div class="c-6d f14 mt15 lh21">
                    {{ planInfo.WeightLossPlan.SportsAdvice }}
                </div>
            </div>

            <div
                class="wrapper p15"
                v-if="planInfo.WeightLossPlan.IsReVisiting"
            >
                <div class="df ju-between">
                    <div class="f16 c-3a b">下次复诊</div>
                    <div class="timeBTn">
                        {{
                            planInfo.WeightLossPlan.ReVisitingDate
                                | formatDateStr
                        }}
                    </div>
                </div>
            </div>

            <div
                class="wrapper p15"
                v-if="planInfo.WeightLossPlan.FollowUpVisitPlan != 0"
            >
                <div class="f16 c-3a b">随访计划</div>
                <div class="c-6d f14 mt15 hl21">
                    {{ planInfo.WeightLossPlan.FollowUpPlan }}
                </div>
            </div>
        </div>

        <div class="noPlanWrapper" v-show="!planInfo">
            <div class="noPlan">
                <img class="img" src="../assets/empty@2x.png" />
                <div class="f14 c-6d mt10">该方案已被医师撤回</div>
            </div>
        </div>
    </div>
</template>

<script>
import { formatDate } from '../common/js/date'
export default {
    name: 'lookPlan',
    data() {
        return {
            doctorInfo: {},
            planId: '', //方案id
            planInfo: {
                WeightLossPlan: {
                    ID: '5D1A2B2EA7094B3AA1C72DCA555729FC',
                    Name: '高蛋白饮食方案',
                    PatientID: '7F05B591671E494F87DB8C6D39E3143F',
                    TypeCode: 'HighProtein',
                    PlanDate: '2020-04-29T00:00:00',
                    WeightLossGoals: 10,
                    LBW: null,
                    Energy: 800,
                    Protein: 480,
                    Fat: 160,
                    CHO: 80,
                    EkadeshiEnergy: null,
                    DietQuestionAnswerID: '95BCC1D53FB540B5AB2815D97F796414',
                    EkadeshDietQuestionAnswerID:
                        'A59B9A9D816C480090B336242243101C',
                    SportsQuestionAnswerID: '5C617911A99744DD90A212607B6A63E5',
                    DietRequire:
                        '少油清淡，植物油每天15克（一勺半）以内，每日食盐6g（1盖）以内\r\n要求减重期间不吃的食物：\r\n含糖食物：甜饮料（有糖 / 无糖）；甜点，饼干，巧克力，蛋糕，奶油面包，糯米类粘食（汤圆、粽子、艾窝窝等）；生活中的烟、酒；\r\n高油食物：全脂奶、所有坚果、超市包装小食品、油炸油煎食物、各种“酱”（蛋黄酱、沙拉酱、面酱、炸酱、芝麻酱等）；\r\n各种高脂肉类：内脏、荤油、肥肉、排骨、浓肉汤、烧烤、麻辣烫、火腿、香肠、鸡爪、猪蹄、肉皮等\r\n',
                    DietExecExplain:
                        '1、主食、蛋白质食物、蔬菜的量都是指食材生重。100克主食 = 100克大米/白面/杂面/小米 = 100克挂面 = 100克梳打饼干 = 240克米饭 = 120克馒头/面包 = 5 X 100g 土豆/红薯/山药；每天主食一半或者1/3是粗粮。\r\n粗粮主食的做法：粗粮饭（小米饭，高粱米饭，荞麦米饭等）；二米饭；杂面煎饼；杂面条；杂面馒头 / 发糕；窝头\r\n2、蛋白质食物：【红肉】猪牛羊驴兔等 【白肉】鸡鸭鱼虾等，豆腐，豆干。\r\n100克蛋白质食物 = 100克纯瘦肉 = 2 X 100克豆腐 = 2个鸡蛋 = 2 X 250毫升牛奶\r\n·午餐可以吃红肉，晚餐尽量吃白肉。\r\n3、新鲜蔬菜：每天总量1斤（500克以上）\r\n叶类菜：菠菜，芹菜，韭菜，茴香，生菜，木耳菜，苋菜，等。\r\n菇类：木耳，金针菇，香菇，杏鲍菇，海鲜菇，牛肝菌，平菇，茶树菇，等。\r\n其它：黄瓜，西红柿，西兰花，花菜，青椒，洋葱，冬瓜，等。\r\n·吃土豆 / 红薯 / 山药需要抵扣主食，100 - 150g相当于25g普通主食。\r\n4、水果\r\n优先选择苹果、梨、杏、桃、樱桃、草莓等低糖水果。\r\n芒果、榴莲、火龙果等热带水果能量比较高。\r\n西瓜适量，1斤西瓜约等于半碗饭。\r\n5、少吃 / 不吃：\r\n各种加工食品，香肠、腌肉、薯片、方便面，各种含糖饮料。\r\n肉汤，肉皮，排骨，千岛沙拉酱，奶香沙拉酱，火锅麻酱料。\r\n坚果类，如花生、瓜子、开心果、腰果。\r\n6、烹调方式：生吃，拌菜，蒸，煮，涮为主；煎炒点缀；避免油炸。尽量在家吃饭。\r\n生吃 / 果蔬汁：生菜，青椒，彩椒，洋葱，西芹菜心，苦菊，黄瓜，西红柿，紫甘蓝等\r\n焯 - 拌：菠菜，苦瓜，芹菜，菇类，小白菜，等。\r\n白灼：白灼芥蓝，白灼菜心，等。\r\n上汤：上汤鸡毛菜，上汤苋菜，等。\r\n',
                    SportsAdvice:
                        '建议有氧运动：【项目1】【项目2】。每周3~5次，每次30-60分钟，心率达到120次/分钟\r\n建议阻抗运动：APP（Keep，轻+，Fit等）；哑铃操；健身房器械锻炼等。每周3~5次，每次30-60分钟，心率达到120次/分钟\r\n',
                    FollowUpPlan: '',
                    IsReVisiting: true,
                    ReVisitingDate: '2020-05-06T00:00:00',
                    FollowUpVisitPlan: 0,
                    State: 10,
                    CreatorTime: '2020-04-29T13:07:12.673',
                    CreatorUserId: '9D2570EB472E4309B3D3C86B8968D561',
                    LastModifyTime: '2020-04-29T13:07:12.673',
                    LastModifyUserId: '9D2570EB472E4309B3D3C86B8968D561'
                },
                DietQuestionnaire: {
                    QuestionGroups: [
                        {
                            Questions: [
                                {
                                    QuestionAnswerInfo: {
                                        ID: null,
                                        QuestionAnswerID: null,
                                        QuestionID:
                                            '18903EFD3173423D997E80EEC775AD42',
                                        StrValue: null,
                                        IntValue: null,
                                        DecimalValue: null,
                                        TextValue: null
                                    },
                                    QuestionOptions: [],
                                    ID: '18903EFD3173423D997E80EEC775AD42',
                                    QuestionGroupID:
                                        'B874EA3040E842AF8BB6D87D8CEAF0E1',
                                    SignCode: null,
                                    Name: '乳清蛋白粉',
                                    TypeCode: 'Num',
                                    IsRequired: true,
                                    BindQuestionID: null,
                                    Max: null,
                                    Min: null,
                                    MaxLength: 4,
                                    MinLength: null,
                                    Precision: 1,
                                    Prefix: null,
                                    Suffix: '克',
                                    Layout: null,
                                    Placeholder: '请输入',
                                    SortID: 10,
                                    State: 10,
                                    Description: null,
                                    CreatorTime: '2020-05-07T16:42:14.927',
                                    CreatorUserId: 'Admin'
                                },
                                {
                                    QuestionAnswerInfo: {
                                        ID: null,
                                        QuestionAnswerID: null,
                                        QuestionID:
                                            '83E595864FBF4292BEB94D9FD6A17BEB',
                                        StrValue: null,
                                        IntValue: null,
                                        DecimalValue: null,
                                        TextValue: null
                                    },
                                    QuestionOptions: [],
                                    ID: '83E595864FBF4292BEB94D9FD6A17BEB',
                                    QuestionGroupID:
                                        'B874EA3040E842AF8BB6D87D8CEAF0E1',
                                    SignCode: null,
                                    Name: '（自选）鱼油胶囊（1克）',
                                    TypeCode: 'Num',
                                    IsRequired: false,
                                    BindQuestionID: null,
                                    Max: null,
                                    Min: null,
                                    MaxLength: 4,
                                    MinLength: null,
                                    Precision: 1,
                                    Prefix: null,
                                    Suffix: '粒',
                                    Layout: null,
                                    Placeholder: '（选填）',
                                    SortID: 10,
                                    State: 10,
                                    Description: null,
                                    CreatorTime: '2020-05-07T16:42:14.927',
                                    CreatorUserId: 'Admin'
                                },
                                {
                                    QuestionAnswerInfo: {
                                        ID: null,
                                        QuestionAnswerID: null,
                                        QuestionID:
                                            '6D0E724C09FC46B7860BFE159455D517',
                                        StrValue: null,
                                        IntValue: null,
                                        DecimalValue: null,
                                        TextValue: null
                                    },
                                    QuestionOptions: [],
                                    ID: '6D0E724C09FC46B7860BFE159455D517',
                                    QuestionGroupID:
                                        'B874EA3040E842AF8BB6D87D8CEAF0E1',
                                    SignCode: null,
                                    Name: '+可溶性膳食纤维',
                                    TypeCode: 'Num',
                                    IsRequired: true,
                                    BindQuestionID: null,
                                    Max: null,
                                    Min: null,
                                    MaxLength: 4,
                                    MinLength: null,
                                    Precision: 1,
                                    Prefix: null,
                                    Suffix: '克',
                                    Layout: null,
                                    Placeholder: '请输入',
                                    SortID: 20,
                                    State: 10,
                                    Description: null,
                                    CreatorTime: '2020-05-07T16:42:14.927',
                                    CreatorUserId: 'Admin'
                                },
                                {
                                    QuestionAnswerInfo: {
                                        ID: null,
                                        QuestionAnswerID: null,
                                        QuestionID:
                                            '1B5E1BBB7E30463AA4E49AD1137712FA',
                                        StrValue: null,
                                        IntValue: null,
                                        DecimalValue: null,
                                        TextValue: null
                                    },
                                    QuestionOptions: [],
                                    ID: '1B5E1BBB7E30463AA4E49AD1137712FA',
                                    QuestionGroupID:
                                        'B874EA3040E842AF8BB6D87D8CEAF0E1',
                                    SignCode: null,
                                    Name: '+温水',
                                    TypeCode: 'Num',
                                    IsRequired: true,
                                    BindQuestionID: null,
                                    Max: null,
                                    Min: null,
                                    MaxLength: 4,
                                    MinLength: null,
                                    Precision: 1,
                                    Prefix: null,
                                    Suffix: 'ml',
                                    Layout: null,
                                    Placeholder: '请输入',
                                    SortID: 30,
                                    State: 10,
                                    Description: null,
                                    CreatorTime: '2020-05-07T16:42:14.927',
                                    CreatorUserId: 'Admin'
                                },
                                {
                                    QuestionAnswerInfo: {
                                        ID: null,
                                        QuestionAnswerID: null,
                                        QuestionID:
                                            '688B3D19AA4C4628A16ED7886C8EC2F9',
                                        StrValue: null,
                                        IntValue: null,
                                        DecimalValue: null,
                                        TextValue: null
                                    },
                                    QuestionOptions: [],
                                    ID: '688B3D19AA4C4628A16ED7886C8EC2F9',
                                    QuestionGroupID:
                                        'B874EA3040E842AF8BB6D87D8CEAF0E1',
                                    SignCode: null,
                                    Name: '（自选）多种营养素制剂',
                                    TypeCode: 'Num',
                                    IsRequired: false,
                                    BindQuestionID: null,
                                    Max: null,
                                    Min: null,
                                    MaxLength: 4,
                                    MinLength: null,
                                    Precision: 1,
                                    Prefix: null,
                                    Suffix: '粒',
                                    Layout: null,
                                    Placeholder: '（选填）',
                                    SortID: 40,
                                    State: 10,
                                    Description: null,
                                    CreatorTime: '2020-05-07T16:42:14.927',
                                    CreatorUserId: 'Admin'
                                }
                            ],
                            ID: 'B874EA3040E842AF8BB6D87D8CEAF0E1',
                            QuestionnaireID: 'DCCDA7FF09794E4C99765BC8C4822E90',
                            Code: 'BF',
                            Name: '早餐',
                            SortID: 100,
                            State: 10,
                            Description: '7:30',
                            CreatorTime: '2020-05-07T16:42:14.927',
                            CreatorUserId: 'Admin'
                        },
                        {
                            Questions: [
                                {
                                    QuestionAnswerInfo: {
                                        ID: null,
                                        QuestionAnswerID: null,
                                        QuestionID:
                                            'F52B1B1C75D0425C864B8361A22A049F',
                                        StrValue: null,
                                        IntValue: null,
                                        DecimalValue: null,
                                        TextValue: null
                                    },
                                    QuestionOptions: [],
                                    ID: 'F52B1B1C75D0425C864B8361A22A049F',
                                    QuestionGroupID:
                                        '50D7A8F0A8CE42969F968403B096BAD3',
                                    SignCode: null,
                                    Name: '功能性主食',
                                    TypeCode: 'Num',
                                    IsRequired: false,
                                    BindQuestionID: null,
                                    Max: null,
                                    Min: null,
                                    MaxLength: 4,
                                    MinLength: null,
                                    Precision: 1,
                                    Prefix: null,
                                    Suffix: '克',
                                    Layout: null,
                                    Placeholder: '（选填）',
                                    SortID: 20,
                                    State: 10,
                                    Description: null,
                                    CreatorTime: '2020-05-07T16:42:14.927',
                                    CreatorUserId: 'Admin'
                                },
                                {
                                    QuestionAnswerInfo: {
                                        ID: null,
                                        QuestionAnswerID: null,
                                        QuestionID:
                                            '9E71DED1B1E24815BD44BCA8EAD5E097',
                                        StrValue: null,
                                        IntValue: null,
                                        DecimalValue: null,
                                        TextValue: null
                                    },
                                    QuestionOptions: [],
                                    ID: '9E71DED1B1E24815BD44BCA8EAD5E097',
                                    QuestionGroupID:
                                        '50D7A8F0A8CE42969F968403B096BAD3',
                                    SignCode: null,
                                    Name: '（或）水果',
                                    TypeCode: 'Num',
                                    IsRequired: false,
                                    BindQuestionID: null,
                                    Max: null,
                                    Min: null,
                                    MaxLength: 4,
                                    MinLength: null,
                                    Precision: 1,
                                    Prefix: null,
                                    Suffix: '克',
                                    Layout: null,
                                    Placeholder: '（选填）',
                                    SortID: 30,
                                    State: 10,
                                    Description: null,
                                    CreatorTime: '2020-05-07T16:42:14.927',
                                    CreatorUserId: 'Admin'
                                }
                            ],
                            ID: '50D7A8F0A8CE42969F968403B096BAD3',
                            QuestionnaireID: 'DCCDA7FF09794E4C99765BC8C4822E90',
                            Code: 'BFM1',
                            Name: '早加餐',
                            SortID: 200,
                            State: 10,
                            Description: '10:00',
                            CreatorTime: '2020-05-07T16:42:14.927',
                            CreatorUserId: 'Admin'
                        },
                        {
                            Questions: [
                                {
                                    QuestionAnswerInfo: {
                                        ID: null,
                                        QuestionAnswerID: null,
                                        QuestionID:
                                            '7657E79A925D4067870394791A56D5D2',
                                        StrValue: null,
                                        IntValue: null,
                                        DecimalValue: null,
                                        TextValue: null
                                    },
                                    QuestionOptions: [],
                                    ID: '7657E79A925D4067870394791A56D5D2',
                                    QuestionGroupID:
                                        'CFE51D3A1A62479F84C8F944847BF67B',
                                    SignCode: null,
                                    Name: '水',
                                    TypeCode: 'Num',
                                    IsRequired: false,
                                    BindQuestionID: null,
                                    Max: null,
                                    Min: null,
                                    MaxLength: 4,
                                    MinLength: null,
                                    Precision: 1,
                                    Prefix: null,
                                    Suffix: 'ml',
                                    Layout: null,
                                    Placeholder: '（选填）',
                                    SortID: 10,
                                    State: 10,
                                    Description: null,
                                    CreatorTime: '2020-05-07T16:42:14.927',
                                    CreatorUserId: 'Admin'
                                }
                            ],
                            ID: 'CFE51D3A1A62479F84C8F944847BF67B',
                            QuestionnaireID: 'DCCDA7FF09794E4C99765BC8C4822E90',
                            Code: 'BFM2',
                            Name: '早加餐',
                            SortID: 300,
                            State: 10,
                            Description: '11:30',
                            CreatorTime: '2020-05-07T16:42:14.927',
                            CreatorUserId: 'Admin'
                        },
                        {
                            Questions: [
                                {
                                    QuestionAnswerInfo: {
                                        ID: null,
                                        QuestionAnswerID: null,
                                        QuestionID:
                                            '0097CB9EB5864134BCD4B3ED67965971',
                                        StrValue: null,
                                        IntValue: null,
                                        DecimalValue: null,
                                        TextValue: null
                                    },
                                    QuestionOptions: [],
                                    ID: '0097CB9EB5864134BCD4B3ED67965971',
                                    QuestionGroupID:
                                        'F0A4DEBCB4544DC2A624F3B51147C47B',
                                    SignCode: null,
                                    Name: '主食（粗细搭配）',
                                    TypeCode: 'Num',
                                    IsRequired: true,
                                    BindQuestionID: null,
                                    Max: null,
                                    Min: null,
                                    MaxLength: 4,
                                    MinLength: null,
                                    Precision: 1,
                                    Prefix: null,
                                    Suffix: '克',
                                    Layout: null,
                                    Placeholder: '请输入',
                                    SortID: 10,
                                    State: 10,
                                    Description: null,
                                    CreatorTime: '2020-05-07T16:42:14.927',
                                    CreatorUserId: 'Admin'
                                },
                                {
                                    QuestionAnswerInfo: {
                                        ID: null,
                                        QuestionAnswerID: null,
                                        QuestionID:
                                            '6A58F8A82B99432BB38C8E1D2471A3E0',
                                        StrValue: null,
                                        IntValue: null,
                                        DecimalValue: null,
                                        TextValue: null
                                    },
                                    QuestionOptions: [],
                                    ID: '6A58F8A82B99432BB38C8E1D2471A3E0',
                                    QuestionGroupID:
                                        'F0A4DEBCB4544DC2A624F3B51147C47B',
                                    SignCode: null,
                                    Name: '蛋白质类食物',
                                    TypeCode: 'Num',
                                    IsRequired: true,
                                    BindQuestionID: null,
                                    Max: null,
                                    Min: null,
                                    MaxLength: 4,
                                    MinLength: null,
                                    Precision: 1,
                                    Prefix: null,
                                    Suffix: '克',
                                    Layout: null,
                                    Placeholder: '请输入',
                                    SortID: 20,
                                    State: 10,
                                    Description:
                                        '瘦肉50克=1个鸡蛋或豆腐100克或豆干50克',
                                    CreatorTime: '2020-05-07T16:42:14.927',
                                    CreatorUserId: 'Admin'
                                },
                                {
                                    QuestionAnswerInfo: {
                                        ID: null,
                                        QuestionAnswerID: null,
                                        QuestionID:
                                            '9B1E7376F6F8450D8E1AAD7B4D1BEAC9',
                                        StrValue: null,
                                        IntValue: null,
                                        DecimalValue: null,
                                        TextValue: null
                                    },
                                    QuestionOptions: [],
                                    ID: '9B1E7376F6F8450D8E1AAD7B4D1BEAC9',
                                    QuestionGroupID:
                                        'F0A4DEBCB4544DC2A624F3B51147C47B',
                                    SignCode: null,
                                    Name: '蔬菜（合计）',
                                    TypeCode: 'Num',
                                    IsRequired: true,
                                    BindQuestionID: null,
                                    Max: null,
                                    Min: null,
                                    MaxLength: 4,
                                    MinLength: null,
                                    Precision: 1,
                                    Prefix: null,
                                    Suffix: '克',
                                    Layout: null,
                                    Placeholder: '请输入',
                                    SortID: 30,
                                    State: 10,
                                    Description: null,
                                    CreatorTime: '2020-05-07T16:42:14.927',
                                    CreatorUserId: 'Admin'
                                },
                                {
                                    QuestionAnswerInfo: {
                                        ID: null,
                                        QuestionAnswerID: null,
                                        QuestionID:
                                            '427ADDFCD28A48788AC968F7816B7B5D',
                                        StrValue: null,
                                        IntValue: null,
                                        DecimalValue: null,
                                        TextValue: null
                                    },
                                    QuestionOptions: [],
                                    ID: '427ADDFCD28A48788AC968F7816B7B5D',
                                    QuestionGroupID:
                                        'F0A4DEBCB4544DC2A624F3B51147C47B',
                                    SignCode: null,
                                    Name: '新鲜叶类蔬菜',
                                    TypeCode: 'Num',
                                    IsRequired: true,
                                    BindQuestionID: null,
                                    Max: null,
                                    Min: null,
                                    MaxLength: 4,
                                    MinLength: null,
                                    Precision: 1,
                                    Prefix: null,
                                    Suffix: '克',
                                    Layout: null,
                                    Placeholder: '请输入',
                                    SortID: 40,
                                    State: 10,
                                    Description: null,
                                    CreatorTime: '2020-05-07T16:42:14.927',
                                    CreatorUserId: 'Admin'
                                },
                                {
                                    QuestionAnswerInfo: {
                                        ID: null,
                                        QuestionAnswerID: null,
                                        QuestionID:
                                            '4B9A104259734FCDAF9756BB5D9A3FC4',
                                        StrValue: null,
                                        IntValue: null,
                                        DecimalValue: null,
                                        TextValue: null
                                    },
                                    QuestionOptions: [],
                                    ID: '4B9A104259734FCDAF9756BB5D9A3FC4',
                                    QuestionGroupID:
                                        'F0A4DEBCB4544DC2A624F3B51147C47B',
                                    SignCode: null,
                                    Name: '新鲜菇类',
                                    TypeCode: 'Num',
                                    IsRequired: true,
                                    BindQuestionID: null,
                                    Max: null,
                                    Min: null,
                                    MaxLength: 4,
                                    MinLength: null,
                                    Precision: 1,
                                    Prefix: null,
                                    Suffix: '克',
                                    Layout: null,
                                    Placeholder: '请输入',
                                    SortID: 50,
                                    State: 10,
                                    Description: null,
                                    CreatorTime: '2020-05-07T16:42:14.927',
                                    CreatorUserId: 'Admin'
                                }
                            ],
                            ID: 'F0A4DEBCB4544DC2A624F3B51147C47B',
                            QuestionnaireID: 'DCCDA7FF09794E4C99765BC8C4822E90',
                            Code: 'L',
                            Name: '午餐',
                            SortID: 400,
                            State: 10,
                            Description: '12:00',
                            CreatorTime: '2020-05-07T16:42:14.927',
                            CreatorUserId: 'Admin'
                        },
                        {
                            Questions: [
                                {
                                    QuestionAnswerInfo: {
                                        ID: null,
                                        QuestionAnswerID: null,
                                        QuestionID:
                                            'B1C417B9B0A94E6FB434B7A183A4B0C2',
                                        StrValue: null,
                                        IntValue: null,
                                        DecimalValue: null,
                                        TextValue: null
                                    },
                                    QuestionOptions: [],
                                    ID: 'B1C417B9B0A94E6FB434B7A183A4B0C2',
                                    QuestionGroupID:
                                        '213425839D4547B3BDBAED99EDE733E0',
                                    SignCode: null,
                                    Name: '乳清蛋白粉',
                                    TypeCode: 'Num',
                                    IsRequired: false,
                                    BindQuestionID: null,
                                    Max: null,
                                    Min: null,
                                    MaxLength: 4,
                                    MinLength: null,
                                    Precision: 1,
                                    Prefix: null,
                                    Suffix: '克',
                                    Layout: null,
                                    Placeholder: '（选填）',
                                    SortID: 10,
                                    State: 10,
                                    Description: null,
                                    CreatorTime: '2020-05-07T16:42:14.927',
                                    CreatorUserId: 'Admin'
                                },
                                {
                                    QuestionAnswerInfo: {
                                        ID: null,
                                        QuestionAnswerID: null,
                                        QuestionID:
                                            '96B525F95B6E4335A34F8AE2D712B793',
                                        StrValue: null,
                                        IntValue: null,
                                        DecimalValue: null,
                                        TextValue: null
                                    },
                                    QuestionOptions: [],
                                    ID: '96B525F95B6E4335A34F8AE2D712B793',
                                    QuestionGroupID:
                                        '213425839D4547B3BDBAED99EDE733E0',
                                    SignCode: null,
                                    Name: '+可溶性膳食纤维',
                                    TypeCode: 'Num',
                                    IsRequired: false,
                                    BindQuestionID: null,
                                    Max: null,
                                    Min: null,
                                    MaxLength: 4,
                                    MinLength: null,
                                    Precision: 1,
                                    Prefix: null,
                                    Suffix: '克',
                                    Layout: null,
                                    Placeholder: '（选填）',
                                    SortID: 20,
                                    State: 10,
                                    Description: null,
                                    CreatorTime: '2020-05-07T16:42:14.927',
                                    CreatorUserId: 'Admin'
                                },
                                {
                                    QuestionAnswerInfo: {
                                        ID: null,
                                        QuestionAnswerID: null,
                                        QuestionID:
                                            'D9C8EEF0E0A6473D8E473455E0F7C943',
                                        StrValue: null,
                                        IntValue: null,
                                        DecimalValue: null,
                                        TextValue: null
                                    },
                                    QuestionOptions: [],
                                    ID: 'D9C8EEF0E0A6473D8E473455E0F7C943',
                                    QuestionGroupID:
                                        '213425839D4547B3BDBAED99EDE733E0',
                                    SignCode: null,
                                    Name: '温水',
                                    TypeCode: 'Num',
                                    IsRequired: false,
                                    BindQuestionID: null,
                                    Max: null,
                                    Min: null,
                                    MaxLength: 4,
                                    MinLength: null,
                                    Precision: 1,
                                    Prefix: null,
                                    Suffix: 'ml',
                                    Layout: null,
                                    Placeholder: '（选填）',
                                    SortID: 30,
                                    State: 10,
                                    Description: null,
                                    CreatorTime: '2020-05-07T16:42:14.927',
                                    CreatorUserId: 'Admin'
                                }
                            ],
                            ID: '213425839D4547B3BDBAED99EDE733E0',
                            QuestionnaireID: 'DCCDA7FF09794E4C99765BC8C4822E90',
                            Code: 'LM',
                            Name: '午加餐',
                            SortID: 500,
                            State: 10,
                            Description: '16:30',
                            CreatorTime: '2020-05-07T16:42:14.927',
                            CreatorUserId: 'Admin'
                        },
                        {
                            Questions: [
                                {
                                    QuestionAnswerInfo: {
                                        ID: null,
                                        QuestionAnswerID: null,
                                        QuestionID:
                                            'BE7BA533388A4B5FBBF4A992D03F7A5C',
                                        StrValue: null,
                                        IntValue: null,
                                        DecimalValue: null,
                                        TextValue: null
                                    },
                                    QuestionOptions: [],
                                    ID: 'BE7BA533388A4B5FBBF4A992D03F7A5C',
                                    QuestionGroupID:
                                        '4A3D9BC264264749BE80DFAD2DF497A7',
                                    SignCode: null,
                                    Name: '主食（粗细搭配）',
                                    TypeCode: 'Num',
                                    IsRequired: true,
                                    BindQuestionID: null,
                                    Max: null,
                                    Min: null,
                                    MaxLength: 4,
                                    MinLength: null,
                                    Precision: 1,
                                    Prefix: null,
                                    Suffix: '克',
                                    Layout: null,
                                    Placeholder: '请输入',
                                    SortID: 10,
                                    State: 10,
                                    Description: null,
                                    CreatorTime: '2020-05-07T16:42:14.927',
                                    CreatorUserId: 'Admin'
                                },
                                {
                                    QuestionAnswerInfo: {
                                        ID: null,
                                        QuestionAnswerID: null,
                                        QuestionID:
                                            '1030410CF2A542D2B30B4540B5A98BEA',
                                        StrValue: null,
                                        IntValue: null,
                                        DecimalValue: null,
                                        TextValue: null
                                    },
                                    QuestionOptions: [],
                                    ID: '1030410CF2A542D2B30B4540B5A98BEA',
                                    QuestionGroupID:
                                        '4A3D9BC264264749BE80DFAD2DF497A7',
                                    SignCode: null,
                                    Name: '蛋白质类食物',
                                    TypeCode: 'Num',
                                    IsRequired: true,
                                    BindQuestionID: null,
                                    Max: null,
                                    Min: null,
                                    MaxLength: 4,
                                    MinLength: null,
                                    Precision: 1,
                                    Prefix: null,
                                    Suffix: '克',
                                    Layout: null,
                                    Placeholder: '请输入',
                                    SortID: 20,
                                    State: 10,
                                    Description:
                                        '瘦肉50克=1个鸡蛋或豆腐100克或豆干50克',
                                    CreatorTime: '2020-05-07T16:42:14.927',
                                    CreatorUserId: 'Admin'
                                },
                                {
                                    QuestionAnswerInfo: {
                                        ID: null,
                                        QuestionAnswerID: null,
                                        QuestionID:
                                            '7A7BA6D83D7B4D67BFC8A6F9C4E848F3',
                                        StrValue: null,
                                        IntValue: null,
                                        DecimalValue: null,
                                        TextValue: null
                                    },
                                    QuestionOptions: [],
                                    ID: '7A7BA6D83D7B4D67BFC8A6F9C4E848F3',
                                    QuestionGroupID:
                                        '4A3D9BC264264749BE80DFAD2DF497A7',
                                    SignCode: null,
                                    Name: '蔬菜（合计）',
                                    TypeCode: 'Num',
                                    IsRequired: true,
                                    BindQuestionID: null,
                                    Max: null,
                                    Min: null,
                                    MaxLength: 4,
                                    MinLength: null,
                                    Precision: 1,
                                    Prefix: null,
                                    Suffix: '克',
                                    Layout: null,
                                    Placeholder: '请输入',
                                    SortID: 30,
                                    State: 10,
                                    Description: null,
                                    CreatorTime: '2020-05-07T16:42:14.927',
                                    CreatorUserId: 'Admin'
                                },
                                {
                                    QuestionAnswerInfo: {
                                        ID: null,
                                        QuestionAnswerID: null,
                                        QuestionID:
                                            '9E76D66C75F14158971463223A04D7E1',
                                        StrValue: null,
                                        IntValue: null,
                                        DecimalValue: null,
                                        TextValue: null
                                    },
                                    QuestionOptions: [],
                                    ID: '9E76D66C75F14158971463223A04D7E1',
                                    QuestionGroupID:
                                        '4A3D9BC264264749BE80DFAD2DF497A7',
                                    SignCode: null,
                                    Name: '新鲜叶类蔬菜',
                                    TypeCode: 'Num',
                                    IsRequired: true,
                                    BindQuestionID: null,
                                    Max: null,
                                    Min: null,
                                    MaxLength: 4,
                                    MinLength: null,
                                    Precision: 1,
                                    Prefix: null,
                                    Suffix: '克',
                                    Layout: null,
                                    Placeholder: '请输入',
                                    SortID: 40,
                                    State: 10,
                                    Description: null,
                                    CreatorTime: '2020-05-07T16:42:14.927',
                                    CreatorUserId: 'Admin'
                                },
                                {
                                    QuestionAnswerInfo: {
                                        ID: null,
                                        QuestionAnswerID: null,
                                        QuestionID:
                                            'E9F4A76396D64FD698233F728A0C4D28',
                                        StrValue: null,
                                        IntValue: null,
                                        DecimalValue: null,
                                        TextValue: null
                                    },
                                    QuestionOptions: [],
                                    ID: 'E9F4A76396D64FD698233F728A0C4D28',
                                    QuestionGroupID:
                                        '4A3D9BC264264749BE80DFAD2DF497A7',
                                    SignCode: null,
                                    Name: '新鲜菇类',
                                    TypeCode: 'Num',
                                    IsRequired: true,
                                    BindQuestionID: null,
                                    Max: null,
                                    Min: null,
                                    MaxLength: 4,
                                    MinLength: null,
                                    Precision: 1,
                                    Prefix: null,
                                    Suffix: '克',
                                    Layout: null,
                                    Placeholder: '请输入',
                                    SortID: 50,
                                    State: 10,
                                    Description: null,
                                    CreatorTime: '2020-05-07T16:42:14.927',
                                    CreatorUserId: 'Admin'
                                },
                                {
                                    QuestionAnswerInfo: {
                                        ID: null,
                                        QuestionAnswerID: null,
                                        QuestionID:
                                            'F2311A16C788430E95A53ECA1012D9CC',
                                        StrValue: null,
                                        IntValue: null,
                                        DecimalValue: null,
                                        TextValue: null
                                    },
                                    QuestionOptions: [],
                                    ID: 'F2311A16C788430E95A53ECA1012D9CC',
                                    QuestionGroupID:
                                        '4A3D9BC264264749BE80DFAD2DF497A7',
                                    SignCode: null,
                                    Name: '（自选）多种营养素制剂',
                                    TypeCode: 'Num',
                                    IsRequired: false,
                                    BindQuestionID: null,
                                    Max: null,
                                    Min: null,
                                    MaxLength: 4,
                                    MinLength: null,
                                    Precision: 1,
                                    Prefix: null,
                                    Suffix: '粒',
                                    Layout: null,
                                    Placeholder: '（选填）',
                                    SortID: 60,
                                    State: 10,
                                    Description: null,
                                    CreatorTime: '2020-05-07T16:42:14.927',
                                    CreatorUserId: 'Admin'
                                },
                                {
                                    QuestionAnswerInfo: {
                                        ID: null,
                                        QuestionAnswerID: null,
                                        QuestionID:
                                            '8D79BBDAA89F48C79B3D1A3179F5374E',
                                        StrValue: null,
                                        IntValue: null,
                                        DecimalValue: null,
                                        TextValue: null
                                    },
                                    QuestionOptions: [],
                                    ID: '8D79BBDAA89F48C79B3D1A3179F5374E',
                                    QuestionGroupID:
                                        '4A3D9BC264264749BE80DFAD2DF497A7',
                                    SignCode: null,
                                    Name: '（自选）鱼油胶囊（1克）',
                                    TypeCode: 'Num',
                                    IsRequired: false,
                                    BindQuestionID: null,
                                    Max: null,
                                    Min: null,
                                    MaxLength: 4,
                                    MinLength: null,
                                    Precision: 1,
                                    Prefix: null,
                                    Suffix: '粒',
                                    Layout: null,
                                    Placeholder: '（选填）',
                                    SortID: 70,
                                    State: 10,
                                    Description: null,
                                    CreatorTime: '2020-05-07T16:42:14.927',
                                    CreatorUserId: 'Admin'
                                }
                            ],
                            ID: '4A3D9BC264264749BE80DFAD2DF497A7',
                            QuestionnaireID: 'DCCDA7FF09794E4C99765BC8C4822E90',
                            Code: 'D',
                            Name: '晚餐',
                            SortID: 600,
                            State: 10,
                            Description: '18:30',
                            CreatorTime: '2020-05-07T16:42:14.927',
                            CreatorUserId: 'Admin'
                        },
                        {
                            Questions: [
                                {
                                    QuestionAnswerInfo: {
                                        ID: null,
                                        QuestionAnswerID: null,
                                        QuestionID:
                                            '3BA61BD36F464D36AFB0959E5AC7E738',
                                        StrValue: null,
                                        IntValue: null,
                                        DecimalValue: null,
                                        TextValue: null
                                    },
                                    QuestionOptions: [],
                                    ID: '3BA61BD36F464D36AFB0959E5AC7E738',
                                    QuestionGroupID:
                                        'D7675501B1A64683928F94AC1B2DFD64',
                                    SignCode: null,
                                    Name: '水果',
                                    TypeCode: 'Num',
                                    IsRequired: false,
                                    BindQuestionID: null,
                                    Max: null,
                                    Min: null,
                                    MaxLength: 4,
                                    MinLength: null,
                                    Precision: 1,
                                    Prefix: null,
                                    Suffix: '克',
                                    Layout: null,
                                    Placeholder: '（选填）',
                                    SortID: 10,
                                    State: 10,
                                    Description: null,
                                    CreatorTime: '2020-05-07T16:42:14.927',
                                    CreatorUserId: 'Admin'
                                },
                                {
                                    QuestionAnswerInfo: {
                                        ID: null,
                                        QuestionAnswerID: null,
                                        QuestionID:
                                            'EAE38387C809451BACAA8DAC8FAF616B',
                                        StrValue: null,
                                        IntValue: null,
                                        DecimalValue: null,
                                        TextValue: null
                                    },
                                    QuestionOptions: [],
                                    ID: 'EAE38387C809451BACAA8DAC8FAF616B',
                                    QuestionGroupID:
                                        'D7675501B1A64683928F94AC1B2DFD64',
                                    SignCode: null,
                                    Name: '低脂/脱脂酸奶',
                                    TypeCode: 'Num',
                                    IsRequired: false,
                                    BindQuestionID: null,
                                    Max: null,
                                    Min: null,
                                    MaxLength: 4,
                                    MinLength: null,
                                    Precision: 1,
                                    Prefix: null,
                                    Suffix: '克',
                                    Layout: null,
                                    Placeholder: '（选填）',
                                    SortID: 20,
                                    State: 10,
                                    Description: null,
                                    CreatorTime: '2020-05-07T16:42:14.927',
                                    CreatorUserId: 'Admin'
                                },
                                {
                                    QuestionAnswerInfo: {
                                        ID: null,
                                        QuestionAnswerID: null,
                                        QuestionID:
                                            'A4558AB8555B49F2B098ED291BADC7BE',
                                        StrValue: null,
                                        IntValue: null,
                                        DecimalValue: null,
                                        TextValue: null
                                    },
                                    QuestionOptions: [],
                                    ID: 'A4558AB8555B49F2B098ED291BADC7BE',
                                    QuestionGroupID:
                                        'D7675501B1A64683928F94AC1B2DFD64',
                                    SignCode: null,
                                    Name: '功能性主食',
                                    TypeCode: 'Num',
                                    IsRequired: false,
                                    BindQuestionID: null,
                                    Max: null,
                                    Min: null,
                                    MaxLength: 4,
                                    MinLength: null,
                                    Precision: 1,
                                    Prefix: null,
                                    Suffix: '克',
                                    Layout: null,
                                    Placeholder: '（选填）',
                                    SortID: 30,
                                    State: 10,
                                    Description: null,
                                    CreatorTime: '2020-05-07T16:42:14.927',
                                    CreatorUserId: 'Admin'
                                }
                            ],
                            ID: 'D7675501B1A64683928F94AC1B2DFD64',
                            QuestionnaireID: 'DCCDA7FF09794E4C99765BC8C4822E90',
                            Code: 'DM',
                            Name: '晚加餐',
                            SortID: 700,
                            State: 10,
                            Description: '睡前',
                            CreatorTime: '2020-05-07T16:42:14.927',
                            CreatorUserId: 'Admin'
                        },
                        {
                            Questions: [
                                {
                                    QuestionAnswerInfo: {
                                        ID: null,
                                        QuestionAnswerID: null,
                                        QuestionID:
                                            '408F6A33B7674D22B9823E60D2FC6B11',
                                        StrValue: null,
                                        IntValue: null,
                                        DecimalValue: null,
                                        TextValue: null
                                    },
                                    QuestionOptions: [],
                                    ID: '408F6A33B7674D22B9823E60D2FC6B11',
                                    QuestionGroupID:
                                        '8D7522F4AB884D9C94DD0571E32E45CE',
                                    SignCode: null,
                                    Name: '全天饮水量',
                                    TypeCode: 'Num',
                                    IsRequired: false,
                                    BindQuestionID: null,
                                    Max: null,
                                    Min: null,
                                    MaxLength: 4,
                                    MinLength: null,
                                    Precision: 1,
                                    Prefix: null,
                                    Suffix: 'ml',
                                    Layout: null,
                                    Placeholder: '（选填）',
                                    SortID: 10,
                                    State: 10,
                                    Description: null,
                                    CreatorTime: '2020-05-07T16:42:14.927',
                                    CreatorUserId: 'Admin'
                                }
                            ],
                            ID: '8D7522F4AB884D9C94DD0571E32E45CE',
                            QuestionnaireID: 'DCCDA7FF09794E4C99765BC8C4822E90',
                            Code: 'WD',
                            Name: '全天饮水量',
                            SortID: 800,
                            State: 10,
                            Description: null,
                            CreatorTime: '2020-05-07T16:42:14.927',
                            CreatorUserId: 'Admin'
                        }
                    ],
                    ID: 'DCCDA7FF09794E4C99765BC8C4822E90',
                    Code: 'JZMZ_HighProtein',
                    Name: '高蛋白饮食方案',
                    State: 10,
                    Description: null,
                    CreatorTime: '2020-05-07T16:42:14.927',
                    CreatorUserId: 'Admin'
                },
                DietEkadeshQuestionnaire: null,
                SportsQuestionnaire: {
                    QuestionGroups: [
                        {
                            Questions: [
                                {
                                    QuestionAnswerInfo: {
                                        ID: null,
                                        QuestionAnswerID: null,
                                        QuestionID:
                                            '4C567B2E7D104705B5CB04DE40621757',
                                        StrValue: null,
                                        IntValue: null,
                                        DecimalValue: null,
                                        TextValue: null
                                    },
                                    QuestionOptions: [
                                        {
                                            ID:
                                                '37EE56C5B91249298BE073AEA53B8E39',
                                            QuestionID:
                                                '4C567B2E7D104705B5CB04DE40621757',
                                            SignCode: null,
                                            Name: '快走',
                                            Score: 0,
                                            RejectOptionID: null,
                                            IsHasText: false,
                                            State: 10,
                                            SortID: 10,
                                            Description: null,
                                            CreatorTime:
                                                '2020-05-07T16:42:31.37',
                                            CreatorUserId: 'Admin',
                                            checked: false
                                        },
                                        {
                                            ID:
                                                '8810F3F70B5542C0A9D01C817242F79F',
                                            QuestionID:
                                                '4C567B2E7D104705B5CB04DE40621757',
                                            SignCode: null,
                                            Name: '慢跑',
                                            Score: 0,
                                            RejectOptionID: null,
                                            IsHasText: false,
                                            State: 10,
                                            SortID: 20,
                                            Description: null,
                                            CreatorTime:
                                                '2020-05-07T16:42:31.37',
                                            CreatorUserId: 'Admin',
                                            checked: false
                                        },
                                        {
                                            ID:
                                                '7DA106DEE8B14B9D808F617FDC32B237',
                                            QuestionID:
                                                '4C567B2E7D104705B5CB04DE40621757',
                                            SignCode: null,
                                            Name: '游泳',
                                            Score: 0,
                                            RejectOptionID: null,
                                            IsHasText: false,
                                            State: 10,
                                            SortID: 30,
                                            Description: null,
                                            CreatorTime:
                                                '2020-05-07T16:42:31.37',
                                            CreatorUserId: 'Admin',
                                            checked: false
                                        },
                                        {
                                            ID:
                                                'F46344B7C05546FD8E1A7A1CA2D394BB',
                                            QuestionID:
                                                '4C567B2E7D104705B5CB04DE40621757',
                                            SignCode: null,
                                            Name: '跳绳',
                                            Score: 0,
                                            RejectOptionID: null,
                                            IsHasText: false,
                                            State: 10,
                                            SortID: 40,
                                            Description: null,
                                            CreatorTime:
                                                '2020-05-07T16:42:31.37',
                                            CreatorUserId: 'Admin',
                                            checked: false
                                        },
                                        {
                                            ID:
                                                '51631EF5981649C782B56B89FCFCA96B',
                                            QuestionID:
                                                '4C567B2E7D104705B5CB04DE40621757',
                                            SignCode: null,
                                            Name: '健身车',
                                            Score: 0,
                                            RejectOptionID: null,
                                            IsHasText: false,
                                            State: 10,
                                            SortID: 50,
                                            Description: null,
                                            CreatorTime:
                                                '2020-05-07T16:42:31.37',
                                            CreatorUserId: 'Admin',
                                            checked: false
                                        },
                                        {
                                            ID:
                                                '2B16371A78D34036BD0FC3B72D6A2DEB',
                                            QuestionID:
                                                '4C567B2E7D104705B5CB04DE40621757',
                                            SignCode: null,
                                            Name: '瑜伽',
                                            Score: 0,
                                            RejectOptionID: null,
                                            IsHasText: false,
                                            State: 10,
                                            SortID: 60,
                                            Description: null,
                                            CreatorTime:
                                                '2020-05-07T16:42:31.37',
                                            CreatorUserId: 'Admin',
                                            checked: false
                                        },
                                        {
                                            ID:
                                                'DF6028700DA8406F8E8E3BF57E21386E',
                                            QuestionID:
                                                '4C567B2E7D104705B5CB04DE40621757',
                                            SignCode: null,
                                            Name: '哑铃操',
                                            Score: 0,
                                            RejectOptionID: null,
                                            IsHasText: false,
                                            State: 10,
                                            SortID: 70,
                                            Description: null,
                                            CreatorTime:
                                                '2020-05-07T16:42:31.37',
                                            CreatorUserId: 'Admin',
                                            checked: false
                                        },
                                        {
                                            ID:
                                                '9CCB144D1B434388B0C914E61CACFD48',
                                            QuestionID:
                                                '4C567B2E7D104705B5CB04DE40621757',
                                            SignCode: null,
                                            Name: '健身操',
                                            Score: 0,
                                            RejectOptionID: null,
                                            IsHasText: false,
                                            State: 10,
                                            SortID: 80,
                                            Description: null,
                                            CreatorTime:
                                                '2020-05-07T16:42:31.37',
                                            CreatorUserId: 'Admin',
                                            checked: false
                                        },
                                        {
                                            ID:
                                                '4046316D35D94BF7848E186A63C56FEB',
                                            QuestionID:
                                                '4C567B2E7D104705B5CB04DE40621757',
                                            SignCode: null,
                                            Name: '拉力绳',
                                            Score: 0,
                                            RejectOptionID: null,
                                            IsHasText: false,
                                            State: 10,
                                            SortID: 90,
                                            Description: null,
                                            CreatorTime:
                                                '2020-05-07T16:42:31.37',
                                            CreatorUserId: 'Admin',
                                            checked: false
                                        },
                                        {
                                            ID:
                                                'EB88C903287848E4B95A2599C158EC2D',
                                            QuestionID:
                                                '4C567B2E7D104705B5CB04DE40621757',
                                            SignCode: null,
                                            Name: '广场舞',
                                            Score: 0,
                                            RejectOptionID: null,
                                            IsHasText: false,
                                            State: 10,
                                            SortID: 100,
                                            Description: null,
                                            CreatorTime:
                                                '2020-05-07T16:42:31.37',
                                            CreatorUserId: 'Admin',
                                            checked: false
                                        },
                                        {
                                            ID:
                                                'B956ABC5112B471A9F9E8AB8258049AF',
                                            QuestionID:
                                                '4C567B2E7D104705B5CB04DE40621757',
                                            SignCode: null,
                                            Name: '肚皮舞',
                                            Score: 0,
                                            RejectOptionID: null,
                                            IsHasText: false,
                                            State: 10,
                                            SortID: 110,
                                            Description: null,
                                            CreatorTime:
                                                '2020-05-07T16:42:31.37',
                                            CreatorUserId: 'Admin',
                                            checked: false
                                        },
                                        {
                                            ID:
                                                '965EDF4CA5404EA983B05905CE2819AC',
                                            QuestionID:
                                                '4C567B2E7D104705B5CB04DE40621757',
                                            SignCode: null,
                                            Name: '乒乓球',
                                            Score: 0,
                                            RejectOptionID: null,
                                            IsHasText: false,
                                            State: 10,
                                            SortID: 120,
                                            Description: null,
                                            CreatorTime:
                                                '2020-05-07T16:42:31.37',
                                            CreatorUserId: 'Admin',
                                            checked: false
                                        },
                                        {
                                            ID:
                                                'E989EF09A7B140A1B825CB718963F3DE',
                                            QuestionID:
                                                '4C567B2E7D104705B5CB04DE40621757',
                                            SignCode: null,
                                            Name: '羽毛球',
                                            Score: 0,
                                            RejectOptionID: null,
                                            IsHasText: false,
                                            State: 10,
                                            SortID: 130,
                                            Description: null,
                                            CreatorTime:
                                                '2020-05-07T16:42:31.37',
                                            CreatorUserId: 'Admin',
                                            checked: false
                                        },
                                        {
                                            ID:
                                                'A5AD707AB41747B39F3D89FF5951E335',
                                            QuestionID:
                                                '4C567B2E7D104705B5CB04DE40621757',
                                            SignCode: null,
                                            Name: '网球',
                                            Score: 0,
                                            RejectOptionID: null,
                                            IsHasText: false,
                                            State: 10,
                                            SortID: 140,
                                            Description: null,
                                            CreatorTime:
                                                '2020-05-07T16:42:31.37',
                                            CreatorUserId: 'Admin',
                                            checked: false
                                        },
                                        {
                                            ID:
                                                '72214703492A4040B4755DECA59DA99E',
                                            QuestionID:
                                                '4C567B2E7D104705B5CB04DE40621757',
                                            SignCode: null,
                                            Name: '篮球',
                                            Score: 0,
                                            RejectOptionID: null,
                                            IsHasText: false,
                                            State: 10,
                                            SortID: 150,
                                            Description: null,
                                            CreatorTime:
                                                '2020-05-07T16:42:31.37',
                                            CreatorUserId: 'Admin',
                                            checked: false
                                        },
                                        {
                                            ID:
                                                '6F424090C2BA485ABDE8CDAABE25BE9C',
                                            QuestionID:
                                                '4C567B2E7D104705B5CB04DE40621757',
                                            SignCode: null,
                                            Name: '排球',
                                            Score: 0,
                                            RejectOptionID: null,
                                            IsHasText: false,
                                            State: 10,
                                            SortID: 160,
                                            Description: null,
                                            CreatorTime:
                                                '2020-05-07T16:42:31.37',
                                            CreatorUserId: 'Admin',
                                            checked: false
                                        },
                                        {
                                            ID:
                                                '5E28020F212F4BD682E1F40D04343BAD',
                                            QuestionID:
                                                '4C567B2E7D104705B5CB04DE40621757',
                                            SignCode: null,
                                            Name: '跆拳道',
                                            Score: 0,
                                            RejectOptionID: null,
                                            IsHasText: false,
                                            State: 10,
                                            SortID: 170,
                                            Description: null,
                                            CreatorTime:
                                                '2020-05-07T16:42:31.37',
                                            CreatorUserId: 'Admin',
                                            checked: false
                                        },
                                        {
                                            ID:
                                                'A1308D9DA7FC46AB8304C9773F4C209B',
                                            QuestionID:
                                                '4C567B2E7D104705B5CB04DE40621757',
                                            SignCode: null,
                                            Name: '拳击',
                                            Score: 0,
                                            RejectOptionID: null,
                                            IsHasText: false,
                                            State: 10,
                                            SortID: 180,
                                            Description: null,
                                            CreatorTime:
                                                '2020-05-07T16:42:31.37',
                                            CreatorUserId: 'Admin',
                                            checked: false
                                        }
                                    ],
                                    ID: '4C567B2E7D104705B5CB04DE40621757',
                                    QuestionGroupID:
                                        '9AE6DC5CBCBB4219BAA124C51217EAD2',
                                    SignCode: null,
                                    Name: '建议有氧运动项目',
                                    TypeCode: 'MultipleSelect',
                                    IsRequired: true,
                                    BindQuestionID: null,
                                    Max: null,
                                    Min: null,
                                    MaxLength: null,
                                    MinLength: null,
                                    Precision: null,
                                    Prefix: null,
                                    Suffix: null,
                                    Layout: null,
                                    Placeholder: null,
                                    SortID: 10,
                                    State: 10,
                                    Description: null,
                                    CreatorTime: '2020-05-07T16:42:31.37',
                                    CreatorUserId: 'Admin'
                                }
                            ],
                            ID: '9AE6DC5CBCBB4219BAA124C51217EAD2',
                            QuestionnaireID: '7E5044F0A99D40CABA79738C661B6D36',
                            Code: 'YY_YDXM',
                            Name: '建议有氧运动项目',
                            SortID: 100,
                            State: 10,
                            Description: null,
                            CreatorTime: '2020-05-07T16:42:31.37',
                            CreatorUserId: 'Admin'
                        },
                        {
                            Questions: [
                                {
                                    QuestionAnswerInfo: {
                                        ID: null,
                                        QuestionAnswerID: null,
                                        QuestionID:
                                            'CA9B0ADB199C451EBDFE05B44021B050',
                                        StrValue: null,
                                        IntValue: null,
                                        DecimalValue: null,
                                        TextValue: null
                                    },
                                    QuestionOptions: [],
                                    ID: 'CA9B0ADB199C451EBDFE05B44021B050',
                                    QuestionGroupID:
                                        'F14D08F133B1436A8A31AF8468F02D47',
                                    SignCode: null,
                                    Name: '每周运动',
                                    TypeCode: 'Num',
                                    IsRequired: true,
                                    BindQuestionID: null,
                                    Max: null,
                                    Min: null,
                                    MaxLength: 3,
                                    MinLength: null,
                                    Precision: 0,
                                    Prefix: null,
                                    Suffix: '次',
                                    Layout: null,
                                    Placeholder: null,
                                    SortID: 10,
                                    State: 10,
                                    Description: null,
                                    CreatorTime: '2020-05-07T16:42:31.37',
                                    CreatorUserId: 'Admin'
                                },
                                {
                                    QuestionAnswerInfo: {
                                        ID: null,
                                        QuestionAnswerID: null,
                                        QuestionID:
                                            '34CCDDE71A184C49817AAB76BC192B9A',
                                        StrValue: null,
                                        IntValue: null,
                                        DecimalValue: null,
                                        TextValue: null
                                    },
                                    QuestionOptions: [],
                                    ID: '34CCDDE71A184C49817AAB76BC192B9A',
                                    QuestionGroupID:
                                        'F14D08F133B1436A8A31AF8468F02D47',
                                    SignCode: null,
                                    Name: '每次',
                                    TypeCode: 'Num',
                                    IsRequired: true,
                                    BindQuestionID: null,
                                    Max: null,
                                    Min: null,
                                    MaxLength: 3,
                                    MinLength: null,
                                    Precision: 0,
                                    Prefix: null,
                                    Suffix: '分钟',
                                    Layout: null,
                                    Placeholder: null,
                                    SortID: 20,
                                    State: 10,
                                    Description: null,
                                    CreatorTime: '2020-05-07T16:42:31.37',
                                    CreatorUserId: 'Admin'
                                },
                                {
                                    QuestionAnswerInfo: {
                                        ID: null,
                                        QuestionAnswerID: null,
                                        QuestionID:
                                            '0F9133979C05427099231C1AC65AC026',
                                        StrValue: null,
                                        IntValue: null,
                                        DecimalValue: null,
                                        TextValue: null
                                    },
                                    QuestionOptions: [],
                                    ID: '0F9133979C05427099231C1AC65AC026',
                                    QuestionGroupID:
                                        'F14D08F133B1436A8A31AF8468F02D47',
                                    SignCode: null,
                                    Name: '心率达到',
                                    TypeCode: 'Num',
                                    IsRequired: true,
                                    BindQuestionID: null,
                                    Max: null,
                                    Min: null,
                                    MaxLength: 3,
                                    MinLength: null,
                                    Precision: 0,
                                    Prefix: null,
                                    Suffix: '次/分钟',
                                    Layout: null,
                                    Placeholder: null,
                                    SortID: 30,
                                    State: 10,
                                    Description: null,
                                    CreatorTime: '2020-05-07T16:42:31.37',
                                    CreatorUserId: 'Admin'
                                }
                            ],
                            ID: 'F14D08F133B1436A8A31AF8468F02D47',
                            QuestionnaireID: '7E5044F0A99D40CABA79738C661B6D36',
                            Code: 'YY_YDMB',
                            Name: '建议运动频率与时长',
                            SortID: 200,
                            State: 10,
                            Description: null,
                            CreatorTime: '2020-05-07T16:42:31.37',
                            CreatorUserId: 'Admin'
                        },
                        {
                            Questions: [
                                {
                                    QuestionAnswerInfo: {
                                        ID: null,
                                        QuestionAnswerID: null,
                                        QuestionID:
                                            '893353A6DA6D40FCAEBC04CE88BEBABF',
                                        StrValue: null,
                                        IntValue: null,
                                        DecimalValue: null,
                                        TextValue: null
                                    },
                                    QuestionOptions: [],
                                    ID: '893353A6DA6D40FCAEBC04CE88BEBABF',
                                    QuestionGroupID:
                                        'D266832E8B984C78A456C6E88573C3C2',
                                    SignCode: null,
                                    Name: '每次',
                                    TypeCode: 'Num',
                                    IsRequired: true,
                                    BindQuestionID: null,
                                    Max: null,
                                    Min: null,
                                    MaxLength: 3,
                                    MinLength: null,
                                    Precision: 0,
                                    Prefix: null,
                                    Suffix: '分钟',
                                    Layout: null,
                                    Placeholder: null,
                                    SortID: 10,
                                    State: 10,
                                    Description: null,
                                    CreatorTime: '2020-05-07T16:42:31.37',
                                    CreatorUserId: 'Admin'
                                },
                                {
                                    QuestionAnswerInfo: {
                                        ID: null,
                                        QuestionAnswerID: null,
                                        QuestionID:
                                            'AB298E91238D4AC1A9B378F03860AD13',
                                        StrValue: null,
                                        IntValue: null,
                                        DecimalValue: null,
                                        TextValue: null
                                    },
                                    QuestionOptions: [],
                                    ID: 'AB298E91238D4AC1A9B378F03860AD13',
                                    QuestionGroupID:
                                        'D266832E8B984C78A456C6E88573C3C2',
                                    SignCode: null,
                                    Name: '心率达到',
                                    TypeCode: 'Num',
                                    IsRequired: true,
                                    BindQuestionID: null,
                                    Max: null,
                                    Min: null,
                                    MaxLength: 3,
                                    MinLength: null,
                                    Precision: 0,
                                    Prefix: null,
                                    Suffix: '次/分钟',
                                    Layout: null,
                                    Placeholder: null,
                                    SortID: 20,
                                    State: 10,
                                    Description: null,
                                    CreatorTime: '2020-05-07T16:42:31.37',
                                    CreatorUserId: 'Admin'
                                },
                                {
                                    QuestionAnswerInfo: {
                                        ID: null,
                                        QuestionAnswerID: null,
                                        QuestionID:
                                            '776BB5F2A3614E889A14D83750B1F51D',
                                        StrValue: null,
                                        IntValue: null,
                                        DecimalValue: null,
                                        TextValue: null
                                    },
                                    QuestionOptions: [],
                                    ID: '776BB5F2A3614E889A14D83750B1F51D',
                                    QuestionGroupID:
                                        'D266832E8B984C78A456C6E88573C3C2',
                                    SignCode: null,
                                    Name: '每周运动',
                                    TypeCode: 'Num',
                                    IsRequired: true,
                                    BindQuestionID: null,
                                    Max: null,
                                    Min: null,
                                    MaxLength: 3,
                                    MinLength: null,
                                    Precision: 0,
                                    Prefix: null,
                                    Suffix: '次',
                                    Layout: null,
                                    Placeholder: null,
                                    SortID: 40,
                                    State: 10,
                                    Description: null,
                                    CreatorTime: '2020-05-07T16:42:31.37',
                                    CreatorUserId: 'Admin'
                                }
                            ],
                            ID: 'D266832E8B984C78A456C6E88573C3C2',
                            QuestionnaireID: '7E5044F0A99D40CABA79738C661B6D36',
                            Code: 'KZ_YDMB',
                            Name: '建议阻抗运动项目',
                            SortID: 300,
                            State: 10,
                            Description:
                                'APP（Keep，轻+，Fit 等）；哑铃操；健身房器械锻炼等',
                            CreatorTime: '2020-05-07T16:42:31.37',
                            CreatorUserId: 'Admin'
                        }
                    ],
                    ID: '7E5044F0A99D40CABA79738C661B6D36',
                    Code: 'JZMZ_YDFA',
                    Name: '运动方案',
                    State: 10,
                    Description: null,
                    CreatorTime: '2020-05-07T16:42:31.37',
                    CreatorUserId: 'Admin'
                }
            },

            ellState: true, // 文字是否收起，默认收起
            ellState2: true, // 文字是否收起，默认收起
            RecipesTabs: ['早餐', '加餐', '午餐', '加餐', '晚餐', '加餐'],
            activeIndex: 0,
            bigRecipesTabs: ['非断食日', '断食日'],
            bigActiveIndex: 0
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
    methods: {
        tabClick: function(e) {
            this.activeIndex = e
        },
        BigTabClick: function(e) {
            this.bigActiveIndex = e
        },
        /**
         * 收起/展开按钮点击事件
         */
        toggleHandler(e) {
            const id = e
            if (id == 1) this.ellState = !this.ellState
            if (id == 2) this.ellState2 = !this.ellState2
        }
    },
}
</script>

<style lang="less">
.wrapper {
    margin: 10px 15px;
    background: #ffffff;
    box-shadow: 0 2px 10px 0 rgba(120, 121, 164, 0.1);
    border-radius: 4px;
}
.doctorPanel {
    margin: 15px 15px 0;
    background: url(../assets/bg-img3.png) no-repeat center center;
    height: 90px;
    border-radius: 4px;
    box-sizing: border-box;
}

.doctorPanelCon {
    width: 100%;
    height: 90px;
}

.panelTop {
    display: flex;
    align-items: center;
    padding: 14px 15px;
    box-sizing: border-box;
}

.panelTop .txImg {
    width: 60px;
    height: 60px;
    border-radius: 50%;
    border: 2px solid #fff;
}

.panelTop .txt {
    color: #ffffff;
    font-size: 14px;
    padding-left: 10px;
}

.doctorPanel2 .bgImg {
    width: 100%;
    height: 90px;
    border-radius: 4px;
}

.doctorPanel2 .doctorPanelCon {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 90px;
}

.wrapper {
    margin: 10px 15px;
}

.PanelPlan1 {
    display: flex;
    align-items: center;
}

.PanelPlan1 .title {
    font-size: 14px;
    color: #6d6d6d;
    position: relative;
    padding-left: 10px;
}

.PanelPlan1 .title::before {
    content: '';
    position: absolute;
    left: 0;
    top: 0px;
    width: 3px;
    height: 14px;
    background: #7362f5;
    border-radius: 1px;
}

.PanelPlan1 .item {
    flex: 1;
}

.PanelPlan1 .item .line::before {
    content: '';
    position: absolute;
    top: 0;
    left: -15px;
    width: 1px;
    height: 50px;
    background: #e7e7f1;
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

.timeBTn {
    background: #c0bce2;
    border-radius: 12px;
    font-size: 12px;
    color: #fff;
    padding: 3px 8px;
}

.notifyDes {
    font-size: 14px;
    color: #6d6d6d;
    text-align: justify;
    line-height: 21px;
    padding: 0 0 2px;
    position: relative;
    display: flex;
    flex-direction: column;
}

.notifyDes .txt {
    line-height: 21px;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    text-overflow: ellipsis;
    overflow: hidden;
    /*通过以上四行实现收缩功能 */
}

/* 展开收缩 */
.ellipsis {
    -webkit-line-clamp: 2;
}

.unellipsis {
    -webkit-line-clamp: 0;
}

.spaceCon {
    color: #3a3a3a;
    padding-left: 3px;
}

.toggleTxt {
    font-size: 12px;
    color: #7362f5;
    background: #ffffff;
    position: absolute;
    right: 0;
    bottom: 0;
}

.recipesTabs {
    background: #f8f9fa;
    border-radius: 4px;
    padding: 0 0 15px 15px;
    margin-top: 15px;
}

.recipesTabs .navbar {
}
.horizontal-scroll-list-wrap {
    padding: 10 20px;
    .cube-scroll-content {
        display: inline-block;
        padding: 0;
    }
    .cube-scroll-list-wrapper {
        overflow: visible;
    }
    .list-wrapper {
        white-space: nowrap;
    }
    .list-item {
        position: relative;
        display: inline-block;
    }
}
.weui-navbar__item {
    padding: 15px 0;
}

.navbar__item {
    position: relative;
    font-size: 14px;
    color: #6d6d6d;
    margin-right: 30px;
    padding: 0px 0 10px;
}

.navbar__itemOn {
    color: #6049f5;
}

.navbar__itemOn::after {
    content: '';
    position: absolute;
    left: 50%;
    bottom: 0;
    margin-left: -8px;
    background: #6049f5;
    border-radius: 2px;
    width: 16px;
    height: 4px;
}

.tab__panel {
    padding: 20px 15px 5px 0;
    font-size: 14px;
    color: #3a3a3a;
    line-height: 14px;
}

.bigRecipesTabs {
    margin-top: 18px;
}

.bigNavBar {
    display: flex;
}

.bigNavBar .item {
    opacity: 0.5;
    background: #9198f7;
    font-size: 14px;
    color: #ffffff;
    padding: 3px 15px 1px 15px;
}

.bigNavBar .item:first-child {
    border-radius: 4px 0 0 0;
}

.bigNavBar .item:last-child {
    border-radius: 0 4px 0 0;
}

.bigNavBar .on {
    opacity: 1;
}

.bigTabCon {
    position: relative;
    top: -3px;
}

.bigTabCon .recipesTabs {
    margin-top: 0;
}

.tips .txt {
    display: inline-block;
    background: #c0bce2;
    border-radius: 2px;
    font-size: 12px;
    color: #ffffff;
    padding: 5px 8px;
}

.noPlanWrapper {
    position: absolute;
    display: table;
    width: 100%;
    height: 100%;
}

.noPlan {
    display: table-cell;
    text-align: center;
    vertical-align: middle;
    width: 138px;
    height: 127px;
}

.noPlan .img {
    width: 128px;
    height: 100px;
}

.assistantBox {
    padding: 12px 15px;
    background: #fff;
    border-radius: 0 0 4px 4px;
}

.assistantBox button {
    background: #7362f5;
    border: 16px 0 0 16px;
    width: 60px;
}
</style>