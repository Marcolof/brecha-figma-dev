import { useEffect } from 'react';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import ModulePage from './pages/ModulePage';
import DocPage from './pages/DocPage';
import NotFound from './pages/NotFound';
import DiffList from './pages/DiffList';
import DiffDetail from './pages/DiffDetail';

function ScrollToTop() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (!hash) window.scrollTo(0, 0);
  }, [pathname, hash]);
  return null;
}

export default function App() {
  return (
    <Layout>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Navigate to="/diferencias/componentes" replace />} />
        <Route path="/diferencias" element={<Navigate to="/diferencias/componentes" replace />} />
        <Route path="/diferencias/:tab" element={<DiffList />} />
        <Route path="/diferencias/:tab/:id" element={<DiffDetail />} />
        <Route path="/documentacion" element={<Home />} />
        <Route path="/m/:moduleId" element={<ModulePage />} />
        <Route path="/doc/*" element={<DocPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Layout>
  );
}
