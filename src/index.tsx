import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import {MainApp} from './apps/MainApp';
import reportWebVitals from './reportWebVitals';
import {AppConfig, processInitializer} from "src/processInitializer";
import { initializeApi } from './api/axiosConfig';



const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

declare global {
    interface Window {
        config?: AppConfig
    }
}

initializeApi(processInitializer.getApi());

root.render(
        <React.StrictMode>
            <MainApp />
      </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
