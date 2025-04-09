import { supabase } from "~/supabase-client";
import type { Route } from "./+types/items";

export async function loader() {
  const { data, error } = await supabase.from("items").select("*");

  if (error) {
    return { error: error.message };
  }

  return { items: data };
}

export function Items({ loaderData }: Route.ComponentProps) {
  const { items, error } = loaderData;
  return (
    <div>
      <h2>List of Items</h2>
      {error && <div>Error</div>}
    </div>
  );
}
