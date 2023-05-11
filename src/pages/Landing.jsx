import {useState} from 'react';
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import {Button} from "@aws-amplify/ui-react";

function Landing() {
    const navigate = useNavigate();

    const [count, setCount] = useState(0);
    const [request, setRequest] = useState("/");

    return (
        <>
            <Button onClick={() => navigate("/dashboard")}>Dashboard</Button>
            <Button onClick={() => navigate("/login")}>Login</Button>


            <h1>yo fdp</h1>
            <div className="card">
                <Button onClick={() => setCount((count) => count + 1)}>
                    count is {count}
                </Button>
                <Button onClick={
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
                </Button>
            </div>
            <div>
                {request}
            </div>
        </>
    )
}

export default Landing;
