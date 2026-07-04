import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import { User, Product, Chat, ChatMessage, AISearchResult } from "../types";

interface AppContextProps {
  currentUser: User | null;
  setCurrentUser: (user: User | null) => void;
  products: Product[];
  setProducts: (products: Product[]) => void;
  wishlist: string[];
  toggleWishlist: (productId: string) => Promise<void>;
  chats: Chat[];
  fetchChats: () => Promise<void>;
  isLoadingProducts: boolean;
  fetchProducts: (filters?: Record<string, any>) => Promise<void>;
  aiSearchResult: AISearchResult | null;
  setAiSearchResult: (result: AISearchResult | null) => void;
  isSearchingAI: boolean;
  performAISearch: (query: string) => Promise<void>;
  triggerAddProduct: (productData: Partial<Product>) => Promise<Product>;
}

const AppContext = createContext<AppContextProps | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [chats, setChats] = useState<Chat[]>([]);
  const [isLoadingProducts, setIsLoadingProducts] = useState(true);
  const [aiSearchResult, setAiSearchResult] = useState<AISearchResult | null>(null);
  const [isSearchingAI, setIsSearchingAI] = useState(false);

  // Initialize and load default user
  useEffect(() => {
    // We set u1 as default logged-in student (Alex Rivera from Stanford)
    axios.get("/api/users/u1")
      .then(res => {
        setCurrentUser(res.data);
      })
      .catch(err => {
        console.error("Failed to load current user, setting fallback", err);
        setCurrentUser({
          id: "u1",
          name: "Alex Rivera",
          email: "arivera@stanford.edu",
          university: "Stanford University",
          branch: "Computer Science",
          avatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&auto=format&fit=crop&q=60",
          verified: true,
          joinedDate: "Sept 2024"
        });
      });

    // Default wishlist
    setWishlist(["p1", "p3"]);
    fetchProducts();
  }, []);

  const fetchProducts = async (filters?: Record<string, any>) => {
    setIsLoadingProducts(true);
    try {
      const response = await axios.get("/api/products", { params: filters });
      setProducts(response.data);
    } catch (error) {
      console.error("Failed to fetch products:", error);
    } finally {
      setIsLoadingProducts(false);
    }
  };

  const toggleWishlist = async (productId: string) => {
    if (!currentUser) return;
    try {
      const res = await axios.post("/api/wishlist/toggle", {
        userId: currentUser.id,
        productId
      });
      if (res.data.wishlisted) {
        setWishlist(prev => [...prev, productId]);
      } else {
        setWishlist(prev => prev.filter(id => id !== productId));
      }
    } catch (error) {
      console.error("Wishlist toggle failed:", error);
    }
  };

  const fetchChats = async () => {
    if (!currentUser) return;
    try {
      const res = await axios.get("/api/chats", {
        params: { userId: currentUser.id }
      });
      setChats(res.data);
    } catch (error) {
      console.error("Failed to fetch chats:", error);
    }
  };

  const performAISearch = async (query: string) => {
    setIsSearchingAI(true);
    try {
      const res = await axios.post("/api/ai/search", { query });
      setAiSearchResult(res.data);
    } catch (error) {
      console.error("AI Semantic search failed:", error);
    } finally {
      setIsSearchingAI(false);
    }
  };

  const triggerAddProduct = async (productData: Partial<Product>) => {
    try {
      const res = await axios.post("/api/products", {
        ...productData,
        sellerId: currentUser?.id || "u1"
      });
      setProducts(prev => [res.data, ...prev]);
      return res.data;
    } catch (error) {
      console.error("Failed to create product listing:", error);
      throw error;
    }
  };

  return (
    <AppContext.Provider
      value={{
        currentUser,
        setCurrentUser,
        products,
        setProducts,
        wishlist,
        toggleWishlist,
        chats,
        fetchChats,
        isLoadingProducts,
        fetchProducts,
        aiSearchResult,
        setAiSearchResult,
        isSearchingAI,
        performAISearch,
        triggerAddProduct
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useApp must be used within an AppProvider");
  }
  return context;
};
