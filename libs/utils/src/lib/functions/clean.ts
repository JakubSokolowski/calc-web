
export function clean(obj: Record<string, any>): Record<string, any> {
    return Object.entries(obj).reduce((a, [k, v]) => (v == null ? a : (a[k] = v, a)), {});
}
