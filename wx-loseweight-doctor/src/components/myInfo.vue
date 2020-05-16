<template>
    <div class="contenter">
        <div class="wx_cell">
            <div class="cell_bd">未来号</div>
            <div class="cell_ft">103013</div>
        </div>
        <div class="wx_cell">
            <div class="cell_bd">姓名</div>
            <div class="cell_ft">小可爱</div>
        </div>
        <div class="wx_cell">
            <div class="cell_bd">手机号</div>
            <div class="cell_ft">17717957748</div>
        </div>
        <div class="wx_cell">
            <div class="cell_bd">单位</div>
            <div class="cell_ft">上海营康科技</div>
        </div>
        <div class="wx_cell">
            <div class="cell_bd">身份</div>
            <div class="cell_ft">营养（医）师</div>
        </div>
        <div class="wx_cell">
            <div class="cell_bd">科室</div>
            <div class="cell_ft">营养科</div>
        </div>
        <div class="wx_cell">
            <div class="cell_bd">职称</div>
            <div class="cell_ft">高级</div>
        </div>
        <div class="wx_cell">
            <div class="cell_bd">邮箱地址</div>
            <div class="cell_ft">
                <span class="c-a">去完善</span>
                <i class="icon cubeic-arrow"></i>
            </div>
        </div>
        <div class="wx_cell mt10">
            <div class="cell_bd">密码修改</div>
            <div class="cell_ft">
                <i class="icon cubeic-arrow"></i>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'myInfo',
    data() {
        return {}
    },
    methods: {},
}
</script>

<style lang="less" scoped>
.wx_cell {
    padding: 16px;
    position: relative;
    display: flex;
    align-items: center;
    font-size: 16px;
    color: #3a3a3a;
    background: #fff;
    &:before {
        content: '';
        position: absolute;
        left: 0;
        top: 0;
        right: 0;
        height: 1px;
        border-top: 1px solid #f2f2f2;
        left: 16px;
    }
    .cell_bd {
        flex: 1;
    }
    .cell_ft {
        text-align: right;
        color: #333;
    }
}
</style>