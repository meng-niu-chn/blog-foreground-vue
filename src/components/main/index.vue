<template>
  <div class="home">
    <el-row id="artList" type="flex" justify="space-around">
      <el-col :span="16">
        <el-row class="art-item" :span="4" v-for="(item) in article" :key="item.id" :gutter="20">
          <el-card shadow="hover">
            <el-col :span="18">
              <el-row class="art-info d-flex align-items-center justify-content-start">
                <h5>
                  <!-- <router-link to="/article" tag="span" class="art-title"></router-link> -->
                  <span class="art-title" @click="toArticle(item.id)">{{item.title}}
                  </span>
                </h5>
                <div class="art-time">
                  <i class="el-icon-time"></i>
                  ：{{item.publishTime}}
                </div>
                <div class="d-flex align-items-center">
                  <!-- <img class="tag" src="../assets/tag.png" />： -->
                  <i class="el-icon-menu"></i>:
                  <el-tag size="mini">{{item.category}}</el-tag>
                </div>
                <div class="side-abstract">
                  <div class="art-abstract">{{item.contentMd.substring(0,100)}}</div>
                  <br />
                  <div class="art-more">
                    
                      <!-- <el-button plain>kan all</el-button> -->
                      <el-button type="text" @click="toArticle(item.id)">查看全文</el-button>
                      <el-button type="text" ><i class="el-icon-view view">{{item.views}}</i></el-button>
                      
                    
                    <!-- <div class="view">
                      
                    </div> -->
                  </div>
                </div>
              </el-row>
            </el-col>
            <el-col :span="6">
              <div class="side-img hidden-sm-and-down">
                <!-- <img class="art-banner" src="item.titlePic" /> -->
                <!-- <img class="art-banner" src="item.titlePic" /> -->
                <img class="art-banner" src="../../imgs/test.jpg" />
              </div>
            </el-col>
          </el-card>
        </el-row>

        <!-- <div class="block pagination">
          <el-pagination layout="prev, pager, next" :total="50"></el-pagination>
        </div>-->
        <!-- 分页 -->
        <br />
        <div class="pagination">
          <el-pagination
            background
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="pageConf.pageCode"
            :page-sizes="pageConf.pageOption"
            :page-size="pageConf.pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="pageConf.totalPage"
          ></el-pagination>
        </div>
      </el-col>
      <!-- tag link -->
      <el-col :span="6" class="hidden-sm-and-down" id="side">
        <!-- category -->
        <div class="item">
          <div class="category">
            <el-card class="box-card">
              <div slot="header" class="d-flex align-items-center">
                <img class="card-icon" src="../assets/biaoqian.png" />
                <span>category</span>
              </div>
              <div class="text item">
                <el-menu>
                  <el-menu-item index="0" @click="pageConf.categoryId='';reloadList()">
                    <span slot="title">全部 ({{articleTotal}})</span>
                  </el-menu-item>
                  <el-menu-item
                    :index="item.id"
                    v-for="item in categorys"
                    :key="item.id"
                    @click="selectMenu(item.id)"
                  >
                    <i class="el-icon-menu"></i>
                    <span slot="title">{{item.name}} ({{item.count}})</span>
                  </el-menu-item>
                </el-menu>
              </div>
            </el-card>
          </div>
        </div>
        <!-- tag -->
        <div class="item">
          <div class="tag">
            <el-card class="box-card">
              <div slot="header" class="d-flex align-items-center">
                <img class="card-icon" src="../assets/biaoqian.png" />
                <span>tag</span>
              </div>
              <div class="text item">
                <el-tag
                  size="mini"
                  class="tag-item"
                  :type="colorArray[item.id%4]"
                  v-for="item in tags"
                  :key="item.id"
                >{{item.name}}</el-tag>
              </div>
            </el-card>
          </div>
        </div>
        <!-- link -->
        <div class="item">
          <div class="friend">
            <el-card class="box-card">
              <div slot="header" class="d-flex align-items-center">
                <img class="card-icon" src="../assets/lianjie.png" />
                <span>link</span>
              </div>

              <div class="text item" v-for="item in links" :key="item.id">
                <a href="item.url">{{item.name}}</a>
              </div>
            </el-card>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import api from "../../api/index";
