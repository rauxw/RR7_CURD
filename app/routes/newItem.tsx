import { Form, redirect, type ActionFunctionArgs } from "react-router";
import { supabase } from "~/supabase-client";

export function meta() {
  return [
    { title: "New Item | CURD React Router 7" },
    {
      name: "description",
      content: "Create a new item using our Supabase CRUD app",
    },
  ];
}

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const title = formData.get("title") as String;
  const description = formData.get("description") as String;

  if (!title || !description) {
    return { error: "Title and Description required" };
  }

  const { error } = await supabase.from("items").insert({ title, description });

  if (error) {
    return { error: error.message };
  }

  return redirect("/");
}

export default function NewItem() {
  return (
    <div className="mt-5 ml-2 flex flex-col items-center justify-center">
      <h2 className="mb-5 font-bold text-[25px] text-white bg-stone-950 border rounded-md p-3">
        Create New Items
      </h2>
      <Form method="post" className="w-full max-w-md">
        <div className="flex flex-col items-center mb-5">
          <label className="">Title</label>
          <input
            className="p-2 mt-1 mb-1 border rounded-md text-center"
            placeholder="Enter title for product"
            type="text"
            name="title"
            required
          />
        </div>
        <div className="flex flex-col items-center mb-5">
          <label className="">Description </label>
          <textarea
            className="p-3 m-3 w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-center"
            placeholder="Enter Description for Product"
            name="description"
            required
          />
        </div>
        <div className="flex justify-center w-full">
          <button
            className="bg-blue-500 text-blue-100 hover:bg-blue-700 hover:text-black font-bold py-2 px-4 rounded transition duration-300"
            type="submit"
          >
            Create Item
          </button>
        </div>
      </Form>
    </div>
  );
}
