import { useState } from 'react'
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";

import Navbar from "./components/Navbar/Navbar";
import StudentPage from "./pages/studentPage";
import {AnimatePresence} from "framer-motion";

function App() {
  const [count, setCount] = useState(0)

  return (
      <div className="App flex justify-between">
        <Router>
          <Navbar />
          <div className="Main w-full h-[100vh]">
            <AnimatePresence exitBeforeEnter>
              <Routes>
                <Route path="/" element={<StudentPage />} />
              </Routes>
            </AnimatePresence>
          </div>
        </Router>
      </div>
  )
}

export default App
