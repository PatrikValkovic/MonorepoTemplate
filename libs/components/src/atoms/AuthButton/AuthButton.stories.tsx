import { ComponentStory, ComponentMeta } from '@storybook/react';
import { ThemeProvider } from 'styled-components';
import { action } from '@storybook/addon-actions';
import { defaultTheme } from '../../themes';
import { AuthButton as Component } from './AuthButton';

export default {
    component: Component,
    title: `Atoms/${Component.name}`,
    args: {
        text: 'Click here',
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

export const Submit = Template.bind({});
Submit.args = {
    type: 'submit',
    onClick: e => {
        e.preventDefault();
        action('onClick')(e);
    },
};

export const Link = Template.bind({});
Link.args = {
    type: 'link',
    target: {
        link: '#',
        onClick: e => {
            e.preventDefault();
            action('onClick')(e);
        },
    },
};
