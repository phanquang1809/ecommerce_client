import { useQuery } from "@tanstack/react-query";
import { authApi } from "../apiServices";
// types/chat.ts

export interface Message {
  id: number;
  sender_id: number;
  content: string;
  created_at: string;
  read_at: string | null;
}

interface Conversation {
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

export const useConversations = () => {
  return useQuery<Conversation[]>({
    queryKey: ["conversations"],
    queryFn: getConversations,
    staleTime: 1000 * 60 * 10,
  });
};
export const sendMessage = async (payload: SendMessagePayload): Promise<Message> => {
  const res = await authApi.post(`/conversations/${payload.conversation_id}/messages`, payload);
  return res.data;
};
export const getMessages = async (conversationId: number): Promise<Message[]> => {
  const res = await authApi.get(`/conversations/${conversationId}/messages`);
  return res.data;
};
export const useMessages = (conversationId: number | null) => {
  return useQuery<Message[]>({
    queryKey: ["messages", conversationId],
    queryFn: () => getMessages(conversationId!),
    enabled: !!conversationId,
    staleTime: 1000 * 60 * 10,
  });
};