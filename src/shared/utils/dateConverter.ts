export const getRuFormat = (date: string): string => {
    const newDate = new Date(date);
    return newDate.toLocaleString('ru', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
    });
}

export const getRuDayFormat = (date: string): string => {
    const newDate = new Date(date);
    return newDate.toLocaleString('ru', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });
}