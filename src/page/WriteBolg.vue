<template>
  <Row type="flex" justify="center" style="margin-bottom: 40px;">
    <Col span="14">
      <!-- 标题图片 -->
      <Upload
        :action="uploadImgUrl"
        name="img_file"
        :show-upload-list="showUploadList"
        accept="image/jpeg, image/png"
        :on-success="uploadHeaderImgSuccess"
        :on-error="uploadHeaderImgError"
      >
        <Row
          type="flex"
          justify="center"
          align="middle"
          :style="{background:'transparent url(' + headerImg + ') no-repeat center', height: '160px', marginTop: '20px', backgroundSize: 'cover'}"
        >
          <img :src="camera" style="width: 48px; height: 42px;" v-show="isCamera">
        </Row>
      </Upload>
      <!-- 标题，文章类型，发布 -->
      <Row
        type="flex"
        justify="center"
        align="middle"
        :gutter="8"
        style="margin-top: 20px;margin-bottom: 20px;"
      >
        <Col span="19">
          <Input v-model="titleValue" placeholder="请输入文章标题（最多 38 个字）" :maxlength="maxlength"/>
        </Col>
        <Col span="3">
          <Select
            v-model="typeValue"
            placeholder="请选择文章分类"
            style="height: 100%; font-size: 30px; z-index:1000;"
          >
            <Option
              v-for="item in selectList"
              :value="item.type"
              :key="item.type"
            >{{ item.typeName }}</Option>
          </Select>
        </Col>
        <Col span="2">
          <Button
            label="large"
            style="height: 40px; width: 86px; font-size: 18px;"
            @click="commitOnline"
            :loading="submittimg"
          >
            <span v-if="!submittimg">发布</span>
            <span v-else></span>
          </Button>
        </Col>
      </Row>
      <Col>
        <div ref="editorMenu"></div>
        <div ref="editor"></div>
      </Col>
    </Col>
  </Row>
</template>

<script>
import { get, post } from "../util";

import config from "../config";

import E from "wangeditor";

export default {
  name: "",
  props: [""],
  data() {
    return {
      uploadImgUrl: config.host + "/upload_img",
      showUploadList: false,
      submittimg: false,
      maxlength: 38,
      camera: require("../assets/camera.png"),
      isCamera: true,
      selectList: [],
      headerImg: "", // 文章头部图片
      titleValue: "", // 标题数据
      typeValue: 0, // 文章分类
      contentValue: "" // 文章内容
    };
  },

  components: {},

  computed: {},

  created() {
    this.getTypeOnline();
  },
  mounted() {
    // 富文本输入框配置
    var editor = new E(this.$refs.editorMenu, this.$refs.editor);
    editor.customConfig.onchange = html => {
      this.contentValue = html;
    };
    // 配置服务器端地址
    editor.customConfig.uploadImgServer = config.host + "/upload_img";
    // 图片上传参数
    editor.customConfig.uploadFileName = "img_file";
    // 将图片大小限制为 10M
    editor.customConfig.uploadImgMaxSize = 10 * 1024 * 1024;
    // 限制一次最多上传 1 张图片
    editor.customConfig.uploadImgMaxLength = 1;
    // 关闭粘贴样式的过滤
    editor.customConfig.pasteFilterStyle = false;
    // 忽略粘贴内容中的图片
    editor.customConfig.pasteIgnoreImg = true;
    // 上传监听
    editor.customConfig.uploadImgHooks = {
      customInsert: function(insertImg, result, editor) {
        insertImg(result.data);
      }
    };
    editor.create();
    this.$refs.editor.style.zIndex = "auto";
  },

  methods: {
    //失去焦点事件
    onEditorBlur(editor) {},
    //获得焦点事件
    onEditorFocus(editor) {},
    //内容改变事件
    onEditorChange(editor) {},
    // 从网络获取分类
    async getTypeOnline() {
      let data = await get("/type_all");
      if (data.code === 0) {
        this.selectList = data.data;
      } else {
        this.$Message.info(data.data);
      }
    },
    // 发布博客
    async commitOnline() {
      this.submittimg = true;
      let data = await post("/publish_bolg", {
        headerImg: this.headerImg,
        title: this.titleValue,
        type: this.typeValue,
        contents: this.contentValue,
        userId: "000000"
      });
      if (data.code === 0) {
        this.$router.push({
          name: "bolgdetail",
          query: {
            bolgId: data.data.bolgId
          }
        });
      } else {
        this.$Message.error(data.data);
      }
      this.submittimg = false;
    },

    // 上传文章头部图片成功
    uploadHeaderImgSuccess(response) {
      if (response.code === 0) {
        this.headerImg = response.data;
        this.isCamera = false;
      } else {
        this.$Message.error(response.data);
      }
    },
    // 上传文章头部图片失败
    uploadHeaderImgError(error) {
      this.$Message.error(error);
    }
  }
};
</script>
<style>
.ivu-input {
  height: 50px;
  border: none !important;
  box-shadow: none !important;
  font-size: 30px;
  font-weight: bold;
  color: #000;
}
.ivu-select-single .ivu-select-selection {
  height: 40px;
}
.ivu-select-single .ivu-select-selection .ivu-select-selected-value {
  font-size: 18px;
  height: 40px;
  padding-top: 4px;
}

.ivu-select-placeholder {
  font-size: 18px;
  height: 40px;
  padding-top: 4px;
}

.ivu-select-item {
  font-size: 14px !important;
}

.ivu-upload-select {
  width: 100%;
}
.w-e-text-container {
  height: 410px;
  z-index: auto;
}
</style>