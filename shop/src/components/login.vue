<template>
  <div class="login-container">
    <!-- <div class="logbox">
      <div class="box">
        <el-form :model="loginmodel" :rules="rules2" ref="loginmodel">
        <el-form-item label="" prop="name">
          <el-input prefix-icon="iconfont icon-user" v-model="loginmodel.name"></el-input>
        </el-form-item>
        <el-form-item label="" prop="password">
          <el-input prefix-icon="iconfont icon-showpassword" type="password" v-model="loginmodel.password"></el-input>
        </el-form-item>
        <el-form-item label="" class="btns">
          <el-button type="primary"  @click="submitForm('loginmodel')">登录</el-button>
          <el-button type="info" @click="resetForm('loginmodel')">重置</el-button>
        </el-form-item>
      </el-form>
      </div>
    </div> -->
    <div class="login_box">
      <!-- <div class="exm">电商案例</div> -->
       <el-form :model="loginmodel" :rules="rules2" ref="loginmodel" class="login_form">
        <el-form-item label="" prop="name">
          <el-input prefix-icon="iconfont icon-user" v-model="loginmodel.name"></el-input>
        </el-form-item>
        <el-form-item label="" prop="password">
          <el-input prefix-icon="iconfont icon-showpassword" type="password" v-model="loginmodel.password"></el-input>
        </el-form-item>
        <el-form-item label="" >
          <el-input prefix-icon=""  v-model="loginmodel.validCode"></el-input>
        </el-form-item>
        <img src='' alt="" id="img">
        
        <el-form-item label="" class="btns">
          <el-button type="primary"  @click="login">登录</el-button>
          <el-button type="info" @click="resetForm('loginmodel')">重置</el-button>
          <!-- <el-button type="info" @click="check">查询</el-button> -->
        </el-form-item>
      </el-form>
    </div>

  </div>
</template>

<script>
export default {
  name: "Login",
  data(){
    return{
      loginmodel:{
        name:'同豪',
        password:'123',
        deviceId:'',
        validCode:''
      },
      rules2: {
          name: [
            { required: true, message: '请输入登录名称', trigger: 'blur' },
          { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' }
          ],
          password: [
            { required: true, message: '请输入登录密码', trigger: 'blur' },
          { min: 6, max: 15, message: '长度在 6 到 15 个字符', trigger: 'blur' }
          ],
          
        }
    }
  },
  methods:{
    // loginhome(){
    //   this.$router.push('/home')
    // },
     submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            //alert('submit!');
            this.$router.push('/home')
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
      login(){
        /*this.$http.post('admin/login',{
          username:this.name,
          password:this.password
        }).then(value=>{
          console.log(value.data);
        })*/
        var formData = new FormData();
        const config = {
        /*headers: {
          'Content-Type': 'multipart/form-data'
        },*/
        headers:{'Content-Type':'application/x-www-form-urlencoded'}
      }
        formData.append("username", this.loginmodel.name);
        formData.append("password", this.loginmodel.password);
        formData.append("deviceId", this.loginmodel.deviceId);
        formData.append("validCode", this.loginmodel.validCode);
        formData.append("flag", 'app');
        /*var params = new URLSearchParams();
        params.append("username", this.loginmodel.name);
        params.append("password", this.loginmodel.password);
        params.append("deviceId", this.loginmodel.deviceId);
        params.append("validCode", this.loginmodel.validCode);*/
        console.log(this.loginmodel.deviceId);
        console.log(this.loginmodel.validCode);
        console.log(formData);
      
        this.$http.post('/api-uaa/oauth/user/token',formData).then(value=>{
          console.log(value.data);
          sessionStorage.setItem('Authorization','Bearer '+value.data.datas.access_token)
          //message.success('登陆成功')
          this.$message.success('登陆成功'),
          this.$router.push('/home')
        })
        /*fetch('http://222.72.129.158:1700/api-uaa/oauth/user/token', {
           method: 'POST',
           body: formData
         })*/
        /*this.$http({
        method: 'post',
        url: '/api-uaa/oauth/user/token',
        data: {
        "username":this.loginmodel.name,
        "password":this.loginmodel.password,
        "deviceId":this.loginmodel.deviceId,
        "validCode":this.loginmodel.validCode
        },
        transformRequest: [
        function (data) {
         let ret = ''
         for (let it in data) {
            ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
         }
         ret = ret.substring(0, ret.lastIndexOf('&'));
         return ret
      }
    ],
    headers: {
       'Content-Type': 'application/x-www-form-urlencoded'
    }
}).then(value=>{
  console.log(value.data);
})*/
      },
      login1(){
         this.$http.post('http://222.72.129.158:11700/project/login',{
               name: 'testZZZZ',
               password: 'w12345678'
             }).then(function(ret){
                 console.log(ret.data);
             })
      },
      check(){
         this.$http.post('/api-monitor/project/getGeneralProject',{},{headers:{'Authorization':sessionStorage.getItem('Authorization')}}).then(value=>{
          console.log(value.data);
          //sessionStorage.setItem('Authorization','Bearer '+value.data.datas.access_token)
        })
      },
      /*shop(){
        this.$http.post('http://127.0.0.1:8888/api/private/v1/login',{
          "username":this.loginmodel.name,
          "password":this.loginmodel.password
        }).then(value=>{
          console.log(value.data);
          //sessionStorage.setItem('Authorization','Bearer '+value.data.datas.access_token)
        })
      }*/
  },
  created(){
    this.loginmodel.deviceId=Math.floor(Math.random()*1000000),
    console.log(this.loginmodel.deviceId);
    
  },
  mounted(){
    var img=document.getElementById('img');
    console.log(img);
    //console.log(111);
    img.src='http://222.72.129.158:1700/api-uaa/validata/code/'+this.loginmodel.deviceId
    console.log(this.loginmodel.deviceId);
    
  }
};
</script>

<style>

.login-container{
  width: 100%;
  height: 100%;
  background-color: green;
}
.login_box {
  width: 450px;
  height: 300px;
  background-color:pink;
  border-radius: 3px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%); 
}
.login_form {
  position: absolute;
  bottom: 0;
  width: 100%;
  padding: 0 20px;
  box-sizing: border-box;
}
.exm{
  margin-top: 40px;
  font-size: 30px;
}
.btns {
  display: flex;
  justify-content: flex-end;
}
</style>
