import { useState } from 'react';
import { z } from 'zod';
import * as R from 'ramda';
import { useAsyncEffect } from './useAsyncEffect';

const generateObject = <T extends Record<string, 0>, Val>(fields: T, val: Val): {
    [Prop in keyof T]: Val
} => Object.keys(fields).reduce((acc, cur) => ({
        ...acc,
        [cur]: val,
    }), {} as {[Prop in keyof T]: Val});

export const useFormValidator = <T extends Record<string, 0>>(
    fields: T,
    validator: z.ZodType<{
        [Prop in keyof T]: string;
    }>,
) => {
    const [showErrors, setShowErrors] = useState(generateObject(fields, false));
    const [values, setValues] = useState(generateObject(fields, ''));
    const [errors, setErrors] = useState(generateObject(fields, [] as string[]));

    useAsyncEffect(async () => {
        const validation = await validator.safeParseAsync(values);
        if (validation.success) {
            setErrors(generateObject(fields, []));
            return;
        }
        // @ts-expect-error
        setErrors(R.map(err => err ?? [], validation.error.formErrors.fieldErrors));
    }, [values]);

    return {
        errors,
        values,
        showErrors,
        isEverythingValid: () => Object.values(errors).every(err => err.length === 0),
        showAllErrors: () => setShowErrors(generateObject(fields, true)),
        setValue: (field: keyof T, value: string) => {
            setShowErrors(values => ({
                ...values,
                [field]: true,
            }));
            setValues(values => ({
                ...values,
                [field]: value,
            }));
        },
    };
};
