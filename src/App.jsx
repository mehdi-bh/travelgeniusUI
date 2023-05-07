import { useState } from 'react'
import axios from "axios";
import './App.css'
import './index.css'

function App() {
    const [count, setCount] = useState(0);
    const [request, setRequest] = useState("/");

  return (
    <>
      <h1>yo</h1>
      <div className="card">
        <button className={"bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"} onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <button className={"bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"} onClick={
            async () => {
                    try {
                        const response = await axios.get('https://tgy7h9fntd.execute-api.eu-west-3.amazonaws.com/dev/api/avatars');
                        setRequest(JSON.stringify(response.data))
                    } catch (error) {
                        console.log(error);
                    }
                }
            }
        >
            click to tick api
        </button>
      </div>
        <div>
            {request}
        </div>
    </>
  )
}

export default App
