/**
 * Pricing Calculator Utility
 * Handles base price, discounts, and breakfast add-ons.
 */

export const calculateTotal = (basePrice, checkIn, checkOut, discounts, breakfastDates = []) => {
  if (!checkIn || !checkOut) return 0;

  const start = new Date(checkIn);
  const end = new Date(checkOut);
  if (isNaN(start.getTime()) || isNaN(end.getTime())) return 0;
  
  const diffTime = Math.abs(end - start);
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  if (isNaN(diffDays) || diffDays <= 0) return 0;

  let finalPrice = basePrice * diffDays;
  let appliedDiscount = null;

  // 1. Calculate Discounts
  // Sort discounts by threshold descending to apply the highest applicable one
  const sortedDiscounts = [...discounts].sort((a, b) => b.threshold - a.threshold);

  for (const discount of sortedDiscounts) {
    if (diffDays >= discount.threshold) {
      const discountAmount = finalPrice * (discount.percentage / 100);
      finalPrice -= discountAmount;
      appliedDiscount = {
        name: discount.type === 'monthly' ? 'Monthly Discount' : 'Multiple Nights Discount',
        percentage: discount.percentage,
        amount: discountAmount
      };
      break; // Only apply one discount (the highest)
    }
  }

  // 2. Add Breakfast Costs
  const breakfastCostPerDay = 25; // Example cost per breakfast
  const totalBreakfastCost = breakfastDates.length * breakfastCostPerDay;
  finalPrice += totalBreakfastCost;

  return {
    nights: diffDays,
    subtotal: basePrice * diffDays,
    total: Math.round(finalPrice * 100) / 100,
    discount: appliedDiscount,
    breakfastCost: totalBreakfastCost
  };
};
