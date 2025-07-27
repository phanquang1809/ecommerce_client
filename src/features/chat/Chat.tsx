import { useCallback, useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { MessagesSquare, SquareChevronDown, UserRound } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Conversation,
  Message,
  sendMessage,
  useConversations,
  useMessages,
} from "@/services/website/chatServices";
import useUserStore from "@/store/userStore";
import echo from "@/lib/echo"; // nhớ import echo
import { useQueryClient } from "@tanstack/react-query";
import { AvatarImage } from "@radix-ui/react-avatar";
import { formatCurrency, formatDay, formatTime } from "@/utils/format";
import { ChatInput } from "./ChatInput";
import { Link } from "react-router-dom";
import useChatStore from "@/store/chatStore";
export const Chat = () => {
  const { user } = useUserStore();
 const { open, setOpen, selectedConversationId, setSelectedConversationId } = useChatStore();

  const { data: conversations = [], isLoading } = useConversations(user);
  const queryClient = useQueryClient();
  const unReadMessages = conversations.filter(
    (c) => c.last_message &&!c.last_message?.read_at && c.last_message?.sender_id !== user?.id
  ).length;

 
  const { data: conversation } = useMessages(selectedConversationId);

  const selectedConversation = conversations.find(
    (c) => c.id === selectedConversationId
  );
  const onNewMessage = useCallback(
    (e: { message: Message; conversation_id: number }) => {
      const isCurrentChat = selectedConversationId === e.conversation_id;
      const isFromOther = e.message.sender_id !== user?.id;

      queryClient.setQueryData<Conversation>(
        ["messages", e.conversation_id],
        (old) => {
          if (!old) return old;
          const existed = old.messages?.some((m) => m.id === e.message.id);
          if (existed) return old;

          return {
            ...old,
            messages: [...(old.messages || []), e.message],
            last_message: {
              ...e.message,
              read_at: isFromOther ? new Date().toISOString() : null,
            },
          };
        }
      );

      queryClient.setQueryData<Conversation[]>(
        ["conversations"],
        (oldConvs) => {
          if (!oldConvs) return oldConvs;
          return oldConvs.map((conv) => {
            if (conv.id !== e.conversation_id) return conv;
            return {
              ...conv,
              last_message: {
                ...e.message,
                read_at:
                  isCurrentChat && isFromOther
                    ? new Date().toISOString()
                    : null,
              },
            };
          });
        }
      );

      // Nếu đang mở đúng cuộc trò chuyện, cuộn xuống cuối
      if (isCurrentChat) scrollToBottom();
    },
    [queryClient, selectedConversationId, user]
  );

  const sortedConversations = [...conversations].sort((a, b) => {
    const aTime = a.last_message?.created_at
      ? new Date(a.last_message.created_at).getTime()
      : 0;
    const bTime = b.last_message?.created_at
      ? new Date(b.last_message.created_at).getTime()
      : 0;

    return bTime - aTime;
  });

  useEffect(() => {
    if (!user) return;

    const channel = echo.private(`user.${user.id}`);
    channel.listen(".MessageSent", onNewMessage);
    return () => {
      echo.leave(`user.${user.id}`);
    };
  }, [user, onNewMessage]);

  useEffect(() => {
    if (!user || !selectedConversationId) return;

    const channel = echo.private(`chat.${selectedConversationId}`);
    channel.listen(".MessageSent", onNewMessage);

    return () => {
      echo.leave(`chat.${selectedConversationId}`);
    };
  }, [user, onNewMessage, selectedConversationId]);

  const [globalOnlineIds, setGlobalOnlineIds] = useState<number[]>([]);
  console.log(conversations);

  useEffect(() => {
    if (!user) return;

    const platformChannel = echo.join("chat.presence.platform");

    platformChannel.here((users: { id: number; name: string }[]) => {
      const onlineIds = users.map((u: { id: number; name: string }) => u.id);
      setGlobalOnlineIds(onlineIds); // lưu vào state
    });

    platformChannel.joining((joinedUser: { id: number; name: string }) => {
      setGlobalOnlineIds((prev) =>
        prev.includes(joinedUser.id) ? prev : [...prev, joinedUser.id]
      );
    });

    platformChannel.leaving((leftUser: { id: number; name: string }) => {
      setGlobalOnlineIds((prev) => prev.filter((id) => id !== leftUser.id));
    });

    return () => {
      echo.leave("chat.presence.platform");
    };
  }, [user]);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView();
  };
  const handleSendMessage = useCallback(
    async (text: string) => {
      if (!text.trim() || !selectedConversationId) return;
      try {
        await sendMessage({
          conversation_id: selectedConversationId,
          content: text.trim(),
        });
        scrollToBottom();
      } catch (err) {
        console.error("Lỗi gửi tin nhắn", err);
      }
    },
    [selectedConversationId]
  );

  useEffect(() => {
    if (!conversation || !conversation.id) return;

    scrollToBottom();

    queryClient.setQueryData<Conversation[] | undefined>(
      ["conversations"],
      (oldConvs) => {
        if (!oldConvs) return oldConvs;

        return oldConvs.map((conv) => {
          if (conv.id !== conversation.id) return conv;

          return {
            ...conv,
            last_message: conversation.last_message ?? conv.last_message,
            messages: conv.messages, // hoặc giữ nguyên
            user1: conv.user1,
            user2: conv.user2,
            id: conv.id,
          };
        });
      }
    );
  }, [conversation, queryClient]);

  const groupMessagesByDate = (
    messages: Message[]
  ): Record<string, Message[]> => {
    return messages.reduce((acc, msg) => {
      const label = formatDay(msg.created_at);

      if (!acc[label]) {
        acc[label] = []; // lỗi xảy ra ở đây nếu không có kiểu
      }

      acc[label].push(msg);
      return acc;
    }, {} as Record<string, Message[]>);
  };
