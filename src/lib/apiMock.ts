import axios from "axios";
import { User, Product, Chat, ChatMessage, AISearchResult, AIAnalysisResult } from "../types";

// Seed Initial Products
const INITIAL_PRODUCTS: Product[] = [
  {
    id: "p1",
    title: "iPad Pro 12.9 M2 (256GB) + Apple Pencil 2",
    description: "Mint condition M2 iPad Pro. Used for one semester in Design 101. Comes with screen protector pre-applied and original Apple Pencil 2. No scratches or dents. Perfect for taking notes and digital art.",
    price: 850,
    category: "buy",
    condition: "like-new",
    subcategory: "Electronics",
    location: "Stanford West Campus",
    images: [
      "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=800&auto=format&fit=crop&q=60",
      "https://images.unsplash.com/photo-1589739900243-4b52cd9b104e?w=800&auto=format&fit=crop&q=60"
    ],
    sellerId: "u2",
    createdAt: new Date(Date.now() - 4 * 3600000).toISOString(),
    views: 142,
    likes: 24,
    specifications: {
      "Model": "iPad Pro 12.9-inch (6th Gen)",
      "Chip": "Apple M2",
      "Storage": "256 GB",
      "Color": "Space Gray",
      "Warranty": "AppleCare+ until Dec 2026"
    }
  },
  {
    id: "p2",
    title: "Organic Chemistry 8th Edition - Wade & Simek",
    description: "Hardcover textbook for CHEM 141/143. Highlights are only in Chapter 1 & 2. Super helpful for pre-med students. I will throw in the practice solution guide for free!",
    price: 45,
    category: "buy",
    condition: "good",
    subcategory: "Books & Education",
    location: "MIT East Campus Dorms",
    images: [
      "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=800&auto=format&fit=crop&q=60"
    ],
    sellerId: "u3",
    createdAt: new Date(Date.now() - 12 * 3600000).toISOString(),
    views: 89,
    likes: 8,
    specifications: {
      "Author": "Wade & Simek",
      "Publisher": "Pearson",
      "Edition": "8th Edition",
      "Format": "Hardcover"
    }
  },
  {
    id: "p3",
    title: "Specialized Rockhopper Comp 29 Mountain Bike",
    description: "Perfect for commuting across UC Berkeley campus and weekend trail rides. Renting it out weekly or monthly because I am studying abroad this semester.",
    price: 25,
    category: "rent",
    condition: "good",
    subcategory: "Bikes & Transport",
    location: "UC Berkeley - Bancroft Way",
    images: [
      "https://images.unsplash.com/photo-1485965120184-e220f721d03e?w=800&auto=format&fit=crop&q=60"
    ],
    sellerId: "u4",
    createdAt: new Date(Date.now() - 24 * 3600000).toISOString(),
    views: 215,
    likes: 45,
    specifications: {
      "Brand": "Specialized",
      "Frame Size": "Medium (29\")",
      "Speeds": "1x9 MicroSHIFT",
      "Rental Plan": "$25 per week / $80 per month"
    }
  },
  {
    id: "p4",
    title: "PlayStation 5 Digital Edition (Slim)",
    description: "Want to exchange my PS5 Slim Digital Edition for an Xbox Series X. Console is 6 months old, works flawlessly. Comes with 1 DualSense white controller and all power/HDMI cables.",
    price: 0,
    category: "exchange",
    condition: "like-new",
    subcategory: "Gaming & Entertainment",
    location: "Harvard Yard",
    images: [
      "https://images.unsplash.com/photo-1606813907291-d86efa9b94db?w=800&auto=format&fit=crop&q=60"
    ],
    sellerId: "u5",
    createdAt: new Date(Date.now() - 2 * 3600000).toISOString(),
    views: 312,
    likes: 56,
    specifications: {
      "Console": "PS5 Slim Digital",
      "Storage": "1TB SSD",
      "Exchange Request": "Xbox Series X in equivalent condition"
    }
  },
  {
    id: "p5",
    title: "TI-84 Plus CE Graphing Calculator",
    description: "Donating my trusty graphing calculator to anyone starting Calculus or Stats who cannot afford one. Still holds a great charge, works perfectly, includes charging cable.",
    price: 0,
    category: "donate",
    condition: "good",
    subcategory: "Books & Education",
    location: "UT Austin - Speedway",
    images: [
      "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=800&auto=format&fit=crop&q=60"
    ],
    sellerId: "u1",
    createdAt: new Date(Date.now() - 1 * 3600000).toISOString(),
    views: 65,
    likes: 19,
    specifications: {
      "Model": "TI-84 Plus CE",
      "Display": "Color Screen",
      "Target": "First-generation or low-income students preferred"
    }
  }
];

