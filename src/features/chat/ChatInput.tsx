import { Input } from "@/components/ui/input";
import { Send } from "lucide-react";
import { cn } from "@/lib/utils";
import { memo, useState, useCallback } from "react";

interface ChatInputProps {
  onSend: (message: string) => void;
}

const ChatInputComponent = ({ onSend }: ChatInputProps) => {
  const [message, setMessage] = useState("");

  const handleSend = useCallback(() => {
    if (!message.trim()) return;
    onSend(message.trim());
    setMessage("");
  }, [message, onSend]);

  return (
    <div className="border-t bg-white shrink-0">
      <Input
        placeholder="Nhập nội dung tin nhắn..."
        className="text-sm resize-none border-0 shadow-none !ring-0"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") handleSend();
        }}
      />
      <div className="flex items-center justify-end px-2 py-2 space-x-2">
        <Send
          className={cn(
            "size-4",
            message.trim() ? "text-blue-600 cursor-pointer" : "text-gray-400"
          )}
          onClick={handleSend}
        />
      </div>
    </div>
  );
};

export const ChatInput = memo(ChatInputComponent);
