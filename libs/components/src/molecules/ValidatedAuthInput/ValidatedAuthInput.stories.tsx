import { ComponentMeta, ComponentStory } from '@storybook/react';
import * as React from 'react';
import styled, { ThemeProvider } from 'styled-components';
import { action } from '@storybook/addon-actions';
import { defaultTheme } from '../../themes';
import { Props, ValidatedAuthInput as Component } from './ValidatedAuthInput';

export default {
    component: Component,
    title: `Molecules/${Component.name}`,
    args: {
        inputProps: {
            placeholder: 'Type something ...',
            onChange: e => {
                action('onChange')(e);
            },
            onKeyDown: e => {
                action('onKeyDown')(e);
            },
        },
    },
    argTypes: {
        className: {
            table: {
                disable: true,
            },
        },
        onSubmit: {
            table: {
                disable: true,
            },
        },
    },
} as ComponentMeta<typeof Component>;

const Styled = styled(Component)`
  left: 300px;
`;

const Template: ComponentStory<typeof Component> = (args: Props) => (
    <ThemeProvider theme={defaultTheme}>
        <Styled {...args} />
    </ThemeProvider>
);

export const WithoutErrors = Template.bind({});

export const WithErrors = Template.bind({});
WithErrors.args = {
    errors: [
        'First error',
        'Second error',
    ],
};
