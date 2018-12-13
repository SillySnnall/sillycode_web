<template>
  <Row type="flex" justify="center">
    <Col
      span="14"
      :style="{background:'transparent url(' + value.headerImg + ') no-repeat center', height: '500px', backgroundSize: 'cover', marginTop: '30px'}"
    >
      <a @click="itemClick">
        <Row type="flex" justify="center" align="bottom" style="height: 100%;">
          <Col span="24" style=" height: 100px; opacity: 0.7; background-color: #000000;">
            <Row type="flex" justify="space-between" align="middle" style="height: 100%;">
              <Col
                span="24"
                style="color: white; font-size: 28px; padding-left: 20px; padding-right: 20px;"
              >{{value.title}}</Col>
              <Col span="24">
                <Row type="flex" justify="space-between" align="middle">
                  <Col style="padding-left: 20px; color: white; font-size: 20px;">
                    <img
                      style="margin-bottom: 4px; margin-right: 5px; width:20px; height:20px;"
                      :src="type"
                    >
                    {{value.typeName}}
                    <span style="margin-left: 20px;"></span>
                    <img
                      style="margin-bottom: 4px; margin-right: 5px; width:20px; height:20px;"
                      :src="collection"
                    >收藏
                    <span style="margin-left: 20px;"></span>
                    <img
                      style="margin-bottom: 4px; margin-right: 5px; width:20px; height:20px;"
                      :src="share"
                    >分享
                    <span style="margin-left: 20px;"></span>
                    <img
                      style="margin-bottom: 4px; margin-right: 5px; width:20px; height:20px;"
                      :src="read"
                    >
                    {{value.readCount}} 人阅读
                    <span style="margin-left: 20px;"></span>
                    {{timeFormat}}
                  </Col>
                </Row>
              </Col>
            </Row>
          </Col>
        </Row>
      </a>
    </Col>
  </Row>
</template>

<script>
import { timestampToTime } from "../util";
export default {
  name: "",
  props: ["value"],
  components: {},
  computed: {
    timeFormat() {
      return timestampToTime(this.value.cdateTime);
    }
  },
  data() {
    return {
      type: require("../assets/type.png"),
      read: require("../assets/read.png"),
      collection: require("../assets/collection.png"),
      share: require("../assets/share.png")
    };
  },
  methods: {
    itemClick() {
      sessionStorage.setItem("bolgId", this.value.bolgId);
      this.$router.push({
        name: "bolgdetail"
      });
    }
  }
};
</script>

<style>
</style>