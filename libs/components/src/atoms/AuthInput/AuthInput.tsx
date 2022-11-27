import styled from 'styled-components';
import { HTMLInputTypeAttribute, KeyboardEventHandler, useState } from 'react';

export type Props = {
    className?: string;
    placeholder: string;
    type?: HTMLInputTypeAttribute;
    onKeyDown?: KeyboardEventHandler<HTMLInputElement>;
    onChange?(content: string): void;
    value?: string;
};

export const Input = styled.input`
  box-sizing: border-box;
  padding: 0.6em 1.25em;
  border: 1px solid ${props => props.theme.infoColor};
  border-radius: 4px;
  display: block;
  width: 100%;
  margin-bottom: 1.25em;
  outline: none;
  font-size: 1em;
  
  &:focus {
    border: 1px solid ${props => props.theme.primaryColor};
  }
`;

export function AuthInput(props: Props) {
    const [content, setContent] = useState('');

    return (
        <Input
            className={props.className}
            value={props.value ?? content}
            placeholder={props.placeholder}
            type={props.type || 'text'}
            onKeyDown={props.onKeyDown}
            onChange={e => {
                setContent(e.target.value);
                props.onChange?.(e.target.value);
            }}
        />
    );
}

export default AuthInput;
