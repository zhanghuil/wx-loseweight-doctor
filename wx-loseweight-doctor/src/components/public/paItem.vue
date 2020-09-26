<template>
    <div
        class="paItem"
        :class="item.ReVisitingDate ? 'flstart' : 'flcenter'" @touchstart.prevent="touchin(item.PatientID)"
        @touchend="lookDetails(item.PatientID, item.Name)" @touchmove="gotouchmove"
    >
        <div>
            <img v-if="item.AvatarUrl" class="txImg" :src="item.AvatarUrl" @error="imgError()" />
						<template v-else>
							<template v-if="item.Sex == 0">
								<img class="txImg" src="../../assets/p1.png"/>
							</template>
							<template v-else>
								<img class="txImg" src="../../assets/p2.png"/>
							</template>
						</template>		
        </div>
        <div>
            <p>
                <strong>{{ item.Name }}</strong>
                <span
                    >{{ item.Weight }}kg，{{ item.Sex == 0 ? '男' : '女' }}，{{
                        item.Age
                    }}</span
                >
            </p>
            <p class="time" v-show="item.DiagnoseDate">首诊：{{ item.DiagnoseDate | formatDateStr }}</p>
            <p class="time" v-show="item.ReVisitingDate">
                计划下次复诊：{{ item.ReVisitingDate | formatDateStr }}
            </p>
        </div>
    </div>
</template>

<script>
import { formatDate } from '../../common/js/date'
export default {
    props: {
        item: Object
    },
    data() {
        return {
            errorImg0: require('@/assets/p1.png'),
            errorImg1: require('@/assets/p2.png')
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
        imgError() {
            let img = event.srcElement
            img.src = this.errorImg0
            img.onerror = null //防止闪图
				},
				//模拟点击事件
        lookDetails(id, name) {
            this.$emit('lookTap', { id: id, name: name })
				},
				//长按操作
				touchin(id) {
						this.$emit('touchin', { id: id })
				},
				gotouchmove(){
						this.$emit('gotouchmove', event.target)
				}
    }
}
</script>

<style lang="less">
.paItem {
    margin-bottom: 10px;
    padding: 15px;
    background: #ffffff;
    background: #ffffff;
    box-shadow: 0 2px 10px 0 rgba(120, 121, 164, 0.1);
    border-radius: 4px;
    display: flex;
    font-size: 14px;
    color: #6d6d6d;
    &.flstart {
        align-items: flex-start;
    }
    &.flcenter {
        align-items: center;
    }
    .txImg {
        width: 50px;
        height: 50px;
        border-radius: 50%;
        margin-right: 10px;
    }
    strong {
        font-size: 16px;
        color: #3a3a3a;
    }
    .time {
        padding-top: 10px;
        font-size: 12px;
        color: #aaaaaa;
    }
}
</style>