import React, { useState } from "react";
import { useAddServiceMutation } from "@/Redux/features/dashboard/dashboard/servicesApi";

export default function Services() {
  const [title, setTitle] = useState("");
  const [iconFile, setIconFile] = useState<File | null>(null);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [addService, { isLoading }] = useAddServiceMutation();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSuccessMessage("");
    setErrorMessage("");

    if (!title) {
      alert("Please enter a title");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("title", title);
      if (iconFile) formData.append("icon", iconFile);

      await addService(formData).unwrap();

      setTitle("");
      setIconFile(null);
      setSuccessMessage("Service added successfully!");
    } catch (error) {
      console.error("Failed to add service:", error);
      setErrorMessage("Error adding service.");
    }
  };

  return (
    <div className="max-w-md mx-auto p-4">
      <h2 className="text-xl font-bold mb-4">Add New Service</h2>
      <form onSubmit={handleSubmit} className="space-y-4" encType="multipart/form-data">
        <div>
          <label className="block mb-1 font-medium">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
              setSuccessMessage("");
              setErrorMessage("");
            }}
            placeholder="e.g. Web Design"
            required
            className="w-full border px-3 py-2 rounded"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Icon Upload</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => {
              if (e.target.files && e.target.files.length > 0) {
                setIconFile(e.target.files[0]);
                setSuccessMessage("");
                setErrorMessage("");
              }
            }}
            className="w-full"
          />
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          {isLoading ? "Submitting..." : "Add Service"}
        </button>
      </form>

      {successMessage && <p className="text-green-600 mt-4">{successMessage}</p>}
      {errorMessage && <p className="text-red-600 mt-4">{errorMessage}</p>}
    </div>
  );
}
