export const vAutoFontsize = {
    // 容器宽度固定,根据容器宽度自动缩小字体
    created(el: HTMLElement) {
        el.style.whiteSpace = 'nowrap';
    },
    mounted(el: HTMLElement) {
        const width = getComputedStyle(el).width;
        const scaleRate = parseInt(width) / el.scrollWidth;
        el.style.transform = `scale(${ scaleRate })`;
    }
}