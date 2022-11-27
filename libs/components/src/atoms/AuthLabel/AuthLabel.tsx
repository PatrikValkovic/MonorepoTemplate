import styled from 'styled-components';
import { PropsWithChildren } from 'react';

export type Props = PropsWithChildren<{
    className?: string;
}>

export const Text = styled.p`
  color: ${props => props.theme.infoColor};
  text-align: center;
  margin-bottom: 1.5em;
  margin-top: 0;
`;

export function AuthLabel(props: Props) {
    const { children, ...args } = props;
    return (
        <Text {...args}>
            {children}
        </Text>
    );
}

export default AuthLabel;
