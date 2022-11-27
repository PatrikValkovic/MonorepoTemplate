import 'styled-components';

declare module 'styled-components' {
    export interface DefaultTheme {
        primaryColor: string;
        primaryFontColor: string;
        complementaryColor: string;
        complementaryFontColor: string;
        backgroundColor: string;
        blockBackgroundColor: string;
        detailColor: string;
        highlightDetailColor: string;
        infoColor: string;
        primaryDetailColor: string;
        transitionDuration: number;
        errorColor: string;
    }
}
