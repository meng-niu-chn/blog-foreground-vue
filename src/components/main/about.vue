<template>
  <div>
    <el-row class="main" type="flex" justify="center">
      <el-col :span="16">
        <el-card shadow="hover">
          <div id="artcle-info" style="text-align:cneter">
            <h1 class="text-center">
              <strong style>关于我</strong>
            </h1>
          </div>
          <hr />
          <div id="artcle-content" v-html="setting.about"></div>
        </el-card>
      </el-col>
    </el-row>
    <br />
    <el-row class="main" type="flex" justify="center">
      <el-col :span="16">
        <el-card class="card-tags">
          <div slot="header">
            <span>捐赠信息</span>
          </div>
          <div>
            <el-form label-width="100px">
              <el-form-item>
                <div
                  class="el-table el-table--fit el-table--border el-table--enable-row-hover el-table--enable-row-transition"
                >
                  <div class="el-table__header-wrapper">
                    <table
                      cellspacing="0"
                      cellpadding="0"
                      border="0"
                      class="el-table__header"
                      style="width: 686px;"
                    >
                      <thead>
                        <tr>
                          <th
                            v-for="item in setting.siteDonation"
                            :key="item.key"
                            colspan="1"
                            rowspan="1"
                            class="el-table_column"
                          >
                            <div class="cell">{{item.key}}</div>
                          </th>
                        </tr>
                      </thead>
                    </table>
                  </div>
                  <div class="el-table__body-wrapper is-scrolling-none">
                    <table
                      cellspacing="0"
                      cellpadding="0"
                      border="0"
                      class="el-table__body"
                      style="width: 686px;"
                    >
                      <tbody>
                        <tr class="el-table__row">
                          <td
                            v-for="item in setting.siteDonation"
                            class="el-table_column"
                            :key="item.key"
                          >
                            <div class="cell">
                              <div class="avatar-uploader">
                                <div @click="handleEditAvatar(item.key)" class="el-upload">
                                  <img
                                    v-if="item.value"
                                    :src="item.value"
                                    class="avatar"
                                    width="200"
                                    height="400"
                                  />
                                  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                                </div>
                              </div>
                            </div>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                    <!-- <el-upload>
                              <div v-if="!donation.value" class="el-upload__text">点我上传本地头像</div>
                    </el-upload>-->
                  </div>
                </div>
              </el-form-item>
            </el-form>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import api from "../../api/about.js";
export default {
  data() {
    return {
      setting: {}
    };
  },
  created() {
    this.getSetting();
  },
  methods: {
    getSetting() {
      this.axios.get(api.getSetting).then(response => {
        if (response.data.code == 200) {
          this.setting = response.data.data;
          this.setting.siteLinks = JSON.parse(this.setting.siteLinks);
          this.setting.siteDonation = JSON.parse(this.setting.siteDonation);
          console.log(this.setting);
        }
      });
    }
  }
};
</script>

<style>
</style>