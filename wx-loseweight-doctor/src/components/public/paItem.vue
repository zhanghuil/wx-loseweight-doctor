<template>
    <div
        class="paItem"
        :class="item.ReVisitingDate ? 'flstart' : 'flcenter'" @click="lookDetails(item.PatientID, item.Name)"
    >	
				<slot></slot>
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
						pid: '',
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
						this.$emit('gotouchmove', event)
				}
    }
}
</script>

<style lang="less">
.paItem {
	  position: relative;
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
.editPBox {
		text-align: right;
		position: absolute;
		top: 0;
		right: 0;
		.icon {
				font-size: 16px;
		}
		.editPTxt {
				top: -6px;
				right: 12px;
				border: 1px solid #e7e7f1;
				box-shadow: 0 2px 6px 0 rgba(120, 122, 167, 0.21);
				border-radius: 2px;
				background: #fff;
				color: #3a3a3a;
				font-size: 14px;
				position: relative;
				z-index: 10;
				.py10 {
						padding-top: 10px;
						padding-bottom: 10px;
				}
				.arrow {
						position: absolute;
						width: 14px;
						height: 14px;
						top: -14px;
						right: 2px;
				}
				.arrow i {
						display: block;
						border-color: transparent transparent #e7e7f1
								transparent;
						border-width: 6px;
						position: absolute;
						border-style: dashed dashed solid dashed;
						font-size: 0;
						line-height: 0;
						bottom: 1px;
				}
				.arrow span {
						display: block;
						border-color: transparent transparent #fff transparent;
						top: 2px;
						border-width: 6px;
						position: absolute;
						border-style: dashed dashed solid dashed;
						font-size: 0;
						line-height: 0;
				}
		}
}
</style>