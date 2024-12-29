import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { ConfigProvider } from 'antd';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import ptBR from 'antd/lib/locale/pt_BR';
import dayjs from 'dayjs';
import 'dayjs/locale/pt-br';
import './index.css'
import AppRoutes from './routes/routes.tsx';
import { BrowserRouter } from 'react-router-dom';
dayjs.locale('pt-br');

const tokens = {
  components: {
    Card: {
      colorBgContainer: 'red',
    },
  }
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <ConfigProvider locale={ptBR} theme={tokens}>
        <AppRoutes />
        <ToastContainer />
      </ConfigProvider>
    </BrowserRouter>
  </StrictMode>,
)
