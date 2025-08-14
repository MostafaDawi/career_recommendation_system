import { BrowserRouter as Router } from "react-router-dom";
import "./App.css";
import AppWrapper from "./components/AppWrapper";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

console.log("URL: ", import.meta.env.VITE_API_GATEWAY_URL);

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
