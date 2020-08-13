#http:127.0.0.1:8000/beta/users/<username>/
import json

from django.views import View
from django.http import JsonResponse
from cardb.models import *  #这里好奇怪,不能写相对路径,要看在content表里登记的是什么就怎么引入
from django.core import serializers
from django.core.serializers.json import DjangoJSONEncoder

# Create your views here.


#创建会员中心视图类.
class UserCenterViews(View):
    #--------有用到变量的时候初始化实例变量-------

    #--------工具区---------

    #--------功能区----------
    #接收请求,返回响应:
    #添加校验登录状态的装饰器.
    def get(self,request):
        pass

    #由于分步式路由最后是<str:username>,所以视图函数需要添加同名参数.
    def post(self,request,username):
        #前端用post方式发请求, 后端从请求体中取数据.
        post_data=request.body
        post_data=json.loads(post_data)
        #print(post_data)#{'username': 'momo', 'tag': 'sell'}

        #处理前端 我的卖车记录标签
        if post_data["tag"]=="sell":
            #从数据库取出对应username的车辆信息:<QuerySet [{'cars__car_model': '宝骏 510 2019款 1.5 自动 CVT乐享型 国VI'...}]
            ret=User.objects.filter(username=post_data["username"]).values("cars__car_model","cars__brand","cars__car_licence","cars__origin_price","cars__selling_price","cars__mileage","cars__purchase_time","cars__emissions","cars__is_checked","cars__is_active","cars__updated_time","cars__created_time")
            if ret[0]["cars__car_model"]:
                #因为queryset不能直接用json.dumps转成json串,所以用下列方法转一下,具体看笔记.
                data=json.dumps(list(ret), ensure_ascii=False, cls=DjangoJSONEncoder)
                return JsonResponse({"code":200,"data":data})
            else:
                print("没有卖车记录")
                return JsonResponse({"code":10601,"data":None})

    #修改密码：
    #添加校验登录状态的装饰器

        #与数据库核对密码，前端异步显示密码是否输入正确。
        #接收2次新密码，核对2次新密码是否一致
        #如一致，修改数据库密码
