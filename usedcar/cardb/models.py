from django.db import models

# Create your models here.

class User(models.Model):
    username =models.CharField(max_length=30,verbose_name="用户名")
    password = models.CharField(max_length=50,verbose_name="密码")
    phone = models.CharField(max_length=11,verbose_name="手机号",null= False)
    address = models.CharField(max_length=120,verbose_name="详细地址")
    area = models.CharField(max_length=30,verbose_name="所属地区")
    updated_time = models.DateTimeField(auto_now=True)
    created_time = models.DateTimeField(auto_now_add=True)

    class Meta:
        db_table = 'user'



class Cars(models.Model):
    car_model=models.CharField(verbose_name='车型',max_length=50)
    brand=models.CharField(verbose_name='品牌',max_length=20)
    car_licence=models.CharField(verbose_name='车牌',max_length=15)
    origin_price=models.CharField(verbose_name='新车购车价',max_length=30)
    selling_price=models.CharField(verbose_name='二手车售价',max_length=30)
    mileage=models.CharField(verbose_name='公里数',max_length=20)
    purchase_time=models.CharField(verbose_name='购车时间',max_length=20)
    emissions=models.CharField(verbose_name='排放',max_length=10)
    is_checked=models.BooleanField(verbose_name='审核情况',default=0)
    is_active=models.BooleanField(verbose_name="是否上架",default=1)
    updated_time=models.DateTimeField(auto_now=True)
    created_time=models.DateTimeField(auto_now_add=True)
    owner=models.ForeignKey(User,on_delete=models.CASCADE)
    car_first_imgpath=models.CharField(verbose_name="首页汽车图片链接",max_length=300,default=None)
    class Meta:
        db_table = 'cars'



class CarImage(models.Model):
    img_name = models.CharField(max_length=100,verbose_name="照片名")#命名格式：cid_上传时间_序号
    img_path = models.CharField(max_length=200,verbose_name="存储路径")#media / img / car / imgname
    car = models.ForeignKey(Cars,on_delete=models.CASCADE)
    class Meta:
        db_table = "carimage"


