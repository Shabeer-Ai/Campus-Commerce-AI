import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { checkServerAvailability, setupAxiosMockInterceptor } from './lib/apiMock';

// Initialize dual-mode database mock (to make the app work perfectly on both Cloud Run and static hosts like GitHub Pages!)
checkServerAvailability().then(() => {
  setupAxiosMockInterceptor();
  
  createRoot(document.getElementById('root')!).render(
    <StrictMode>
      <App />
    </StrictMode>,
  );
});

