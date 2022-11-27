import { FormEvent, Fragment } from 'react';
import { z } from 'zod';
import { LinkTarget } from '../../types';
import { AuthButton, AuthFormWrapper } from '../../atoms';
import { ValidatedAuthInput } from '../../molecules';
import { useFormValidator } from '@agora/hooks';

export type Props = {
    className?: string;
    backTarget: LinkTarget;
    onRegister(username: string, email: string, password: string): void;
    formErrors?: string[];
}

export function RegistrationForm(props: Props) {
    const validation = z.object({
        username: z.string(),
        email: z.string().email(),
        password: z.string().min(8),
        passwordRepeat: z.string(),
    }).refine(
        val => val.password === val.passwordRepeat,
        { message: 'Password not match', path: ['passwordRepeat'] },
    );
    const {
        values,
        errors,
        showErrors,
        showAllErrors,
        setValue,
        isEverythingValid,
    } = useFormValidator({
        username: 0,
        email: 0,
        password: 0,
        passwordRepeat: 0,
    }, validation);

    const formSendHandler = async (e: FormEvent) => {
        e.preventDefault();
        if (!isEverythingValid()) {
            showAllErrors();
            return;
        }
        props.onRegister(values.username, values.email, values.password);
    };

    const buttons = (
        <Fragment>
            <AuthButton
                text="Register"
                type="submit"
                onClick={() => { /* ignore */ }}
            />
            <AuthButton
                text={'Back'}
                type={'link'}
                target={props.backTarget}
            />
        </Fragment>
    );

    const inputFields = (
        <Fragment>
            <ValidatedAuthInput
                errors={showErrors.username ? errors.username : []}
                inputProps={{
                    placeholder: 'Username',
                    type: 'text',
                    value: values.username,
                    onChange: value => setValue('username', value),
                }}
            />
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
            <ValidatedAuthInput
                errors={showErrors.passwordRepeat ? errors.passwordRepeat : []}
                inputProps={{
                    placeholder: 'Repeat password',
                    type: 'password',
                    value: values.passwordRepeat,
                    onChange: value => setValue('passwordRepeat', value),
                }}
            />
        </Fragment>
    );

    return (
        <AuthFormWrapper
            className={props.className}
            buttons={buttons}
            inputFields={inputFields}
            heading="Register"
            label="Create new account"
            formSendHandler={formSendHandler}
            formErrors={props.formErrors}
        />
    );
}
