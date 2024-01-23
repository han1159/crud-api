import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UserForm = ({ onSubmit, userToUpdate }) => {
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [sex, setSex] = useState('');
  const [contactNo, setContactNo] = useState('');

  useEffect(() => {
    if (userToUpdate) {
      setName(userToUpdate.name || '');
      setAge(userToUpdate.age || '');
      setSex(userToUpdate.sex || '');
      setContactNo(userToUpdate.contactNo || '');
    }
  }, [userToUpdate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ name, age, sex, contactNo });
    setName('');
    setAge('');
    setSex('');
    setContactNo('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Name:
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
      </label>
      <label>
        Age:
        <input type="text" value={age} onChange={(e) => setAge(e.target.value)} />
      </label>
      <label>
        Sex:
        <input type="text" value={sex} onChange={(e) => setSex(e.target.value)} />
      </label>
      <label>
        Contact No:
        <input type="text" value={contactNo} onChange={(e) => setContactNo(e.target.value)} />
      </label>
      <button type="submit">{userToUpdate ? 'Update' : 'Add'}</button>
    </form>
  );
};

const UserList = ({ users, onDelete }) => {
  return (
    <div>
      <h2>Delete User</h2>
      <select onChange={(e) => onDelete(e.target.value)}>
        <option key="" value="">
          Select user to delete
        </option>
        {users.map((user) => (
          <option key={user._id} value={user._id}>
            {user.name}
          </option>
        ))}
      </select>
    </div>
  );
};

const UserUpdate = ({ users, onUpdate, userToUpdate }) => {
  const handleUpdate = (userId) => {
    const updatedUser = users.find((user) => user._id === userId);
    onUpdate(updatedUser);
  };

  return (
    <div>
      <h2>Update User</h2>
      <select onChange={(e) => handleUpdate(e.target.value)}>
        <option value="">Select user to update</option>
        {users.map((user) => (
          <option key={user._id} value={user._id}>
            {user.name}
          </option>
        ))}
      </select>
      {userToUpdate && <UserForm onSubmit={onUpdate} userToUpdate={userToUpdate} />}
    </div>
  );
};

const Form = () => {
  const [users, setUsers] = useState([]);
  const [userToUpdate, setUserToUpdate] = useState(null);
  const [action, setAction] = useState('add'); // 'add', 'update', 'delete'

  useEffect(() => {
    // Fetch initial user data
    axios.get('http://localhost:3000/user')
      .then((response) => setUsers(response.data))
      .catch((error) => console.error('Error fetching users:', error));
  }, []);

  const handleCreateUser = (newUser) => {
    // Create a new user
    axios.post('http://localhost:3000/user', newUser)
      .then((response) => {console.log('User created successfully:', response.data);
      setUsers([...users, response.data]);})
      .catch((error) => console.error('Error creating user:', error));
  };

  const handleDeleteUser = (userId) => {
    // Delete a user
    axios.delete(`http://localhost:3000/user/${userId}`)
      .then(() => setUsers(users.filter((user) => user._id !== userId)))
      .catch((error) => console.error('Error deleting user:', error));
  };

  const handleUpdateUser = (updatedUser) => {
    // Update a user
    axios.put(`http://localhost:3000/user/${updatedUser._id}`, updatedUser)
      .then(() => setUsers(users.map((user) => (user._id === updatedUser._id ? updatedUser : user))))
      .catch((error) => console.error('Error updating user:', error));
  };

  const handleActionChange = (selectedAction) => {
    setUserToUpdate(null);
    setAction(selectedAction);
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
    {/* Centered container */}
    <div className="max-w-md w-full bg-white p-8 border rounded shadow-lg">
      <h1 className="text-2xl font-bold mb-4">Users</h1>

      <select
        className="mb-4 p-2 border rounded w-full"
        onChange={(e) => handleActionChange(e.target.value)}
      >
        <option value="add">Add User</option>
        <option value="update">Update User</option>
        <option value="delete">Delete User</option>
      </select>

      {action === 'add' && <UserForm onSubmit={handleCreateUser} />}
      {action === 'delete' && <UserList users={users} onDelete={handleDeleteUser} />}
      {action === 'update' && <UserUpdate users={users} onUpdate={handleUpdateUser} userToUpdate={userToUpdate} />}
    </div>
  </div>
  );
};

export default Form;
