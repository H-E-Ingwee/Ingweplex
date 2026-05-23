export const formatKES = (amount: number) => {
  return new Intl.NumberFormat('en-KE', { style: 'currency', currency: 'KES', maximumFractionDigits: 0 }).format(amount);
};

export const formatStageLabel = (stage: string) => stage.replaceAll('_', ' ');

export const formatShortDate = (value: string) => {
  return new Date(value).toLocaleDateString(undefined, { month: 'short', day: 'numeric' });
};

export const formatPercent = (value: number) => `${Math.round(value * 100)}%`;

export const formatDateLabel = (value: string) => {
  return new Date(value).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' });
};

export const getRelativeRisk = (dueDate: string, progress: number) => {
  const today = new Date();
  const target = new Date(dueDate);
  if (progress >= 100) {
    return 'Completed';
  }

  if (target < today) {
    return 'At risk';
  }

  const diff = Math.ceil((target.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
  return `${diff} days remaining`;
};

export const loadLocalData = <T>(key: string, fallback: T): T => {
  if (typeof window === 'undefined') {
    return fallback;
  }

  try {
    const raw = window.localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
};

export const saveLocalData = <T>(key: string, value: T) => {
  if (typeof window === 'undefined') {
    return;
  }

  window.localStorage.setItem(key, JSON.stringify(value));
};
