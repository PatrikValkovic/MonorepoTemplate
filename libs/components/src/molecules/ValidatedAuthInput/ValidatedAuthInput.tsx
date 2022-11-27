import styled from 'styled-components';
import { AuthInput, FormError } from '../../atoms';
import { Props as AuthInputProps } from '../../atoms/AuthInput/AuthInput';

export type Props = {
    className?: string;
    errors: string[];
    inputProps: AuthInputProps;
}

const Container = styled.div`
  margin-bottom: 1.25em;
  & > input {
    margin: 0;
  }
  & > ul {
    margin-top: 0.4em;
  }
`;

export function ValidatedAuthInput(props: Props) {
    return (
        <Container>
            <AuthInput {...props.inputProps} />
            {props.errors && <FormError errors={props.errors} />}
        </Container>
    );
}
