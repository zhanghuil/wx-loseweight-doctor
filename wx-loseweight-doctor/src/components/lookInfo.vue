<template>
    <div>
        <div class="weui-navbar">
            <div
                v-for="(item, index) in navTabs"
                :key="index"
                class="weui-navbar__item"
                :class="activeIndex == index ? 'on' : ''"
                @click="tabClick(index)"
            >
                <div class="weui-navbar__title">{{ item }}</div>
            </div>
        </div>
        <div class="weui-tab__panel">
            <div v-for="(page, idx) in questionGroups" :key="idx">
                <div class="weui-tab__content" v-show="activeIndex == idx">
                    <div v-for="(item, index) in page.Questions" :key="index">
                        <div v-if="item.SignCode == 'CurrentBMI'">
                            <!-- BMI start -->
                            <div class="wrapper p15">
                                <div class="rel">
                                    <div class="title b">BMI指标</div>
                                    <div class="bg_img"></div>
                                </div>
                                <div class="mt20">
                                    <div
                                        class="scoreVal rel"
                                        :style="{ left: leftStyle + 'px' }"
                                    >
                                        <span class="value">{{
                                            scoreBMI
                                        }}</span>
                                        <i
                                            :style="{ color: colorStyle }"
                                            class="icon iconfont icon-sanjiaojiantoushang"
                                        >
                                        </i>
                                    </div>
                                </div>
                                <div class="scoreProgress">
                                    <div
                                        class="progressList"
                                        v-for="(it, index) in progressList"
                                        :key="index"
                                    >
                                        <div class="itemList">
                                            <div
                                                v-for="(item, index) in it.grid"
                                                :key="index"
                                                class="item"
                                                :style="{
                                                    background: it.color
                                                }"
                                            ></div>
                                        </div>
                                        <div class="tit">{{ it.title }}</div>
                                    </div>
                                </div>
                            </div>
                            <!-- BMI end -->
                        </div>
                        <div wx:else>
                            <div class="wrapper py15 px15">
                                <div class="rel">
                                    <div class="title b">{{ item.Name }}</div>
                                    <div class="bg_img"></div>
                                </div>
                                <div v-if="item.SignCode == 'CurrentHeight'">
                                    <div class="txt">
                                        <span class="pr20"
                                            >{{
                                                item.QuestionAnswerInfo.IntValue
                                            }}
                                            cm</span
                                        >
                                    </div>
                                </div>
                                <div
                                    v-else-if="
                                        item.SignCode == 'CurrentWeight' ||
                                            item.SignCode == 'WishWeight'
                                    "
                                >
                                    <div class="txt">
                                        <span class="pr20"
                                            >{{
                                                item.QuestionAnswerInfo
                                                    .DecimalValue
                                            }}
                                            kg</span
                                        >
                                    </div>
                                </div>
                                <div
                                    v-else-if="
                                        item.TypeCode == 'SingleSelect' ||
                                            item.TypeCode == 'MultipleSelect'
                                    "
                                >
                                    <div class="txt">
                                        <span
                                            v-for="(n,
                                            index) in item.QuestionOptions"
                                            :key="index"
                                        >
                                            <template v-if="n.checked == true">
                                                <span class="pr20">{{
                                                    n.Name
                                                }}</span>
                                            </template>
                                        </span>
                                    </div>
                                    <!-- tools.splitStr() -->
                                </div>
                                <div
                                    v-else-if="item.TypeCode == 'SingleSelectText'"
                                >
                                    <div class="txt">
                                        <div v-for="(n,index) in item.QuestionOptions" :key="index"
                                        >
                                            <template
                                                v-if="n.checked == true"
                                            >
                                                <span class="pr20">{{
                                                    n.Name
                                                }}</span>
                                            </template>
                                        </div>
                                    </div>
                                    <template
                                        v-if="item.QuestionAnswerInfo.StrValue == item.SingleTextID"
                                    >
                                        <!-- 输入框 -->
                                        <textarea
                                            class="weui-textarea"
                                            style="width:100%;height: 4.4em"
                                            :value="item.QuestionAnswerInfo.TextValue"
                                            :disabled="true"
                                        />
                                    </template>
                                </div>
                                <!-- 饥饿感   饱腹感 -->
                                <div v-else-if="item.SignCode == 'Hunger'">
                                    <div class="txt">
                                        <span class="pr20"
                                            >{{
                                                item.QuestionAnswerInfo.IntValue
                                            }}
                                            -
                                            <span
                                                v-if="
                                                    item.QuestionAnswerInfo
                                                        .IntValue < 4
                                                "
                                                >不饥饿</span
                                            ><span
                                                v-else-if="
                                                    item.QuestionAnswerInfo
                                                        .IntValue < 8
                                                "
                                                >中等饥饿</span
                                            ><span v-else>非常饥饿</span></span
                                        >
                                    </div>
                                </div>
                                <div v-else-if="item.SignCode == 'Satiety'">
                                    <div class="txt">
                                        <span class="pr20"
                                            >{{
                                                item.QuestionAnswerInfo.IntValue
                                            }}
                                            -
                                            <span
                                                v-if="
                                                    item.QuestionAnswerInfo
                                                        .IntValue < 4
                                                "
                                                >不饱腹</span
                                            ><span
                                                v-else-if="
                                                    item.QuestionAnswerInfo
                                                        .IntValue < 8
                                                "
                                                >中度饱腹</span
                                            ><span v-else>极度饱腹</span></span
                                        >
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- end -->
                </div>
            </div>
        </div>
    </div>
</template>

