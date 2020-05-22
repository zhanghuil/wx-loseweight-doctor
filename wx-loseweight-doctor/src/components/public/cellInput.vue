<template>
    <div class="cellInput">
        <li class="input_1 rel">
            <input
                class="input"
                required
                :type="type"
                :placeholder="placeholder"
                :maxlength="maxlength"
                ref="input"
                :value="value"
                @input="$emit('input', $event.target.value)"
            />
            <div class="clear" v-show="clearable">
                <i
                    class="cubeic-wrong"
                    @click="$emit('clear', $event.target.value)"
                ></i>
            </div>
        </li>
    </div>
</template>
<script>
//  @click="clearInput"
export default {
    props: {
        cell_title: String,
        placeholder: {
            type: String,
            value: ''
        },
        value: {
            type: String,
            value: ''
        },
        type: {
            type: String,
            value: 'text'
				},
				// 是否启用密码控件
        pwdable: {
            type: Boolean,
            value: false
        },
        // 是否启用清除控件
        clearable: {
            type: Boolean,
            value: false
        },
        maxlength: {
            type: [Number, String],
            value: '100'
        }
    },
    methods: {}
}
</script>

<style lang="less" scoped>
.cellInput {
    width: 100%;
    background: #fff;
    .input_1 {
        margin-top: 21px;
        width: 100%;
        box-sizing: border-box;
        display: flex;
        align-items: center;
        align-content: space-between;
        position: relative;
        .input {
            flex: 1;
            width: 100%;
            border-bottom: 1px solid #d8d8e4;
            font-size: 18px;
            color: #3a3a3a;
        }
        i {
            color: #aaaaaa;
            font-size: 18px;
        }
        .clear {
            display: none;
            width: 24px;
            position: absolute;
            right: 0;
            top: -16px;
        }
        .input:valid + .clear {
            display: block;
        }
    }
}
</style>
