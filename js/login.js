$(function(){
    $("#link_reg").on("click",function(){
        $(".denglu").hide()
        $(".zhuce").show()
    })
    $("#link_login").on("click",function(){
        $(".zhuce").hide()
        $(".denglu").show()
    })

 var form=layui.form
 var layer=layui.layer
 form.verify({
    pwd: [
        /^[\S]{6,12}$/,'密码必须6到12位，且不能出现空格'
      ] ,
     repwd: function(value) {
        // 通过形参拿到的是确认密码框中的内容
        // 还需要拿到密码框中的内容
        // 然后进行一次等于的判断
        // 如果判断失败,则return一个提示消息即可
        var pwd = $('#form_red [name=password]').val()
        if (pwd !== value) {
          return '两次密码不一致！'
        }
      }
    })

//监听注册事件
$("#form_red").on("submit",function(e){
// 阻止默认提交事件
e.preventDefault()
//发起ajax post请求
var data ={
    username:$("#form_red [name=username]").val(),
    password:$("#form_red [name=password]").val()
}
$.post('http://ajax.frontend.itheima.net/api/reguser',data,function(res){
    if(res.status!==0) return layer.msg(res.message)
    layer.msg("注册成功请登录",function(){
        $("#link_login").click()
        $("#form_red")[0].reset()
    })
   
})
})

//监听登录事件
$("#form_login").on("submit",function(e){
//阻止默认提交事件
e.preventDefault()
// 发起数据请求
$.ajax({
    url:'http://ajax.frontend.itheima.net/api/login',
    type:'POST',
    // 获取表单中的数据
    data: $(this).serialize(),
    success: function(res){
        if(res.status !==0){
            return layer.msg('登录失败!')
        }
        layer.msg('登录成功!')

        //将登录成功得到的 token 字符串，保存到 localStorage 中
        localStorage.setItem('token',res.token)
        //跳转到后台主页面
        location.href = '/index.html'
    }
   })
  })




})