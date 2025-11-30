import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import SearchResults from './pages/SearchResults';
import ServiceDetail from './pages/ServiceDetail';
import Profile from './pages/Profile';
import ClientDashboard from './pages/ClientDashboard';
import ProDashboard from './pages/ProDashboard';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import './App.css';

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/search" element={<SearchResults />} />
            <Route path="/services/:id" element={<ServiceDetail />} />
            <Route path="/profiles/:id" element={<Profile />} />
            <Route path="/dashboard/client" element={<ClientDashboard />} />
            <Route path="/dashboard/pro" element={<ProDashboard />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;