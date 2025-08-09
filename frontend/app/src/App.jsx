import { BrowserRouter as Router } from "react-router-dom";
import "./App.css";
import AppWrapper from "./components/AppWrapper";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <AppWrapper />
      </Router>
    </QueryClientProvider>
  );
}
export default App;
