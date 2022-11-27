import { ComponentStory, ComponentMeta } from '@storybook/react';
import { ThemeProvider } from 'styled-components';
import { defaultTheme } from '../../themes';
import { FormError as Component } from './FormError';

export default {
    component: Component,
    title: `Atoms/${Component.name}`,
    args: {
        errors: [
            'First error',
            'Second error',
        ],
    },
    argTypes: {
        className: {
            table: {
                disable: true,
            },
        },
    },
} as ComponentMeta<typeof Component>;


const Template: ComponentStory<typeof Component> = args => (
    <ThemeProvider theme={defaultTheme}>
        <Component {...args} />
    </ThemeProvider>
);

export const FormError = Template.bind({});
