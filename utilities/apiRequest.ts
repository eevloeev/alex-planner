import axios, { AxiosRequestConfig } from "axios"

const httpClient = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_APP_HOST}/api/`,
})

const apiRequest = (config: AxiosRequestConfig) => {
  return httpClient(config)
}

export { apiRequest }
