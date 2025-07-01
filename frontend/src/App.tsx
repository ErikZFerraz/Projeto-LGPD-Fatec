// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import './App.css'

// function App() {
//   const [count, setCount] = useState(0)

//   return (
//     <>
//       <div>
//         <a href="https://vite.dev" target="_blank">
//           <img src={viteLogo} className="logo" alt="Vite logo" />
//         </a>
//         <a href="https://react.dev" target="_blank">
//           <img src={reactLogo} className="logo react" alt="React logo" />
//         </a>
//       </div>
//       <h1>Vite + React</h1>
//       <div className="card">
//         <button onClick={() => setCount((count) => count + 1)}>
//           count is {count}
//         </button>
//         <p>
//           Edit <code>src/App.tsx</code> and save to test HMR
//         </p>
//       </div>
//       <p className="read-the-docs">
//         Click on the Vite and React logos to learn more
//       </p>
//     </>
//   )
// }

// export default App
// import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
// import Home from './pages/Home';
// import Login from './pages/Login';
// import Cadastro from './pages/Cadastro';
// import Perfil from './pages/Perfil';
// import Navbar from './components/Navbar';

// function App() {
//   return (
//     <Router>
//       <Navbar />
//       <Routes>
//         <Route path="/" element={<Home />} />
//         <Route path="/login" element={<Login />} />
//         <Route path="/cadastro" element={<Cadastro />} />
//         <Route path="/perfil" element={<Perfil />} />
//         <Route path="*" element={<Navigate to="/" />} />
//       </Routes>
//     </Router>
//   );
// }

// export default App;


import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import Cadastro from "./pages/Cadastro/Cadastro";
import Perfil from "./pages/Perfil/Perfil";
import Navbar from "./components/Navbar";
import TermosDeUso from './pages/TermosDeUso/TermosDeUso';
import { AuthProvider } from "./context/AuthContext";
import MeusTermos from "./pages/userTermos/userTermos";
import TermosAdmin from "./pages/adminTermos/adminTermos";


function App() {
return (
<AuthProvider>
<Router>
<Navbar />
<Routes>
<Route path="/" element={<Home />} />
<Route path="/login" element={<Login />} />
<Route path="/cadastro" element={<Cadastro />} />
<Route path="/perfil" element={
<Perfil />
}
/>
  <Route path="/termos" element={<TermosDeUso />} />
  <Route path="/userTermos" element={<MeusTermos/>} />
  <Route path="/adminTermos" element={<TermosAdmin/>} />
  <Route path="*" element={<Navigate to="/" />} />
</Routes>
</Router>
</AuthProvider>
);
}

export default App;