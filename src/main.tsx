import ReactDOM from 'react-dom/client';

import 'normalize.css';
import '@/assets/css/index.css';

import RootApp from './RootApp';
import '@/locales'; // 国际化
import { initializeI18n } from '@/locales';

initializeI18n().then(() => ReactDOM.createRoot(document.getElementById('root')!).render(<RootApp />));
