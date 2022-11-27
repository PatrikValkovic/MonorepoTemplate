import { useNavigate } from 'react-router-dom';
import { useMemo, MouseEvent } from 'react';

export const useLinkTarget = (target: string) => {
    const navigate = useNavigate();

    return useMemo(() => ({
        link: target,
        onClick: (e: MouseEvent<HTMLAnchorElement>) => {
            e.preventDefault();
            navigate(target);
        },
    }), [navigate, target]);
};
