import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {

    const [usuario, setUsuario] = useState(null);
    const [loading, setLoading] = useState(true);

    // recuperar sesión al cargar app
    useEffect(() => {

        const userGuardado =
            localStorage.getItem("usuario");

        if (userGuardado) {
            setUsuario(JSON.parse(userGuardado));
        }

        setLoading(false);

    }, []);

    // login
    const login = (userData) => {

        localStorage.setItem(
            "usuario",
            JSON.stringify(userData)
        );

        setUsuario(userData);
    };

    // logout
    const logout = () => {

        localStorage.removeItem("usuario");

        setUsuario(null);
    };

    return (
        <AuthContext.Provider
            value={{
                usuario,
                login,
                logout,
                loading
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

// hook personalizado
export function useAuth() {
    return useContext(AuthContext);
}