import { ComponentMeta, ComponentStory } from '@storybook/react';
import * as React from 'react';
import styled, { ThemeProvider } from 'styled-components';
import { action } from '@storybook/addon-actions';
import { defaultTheme } from '../../themes';
import { Props, RegistrationForm as Component } from './RegistrationForm';

export default {
    component: Component,
    title: `Organisms/${Component.name}`,
    args: {
        backTarget: {
            link: '#',
            onClick: e => {
                e.preventDefault();
                action('BackClick')(e);
            },
        },
        onRegister: (...args) => {
            action('onRegister')(args);
        },
        formErrors: [],
    },
    argTypes: {
        className: {
            table: {
                disable: true,
            },
        },
        onRegister: {
            table: {
                disable: true,
            },
        },
    },
    parameters: {
        backgrounds: {
            default: 'primary',
            values: [
                { name: 'primary', value: defaultTheme.primaryColor },
            ],
        },
    },
} as ComponentMeta<typeof Component>;

const Styled = styled(Component)`
  position: relative;
  left: 200px;
`;

const Template: ComponentStory<typeof Component> = (args: Props) => (
    <ThemeProvider theme={defaultTheme}>
        <Styled {...args} />
    </ThemeProvider>
);

export const RegistrationForm = Template.bind({});
