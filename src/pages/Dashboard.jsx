import { useNavigate } from 'react-router-dom';
import { Button } from "@aws-amplify/ui-react";

function Dashboard() {
    const navigate = useNavigate();

    return (

        <>
            <div>
                <h1>Dashboard Page</h1>
                <Button onClick={() => navigate("/")}>Landing</Button>
                <Button onClick={() => navigate("/login")}>Login</Button>
            </div>
        </>

    );
}

export default Dashboard;
