const formatCurrency = (
  value: number,
  options?: {
    currency?: string;
    includeSign?: boolean;
    minimumFractionDigits?: number;
    maximumFractionDigits?: number;
  }
) => {
  const {
    currency = "USD",
    includeSign = false,
    minimumFractionDigits,
    maximumFractionDigits,
  } = options ?? {};

  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
    minimumFractionDigits,
    maximumFractionDigits,
  });

  const formatted = formatter.format(Math.abs(value));
  if (!includeSign) {
    return formatted;
  }

  if (value < 0) {
    return `- ${formatted}`;
  }

  if (value > 0) {
    return `+ ${formatted}`;
  }

  return formatted;
};

export { formatCurrency };

