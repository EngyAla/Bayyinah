import { createContext, useContext, useEffect, useState } from "react";
// import { useLocation, useNavigate } from "react-router-dom";

const AuthContext = createContext(null);

export const ContextProvider = ({children})=>{
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true); // ✅ حالة التحميل

    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
        setUser(JSON.parse(storedUser));
        }
        // after get user from localstorage setloading false
        // but before this step the loadinf is true and require auth will show waiting message
        setLoading(false)
    }, []);

    const login = (user)=>{
        localStorage.setItem("user", JSON.stringify(user))
        setUser(user)
    }

    const logout = ()=>{
        localStorage.removeItem("user")
        setUser(null)
    }
    return(
        <AuthContext.Provider value={{user, login, logout, loading}}>
            {children}
        </AuthContext.Provider>
    )
}

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = ()=> useContext(AuthContext)