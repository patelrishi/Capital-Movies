import "./App.css";
import { Provider } from "react-redux";
import store from "./Store";
import Routes from "./Routes";
import { useHistory } from "react-router";

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <div>
          <Routes />
        </div>
      </div>
    </Provider>
  );
}

export default App;
