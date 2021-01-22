<template>
  <div class="logincontainer">
    <div class="logbox">
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
        password:'123'
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
      }
  }
};
</script>

<style>
.logbox {
    position: relative;
  height: 300px;
  width: 450px;
  background-color: pink;
  margin: 0 auto;
  padding: 0 10px;
  
}
.box{
    transform: translateY(50%);
}
.btns{
    /* display: flex;
    align-items: flex-end; */
     position:absolute;
    right: 10px; 
}
</style>
