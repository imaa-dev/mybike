import React, { createContext, useReducer, useContext, Dispatch } from "react";

export interface State {
    user: null | { id: number; name: string; email: string };
    token: string | null;
    theme: "light" | "dark";
    loading: boolean;
}

const initialState: State = {
    user: null,
    token: null,
    theme: "light",
    loading: false,
}

export type Action =
    | { type: "SET_USER"; payload: {
        token: string | null;
        user: State["user"] } }
    | { type: "LOGOUT" }
    | { type: "TOGGLE_THEME" }
    | { type: "SET_LOADING"; payload: boolean };

function reducer(state: State, action: Action): State {
    switch (action.type) {
        case "SET_USER":
            return { ...state, user: action.payload.user, token: action.payload.token };
        case "LOGOUT":
            return { ...state, user: null, token: null };
        case "TOGGLE_THEME":
            return { ...state, theme: state.theme === "light" ? "dark" : "light" };
        case "SET_LOADING":
            return { ...state, loading: action.payload };
        default:
            return state;
    }
}

interface StoreContextProps {
    state: State;
    dispatch: Dispatch<Action>;
}

const StoreContext = createContext<StoreContextProps | undefined>(undefined);

export const StoreProvider: React.FC<{ children: React.ReactNode }> = ({
    children,
}) => {
    const [state, dispatch] = useReducer(reducer, initialState);
    return (
        <StoreContext.Provider value={{ state, dispatch  }} >
            {children}
        </StoreContext.Provider>
    );
}

export const useStore = () => {
    const context = useContext(StoreContext)
    if (!context) throw new Error("useStore debe usarse dentro de <StoreProvider>");
    return context;
}