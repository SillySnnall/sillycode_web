<template>
  <Row type="flex" justify="center">
    <Col span="24">
      <Header/>
    </Col>
    <Col
      span="24"
      :style="{background:'transparent url(' + headerImg + ') no-repeat center', height: '500px', backgroundSize: 'cover'}"
    >
      <Row type="flex" justify="center" align="bottom" style="height: 100%;">
        <Col
          span="24"
          style="height: 85px;opacity: 0.7;background-color: #000000;color: white;font-size: 32px;"
        >
          <Row type="flex" justify="center" align="middle" style="height:100%">{{titleValue}}</Row>
        </Col>
      </Row>
    </Col>
    <Col span="14" v-html="content" style="padding-top:40px;"></Col>
    <Col span="24">
      <Footer/>
    </Col>
  </Row>
</template>

<script>
import { get, post } from "../util";
import Header from "../components/Header.vue";
import Footer from "../components/Footer.vue";

export default {
  components: {
    Header,
    Footer
  },
  data() {
    return {
      headerImg: "",
      titleValue: "",
      content: ""
    };
  },

  created() {
    this.getBolgOnline();
  },

  methods: {
    // 通过博客id获取一条博客
    async getBolgOnline() {
      let data = await post("/bolg_one", {
        bolgId: sessionStorage.getItem("bolgId")
      });
      if (data.code === 0) {
        this.headerImg = data.data.headerImg;
        this.titleValue = data.data.title;
        this.content = data.data.contents;
      } else {
        this.$Message.error(data.data);
      }
      // 刷新大图查看数据
      this.$previewRefresh();
    }
  }
};
</script>
<style>
</style>