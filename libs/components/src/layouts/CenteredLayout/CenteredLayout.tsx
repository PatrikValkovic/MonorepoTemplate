import styled from 'styled-components';
import { PropsWithChildren } from 'react';

export type Props = PropsWithChildren<{
    className?: string;
    backgroundColor?: string;
}>

const CenteredLayoutWrapper = styled.div<{
    $backgroundColor?: string;
}>`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${props => props.$backgroundColor};
`;

export function CenteredLayout(props: Props) {
    return (
        <CenteredLayoutWrapper className={props.className} $backgroundColor={props.backgroundColor}>
            <div>
                {props.children}
            </div>
        </CenteredLayoutWrapper>
    );
}
