import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import SubmissionHistory from "./components/SubmissionHistory"
import Header from "./components/Header"
import Login from "./components/Login"
import Registration from "./components/Registration"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ProtectedRoute from "./components/ProtectedRoute"
import FeedbackForm from "./components/FeedbackForm"
import AverageRating from "./components/AverageRating"

export default function App() {

  return (
    <>
      <ToastContainer />
      <Router> {/* Setting up the Router for the application */}
        <Header />
        <Routes>{/* Defining the routes for the application */}

        {/* Protected routes that require authentication */}

          <Route element={<ProtectedRoute />}>
            <Route path="/feedback" element={<FeedbackForm />} />
            
          </Route>

          <Route path="/" element={<SubmissionHistory />} />
            <Route path="/avg" element={<AverageRating />} />
          <Route path="/register" element={<Registration />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </Router>

    </>
  )
}