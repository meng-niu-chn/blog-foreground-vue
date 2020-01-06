<template>
  <div>
    <el-row class="main" type="flex" justify="center">
      <el-col :span="16">
        <el-card shadow="hover">
          <div id="artcle-info" :style="{backgroundImage:'url(' + titlePic + ')'}">
            <h2 class="text-center">
              <strong>{{article.title}}</strong>
            </h2>
            <!-- 描述：文章信息 -->
            <div class="text-center timeAndView">
              <span class="article-time">
                <i class="el-icon-user"></i>
                作者：
                <span>{{article.author}}</span>
              </span>
              &nbsp;|&nbsp;
              <span class="article-time">
                <i class="el-icon-time"></i>
                发表于：
                <span>{{article.publishTime}}</span>
              </span>
              &nbsp;|&nbsp;
              <span class="article-views">
                <i class="el-icon-view"></i>
                阅读量：
                <span>{{article.views}}</span>
              </span>
            </div>
          </div>
          <hr />
          <div id="artcle-content" v-html="article.content"></div>
        </el-card>
      </el-col>
    </el-row>
    <br />
    <br />
    <el-row class="main" type="flex" justify="center">
      <el-col :span="16">
        <el-card shadow="hover" class="comments">
          <div class="ylcon">
            <p class="tit">所有评论<span v-if="comments.length > 6" v-on:click="changeFoldState" style="float:right"><el-button circle>{{brandFold?'展开':'收起'}}</el-button></span></p>
            <div id="messDivId">
              <div class="story" v-for="item in showdetailComments" :key="item.parent.id">
                <div class="opbtn"></div>
                <div @click="toPubComment(item.parent.id,item.parent.name)">
                  <p class="story_t">{{item.parent.name}}</p>
                  <p class="story_time">{{item.parent.time}}</p>
                  <p class="story_m">{{item.parent.content}}</p>
                </div>
                <p
                  class="story_hf"
                  v-for="child in item.children"
                  :key="child.id"
                  @click="toPubComment(item.parent.id,child.name)"
                >
                  @{{child.name}}回复@{{child.cname}}:{{child.content}}
                  <!-- <el-button type="text" >回复</el-button> -->
                </p>
                <!-- s -->
              </div>
              <div v-if="comments.length > 6" v-on:click="changeFoldState" style="margin:0 auto;">
                <span></span>
                <!-- el-icon-arrow-down
                el-icon-arrow-up-->
                
              </div>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>
    <br />
    <br />
    <el-row class="main" type="flex" justify="center" id="comment">
      <el-col :span="16">
        <el-card shadow="hover">
          <p class="story_hf" v-if="comment.cname">回复：@{{comment.cname}}</p>
          <form onsubmit="return false">
            <div class="vheader item3">
              <el-row :gutter="100" type="space-between">
                <el-col :span="8">
                  <el-input
                    v-model="comment.name"
                    maxlength="12"
                    name="nick"
                    placeholder="昵称"
                    type="text"
                    required
                    style="width:100%"
                  />
                </el-col>

                <el-col :span="8">
                  <el-input
                    v-model="comment.email"
                    name="mail"
                    placeholder="邮箱"
                    type="email"
                    required
                    style="width:100%"
                  />
                </el-col>
                <el-col :span="8">
                  <el-input
                    v-model="comment.url"
                    name="link"
                    placeholder="网址(http://)"
                    type="url"
                    style="width:100%"
                  />
                </el-col>
              </el-row>
            </div>
            <br />
            <div class="vedit">
              <el-input
                v-model="comment.content"
                id="veditor"
                class="veditor vinput"
                type="textarea"
                placeholder="Your commnet here. Be cool."
                style="width:100%;height:100px"
                required
              ></el-input>
            </div>
            <div class="vcontrol">
              <el-row type="space-between">
                <el-col :span="24" style="text-align:right">
                  <el-button type="primary" plain round @click="pubComment()">发表</el-button>
                </el-col>
              </el-row>
              <!-- <div class="col col-80 text-right">
                <button type="button" onclick="vsubmit()" class="vsubmit vbtn">回复</button>
              </div>-->
            </div>
          </form>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import api from "../../api/article";
