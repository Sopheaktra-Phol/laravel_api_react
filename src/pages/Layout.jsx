import { useContext } from 'react';
import logo from '../assets/logo-no-bg.png';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { AppContext } from '../Context/AppContext';
export default function Layout(){

    const {user, token, setUser, setToken} = useContext(AppContext);
    const navigate = useNavigate();
    //call api
    async function handleLogout(e) {
        e.preventDefault()

        const res = await fetch('/api/logout', {
            method: 'post',
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }) ;

        const data = await res.json();
        console.log(data);

        if (res.ok) {
            setUser(null);
            setToken(null);
            localStorage.removeItem('token');
        }

    }
    return (
        <div className="site-background">
            <header>
                <nav>
                <Link to='/' className='nav-link'>
                     <img src={logo} alt="Logo" className="h-20 w-auto" />
                        </Link>
                 {/* display username as they login */}
                    {user ? (<div className='flex items-center space-x-4'>
                        <p className='text-slate-400 text-s'>Welcome back {user.name}</p>
                        <Link to='/create' className='nav-link'>Publish Your Recipe</Link>
                        <form onSubmit={handleLogout}>
                        <button className='nav-link'>Logout</button>
                        </form>
                        </div> 
                    ) : (
                        <div className='space-x-4'>
                    <Link to='/register' className='nav-link'>Register</Link>
                    <Link to='/login' className='nav-link'>Login</Link>
                    </div>
                    )}
                    
                </nav>
            </header>

            <main>
                <Outlet/>
            </main>
        </div>
    )
}