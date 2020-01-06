<template>
  <div>
    <el-row class="main" type="flex" justify="center">
      <el-col :span="16">
        <el-card shadow="hover">
          <div class="block">
            <el-timeline>
              <el-timeline-item
                v-for="item in archive"
                :key="item.date"
                :timestamp=item.date
                placement="top"
              >
                <div v-for="article in item.articles" :key="article.id">
                  <el-card>
                    <h4>{{article.title}}</h4>
                    <p>发布于 {{article.publishTime}}</p>
                  </el-card>
                  <br />
                </div>
              </el-timeline-item>
            </el-timeline>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import api from "../../api/archive.js";
export default {
  data() {
    return {
      archive: [
        {
          date: "",
          articles: [{}]
        }
      ]
    };
  },
  created() {
    this.getArchive();
  },
  methods: {
    getArchive() {
      this.axios.get(api.getArchive).then(response => {
        if (response.data.code == 200) {
          this.archive = response.data.data;
          console.log(this.archive);
        }
      });
    }
  }
};
</script>

<style>
</style>