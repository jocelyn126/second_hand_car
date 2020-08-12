######################################################
#        > File Name: flask_client.pycl
 ######################################################

from flask import Flask, send_file
import sys


app = Flask(__name__)

@app.route('/users/<username>')
def info(username):
    #个人信息
    return send_file('templates/car/user/usercenter.html')

@app.route('/test_api')
def test_api():
    #测试
    return send_file('templates/car/user/test_api.html')

if __name__ == '__main__':
    app.run(debug=True)

