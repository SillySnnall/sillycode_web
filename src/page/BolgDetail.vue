<template>
  <Row type="flex" justify="center">
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
  </Row>
</template>

<script>
import { get, post } from "../util";

export default {
  name: "",
  props: [""],
  data() {
    return {
      headerImg: "",
      titleValue: "",
      content: ""
    };
  },

  components: {},

  computed: {},

  created() {
    this.getBolgOnline();
  },

  beforeMount() {},

  mounted() {},

  methods: {
    // 通过博客id获取一条博客
    async getBolgOnline() {
      let data = await post("/bolg_one", {
        bolgId: this.$route.query.bolgId
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
  },

  watch: {}
};
</script>
<style>
</style>