import { Helmet } from "react-helmet-async";

import s from "./index.module.scss";

const PageNotFound = () => {
  return (
    <>
      <Helmet>
        <title>404 страница не найдена</title>
      </Helmet>
      <div className={s.wrap}>
        <h1>404 страница не найдена</h1>
      </div>
    </>
  );
};

export { PageNotFound };
