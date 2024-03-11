import configparser

class Engine:
    configPath = 'config/production.ini'

    @classmethod
    def boot(cls):
        configInit()


def configInit():
    config = configparser.ConfigParser()
    config.read(Engine.configPath)

    Engine.appId = config.get('WeatherAPI', 'app_id')
    Engine.geocodingURI = config.get('WeatherAPI', 'geocoding').replace('{APP_ID}',Engine.appId)
    Engine.onecall = config.get('WeatherAPI', 'onecall').replace('{APP_ID}',Engine.appId)
