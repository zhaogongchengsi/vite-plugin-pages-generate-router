import { Route, Routes } from "react-router-dom";

export interface Router {
  path: string;
  element: any;
  title: string;
}

export interface RouterRenderProps {
  routers: Router[];
}

export default function RouterRender({ routers }: RouterRenderProps) {
  return (
    <>
      <Routes>
        {routers.map((router) => {
          return (
            <>
              <Route
                path={router.path}
                key={router.title}
                element={router.element}
              />
            </>
          );
        })}
      </Routes>
    </>
  );
}
