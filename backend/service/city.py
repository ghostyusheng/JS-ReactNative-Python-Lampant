import requests
import json
from service.base import BaseService
from core.engine import Engine

class CityService(BaseService):

    def searchByName(self, name):
        uri = Engine.geocodingURI.format(CITY=name)
        r = requests.get(uri)
        res = json.loads(r.content)[0]
        if res.get('local_names'):
            del res['local_names']
        uri_detail = Engine.onecall.format(LON=res.get('lon',0), LAT=res.get('lat',0))
        r2 = requests.get(uri_detail)
        res_detail = json.loads(r2.content)
        #print(json.dumps(res_detail))
        return {'basic': res, 'detail': res_detail}
