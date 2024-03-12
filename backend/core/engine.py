import configparser
import mysql.connector
from mysql.connector import errorcode

class Engine:
    configPath = 'config/production.ini'

    @classmethod
    def boot(cls):
        configInit()


def configInit():
    #config = configparser.ConfigParser()
    #config.read(Engine.configPath)

    #Engine.appId = config.get('WeatherAPI', 'app_id')
    #Engine.geocodingURI = config.get('WeatherAPI', 'geocoding').replace('{APP_ID}',Engine.appId)
    #Engine.onecall = config.get('WeatherAPI', 'onecall').replace('{APP_ID}',Engine.appId)
    try:
        cnx = mysql.connector.connect(user='root',password='root',database='idea')
        print(cnx)
        Engine.cnx = cnx
    except mysql.connector.Error as err:
        if err.errno == errorcode.ER_ACCESS_DENIED_ERROR:
            print("Something is wrong with your user name or password")
        elif err.errno == errorcode.ER_BAD_DB_ERROR:
            print("Database does not exist")
        else:
            print(err)
