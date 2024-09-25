import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";

export default function CreateListing() {
  const [uploading, setUploading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [files, setFiles] = useState([]);
  const navigate = useNavigate();
  const { currentUser } = useSelector((state) => state.user);
  console.log(currentUser);

  const [formData, setFormData] = useState({
    imageUrls: [],
    name: "",
    description: "",
    address: "",
    type: "rent",
    bedrooms: 1,
    bathrooms: 1,
    regularPrice: 50,
    parking: false,
    furnished: false,
  });
  console.log(formData);

  const handleFileChange = (e) => {
    setFiles(Array.from(e.target.files));
  };

  const uploadImages = async () => {
    setUploading(true);
    try {
      const formData = new FormData();
      files.forEach((file) => {
        formData.append("images", file);
      });

      const response = await fetch("/api/v1/upload/image", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      if (data.success) {
        setFormData((prev) => ({
          ...prev,
          imageUrls: [...prev.imageUrls, ...data.imageUrls],
        }));
      } else {
        console.error(data.message);
      }
    } catch (error) {
      console.error("Error uploading images:", error);
    } finally {
      setUploading(false);
    }
  };

  const handleChange = (e) => {
    if (e.target.id === "sale" || e.target.id === "rent") {
      setFormData({
        ...formData,
        type: e.target.id,
      });
    }

    if (e.target.id === "parking" || e.target.id === "furnished") {
      setFormData({
        ...formData,
        [e.target.id]: e.target.checked,
      });
    }

    if (
      e.target.type === "number" ||
      e.target.type === "text" ||
      e.target.type === "textarea"
    ) {
      setFormData({
        ...formData,
        [e.target.id]: e.target.value,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (formData.imageUrls.length < 1)
        return toast.error("You must upload at least one image");

      setLoading(true); // Start loading

      // Add userRef (user id) to formData

      const finalData = {
        ...formData,
        userRef: currentUser.data._id,
      };
  
      const res = await axios.post("/api/v1/listing/create", finalData, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });

      if (res.data.success) {
        toast.success(res.data.message || "Created Successfully");
        navigate(`/listing/${res.data._id}`);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false); // Stop loading after request completes
    }
  };

  return (
    <main className="max-w-4xl p-3 mx-auto md:p-6 lg:max-w-5xl">
      <h1 className="text-3xl font-semibold text-center mb-7">
        Create a Listing
      </h1>
      <form
        className="flex flex-col gap-4 sm:flex-row sm:gap-6 lg:flex-row"
        onSubmit={handleSubmit}
      >
        <div className="flex flex-col flex-1 gap-4 sm:w-full md:w-1/2 lg:w-1/2 xl:w-3/5">
          <input
            type="text"
            placeholder="Name"
            className="w-full p-3 border rounded-lg"
            id="name"
            maxLength="62"
            minLength="10"
            required
            value={formData.name}
            onChange={handleChange}
          />
          <textarea
            type="text"
            placeholder="Description"
            className="w-full p-3 border rounded-lg"
            id="description"
            required
            value={formData.description}
            onChange={handleChange}
          />
          <input
            type="text"
            placeholder="Address"
            className="w-full p-3 border rounded-lg"
            id="address"
            required
            value={formData.address}
            onChange={handleChange}
          />
          <div className="flex flex-wrap gap-4 sm:gap-6">
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="sale"
                className="w-5"
                checked={formData.type === "sale"}
                onChange={handleChange}
              />
              <span>Sell</span>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="rent"
                className="w-5"
                checked={formData.type === "rent"}
                onChange={handleChange}
              />
              <span>Rent</span>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="parking"
                className="w-5"
                checked={formData.parking}
                onChange={handleChange}
              />
              <span>Parking spot</span>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="furnished"
                className="w-5"
                checked={formData.furnished}
                onChange={handleChange}
              />
              <span>Furnished</span>
            </div>
          </div>
          <div className="flex flex-wrap gap-4 sm:gap-6">
            <div className="flex items-center w-full gap-2 sm:w-auto">
              <input
                type="number"
                id="bedrooms"
                min="1"
                max="10"
                required
                className="w-full p-3 border border-gray-300 rounded-lg sm:w-20"
                value={formData.bedrooms}
                onChange={handleChange}
              />
              <p>Beds</p>
            </div>
            <div className="flex items-center w-full gap-2 sm:w-auto">
              <input
                type="number"
                id="bathrooms"
                min="1"
                max="10"
                required
                className="w-full p-3 border border-gray-300 rounded-lg sm:w-20"
                value={formData.bathrooms}
                onChange={handleChange}
              />
              <p>Baths</p>
            </div>

            <div className="flex items-center w-full gap-2 sm:w-auto">
              <input
                type="number"
                id="regularPrice"
                min="50"
                max="10000000"
                required
                className="w-full p-3 border border-gray-300 rounded-lg sm:w-28"
                value={formData.regularPrice}
                onChange={handleChange}
              />
              <div className="flex flex-col items-center">
                <p>Regular price</p>
                {formData.type === "rent" && (
                  <span className="text-xs">($ / month)</span>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col flex-1 gap-4 sm:w-full md:w-1/2 lg:w-1/2 xl:w-2/5">
          <p className="mb-2 font-semibold">
            Images:
            <span className="ml-2 font-normal text-gray-600">
              The first image will be the cover (max 6)
            </span>
          </p>
          <div className="flex gap-4 mb-4">
            <input
              className="w-full p-3 border border-gray-300 rounded"
              type="file"
              id="images"
              accept="image/*"
              multiple
              onChange={handleFileChange}
            />
            <button
              type="button"
              onClick={uploadImages}
              className="p-3 text-green-700 uppercase border border-green-700 rounded hover:shadow-lg disabled:opacity-80"
              disabled={uploading || files.length === 0}
            >
              {uploading ? "Uploading..." : "Upload"}
            </button>
          </div>
          {/* Display uploaded images */}
          {formData.imageUrls.length > 0 &&
            // eslint-disable-next-line no-unused-vars
            formData.imageUrls.map((url, index) => (
              <div
                key={url}
                className="flex items-center justify-between p-3 mb-4 border"
              >
                <img
                  src={url}
                  alt="listing image"
                  className="object-contain w-20 h-20 rounded-lg"
                />
                <button
                  type="button"
                  className="p-3 text-red-700 uppercase rounded-lg hover:opacity-75"
                >
                  Delete
                </button>
              </div>
            ))}
          <button
            disabled={loading || uploading}
            className="w-full p-3 text-white uppercase rounded-lg bg-slate-700 hover:opacity-95 disabled:opacity-80"
          >
            {loading ? "Creating..." : "Create listing"}
          </button>
        </div>
      </form>
    </main>
  );
}
