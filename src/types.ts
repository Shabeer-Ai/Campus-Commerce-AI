export type MarketCategory = "buy" | "rent" | "exchange" | "donate";
export type ProductCondition = "new" | "like-new" | "good" | "fair";

export interface User {
  id: string;
  name: string;
  email: string;
  university: string;
  branch: string;
  avatar: string;
  verified: boolean;
  joinedDate: string;
}

export interface Product {
  id: string;
  title: string;
  description: string;
  price: number;
  category: MarketCategory;
  condition: ProductCondition;
  subcategory: string;
  location: string;
  images: string[];
  sellerId: string;
  createdAt: string;
  views: number;
  likes: number;
  specifications: Record<string, string>;
  seller?: User;
}

export interface ChatMessage {
  id: string;
  chatId: string;
  senderId: string;
  text: string;
  createdAt: string;
  seen: boolean;
}

export interface Chat {
  id: string;
  productId: string;
  buyerId: string;
  sellerId: string;
  lastMessage?: string;
  updatedAt: string;
  otherUser?: User;
  product?: Product;
}

export interface AISearchResult {
  matchedIds: string[];
  reasoning: string;
  suggestions: string[];
}

export interface AIAnalysisResult {
  fairPriceRange: string;
  isSpamOrScam: boolean;
  spamAnalysis: string;
  optimizationSuggestions: string[];
}
