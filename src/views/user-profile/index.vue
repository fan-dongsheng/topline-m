<template>
  <div class="user-profile">
      <van-nav-bar title="个人信息"
      @click-left="$router.back()"
       left-arrow right-text="保存" />
    <van-cell-group>
      <van-cell title="头像"
      @click="avatar"
      is-link>
        <van-image
          round
          width="30"
          height="30"
          fit="cover"
          :src="user.photo"

        />
      </van-cell>
      <input type="file" hidden ref="fileInput" @change="image">
      <van-image-preview v-model="Imgshow" :images="images" >
          <van-nav-bar

            left-text="取消"
            right-text="确定"

            slot="cover"
            @click-right="onClickRight"
            @click-left="Imgshow = false"
            />

        </van-image-preview>
      <van-cell title="昵称" :value="user.name" is-link  @click="nameShow=true"/>
      <!-- 昵称弹出层 -->
      <van-popup
      v-model="nameShow"
      position="bottom"
      :style="{ height: '30%' }"
      class="popname"
    >
    <van-nav-bar

            left-text="取消"
            right-text="确定"
            title="昵称修改"
            @click-right="onNameEdit"
            @click-left="nameShow = false"
            />

    <van-field
        v-model="message"

        autosize

        type="textarea"
        maxlength="20"
        placeholder="请输入昵称"
        show-word-limit
      />
    </van-popup>
      <van-cell title="性别" :value="user.gender===0?'男':'女' "
      @click="genderShow=true"
      is-link />
      <van-action-sheet
      @select="onGenderEdit"
        v-model="genderShow"
        :actions="actions"
        cancel-text="取消"
        @cancel="genderShow=false"
      />
      <van-cell title="生日" :value="user.birthday" is-link  @click="birthdayShow=true"/>
      <van-popup
      v-model="birthdayShow"
      position="bottom"
      >
      <van-datetime-picker
      @confirm="onBirthdayEdit"
      @cancel="birthdayShow=false"
        :value="currentDate"
        type="date"
        :min-date="minDate"
        :max-date="maxDate"
      />
      </van-popup>
    </van-cell-group>
  </div>
</template>

<script>
import { getUserProfile, userAvatar, upUserProfile } from '@/api/user'
import moment from 'moment' // 日期

export default {
  data () {
    return {
      user: {}, // 个人用户资料
      images: [], // 图片预览文件
      Imgshow: false, // 图片预览显示
      nameShow: false, // 昵称弹出层
      message: '', // 昵称内容
      genderShow: false, // 性别显示
      actions: [ // 性别参数
        { name: '男', value: 0 },
        { name: '女', value: 1 }

      ],
      minDate: new Date(1970, 0, 1),
      maxDate: new Date(),
      // currentDate: new Date(),
      birthdayShow: false // 日期弹层

    }
  },
  computed: {
    file () {
      return this.$refs['fileInput']
    },
    // 日期改变
    currentDate () {
      return new Date(this.user.birthday)
    }
  },
  methods: {
    // 获取用户个人资料
    async getProfile () {
      const { data } = await getUserProfile()
      this.user = data.data
    },
    // 上传头像
    avatar () {
      this.file.click()
    },
    // 获取预览
    image () {
      // 获取文件对象
      // const file = this.files[0];

      // 设置图片的 src
      // 图片.src = window.URL.createObjectURL(file);
      const fileObj = this.file.files[0]
      this.images = [window.URL.createObjectURL(fileObj)]

      this.Imgshow = true
    },
    // 预览确定后,更新
    async onClickRight () {
      // 1.先获取文件对象,绑定到formdata中
      const fd = new FormData()
      fd.append('photo', this.file.files[0])
      // 2.调接口
      // 注意,formdata对象,append直接就把photo参数,穿进去了,所以只传fd就可以了
      const { data } = await userAvatar(fd)
      // 3.返回数据绑定
      this.user.photo = data.data.photo
      this.Imgshow = false
      this.$toast.success('更新头像成功')
    },
    // 更新昵称封装接口
    async upUserProfile (filed, value) {
      await upUserProfile({
        [filed]: value // 如果传key是变量的话 必须加[]
      })
    },
    // 昵称修改
    async onNameEdit () {
      await this.upUserProfile('name', this.message)
      this.user.name = this.message
      this.nameShow = false
      this.$toast.success('更新昵称成功')
    },

    // 性别修改
    async onGenderEdit (data) {
      await this.upUserProfile('gender', data.value)
      this.user.gender = data.value
      this.$toast.success('更新成功')
      this.genderShow = false
    },
    // 日期修改
    async onBirthdayEdit (value) {
      const date = moment(value).format('YYYY-MM-DD')
      await this.upUserProfile('birthday', date)
      this.user.birthday = date
      this.birthdayShow = false
      this.$toast.success('更新成功')
    }

  },
  created () {
    this.getProfile()
  }

}
</script>

<style lang="less" scoped>
  /deep/ .van-image-preview__cover {
    top: unset;
    left: 0;
    right: 0;
    bottom: 0;
    .van-nav-bar {
      background: rgb(25, 200, 212);
    }
  }
  .popname{
    .van-nav-bar__text{
    color: #fff;
  }
  }

</style>
