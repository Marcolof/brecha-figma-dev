import { useEffect } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import ModulePage from './pages/ModulePage';
import DocPage from './pages/DocPage';
import NotFound from './pages/NotFound';

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
        <Route path="/" element={<Home />} />
        <Route path="/m/:moduleId" element={<ModulePage />} />
        <Route path="/doc/*" element={<DocPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Layout>
  );
}
