import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./components/Store/store";
import NotFound from "./components/NotFound";
import UserDetails from "./components/UserDetails/UserDetails";
import ChatBotPage from "./components/ChatBotPage/ChatBotPage";

const App = () => (
  <BrowserRouter>
    <Provider store={store}>
      <Routes>
        <Route path="/" element={<UserDetails />} />
        <Route path="/userChats" element={<ChatBotPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Provider>
  </BrowserRouter>
);

export default App;
