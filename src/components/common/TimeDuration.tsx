
// TODO move to right place
const convertDuration = (value: number): string => {
    const hours = value / 60,
        rhours = Math.floor(hours),
        minutes = (hours - rhours)*60,
        rminutes = Math.round(minutes);

    let text = '';
    if (rhours > 0) text += `${rhours} h `;
    if (rminutes > 0) text += `${rminutes} min`;

    return text;
};

interface TimeDurationProps {
    duration: number
}

const TimeDuration = ({ duration }: TimeDurationProps) => {
    return (
        <span className="text-sm font-thin">
            {convertDuration(duration)}
        </span>
    );
};

export default TimeDuration;