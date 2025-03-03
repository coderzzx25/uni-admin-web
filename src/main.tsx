import ReactDOM from 'react-dom/client';

import 'normalize.css';
import '@ant-design/v5-patch-for-react-19';

import App from '@/App.tsx';
import '@/locales'; // 国际化

ReactDOM.createRoot(document.getElementById('root')!).render(<App />);
