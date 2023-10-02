import { useEffect, useRef, useState } from "react";

const connect = () => {
  console.log("connect");
};
const disconnect = () => {
  console.log("disconnect");
};

function App() {
  useEffect(() => {
    connect();

    return () => {
      disconnect();
    };
  });

  return <></>;
}

export default App;
