import { IoCreateOutline } from "react-icons/io5";
import { CiViewList } from "react-icons/ci";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useSelector } from "react-redux";


export default function Admin() {
  const { currentUser } = useSelector((state) => state.user);
  const [showListingError, setShowListingsError] = useState(false);
  const [userListings, setUserListings] = useState([]);
  

 const handleShowListings = async () => {
   try {
     setShowListingsError(false); // Reset error state

     const res = await fetch(`/back-end/user/listings/${currentUser._id}`);
     const data = await res.json();

     // Log the fetched data
     console.log("Fetched data:", data);

     // Check if data is an array and has items
     if (!Array.isArray(data) || data.length === 0) {
       setShowListingsError(true);
       console.log("No listings found");
       return;
     }

     // Update state with the fetched data
     setUserListings(data);
   } catch (error) {
     console.error("Error fetching listings:", error);
     setShowListingsError(true);
   }
  };
  
 const handleListingDelete = async (listingId) => {
   try {
     const res = await fetch(`/back-end/listing/delete/${listingId}`, {
       method: "DELETE",
     });
     const data = await res.json();
     if (data.success === false) {
       console.log(data.message);
       return;
     }

     setUserListings((prev) =>
       prev.filter((listing) => listing._id !== listingId)
     );
   } catch (error) {
     console.log(error.message);
   }
 };
return (
  <div className="flex flex-col items-center p-4">
    <div className="flex flex-col sm:flex-row justify-center gap-4 w-full sm:w-auto">
      <Link to="/create-estate" className="w-full sm:w-64">
        <button className="bg-slate-700 text-white rounded-lg p-4 w-full text-center flex items-center justify-center hover:opacity-90">
          <IoCreateOutline className="mr-2" />
          Create
        </button>
      </Link>
      <button
        onClick={handleShowListings}
        className="bg-slate-700 text-white rounded-lg p-4 w-full sm:w-64 text-center flex items-center justify-center hover:opacity-90">
        <CiViewList className="mr-2" />
        Show Estate List
      </button>
    </div>

    <p className="text-red-500 text-center mt-4">
      {showListingError &&
        "Error occurred while fetching listings. Please try again later."}
    </p>
    {Array.isArray(userListings) && userListings.length > 0 ? (
      <div className="flex flex-col gap-4">
        <h1 className="text-center mt-7 text-2xl font-semibold">
          Your Listings
        </h1>
        {userListings.map((listing) => (
          <div
            key={listing._id}
            className="border rounded-lg p-4 flex justify-between items-center gap-4">
            <Link to={`/listing/${listing._id}`}>
              {listing.imageUrls && listing.imageUrls[0] ? (
                <img
                  src={listing.imageUrls[0]}
                  alt="listing cover"
                  className="h-20 w-20 object-contain"
                />
              ) : (
                <div className="h-16 w-16 bg-gray-300 flex items-center justify-center">
                  No Image
                </div>
              )}
            </Link>
            <Link
              className="text-slate-700 font-semibold hover:underline truncate flex-1"
              to={`/listing/${listing._id}`}>
              <p>{listing.name}</p>
            </Link>

            <div className="flex flex-col items-center">
              <button
                onClick={() => handleListingDelete(listing._id)}
                className="text-red-700 uppercase">
                Delete
              </button>
              <Link to={`/update-estate/${listing._id}`}>
                <button className="text-green-700 uppercase">Edit</button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    ) : (
      !showListingError && (
        <p className="mt-4"></p>
      )
    )}
  </div>
);
}