export default {
  data() {
    return {
      brandFold: true,
      article: {
        id: "",
        title: "",
        cover: "../../imgs/test.bmp",
        category: "",
        author: "",
        content: "",
        contentMd: "",
        state: "",
        views: "",
        publishTime: "",
        editTime: "",
        createTime: ""
      },
      titlePic: "../../imgs/test.jpg",
      comment: {
        pid: "",
        articleTitle: "",
        articleId: "",
        name: "",
        cname: "",
        content: "",
        email: "",
        url: ""
      },
      comments: [
        {
          parent: {
            id: "",
            name: "",
            content: "",
            email: "",
            url: ""
          },
          children: [
            {
              id: "",
              name: "",
              content: "",
              email: "",
              url: ""
            }
          ]
        }
      ]
    };
  },
  computed: {
    showdetailComments: {
      get: function() {
        if (this.brandFold) {
          if (this.comments.length < 4) {
            return this.comments;
          }
          let newArr = [];
          for (var i = 0; i < 3; i++) {
            let item = this.comments[i];
            newArr.push(item);
          }
          return newArr;
        }
        return this.comments;
      },
      set: function(val) {
        this.showdetailComments = val;
      }
    }
  },
  created() {
    var id = this.$route.params.id;
    if (id == null || id == "" || typeof id == "undefined") {
      this.$router.push("/main/error");
    }
    this.comment.articleId = id;
    this.getArticle(id);
    this.getComments(id);
  },
  methods: {
    changeFoldState() {
      this.brandFold = !this.brandFold;
    },
    getArticle(id) {
      this.axios
        .get(api.getArticle, {
          params: {
            id: id
          }
        })
        .then(response => {
          if (response.data.code == 200) {
            this.article = response.data.data;
            if (this.article.cover.length >= 0) {
              this.titlePic = this.article.cover;
              this.comment.articleTitle = this.article.title;
            }
          }
        });
    },
    getComments(id) {
      this.axios
        .get(api.getComments, {
          params: {
            articleId: id
          }
        })
        .then(response => {
          if (response.data.code == 200) {
            this.comments = response.data.data;
            console.log(response.data.data);
          }
        });
    },
    pubComment() {
      // console.log("2pId:" + this.comment.pId);
      // console.log("2cName:" + this.comment.cName);

      console.log("before:::::comment:::::");
      console.log(this.comment);
      if (
        !(
          this.comment.name == "" ||
          this.comment.email == "" ||
          this.comment.content == "" ||
          this.comment.name === undefined ||
          this.comment.email === undefined ||
          this.comment.content === undefined
        )
      ) {
        this.axios.post(api.pubComment, this.comment).then(response => {
          if (response.data.code == 200) {
            this.comment.cname = "";
            this.comment.pid = "";
            this.comment.content = "";
            this.$message({
              message: "发表成功",
              type: "success"
            });
            console.log("after====");
            console.log(this.comment);
          } else {
            this.$message.error("发表失败");
          }
        });
      } else {
        this.$message.error("发表失败,请检查输入信息是否完整。");
      }
    },
    toComment() {
      document.querySelector("#comment").scrollIntoView(true);
    },
    toPubComment(id, name) {
      this.comment.pid = id;
      this.comment.cname = name;

      this.toComment();
      console.log(this.comment);
      console.log("cName:" + this.comment.cname);
      console.log("pId:" + this.comment.pid);
    }
  }
};
</script>

<style>
#artcle-info {
  padding: 20px;
  background-size: 100%;
  margin-bottom: 40px;
}

#artcle-info .abstract {
  color: #ffffff;
  border-left: 3px solid #f56c6c;
  padding: 10px;
  background-color: rgba(126, 129, 135, 0.3);
}

#artcle-info .timeAndView {
  padding: 20px;
  line-height: 30px;
  font-size: 16px;
  color: #ffffff;
}

/* comments */
* {
  margin: 0;
  padding: 0;
  -webkit-touch-callout: none; /* prevent callout to copy image, etc when tap to hold */
  -webkit-text-size-adjust: none; /* prevent webkit from resizing text to fit */
  -webkit-tap-highlight-color: rgba(
    210,
    210,
    210,
    0.35
  ); /* make transparent link selection, adjust last value opacity 0 to 1.0 */
  -webkit-user-select: none; /* prevent copy paste, to allow, change 'none' to 'text' */
}
.comments {
  font-size: 12px;
}
ul,
li {
  list-style: none;
}
.ylcon {
  width: 100%;
  min-width: 320px;
}
.tit {
  height: 26px;
  line-height: 26px;
  padding: 0px 15px;
  position: relative;
  font-size: 15px;
  color: #aaa;
  border-bottom: 1px solid rgba(0, 0, 0, 0.15);
}

.story {
  border-bottom: 1px dashed #cecece;
  padding: 0 15px 3px;
  position: relative;
}
.story_t {
  font-size: 1.2em;
  color: rgba(0, 0, 0, 1);
  padding-top: 5px;
  padding-bottom: 2px;
}
.story_m {
  color: rgba(110, 110, 110, 1);
  line-height: 21px;
  word-break: break-all;
  word-wrap: break-word;
  overflow: hidden;
  font-size: 1.2em;
  padding: 2px 0;
}
.story_time {
  color: rgba(154, 154, 154, 1);
  padding: 2px 0;
}
.story_hf {
  background: rgb(245, 245, 245);
  font-size: 1.2em;
  border: 1px solid rgba(204, 204, 204, 0.2);
  border-radius: 2px;
  color: rgba(110, 110, 110, 1);
  padding: 4px;
  margin-bottom: 5px;
}
.opbtn {
  position: absolute;
  top: 0;
  right: 0;
}
#artcle-content {
  font-size: 14px;
  line-height: 50px;
}
</style>