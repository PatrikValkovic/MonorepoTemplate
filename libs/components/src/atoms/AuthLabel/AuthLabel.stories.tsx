import { ComponentStory, ComponentMeta } from '@storybook/react';
import { ThemeProvider } from 'styled-components';
import { defaultTheme } from '../../themes';
import { AuthLabel as Component } from './AuthLabel';

export default {
    component: Component,
    title: `Atoms/${Component.name}`,
    args: {
        children: 'Hello here',
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

export const AuthLabel = Template.bind({});
