import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { AppStateType } from "../redux/redux-store";

export function withAuthRedirect<WCP extends { isAuth?: boolean }>(WrappedComponent: React.ComponentType<WCP>) {
    const WithAuthRedirect: React.FC<WCP> = (props) => {
        const isAuth = useSelector((state: AppStateType) => state.auth.isAuth);
        const navigate = useNavigate() as (path: string) => void;;

        useEffect(() => {
            if (!isAuth) {
                navigate("/login");
            }
        }, [isAuth, navigate]);

        return isAuth ? <WrappedComponent {...props} /> : null as React.ReactElement | null;
    };

    return WithAuthRedirect;
};