const handleClose = () => {
  setOpen(false);
};
  if (isLoading) return null;
  return (
    <>
      {!open && (
        <Button
          size="lg"
          className="!bg-white text-blue-600 border !shadow-2xl fixed bottom-0 right-2 !rounded-b-none z-50"
          onClick={() => setOpen(true)}
        >
          <MessagesSquare className="size-6 mr-1" />
          Chat{unReadMessages > 0 && "(" + unReadMessages + ")"}
        </Button>
      )}

      {open && (
        <div className="fixed bottom-0 right-2 w-[600px] h-[500px] bg-white shadow-2xl border rounded-t flex flex-col z-50 overflow-hidden">
          {/* Header */}
          <div className="flex justify-between items-center px-4 py-2 border-b">
            <div className="font-semibold text-lg text-blue-600">Chat</div>
            <SquareChevronDown
              className="w-5 h-5 cursor-pointer"
              onClick={handleClose}
            />
          </div>

          <div className="flex flex-1 overflow-hidden h-full">
            {/* Danh sách người dùng */}
            <ScrollArea className="w-1/3 border-r h-full">
              {sortedConversations.map((conversation) => {
                console.log("🔵 Conversation:", conversation);

                const partner =
                  conversation.user1.id === user?.id
                    ? conversation.user2
                    : conversation.user1;
                const isOnline = globalOnlineIds.includes(partner.id);
                return (
                  <div
                    key={conversation.id}
                    onClick={() => {
                      setSelectedConversationId(conversation.id);
                    }}
                    className={cn(
                      "p-2 cursor-pointer hover:bg-gray-100",
                      selectedConversationId === conversation.id &&
                        "bg-gray-100"
                    )}
                  >
                    <div className="flex items-start gap-1">
                      <Avatar className="w-10 h-10 border">
                        <AvatarImage src={partner?.avatar} />
                        <AvatarFallback className="bg-blue-600 text-white">
                          <UserRound className="h-6 w-6" />
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex flex-col w-full">
                        <div className="text-xs flex items-center justify-between w-full">
                          <span>{partner?.user_name}</span>
                          {isOnline ? (
                            <span className=" text-green-500">online</span>
                          ) : (
                            <span className=" text-gray-500">offline</span>
                          )}
                        </div>
                        <span
                          className={cn(
                            "text-xs line-clamp-1",
                            conversation.last_message&&
                            !conversation.last_message?.read_at &&
                              conversation.last_message?.sender_id !== user?.id
                              ? "font-semibold"
                              : "text-gray-500"
                          )}
                        >
                          {conversation.last_message?.content ??
                            "Chưa có tin nhắn"}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </ScrollArea>

            {/* Nội dung chat */}
            <div className="w-2/3 flex flex-col justify-between bg-gray-50 h-full">
              {selectedConversation ? (
                // ✅ Khi có đoạn chat => hiển thị ScrollArea và tin nhắn
                <>
                  <ScrollArea className="flex-1 px-4 py-3 space-y-3 h-[70%]">
                    <div className="space-y-1">
                      {Object.entries(
                        groupMessagesByDate(conversation?.messages || [])
                      ).map(([dateLabel, msgs]) => (
                        <div key={dateLabel}>
                          <div className="text-center text-xs text-gray-500 mb-2">
                            {dateLabel}
                          </div>
                          {msgs.map((msg, index) => {
                            const isMe = msg.sender_id === user?.id;
                            const prevMsg = msgs[index - 1];
                            const isSameSender =
                              prevMsg?.sender_id === msg.sender_id;
                            const marginTop = isSameSender ? "mt-2" : "mt-4";
                            const meta = msg.meta;

                            return (
                              <div
                                key={msg.id}
                                className={`flex flex-col gap-1 ${marginTop} ${
                                  isMe ? "items-end" : "items-start"
                                }`}
                              >
                                {meta?.type === "product" && (
                                  <Link
                                    to={meta.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="rounded px-2 py-1 flex gap-1 items-start bg-white shadow max-w-[80%]"
                                  >
                                    <img
                                      src={meta.image}
                                      alt={meta.name}
                                      className="w-12 h-12 rounded object-cover"
                                    />
                                    <div className="flex flex-col">
                                      <span className="text-xs font-medium">
                                        {meta.name}
                                      </span>
                                      <span className="text-xs">
                                        {formatCurrency(meta.price)}
                                      </span>
                                    </div>
                                  </Link>
                                )}

                                <div
                                  className={`px-2 py-1 rounded-md max-w-[80%] text-sm shadow flex flex-col ${
                                    isMe
                                      ? "bg-blue-50 text-blue-800 rounded-br-none items-end"
                                      : "bg-white text-gray-800 rounded-bl-none"
                                  }`}
                                >
                                  <span>{msg.content}</span>
                                  <span className="text-xs text-gray-400">
                                    {formatTime(msg.created_at)}
                                  </span>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      ))}
                      <div ref={messagesEndRef} />
                    </div>
                  </ScrollArea>

                  {/* Ô nhập */}
                  {selectedConversationId && (
                    <ChatInput onSend={handleSendMessage} />
                  )}
                </>
              ) : (
                <div className="flex flex-1 items-center justify-center flex-col gap-2">
                  <img
                    src="/image/spark-icon.svg"
                    alt="cat_may_choi_game"
                    className="w-15 h-auto"
                  />
                  <div className="text-md text-gray-500">
                    Bắt đầu chat ngay!
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};
