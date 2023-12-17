export const getRuFormat = (date: string): string => {
    const newDate = new Date(date);
    return newDate.toLocaleString('ru', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });
}