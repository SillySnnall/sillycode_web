<template>
  <Row type="flex" justify="center" style=" background-color: black; height: 76px;">
    <Col span="14">
      <Row type="flex" justify="space-between" align="middle" style="height: 100%;">
        <Col>
          <Row type="flex" justify="center" align="middle" style="height: 100%;">
            <Col>
              <a @click="logoClick">
                <img :src="sillycode_logo" style="width: 50px; height: 50px;">
              </a>
            </Col>
            <Col style="margin-left: 30px; color: white; font-size: 20px;">
              <Dropdown @on-click="dropdownClick">
                <a @click="bolgClick">博客</a>
                <DropdownMenu slot="list" ref="menu">
                  <a v-for="(item) in bolgTypeList" :key="item.type">
                    <DropdownItem
                      :name="item.type"
                      style=" list-style: none; text-align: center; font-size: 14px !important; padding: 10px 0px;"
                    >{{item.typeName}}</DropdownItem>
                  </a>
                </DropdownMenu>
              </Dropdown>
            </Col>
            <Col style="margin-left: 30px; color: white; font-size: 20px;">
              <a @click="newsClick">新闻</a>
            </Col>
            <Col style="margin-left: 30px; color: white; font-size: 20px;"></Col>
          </Row>
        </Col>
        <Col>
          <a @click="userClick">
            <img src="https://picsum.photos/300/150/?image=41" style="width: 35px; height: 35px;">
          </a>
        </Col>
      </Row>
    </Col>
  </Row>
</template>

<script>
import { get, post } from "../util";
import config from "../config";
let event = require("../eventbus/event.js");
export default {
  created() {
    this.getTypeOnline();
  },
  data() {
    return {
      sillycode_logo: require("../assets/sillycode_logo.png"),
      bolgTypeList: []
    };
  },
  updated() {
    this.resetMenuStyle();
  },
  methods: {
    //重置菜单样式
    resetMenuStyle() {
      let lis = this.$refs.menu.$children;
      for (let index in lis) {
        lis[index].$el.className = "";
      }
      let menuStyle = this.$refs.menu.$parent.$el.style;
      menuStyle.backgroundColor = "black";
      menuStyle.margin = "23px 0";
      menuStyle.borderRadius = "0px";
      this.$refs.menu.$el.style.minWidth = "131px";
    },
    // logo点击
    logoClick() {
      window.location.href = "http://localhost:8080" + "/bolg";
    },
    // 博客点击
    bolgClick() {
      sessionStorage.setItem("type", 0);
      if (this.$router.history.current.name === "bolg") {
        event.emit(event.HEADER_BOLG, "");
      } else {
        this.$router.push({
          name: "bolg"
        });
      }
    },
    // 新闻点击
    newsClick() {
      // this.$router.push({
      //   name: "bolgdetail",
      //   query: {
      //     bolgId: this.value.bolgId
      //   }
      // });
    },
    // 用户头像点击
    userClick() {},
    dropdownClick(name) {
      sessionStorage.setItem("type", name);
      if (this.$router.history.current.name === "bolg") {
        event.emit(event.HEADER_BOLG, "");
      } else {
        this.$router.push({
          name: "bolg"
        });
      }
    },
    // 从网络获取分类
    async getTypeOnline() {
      let data = await get("/type_all");
      if (data.code === 0) {
        this.bolgTypeList = data.data;
      } else {
        this.$Message.info(data.data);
      }
    }
  }
};
</script>

<style>
</style>