const INITIAL_USERS: User[] = [
  {
    id: "u1",
    name: "Alex Rivera",
    email: "arivera@stanford.edu",
    university: "Stanford University",
    branch: "Computer Science",
    avatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&auto=format&fit=crop&q=60",
    verified: true,
    joinedDate: "Sept 2024"
  },
  {
    id: "u2",
    name: "Sarah Chen",
    email: "schen@mit.edu",
    university: "Massachusetts Institute of Technology",
    branch: "Mechanical Engineering",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=60",
    verified: true,
    joinedDate: "Jan 2024"
  },
  {
    id: "u3",
    name: "Marcus Aurelius",
    email: "maurelius@berkeley.edu",
    university: "UC Berkeley",
    branch: "Business Administration",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=60",
    verified: true,
    joinedDate: "Sept 2025"
  },
  {
    id: "u4",
    name: "Elena Rostova",
    email: "erostova@harvard.edu",
    university: "Harvard University",
    branch: "Economics",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=60",
    verified: true,
    joinedDate: "Sept 2023"
  },
  {
    id: "u5",
    name: "Devon Miller",
    email: "devon@utexas.edu",
    university: "UT Austin",
    branch: "Electrical Engineering",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=60",
    verified: true,
    joinedDate: "Oct 2024"
  }
];

// Local Client State storage helpers (backed by localStorage so refresh works too!)
const getStored = <T>(key: string, defaultValue: T): T => {
  try {
    const val = localStorage.getItem(`campus_ai_${key}`);
    return val ? JSON.parse(val) : defaultValue;
  } catch {
    return defaultValue;
  }
};

const setStored = <T>(key: string, value: T): void => {
  try {
    localStorage.setItem(`campus_ai_${key}`, JSON.stringify(value));
  } catch (e) {
    console.error(e);
  }
};

let products: Product[] = getStored("products", INITIAL_PRODUCTS);
let users: User[] = getStored("users", INITIAL_USERS);
let chats: Chat[] = getStored("chats", []);
let messages: ChatMessage[] = getStored("messages", []);
let wishlists: Record<string, string[]> = getStored("wishlists", { "u1": ["p1", "p3"] });

const saveAll = () => {
  setStored("products", products);
  setStored("users", users);
  setStored("chats", chats);
  setStored("messages", messages);
  setStored("wishlists", wishlists);
};

export let isMockActive = false;

// Check if running on GitHub pages or if server is unreachable
export const checkServerAvailability = async () => {
  if (window.location.hostname.includes("github.io") || window.location.hostname.includes("github.com")) {
    isMockActive = true;
    console.log("GitHub Pages detected: Activating Client-Side Seamless API Mock Database");
    return;
  }

  try {
    const res = await fetch("/api/products?limit=1");
    if (!res.ok) {
      isMockActive = true;
      console.log("API server returned non-ok status: Switching to Client-Side Mock Database");
    }
  } catch (err) {
    isMockActive = true;
    console.log("API server unreachable: Switching to Client-Side Mock Database", err);
  }
};

