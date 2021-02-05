<template>
  <div>
    

      <el-container>
  <el-header>监控平台</el-header>
  <el-container>
    <el-aside width="200px">
      <el-menu :default-openeds="['1', '3']">
      <el-submenu index="1">
        <template slot="title"><i class="el-icon-message"></i>项目概况</template>
      </el-submenu>
      <el-submenu index="2">
        <template slot="title"><i class="el-icon-message"></i>桥梁监控</template>
      </el-submenu>
      <el-submenu index="3">
        <template slot="title"><i class="el-icon-message"></i>资料管理</template>
      </el-submenu>
      </el-menu>
    </el-aside>
    <el-main>
      <el-table
    :data="tableData"
    border
    style="width: 100%"
    >
    <el-table-column 
      prop="fileName"
      label="文件名称"
      >
    </el-table-column>
    <el-table-column 
      prop="fileTypeStr"
      label="文件类型"
      >
    </el-table-column>
    <el-table-column
      prop="workName"
      label="工况名称">
    </el-table-column>
    <el-table-column
      prop="deptName"
      label="发布单位">
    </el-table-column>
    <el-table-column
      prop="username"
      label="用户名称">
    </el-table-column>
    <el-table-column
      prop="existed"
      label="状态">
      <el-button type="primary" round @click="upload">选取文件</el-button>
    </el-table-column>
    <el-table-column
      prop="createTime"
      label="创建时间">
    </el-table-column>
    <el-table-column
      
      label="操作">
      <el-button type="success" round @click="download">下载</el-button>
      <el-button type="primary" round>上传</el-button>
      
    </el-table-column>
  </el-table>
    </el-main>
  </el-container>
</el-container>
  </div>
</template>

<script>
//import func from '../../vue-temp/vue-editor-bridge';
export default {
  name: "Home",
  data(){
    return{
      tableData:[
        // {
        //   'fileName':'',
        //   'fileTypeStr':'',
        //   'workName':'',
        //   'deptName':'',
        //   'username':'',
        //   'existed':'',
        //   'createTime':'',
          
        // }
      ],
      options: [{
          value: '选项一',
          label: '指令'
        }, {
          value: '选项二',
          label: '联系单'
        }, {
          value: '选项三',
          label: '监控方案'
        }, {
          value: '选项四',
          label: '施工文件'
        }, {
          value: '选项五',
          label: '设计文件'
        },
        {
          value: '选项六',
          label: '其他文件'
        },
        ],
    }
  },
  methods:{
    download(){
        let link = document.createElement('a')
        link.style.display = 'none'
        //link.href = url
        //link.setAttribute('download', tableData[0]['fileUrl'])
        console.log(this.tableData[0]);
        link.download = this.tableData[0]['fileName'];
        link.href = this.tableData[0]['fileUrl'];
        console.log(this.tableData[0]['fileUrl']);
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link);
    },
    upload(){
      var formData = new FormData();
      let link = document.createElement('input')
        link.style.display = 'none'
        link.type = 'file'
        link.name = 'file'
        document.body.appendChild(link)
        link.click()
        link.oninput=function(){
          console.log(this.value);
        }
        
      //formData.append("file", link.value);
      formData.append("file", '');
      formData.append("fileType", 3);
      formData.append("workName", 'bbb');
      formData.append("deptId", 2);
      //console.log(link.files[0].name);
      document.body.removeChild(link);
      /*this.$http.post('/api-monitor/file/uploadFile',{},{headers:{'Authorization':sessionStorage.getItem('Authorization')}}).then(value=>{
          console.log(value.data.msg);
        })*/
    }
  },
  beforeCreate(){
    var formData = new FormData();
    this.$http.post('/api-monitor/file/getAllFile',{},{headers:{'Authorization':sessionStorage.getItem('Authorization')}}).then(value=>{
          console.log(value.data.data);
          for(var a=0;a<value.data.data.length;a++){
              this.tableData.push({'fileName':value.data.data[a]['fileName'],
              'fileTypeStr':value.data.data[a]['fileTypeStr'],
              'workName':value.data.data[a]['workName'],
              'deptName':value.data.data[a]['deptName'],
              'username':value.data.data[a]['username'],
              'existed':value.data.data[a]['existed'],
              'createTime':value.data.data[a]['createTime'],
              'fileUrl':value.data.data[a]['fileUrl'],
              })
          }
          console.log(this.tableData);
        })
  }
};
</script>

<style>
  .el-header {
    background-color: #B3C0D1;
    color: #333;
    text-align: center;
    line-height: 60px;
  }
  
  .el-aside {
    background-color: #D3DCE6;
    color: #333;
    text-align: center;
    line-height: 200px;
    height: 800px;
  }
  
  .el-main {
    background-color: #E9EEF3;
    color: #333;
    text-align: center;
    line-height: 160px;
    
  }
</style>
