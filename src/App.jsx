// App.jsx
import { createBrowserRouter, RouterProvider } from "react-router";
import { Provider } from "react-redux";
import Signin from "./components/Signin";
import Browse from "./components/Browse";
import appStore from "./utils/appStore";
import Body from "./components/Body";

function App() {
  const appRouter = createBrowserRouter([
    {
      path: "/",
      element: (
        <>
          <Body /> {/* logic wrapper always runs */}
          <Signin /> {/* actual UI */}
        </>
      ),
    },
    {
      path: "/browse",
      element: (
        <>
          <Body />
          <Browse />
        </>
      ),
    },
  ]);

  return (
    <Provider store={appStore}>
      <RouterProvider router={appRouter} />
    </Provider>
  );
}

export default App;
