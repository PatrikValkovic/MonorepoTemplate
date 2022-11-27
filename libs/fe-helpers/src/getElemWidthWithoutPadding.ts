export const getElemWidthWithoutPadding = (element: HTMLElement) => {
    const containerComputedStyle = getComputedStyle(element);
    return element.clientWidth - parseFloat(containerComputedStyle.paddingLeft) - parseFloat(containerComputedStyle.paddingRight);
};
