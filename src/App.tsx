import { useEffect, useState } from "react";
import {CanceledError} from "./services/api-client";
import userService,  { User } from "./services/user-service";


// const endpoint = "https://jsonplaceholder.typicode.com";

function App() {
  const [users, setUsers] = useState<User[]>([]);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    const {request, cancel} = userService.getAll<User>();
      request.then((res) => {
        setUsers(res.data);
        setIsLoading(false);
      })
      .catch((err) => {
        if (err instanceof CanceledError) return;
        setError(err.message);
        setIsLoading(false);
      });
    return () => cancel();
  }, []);


  const deleteUser = (user: User) =>{
    const originalUsers = [...users];
    setUsers(users.filter((u) => u.id !== user.id));
    const request = userService.delete(user.id);
    request.catch((err) => {
      setError(err.message);
      setUsers(originalUsers);
    })
  }

  const addUser = () => {
    const newUser = { id: 0, name: "Svetlio" };
    const originalUsers = [...users];
    setUsers([...users, newUser]);
    const request = userService.create(newUser);
    request.then(({ data: savedUser }) => setUsers([...users, savedUser]))
    .catch((err) => {
      setError(err.message);
      setUsers([...originalUsers]);
    });
  };

  const updateUser = (user: User) => {
    const updatedUser = {...user, name: user.name + " !!!"};
    const originalUsers = [...users];
    setUsers(users.map((u) => u.id === user.id ? updatedUser : u));
      const request = userService.update(updatedUser);
      request.catch((err) => {
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
