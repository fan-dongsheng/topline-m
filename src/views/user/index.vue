<template>
    <div class="user-container">
        <!-- //导航 -->
        <van-nav-bar title="标题" left-arrow/>
        <!-- 头部组件 -->
        <div class="userInfo">
            <van-image
            class="img"
                round
                src="https://img.yzcdn.cn/vant/cat.jpeg"
            />
            <div class="right">
                <div class="vans">
                     <div class="vans-cont">
                        <span>123</span>
                        <span>头条</span>
                        </div>
                     <div class="vans-cont">
                        <span>123</span>
                        <span>关注</span>
                        </div>
                     <div class="vans-cont">
                        <span>123</span>
                        <span>粉丝</span>
                        </div>
                     <div class="vans-cont">
                        <span>123</span>
                        <span>获赞</span>
                    </div>
                </div>
                <div class="msg">
                    <van-button type="primary" size="small">私信</van-button>
                    <van-button type="info" icon="plus" size="small">

                        关注</van-button>
                </div>
            </div>

        </div>
        <!-- //简介 -->
        <div class="introduc">
            <span>简介:</span>
            <span>安利个威风威风</span>
        </div>

    </div>
</template>

<script>
export default {

}
</script>

<style lang="less" scoped>
.user-container{
    .userInfo{
        background: #fff;
        padding: 10px 20px 10px 20px;
        display: flex;
        .img{
            width: 70px;
            height: 70px;
            flex: 20%;
        }
        .right{
            flex: 80%;
            .vans{
                font-size: 14px;
                display: flex;

                .vans-cont{
                    display: flex;
                    flex-direction: column;
                    flex: 1;
                    text-align: center;

                }
            }
            .msg{
                display: flex;
                padding:0 20px 0 20px;
                justify-content: space-between;
            }
        }
    }
    .introduc{
        font-size: 14px;
        padding: 20px;
        background:#fff;
    }
}

</style>
