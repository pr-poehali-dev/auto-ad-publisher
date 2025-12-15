export const getYears = (): number[] => {
  const currentYear = new Date().getFullYear();
  const years: number[] = [];
  for (let year = currentYear; year >= 1950; year--) {
    years.push(year);
  }
  return years;
};

export const mileageRanges = [
  { label: 'До 10 000 км', min: 0, max: 10000 },
  { label: '10 000 - 30 000 км', min: 10000, max: 30000 },
  { label: '30 000 - 50 000 км', min: 30000, max: 50000 },
  { label: '50 000 - 70 000 км', min: 50000, max: 70000 },
  { label: '70 000 - 100 000 км', min: 70000, max: 100000 },
  { label: '100 000 - 150 000 км', min: 100000, max: 150000 },
  { label: '150 000 - 200 000 км', min: 150000, max: 200000 },
  { label: '200 000 - 300 000 км', min: 200000, max: 300000 },
  { label: 'Более 300 000 км', min: 300000, max: 999999 }
];

export const priceRanges = [
  { label: 'До 300 000 ₽', min: 0, max: 300000 },
  { label: '300 000 - 500 000 ₽', min: 300000, max: 500000 },
  { label: '500 000 - 700 000 ₽', min: 500000, max: 700000 },
  { label: '700 000 - 1 000 000 ₽', min: 700000, max: 1000000 },
  { label: '1 000 000 - 1 500 000 ₽', min: 1000000, max: 1500000 },
  { label: '1 500 000 - 2 000 000 ₽', min: 1500000, max: 2000000 },
  { label: '2 000 000 - 3 000 000 ₽', min: 2000000, max: 3000000 },
  { label: '3 000 000 - 5 000 000 ₽', min: 3000000, max: 5000000 },
  { label: '5 000 000 - 10 000 000 ₽', min: 5000000, max: 10000000 },
  { label: 'Более 10 000 000 ₽', min: 10000000, max: 999999999 }
];

export const formatMileage = (mileage: string): string => {
  const num = parseInt(mileage);
  if (isNaN(num)) return mileage;
  return num.toLocaleString('ru-RU');
};

export const formatPrice = (price: string): string => {
  const num = parseInt(price);
  if (isNaN(num)) return price;
  return num.toLocaleString('ru-RU');
};