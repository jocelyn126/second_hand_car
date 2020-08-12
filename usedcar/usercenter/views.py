#http:127.0.0.1:8000/beta/users/<username>/
import json

from django.views import View
from django.http import JsonResponse


# Create your views here.


#创建会员中心视图类.
class UserCenterViews(View):
    #--------有用到变量的时候初始化实例变量-------

    #--------工具区---------

    #--------功能区----------
    #显示会员中心:
    #添加校验登录状态的装饰器.
    #前端传来请求体和用户名.
    def get(self,request):
        pass

    def post(self,request):
        username=request.body
        username=json.loads(username)
        print(username)
        if username:
            print(11111)
            return JsonResponse({"code":200,"data":"我是有车一族"})
        else:
            print("dadada")
            return JsonResponse({"code":10601,"data":None})

    #修改密码：
    #添加校验登录状态的装饰器

        #与数据库核对密码，前端异步显示密码是否输入正确。
        #接收2次新密码，核对2次新密码是否一致
        #如一致，修改数据库密码