// Set up the axios interceptor
export const setupAxiosMockInterceptor = () => {
  axios.interceptors.request.use(async (config) => {
    if (!isMockActive || !config.url?.startsWith("/api/")) {
      return config;
    }

    // Match URLs and mock response
    const url = config.url;
    const method = config.method?.toLowerCase();
    const parsedUrl = new URL(url, window.location.origin);
    const pathname = parsedUrl.pathname;

    console.log(`[Mock API Interceptor] ${method?.toUpperCase()} ${pathname}`);

    let responseData: any = null;
    let status = 200;

    // 1. GET /api/users/:id
    if (method === "get" && pathname.match(/^\/api\/users\/[^\/]+$/) && !pathname.endsWith("/listings")) {
      const match = pathname.match(/^\/api\/users\/([^\/]+)$/);
      const userId = match ? match[1] : "";
      const user = users.find(u => u.id === userId);
      if (user) {
        responseData = user;
      } else {
        status = 404;
        responseData = { error: "User not found" };
      }
    }
    // 2. GET /api/users/:id/listings
    else if (method === "get" && pathname.match(/^\/api\/users\/[^\/]+\/listings$/)) {
      const match = pathname.match(/^\/api\/users\/([^\/]+)\/listings$/);
      const userId = match ? match[1] : "";
      responseData = products.filter(p => p.sellerId === userId);
    }
    // 3. GET /api/products/:id
    else if (method === "get" && pathname.match(/^\/api\/products\/[^\/]+$/)) {
      const match = pathname.match(/^\/api\/products\/([^\/]+)$/);
      const productId = match ? match[1] : "";
      const product = products.find(p => p.id === productId);
      if (product) {
        product.views = (product.views || 0) + 1;
        saveAll();
        const seller = users.find(u => u.id === product.sellerId);
        responseData = { ...product, seller };
      } else {
        status = 404;
        responseData = { error: "Product not found" };
      }
    }
    // 4. GET /api/products
    else if (method === "get" && pathname === "/api/products") {
      const category = parsedUrl.searchParams.get("category");
      const search = parsedUrl.searchParams.get("search");
      const condition = parsedUrl.searchParams.get("condition");
      const minPrice = parsedUrl.searchParams.get("minPrice");
      const maxPrice = parsedUrl.searchParams.get("maxPrice");
      const sort = parsedUrl.searchParams.get("sort");

      let filtered = [...products];

      if (category) {
        filtered = filtered.filter(p => p.category === category);
      }
      if (condition) {
        filtered = filtered.filter(p => p.condition === condition);
      }
      if (minPrice) {
        filtered = filtered.filter(p => p.price >= Number(minPrice));
      }
      if (maxPrice) {
        filtered = filtered.filter(p => p.price <= Number(maxPrice));
      }
      if (search) {
        const q = search.toLowerCase();
        filtered = filtered.filter(p => 
          p.title.toLowerCase().includes(q) || 
          p.description.toLowerCase().includes(q) ||
          p.subcategory.toLowerCase().includes(q)
        );
      }

      if (sort === "price-asc") {
        filtered.sort((a, b) => a.price - b.price);
      } else if (sort === "price-desc") {
        filtered.sort((a, b) => b.price - a.price);
      } else if (sort === "popular") {
        filtered.sort((a, b) => b.views - a.views);
      } else {
        filtered.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
      }

      responseData = filtered;
    }
    // 5. POST /api/wishlist/toggle
    else if (method === "post" && pathname === "/api/wishlist/toggle") {
      const { userId, productId } = config.data || {};
      if (!wishlists[userId]) wishlists[userId] = [];
      const index = wishlists[userId].indexOf(productId);
      let wishlisted = false;
      if (index > -1) {
        wishlists[userId].splice(index, 1);
      } else {
        wishlists[userId].push(productId);
        wishlisted = true;
      }
      saveAll();
      responseData = { wishlisted, list: wishlists[userId] };
    }
    // 6. POST /api/products
    else if (method === "post" && pathname === "/api/products") {
      const newProduct: Product = {
        id: `p${products.length + 100}`,
        ...config.data,
        createdAt: new Date().toISOString(),
        views: 0,
        likes: 0
      };
      products.unshift(newProduct);
      saveAll();
      responseData = newProduct;
      status = 211;
    }
    // 7. GET /api/chats
    else if (method === "get" && pathname === "/api/chats") {
      const userId = parsedUrl.searchParams.get("userId");
      const userChats = chats.filter(c => c.buyerId === userId || c.sellerId === userId);
      responseData = userChats.map(c => {
        const otherUserId = c.buyerId === userId ? c.sellerId : c.buyerId;
        const otherUser = users.find(u => u.id === otherUserId);
        const product = products.find(p => p.id === c.productId);
        return { ...c, otherUser, product };
      });
    }
    // 8. POST /api/chats
    else if (method === "post" && pathname === "/api/chats") {
      const { productId, buyerId, sellerId } = config.data || {};
      let existing = chats.find(c => c.productId === productId && c.buyerId === buyerId && c.sellerId === sellerId);
      if (existing) {
        responseData = existing;
      } else {
        const newChat: Chat = {
          id: `c${chats.length + 100}`,
          productId,
          buyerId,
          sellerId,
          updatedAt: new Date().toISOString()
        };
        chats.unshift(newChat);
        saveAll();
        responseData = newChat;
      }
    }
    // 9. GET /api/chats/:id/messages
    else if (method === "get" && pathname.match(/^\/api\/chats\/[^\/]+\/messages$/)) {
      const match = pathname.match(/^\/api\/chats\/([^\/]+)\/messages$/);
      const chatId = match ? match[1] : "";
      responseData = messages.filter(m => m.chatId === chatId);
    }
    // 10. POST /api/chats/:id/messages
    else if (method === "post" && pathname.match(/^\/api\/chats\/[^\/]+\/messages$/)) {
      const match = pathname.match(/^\/api\/chats\/([^\/]+)\/messages$/);
      const chatId = match ? match[1] : "";
      const { senderId, text } = config.data || {};
      const newMsg: ChatMessage = {
        id: `m${messages.length + 100}`,
        chatId,
        senderId,
        text,
        createdAt: new Date().toISOString(),
        seen: false
      };
      messages.push(newMsg);
      const chat = chats.find(c => c.id === chatId);
      if (chat) {
        chat.lastMessage = text;
        chat.updatedAt = new Date().toISOString();
      }
      saveAll();
      responseData = newMsg;
    }
    // 11. POST /api/ai/search
    else if (method === "post" && pathname === "/api/ai/search") {
      const { query } = config.data || {};
      const q = String(query).toLowerCase();
      const matched = products.filter(p => 
        p.title.toLowerCase().includes(q) || 
        p.description.toLowerCase().includes(q)
      );
      responseData = {
        matchedIds: matched.map(p => p.id),
        reasoning: `Matched ${matched.length} campus assets matching "${query}" using client-side indexing. (Local fallback enabled)`,
        suggestions: ["try searching iPad", "try searching books", "try searching PS5"]
      };
    }
    // 12. POST /api/ai/analyze-product
    else if (method === "post" && pathname === "/api/ai/analyze-product") {
      const { title, price } = config.data || {};
      responseData = {
        fairPriceRange: `$${Math.round((price || 50) * 0.85)} - $${Math.round((price || 50) * 1.15)}`,
        isSpamOrScam: false,
        spamAnalysis: "Client-side safety checker passed this listing as legitimate for college student trade.",
        optimizationSuggestions: [
          `Your title "${title || "Item"}" looks great. Suggest adding model year to attract classmates faster.`,
          "Specify the ideal on-campus meeting location (e.g. library, cafeteria) for safe trading."
        ]
      };
    }

    // Cancel request and return mock response
    return Promise.reject({
      config,
      response: {
        data: responseData,
        status: status,
        statusText: "OK",
        headers: {},
        config
      }
    });
  }, (error) => {
    return Promise.reject(error);
  });

  // Handle rejected promises that are actually mock responses
  axios.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error && error.response && error.response.statusText === "OK") {
        return Promise.resolve(error.response);
      }
      return Promise.reject(error);
    }
  );
};
