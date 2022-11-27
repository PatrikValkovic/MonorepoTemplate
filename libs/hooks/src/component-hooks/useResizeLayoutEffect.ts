import { DependencyList, useCallback, useEffect } from 'react';

export const useResizeLayoutEffect = (resizeCallback: () => void, deps: DependencyList = []) => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const callback = useCallback(resizeCallback, deps);
    useEffect(() => {
        window.addEventListener('resize', callback);
        callback();
        return () => {
            window.removeEventListener('resize', callback);
        };
    }, [callback]);
};
