import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import usegetUserData from "./hooks/useGetUserData";
import Header from "./components/Header";
function App() {
  const { user } = usegetUserData();
  return (
    <BrowserRouter>
      {/* Header */}
      <Header user={user}/>
      {/* Routes */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />  
      </Routes>
    </BrowserRouter>
  );
}

export default App;
