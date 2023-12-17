export enum PremiumPeriods {
    Week = 1,
    Month = 2,
    ThreeMonth = 3,
    HalfYear = 4,
    Year = 5
}

export const premiumPeriodsList = [
    {
        name: 'Неделя',
        value: PremiumPeriods.Week,
    },
    {
        name: 'Месяц',
        value: PremiumPeriods.Month,
    },
    {
        name: '3 Месяца',
        value: PremiumPeriods.ThreeMonth,
    },
    {
        name: 'Полгода',
        value: PremiumPeriods.HalfYear,
    },
    {
        name: '1 Год',
        value: PremiumPeriods.Year,
    },
];
