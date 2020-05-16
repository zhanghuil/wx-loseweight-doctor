<template>
    <div class="p15 pb70">
        <div class="groupList">
            <!-- 组 -->
            <div
                v-for="(item, index) in list"
                :key="index"
                class="panelWrp p15 mb10"
                @click="editGroup(item.id, 'edit')"
            >
                <span class="f16 c-3a">{{ item.name }}</span>
                <span class="f14 c-6d">（{{ item.num }}）</span>
            </div>
        </div>
        <div class="footerEdit">
            <button class="yk-btn w-100" @click="editGroup(0, 'add')">
                添加
            </button>
        </div>
    </div>
</template>

<script>
export default {
    name: 'groupMag',
    data() {
        return {
            list: [
                {
                    name: '高蛋白',
                    num: 100,
                    id: 1
                },
                {
                    name: '限能量',
                    num: 50,
                    id: 2
                }
            ]
        }
    },
    methods: {
        editGroup(id, type) {
            // debugger
            this.$router.push({
                path: '/editGroup',
                query: { id: id, type: type }
            })
        }
    },
}
</script>

<style lang="less">
</style>