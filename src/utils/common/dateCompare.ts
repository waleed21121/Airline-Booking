export default function (firstDate: Date, secondDate: Date): boolean {
    const firstTime: number = firstDate.getTime();
    const seocndTime: number = secondDate.getTime();

    return firstTime < seocndTime;
}