import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import HomePage from './pages/HomePage';
import FourOhFourPage from './pages/FourOhFourPage';
import DogDetailPage from './pages/DogDetailPage';
import { CoreProvider } from './context/userContext';
import Layout from './components/Layout';

const queryClient = new QueryClient();

function App() {
  return (
    <CoreProvider>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <Routes>
            <Route element={<Layout />}>
              <Route path="/" element={<HomePage />} />
              <Route path="/search" />
              <Route path="/dog/:id" element={<DogDetailPage />} />
              <Route path="*" element={<FourOhFourPage />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </QueryClientProvider>
    </CoreProvider>
  );
}

export default App;
