import styled from 'styled-components';
import { PropsWithChildren } from 'react';

export type Props = PropsWithChildren<{
    className?: string;
}>

export const Heading = styled.h1`
  color: ${props => props.theme.primaryColor};
  text-align: center;
  text-transform: uppercase;
  font-weight: 300;
  letter-spacing: 1px;
  font-size: 1.5em;
  margin-bottom: 1em;
  margin-top: 0;
`;

export function AuthHeading(props: Props) {
    const { children, ...args } = props;
    return (
        <Heading {...args}>
            {children}
        </Heading>
    );
}

export default AuthHeading;
