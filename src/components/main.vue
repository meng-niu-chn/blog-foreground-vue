<template>
  <div>
    <!-- header -->
    <div :class="{'navBarWrap':navBarFixed}">
      <el-menu
        :default-active="activeIndex"
        class="d-flex"
        mode="horizontal"
        router
        type="flex"
        float="right"
      >
        <!-- <el-menu-item index="/home">主页</el-menu-item>
        <el-menu-item index="/archive">归档</el-menu-item>
        <el-menu-item index="/about">关于我</el-menu-item>-->

        <!-- <el-row :gutter="20">
          <el-col :span="15">
            <el-menu-item class="mr-auto">FZY</el-menu-item>
          </el-col>
          <el-col :span="3">
            <el-menu-item index="/home">主页</el-menu-item>
          </el-col>
          <el-col :span="3">
            <el-menu-item index="/archive">归档</el-menu-item>
          </el-col>
          <el-col :span="3">
            <el-menu-item index="/about">关于我</el-menu-item>
          </el-col>
        </el-row> -->
        <el-menu-item class="mr-auto">GolBlog</el-menu-item>
        <el-menu-item index="/main/index">主页</el-menu-item>
        <el-menu-item index="/main/archive">归档</el-menu-item>
        <el-menu-item index="/main/about">关于我</el-menu-item>
      </el-menu>
    </div>

    <!-- container -->
    <el-row type="flex" justify="center" id="content">
      <el-col :xs="20" :md="20" :style="{'minHeight':minHeight+'px'}">
        <router-view></router-view>
      </el-col>
    </el-row>

    <!-- foot -->
    <div class="footer">
      <el-main class="main">
        <el-row type="flex" class="row-bg" justify="space-around">
          <!--<el-col :span="8" class="item-col">
				<div class="title">常用工具</div>
				<div class="item"><a href="#" class="out-link">aaa</a></div>
				<div class="item"><a href="#" class="out-link">aa</a></div>
          </el-col>-->
          <el-col :span="12" class="item-col">
            <div class>
              <a href="http://iguxu.cn" class="out-link">GoBlog</a>
            </div>
            <div class>
              <a href="https://github.com/niu6364" class="out-link">GitHub</a>
            </div>
          </el-col>
          <el-col :span="12" class="item-col weside">
            <div class="item">
              <i class="el-icon-caret-right"></i>
              niu6364@foxmail.com
            </div>
            <div class="item">
              <i class="el-icon-caret-right"></i>
              © GolBlog | 鲁ICP备17027863号
            </div>
          </el-col>
        </el-row>
      </el-main>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      activeIndex: "/home",
      minHeight: 0,
      navBarFixed: false
    };
  },
  methods: {
    watchScroll() {
      var scrollTop =
        window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop;
      //  当滚动超过 50 时，实现吸顶效果
      if (scrollTop > 50) {
        this.navBarFixed = true;
      } else {
        this.navBarFixed = false;
      }
    }
  },
  mounted() {
    let that = this;
    that.minHeight = document.documentElement.clientHeight;
    window.addEventListener("scroll", that.watchScroll);
    window.onresize = function() {
      that.minHeight = document.documentElement.clientHeight;
    };
  }
};
</script>

<style>
/* foot */
.footer {
  padding: 20px;
  text-align: center;
  color: #fff;
  background-color: #555;
}
.footer .main {
  width: 70%;
  margin: 0 auto;
  color: #ccc;
}
.footer .out-link {
  text-decoration: none;
  color: #ccc;
}
.footer .out-link:hover {
  color: #ffffff;
}
.footer .item-col {
  text-align: left;
}
.footer .item-col.weside {
  font-size: 14px;
}
.footer .item-col .title {
  color: #ddd;
  margin-bottom: 10px;
}
.footer .item span {
  margin-right: 5px;
}
.app {
  font-family: "microsoft yahei";
}
#content {
  background-color: #f9f9f9;
  padding: 30px 0;
}
.navBarWrap {
  position: fixed;
  top: 0;
  z-index: 999;
  width: 100%;
}
</style>



