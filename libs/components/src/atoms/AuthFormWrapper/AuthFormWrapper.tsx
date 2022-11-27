import styled from 'styled-components';
import { FormEventHandler, ReactElement } from 'react';
import { AuthHeading } from '../AuthHeading';
import { AuthLabel } from '../AuthLabel';
import { FormError } from '../FormError';

export type Props = {
    className?: string;
    buttons: ReactElement;
    inputFields: ReactElement;
    heading: string;
    label: string;
    formSendHandler: FormEventHandler;
    formErrors?: string[];
};

const FormContainer = styled.div`
  box-shadow: 0 50px 30px -30px rgba(0,0,0,0.3);
  margin-bottom: 50px;
  width: 100%;
  max-width: 600px;
  background-color: ${props => props.theme.backgroundColor};
  padding: 40px 100px;
  box-sizing: border-box;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  & > * {
    margin-left: 0.4em;
  }
  & > *:first-child {
    margin-left: 0;
  }
`;

export function AuthFormWrapper(props: Props) {
    return (
        <FormContainer className={props.className}>
            <AuthHeading>
                {props.heading}
            </AuthHeading>
            <AuthLabel>
                {props.label}
            </AuthLabel>

            <form onSubmit={props.formSendHandler}>
                <FormError errors={props.formErrors ?? []} />
                {props.inputFields}
                <ButtonContainer>
                    {props.buttons}
                </ButtonContainer>
            </form>
        </FormContainer>
    );
}

export default AuthFormWrapper;
