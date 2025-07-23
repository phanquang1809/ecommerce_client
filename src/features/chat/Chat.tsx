import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  MessagesSquare,
  Send,
  SquareChevronDown,
  UserRound,
} from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Message,
  sendMessage,
  useConversations,
  useMessages,
} from "@/services/website/chatServices";
import useUserStore from "@/store/userStore";
import echo from "@/lib/echo"; // nhớ import echo
import { useQueryClient } from "@tanstack/react-query";
import { AvatarImage } from "@radix-ui/react-avatar";
import {  formatDay, formatTime } from "@/utils/format";
export const Chat = () => {
  const { user } = useUserStore();
  const [open, setOpen] = useState(false);
  const [onlineMap, setOnlineMap] = useState<Record<number, number[]>>({});
  const [messageInput, setMessageInput] = useState("");

  const { data: conversations = [], isLoading } = useConversations();

  const [selectedConversationId, setSelectedConversationId] = useState<
    number | null
  >(null);
  const { data: messages = [] } = useMessages(selectedConversationId);

  useEffect(() => {
    if (!user || conversations.length === 0) return;

    const joinedChannels: string[] = [];

    conversations.forEach((conversation) => {
      const channelName = `chat.presence.${conversation.id}`;
      const channel = echo.join(channelName);
      joinedChannels.push(channelName);

      channel.here((users: any[]) => {
        setOnlineMap((prev) => ({
          ...prev,
          [conversation.id]: users.map((u) => parseInt(u.id)), // ép kiểu chắc chắn
        }));
      });

      channel.joining((user: any) => {
        setOnlineMap((prev) => {
          const current = prev[conversation.id] || [];
          if (current.includes(user.id)) return prev; // tránh trùng
          return {
            ...prev,
            [conversation.id]: [...current, user.id],
          };
        });
      });

      channel.leaving((user: any) => {
        setOnlineMap((prev) => {
          const current = prev[conversation.id] || [];
          return {
            ...prev,
            [conversation.id]: current.filter((id) => id !== user.id),
          };
        });
      });
    });

    return () => {
      joinedChannels.forEach((channelName) => {
        echo.leave(channelName);
      });
    };
  }, [user, conversations]);

  useEffect(() => {
    console.log("🔵 Online users map:", onlineMap);
  }, [onlineMap]);
  const selectedConversation = conversations.find(
    (c) => c.id === selectedConversationId
  );

  const queryClient = useQueryClient();
  useEffect(() => {
    if (!user) return;

    const channel = echo.private(`user.${user.id}`);

    channel.listen(".MessageSent", () => {
      console.log("📨 Tin nhắn mới:");
      queryClient.invalidateQueries({ queryKey: ["conversations"] });
    });

    return () => {
      echo.leave(`user.${user.id}`);
    };
  }, [user]);
  useEffect(() => {
    if (!user || !selectedConversationId) return;

    const channel = echo.private(`chat.${selectedConversationId}`);

    channel.listen(".MessageSent", () => {
      queryClient.invalidateQueries({
        queryKey: ["messages", selectedConversationId],
      });
      queryClient.invalidateQueries({ queryKey: ["conversations"] });
    });

    return () => {
      echo.leave(`chat.${selectedConversationId}`);
    };
  }, [user, selectedConversationId]);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView();
  };
  const handleSendMessage = async () => {
    if (!messageInput.trim() || !selectedConversationId) return;
    try {
      await sendMessage({
        conversation_id: selectedConversationId,
        content: messageInput.trim(),
      });
      queryClient.invalidateQueries({
        queryKey: ["messages", selectedConversationId],
      });
      setMessageInput("");
      scrollToBottom();
    } catch (err) {
      console.error("Lỗi gửi tin nhắn", err);
    }
  };
  useEffect(() => {
    scrollToBottom();
  }, [messages]);
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
          Chat
        </Button>
      )}

      {open && (
        <div className="fixed bottom-0 right-2 w-[600px] h-[500px] bg-white shadow-2xl border rounded-t flex flex-col z-50 overflow-hidden">
          {/* Header */}
          <div className="flex justify-between items-center px-4 py-2 border-b">
            <div className="font-semibold text-lg text-blue-600">Tin nhắn</div>
            <SquareChevronDown
              className="w-5 h-5 cursor-pointer"
              onClick={() => setOpen(false)}
            />
          </div>

          <div className="flex flex-1 overflow-hidden h-full">
            {/* Danh sách người dùng */}
            <ScrollArea className="w-1/3 border-r h-full">
              {conversations.map((conversation) => {
                const partner =
                  conversation.user1.id === user?.id
                    ? conversation.user2
                    : conversation.user1;
                const isOnline = onlineMap[conversation.id]?.includes(
                  partner.id
                );
                return (
                  <div
                    key={conversation.id}
                    onClick={() => {
                      setSelectedConversationId(conversation.id);
                    }}
                    className={cn(
                      "px-4 py-2 cursor-pointer hover:bg-gray-100",
                      selectedConversationId === conversation.id &&
                        "bg-gray-100"
                    )}
                  >
                    <div className="flex items-start gap-2">
                      <Avatar className="w-8 h-8 !rounded">
                        <AvatarImage src={partner?.avatar} />
                        <AvatarFallback className="bg-blue-600 text-white !rounded">
                          <UserRound className="h-4 w-4" />
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
                        <span className="text-xs text-gray-500 line-clamp-1">
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
              <ScrollArea className="flex-1 px-4 py-3 space-y-3 h-[70%]">
                {selectedConversation ? (
                  <div className="space-y-1">
                    {Object.entries(groupMessagesByDate(messages)).map(
                      ([dateLabel, msgs]) => (
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

                            return (
                              <div
                                key={msg.id}
                                className={`flex gap-2 items-end ${marginTop} ${
                                  isMe ? "justify-end" : "justify-start"
                                }`}
                              >
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
                      )
                    )}
                    <div ref={messagesEndRef} />
                  </div>
                ) : (
                  <div className="h-[430px] flex items-center justify-center text-sm text-gray-500">
                    Bắt đầu trả lời người mua!
                  </div>
                )}
              </ScrollArea>

              {/* Ô nhập */}
              {selectedConversationId && (
                <div className="border-t bg-white shrink-0">
                  <Input
                    placeholder="Nhập nội dung tin nhắn..."
                    className="text-sm resize-none border-0 shadow-none !ring-0"
                    value={messageInput}
                    onChange={(e) => setMessageInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        handleSendMessage();
                      }
                    }}
                  />
                  <div className="flex items-center justify-end px-2 py-2 space-x-2">
                    <Send
                      className={cn(
                        "size-4",
                        messageInput.trim()
                          ? "text-blue-600 cursor-pointer"
                          : "text-gray-400"
                      )}
                      onClick={handleSendMessage}
                    />
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
