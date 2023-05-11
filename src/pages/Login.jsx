import { useNavigate } from 'react-router-dom';
import {Button} from "@aws-amplify/ui-react";

function Login() {
    const navigate = useNavigate();

    return (
        <div>
            <h1>Login Page</h1>
            <Button onClick={() => navigate("/")}>Landing</Button>
            <Button onClick={() => navigate("/dashboard")}>Dashboard</Button>
        </div>
    );
}

export default Login;
