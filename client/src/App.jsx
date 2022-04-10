import Topbar from "./components/topbar/Topbar";
import Homepage from "./pages/homepage/Homepage";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import Settings from "./pages/settings/Settings";
import Single from "./pages/single/Single";
import Write from "./pages/write/Write";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useContext } from "react";
import { Context } from "./context/Context";
import Favourites from "./pages/favourites/Favourites";

function App() {
  const { user } = useContext(Context);
  return (
    <BrowserRouter>
      <Topbar />

      <Routes>
        <Route exact path="/" element={<Homepage />} />
        <Route exact path="/posts" element={<Homepage />} />
        <Route
          exact
          path="/register"
          element={user ? <Homepage /> : <Register />}
        />

        <Route path="/login" element={user ? <Homepage /> : <Login />} />
        <Route path="/post/:id" element={<Single />} />

        <Route path="/write" element={user ? <Write /> : <Login />} />
        <Route path={`/${user._id}/favourites`} element={user ? <Favourites /> : <Login />} />

        <Route
          path="/settings"
          element={user ? <Settings /> : <Login />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
