<template>
    <div class="my-textarea">
        <textarea
            ref="textarea"
            :placeholder="placeholder"
            :style="{ height: height }"
            v-model="value"
            class="textarea"
            maxlength="200"
            @input="getHeight()"
        ></textarea>
    </div>
</template>

<script>
import calcTextareaHeight from '@/assets/calcTextareaHeight'

export default {
    name: 'my-textarea',
    data() {
        return {
            // textarea内容
            value: this.parentValue,
            // 动态高度
            height: '46px'
        }
    },
    props: {
        parentValue: {
            type: String,
            value: ''
        },
        placeholder: {
            type: String,
            value: ''
        }
    },
    watch: {
        value() {
            this.getHeight()
        }
    },
    methods: {
        getHeight() {
            this.height = calcTextareaHeight(
                this.$refs.textarea,
                1,
                null
            ).height
            this.$emit('parentValue', this.value)
        }
    }
}
</script>

<style scoped>
.my-textarea {
    padding: 0 10px 0 0;
    margin-top: 18px;
}
textarea::-webkit-input-placeholder {
    color: #aaaaaa;
    font-size: 14px;
    font-family: '微软雅黑';
}
.my-textarea .textarea {
    background: none;
    border: none;
    background: #f5f5f5;
    width: 100%;
    padding: 10px 15px;
    box-sizing: border-box;
    font-size: 14px;
		line-height: 26px;
    color: #3a3a3a;
    resize: none;
    font-family: '微软雅黑';
}
</style>