<script>
const dataArr = [
    {
        Questions: [
            {
                QuestionAnswerInfo: {
                    ID: null,
                    QuestionAnswerID: null,
                    QuestionID: 'CA91CF5FEDF7460BA02B2BF133E9A510',
                    StrValue: null,
                    IntValue: 180,
                    DecimalValue: null,
                    TextValue: null
                },
                QuestionOptions: [],
                ID: 'CA91CF5FEDF7460BA02B2BF133E9A510',
                QuestionGroupID: '34A4BC3A482F4504A7E317ED90A34A69',
                SignCode: 'CurrentHeight',
                Name: '目前身高',
                TypeCode: 'Num',
                IsRequired: true,
                BindQuestionID: null,
                Max: 250,
                Min: 80,
                MaxLength: null,
                MinLength: null,
                Precision: 0,
                Prefix: null,
                Suffix: 'cm',
                Layout: null,
                Placeholder: null,
                SortID: 10,
                State: 10,
                Description: null,
                CreatorTime: '2020-05-07T16:41:42.22',
                CreatorUserId: 'Admin'
            },
            {
                QuestionAnswerInfo: {
                    ID: null,
                    QuestionAnswerID: null,
                    QuestionID: '1100C43E940A42CC9DC12AB6DC8903AD',
                    StrValue: null,
                    IntValue: null,
                    DecimalValue: 121.9,
                    TextValue: null
                },
                QuestionOptions: [],
                ID: '1100C43E940A42CC9DC12AB6DC8903AD',
                QuestionGroupID: '34A4BC3A482F4504A7E317ED90A34A69',
                SignCode: 'CurrentWeight',
                Name: '目前体重',
                TypeCode: 'Num',
                IsRequired: true,
                BindQuestionID: null,
                Max: 400,
                Min: 10,
                MaxLength: null,
                MinLength: null,
                Precision: 1,
                Prefix: null,
                Suffix: 'kg',
                Layout: null,
                Placeholder: null,
                SortID: 20,
                State: 10,
                Description: null,
                CreatorTime: '2020-05-07T16:41:42.22',
                CreatorUserId: 'Admin'
            },
            {
                QuestionAnswerInfo: {
                    ID: null,
                    QuestionAnswerID: null,
                    QuestionID: 'DA57D4599E6E456AA3AB65199BE8F15A',
                    StrValue: null,
                    IntValue: null,
                    DecimalValue: 37.6,
                    TextValue: null
                },
                QuestionOptions: [],
                ID: 'DA57D4599E6E456AA3AB65199BE8F15A',
                QuestionGroupID: '34A4BC3A482F4504A7E317ED90A34A69',
                SignCode: 'CurrentBMI',
                Name: 'BMI指标',
                TypeCode: 'Num',
                IsRequired: true,
                BindQuestionID: null,
                Max: null,
                Min: null,
                MaxLength: null,
                MinLength: null,
                Precision: 1,
                Prefix: null,
                Suffix: null,
                Layout: null,
                Placeholder: null,
                SortID: 30,
                State: 10,
                Description: null,
                CreatorTime: '2020-05-07T16:41:42.22',
                CreatorUserId: 'Admin'
            },
            {
                QuestionAnswerInfo: {
                    ID: null,
                    QuestionAnswerID: null,
                    QuestionID: 'DA17D497BDDF406B88BE3A23E53EC927',
                    StrValue: '90D63ABF3CF3458AB5AB27DA6FEBCB77',
                    IntValue: null,
                    DecimalValue: null,
                    TextValue: null
                },
                QuestionOptions: [
                    {
                        ID: '889B2334BF9947C4B29CBDDC61E45E47',
                        QuestionID: 'DA17D497BDDF406B88BE3A23E53EC927',
                        SignCode: null,
                        Name: '未婚',
                        Score: 0,
                        RejectOptionID: null,
                        IsHasText: false,
                        State: 10,
                        SortID: 10,
                        Description: null,
                        CreatorTime: '2020-05-07T16:41:42.22',
                        CreatorUserId: 'Admin',
                        checked: false
                    },
                    {
                        ID: '91526DD2027445E2BF10B6C687E5CCE0',
                        QuestionID: 'DA17D497BDDF406B88BE3A23E53EC927',
                        SignCode: null,
                        Name: '已婚',
                        Score: 0,
                        RejectOptionID: null,
                        IsHasText: false,
                        State: 10,
                        SortID: 20,
                        Description: null,
                        CreatorTime: '2020-05-07T16:41:42.22',
                        CreatorUserId: 'Admin',
                        checked: false
                    },
                    {
                        ID: 'CF425D1C02A3473F940A31AC519D29C8',
                        QuestionID: 'DA17D497BDDF406B88BE3A23E53EC927',
                        SignCode: null,
                        Name: '离异',
                        Score: 0,
                        RejectOptionID: null,
                        IsHasText: false,
                        State: 10,
                        SortID: 30,
                        Description: null,
                        CreatorTime: '2020-05-07T16:41:42.22',
                        CreatorUserId: 'Admin',
                        checked: false
                    },
                    {
                        ID: '90D63ABF3CF3458AB5AB27DA6FEBCB77',
                        QuestionID: 'DA17D497BDDF406B88BE3A23E53EC927',
                        SignCode: null,
                        Name: '其他',
                        Score: 0,
                        RejectOptionID: null,
                        IsHasText: false,
                        State: 10,
                        SortID: 40,
                        Description: null,
                        CreatorTime: '2020-05-07T16:41:42.22',
                        CreatorUserId: 'Admin',
                        checked: true
                    }
                ],
                ID: 'DA17D497BDDF406B88BE3A23E53EC927',
                QuestionGroupID: '34A4BC3A482F4504A7E317ED90A34A69',
                SignCode: null,
                Name: '婚姻',
                TypeCode: 'SingleSelect',
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
                SortID: 40,
                State: 10,
                Description: null,
                CreatorTime: '2020-05-07T16:41:42.22',
                CreatorUserId: 'Admin'
            },
            {
                QuestionAnswerInfo: {
                    ID: null,
                    QuestionAnswerID: null,
                    QuestionID: 'C47EF70938B149E8A627794EF1925368',
                    StrValue: 'B34E709BD3AE40F3AE17D5A2DE2DE1C7',
                    IntValue: null,
                    DecimalValue: null,
                    TextValue: null
                },
                QuestionOptions: [
                    {
                        ID: 'B34E709BD3AE40F3AE17D5A2DE2DE1C7',
                        QuestionID: 'C47EF70938B149E8A627794EF1925368',
                        SignCode: null,
                        Name: '未生育',
                        Score: 0,
                        RejectOptionID: null,
                        IsHasText: false,
                        State: 10,
                        SortID: 10,
                        Description: null,
                        CreatorTime: '2020-05-07T16:41:42.22',
                        CreatorUserId: 'Admin',
                        checked: true
                    },
                    {
                        ID: 'FB18DB60D35B4A1F9F2AA88853FEE6DF',
                        QuestionID: 'C47EF70938B149E8A627794EF1925368',
                        SignCode: null,
                        Name: '已生育',
                        Score: 0,
                        RejectOptionID: null,
                        IsHasText: false,
                        State: 10,
                        SortID: 20,
                        Description: null,
                        CreatorTime: '2020-05-07T16:41:42.22',
                        CreatorUserId: 'Admin',
                        checked: false
                    }
                ],
                ID: 'C47EF70938B149E8A627794EF1925368',
                QuestionGroupID: '34A4BC3A482F4504A7E317ED90A34A69',
                SignCode: null,
                Name: '生育',
                TypeCode: 'SingleSelect',
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
                SortID: 50,
                State: 10,
                Description: null,
                CreatorTime: '2020-05-07T16:41:42.22',
                CreatorUserId: 'Admin'
            },
            {
                QuestionAnswerInfo: {
                    ID: null,
                    QuestionAnswerID: null,
                    QuestionID: 'C80F2B10C33141B697076C629237E5F6',
                    StrValue: 'F2E79585F0304FA49A96DBF5558750ED',
                    IntValue: null,
                    DecimalValue: null,
                    TextValue: null
                },
                QuestionOptions: [
                    {
                        ID: 'F2E79585F0304FA49A96DBF5558750ED',
                        QuestionID: 'C80F2B10C33141B697076C629237E5F6',
                        SignCode: null,
                        Name: '无',
                        Score: 0,
                        RejectOptionID:
                            '88C18295ADC947478320885973DF5AE0,5446D110002F4F77B33D88C63CA24767,30553344B9DD471DBFEE42A4A795296F,0648241A6C134E9584FFF9A940A644B1,680D486E62CA4BAC9E909C5C78ABB2EF,047EF10289A34441878B6261B5BB0BF3,2AD16B16A8AE4CCAA7AB65CF75CCF468,2857E22FEDF54FBD93FD2E8B6401EA45,F6CAB8B1C41E4A439D91D07A8E6A2645,DADBACE6B22147199A2DE679ED9BDB88,44B948B4DE9A4E20A703BAD9A1250215,1367A74A4983458BA02D86CDB77B7579',
                        IsHasText: false,
                        State: 10,
                        SortID: 10,
                        Description: null,
                        CreatorTime: '2020-05-07T16:41:42.22',
                        CreatorUserId: 'Admin',
                        checked: true
                    },
                    {
                        ID: '88C18295ADC947478320885973DF5AE0',
                        QuestionID: 'C80F2B10C33141B697076C629237E5F6',
                        SignCode: null,
                        Name: '糖尿病',
                        Score: 0,
                        RejectOptionID: null,
                        IsHasText: false,
                        State: 10,
                        SortID: 20,
                        Description: null,
                        CreatorTime: '2020-05-07T16:41:42.22',
                        CreatorUserId: 'Admin',
                        checked: false
                    },
                    {
                        ID: '5446D110002F4F77B33D88C63CA24767',
                        QuestionID: 'C80F2B10C33141B697076C629237E5F6',
                        SignCode: null,
                        Name: '高血压',
                        Score: 0,
                        RejectOptionID: null,
                        IsHasText: false,
                        State: 10,
                        SortID: 30,
                        Description: null,
                        CreatorTime: '2020-05-07T16:41:42.22',
                        CreatorUserId: 'Admin',
                        checked: false
                    },
                    {
                        ID: '30553344B9DD471DBFEE42A4A795296F',
                        QuestionID: 'C80F2B10C33141B697076C629237E5F6',
                        SignCode: null,
                        Name: '高血脂',
                        Score: 0,
                        RejectOptionID: null,
                        IsHasText: false,
                        State: 10,
                        SortID: 40,
                        Description: null,
                        CreatorTime: '2020-05-07T16:41:42.22',
                        CreatorUserId: 'Admin',
                        checked: false
                    },
                    {
                        ID: '0648241A6C134E9584FFF9A940A644B1',
                        QuestionID: 'C80F2B10C33141B697076C629237E5F6',
                        SignCode: null,
                        Name: '冠心病',
                        Score: 0,
                        RejectOptionID: null,
                        IsHasText: false,
                        State: 10,
                        SortID: 50,
                        Description: null,
                        CreatorTime: '2020-05-07T16:41:42.22',
                        CreatorUserId: 'Admin',
                        checked: false
                    },
                    {
                        ID: '680D486E62CA4BAC9E909C5C78ABB2EF',
                        QuestionID: 'C80F2B10C33141B697076C629237E5F6',
                        SignCode: null,
                        Name: '脂肪肝',
                        Score: 0,
                        RejectOptionID: null,
                        IsHasText: false,
                        State: 10,
                        SortID: 60,
                        Description: null,
                        CreatorTime: '2020-05-07T16:41:42.22',
                        CreatorUserId: 'Admin',
                        checked: false
                    },
                    {
                        ID: '047EF10289A34441878B6261B5BB0BF3',
                        QuestionID: 'C80F2B10C33141B697076C629237E5F6',
                        SignCode: null,
                        Name: '胆石症',
                        Score: 0,
                        RejectOptionID: null,
                        IsHasText: false,
                        State: 10,
                        SortID: 70,
                        Description: null,
                        CreatorTime: '2020-05-07T16:41:42.22',
                        CreatorUserId: 'Admin',
                        checked: false
                    },
                    {
                        ID: '2AD16B16A8AE4CCAA7AB65CF75CCF468',
                        QuestionID: 'C80F2B10C33141B697076C629237E5F6',
                        SignCode: null,
                        Name: '痛风',
                        Score: 0,
                        RejectOptionID: null,
                        IsHasText: false,
                        State: 10,
                        SortID: 80,
                        Description: null,
                        CreatorTime: '2020-05-07T16:41:42.22',
                        CreatorUserId: 'Admin',
                        checked: false
                    },
                    {
                        ID: '2857E22FEDF54FBD93FD2E8B6401EA45',
                        QuestionID: 'C80F2B10C33141B697076C629237E5F6',
                        SignCode: null,
                        Name: '月经紊乱',
                        Score: 0,
                        RejectOptionID: null,
                        IsHasText: false,
                        State: 10,
                        SortID: 90,
                        Description: null,
                        CreatorTime: '2020-05-07T16:41:42.22',
                        CreatorUserId: 'Admin',
                        checked: false
                    },
                    {
                        ID: 'F6CAB8B1C41E4A439D91D07A8E6A2645',
                        QuestionID: 'C80F2B10C33141B697076C629237E5F6',
                        SignCode: null,
                        Name: '多囊卵巢综合征PCOS',
                        Score: 0,
                        RejectOptionID: null,
                        IsHasText: false,
                        State: 10,
                        SortID: 100,
                        Description: null,
                        CreatorTime: '2020-05-07T16:41:42.22',
                        CreatorUserId: 'Admin',
                        checked: false
                    },
                    {
                        ID: 'DADBACE6B22147199A2DE679ED9BDB88',
                        QuestionID: 'C80F2B10C33141B697076C629237E5F6',
                        SignCode: null,
                        Name: '呼吸暂停综合征',
                        Score: 0,
                        RejectOptionID: null,
                        IsHasText: false,
                        State: 10,
                        SortID: 110,
                        Description: null,
                        CreatorTime: '2020-05-07T16:41:42.22',
                        CreatorUserId: 'Admin',
                        checked: false
                    },
                    {
                        ID: '44B948B4DE9A4E20A703BAD9A1250215',
                        QuestionID: 'C80F2B10C33141B697076C629237E5F6',
                        SignCode: null,
                        Name: '性功能障碍',
                        Score: 0,
                        RejectOptionID: null,
                        IsHasText: false,
                        State: 10,
                        SortID: 120,
                        Description: null,
                        CreatorTime: '2020-05-07T16:41:42.22',
                        CreatorUserId: 'Admin',
                        checked: false
                    },
                    {
                        ID: '1367A74A4983458BA02D86CDB77B7579',
                        QuestionID: 'C80F2B10C33141B697076C629237E5F6',
                        SignCode: null,
                        Name: '其他',
                        Score: 0,
                        RejectOptionID: null,
                        IsHasText: false,
                        State: 10,
                        SortID: 130,
                        Description: null,
                        CreatorTime: '2020-05-07T16:41:42.22',
                        CreatorUserId: 'Admin',
                        checked: false
                    }
                ],
                ID: 'C80F2B10C33141B697076C629237E5F6',
                QuestionGroupID: '34A4BC3A482F4504A7E317ED90A34A69',
                SignCode: null,
                Name: '是否已经因胖生“病”？（可多选）',
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
                SortID: 60,
                State: 10,
                Description: null,
                CreatorTime: '2020-05-07T16:41:42.22',
                CreatorUserId: 'Admin'
            },
            {
                QuestionAnswerInfo: {
                    ID: null,
                    QuestionAnswerID: null,
                    QuestionID: '18A2A7ADAC9F4CEE917C00200FCAB5C4',
                    StrValue:
                        '3CCC9CEE64044F6796BDDCAE7B4533CC,68A7DB8C692B480489730BB8491171EC',
                    IntValue: null,
                    DecimalValue: null,
                    TextValue: null
                },
                QuestionOptions: [
                    {
                        ID: '97E010354C264A1DA46FE64521AFB862',
                        QuestionID: '18A2A7ADAC9F4CEE917C00200FCAB5C4',
                        SignCode: null,
                        Name: '无',
                        Score: 0,
                        RejectOptionID:
                            '97E010354C264A1DA46FE64521AFB862,3CCC9CEE64044F6796BDDCAE7B4533CC,68A7DB8C692B480489730BB8491171EC,53E70E1A4B884CDA9AF0AD88EAE8A27E,64F079E6A28645C1AD3EF7ABF82149BF,B3EA090E1036492A82CEA7B3F9085994',
                        IsHasText: false,
                        State: 10,
                        SortID: 10,
                        Description: null,
                        CreatorTime: '2020-05-07T16:41:42.22',
                        CreatorUserId: 'Admin',
                        checked: false
                    },
                    {
                        ID: '3CCC9CEE64044F6796BDDCAE7B4533CC',
                        QuestionID: '18A2A7ADAC9F4CEE917C00200FCAB5C4',
                        SignCode: null,
                        Name: '父母肥胖',
                        Score: 0,
                        RejectOptionID: null,
                        IsHasText: false,
                        State: 10,
                        SortID: 20,
                        Description: null,
                        CreatorTime: '2020-05-07T16:41:42.22',
                        CreatorUserId: 'Admin',
                        checked: true
                    },
                    {
                        ID: '68A7DB8C692B480489730BB8491171EC',
                        QuestionID: '18A2A7ADAC9F4CEE917C00200FCAB5C4',
                        SignCode: null,
                        Name: '祖父母肥胖',
                        Score: 0,
                        RejectOptionID: null,
                        IsHasText: false,
                        State: 10,
                        SortID: 30,
                        Description: null,
                        CreatorTime: '2020-05-07T16:41:42.22',
                        CreatorUserId: 'Admin',
                        checked: true
                    },
                    {
                        ID: '53E70E1A4B884CDA9AF0AD88EAE8A27E',
                        QuestionID: '18A2A7ADAC9F4CEE917C00200FCAB5C4',
                        SignCode: null,
                        Name: '姑叔舅姨肥胖',
                        Score: 0,
                        RejectOptionID: null,
                        IsHasText: false,
                        State: 10,
                        SortID: 40,
                        Description: null,
                        CreatorTime: '2020-05-07T16:41:42.22',
                        CreatorUserId: 'Admin',
                        checked: false
                    },
                    {
                        ID: '64F079E6A28645C1AD3EF7ABF82149BF',
                        QuestionID: '18A2A7ADAC9F4CEE917C00200FCAB5C4',
                        SignCode: null,
                        Name: '兄弟/姐妹肥胖',
                        Score: 0,
                        RejectOptionID: null,
                        IsHasText: false,
                        State: 10,
                        SortID: 50,
                        Description: null,
                        CreatorTime: '2020-05-07T16:41:42.22',
                        CreatorUserId: 'Admin',
                        checked: false
                    },
                    {
                        ID: 'B3EA090E1036492A82CEA7B3F9085994',
                        QuestionID: '18A2A7ADAC9F4CEE917C00200FCAB5C4',
                        SignCode: null,
                        Name: '子女肥胖',
                        Score: 0,
                        RejectOptionID: null,
                        IsHasText: false,
                        State: 10,
                        SortID: 60,
                        Description: null,
                        CreatorTime: '2020-05-07T16:41:42.22',
                        CreatorUserId: 'Admin',
                        checked: false
                    }
                ],
                ID: '18A2A7ADAC9F4CEE917C00200FCAB5C4',
                QuestionGroupID: '34A4BC3A482F4504A7E317ED90A34A69',
                SignCode: null,
                Name: '是否存在肥胖家族史?（可多选）',
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
                SortID: 70,
                State: 10,
                Description: null,
                CreatorTime: '2020-05-07T16:41:42.22',
                CreatorUserId: 'Admin'
            },
            {
                QuestionAnswerInfo: {
                    ID: null,
                    QuestionAnswerID: null,
                    QuestionID: 'E260DB805C2E40FD8BC9802B498D0DC9',
                    StrValue: 'A9D2C4BA488845409A4B4FB413FC2852',
                    IntValue: null,
                    DecimalValue: null,
                    TextValue: null
                },
                QuestionOptions: [
                    {
                        ID: 'A9D2C4BA488845409A4B4FB413FC2852',
                        QuestionID: 'E260DB805C2E40FD8BC9802B498D0DC9',
                        SignCode: null,
                        Name: '无',
                        Score: 0,
                        RejectOptionID: null,
                        IsHasText: false,
                        State: 10,
                        SortID: 10,
                        Description: null,
                        CreatorTime: '2020-05-07T16:41:42.22',
                        CreatorUserId: 'Admin',
                        checked: true
                    },
                    {
                        ID: '5AD1488188A44FAF9CB6D37A2D621E98',
                        QuestionID: 'E260DB805C2E40FD8BC9802B498D0DC9',
                        SignCode: null,
                        Name: '有',
                        Score: 0,
                        RejectOptionID: null,
                        IsHasText: true,
                        State: 10,
                        SortID: 20,
                        Description: null,
                        CreatorTime: '2020-05-07T16:41:42.22',
                        CreatorUserId: 'Admin',
                        checked: false
                    }
                ],
                ID: 'E260DB805C2E40FD8BC9802B498D0DC9',
                QuestionGroupID: '34A4BC3A482F4504A7E317ED90A34A69',
                SignCode: null,
                Name: '目前有无服用减肥药物？',
                TypeCode: 'SingleSelectText',
                IsRequired: true,
                BindQuestionID: null,
                Max: null,
                Min: null,
                MaxLength: 100,
                MinLength: null,
                Precision: null,
                Prefix: null,
                Suffix: null,
                Layout: null,
                Placeholder: '输入药物名称，不超过100字',
                SortID: 80,
                State: 10,
                Description: null,
                CreatorTime: '2020-05-07T16:41:42.22',
                CreatorUserId: 'Admin'
            }
        ],
        ID: '34A4BC3A482F4504A7E317ED90A34A69',
        QuestionnaireID: '43DD04EF827842A1BBDE263106364C85',
        Code: 'JB',
        Name: '疾病',
        SortID: 100,
        State: 10,
        Description: null,
        CreatorTime: '2020-05-07T16:41:42.22',
        CreatorUserId: 'Admin'
    },
    {
        Questions: [
            {
                QuestionAnswerInfo: {
                    ID: null,
                    QuestionAnswerID: null,
                    QuestionID: '6F31DC105D564CDDA7B89315E4750F2A',
                    StrValue: 'A90DE97871AF413A890F0CA2D6F0C326',
                    IntValue: null,
                    DecimalValue: null,
                    TextValue: null
                },
                QuestionOptions: [
                    {
                        ID: 'A90DE97871AF413A890F0CA2D6F0C326',
                        QuestionID: '6F31DC105D564CDDA7B89315E4750F2A',
                        SignCode: null,
                        Name: '荤食为主',
                        Score: -10,
                        RejectOptionID: null,
                        IsHasText: false,
                        State: 10,
                        SortID: 10,
                        Description: null,
                        CreatorTime: '2020-05-07T16:41:42.22',
                        CreatorUserId: 'Admin',
                        checked: true
                    },
                    {
                        ID: 'AC66AB7009254AF2BC09EFBEA2595B83',
                        QuestionID: '6F31DC105D564CDDA7B89315E4750F2A',
                        SignCode: null,
                        Name: '素食为主',
                        Score: -5,
                        RejectOptionID: null,
                        IsHasText: false,
                        State: 10,
                        SortID: 20,
                        Description: null,
                        CreatorTime: '2020-05-07T16:41:42.22',
                        CreatorUserId: 'Admin',
                        checked: false
                    },
                    {
                        ID: 'BD2BA89B86234344A0639F1D6DF63237',
                        QuestionID: '6F31DC105D564CDDA7B89315E4750F2A',
                        SignCode: null,
                        Name: '杂食平衡',
                        Score: 0,
                        RejectOptionID: null,
                        IsHasText: false,
                        State: 10,
                        SortID: 30,
                        Description: null,
                        CreatorTime: '2020-05-07T16:41:42.22',
                        CreatorUserId: 'Admin',
                        checked: false
                    }
                ],
                ID: '6F31DC105D564CDDA7B89315E4750F2A',
                QuestionGroupID: 'B2A2407AE9494A8DA6B962A1CF5219FA',
                SignCode: null,
                Name: '饮食习惯',
                TypeCode: 'SingleSelect',
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
                SortID: 90,
                State: 10,
                Description: null,
                CreatorTime: '2020-05-07T16:41:42.22',
                CreatorUserId: 'Admin'
            },
            {
                QuestionAnswerInfo: {
                    ID: null,
                    QuestionAnswerID: null,
                    QuestionID: 'D1A5FCE6F8F64F049B3F21DD4E640F02',
                    StrValue: '4012628A582E41A4A441E65B8DECD6CD',
                    IntValue: null,
                    DecimalValue: null,
                    TextValue: null
                },
                QuestionOptions: [
                    {
                        ID: '1857CDAD69F44134B477EA1F068A4499',
                        QuestionID: 'D1A5FCE6F8F64F049B3F21DD4E640F02',
                        SignCode: null,
                        Name: '重口味',
                        Score: -10,
                        RejectOptionID: null,
                        IsHasText: false,
                        State: 10,
                        SortID: 10,
                        Description: null,
                        CreatorTime: '2020-05-07T16:41:42.22',
                        CreatorUserId: 'Admin',
                        checked: false
                    },
                    {
                        ID: '4012628A582E41A4A441E65B8DECD6CD',
                        QuestionID: 'D1A5FCE6F8F64F049B3F21DD4E640F02',
                        SignCode: null,
                        Name: '一般',
                        Score: -5,
                        RejectOptionID: null,
                        IsHasText: false,
                        State: 10,
                        SortID: 20,
                        Description: null,
                        CreatorTime: '2020-05-07T16:41:42.22',
                        CreatorUserId: 'Admin',
                        checked: true
                    },
                    {
                        ID: '3D5308AFB93C494B96CF6609D8233B3C',
                        QuestionID: 'D1A5FCE6F8F64F049B3F21DD4E640F02',
                        SignCode: null,
                        Name: '清淡',
                        Score: 0,
                        RejectOptionID: null,
                        IsHasText: false,
                        State: 10,
                        SortID: 30,
                        Description: null,
                        CreatorTime: '2020-05-07T16:41:42.22',
                        CreatorUserId: 'Admin',
                        checked: false
                    }
                ],
                ID: 'D1A5FCE6F8F64F049B3F21DD4E640F02',
                QuestionGroupID: 'B2A2407AE9494A8DA6B962A1CF5219FA',
                SignCode: null,
                Name: '油盐偏好',
                TypeCode: 'SingleSelect',
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
                SortID: 100,
                State: 10,
                Description: null,
                CreatorTime: '2020-05-07T16:41:42.22',
                CreatorUserId: 'Admin'
            },
            {
                QuestionAnswerInfo: {
                    ID: null,
                    QuestionAnswerID: null,
                    QuestionID: '6DFDB3D41B444C2590CAF75C9C33F919',
                    StrValue: '0D5B45C776804A99A3C4DA4FC00C6081',
                    IntValue: null,
                    DecimalValue: null,
                    TextValue: null
                },
                QuestionOptions: [
                    {
                        ID: '076924CB03A74DEB9550E4ECB5DEF811',
                        QuestionID: '6DFDB3D41B444C2590CAF75C9C33F919',
                        SignCode: null,
                        Name: '喜欢',
                        Score: -10,
                        RejectOptionID: null,
                        IsHasText: false,
                        State: 10,
                        SortID: 10,
                        Description: null,
                        CreatorTime: '2020-05-07T16:41:42.22',
                        CreatorUserId: 'Admin',
                        checked: false
                    },
                    {
                        ID: '0D5B45C776804A99A3C4DA4FC00C6081',
                        QuestionID: '6DFDB3D41B444C2590CAF75C9C33F919',
                        SignCode: null,
                        Name: '一般',
                        Score: -5,
                        RejectOptionID: null,
                        IsHasText: false,
                        State: 10,
                        SortID: 20,
                        Description: null,
                        CreatorTime: '2020-05-07T16:41:42.22',
                        CreatorUserId: 'Admin',
                        checked: true
                    },
                    {
                        ID: 'DFF65BCA04204B588FB77B3000831D96',
                        QuestionID: '6DFDB3D41B444C2590CAF75C9C33F919',
                        SignCode: null,
                        Name: '不太吃',
                        Score: 0,
                        RejectOptionID: null,
                        IsHasText: false,
                        State: 10,
                        SortID: 30,
                        Description: null,
                        CreatorTime: '2020-05-07T16:41:42.22',
                        CreatorUserId: 'Admin',
                        checked: false
                    }
                ],
                ID: '6DFDB3D41B444C2590CAF75C9C33F919',
                QuestionGroupID: 'B2A2407AE9494A8DA6B962A1CF5219FA',
                SignCode: null,
                Name: '零食习惯',
                TypeCode: 'SingleSelect',
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
                SortID: 110,
                State: 10,
                Description: null,
                CreatorTime: '2020-05-07T16:41:42.22',
                CreatorUserId: 'Admin'
            },
            {
                QuestionAnswerInfo: {
                    ID: null,
                    QuestionAnswerID: null,
                    QuestionID: 'B6436EC5A4B74196AF2ECA31E4D9DC1E',
                    StrValue: '110DC10BC3CB419EA75D409690F747F3',
                    IntValue: null,
                    DecimalValue: null,
                    TextValue: null
                },
                QuestionOptions: [
                    {
                        ID: 'BDFDE70AEA31410EB73DE18DB9476216',
                        QuestionID: 'B6436EC5A4B74196AF2ECA31E4D9DC1E',
                        SignCode: null,
                        Name: '是',
                        Score: -10,
                        RejectOptionID: null,
                        IsHasText: false,
                        State: 10,
                        SortID: 10,
                        Description: null,
                        CreatorTime: '2020-05-07T16:41:42.22',
                        CreatorUserId: 'Admin',
                        checked: false
                    },
                    {
                        ID: '110DC10BC3CB419EA75D409690F747F3',
                        QuestionID: 'B6436EC5A4B74196AF2ECA31E4D9DC1E',
                        SignCode: null,
                        Name: '否',
                        Score: 0,
                        RejectOptionID: null,
                        IsHasText: false,
                        State: 10,
                        SortID: 20,
                        Description: null,
                        CreatorTime: '2020-05-07T16:41:42.22',
                        CreatorUserId: 'Admin',
                        checked: true
                    }
                ],
                ID: 'B6436EC5A4B74196AF2ECA31E4D9DC1E',
                QuestionGroupID: 'B2A2407AE9494A8DA6B962A1CF5219FA',
                SignCode: null,
                Name: '三餐规律',
                TypeCode: 'SingleSelect',
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
                SortID: 120,
                State: 10,
                Description: null,
                CreatorTime: '2020-05-07T16:41:42.22',
                CreatorUserId: 'Admin'
            },
            {
                QuestionAnswerInfo: {
                    ID: null,
                    QuestionAnswerID: null,
                    QuestionID: 'E09AC6547DEC4CE38E80F4DEAEB2DF49',
                    StrValue: 'C4174655A324494BA7E92771CEAC13A8',
                    IntValue: null,
                    DecimalValue: null,
                    TextValue: null
                },
                QuestionOptions: [
                    {
                        ID: '38DB29F7D68E4780ABBF2A595060761E',
                        QuestionID: 'E09AC6547DEC4CE38E80F4DEAEB2DF49',
                        SignCode: null,
                        Name: '<15分钟',
                        Score: -10,
                        RejectOptionID: null,
                        IsHasText: false,
                        State: 10,
                        SortID: 10,
                        Description: null,
                        CreatorTime: '2020-05-07T16:41:42.22',
                        CreatorUserId: 'Admin',
                        checked: false
                    },
                    {
                        ID: 'C4174655A324494BA7E92771CEAC13A8',
                        QuestionID: 'E09AC6547DEC4CE38E80F4DEAEB2DF49',
                        SignCode: null,
                        Name: '15-30分钟',
                        Score: -5,
                        RejectOptionID: null,
                        IsHasText: false,
                        State: 10,
                        SortID: 20,
                        Description: null,
                        CreatorTime: '2020-05-07T16:41:42.22',
                        CreatorUserId: 'Admin',
                        checked: true
                    },
                    {
                        ID: 'CA2A74CC4A264F718B8629D180AFC982',
                        QuestionID: 'E09AC6547DEC4CE38E80F4DEAEB2DF49',
                        SignCode: null,
                        Name: '>30分钟',
                        Score: 0,
                        RejectOptionID: null,
                        IsHasText: false,
                        State: 10,
                        SortID: 30,
                        Description: null,
                        CreatorTime: '2020-05-07T16:41:42.22',
                        CreatorUserId: 'Admin',
                        checked: false
                    }
                ],
                ID: 'E09AC6547DEC4CE38E80F4DEAEB2DF49',
                QuestionGroupID: 'B2A2407AE9494A8DA6B962A1CF5219FA',
                SignCode: null,
                Name: '平均每餐时长',
                TypeCode: 'SingleSelect',
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
                SortID: 130,
                State: 10,
                Description: null,
                CreatorTime: '2020-05-07T16:41:42.22',
                CreatorUserId: 'Admin'
            },
            {
                QuestionAnswerInfo: {
                    ID: null,
                    QuestionAnswerID: null,
                    QuestionID: 'C684522E4E0A4D1E8DD73020BDB22144',
                    StrValue: 'F12BC5BDCC0C43A89317B23890BC3E9F',
                    IntValue: null,
                    DecimalValue: null,
                    TextValue: null
                },
                QuestionOptions: [
                    {
                        ID: 'E3681214B38941D0A636842ED326A1FD',
                        QuestionID: 'C684522E4E0A4D1E8DD73020BDB22144',
                        SignCode: null,
                        Name: '>10次/周',
                        Score: -15,
                        RejectOptionID: null,
                        IsHasText: false,
                        State: 10,
                        SortID: 10,
                        Description: null,
                        CreatorTime: '2020-05-07T16:41:42.22',
                        CreatorUserId: 'Admin',
                        checked: false
                    },
                    {
                        ID: 'F12BC5BDCC0C43A89317B23890BC3E9F',
                        QuestionID: 'C684522E4E0A4D1E8DD73020BDB22144',
                        SignCode: null,
                        Name: '5-9 次/周',
                        Score: -10,
                        RejectOptionID: null,
                        IsHasText: false,
                        State: 10,
                        SortID: 20,
                        Description: null,
                        CreatorTime: '2020-05-07T16:41:42.22',
                        CreatorUserId: 'Admin',
                        checked: true
                    },
                    {
                        ID: '752CDCE9A38A40DBA4CCDA4E9CCEB9E9',
                        QuestionID: 'C684522E4E0A4D1E8DD73020BDB22144',
                        SignCode: null,
                        Name: '1-4 次/周',
                        Score: -5,
                        RejectOptionID: null,
                        IsHasText: false,
                        State: 10,
                        SortID: 30,
                        Description: null,
                        CreatorTime: '2020-05-07T16:41:42.22',
                        CreatorUserId: 'Admin',
                        checked: false
                    },
                    {
                        ID: '80B4C443FF5840E4882E659E67D6329A',
                        QuestionID: 'C684522E4E0A4D1E8DD73020BDB22144',
                        SignCode: null,
                        Name: '几乎不',
                        Score: 0,
                        RejectOptionID: null,
                        IsHasText: false,
                        State: 10,
                        SortID: 40,
                        Description: null,
                        CreatorTime: '2020-05-07T16:41:42.22',
                        CreatorUserId: 'Admin',
                        checked: false
                    }
                ],
                ID: 'C684522E4E0A4D1E8DD73020BDB22144',
                QuestionGroupID: 'B2A2407AE9494A8DA6B962A1CF5219FA',
                SignCode: null,
                Name: '平均在外就餐（含外卖）',
                TypeCode: 'SingleSelect',
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
                SortID: 140,
                State: 10,
                Description: null,
                CreatorTime: '2020-05-07T16:41:42.22',
                CreatorUserId: 'Admin'
            },
            {
                QuestionAnswerInfo: {
                    ID: null,
                    QuestionAnswerID: null,
                    QuestionID: '501F677A99E443CDA9B18222E490DE35',
                    StrValue: '7D823FA32AF54BD9810975E56828CA32',
                    IntValue: null,
                    DecimalValue: null,
                    TextValue: null
                },
                QuestionOptions: [
                    {
                        ID: '86640EF41A0B48168128732271A6D241',
                        QuestionID: '501F677A99E443CDA9B18222E490DE35',
                        SignCode: null,
                        Name: '经常',
                        Score: -15,
                        RejectOptionID: null,
                        IsHasText: false,
                        State: 10,
                        SortID: 10,
                        Description: null,
                        CreatorTime: '2020-05-07T16:41:42.22',
                        CreatorUserId: 'Admin',
                        checked: false
                    },
                    {
                        ID: '7D823FA32AF54BD9810975E56828CA32',
                        QuestionID: '501F677A99E443CDA9B18222E490DE35',
                        SignCode: null,
                        Name: '偶尔',
                        Score: -10,
                        RejectOptionID: null,
                        IsHasText: false,
                        State: 10,
                        SortID: 20,
                        Description: null,
                        CreatorTime: '2020-05-07T16:41:42.22',
                        CreatorUserId: 'Admin',
                        checked: true
                    },
                    {
                        ID: 'B2DC0F20C5294789B309805F50D45E50',
                        QuestionID: '501F677A99E443CDA9B18222E490DE35',
                        SignCode: null,
                        Name: '几乎不',
                        Score: 0,
                        RejectOptionID: null,
                        IsHasText: false,
                        State: 10,
                        SortID: 30,
                        Description: null,
                        CreatorTime: '2020-05-07T16:41:42.22',
                        CreatorUserId: 'Admin',
                        checked: false
                    }
                ],
                ID: '501F677A99E443CDA9B18222E490DE35',
                QuestionGroupID: 'B2A2407AE9494A8DA6B962A1CF5219FA',
                SignCode: null,
                Name: '是否有暴饮暴食的经历？',
                TypeCode: 'SingleSelect',
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
                SortID: 150,
                State: 10,
                Description: null,
                CreatorTime: '2020-05-07T16:41:42.22',
                CreatorUserId: 'Admin'
            },
            {
                QuestionAnswerInfo: {
                    ID: null,
                    QuestionAnswerID: null,
                    QuestionID: 'BA1D38A8E67B4F57841ACA78AF0EB457',
                    StrValue: '292820E1207B49ADB49E55697D40BB4F',
                    IntValue: null,
                    DecimalValue: null,
                    TextValue: null
                },
                QuestionOptions: [
                    {
                        ID: '292820E1207B49ADB49E55697D40BB4F',
                        QuestionID: 'BA1D38A8E67B4F57841ACA78AF0EB457',
                        SignCode: null,
                        Name: '经常（>2两/次）',
                        Score: -10,
                        RejectOptionID: null,
                        IsHasText: false,
                        State: 10,
                        SortID: 10,
                        Description: null,
                        CreatorTime: '2020-05-07T16:41:42.22',
                        CreatorUserId: 'Admin',
                        checked: true
                    },
                    {
                        ID: '45F7F1D8B89F4850B92E167DCAB914F7',
                        QuestionID: 'BA1D38A8E67B4F57841ACA78AF0EB457',
                        SignCode: null,
                        Name: '偶尔',
                        Score: -3,
                        RejectOptionID: null,
                        IsHasText: false,
                        State: 10,
                        SortID: 20,
                        Description: null,
                        CreatorTime: '2020-05-07T16:41:42.22',
                        CreatorUserId: 'Admin',
                        checked: false
                    },
                    {
                        ID: 'D78FDE7206E34DA48F749E713B5A8A86',
                        QuestionID: 'BA1D38A8E67B4F57841ACA78AF0EB457',
                        SignCode: null,
                        Name: '几乎不',
                        Score: 0,
                        RejectOptionID: null,
                        IsHasText: false,
                        State: 10,
                        SortID: 30,
                        Description: null,
                        CreatorTime: '2020-05-07T16:41:42.22',
                        CreatorUserId: 'Admin',
                        checked: false
                    }
                ],
                ID: 'BA1D38A8E67B4F57841ACA78AF0EB457',
                QuestionGroupID: 'B2A2407AE9494A8DA6B962A1CF5219FA',
                SignCode: null,
                Name: '是否饮酒？',
                TypeCode: 'SingleSelect',
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
                SortID: 160,
                State: 10,
                Description: null,
                CreatorTime: '2020-05-07T16:41:42.22',
                CreatorUserId: 'Admin'
            }
        ],
        ID: 'B2A2407AE9494A8DA6B962A1CF5219FA',
        QuestionnaireID: '43DD04EF827842A1BBDE263106364C85',
        Code: 'YS',
        Name: '饮食',
        SortID: 200,
        State: 10,
        Description: null,
        CreatorTime: '2020-05-07T16:41:42.22',
        CreatorUserId: 'Admin'
    },
    {
        Questions: [
            {
                QuestionAnswerInfo: {
                    ID: null,
                    QuestionAnswerID: null,
                    QuestionID: 'AE9035F1786241A9B7A5D6258BE97A1D',
                    StrValue: '703C1C5327E640589DBD8E40329E21CD',
                    IntValue: null,
                    DecimalValue: null,
                    TextValue: null
                },
                QuestionOptions: [
                    {
                        ID: '703C1C5327E640589DBD8E40329E21CD',
                        QuestionID: 'AE9035F1786241A9B7A5D6258BE97A1D',
                        SignCode: null,
                        Name: '几乎没有运动',
                        Score: 0,
                        RejectOptionID: null,
                        IsHasText: false,
                        State: 10,
                        SortID: 10,
                        Description: null,
                        CreatorTime: '2020-05-07T16:41:42.22',
                        CreatorUserId: 'Admin',
                        checked: true
                    },
                    {
                        ID: '63154547F01F4E849BEAADF0E103D71A',
                        QuestionID: 'AE9035F1786241A9B7A5D6258BE97A1D',
                        SignCode: null,
                        Name: '平均1-2次/周',
                        Score: 0,
                        RejectOptionID: null,
                        IsHasText: false,
                        State: 10,
                        SortID: 20,
                        Description: null,
                        CreatorTime: '2020-05-07T16:41:42.22',
                        CreatorUserId: 'Admin',
                        checked: false
                    },
                    {
                        ID: '0E4B8C94C8EC4DCA9B32FCACF6CBAF6F',
                        QuestionID: 'AE9035F1786241A9B7A5D6258BE97A1D',
                        SignCode: null,
                        Name: '平均3-5次/周',
                        Score: 0,
                        RejectOptionID: null,
                        IsHasText: false,
                        State: 10,
                        SortID: 30,
                        Description: null,
                        CreatorTime: '2020-05-07T16:41:42.22',
                        CreatorUserId: 'Admin',
                        checked: false
                    },
                    {
                        ID: '2EFA33CE378548A4BD5B793947E16750',
                        QuestionID: 'AE9035F1786241A9B7A5D6258BE97A1D',
                        SignCode: null,
                        Name: '几乎天天运动',
                        Score: 0,
                        RejectOptionID: null,
                        IsHasText: false,
                        State: 10,
                        SortID: 40,
                        Description: null,
                        CreatorTime: '2020-05-07T16:41:42.22',
                        CreatorUserId: 'Admin',
                        checked: false
                    }
                ],
                ID: 'AE9035F1786241A9B7A5D6258BE97A1D',
                QuestionGroupID: 'FAB5299ADBF442BD97C60C5B774A3463',
                SignCode: null,
                Name: '运动频率',
                TypeCode: 'SingleSelect',
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
                SortID: 170,
                State: 10,
                Description: null,
                CreatorTime: '2020-05-07T16:41:42.22',
                CreatorUserId: 'Admin'
            },
            {
                QuestionAnswerInfo: {
                    ID: null,
                    QuestionAnswerID: null,
                    QuestionID: '8DCB9E67A4964166981841CDBEDAA784',
                    StrValue: 'C8AFF1ED6E0D45CBA9FDFC75C6B2C237',
                    IntValue: null,
                    DecimalValue: null,
                    TextValue: null
                },
                QuestionOptions: [
                    {
                        ID: 'E55FDCFBA6D046EF87F1D71533AA0ED6',
                        QuestionID: '8DCB9E67A4964166981841CDBEDAA784',
                        SignCode: null,
                        Name: '步行',
                        Score: 0,
                        RejectOptionID: null,
                        IsHasText: false,
                        State: 10,
                        SortID: 10,
                        Description: null,
                        CreatorTime: '2020-05-07T16:41:42.22',
                        CreatorUserId: 'Admin',
                        checked: false
                    },
                    {
                        ID: 'C8AFF1ED6E0D45CBA9FDFC75C6B2C237',
                        QuestionID: '8DCB9E67A4964166981841CDBEDAA784',
                        SignCode: null,
                        Name: '慢跑',
                        Score: 0,
                        RejectOptionID: null,
                        IsHasText: false,
                        State: 10,
                        SortID: 20,
                        Description: null,
                        CreatorTime: '2020-05-07T16:41:42.22',
                        CreatorUserId: 'Admin',
                        checked: true
                    },
                    {
                        ID: '09AF066F8135486A85D4A92509226DAC',
                        QuestionID: '8DCB9E67A4964166981841CDBEDAA784',
                        SignCode: null,
                        Name: '健身车',
                        Score: 0,
                        RejectOptionID: null,
                        IsHasText: false,
                        State: 10,
                        SortID: 30,
                        Description: null,
                        CreatorTime: '2020-05-07T16:41:42.22',
                        CreatorUserId: 'Admin',
                        checked: false
                    },
                    {
                        ID: '6AA5E065C0D04A1BBD921C769FACCA7B',
                        QuestionID: '8DCB9E67A4964166981841CDBEDAA784',
                        SignCode: null,
                        Name: '游泳',
                        Score: 0,
                        RejectOptionID: null,
                        IsHasText: false,
                        State: 10,
                        SortID: 40,
                        Description: null,
                        CreatorTime: '2020-05-07T16:41:42.22',
                        CreatorUserId: 'Admin',
                        checked: false
                    },
                    {
                        ID: '63AD688226E746458F62675F3A802D5C',
                        QuestionID: '8DCB9E67A4964166981841CDBEDAA784',
                        SignCode: null,
                        Name: '器械',
                        Score: 0,
                        RejectOptionID: null,
                        IsHasText: false,
                        State: 10,
                        SortID: 50,
                        Description: null,
                        CreatorTime: '2020-05-07T16:41:42.22',
                        CreatorUserId: 'Admin',
                        checked: false
                    },
                    {
                        ID: 'C032D233ACF44C05907A6FA3A55BA9F8',
                        QuestionID: '8DCB9E67A4964166981841CDBEDAA784',
                        SignCode: null,
                        Name: '运动操',
                        Score: 0,
                        RejectOptionID: null,
                        IsHasText: false,
                        State: 10,
                        SortID: 60,
                        Description: null,
                        CreatorTime: '2020-05-07T16:41:42.22',
                        CreatorUserId: 'Admin',
                        checked: false
                    },
                    {
                        ID: 'C5CF4A9452CF4CFCBC5D24ABF590D51B',
                        QuestionID: '8DCB9E67A4964166981841CDBEDAA784',
                        SignCode: null,
                        Name: '家务劳动',
                        Score: 0,
                        RejectOptionID: null,
                        IsHasText: false,
                        State: 10,
                        SortID: 70,
                        Description: null,
                        CreatorTime: '2020-05-07T16:41:42.22',
                        CreatorUserId: 'Admin',
                        checked: false
                    },
                    {
                        ID: '0EF5CDD1D2A94CA886D42A9F221E7527',
                        QuestionID: '8DCB9E67A4964166981841CDBEDAA784',
                        SignCode: null,
                        Name: '其他',
                        Score: 0,
                        RejectOptionID: null,
                        IsHasText: false,
                        State: 10,
                        SortID: 80,
                        Description: null,
                        CreatorTime: '2020-05-07T16:41:42.22',
                        CreatorUserId: 'Admin',
                        checked: false
                    }
                ],
                ID: '8DCB9E67A4964166981841CDBEDAA784',
                QuestionGroupID: 'FAB5299ADBF442BD97C60C5B774A3463',
                SignCode: null,
                Name: '日常主要的体力活动（可多选）',
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
                SortID: 180,
                State: 10,
                Description: null,
                CreatorTime: '2020-05-07T16:41:42.22',
                CreatorUserId: 'Admin'
            },
            {
                QuestionAnswerInfo: {
                    ID: null,
                    QuestionAnswerID: null,
                    QuestionID: '89618FCA2A67490B9906C4CCA2D7696C',
                    StrValue: '6D57E80886C14A80855C91106F4E08E2',
                    IntValue: null,
                    DecimalValue: null,
                    TextValue: null
                },
                QuestionOptions: [
                    {
                        ID: '6D57E80886C14A80855C91106F4E08E2',
                        QuestionID: '89618FCA2A67490B9906C4CCA2D7696C',
                        SignCode: null,
                        Name: '<20分钟',
                        Score: 0,
                        RejectOptionID: null,
                        IsHasText: false,
                        State: 10,
                        SortID: 10,
                        Description: null,
                        CreatorTime: '2020-05-07T16:41:42.22',
                        CreatorUserId: 'Admin',
                        checked: true
                    },
                    {
                        ID: '442396194F374819AC6B70A788F9E533',
                        QuestionID: '89618FCA2A67490B9906C4CCA2D7696C',
                        SignCode: null,
                        Name: '20-40分钟',
                        Score: 0,
                        RejectOptionID: null,
                        IsHasText: false,
                        State: 10,
                        SortID: 20,
                        Description: null,
                        CreatorTime: '2020-05-07T16:41:42.22',
                        CreatorUserId: 'Admin',
                        checked: false
                    },
                    {
                        ID: '554836656D3D4AC3818F97857719C952',
                        QuestionID: '89618FCA2A67490B9906C4CCA2D7696C',
                        SignCode: null,
                        Name: '40-60分钟',
                        Score: 0,
                        RejectOptionID: null,
                        IsHasText: false,
                        State: 10,
                        SortID: 30,
                        Description: null,
                        CreatorTime: '2020-05-07T16:41:42.22',
                        CreatorUserId: 'Admin',
                        checked: false
                    },
                    {
                        ID: '8B2C35C7B36C40C885A03561538FE976',
                        QuestionID: '89618FCA2A67490B9906C4CCA2D7696C',
                        SignCode: null,
                        Name: '>60分钟',
                        Score: 0,
                        RejectOptionID: null,
                        IsHasText: false,
                        State: 10,
                        SortID: 40,
                        Description: null,
                        CreatorTime: '2020-05-07T16:41:42.22',
                        CreatorUserId: 'Admin',
                        checked: false
                    }
                ],
                ID: '89618FCA2A67490B9906C4CCA2D7696C',
                QuestionGroupID: 'FAB5299ADBF442BD97C60C5B774A3463',
                SignCode: null,
                Name: '每次运动时间',
                TypeCode: 'SingleSelect',
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
                SortID: 190,
                State: 10,
                Description: null,
                CreatorTime: '2020-05-07T16:41:42.22',
                CreatorUserId: 'Admin'
            }
        ],
        ID: 'FAB5299ADBF442BD97C60C5B774A3463',
        QuestionnaireID: '43DD04EF827842A1BBDE263106364C85',
        Code: 'RZ',
        Name: '认知',
        SortID: 300,
        State: 10,
        Description: null,
        CreatorTime: '2020-05-07T16:41:42.22',
        CreatorUserId: 'Admin'
    },
    {
        Questions: [
            {
                QuestionAnswerInfo: {
                    ID: null,
                    QuestionAnswerID: null,
                    QuestionID: 'F994570784B44568BA7B507FE3107C60',
                    StrValue: '915BBE5B0C3C4B558CBD1DAF22818E74',
                    IntValue: null,
                    DecimalValue: null,
                    TextValue: null
                },
                QuestionOptions: [
                    {
                        ID: 'B232B3146F0140078B401CC0F5D99745',
                        QuestionID: 'F994570784B44568BA7B507FE3107C60',
                        SignCode: null,
                        Name: '清楚',
                        Score: 0,
                        RejectOptionID: null,
                        IsHasText: false,
                        State: 10,
                        SortID: 10,
                        Description: null,
                        CreatorTime: '2020-05-07T16:41:42.22',
                        CreatorUserId: 'Admin',
                        checked: false
                    },
                    {
                        ID: '915BBE5B0C3C4B558CBD1DAF22818E74',
                        QuestionID: 'F994570784B44568BA7B507FE3107C60',
                        SignCode: null,
                        Name: '有限了解',
                        Score: 0,
                        RejectOptionID: null,
                        IsHasText: false,
                        State: 10,
                        SortID: 20,
                        Description: null,
                        CreatorTime: '2020-05-07T16:41:42.22',
                        CreatorUserId: 'Admin',
                        checked: true
                    },
                    {
                        ID: '262C858D55B947A6AFE11ADAACE3064C',
                        QuestionID: 'F994570784B44568BA7B507FE3107C60',
                        SignCode: null,
                        Name: '没概念',
                        Score: 0,
                        RejectOptionID: null,
                        IsHasText: false,
                        State: 10,
                        SortID: 30,
                        Description: null,
                        CreatorTime: '2020-05-07T16:41:42.22',
                        CreatorUserId: 'Admin',
                        checked: false
                    }
                ],
                ID: 'F994570784B44568BA7B507FE3107C60',
                QuestionGroupID: 'FC0D2BE8DE2E4A0F923A50A2B7782458',
                SignCode: null,
                Name: '对肥胖危害的认知',
                TypeCode: 'SingleSelect',
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
                SortID: 200,
                State: 10,
                Description: null,
                CreatorTime: '2020-05-07T16:41:42.22',
                CreatorUserId: 'Admin'
            },
            {
                QuestionAnswerInfo: {
                    ID: null,
                    QuestionAnswerID: null,
                    QuestionID: '8A747E0DB30C4DFD8EAF994808D96790',
                    StrValue: 'A0190D5273E943EF89A9CF3F8253769F',
                    IntValue: null,
                    DecimalValue: null,
                    TextValue: null
                },
                QuestionOptions: [
                    {
                        ID: 'DB79F7FE3BE94EE9B6C9BCB57C6345BB',
                        QuestionID: '8A747E0DB30C4DFD8EAF994808D96790',
                        SignCode: null,
                        Name: '影响寿命',
                        Score: 0,
                        RejectOptionID: null,
                        IsHasText: false,
                        State: 10,
                        SortID: 10,
                        Description: null,
                        CreatorTime: '2020-05-07T16:41:42.22',
                        CreatorUserId: 'Admin',
                        checked: false
                    },
                    {
                        ID: 'A0190D5273E943EF89A9CF3F8253769F',
                        QuestionID: '8A747E0DB30C4DFD8EAF994808D96790',
                        SignCode: null,
                        Name: '生育',
                        Score: 0,
                        RejectOptionID: null,
                        IsHasText: false,
                        State: 10,
                        SortID: 20,
                        Description: null,
                        CreatorTime: '2020-05-07T16:41:42.22',
                        CreatorUserId: 'Admin',
                        checked: true
                    },
                    {
                        ID: '10213D822A7A4D68BE427897634A1B9F',
                        QuestionID: '8A747E0DB30C4DFD8EAF994808D96790',
                        SignCode: null,
                        Name: '结婚',
                        Score: 0,
                        RejectOptionID: null,
                        IsHasText: false,
                        State: 10,
                        SortID: 30,
                        Description: null,
                        CreatorTime: '2020-05-07T16:41:42.22',
                        CreatorUserId: 'Admin',
                        checked: false
                    },
                    {
                        ID: '5536C3D26DC7401EAC5F3648E11DBCE1',
                        QuestionID: '8A747E0DB30C4DFD8EAF994808D96790',
                        SignCode: null,
                        Name: '上学',
                        Score: 0,
                        RejectOptionID: null,
                        IsHasText: false,
                        State: 10,
                        SortID: 40,
                        Description: null,
                        CreatorTime: '2020-05-07T16:41:42.22',
                        CreatorUserId: 'Admin',
                        checked: false
                    },
                    {
                        ID: 'C5BE279DD21A44FE9A14A514CE355AA5',
                        QuestionID: '8A747E0DB30C4DFD8EAF994808D96790',
                        SignCode: null,
                        Name: '交友',
                        Score: 0,
                        RejectOptionID: null,
                        IsHasText: false,
                        State: 10,
                        SortID: 50,
                        Description: null,
                        CreatorTime: '2020-05-07T16:41:42.22',
                        CreatorUserId: 'Admin',
                        checked: false
                    },
                    {
                        ID: 'A625CFA695BC48D9A965898EF297F8C9',
                        QuestionID: '8A747E0DB30C4DFD8EAF994808D96790',
                        SignCode: null,
                        Name: '健康',
                        Score: 0,
                        RejectOptionID: null,
                        IsHasText: false,
                        State: 10,
                        SortID: 60,
                        Description: null,
                        CreatorTime: '2020-05-07T16:41:42.22',
                        CreatorUserId: 'Admin',
                        checked: false
                    },
                    {
                        ID: '6E6FD6CB247D4478BE181CE6D6E0DAF5',
                        QuestionID: '8A747E0DB30C4DFD8EAF994808D96790',
                        SignCode: null,
                        Name: '美观',
                        Score: 0,
                        RejectOptionID: null,
                        IsHasText: false,
                        State: 10,
                        SortID: 70,
                        Description: null,
                        CreatorTime: '2020-05-07T16:41:42.22',
                        CreatorUserId: 'Admin',
                        checked: false
                    },
                    {
                        ID: '85DEDAE94791436EBD102F3AAD9959F2',
                        QuestionID: '8A747E0DB30C4DFD8EAF994808D96790',
                        SignCode: null,
                        Name: '其他',
                        Score: 0,
                        RejectOptionID: null,
                        IsHasText: false,
                        State: 10,
                        SortID: 90,
                        Description: null,
                        CreatorTime: '2020-05-07T16:41:42.22',
                        CreatorUserId: 'Admin',
                        checked: false
                    }
                ],
                ID: '8A747E0DB30C4DFD8EAF994808D96790',
                QuestionGroupID: 'FC0D2BE8DE2E4A0F923A50A2B7782458',
                SignCode: null,
                Name: '最主要的减重动机',
                TypeCode: 'SingleSelect',
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
                SortID: 210,
                State: 10,
                Description: null,
                CreatorTime: '2020-05-07T16:41:42.22',
                CreatorUserId: 'Admin'
            },
            {
                QuestionAnswerInfo: {
                    ID: null,
                    QuestionAnswerID: null,
                    QuestionID: 'D81497B5D3744EE39B7B0C35BD1151CD',
                    StrValue: 'E76B82603BF44C4595C1E91E9455EF1A',
                    IntValue: null,
                    DecimalValue: null,
                    TextValue: null
                },
                QuestionOptions: [
                    {
                        ID: 'FE978B4920BE4B3F9243D5DE2CE60AC6',
                        QuestionID: 'D81497B5D3744EE39B7B0C35BD1151CD',
                        SignCode: null,
                        Name: '非常强烈',
                        Score: 0,
                        RejectOptionID: null,
                        IsHasText: false,
                        State: 10,
                        SortID: 10,
                        Description: null,
                        CreatorTime: '2020-05-07T16:41:42.22',
                        CreatorUserId: 'Admin',
                        checked: false
                    },
                    {
                        ID: 'E76B82603BF44C4595C1E91E9455EF1A',
                        QuestionID: 'D81497B5D3744EE39B7B0C35BD1151CD',
                        SignCode: null,
                        Name: '比较强烈',
                        Score: 0,
                        RejectOptionID: null,
                        IsHasText: false,
                        State: 10,
                        SortID: 20,
                        Description: null,
                        CreatorTime: '2020-05-07T16:41:42.22',
                        CreatorUserId: 'Admin',
                        checked: true
                    },
                    {
                        ID: 'B49C08EAEFCE415892A2DAD9D131785C',
                        QuestionID: 'D81497B5D3744EE39B7B0C35BD1151CD',
                        SignCode: null,
                        Name: '一般',
                        Score: 0,
                        RejectOptionID: null,
                        IsHasText: false,
                        State: 10,
                        SortID: 30,
                        Description: null,
                        CreatorTime: '2020-05-07T16:41:42.22',
                        CreatorUserId: 'Admin',
                        checked: false
                    },
                    {
                        ID: 'E8371D9C247F432AB95EF37E9A0D4AB5',
                        QuestionID: 'D81497B5D3744EE39B7B0C35BD1151CD',
                        SignCode: null,
                        Name: '无所谓',
                        Score: 0,
                        RejectOptionID: null,
                        IsHasText: false,
                        State: 10,
                        SortID: 40,
                        Description: null,
                        CreatorTime: '2020-05-07T16:41:42.22',
                        CreatorUserId: 'Admin',
                        checked: false
                    }
                ],
                ID: 'D81497B5D3744EE39B7B0C35BD1151CD',
                QuestionGroupID: 'FC0D2BE8DE2E4A0F923A50A2B7782458',
                SignCode: null,
                Name: '减重意愿',
                TypeCode: 'SingleSelect',
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
                SortID: 220,
                State: 10,
                Description: null,
                CreatorTime: '2020-05-07T16:41:42.22',
                CreatorUserId: 'Admin'
            },
            {
                QuestionAnswerInfo: {
                    ID: null,
                    QuestionAnswerID: null,
                    QuestionID: 'C30674A5EC344C96AFF53BDE9EDE89FE',
                    StrValue: '3956083FC19341B48F8E9778CF210699',
                    IntValue: null,
                    DecimalValue: null,
                    TextValue: null
                },
                QuestionOptions: [
                    {
                        ID: '3956083FC19341B48F8E9778CF210699',
                        QuestionID: 'C30674A5EC344C96AFF53BDE9EDE89FE',
                        SignCode: null,
                        Name: '经常减重',
                        Score: 0,
                        RejectOptionID: null,
                        IsHasText: false,
                        State: 10,
                        SortID: 10,
                        Description: null,
                        CreatorTime: '2020-05-07T16:41:42.22',
                        CreatorUserId: 'Admin',
                        checked: true
                    },
                    {
                        ID: 'B83D12A9D2474C28BB58E16BEA31F7F2',
                        QuestionID: 'C30674A5EC344C96AFF53BDE9EDE89FE',
                        SignCode: null,
                        Name: '反复反弹',
                        Score: 0,
                        RejectOptionID: null,
                        IsHasText: false,
                        State: 10,
                        SortID: 20,
                        Description: null,
                        CreatorTime: '2020-05-07T16:41:42.22',
                        CreatorUserId: 'Admin',
                        checked: false
                    },
                    {
                        ID: 'A46832863E3F43CEBAC3BB512C255584',
                        QuestionID: 'C30674A5EC344C96AFF53BDE9EDE89FE',
                        SignCode: null,
                        Name: '未曾尝试',
                        Score: 0,
                        RejectOptionID: null,
                        IsHasText: false,
                        State: 10,
                        SortID: 30,
                        Description: null,
                        CreatorTime: '2020-05-07T16:41:42.22',
                        CreatorUserId: 'Admin',
                        checked: false
                    }
                ],
                ID: 'C30674A5EC344C96AFF53BDE9EDE89FE',
                QuestionGroupID: 'FC0D2BE8DE2E4A0F923A50A2B7782458',
                SignCode: null,
                Name: '是否有过减重经历？',
                TypeCode: 'SingleSelect',
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
                SortID: 230,
                State: 10,
                Description: null,
                CreatorTime: '2020-05-07T16:41:42.22',
                CreatorUserId: 'Admin'
            },
            {
                QuestionAnswerInfo: {
                    ID: null,
                    QuestionAnswerID: null,
                    QuestionID: '20BB1041383F4C76940FC3865FA0FB26',
                    StrValue: 'E6E3446ABD57412BA62A41A756365C79',
                    IntValue: null,
                    DecimalValue: null,
                    TextValue: null
                },
                QuestionOptions: [
                    {
                        ID: '96C98EE8726A4324A72E248AB6BD7D50',
                        QuestionID: '20BB1041383F4C76940FC3865FA0FB26',
                        SignCode: null,
                        Name: '不能持久',
                        Score: 0,
                        RejectOptionID: null,
                        IsHasText: false,
                        State: 10,
                        SortID: 10,
                        Description: null,
                        CreatorTime: '2020-05-07T16:41:42.22',
                        CreatorUserId: 'Admin',
                        checked: false
                    },
                    {
                        ID: 'E6E3446ABD57412BA62A41A756365C79',
                        QuestionID: '20BB1041383F4C76940FC3865FA0FB26',
                        SignCode: null,
                        Name: '不能有效',
                        Score: 0,
                        RejectOptionID: null,
                        IsHasText: false,
                        State: 10,
                        SortID: 20,
                        Description: null,
                        CreatorTime: '2020-05-07T16:41:42.22',
                        CreatorUserId: 'Admin',
                        checked: true
                    },
                    {
                        ID: 'A2410881170241D1AB50DD3B8E562FF2',
                        QuestionID: '20BB1041383F4C76940FC3865FA0FB26',
                        SignCode: null,
                        Name: '经常反弹',
                        Score: 0,
                        RejectOptionID: null,
                        IsHasText: false,
                        State: 10,
                        SortID: 30,
                        Description: null,
                        CreatorTime: '2020-05-07T16:41:42.22',
                        CreatorUserId: 'Admin',
                        checked: false
                    }
                ],
                ID: '20BB1041383F4C76940FC3865FA0FB26',
                QuestionGroupID: 'FC0D2BE8DE2E4A0F923A50A2B7782458',
                SignCode: null,
                Name: '减重不成功的主要原因（可多选）',
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
                SortID: 240,
                State: 10,
                Description: null,
                CreatorTime: '2020-05-07T16:41:42.22',
                CreatorUserId: 'Admin'
            },
            {
                QuestionAnswerInfo: {
                    ID: null,
                    QuestionAnswerID: null,
                    QuestionID: '4BFB80E107AD4467865F0116C96C7699',
                    StrValue: null,
                    IntValue: null,
                    DecimalValue: 113.8,
                    TextValue: null
                },
                QuestionOptions: [],
                ID: '4BFB80E107AD4467865F0116C96C7699',
                QuestionGroupID: 'FC0D2BE8DE2E4A0F923A50A2B7782458',
                SignCode: 'WishWeight',
                Name: '您希望减重',
                TypeCode: 'Num',
                IsRequired: true,
                BindQuestionID: null,
                Max: null,
                Min: null,
                MaxLength: null,
                MinLength: null,
                Precision: 1,
                Prefix: null,
                Suffix: 'kg',
                Layout: null,
                Placeholder: null,
                SortID: 250,
                State: 10,
                Description: null,
                CreatorTime: '2020-05-07T16:41:42.22',
                CreatorUserId: 'Admin'
            },
            {
                QuestionAnswerInfo: {
                    ID: null,
                    QuestionAnswerID: null,
                    QuestionID: '052FC64772944C81B0C2B3D8B42501F0',
                    StrValue: '7272B6B7AE754E8286DCC30D6DEAF265',
                    IntValue: null,
                    DecimalValue: null,
                    TextValue: null
                },
                QuestionOptions: [
                    {
                        ID: '8DAE53F775EB4A96A45DE178BE00AD58',
                        QuestionID: '052FC64772944C81B0C2B3D8B42501F0',
                        SignCode: null,
                        Name: '3个月',
                        Score: 0,
                        RejectOptionID: null,
                        IsHasText: false,
                        State: 10,
                        SortID: 10,
                        Description: null,
                        CreatorTime: '2020-05-07T16:41:42.22',
                        CreatorUserId: 'Admin',
                        checked: false
                    },
                    {
                        ID: '7272B6B7AE754E8286DCC30D6DEAF265',
                        QuestionID: '052FC64772944C81B0C2B3D8B42501F0',
                        SignCode: null,
                        Name: '6个月',
                        Score: 0,
                        RejectOptionID: null,
                        IsHasText: false,
                        State: 10,
                        SortID: 20,
                        Description: null,
                        CreatorTime: '2020-05-07T16:41:42.22',
                        CreatorUserId: 'Admin',
                        checked: true
                    },
                    {
                        ID: '0E5731E1434F41F590C29B6E0372DC38',
                        QuestionID: '052FC64772944C81B0C2B3D8B42501F0',
                        SignCode: null,
                        Name: '12个月',
                        Score: 0,
                        RejectOptionID: null,
                        IsHasText: false,
                        State: 10,
                        SortID: 30,
                        Description: null,
                        CreatorTime: '2020-05-07T16:41:42.22',
                        CreatorUserId: 'Admin',
                        checked: false
                    },
                    {
                        ID: 'B6B476A828234891BFE16EA4DA9EEFC0',
                        QuestionID: '052FC64772944C81B0C2B3D8B42501F0',
                        SignCode: null,
                        Name: '2年及以上',
                        Score: 0,
                        RejectOptionID: null,
                        IsHasText: false,
                        State: 10,
                        SortID: 40,
                        Description: null,
                        CreatorTime: '2020-05-07T16:41:42.22',
                        CreatorUserId: 'Admin',
                        checked: false
                    }
                ],
                ID: '052FC64772944C81B0C2B3D8B42501F0',
                QuestionGroupID: 'FC0D2BE8DE2E4A0F923A50A2B7782458',
                SignCode: null,
                Name: '希望减重完成的时间',
                TypeCode: 'SingleSelect',
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
                SortID: 260,
                State: 10,
                Description: null,
                CreatorTime: '2020-05-07T16:41:42.22',
                CreatorUserId: 'Admin'
            }
        ],
        ID: 'FC0D2BE8DE2E4A0F923A50A2B7782458',
        QuestionnaireID: '43DD04EF827842A1BBDE263106364C85',
        Code: 'YD',
        Name: '运动',
        SortID: 400,
        State: 10,
        Description: null,
        CreatorTime: '2020-05-07T16:41:42.22',
        CreatorUserId: 'Admin'
    }
]
export default {
    name: 'lookInfo',
    data() {
        return {
            SZtabs: ['疾病', '饮食', '运动', '认知'],
            SFtabs: ['体重', '症状', '饮食', '运动'],
            activeIndex: 0,
            questionGroups: dataArr,

            progressList: [
                { title: '超重', color: '#FFC261', grid: 4 },
                { title: '肥胖', color: '#FFA277', grid: 2 },
                { title: '中度肥胖', color: '#FF7575', grid: 5 },
                { title: '重度肥胖', color: '#EE81CF', grid: 5 },
                { title: '极重度肥胖', color: '#B078F3', grid: 4 }
            ],
            scoreBMI: 30, //BMI值向下取整
            leftStyle: '60',
            colorStyle: ''
        }
    },
    computed: {
        navTabs() {
            if (this.$route.query.type == 'follow') {
                return this.SFtabs
            } else {
                return this.SZtabs
            }
        }
    },
    created() {
        let type = this.$route.query.type
        if (type == 'follow') {
            document.title = '随访信息'
        } else {
            document.title = '首诊信息'
        }
        // this.getParams()
        this.computeBMI()
    },
    methods: {
        computeBMI() {
            //BMI值
            //向下取整,丢弃小数部分  Math.floor(7/2)　　// 3
            var _scoreBMI = parseFloat(this.scoreBMI)
            if (_scoreBMI >= 50) _scoreBMI = 50
            if (_scoreBMI < 24) _scoreBMI = 24
            var BMINum = 0
            BMINum = parseFloat((_scoreBMI - 24).toFixed(1))
            if (BMINum >= 20) BMINum = 19
            let _color = ''
            let _BMINum = Math.floor(BMINum)
            console.log(_BMINum)
            if (_BMINum <= 4) {
                _color = '#FFC261'
            } else if (_BMINum < 6) {
                _color = '#FFA277'
            } else if (_BMINum < 11) {
                _color = '#FF7575'
            } else if (_BMINum < 16) {
                _color = '#EE81CF'
            } else {
                _color = '#B078F3'
            }
            var leftStyle = Math.floor(BMINum) * 16 * 2
            if (leftStyle < 0) leftStyle = 0

            this.leftStyle = leftStyle
            this.colorStyle = _color
        },
        tabClick(e) {
            this.activeIndex = e
        }
    },
}
</script>

