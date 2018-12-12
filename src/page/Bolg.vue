<template>
  <Row type="flex" justify="center">
    <Col
      span="24"
      :style="{background:'transparent url(' + headerImg + ') no-repeat center', height: '500px', backgroundSize: 'cover'}"
    ></Col>
    <Col span="24">
      <BolgItem v-for="(item,key) in BolgList" :value="item" :key="key"/>
    </Col>
  </Row>
</template>

<script>
import BolgItem from "../components/BolgItem.vue";
import { get, post } from "../util";
export default {
  name: "app",
  components: {
    BolgItem
  },
  data() {
    return {
      BolgList: [],
      headerImg: "https://static.is26.com/blog/2018/11/tibet/tibet-59.JPG"
    };
  },
  created() {
    this.bolgListOnline();
  },
  methods: {
    // 获取博客列表
    async bolgListOnline() {
      console.log("type：", this.$route.query.type);
      let type = this.$route.query.type;
      if (!type) {
        type = 7;
      }
      this.submittimg = true;
      let data = await post("/bolg_data", {
        page: 0,
        size: 30,
        type: type
      });
      if (data.code === 0) {
        this.BolgList = data.data.content;
      } else {
        this.$Message.error(data.data);
      }
    }
  }
};
</script>

<style>
</style>