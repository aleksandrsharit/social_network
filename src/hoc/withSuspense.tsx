import React, { Suspense } from "react";
import Preloader from "../components/common/Preloader/Preloader";

interface WithSuspenseProps {
    props: any
}

export const withSuspense = <WCP extends WithSuspenseProps>(
    Component: React.ComponentType<WCP>
) => {
    const WithSuspense: React.FC<WCP> = (props) => {
        return (
            <Suspense fallback={<Preloader />}>
                <Component {...props} />
            </Suspense>
        );
    };

    return WithSuspense;
};