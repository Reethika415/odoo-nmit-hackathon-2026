import { BrowserRouter, Routes, Route } from "react-router-dom";
import ApplyLeave from "./pages/ApplyLeave";
import Payroll from "./pages/Payroll";
import Reports from "./pages/Reports";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Reports />} />
        <Route path="/apply-leave" element={<ApplyLeave />} />
        <Route path="/payroll" element={<Payroll />} />
        <Route path="/reports" element={<Reports />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
