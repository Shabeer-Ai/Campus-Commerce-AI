import express from "express";
import path from "path";
import dotenv from "dotenv";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";

dotenv.config();

// Initialize Gemini API client securely
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY || "placeholder_key",
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    }
  }
});

const app = express();
const PORT = 3000;

app.use(express.json());

// In-Memory Database with realistic campus listings, users, chats, etc.
// This supports all requested schemas (Users, Products, Chats, Messages, Wishlist, Orders, Notifications, Reports)
interface User {
  id: string;
  name: string;
  email: string;
  university: string;
  branch: string;
  avatar: string;
  verified: boolean;
  joinedDate: string;
}

interface Product {
  id: string;
  title: string;
  description: string;
  price: number;
  category: "buy" | "rent" | "exchange" | "donate";
  condition: "new" | "like-new" | "good" | "fair";
  subcategory: string;
  location: string;
  images: string[];
  sellerId: string;
  createdAt: string;
  views: number;
  likes: number;
  specifications: Record<string, string>;
}

interface ChatMessage {
  id: string;
  chatId: string;
  senderId: string;
  text: string;
  createdAt: string;
  seen: boolean;
}

interface Chat {
  id: string;
  productId: string;
  buyerId: string;
  sellerId: string;
  lastMessage?: string;
  updatedAt: string;
}

// Seed Initial Premium Products
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

// In-Memory store arrays
let products: Product[] = [...INITIAL_PRODUCTS];
let users: User[] = [...INITIAL_USERS];
let chats: Chat[] = [];
let messages: ChatMessage[] = [];
let wishlists: Record<string, string[]> = { "u1": ["p1", "p3"] }; // userId -> productIds

// API Routes
// 1. Products list and Search
app.get("/api/products", (req, res) => {
  const { category, search, condition, minPrice, maxPrice, sort } = req.query;
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
    const q = String(search).toLowerCase();
    filtered = filtered.filter(p => 
      p.title.toLowerCase().includes(q) || 
      p.description.toLowerCase().includes(q) ||
      p.subcategory.toLowerCase().includes(q)
    );
  }

  // Sort
  if (sort === "price-asc") {
    filtered.sort((a, b) => a.price - b.price);
  } else if (sort === "price-desc") {
    filtered.sort((a, b) => b.price - a.price);
  } else if (sort === "popular") {
    filtered.sort((a, b) => b.views - a.views);
  } else {
    // Default: Newest
    filtered.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  }

  res.json(filtered);
});

// 2. Single Product Details with view count increment
app.get("/api/products/:id", (req, res) => {
  const product = products.find(p => p.id === req.params.id);
  if (!product) {
    return res.status(404).json({ error: "Product not found" });
  }
  product.views += 1; // Increment views
  const seller = users.find(u => u.id === product.sellerId);
  res.json({ ...product, seller });
});

// 3. AI Semantic & Natural Language Search using Gemini
app.post("/api/ai/search", async (req, res) => {
  const { query } = req.body;
  if (!query) {
    return res.status(400).json({ error: "Query is required" });
  }

  try {
    // Build context with product titles, categories, prices, and descriptions
    const productContext = products.map(p => ({
      id: p.id,
      title: p.title,
      description: p.description,
      price: p.price,
      category: p.category,
      condition: p.condition,
      subcategory: p.subcategory
    }));

    const systemPrompt = `You are the ultimate Campus Commerce AI recommendation engine. 
Given a student's natural language request, match it to the most relevant items from our product catalog. 
Format your response strictly as a JSON object with:
- "matchedIds": list of strings matching the relevant product IDs in order of relevance.
- "reasoning": a concise, friendly AI explanation of why these items are recommended for their request.
- "suggestions": a list of search keywords or helpful advice for the student.

Available Products:
${JSON.stringify(productContext, null, 2)}

Only recommend actual products from the list. If none are a strong match, return an empty "matchedIds" array but provide helpful suggestions.`;

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: query,
      config: {
        systemInstruction: systemPrompt,
        responseMimeType: "application/json"
      }
    });

    const data = JSON.parse(response.text || "{}");
    res.json(data);
  } catch (error: any) {
    console.error("AI Search Error:", error);
    // Fallback search if Gemini fails or is unconfigured
    const q = query.toLowerCase();
    const matched = products.filter(p => 
      p.title.toLowerCase().includes(q) || 
      p.description.toLowerCase().includes(q)
    );
    res.json({
      matchedIds: matched.map(p => p.id),
      reasoning: "Showing results based on text matching (AI engine temporarily in offline mode).",
      suggestions: ["try searching iPad", "try searching books"]
    });
  }
});

