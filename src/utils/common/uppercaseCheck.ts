export default function (value: string): boolean {
    let ok: boolean = true;
    for (let index = 0; index < value.length; index++) {
        if (value[index] < 'A' || value[index] > 'Z') {
            ok = false;
        }
    }
    return ok;
}