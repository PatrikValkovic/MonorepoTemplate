import { DependencyList, useEffect } from 'react';

type Destructor = () => void;

export const useAsyncEffect = (callback: () => Promise<void> | Promise<Destructor>, deps: DependencyList) =>
    useEffect(() => {
        let isSubscribed = true;
        let destructor: Destructor | null = null;

        callback()
            .then(data => {
                destructor = data ?? null;
                if (!isSubscribed)
                    destructor?.();
            })
            .catch(console.log);

        return () => {
            isSubscribed = false;
            destructor?.();
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, deps);