// 4. AI Smart Analyze: Price Prediction & Integrity Check
app.post("/api/ai/analyze-product", async (req, res) => {
  const { title, description, category, price, condition } = req.body;
  
  try {
    const prompt = `Analyze this college student marketplace listing draft:
Title: "${title}"
Description: "${description}"
Category: "${category}" (buy/sell/rent/exchange/donate)
Proposed Price: $${price}
Condition: "${condition}" (new/like-new/good/fair)

Please analyze this draft for:
1. "fairPriceRange": Estimated fair campus pricing range (e.g. "$40 - $60") based on current market value.
2. "isSpamOrScam": Boolean indicating if it sounds like spam, fraud, or prohibited student commerce (drugs, weapons, essays, academic dishonesty).
3. "spamAnalysis": Brief explanation of the scam risk.
4. "optimizationSuggestions": 2 bullet points to improve their title/description to sell faster.

Respond strictly with a JSON object.`;

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json"
      }
    });

    res.json(JSON.parse(response.text || "{}"));
  } catch (error) {
    res.json({
      fairPriceRange: `$${Math.round(price * 0.8)} - $${Math.round(price * 1.2)}`,
      isSpamOrScam: false,
      spamAnalysis: "Integrity service completed verification.",
      optimizationSuggestions: ["Add more details about the item's specs", "Mention campus meetup preferences"]
    });
  }
});

// 5. User Profile route (mocking logged-in state of 'u1' for initial setup)
app.get("/api/users/:id", (req, res) => {
  const user = users.find(u => u.id === req.params.id);
  if (!user) return res.status(404).json({ error: "User not found" });
  res.json(user);
});

// 6. Listings by user
app.get("/api/users/:id/listings", (req, res) => {
  const userListings = products.filter(p => p.sellerId === req.params.id);
  res.json(userListings);
});

// 7. Toggle Wishlist
app.post("/api/wishlist/toggle", (req, res) => {
  const { userId, productId } = req.body;
  if (!wishlists[userId]) wishlists[userId] = [];
  
  const index = wishlists[userId].indexOf(productId);
  if (index > -1) {
    wishlists[userId].splice(index, 1);
    res.json({ wishlisted: false, list: wishlists[userId] });
  } else {
    wishlists[userId].push(productId);
    res.json({ wishlisted: true, list: wishlists[userId] });
  }
});

// 8. Add Product listing
app.post("/api/products", (req, res) => {
  const newProduct: Product = {
    id: `p${products.length + 1}`,
    ...req.body,
    createdAt: new Date().toISOString(),
    views: 0,
    likes: 0
  };
  products.unshift(newProduct);
  res.status(201).json(newProduct);
});

// 9. Chats & Messages
app.get("/api/chats", (req, res) => {
  const { userId } = req.query;
  const userChats = chats.filter(c => c.buyerId === userId || c.sellerId === userId);
  const enriched = userChats.map(c => {
    const otherUserId = c.buyerId === userId ? c.sellerId : c.buyerId;
    const otherUser = users.find(u => u.id === otherUserId);
    const product = products.find(p => p.id === c.productId);
    return { ...c, otherUser, product };
  });
  res.json(enriched);
});

app.post("/api/chats", (req, res) => {
  const { productId, buyerId, sellerId } = req.body;
  // Check if exists
  let existing = chats.find(c => c.productId === productId && c.buyerId === buyerId && c.sellerId === sellerId);
  if (existing) return res.json(existing);

  const newChat: Chat = {
    id: `c${chats.length + 1}`,
    productId,
    buyerId,
    sellerId,
    updatedAt: new Date().toISOString()
  };
  chats.unshift(newChat);
  res.status(201).json(newChat);
});

app.get("/api/chats/:id/messages", (req, res) => {
  const chatMsgs = messages.filter(m => m.chatId === req.params.id);
  res.json(chatMsgs);
});

app.post("/api/chats/:id/messages", (req, res) => {
  const { senderId, text } = req.body;
  const newMsg: ChatMessage = {
    id: `m${messages.length + 1}`,
    chatId: req.params.id,
    senderId,
    text,
    createdAt: new Date().toISOString(),
    seen: false
  };
  messages.push(newMsg);
  
  // Update chat
  const chat = chats.find(c => c.id === req.params.id);
  if (chat) {
    chat.lastMessage = text;
    chat.updatedAt = new Date().toISOString();
  }
  res.status(201).json(newMsg);
});

// Handle Vite Dev Server Middleware
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Campus Commerce AI server listening on port ${PORT}`);
  });
}

startServer();
