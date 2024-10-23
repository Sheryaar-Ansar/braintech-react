import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { LoginPage } from "../redux/features/loginSlices";
import { useNavigate } from "react-router-dom";
// import { login } from "./authSlice";

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const mode = useSelector((state)=>state.mode.mode)
    const dispatch = useDispatch();
    const { error } = useSelector((state) => state.login);
    const { isAuthenticated } = useSelector((state)=>state.login)
    const navigate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(LoginPage({ username, password }));
        if(isAuthenticated){
            navigate('/dashboard')
        }
    };

    return (
        <div className={`mt-[70px] pt-[200px] pb-[300px] ${mode ? 'bg-gray-900' : 'bg-gray-200'}`}>
            <div className="w-[300px] md:w-[600px] border mx-auto px-9 py-32">
                <h2 className="text-2xl font-bold uppercase text-center">Login</h2>
                <form onSubmit={handleSubmit} className="mt-3 space-y-3">
                    <div>
                        <label className="block text-sm">Username</label>
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className={`w-full px-3 py-2 border rounded-md ${mode && 'bg-gray-800'}`}
                            placeholder="Username"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm">Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className={`w-full px-3 py-2 border rounded-md ${mode && 'bg-gray-800'}`}
                            placeholder="Password"
                            required
                        />
                    </div>
                    {error && <p className="text-red-600">{error}</p>}
                    <button
                        type="submit"
                        className="w-full px-3 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700"
                    >
                        Login
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Login;