import axios, { AxiosRequestConfig } from "axios"

const httpClient = axios.create({
  baseURL: `/api`,
})

const apiRequest = (config: AxiosRequestConfig) => {
  return httpClient(config)
}

export { apiRequest }
