import { QueryClient, useQuery } from "@tanstack/react-query";
import { authApi } from "../apiServices";
import { User } from "@/types";
import useChatStore from "@/store/chatStore";
// types/chat.ts

export interface Message {
  id: number;
  sender_id: number;
  content: string;
  created_at: string;
  read_at: string | null;
  meta: {
    type: string;
    id: number;
    url: string;
    name: string;
    price: number;
    image: string;
  };
}

export interface Conversation {
  id: number;
  user1: { id: number; user_name: string, avatar: string };
  user2: { id: number; user_name: string, avatar: string };
  last_message: Message | null;
  messages: Message[]; // <-- bắt buộc có để hiển thị được đoạn chat
}
interface SendMessagePayload {
  conversation_id: number;
  content: string;
}

export const getConversations = async (): Promise<Conversation[]> => {
  const res = await authApi.get("/conversations");
  return res.data;
};

export const useConversations = ( user: User | null) => {
  return useQuery<Conversation[]>({
    queryKey: ["conversations"],
    queryFn: getConversations,
    staleTime: 1000 * 60 * 10,
    enabled: !!user,
  });
};
export const sendMessage = async (payload: SendMessagePayload): Promise<Message> => {
  const res = await authApi.post(`/conversations/${payload.conversation_id}/messages`, payload);
  return res.data;
};
export const getMessages = async (conversationId: number): Promise<Conversation> => {
  const res = await authApi.get(`/conversations/${conversationId}/messages`);
  return res.data;
};
export const getOrCreateConversation = async (user_id: number): Promise<Conversation> => {
  const res = await authApi.post("/conversations",{user_id});
  return res.data;
};
export const useMessages = (conversationId: number | null) => {
  return useQuery<Conversation>({
    queryKey: ["messages", conversationId],
    queryFn: () => getMessages(conversationId!),
    enabled: !!conversationId,
    staleTime: 1000 * 60 * 10,
  });
};
export const markMessageAsRead = async (messageId: number): Promise<Message> => {
  const res = await authApi.post(`/messages/${messageId}/read`);
  return res.data;
};
export const handleChatWithShop = async (
  userId: number,
  queryClient: QueryClient
) => {
  try {
    const conv = await getOrCreateConversation(userId);
    queryClient.setQueryData<Conversation[]>(["conversations"], (oldConvs) => {
      if (!oldConvs) return [conv];
      const existed = oldConvs.find((c) => c.id === conv.id);
      if (existed) return oldConvs;
      return [conv, ...oldConvs];
    });
    useChatStore.getState().openChatWithConversationId(conv.id);
  } catch (error) {
    console.error("Không thể chat với shop:", error);
  }
};