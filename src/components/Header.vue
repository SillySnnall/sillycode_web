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
                  <a v-for="item in bolgTypeList" :key="item.type">
                    <DropdownItem :name="item.type">{{item.typeName}}</DropdownItem>
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
export default {
  name: "app",
  components: {},
  created() {
    // this.getTypeOnline();
  },
  data() {
    return {
      sillycode_logo: require("../assets/sillycode_logo.png"),
      bolgTypeList: []
    };
  },
  updated() {
    // 重置菜单样式
    let lis = this.$refs.menu.$children;
    for (let index in lis) {
      lis[index].$el.className = "menu-li";
    }
  },
  methods: {
    // logo点击
    logoClick() {
      this.$router.push({
        name: "bolg"
      });
    },
    // 博客点击
    bolgClick() {
      this.$router.push({
        name: "bolg"
      });
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
    userClick() {
      // this.$router.push({
      //   name: "bolgdetail",
      //   query: {
      //     bolgId: this.value.bolgId
      //   }
      // });
    },
    dropdownClick(name) {
     this.$router.push({
        name: "bolg",
        query: {
          type: this.value.name
        }
      });
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
.ivu-select-dropdown {
  background-color: black;
  margin: 23px 0;
  border-radius: 0px;
}
.ivu-dropdown-menu {
  min-width: 131px;
}
.menu-li {
  list-style: none;
  text-align: center;
  font-size: 14px !important;
  padding: 10px 0px;
}
</style>