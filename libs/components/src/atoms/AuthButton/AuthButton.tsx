import styled, { css } from 'styled-components';
import { MouseEventHandler } from 'react';
import { LinkTarget } from '../../types';

export type Props = {
    className?: string;
    text: string;
} & (
    { type: 'link'; target: LinkTarget } |
    { type: 'submit'; onClick: MouseEventHandler<HTMLInputElement> }
);

const shared = css`
  background-color: ${props => props.theme.primaryColor};
  transition: background-color ${props => props.theme.transitionDuration}s ease;
  padding: ${10/16}em ${20/16}em;
  border-radius: 4px;
  color: ${props => props.theme.primaryFontColor};
  letter-spacing: 1px;
  display: inline-block;
  text-transform: uppercase;

  &:hover {
    background-color: ${props => props.theme.primaryDetailColor};
  }
`;

const Button = styled.input`
  border: none;
  cursor: pointer;
  font-size: 1em;
  ${shared}
`;

const Link = styled.a`
  text-decoration: none;
  ${shared}
`;


export function AuthButton(props: Props) {
    switch (props.type) {
    case 'link':
        return (
            <Link
                className={props.className}
                href={props.target.link}
                onClick={props.target.onClick}
            >{props.text}</Link>
        );
    case 'submit':
        return (
            <Button
                className={props.className}
                value={props.text}
                type="submit"
            />
        );
    default:
        // @ts-expect-error all the discrimination values should be already evaluated
        throw new Error(`Invalid auth button type ${props.type}`);
    }
}

export default AuthButton;
