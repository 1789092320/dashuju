$(function() {
    var form = layui.form
  
    form.verify({
      nickname: function(value) {
        if (value.length > 6) {
          return '昵称长度必须在 1 ~ 6 个字符之间！'
        }
      }
    })
    initUserInfo()
    function initUserInfo(){
        var form=layui.form
        $.ajax({
            method:'GET',
            url:'/my/userinfo',
            success: function(res){
        if(res.status!==0){
            return layer.msg('获取用户信息失败')
        }
         form.val('formUserInfo',res.data)
        }
        })
    }
       // 重置标点数据
       $('#btnReset').on('click',function(e){
        // 阻止默认提交
        e.preventDefault()
        initUserInfo()
    })


    $('.layui-form').on('submit',function(e){
        //阻止默认提交
        e.preventDefault()
        //发起ajax请求
        $.ajax({
            method:'POST',
            url:'/my/userinfo',
            data: $(this).serialize(),
            success: function(res){
                if(res.status !==0){
                    return layer.msg('更新用户失败')
                }
                layer.msg('更新用户成功')
                //调用父元素页面中的方法,重新渲染用户头像和用户的信息
                window.parent.getUserInfo()
            }
        })
    })
  })