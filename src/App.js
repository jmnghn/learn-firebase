import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import Nav from "./components/Nav";
import useAuthContext from "./hooks/useAuthContext";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Signup from "./pages/signup/Signup";

function App() {
  const { isAuthReady, user } = useAuthContext();

  return (
    <div className="App">
      {isAuthReady ? (
        <BrowserRouter>
          <Nav></Nav>
          <Routes>
            <Route
              path="/"
              element={
                user ? <Home /> : <Navigate replace={true} to="/login" />
              }
            ></Route>
            <Route
              path="/login"
              element={!user ? <Login /> : <Navigate replace={true} to="/" />}
            ></Route>
            <Route
              path="/signup"
              element={!user ? <Signup /> : <Navigate replace={true} to="/" />}
            ></Route>
          </Routes>
        </BrowserRouter>
      ) : (
        "Loading..."
      )}
    </div>
  );
}

export default App;
