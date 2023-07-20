import { Routes, Route } from "react-router-dom";
import CreateAccount from "./Create-Account/createAccount";
import Login from "./Log-In/login";
import TwoFa from "./2fa/twoFa";
import Main from "./main/Main";
function App() {
  return (
    <Routes>
      <Route path="/" element={<CreateAccount />}></Route>
      <Route path="/login" element={<Login />}></Route>
      <Route path="/2fa" element={<TwoFa />}></Route>
      <Route path="/main" element={<Main />}></Route>
    </Routes>
  );
}

export default App;
