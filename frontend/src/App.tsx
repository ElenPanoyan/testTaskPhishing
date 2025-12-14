import { RoutesWrapper } from "utils/router";
import { Provider } from "react-redux";
import { store } from "utils/redux";
import { BrowserRouter } from "react-router-dom";

const App = () => (
  <BrowserRouter>
    <Provider store={store}>
      <RoutesWrapper />
    </Provider>
  </BrowserRouter>
);

export default App;
