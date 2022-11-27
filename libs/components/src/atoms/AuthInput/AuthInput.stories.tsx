import { ComponentStory, ComponentMeta } from '@storybook/react';
import { ThemeProvider } from 'styled-components';
import { action } from '@storybook/addon-actions';
import { defaultTheme } from '../../themes';
import { AuthInput as Component } from './AuthInput';

export default {
    component: Component,
    title: `Atoms/${Component.name}`,
    args: {
        placeholder: 'Type here',
        type: 'text',
        onKeyDown: e => action('onKeyDown')(e),
        onChange: e => action('onChange')(e),
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

export const AuthInput = Template.bind({});
