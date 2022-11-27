import styled from 'styled-components';

export type Props = {
    className?: string;
    errors: string[];
};

export const ErrorWrapper = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0.5em 0 0 0;
  color: ${props => props.theme.errorColor};
`;

export function FormError(props: Props) {
    return (
        <ErrorWrapper className={props.className}>
            {props.errors.map(error => (
                <li key={error}>{String.fromCharCode(10037)} {error}</li>
            ))}
        </ErrorWrapper>
    );
}

export default FormError;
