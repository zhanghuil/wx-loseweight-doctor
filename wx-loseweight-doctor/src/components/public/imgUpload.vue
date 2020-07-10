<template>
    <div class="uploadImg">
        <div class="upload-content">
            <ul class="img-list">
                <li
                    class="show-img"
                    v-for="(item, index) in imgList"
                    :key="index"
                >
                    <img :src="item" alt="" @click="handleImgsClick(index)" />
                    <i
                        class="iconfont icon-close1 closeImg"
                        name="error"
                        color="#FF685D"
                        @click="delImg(index)"
                    ></i>
                </li>
                <div class="uploadSec">
                    <div class="con">
                        <img src="../../assets/add.png" alt="上传图标" />
                        <input
                            type="file"
                            value=""
                            class="chooseInput"
                            @change="onUpload"
                            accept="image/gif, image/jpeg, image/jpg, image/png, image/svg"
                            multiple
                        />
                    </div>
                </div>
            </ul>
        </div>
    </div>
</template>
<script>
import { yktoast } from '../../common/js/util'
import { webApi } from '../../request/env'
export default {
    props: ['uploadNum', 'title', 'upUrl', 'ans'],
    data() {
        return {
            initialIndex: 0,
            fileList: [],
            imgList: [],
            upImgList: []
        }
    },
    watch: {
        imgList() {
            this.$emit('changeNum') //触发父组件中验证资料是否完整的方法
        }
    },
    methods: {
        // 上传操作
        onUpload(e) {
            let photoFile = e.target
            let val = e.target.value
            // 判断是否符合上传条件
            if (photoFile.files.length === 0) return false
            for (let i = 0; i < photoFile.files.length; i++) {
                this.fileAdd(photoFile.files[i], i)
            }
        },
        // 添加图片
        fileAdd(file) {
            let formFile = new FormData() //通过formData上传
            formFile.append('File', file)
            let name = file.name
            let size = file.size
            let types = '.jpg,.jpeg,.png,.gif' //文件格式
            let fileExt = name.substring(name.lastIndexOf('.')).toLowerCase()
            let result = types.indexOf(fileExt)
            if (result < 0) {
                //验证图片格式
                yktoast('图片格式不正确')
                return false
            }
            if (size > 3 * 1024 * 1024) {
                yktoast('图片大小不能大于3M')
                return false
            }
            if (this.fileList.length >= this.uploadNum) {
                yktoast('图片最多只能上传' + this.uploadNum + '张')
                return false
            }

            var _this = this
            let url = this.api.userApi.UploadDoctorAssessImg
            this.$fetchPostFile(url, formFile, 700).then(response => {
                let result = response.data.data
                this.fileList.push(file) //添加进图片数组
                let imgUrl = webApi + result //图片回显地址
                let upImg = result //传给后台的图片地址
                this.imgList.push(imgUrl)
                this.upImgList.push(upImg)
                let upImgAll = this.upImgList.join(',')
                this.ans.StrValue = upImgAll
                this.$emit('input', this.ans)
            })
        },
        // 删除图片
        delImg(index) {
            this.imgList.splice(index, 1)
            this.fileList.splice(index, 1)
            this.upImgList.splice(index, 1)
            let upImgList = this.upImgList.join(',')
            this.ans.StrValue = upImgList
            this.$emit('input', this.ans)
        },
        // 点击查看大图-图片预览
        handleImgsClick(index) {
            this.initialIndex = index
            const params = {
                $props: {
                    imgs: this.imgList,
                    initialIndex: 'initialIndex', // 响应式数据的key名
                    loop: false
                },
                $events: {
                    change: i => {
                        // 必须更新 initialIndex
                        this.initialIndex = i
                    }
                }
            }
            this.$createImagePreview({ ...params }).show()
        }
    }
}
</script>

<style lang="less">
.uploadImg {
    text-align: left;
    .upload-content {
        .img-list {
            overflow: hidden;
            padding-top: 4px;
            .show-img {
                position: relative;
                float: left;
                margin: 10px 10px 0 0;
                height: 60px;
                width: 60px;
                border-radius: 4px;
                padding: 0;
                img {
                    width: 100%;
                    height: 100%;
                }
                .closeImg {
                    background: #ffffff;
                    position: absolute;
                    right: -2px;
                    top: -2px;
                    font-size: 18px;
                    border-radius: 18px;
                    color: #6049f5;
                    border: 2px solid #ffffff;
                }
            }
            .uploadSec {
                float: left;
                margin-top: 10px;
                background: #f9f8fd;
                border-radius: 4px;
                width: 60px;
                height: 60px;
                .con {
                    width: 60px;
                    height: 60px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    position: relative;
                }
                img {
                    width: 24px;
                    height: 24px;
                }
                input.chooseInput {
                    position: absolute;
                    width: 100%;
                    height: 100%;
                    left: 0;
                    top: 0;
                    opacity: 0;
                }
            }
        }
    }
}
</style>

