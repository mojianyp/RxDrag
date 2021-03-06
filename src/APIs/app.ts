import { AxiosRequestConfig } from "axios"

const API_LOGIN : AxiosRequestConfig= {
  url:'/api/login',
  method:'post',
}

const API_GET_APP_INFO : AxiosRequestConfig= {
  url:'/api/get-app-info',
  method:'get',
}

const API_GET_LASTED_NOTIFICATIONS : AxiosRequestConfig= {
  url:'/api/get-lasted-notifications',
  method:'get',
}

function getIntlApi(lang:string): AxiosRequestConfig{
  return {
    url:`/locales/${lang}.json`,
    method:'get',
  }
}


export { 
  API_LOGIN,
  API_GET_APP_INFO, 
  API_GET_LASTED_NOTIFICATIONS,
  getIntlApi
}