import { MouseEvent } from 'react';

export type LinkTarget = {
    link: string;
    onClick?(e: MouseEvent<HTMLAnchorElement>): void;
}
