import * as React from 'react';
import { createRoot } from 'react-dom/client';
import { HashRouter, Route, Routes } from 'react-router-dom';
import { Menu } from './components/menu';
import SnackbarProvider from 'react-simple-snackbar'
import { Home } from './pages/home';
import { initAuthenticationContext, login } from './services/auth.service'
import { useEffect } from 'react';

function App() {
  useEffect(() => {
    initAuthenticationContext();
    login();
  }, []);

  return <div className="flex">
    <HashRouter>
      <div className="w-56 fixed top-0">
        <Menu />
      </div>
      <div className="ml-56 flex-1 p-8">
          <SnackbarProvider>
            <Routes>
              <Route path="/" element={<Home />} />
            </Routes>
          </SnackbarProvider>
      </div>
    </HashRouter>
  </div>
}
const container = document.querySelector('#root');
const root = createRoot(container);
root.render(<App />);

