import { PriceHistoryItem, Product } from "../types/index"

const Notification = {
  WELCOME: 'WELCOME',
  CHANGE_OF_STOCK: 'CHANGE_OF_STOCK',
  LOWEST_PRICE: 'LOWEST_PRICE',
  THRESHOLD_MET: 'THRESHOLD_MET',
}

const THRESHOLD_PERCENTAGE = 40;

export function extractPrice(...elements: any){
    for(const element of elements){
        const priceText = element.text().trim();
        if(priceText) return priceText.replace(/[^0-9.]/g, '');
    }
    return ''
}

export function extractCurrency(element: any){
    const currencyText = element.trim().slice(0,1);
    return currencyText || '';
}

// Extracts description from two possible elements from amazon
export function extractDescription($: any) {
  const selectors = [
    ".a-unordered-list .a-list-item",
    ".a-expander-content p",
  ];
  
  for (const selector of selectors) {
    const elements = $(selector);
    if (elements.length > 0) {
      const textContent = elements
        .map((_: any, element: any) => $(element).text().trim())
        .get()
        .join("\n");
      return textContent;
    }
  }
  return "";
}

// ✅ FIXED: Added safety checks for empty arrays and undefined values
export function getHighestPrice(priceList: PriceHistoryItem[]) {
  // Check if array is empty or undefined
  if (!priceList || priceList.length === 0) {
    return 0;
  }

  // Filter out any invalid entries
  const validPrices = priceList.filter(item => 
    item && typeof item.price === 'number' && !isNaN(item.price)
  );

  if (validPrices.length === 0) {
    return 0;
  }

  let highestPrice = validPrices[0];
  for (let i = 1; i < validPrices.length; i++) {
    if (validPrices[i].price > highestPrice.price) {
      highestPrice = validPrices[i];
    }
  }
  
  return highestPrice.price;
}

// ✅ FIXED: Added safety checks for empty arrays and undefined values
export function getLowestPrice(priceList: PriceHistoryItem[]) {
  // Check if array is empty or undefined
  if (!priceList || priceList.length === 0) {
    return 0;
  }

  // Filter out any invalid entries
  const validPrices = priceList.filter(item => 
    item && typeof item.price === 'number' && !isNaN(item.price)
  );

  if (validPrices.length === 0) {
    return 0;
  }

  let lowestPrice = validPrices[0];
  for (let i = 1; i < validPrices.length; i++) {
    if (validPrices[i].price < lowestPrice.price) {
      lowestPrice = validPrices[i];
    }
  }
  
  return lowestPrice.price;
}

// ✅ FIXED: Added safety checks for empty arrays and undefined values
export function getAveragePrice(priceList: PriceHistoryItem[]) {
  // Check if array is empty or undefined
  if (!priceList || priceList.length === 0) {
    return 0;
  }

  // Filter out any invalid entries
  const validPrices = priceList.filter(item => 
    item && typeof item.price === 'number' && !isNaN(item.price)
  );

  if (validPrices.length === 0) {
    return 0;
  }

  const sumOfPrices = validPrices.reduce((acc, curr) => acc + curr.price, 0);
  const averagePrice = sumOfPrices / validPrices.length;
  
  return averagePrice;
}

export const getEmailNotifType = (
  scrapedProduct: Product,
  currentProduct: Product
) => {
  const lowestPrice = getLowestPrice(currentProduct.priceHistory);
  
  if (scrapedProduct.currentPrice < lowestPrice) {
    return Notification.LOWEST_PRICE as keyof typeof Notification;
  }
  if (!scrapedProduct.isOutOfStock && currentProduct.isOutOfStock) {
    return Notification.CHANGE_OF_STOCK as keyof typeof Notification;
  }
  if (scrapedProduct.discountRate && scrapedProduct.discountRate >= THRESHOLD_PERCENTAGE) {
    return Notification.THRESHOLD_MET as keyof typeof Notification;
  }
  
  return null;
};

export const formatNumber = (num: number = 0) => {
  return num.toLocaleString(undefined, {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });
};