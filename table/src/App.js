import './App.css';
import UserTable from './UserTable';
import Form from './Form';
 
function App() {
  return (
    <div className="container mx-auto my-8">
      <h1 className="text-9xl font-extrabold mb-4 text-center">Modify , Add , Delete User</h1>
      <Form />
      <h1 className="text-9xl font-extrabold mb-4 text-center">React JS Pagination</h1>
      <UserTable />
    </div>
  );
}

export default App;
