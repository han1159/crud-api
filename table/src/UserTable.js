// UserTable.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Pagination from '@mui/material/Pagination';
import "./style1.css"
const UserTable = () => {
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 10;
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/user?page=${currentPage}&limit=${usersPerPage}`);
        setUsers(response.data);
        setTotalPages(11);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchData();
  }, [currentPage, usersPerPage]);

  const handlePageChange = (event, newPage) => {
    setCurrentPage(newPage);
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      {users.length === 0 ? (
        <p>No users found.</p>
      ) : (
        <div className="text-center">
          <table className="min-w-full table-fixed mx-auto mb-4">
            <thead>
              <tr>
                <th className="border px-4 py-2">Name</th>
                <th className="border px-4 py-2">Age</th>
                <th className="border px-4 py-2">Sex</th>
                <th className="border px-4 py-2">Contact No</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user._id}>
                  <td className="border px-4 py-2">{user.name}</td>
                  <td className="border px-4 py-2">{user.age}</td>
                  <td className="border px-4 py-2">{user.sex}</td>
                  <td className="border px-4 py-2">{user.contact_no}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="flex items-center justify-center mt-3">
          <Pagination
            count={totalPages}
            page={currentPage}
            variant="outlined"
            onChange={handlePageChange}
            color="primary"
            className="mt-3"
          />

          </div>
        </div>
      )}
    </div>
  );
};

export default UserTable;
