export const formatKES = (amount: number) => {
  return new Intl.NumberFormat('en-KE', { style: 'currency', currency: 'KES', maximumFractionDigits: 0 }).format(amount);
};

export const formatStageLabel = (stage: string) => stage.replaceAll('_', ' ');

export const formatShortDate = (value: string) => {
  return new Date(value).toLocaleDateString(undefined, { month: 'short', day: 'numeric' });
};
