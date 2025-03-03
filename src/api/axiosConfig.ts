import axios, {AxiosInstance} from "axios";

export interface ApiConfig {
    backendApi: string;
}

export let backendApiAxios: AxiosInstance;

export const initializeApi = (apiConfig: ApiConfig) => {
    backendApiAxios = axios.create({
        baseURL: apiConfig.backendApi,
    })
};

