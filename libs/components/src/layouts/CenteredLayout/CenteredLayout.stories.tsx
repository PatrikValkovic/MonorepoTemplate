import { ComponentMeta, ComponentStory } from '@storybook/react';
import * as React from 'react';
import styled, { ThemeProvider } from 'styled-components';
import { defaultTheme } from '../../themes';
import { Props, CenteredLayout as Component } from './CenteredLayout';

const def = {
    component: Component,
    title: `Layouts/${Component.name}`,
    args: {
        $width: '500px',
        $height: '400px',
    },
    argTypes: {
        className: {
            table: {
                disable: true,
            },
        },
    },
} as ComponentMeta<typeof Component>;
export default def;

type ChildProps = {
    $width: number;
    $height: number;
};

const Child = styled.div<ChildProps>`
  width: ${props => props.$width};
  height: ${props => props.$height};
  background-color: aqua;
`;

const ComponentWithChild = (props: Props & ChildProps) => {
    const { $width, $height, children: _, ...rest } = props;
    return (
        <Component {...rest}>
            <Child $width={$width} $height={$height} />
        </Component>
    );
};

const Template: ComponentStory<typeof ComponentWithChild> = args => (
    <ThemeProvider theme={defaultTheme}>
        <ComponentWithChild {...args} />
    </ThemeProvider>
);

export const CenteredLayout = Template.bind({});
