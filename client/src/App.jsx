import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Landing from './pages/Landing';
import Login from './pages/Login';
import Register from './pages/Register';
import DashboardNew from './pages/DashboardNew';
import AddPlant from './pages/AddPlant';
import PlantDetails from './pages/PlantDetails';
import WateringReminders from './pages/WateringReminders';
import GrowthJournal from './pages/GrowthJournal';
import PlantCareGuide from './pages/PlantCareGuide';
import Settings from './pages/Settings';
import SamplePlants from './pages/SamplePlants';
import NotFound from './pages/NotFound';
import PrivateRoute from './components/PrivateRoute';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<PrivateRoute><DashboardNew /></PrivateRoute>} />
        <Route path="/plants" element={<PrivateRoute><DashboardNew /></PrivateRoute>} />
        <Route path="/add-plant" element={<PrivateRoute><AddPlant /></PrivateRoute>} />
        <Route path="/plants/:id" element={<PrivateRoute><PlantDetails /></PrivateRoute>} />
        <Route path="/reminders" element={<PrivateRoute><WateringReminders /></PrivateRoute>} />
        <Route path="/growth-journal" element={<PrivateRoute><GrowthJournal /></PrivateRoute>} />
        <Route path="/plant-care-guide" element={<PrivateRoute><PlantCareGuide /></PrivateRoute>} />
        <Route path="/settings" element={<PrivateRoute><Settings /></PrivateRoute>} />
        <Route path="/sample-plants" element={<PrivateRoute><SamplePlants /></PrivateRoute>} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
