import { Navigate, Route, Routes } from 'react-router-dom';
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import LibraryPage from './pages/LibraryPage';
import BookPage from './pages/BookPage';
import ReaderPage from './pages/ReaderPage';
import SearchPage from './pages/SearchPage';
import StudyPage from './pages/StudyPage';
import PlanPage from './pages/PlanPage';
import LexiconPage from './pages/LexiconPage';
import TimelinePage from './pages/TimelinePage';
import MapPage from './pages/MapPage';
import ConcordancePage from './pages/ConcordancePage';
import SynopsisPage from './pages/SynopsisPage';
import MemoryPage from './pages/MemoryPage';
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
        <Route path="lexikon" element={<LexiconPage />} />
        <Route path="studium" element={<StudyPage />} />
        {/* Werkzeuge vor der Plan-Route, sonst greift :planId zuerst. */}
        <Route path="studium/zeitleiste" element={<TimelinePage />} />
        <Route path="studium/karte" element={<MapPage />} />
        <Route path="studium/konkordanz" element={<ConcordancePage />} />
        <Route path="studium/synopse" element={<SynopsisPage />} />
        <Route path="studium/merkverse" element={<MemoryPage />} />
        <Route path="studium/:planId" element={<PlanPage />} />
        <Route path="ich" element={<MePage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  );
}
