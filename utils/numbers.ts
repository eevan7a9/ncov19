export function formatNumberWithCommas(num?: number | string) {
    return num ? Number(num).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") : 0;
}