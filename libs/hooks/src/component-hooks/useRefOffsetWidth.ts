import { useCallback, useLayoutEffect, useRef, useState } from 'react';

export const useRefOffsetWidth = <T extends HTMLElement>(): [
    React.MutableRefObject<T|null>,
    number,
    () => void,
] => {
    // TODO ref shouldn't be depedency
    // https://epicreact.dev/why-you-shouldnt-put-refs-in-a-dependency-array/
    const ref = useRef<T | null>(null);
    const [width, setWidth] = useState(-1);

    const recalculate = useCallback(() => {
        if (!ref.current)
            return;
        setWidth(ref.current.offsetWidth);
    }, [ref]);

    useLayoutEffect(() => {
        recalculate();
    }, [recalculate]);

    return [ref, width, recalculate];
};
