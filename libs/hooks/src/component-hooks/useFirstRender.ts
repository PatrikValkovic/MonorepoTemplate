import { useEffect, useState } from 'react';


export const useFirstRender = () => {
    // TODO this will rerender after first render,
    // use ref instead
    // https://usehooks-ts.com/react-hook/use-is-first-render
    const [isFirstRender, setFirstRender] = useState(true);

    useEffect(() => {
        setFirstRender(false);
    }, []);

    return isFirstRender;
};
