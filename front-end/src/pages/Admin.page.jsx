import { IoCreateOutline } from "react-icons/io5";
import { FiEdit } from "react-icons/fi";
import { CiViewList } from "react-icons/ci";
import { Link } from "react-router-dom";

export default function Admin() {
  return (
    <div class="flex flex-wrap justify-center space-x-4 p-4">
      <Link to="/create-estate">
        <button class="bg-slate-700 text-white rounded-lg p-4 w-full sm:w-64 text-center hover:opacity-90">
          <IoCreateOutline className="mr-2" />
          Create
        </button>
      </Link>
      <Link to="/update-estate">
        <button class="bg-slate-700 text-white rounded-lg p-4 w-full sm:w-64 text-center mt-4 sm:mt-0 hover:opacity-90">
          <FiEdit className="mr-2" />
          Update
        </button>
      </Link>
      <Link to="/estate-list">
        <button class="bg-slate-700 text-white rounded-lg p-4 w-full sm:w-64 text-center mt-4 sm:mt-0 hover:opacity-90">
          <CiViewList className="mr-2" />
          View
        </button>
      </Link>
    </div>
  );
}
