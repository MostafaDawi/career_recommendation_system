import { BrowserRouter as Router } from "react-router-dom";
import "./App.css";
import AppWrapper from "./components/AppWrapper";
//import Chatbot from "./Chatbot";

function App() {
  return (
    <Router>
      <AppWrapper />
    </Router>
  );
}
export default App;
