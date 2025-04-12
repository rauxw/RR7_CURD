import { supabase } from "~/supabase-client";
import type { Route } from "./+types/item";
import { Form, redirect, type ActionFunctionArgs } from "react-router";
import { title } from "process";

export function meta() {
  return [
    { title: "Edit and Update Items" },
    {
      name: "description",
      content: "Manage your items and over here update and delete them",
    },
  ];
}

export async function loader({ params }: Route.LoaderArgs) {
  const { id } = params;
  if (!id) {
    return { error: "No Item found" };
  }

  const { data, error } = await supabase
    .from("items")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    return { error: error.message };
  }
  return { item: data };
}

export async function action({ request, params }: ActionFunctionArgs) {
  const formData = await request.formData();
  const title = formData.get("title") as String;
  const description = formData.get("description") as String;
  const intent = formData.get("intent");

  if (intent === "delete") {
    const { error } = await supabase.from("items").delete().eq("id", params.id);
    if (error) {
      return { error: error.message };
    }
    return redirect("/");
  } else if (intent === "update") {
    const { error } = await supabase
      .from("items")
      .update({ title, description })
      .eq("id", params.id);
    if (error) {
      return { error: error.message };
    }
    return redirect("/");
  }
  return {};
}

export default function Item({ loaderData }: Route.ComponentProps) {
  const { item } = loaderData;
  return (
    <div>
      <h2>Edit Items</h2>
      <Form method="POST">
        {" "}
        <div className="flex flex-col items-center mb-5">
          <label className="">Title</label>
          <input
            className="p-2 mt-1 mb-1 border rounded-md text-center"
            placeholder="Enter title for product"
            type="text"
            name="title"
            defaultValue={item.title}
            required
          />
        </div>
        <div className="flex flex-col items-center mb-5">
          <label className="">Description </label>
          <textarea
            className="p-3 m-3 w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-center"
            placeholder="Enter Description for Product"
            name="description"
            defaultValue={item.description}
            required
          />
        </div>
        <div className="flex justify-center w-full">
          <button
            className="bg-blue-500 text-blue-100 hover:bg-blue-700 hover:text-black font-bold py-2 px-4 rounded transition duration-300 m-3"
            type="submit"
            value="update"
            name="intent"
          >
            Update Item
          </button>
          <button
            className="bg-blue-500 text-blue-100 hover:bg-blue-700 hover:text-black font-bold py-2 px-4 rounded transition duration-300 m-3"
            type="submit"
            value="delete"
            name="intent"
          >
            Delete Item
          </button>
        </div>
      </Form>
    </div>
  );
}
