// plans.ts
export const PLANS = [
  {
    id: 'flex-monthly',
    name: 'Flex Monthly',
    price: 60000,
    daysAllocated: 20,
    validityDays: 40, // Valid for 40 days from first use
  },
  {
    id: 'flex-weekly',
    name: 'Flex Weekly',
    price: 17500,
    daysAllocated: 5,
    validityDays: 10, // Valid for 10 days from first use
  },
  {
    id: 'daily',
    name: 'Daily Plan',
    price: 4000,
    daysAllocated: 1,
    validityDays: 1, // Valid for 1 day
  },
];
