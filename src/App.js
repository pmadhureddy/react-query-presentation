import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { QueryClientProvider, QueryClient } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import NavigationBar from "./NavigationBar";
import "./App.css";
import User from "./components/User";
import RQUsers from "./components/RQUsers";
import Users from "./components/Users";
import Home from "./Home";
import Pagination from "./Pagination";
import Post from "./Post/Post";
const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="container">
        <Router>
          <NavigationBar />
          <Switch>
            {/* <Route path="/user/:id">
              <User />
            </Route> */}
            <Route path="/users">
              <RQUsers />
            </Route>
            <Route path="/post/:id">
              <Post />
            </Route>
            <Route path="/" exact>
              {/* <Pagination /> */}
              <Home />
            </Route>
          </Switch>
        </Router>
      </div>
      <ReactQueryDevtools initialIsOpen={false} position="bottom-right" />
    </QueryClientProvider>
  );
}

export default App;
