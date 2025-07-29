

import { useAddCategoryMutation } from "@/Redux/features/dashboard/dashboard/categoryApi";
import { useState } from "react";

export default function Categories() {
  const [title, setTitle] = useState("");
  const [serviceId, setServiceId] = useState("");

  const [addCategory, { isLoading, }] = useAddCategoryMutation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", title);
    formData.append("serviceId", serviceId);

    try {
      const res = await addCategory(formData).unwrap();
      console.log("Category Created:", res);
    } catch (err) {
      console.error("Create category failed:", err);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-md">
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="border px-3 py-2 w-full"
        required
      />
      <input
        type="text"
        placeholder="Service ID"
        value={serviceId}
        onChange={(e) => setServiceId(e.target.value)}
        className="border px-3 py-2 w-full"
        required
      />
      <button type="submit" disabled={isLoading} className="bg-blue-600 text-white px-4 py-2 rounded">
        {isLoading ? "Creating..." : "Create Category"}
      </button>
    </form>
  );
}
