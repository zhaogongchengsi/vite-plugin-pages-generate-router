import { createBrowserRouter } from "react-router-dom";
import { specModuels, replacemComponents } from "./utils";

const modules = import.meta.glob("../pages/**/*.tsx");

// @ts-ignore
import pageRouters from "page-router";

export async function createAppRouter() {
  const elements = await specModuels(modules, "../pages");
  return replacemComponents(pageRouters, elements);
}
