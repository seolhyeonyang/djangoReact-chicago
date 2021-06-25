import datetime

import pylab as pl
from django.db import models
from project.common.models import FileDTO, Reader, Printer
import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
from icecream import ic
from matplotlib import font_manager, rc
from fbprophet import Prophet
from pandas_datareader import data
import yfinance as yf
yf.pdr_override()


class TimeSeries(Reader):

    def __init__(self):

        self.file = FileDTO()
        self.reader = Reader()
        self.printer = Printer()


    def error(self, f, x, y) -> object:
        return np.sqrt(np.mean((f(x)-y) ** 2))


    def read_file(self):

        file = self.file
        reader = self.reader

        file.context = './data/'
        file.fname = '08. PinkWink Web Traffic'

        hit_read = reader.csv_header(file, None)

        hit_read.columns = ['date', 'hit']
        hit_read = hit_read[hit_read['hit'].notnull()]

        return hit_read


    def polyfit_regression(self):

        hit_read = self.read_file()

        # 이름 다시 설정(기존 이름은 삭제)
        # ic(hit_read)
        # plt.rc('fort', family = 'malgun')
        # plt.title('hit count')
        # plt.plot(hit_read['date'], hit_read['hit'])
        # plt.show()
        ic(hit_read)
        hit_read.plot('date', 'hit', figsize = (12,8), grid = True)
        print(hit_read)

        plt_time = np.arange(0, len(hit_read))
        traffic = hit_read['hit'].values
        fx = np.linspace(0, plt_time[-1], 100)

        f1p = np.polyfit(plt_time, traffic, 1)
        f1 = np.poly1d(f1p)
        '''
        np.poly1d 다항식 만드는 함수
        f1p을 배열로 아무것도 쓰지않았기에 f1p을 다항식의 계수로 사용
        뒤에 True 입력하면  f1p를 다항식의 근으로 사용
        변수명을 입력하지 않았기에 x로 간주
        variavle = '변수명' 변수명을 따로 지정하면 지정한 것을 변수명으로 이용
        '''

        f2p = np.polyfit(plt_time, traffic, 2)
        f2 = np.poly1d(f2p)

        f3p = np.polyfit(plt_time, traffic, 3)
        f3 = np.poly1d(f3p)

        f15p = np.polyfit(plt_time, traffic, 15)
        f15 = np.poly1d(f15p)

        ic(self.error(f1, plt_time, traffic))
        ic(self.error(f2, plt_time, traffic))
        ic(self.error(f3, plt_time, traffic))
        ic(self.error(f15, plt_time, traffic))

        plt.figure(figsize= (10,6))
        # figure는 그림 그리는 캔버스에 해당(여러개의 차트를 한번에 그릴 수 있음)
        # 차트의 사이즈를 정하는 것 (단위는 inch이다.)
        plt.scatter(plt_time, traffic, s=10)
        # 산점도 그리는 함수 모든 그래프함수는 처음이 x 축, y 축 이다.

        plt.plot(fx, f1(fx), lw = 4, label = 'f1')
        plt.plot(fx, f2(fx), lw = 4, label = 'f2')
        plt.plot(fx, f3(fx), lw = 4, label = 'f3')
        plt.plot(fx, f15(fx), lw = 4, label = 'f15')

        plt.grid(True, linestyle = '-', color = '0.75')

        plt.legend(loc = 2)
        plt.show()


    def forecast(self):

        hit_read = self.read_file()
        df = pd.DataFrame({'ds':hit_read['date'], 'y':hit_read['hit']})
        df = df.set_index('ds')
        df.reset_index(inplace=True)
        df['ds'] = pd.to_datetime(df['ds'], format="%y. %m. %d.")

        m = Prophet(yearly_seasonality=True, daily_seasonality=True)
        m.fit(df)

        f = m.make_future_dataframe(periods=60)

        forecast = m.predict(f)
        # ic(forecast[['ds','yhat','yhat_lower','yhat_upper']].tail())

        m.plot(forecast)
        plt.show()

        m.plot_components(forecast)
        plt.show()


    def kia_scrap(self):

        start_date = '2000-1-1' # 2000년 까지 밖에 없음
        end_date = '2020-12-31'
        KIA = data.get_data_yahoo('000270.KS', start_date, end_date)

        KIA.to_csv('./saved_data/KIA.csv')
        # KIA.head()

    def seasonal(self):

        file = self.file
        reader = self.reader

        file.context = './saved_data/'
        file.fname = 'KIA'

        saved_KIA = reader.csv(file, 0)
        # ic(type(saved_KIA))

        saved_KIA['Close'].plot(figsize=(12,6), grid=True)
        # plt.show()

        KIA_idx = saved_KIA.set_index('Date')
        KIA_trunc = KIA_idx[:'2010-12-31']

        KIA_trunc = pd.DataFrame({'ds':KIA_trunc.index, 'y':KIA_trunc['Close']})
        KIA_trunc.reset_index(inplace=True)
        del KIA_trunc['Date']
        # ic(KIA_trunc.head())

        m = Prophet(daily_seasonality=True)
        m.fit(KIA_trunc)

        f = m.make_future_dataframe(periods=365)
        # ic(f.tail())

        forecast = m.predict(f)
        # forecast[['ds','yhat','yhat_lower','yhat_upper']].tail()
        m.plot(forecast)

        m.plot_components(forecast)

        # plt.show()

        # KIA_trunc.to_csv('./saved_data/KIA_trunc.csv')

        KIA_trunc2 = KIA_idx.loc['2014-01-01':'2017-07-31',:]

        KIA_trunc2['Close'].plot(figsize = (12,6), grid = True)

        # KIA_trunc2 = KIA_trunc2[:'2017-05-31']
        # KIA_trunc2['Close'].plot(figsize=(12,6), grid =True)

        KIA_trunc3 = pd.DataFrame({'ds': KIA_trunc2.index, 'y':KIA_trunc2['Close']})
        KIA_trunc3.reset_index(inplace=True)
        del KIA_trunc3['Date']

        m = Prophet(daily_seasonality=True)
        m.fit(KIA_trunc3)

        fu = m.make_future_dataframe(periods=61)
        # fu.tail()

        forecast = m.predict(fu)
        m.plot(forecast)

        ic(KIA_trunc3)
        ic(KIA_trunc2)
        ic(forecast)
        '''
        plt.figure(figsize=(12, 6))
        plt.plot(KIA_trunc2['ds'], KIA_trunc2['y'], label='real')
        plt.plot(forecast['ds'], forecast['yhat'], label='forecast')
        plt.grid()
        plt.legend()
        plt.show()
        '''
        
        # plt.show()

        # KIA_trunc2.to_csv('./saved_data/KIA_trunc2.csv')




if __name__ == '__main__':
    t = TimeSeries()
    # t.polyfit_regression()
    # t.forecast()
    # t.kia_scrap()
    t.seasonal()
