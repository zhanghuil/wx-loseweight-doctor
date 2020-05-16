<template>
    <div id="app">
        <!-- <router-view /> -->
        <!-- <loading v-if="showLoading"></loading> -->
        <!-- //这里需要缓存，使用keep-alive标签包裹 -->
        <keep-alive>
            <router-view v-if="$route.meta.keepAlive"></router-view>
        </keep-alive>
        <!-- //这里不需要缓存 -->
        <router-view v-if="!$route.meta.keepAlive"></router-view>
    </div>
</template>

<script>
export default {
    name: 'app'
}
</script>

<style lang="less">
@import 'common/less/mixin.less';
body{
	background-color: #f7f7f7;
}
</style>
