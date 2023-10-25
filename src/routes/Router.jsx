import { BrowserRouter, Route, Routes } from "react-router-dom";
import Dashboard from "../components/screens/dashboard/Dashboard";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
