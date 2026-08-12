import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Navbar } from "./components/Navbar";
import { Home } from "./pages/Home";
import { Ast } from "./pages/Ast";

export default function App() {
  return (
    <BrowserRouter basename="/AST-visualizer">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/ast" element={<Ast />} />
      </Routes>
    </BrowserRouter>
  );
}
