class HTTP:
    @classmethod
    def success(cls, data):
        return {
            'code': 0,
            'data': data,
            'msg': "SUCCESS"
        }


    @classmethod
    def error(cls, data):
        pass
