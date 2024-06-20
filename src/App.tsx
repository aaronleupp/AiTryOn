import "./App.css";
import Home from "./pages/Home";
import { SnackbarProvider } from "notistack";

function App() {
  return (
    <div className="App">
      <SnackbarProvider maxSnack={3}>
        <Home />
      </SnackbarProvider>
    </div>
  );
}

export default App;
