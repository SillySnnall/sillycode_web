<template>
  <Row type="flex" justify="center">
    <Col span="24">
      <Header/>
    </Col>
    <Col
      span="24"
      :style="{background:'transparent url(' + headerImg + ') no-repeat center', height: '500px', backgroundSize: 'cover'}"
    ></Col>
    <Col span="24">
      <BolgItem v-for="(item,key) in BolgList" :value="item" :key="key"/>
    </Col>
    <Col span="24">
      <Footer/>
    </Col>
  </Row>
</template>

<script>
import Header from "../components/Header.vue";
import Footer from "../components/Footer.vue";
import BolgItem from "../components/BolgItem.vue";
import { get, post } from "../util";
let event = require("../eventbus/event.js");
export default {
  components: {
    BolgItem,
    Header,
    Footer
  },
  data() {
    return {
      BolgList: [],
      headerImg: "https://static.is26.com/blog/2018/11/tibet/tibet-59.JPG"
    };
  },
  created() {
    this.bolgListOnline();
    event.on(event.HEADER_BOLG, this, function(message) {
      this.bolgListOnline();
    });
  },
  destroyed() {
    event.remove(event.HEADER_BOLG, this);
  },
  methods: {
    // 获取博客列表
    async bolgListOnline() {
      let type = sessionStorage.getItem("type");
      if (!type) {
        type = 0;
      }
      this.submittimg = true;
      let data = await post("/bolg_data", {
        page: 0,
        size: 30,
        type: type
      });
      if (data.code === 0) {
        this.BolgList = data.data;
      } else {
        this.$Message.error(data.data);
      }
    }
  }
};
</script>

<style>
</style>