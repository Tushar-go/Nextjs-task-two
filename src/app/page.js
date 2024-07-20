"use client"
import Loader from "@/components/Loader";
import Pagination from "@/components/Pagination";
import UserDetails from "@/components/UserDetails";
import axios from "axios";
import { useEffect, useState } from "react";

import avatar from "../../public/avatar.png"


export default function Home() {


  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 7;

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `https://602e7c2c4410730017c50b9d.mockapi.io/users?page=${currentPage}&limit=${usersPerPage}`
        );
        setUsers(response.data);

        setError("");
      } catch (err) {
        setError("Failed to fetch users");
      }
      setLoading(false);
    };

    fetchUsers();
  }, [currentPage]);

  const handleImageError = (event) => {
    event.target.src = avatar;
  };

  if (loading) return <Loader />;
  if (error) return <div className="text-red-500">{error}</div>;
  


  return (
    <div className="grid grid-cols-1 md:grid-cols-[1fr_400px] gap-8 p-4 md:p-8">
      <div className="border rounded-lg overflow-hidden">
        <ul className="divide-y">
          {users?.map((user, i) => (
            <li
              key={i}
              onClick={() => setSelectedUser(user)}
              className="hover:bg-gray-100 cursor-pointer transition-colors p-4 flex items-center gap-4">
              <span className="relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full">
                <img className="aspect-square h-full w-full"
                  src={user?.avatar}
                  alt={user?.profile?.firstName}
                  onError={handleImageError} />
              </span>
              <div className="flex-1">
                <h3 className="font-semibold"> {user?.profile?.firstName} {user?.profile?.lastName}</h3>
                <p className="text-muted-foreground text-sm"> {user?.profile?.email}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {selectedUser ? (
        <UserDetails user={selectedUser} />
      ) : (
        <div className=" flex flex-col text-2xl font-medium text-center justify-center ">Select a user to see details</div>
      )}

      <div>

        <Pagination
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          totalPages={Math.ceil(100 / usersPerPage)}
        />
      </div>
    </div>
  );
}
