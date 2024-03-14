import Metrics from "./components/Metrics";
import Sidebar from "./components/Sidebar";
import Home from "./components/Home/Home";
import ScrollToTop from "./components/Home/ScrollToTop";
import "./scss/Styles.scss";
import Dashboard from "./components/Dashboard";
import UserList from "./components/UserList";
import CategoryList from "./components/CategoryList";
import ComplaintForm from "./components/ComplaintForm";
import ComplaintList from "./components/ComplaintList";
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';

function App() {
  return (
    // <div>
    // <ScrollToTop />
    // <Home/>
    // </div>
<Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/complaint-form" element={<ComplaintForm />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/dashboard/users" element={<UserList />} />
        <Route path="/dashboard/complaint-categories" element={<CategoryList />} />
        <Route path="/dashboard/complaints" element={<ComplaintList />} />
        {/* Redirect to home page for any other route */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
