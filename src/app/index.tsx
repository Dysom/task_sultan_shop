import { Provider } from "react-redux";
import { store } from "../store";
import { Pages } from "../components/pages";

import "../scss/styles.scss";

export const App = () => (
  <Provider store={store}>
    <Pages />
  </Provider>
);
