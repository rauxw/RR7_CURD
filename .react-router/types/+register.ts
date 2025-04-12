import "react-router";

declare module "react-router" {
  interface Register {
    params: Params;
  }
}

type Params = {
  "/": {};
  "/new": {};
  "/items/:id": {
    "id": string;
  };
};