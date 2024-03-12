from flask import request
from repo.http import HTTP
from core.engine import Engine
from controller.base import BaseController
from service.city import CityService

class IdeaController(BaseController):
    @classmethod
    def search(cls):
        print(Engine.cnx)
        cursor = Engine.cnx.cursor()
        sql = "select * from idea"
        cursor.execute(sql)
        res = []
        for i in cursor:
            print(res.append(i))
        cursor.close()
        return HTTP.success(res)


    @classmethod
    def add(cls):
        title = request.args.get('title')
        content = request.args.get('content')
        if not (content or title):
            return HTTP.success([])
        cursor = Engine.cnx.cursor()
        sql = "insert into idea(title,content) values(%s, %s)"
        Engine.cnx.commit()
        cursor.execute(sql, (title, content))
        cursor.close()
        return HTTP.success([])
