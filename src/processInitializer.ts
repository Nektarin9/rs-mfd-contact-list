import {ApiConfig} from "./api/axiosConfig";

export interface AppConfig {
    api?: {
        backendApi: string;
    },

}
export class ProcessInitializer {
    private readonly config?: AppConfig;

    constructor(config?: AppConfig) {
        this.config = config;
    }

    getApi(): ApiConfig {
        return {
            backendApi: this.config?.api?.backendApi || '',
        };
    }
}

export const processInitializer = new ProcessInitializer(window.config);