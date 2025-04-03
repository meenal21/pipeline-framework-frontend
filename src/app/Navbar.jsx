import  { Outlet, Link } from 'react-router-dom';

const Nav = () => {
    return (
        <div>
            <nav className="bg-blue-600 text-white p-4 flex justify-between">
                <h1 className="text-xl font-bold">MyApp</h1>
                <div>
                    <Link to="/login" className="px-3">Login</Link>
                    <Link to="/signup" className="px-3">Signup</Link>
                </div>
            </nav>
            <Outlet />
        </div>
    );
};

export default Nav;