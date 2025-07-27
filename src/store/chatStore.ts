import { create } from "zustand";

interface ChatStore {
  open: boolean;
  selectedConversationId: number | null;
  setOpen: (open: boolean) => void;
  setSelectedConversationId: (id: number | null) => void;
  openChatWithConversationId: (id: number) => void;
}

const useChatStore = create<ChatStore>((set) => ({
  open: false,
  selectedConversationId: null,
  setOpen: (open) => set({ open }),
  setSelectedConversationId: (id) => set({ selectedConversationId: id }),
  openChatWithConversationId: (id) =>
    set({ open: true, selectedConversationId: id }),
}));

export default useChatStore;
