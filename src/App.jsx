// App.jsx
import { createBrowserRouter, RouterProvider, Outlet } from "react-router";
import { Provider } from "react-redux";
import Signin from "./components/Signin";
import Browse from "./components/Browse";
import appStore from "./utils/appStore";
import Body from "./components/Body";
import GptSearch from "./components/GptSearch";

function App() {
  const appRouter = createBrowserRouter([
    {
      element: <RootLayout />, // common wrapper
      children: [
        { path: "/", element: <Signin /> },
        { path: "/browse", element: <Browse /> },
        { path: "/gptsearch", element: <GptSearch /> },
      ],
    },
  ]);

  function RootLayout() {
    return (
      <>
        <Body /> {/* Mounted once, inside router context */}
        <Outlet /> {/* renders Signin or Browse */}
      </>
    );
  }

  return (
    <Provider store={appStore}>
      <RouterProvider router={appRouter} />
    </Provider>
  );
}

export default App;
