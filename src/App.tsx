import { Navigate, Route, Routes } from 'react-router-dom';
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import LibraryPage from './pages/LibraryPage';
import BookPage from './pages/BookPage';
import ReaderPage from './pages/ReaderPage';
import SearchPage from './pages/SearchPage';
import MePage from './pages/MePage';

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="bibel" element={<LibraryPage />} />
        <Route path="bibel/:bookId" element={<BookPage />} />
        <Route path="bibel/:bookId/:chapter" element={<ReaderPage />} />
        <Route path="suche" element={<SearchPage />} />
        <Route path="ich" element={<MePage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  );
}
