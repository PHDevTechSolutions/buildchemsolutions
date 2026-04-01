"use client";

import { useState, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { useCart } from "@/lib/cart-context";
import Link from "next/link";
import Image from "next/image";
import {
  ShoppingCart,
  X,
  Trash2,
  MessageSquare,
  Send,
  ChevronRight,
  FileText,
  Loader2,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { db } from "@/lib/firebase";
import {
  collection,
  addDoc,
  query,
  where,
  orderBy,
  onSnapshot,
  serverTimestamp,
} from "firebase/firestore";

// ─────────────────────────────────────────────────────────────────────────────
// TYPES
// ─────────────────────────────────────────────────────────────────────────────

interface ChatMessage {
  id: string;
  message: string;
  senderName: string;
  senderEmail: string;
  isAdmin: boolean;
  timestamp: any;
}

// ─────────────────────────────────────────────────────────────────────────────
// CART PANEL
// ─────────────────────────────────────────────────────────────────────────────

function CartPanel({ onClose }: { onClose: () => void }) {
  const { cart, removeItem } = useCart();

  return (
    <motion.div
      initial={{ opacity: 0, y: 8, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 8, scale: 0.97 }}
      transition={{ duration: 0.2 }}
      className="w-[340px] bg-white border border-gray-200 shadow-2xl flex flex-col"
    >
      {/* Header */}
      <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
        <div>
          <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-gray-900">
            Catalog Request
          </h3>
          <p className="text-[10px] text-gray-400 mt-0.5 tracking-wide uppercase">
            {cart.length} item{cart.length !== 1 ? "s" : ""} selected
          </p>
        </div>
        <button
          onClick={onClose}
          className="p-1.5 text-gray-400 hover:text-gray-700 hover:bg-gray-50 transition-colors"
        >
          <X size={16} />
        </button>
      </div>

      {/* Items */}
      <div className="flex-1 overflow-y-auto p-4 space-y-2 max-h-[280px]">
        {cart.length === 0 ? (
          <div className="text-center py-10">
            <ShoppingCart size={28} className="text-gray-200 mx-auto mb-3" />
            <p className="text-xs text-gray-400 uppercase tracking-wider">
              No items in your request
            </p>
          </div>
        ) : (
          cart.map((item) => (
            <div
              key={item.productId}
              className="flex items-start gap-3 p-3 bg-gray-50 border border-gray-100 hover:border-[#004AAD]/20 transition-colors"
            >
              <div className="flex-1 min-w-0">
                <p className="text-[9px] font-semibold uppercase tracking-widest text-[#004AAD] mb-0.5">
                  {item.solutionTitle}
                </p>
                <p className="text-xs font-medium text-gray-900 truncate">
                  {item.productName}
                </p>
                <p className="text-[9px] text-gray-400 uppercase tracking-wider mt-0.5">
                  {item.seriesName}
                </p>
              </div>
              <button
                onClick={() => removeItem(item.productId)}
                className="flex-shrink-0 p-1 text-gray-300 hover:text-gray-600 transition-colors"
              >
                <Trash2 size={13} />
              </button>
            </div>
          ))
        )}
      </div>

      {/* Footer */}
      {cart.length > 0 && (
        <div className="p-4 border-t border-gray-100">
          <Link href="/checkout" onClick={onClose}>
            <button className="w-full flex items-center justify-center gap-2 bg-[#004AAD] hover:bg-[#003a8c] text-white py-3 text-[10px] font-semibold uppercase tracking-widest transition-colors">
              Proceed to Checkout
              <ChevronRight size={13} />
            </button>
          </Link>
        </div>
      )}
    </motion.div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// CHAT PANEL
// ─────────────────────────────────────────────────────────────────────────────

function ChatPanel({ onClose }: { onClose: () => void }) {
  const [step, setStep] = useState<"identify" | "chat">("identify");
  const [nameInput, setNameInput] = useState("");
  const [emailInput, setEmailInput] = useState("");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [currentUser, setCurrentUser] = useState<{
    name: string;
    email: string;
  } | null>(null);
  const [sending, setSending] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Restore session
  useEffect(() => {
    const saved = localStorage.getItem("buildchem_chat_user");
    if (saved) {
      try {
        setCurrentUser(JSON.parse(saved));
        setStep("chat");
      } catch {
        // ignore
      }
    }
  }, []);

  // Firestore listener
  useEffect(() => {
    if (!currentUser) return;

    const q = query(
      collection(db, "chats"),
      where("website", "==", "buildchem"),
      where("senderEmail", "==", currentUser.email),
      orderBy("timestamp", "asc"),
    );

    const unsub = onSnapshot(q, (snap) => {
      setMessages(
        snap.docs.map((d) => ({ id: d.id, ...d.data() }) as ChatMessage),
      );
      setTimeout(() => {
        if (scrollRef.current)
          scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
      }, 80);
    });

    return () => unsub();
  }, [currentUser]);

  const handleIdentify = (e: React.FormEvent) => {
    e.preventDefault();
    if (!nameInput.trim() || !emailInput.trim()) return;
    const user = { name: nameInput.trim(), email: emailInput.trim() };
    localStorage.setItem("buildchem_chat_user", JSON.stringify(user));
    setCurrentUser(user);
    setStep("chat");
  };

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim() || !currentUser || sending) return;
    setSending(true);
    const text = message.trim();
    setMessage("");
    try {
      await addDoc(collection(db, "chats"), {
        website: "buildchem",
        senderEmail: currentUser.email,
        senderName: currentUser.name,
        message: text,
        isAdmin: false,
        timestamp: serverTimestamp(),
      });
    } catch (err) {
      console.error("Chat send error:", err);
    } finally {
      setSending(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 8, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 8, scale: 0.97 }}
      transition={{ duration: 0.2 }}
      className="w-[340px] bg-white border border-gray-200 shadow-2xl flex flex-col overflow-hidden"
    >
      {/* Header */}
      <div className="flex items-center justify-between px-5 py-4 bg-[#004AAD]">
        <div className="flex items-center gap-3">
          <div className="relative w-7 h-7 flex-shrink-0">
            <Image
              src="/images/buildchem-small.png"
              alt="Buildchem"
              fill
              className="object-contain brightness-0 invert"
            />
          </div>
          <div>
            <h3 className="text-[11px] font-semibold uppercase tracking-widest text-white">
              Buildchem Support
            </h3>
            <div className="flex items-center gap-1.5 mt-0.5">
              <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
              <span className="text-[9px] text-white/60 uppercase tracking-wider font-medium">
                Online
              </span>
            </div>
          </div>
        </div>
        <button
          onClick={onClose}
          className="p-1.5 text-white/50 hover:text-white transition-colors"
        >
          <X size={15} />
        </button>
      </div>

      {/* Identify step */}
      {step === "identify" && (
        <div className="p-5 flex flex-col gap-4">
          <p className="text-xs text-gray-600 leading-relaxed">
            Before we start, please share a few details so our team can follow
            up with you.
          </p>
          <form onSubmit={handleIdentify} className="flex flex-col gap-3">
            <input
              required
              value={nameInput}
              onChange={(e) => setNameInput(e.target.value)}
              placeholder="Your full name"
              className="w-full px-3 py-2.5 text-sm bg-gray-50 border border-gray-200 focus:border-[#004AAD] focus:bg-white focus:outline-none text-gray-900 placeholder:text-gray-400 transition-colors"
            />
            <input
              required
              type="email"
              value={emailInput}
              onChange={(e) => setEmailInput(e.target.value)}
              placeholder="Work email address"
              className="w-full px-3 py-2.5 text-sm bg-gray-50 border border-gray-200 focus:border-[#004AAD] focus:bg-white focus:outline-none text-gray-900 placeholder:text-gray-400 transition-colors"
            />
            <button
              type="submit"
              className="w-full py-2.5 bg-[#004AAD] hover:bg-[#003a8c] text-white text-[10px] font-semibold uppercase tracking-widest transition-colors"
            >
              Start Chat
            </button>
          </form>
        </div>
      )}

      {/* Chat step */}
      {step === "chat" && (
        <>
          {messages.length === 0 && (
            <div className="px-5 py-4 bg-gray-50 border-b border-gray-100">
              <p className="text-xs text-gray-600 leading-relaxed">
                Hi{currentUser ? ` ${currentUser.name.split(" ")[0]}` : ""}! How
                can we help you today? Our technical team typically replies
                within a few hours.
              </p>
            </div>
          )}

          <div
            ref={scrollRef}
            className="flex-1 overflow-y-auto p-4 space-y-3 min-h-[220px] max-h-[280px]"
          >
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={cn(
                  "flex",
                  msg.isAdmin ? "justify-start" : "justify-end",
                )}
              >
                <div
                  className={cn(
                    "max-w-[80%] px-3 py-2 text-[12px] leading-relaxed",
                    msg.isAdmin
                      ? "bg-gray-100 text-gray-800 border border-gray-200"
                      : "bg-[#004AAD] text-white",
                  )}
                >
                  {msg.message}
                </div>
              </div>
            ))}
          </div>

          <div className="border-t border-gray-100 p-3">
            <form onSubmit={handleSend} className="flex items-center gap-2">
              <input
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type a message…"
                className="flex-1 px-3 py-2 text-xs bg-gray-50 border border-gray-200 focus:border-[#004AAD] focus:bg-white focus:outline-none text-gray-900 placeholder:text-gray-400 transition-colors"
              />
              <button
                type="submit"
                disabled={!message.trim() || sending}
                className="p-2 bg-[#004AAD] hover:bg-[#003a8c] disabled:opacity-40 text-white transition-colors"
              >
                {sending ? (
                  <Loader2 size={14} className="animate-spin" />
                ) : (
                  <Send size={14} />
                )}
              </button>
            </form>
          </div>
        </>
      )}
    </motion.div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// MAIN: FLOATING MENU
// ─────────────────────────────────────────────────────────────────────────────

export function FloatingMenu() {
  const pathname = usePathname();
  const { cart } = useCart();
  const [isOpen, setIsOpen] = useState(false);
  const [activePanel, setActivePanel] = useState<"cart" | "chat" | null>(null);

  if (pathname === "/checkout") return null;

  const togglePanel = (panel: "cart" | "chat") => {
    setActivePanel((prev) => (prev === panel ? null : panel));
  };

  const closeAll = () => {
    setIsOpen(false);
    setActivePanel(null);
  };

  return (
    <div className="fixed bottom-6 right-6 z-[60] flex flex-col items-end gap-3">
      {/* Backdrop */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeAll}
            className="fixed inset-0 bg-black/30 backdrop-blur-[2px] z-[-1]"
          />
        )}
      </AnimatePresence>

      {/* Menu items */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 12 }}
            className="flex flex-col items-end gap-3 mb-1"
          >
            {/* Active panel */}
            <AnimatePresence mode="wait">
              {activePanel === "cart" && (
                <CartPanel key="cart" onClose={() => setActivePanel(null)} />
              )}
              {activePanel === "chat" && (
                <ChatPanel key="chat" onClose={() => setActivePanel(null)} />
              )}
            </AnimatePresence>

            {/* Browse Solutions */}
            <motion.div
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.05 }}
            >
              <Link href="/solutions">
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={closeAll}
                  className="flex items-center gap-3 bg-white border border-gray-200 px-4 py-2.5 shadow-lg hover:border-[#004AAD]/30 hover:shadow-xl transition-all"
                >
                  <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-gray-700">
                    Browse Solutions
                  </span>
                  <div className="w-8 h-8 bg-[#004AAD] flex items-center justify-center">
                    <FileText size={15} className="text-white" />
                  </div>
                </motion.button>
              </Link>
            </motion.div>

            {/* Catalog Request */}
            <motion.div
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
            >
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => togglePanel("cart")}
                className={cn(
                  "flex items-center gap-3 bg-white border px-4 py-2.5 shadow-lg transition-all relative",
                  activePanel === "cart"
                    ? "border-[#004AAD] shadow-xl"
                    : "border-gray-200 hover:border-[#004AAD]/30 hover:shadow-xl",
                )}
              >
                <div className="flex flex-col items-start">
                  <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-gray-700">
                    Catalog Request
                  </span>
                  <span className="text-[9px] text-gray-400 uppercase tracking-wider font-medium">
                    {cart.length} item{cart.length !== 1 ? "s" : ""} selected
                  </span>
                </div>
                <div className="w-8 h-8 bg-[#004AAD] flex items-center justify-center relative">
                  <ShoppingCart size={15} className="text-white" />
                  {cart.length > 0 && (
                    <motion.span
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="absolute -top-1.5 -right-1.5 bg-white text-[#004AAD] text-[9px] font-black w-4 h-4 flex items-center justify-center border border-[#004AAD] shadow"
                    >
                      {cart.length}
                    </motion.span>
                  )}
                </div>
              </motion.button>
            </motion.div>

            {/* Live Chat */}
            <motion.div
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.15 }}
            >
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => togglePanel("chat")}
                className={cn(
                  "flex items-center gap-3 bg-white border px-4 py-2.5 shadow-lg transition-all",
                  activePanel === "chat"
                    ? "border-[#004AAD] shadow-xl"
                    : "border-gray-200 hover:border-[#004AAD]/30 hover:shadow-xl",
                )}
              >
                <div className="flex flex-col items-start">
                  <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-gray-700">
                    Live Chat
                  </span>
                  <span className="text-[9px] text-gray-400 uppercase tracking-wider font-medium">
                    Talk to our team
                  </span>
                </div>
                <div className="w-8 h-8 bg-[#004AAD] flex items-center justify-center">
                  <MessageSquare size={15} className="text-white" />
                </div>
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main trigger FAB */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => (isOpen ? closeAll() : setIsOpen(true))}
        className={cn(
          "relative flex items-center justify-center border shadow-xl transition-all duration-300",
          isOpen
            ? "bg-white border-gray-300"
            : "bg-[#004AAD] border-[#003a8c] hover:bg-[#003a8c]",
        )}
        style={{ width: 52, height: 52 }}
      >
        {/* Cart count badge */}
        {!isOpen && cart.length > 0 && (
          <motion.span
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="absolute -top-1.5 -right-1.5 bg-white text-[#004AAD] text-[9px] font-black w-5 h-5 flex items-center justify-center border border-[#004AAD] shadow z-10"
          >
            {cart.length}
          </motion.span>
        )}

        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div
              key="close"
              initial={{ opacity: 0, rotate: -90 }}
              animate={{ opacity: 1, rotate: 0 }}
              exit={{ opacity: 0, rotate: 90 }}
              transition={{ duration: 0.2 }}
            >
              <X size={20} className="text-gray-700" />
            </motion.div>
          ) : (
            <motion.div
              key="logo"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.2 }}
              className="relative w-7 h-7"
            >
              <Image
                src="/images/buildchem-small.png"
                alt="Buildchem"
                fill
                className="object-contain brightness-0 invert"
              />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>
    </div>
  );
}
