import { FormEvent, Fragment } from 'react';
import { z } from 'zod';
import { LinkTarget } from '../../types';
import { AuthButton, AuthFormWrapper } from '../../atoms';
import { ValidatedAuthInput } from '../../molecules';
import { useFormValidator } from '@agora/hooks';

export type Props = {
    className?: string;
    registerTarget: LinkTarget;
    onLogin(email: string, password: string): void;
    formErrors?: string[];
}


export function LoginForm(props: Props) {
    const {
        values,
        errors,
        showErrors,
        showAllErrors,
        setValue,
        isEverythingValid,
    } = useFormValidator({
        email: 0,
        password: 0,
    }, z.object({
        email: z.string().email(),
        password: z.string().min(8),
    }));

    const formSendHandler = (e: FormEvent) => {
        e.preventDefault();
        if (!isEverythingValid()) {
            showAllErrors();
            return;
        }
        props.onLogin(values.email, values.password);
    };

    const buttons = (
        <Fragment>
            <AuthButton
                text="log in"
                type="submit"
                onClick={() => { /* ignore */ }}
            />
            <AuthButton
                text={'Create an account'}
                type={'link'}
                target={props.registerTarget}
            />
        </Fragment>
    );

    const inputFields = (
        <Fragment>
            <ValidatedAuthInput
                errors={showErrors.email ? errors.email : []}
                inputProps={{
                    placeholder: 'Email',
                    type: 'email',
                    value: values.email,
                    onChange: value => setValue('email', value),
                }}
            />
            <ValidatedAuthInput
                errors={showErrors.password ? errors.password : []}
                inputProps={{
                    placeholder: 'Password',
                    type: 'password',
                    value: values.password,
                    onChange: value => setValue('password', value),
                }}
            />
        </Fragment>
    );

    return (
        <AuthFormWrapper
            className={props.className}
            buttons={buttons}
            inputFields={inputFields}
            heading="Log in"
            label="Fill in your account info"
            formSendHandler={formSendHandler}
            formErrors={props.formErrors}
        />
    );
}
