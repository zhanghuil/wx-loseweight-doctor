<template>
    <div class="uploadImg">
        <div class="upload-content">
            <ul class="img-list">
                <div class="uploadSec">
                    <img src="../../assets/add.png" alt="上传图标" />
                    <input
                        type="file"
                        value=""
                        class="chooseInput"
                        @change="onUpload"
                        multiple
                    />
                </div>
                <li
                    class="show-img"
                    v-for="(item, index) in imgList"
                    :key="index"
                >
                    <img :src="item" alt="" />
                    <i class="iconfont icon-close1"
                        :class="isDel == true ? '' : 'hide-del'"
                        name="error"
                        color="#FF685D"
                        @click.native="delImg(index)"
                    ></i>
                </li>
            </ul>
        </div>
    </div>
</template>
<script>
import { yktoast } from '../../common/js/util'
export default {
    data() {
        return {
            uploadNum: 8,
            fileList: [],
            imgList: []
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
        fileAdd(file, index) {
            let csrf_token = this.getCookie('XSRF-TOKEN')
            let formFile = new FormData()
            let imgName = 'img0'
            formFile.append(imgName, file)
            formFile.append('_token', csrf_token)
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
            if (size > 1 * 1024 * 1024) {
                yktoast('图片大小不能大于1M')
                return false
            }
            if (this.fileList.length >= this.uploadNum) {
                yktoast('图片最多只能上传' + this.uploadNum + '张')
                return false
            }

            axios
                .post(this.upUrl, formFile)
                .then(res => {
                    this.upNum = this.fileList.length + 1 //计算图片数量
                    this.fileList.push(file) //添加进图片数组
                    let imgUrl = this.showUrl + res.data.data //图片回显地址
                    let upImg = res.data.data //传给后台的图片地址
                    this.imgList.push(imgUrl)
                    this.upImgList.push(upImg)
                    let upImgAll = this.upImgList.join(',')
                    this.$emit('input', upImgAll)
                })
                .catch(err => {
                    console.log(err)
                })
        },
        // 删除图片
        delImg(index) {
            this.imgList.splice(index, 1)
            this.fileList.splice(index, 1)
            this.upNum = this.imgList.length
            let imgAll = this.imgList.join(',')
            this.$emit('input', imgAll)
        }
    }
}
</script>

<style lang="less">
.uploadImg {
    text-align: left;
    .upload-content {
        .img-list {
            display: inline-block;
            .show-img {
                position: relative;
                display: inline-block;
                margin-right: 0.12rem;
                height: 1.3rem;
                width: 1.3rem;
                img {
                    width: 100%;
                    height: 100%;
                }
                .hide-del {
                    display: none;
                }
                .yd-icon-error {
                    position: absolute;
                    top: 0;
                    right: 0;
                }
            }
            .uploadSec {
                margin-top: 14px;
                background: #f9f8fd;
                border-radius: 4px;
                width: 60px;
                height: 60px;
                display: flex;
                align-items: center;
                justify-content: center;
                position: relative;
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