export default {
  data() {
    return {
      currentDate: new Date(),
      colorArray: ["", "success", "warning", "danger"],
      article: [
        {
          id: "",
          title: "",
          titlePic: "",
          category: "",
          author: "",
          content: "",
          contentMd: "",
          state: "",
          views: "",
          publishTime: "",
          editTime: "",
          createTime: ""
        }
      ],
      //分页选项
      pageConf: {
        //设置一些初始值(会被覆盖)
        pageCode: 1, //当前页
        pageSize: 5, //每页显示的记录数
        totalPage: 12, //总记录数
        pageOption: [5, 10, 20], //分页选项
        categoryId: "" //查询条件（category）
      },
      articleTotal: 0,
      links: [
        {
          id: "",
          name: "",
          url: ""
        }
      ],
      tags: [
        {
          id: "",
          name: ""
        }
      ],
      categorys: [
        {
          id: "",
          name: "",
          count: ""
        }
      ]
    };
  },
  created() {
    this.search(this.pageConf.pageCode, this.pageConf.pageSize);
    this.getLinks();
    this.getTags();
    this.getCategorys();
  },

  methods: {
     toArticle(id) {
       this.$router.push("/main/article/" + id)
     },
    selectMenu(id) {
      this.pageConf.categoryId = id;
      this.reloadList();
    },
    getCategorys() {
      this.axios.get(api.getCaategorys).then(response => {
        if (response.data.code == 200) {
          this.categorys = response.data.data;
        }
      });
    },
    getTags() {
      this.axios.get(api.getTags).then(response => {
        if (response.data.code == 200) {
          this.tags = response.data.data;
        }
      });
    },
    getLinks() {
      this.axios.get(api.getLinks).then(response => {
        if (response.data.code == 200) {
          this.links = response.data.data;
        }
      });
    },
    //刷新列表
    reloadList() {
      this.search(this.pageConf.pageCode, this.pageConf.pageSize);
    },
    //条件查询
    search(pageCode, pageSize) {
      this.axios
        .get(api.getArticlesByPage, {
          params: {
            start: this.pageConf.pageCode,
            size: this.pageConf.pageSize,
            categoryId: this.pageConf.categoryId
          }
        })
        .then(response => {
          this.article = response.data.data.records;
          console.log(response.data.data.records);
          if (response.data.data.total > this.articleTotal) {
            this.articleTotal = response.data.data.total;
          }
          this.pageConf.totalPage = response.data.data.total;
        });
    },
    //pageSize改变时触发的函数
    handleSizeChange(val) {
      this.search(this.pageConf.pageCode, val);
    },
    //当前页改变时触发的函数
    handleCurrentChange(val) {
      this.pageConf.pageCode = val; //为了保证刷新列表后页面还是在当前页，而不是跳转到第一页
      this.search(val, this.pageConf.pageSize);
    }
  }
};
</script>

<style scoped>
body {
  font-size: 12px;
  line-height: 12px;
}

#side .item {
  margin-bottom: 30px;
}

.art-item {
  margin-bottom: 30px;
  position: relative;
}

.art-item .star {
  width: 60px;
  height: 60px;
  position: absolute;
  top: 0;
  right: 0;
}

img.tag {
  width: 16px;
  height: 16px;
}

.art-title {
  border-left: 3px solid #f56c6c;
  padding-left: 5px;
  cursor: pointer;
}

.art-title:hover {
  padding-left: 10px;
  color: #409eff;
}

.art-time {
  margin-right: 20px;
}

.art-body {
  display: flex;
  padding: 10px 0;
}

.side-img {
  height: 180px;
  width: 250px;
  overflow: hidden;
  margin: 0 auto;
  margin-right: 10px;
  margin-bottom: 10px;
}

img.art-banner {
  width: 100%;
  height: 100%;
  transition: all 0.6s;
}

img.art-banner:hover {
  transform: scale(1.4);
}

.side-abstract {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.art-abstract {
  flex: 1;
  color: #aaa;
}

.art-more {
  height: 40px;
  display: flex;
  justify-content: space-between;
  /* space-between */
  align-items: flex-end;
}

.art-more .view {
  color: #aaa;
}
h5 {
  font-size: 18px;
}
.pagination {
  background-color: #f9f9f9;
}
/* tag */
.box-card .item:hover {
  color: #409eff;
  cursor: pointer;
}

.box-card span {
  font-weight: bold;
}

.card-icon {
  width: 20px;
  height: 20px;
  margin-right: 10px;
}

.tag-item {
  margin-right: 10px;
}

/* friends */
.box-card .item a {
  text-decoration: none;
  /*color: #F56C6C;*/
}
.box-card span {
  font-weight: bold;
}
.card-icon {
  width: 20px;
  height: 20px;
  margin-right: 10px;
}
/* card */
.time {
  font-size: 13px;
  color: #999;
}

.bottom {
  margin-top: 13px;
  line-height: 12px;
}

.button {
  padding: 0;
  float: right;
}

.image {
  width: 100%;
  display: block;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}

.clearfix:after {
  clear: both;
}
</style>