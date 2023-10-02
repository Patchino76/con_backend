import { useEffect, useRef, useState } from "react";

const ProductList = ({category} : {category: string}) => {
  const [products, setProducts] = useState<string[]>([]);

  useEffect(() => {
    console.log("fetching shits...", category);
    setProducts(['lajna', 'govna'])
  }, [category]);
  return <div>{category}</div>;
};

export default ProductList;
