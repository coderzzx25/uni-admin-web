import ReactDOM from 'react-dom/client';

import 'normalize.css';
import '@/assets/css/index.css';

import RootApp from './RootApp';
import '@/locales'; // 国际化

ReactDOM.createRoot(document.getElementById('root')!).render(<RootApp />);
