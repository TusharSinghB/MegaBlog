import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import authService from "./Appwrite/auth";
import { login, logout } from "./store/authSlice";
import { Header, Footer } from "./components/index";
import { Outlet } from "react-router-dom";

function App() {
    const [loading, setLoading] = useState(true);
    const dispatch = useDispatch();

    useEffect(() => {
        authService
            .getCurrentUser()
            .then((userData) => {
                if (userData) {
                    dispatch(login({ userData }));
                } else {
                    dispatch(logout());
                }
            })
            .finally(() => {
                setLoading(false);
            });
    }, []);

    if (!loading) {
        return (
            <div>
                Test
                <Header />
                <main>
                    <Outlet />
                </main>
                <Footer />
            </div>
        );
    } else {
        return <div>Loading</div>;
    }
    // return !loading ? (
    //   <div>
    //     Test
    //     <Header />
    //     <main></main>
    //     <Footer />
    //   </div>
    // ) : null;
}

export default App;
