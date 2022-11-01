import { use } from "react";

const res = fetch("/data.json").then((res) => res.json());

function App() {
  const data = use(res);
  return <div className="App">{JSON.stringify(data)}</div>;
}

export default App;
