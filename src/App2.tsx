import { useEffect, useRef, useState } from "react";
import ProductList from "./components/ProductList";

function App() {
  const ref = useRef<HTMLInputElement>(null);
  if (ref.current) ref.current.focus();

  const [category, setCategory] = useState("");

  return (
    <>
      <input ref={ref} type="text" className="form-control" />
      <div className="mb-3">
        <select
          name=""
          id=""
          className="form-select"
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value=""></option>
          <option value="lajna">lajna</option>
          <option value="govna">govna</option>
        </select>
        <ProductList category={category}></ProductList>
      </div>
    </>
  );
}

export default App;