<style lang="less">
.wrapper {
    margin: 15px;
    background: #ffffff;
    box-shadow: 0 2px 10px 0 rgba(120, 121, 164, 0.1);
    border-radius: 4px;
}
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
.txt {
    font-size: 14px;
    color: #6d6d6d;
    padding-top: 15px;
    word-break: break-all;
    word-wrap: break-word;
}
.weui-navbar {
    z-index: 100;
    width: 100%;
    display: flex;
    background: #fff;
    border-bottom: 1px solid #e7e7f1;
    position: fixed;
    top: 0;
    left: 0;
    .weui-navbar__item {
        padding: 15px 0;
        font-size: 15px;
        color: #7a7a7a;
        position: relative;
        display: block;
        flex: 1;
        text-align: center;
        &.on:after {
            content: '';
            position: absolute;
            bottom: 0;
            left: 50%;
            margin-left: -7px;
            width: 15px;
            height: 4px;
            background: #6049f5;
            border-radius: 2.5px;
        }

        &.on .weui-navbar__title {
            font-family: PingFangSC-Medium;
            font-weight: bold;
            font-size: 16px;
            color: #6049f5;
        }
        .weui-navbar__title {
            display: inline-block;
            font-size: 15px;
            max-width: 8em;
            width: auto;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            word-wrap: normal;
        }
    }
}
.weui-tab__panel {
    box-sizing: border-box;
    height: 100%;
    padding-top: 50px;
    overflow: auto;
    -webkit-overflow-scrolling: touch;
}
/* BMI */
.scoreVal {
    display: inline-block;
}

.scoreVal .value {
    position: absolute;
    left: -22px;
    bottom: 12px;
    font-size: 24px;
    color: #3a3a3a;
    width: 48px;
    text-align: center;
}

.scoreVal .icon {
    position: relative;
    margin-left: -3px;
    font-size: 12px;
    color: #b078f3;
}

.scoreProgress {
    // width: 100%;
    position: relative;
    display: flex;
    margin-right: -5px;
}

.scoreProgress .itemList {
    width: 100%;
    height: 16px;
    display: flex;
}

.progressList .tit {
    margin-left: -8px;
}

.progressList:last-child .tit {
    margin-left: 0;
}

.progressList:last-child .item:last-child {
    margin-right: 0;
}

.progressList .item {
    width: 6px;
    height: 100%;
    border-radius: 4px;
    margin-right: 10px;
}

.progressList .tit {
    text-align: center;
    font-size: 11px;
    color: #6d6d6d;
    margin-top: 11px;
}
</style>