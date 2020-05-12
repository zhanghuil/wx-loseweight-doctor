<template>
    <div class="doctorBox">
        <div class="cardImg">
            <img class="img" src="../assets/man@2x.png" alt="" />
        </div>
        <div class="c-7a pl10 f14 pb10">
            <span class="f22 c-3a mr10">李晓红</span>医生
        </div>
        <div class="f14 c-7a pl10">上海营康人民医院 营养科</div>
        <div class="qrcode"></div>
    </div>
</template>

<script>
export default {
    name: 'doctorCard',
    mounted() {
        document
            .querySelector('body')
            .setAttribute('style', 'background-color:#f7f7f7')
    },
    beforeDestroy() {
        document.querySelector('body').setAttribute('style', '')
    }
}
</script>

<style scoped>
.doctorBox {
    background: #ffffff;
    box-shadow: 0 2px 10px 0 rgba(120, 121, 164, 0.1);
    border-radius: 4px;
    margin: 30px;
		padding: 10px;
		overflow: hidden;
}

.cardImg,
.cardImg .img {
    width: 295px;
    height: 295px;
    margin-bottom: 20px;
}
.qrcode {
    width: 80px;
    height: 80px;
    background: #ececec;
		border-radius: 2px;
		margin: 30px 0 0;
		float: right;
}
</style>