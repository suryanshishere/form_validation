import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SignUpForm from './components/SignUpForm';
import Success from './components/Success';

const App: React.FC = () => (
  <Router>
    <main className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-2xl mx-auto">
        <Routes>
          <Route path="/" element={<SignUpForm />} />
          <Route path="/success" element={<Success />} />
        </Routes>
      </div>
    </main>
  </Router>
);

export default App;