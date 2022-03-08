import React from "react";
import { Route, Routes } from "react-router-dom";

import { PageNotFound } from "./pages/PageNotFound";
import { ROUTES } from "./routes";

function App() {
  return (
    <>
      <Routes>
        {ROUTES.All.map((elem, idx) => (
          <Route
            index={elem.index}
            key={elem.path + idx}
            path={elem.route || elem.path}
            element={elem.element}
          />
        ))}
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </>
  );
}

export { App };
