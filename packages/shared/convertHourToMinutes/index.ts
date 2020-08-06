export function convertHourToMinutes(time: string){
    const [hour, minutes] = time.split(":").map(Number);
    const timeInMinutes = (hour * 60) + minutes;
    return timeInMinutes;
}

export function convertMinutesToHour(timeInMinutes: number){
    let hour = timeInMinutes / 60;
    let minutes = timeInMinutes % 60;

    let minutesString = ('00'+minutes.toString()).slice(-2)

    const time = [hour, minutesString].join(":");
    return time;
}