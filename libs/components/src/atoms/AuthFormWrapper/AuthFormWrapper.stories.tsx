import { ComponentStory, ComponentMeta } from '@storybook/react';
import styled, { ThemeProvider } from 'styled-components';
import { Fragment } from 'react';
import { action } from '@storybook/addon-actions';
import { defaultTheme } from '../../themes';
import { AuthFormWrapper as Component } from './AuthFormWrapper';

const ReplaceElement = styled.div<{
  $color: string;
}>`
  height: 100px;
  background-color: ${props => props.$color};
`;

export default {
    component: Component,
    title: `Atoms/${Component.name}`,
    args: {
        buttons: (
            <Fragment>
                <ReplaceElement $color="red">
                Button1
                </ReplaceElement>
                <ReplaceElement $color="red">
                Button2
                </ReplaceElement>
            </Fragment>
        ),
        inputFields: (
            <ReplaceElement $color="aqua">
                Inputs
            </ReplaceElement>
        ),
        heading: 'Heading',
        label: 'Label',
        formSendHandler: e => action('fromSendHandler')(e),
    },
    argTypes: {
        className: {
            table: {
                disable: true,
            },
        },
        formSendHandler: {
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

export const Standard = Template.bind({});

export const WithErrors = Template.bind({});
WithErrors.args = {
    formErrors: [
        'First error',
        'Second error',
    ],
};
