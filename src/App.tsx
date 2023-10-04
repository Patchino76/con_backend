import { useEffect, useRef, useState } from "react";
import axios, { Axios, CanceledError } from "axios";

interface User {
  id: number;
  name: string;
}

function App() {
  const [users, setUsers] = useState<User[]>([]);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const controller = new AbortController();
    setIsLoading(true);
    axios
      .get("https://jsonplaceholder.typicode.com/users", {
        signal: controller.signal,
      })
      .then((res) => {
        setUsers(res.data);
        setIsLoading(false);
      })
      .catch((err) => {
        if (err instanceof CanceledError) return;
        setError(err.message);
        setIsLoading(false);
      });
    return () => controller.abort();
  }, []);

  const deleteUser = (user: User) => {
    const originalUsers = [...users];
    setUsers(users.filter((u) => u.id !== user.id));
    axios
      .delete(`https://jsonplaceholder.typicode.com/users/${user.id}`)
      .catch((err) => {
        setError(err.message);
        setUsers(originalUsers);
      });
  };

  const addUser = () => {
    const newUser = { id: 0, name: "Svetlio" };
    const originalUsers = [...users];
    setUsers([...users, newUser]);
    axios
      .post("https://jsonplaceholder.typicode.com/users", newUser)
      .then(({ data: savedUser }) => setUsers([...users, savedUser]))
      .catch((err) => {
        setError(err.message);
        setUsers([...originalUsers]);
      });
  };

  const updateUser = (user: User) => {
    const updatedUser = {...user, name: user.name + " !!!"};
    const originalUsers = [...users];
    setUsers(users.map((u) => u.id === user.id ? updatedUser : u));
    axios
      .put(`https://jsonplaceholder.typicode.com/users/${user.id}`, updatedUser)
      .catch((err) => {
        setError(err.message);
        setUsers(originalUsers);
      });

  }

  return (
    <>
      {isLoading && <div className="spinner-border busy-indicator"></div>}
      <button className="btn btn-primary mb-3" onClick={addUser}>
        Add
      </button>
      <ul className="list-group">
        {error && <p className="text-danger">{error}</p>}
        {users.map((user) => (
          <li
            className="list-group-item d-flex justify-content-between"
            key={user.id}
          >
            {user.name}{" "}
            <div>
              <button className="btn btn-outline-secondary mx-2" onClick={() => updateUser(user)}>Update</button>
              <button
                className="btn btn-outline-danger"
                onClick={() => deleteUser(user)}
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
}

export default App;
