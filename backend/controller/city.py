from flask import request
from repo.http import HTTP
from core.engine import Engine
from controller.base import BaseController
from service.city import CityService

class IdeaController(BaseController):
    @classmethod
    def search(cls):
        #name = request.args.get('q')
        #if not name:
        #    return HTTP.success([])
        #res = CityService.instance().searchByName(name)
        res = []
        return HTTP.success(res)


    @classmethod
    def detail(cls):
        pass
