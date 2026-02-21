import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Send } from "lucide-react";
import { conversations, Conversation, ConversationMessage } from "@/data/mockCreatorData";
import { cn } from "@/lib/utils";

const PartnerMessages = () => {
  // Same conversation data viewed from the restaurant side
  const [convos, setConvos] = useState<Conversation[]>(
    conversations.map((c) => ({
      ...c,
      // Flip perspective: restaurant name becomes creator name for display
      restaurantName: c.messages[0]?.senderId === "restaurant"
        ? c.messages.find((m) => m.senderId === "creator")?.senderName || "Creator"
        : c.messages[0]?.senderName || "Creator",
    }))
  );
  const [selectedId, setSelectedId] = useState<string | null>(convos[0]?.id || null);
  const [newMessage, setNewMessage] = useState("");

  const selected = convos.find((c) => c.id === selectedId) || null;

  const handleSend = () => {
    if (!newMessage.trim() || !selectedId) return;

    const msg: ConversationMessage = {
      id: `m-${Date.now()}`,
      senderId: "restaurant",
      senderName: "Sarah Mitchell",
      text: newMessage.trim(),
      timestamp: new Date().toLocaleString(),
      read: true,
    };

    setConvos((prev) =>
      prev.map((c) =>
        c.id === selectedId
          ? { ...c, messages: [...c.messages, msg], lastMessage: msg.text, lastMessageTime: msg.timestamp }
          : c
      )
    );
    setNewMessage("");
  };

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-serif text-foreground">Messages</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 h-[calc(100vh-12rem)]">
        <Card className="md:col-span-1 overflow-hidden">
          <ScrollArea className="h-full">
            <div className="divide-y divide-border">
              {convos.map((convo) => (
                <button
                  key={convo.id}
                  onClick={() => setSelectedId(convo.id)}
                  className={cn(
                    "w-full text-left p-4 hover:bg-muted/50 transition-colors",
                    selectedId === convo.id && "bg-muted"
                  )}
                >
                  <p className="font-medium text-sm text-foreground">{convo.restaurantName}</p>
                  <p className="text-xs text-muted-foreground truncate mt-1">{convo.lastMessage}</p>
                </button>
              ))}
            </div>
          </ScrollArea>
        </Card>

        <Card className="md:col-span-2 flex flex-col overflow-hidden">
          {selected ? (
            <>
              <div className="p-4 border-b border-border">
                <p className="font-medium text-foreground">{selected.restaurantName}</p>
              </div>
              <ScrollArea className="flex-1 p-4">
                <div className="space-y-3">
                  {selected.messages.map((msg) => (
                    <div
                      key={msg.id}
                      className={cn(
                        "max-w-[80%] rounded-lg p-3",
                        msg.senderId === "restaurant"
                          ? "ml-auto bg-accent text-accent-foreground"
                          : "bg-muted text-foreground"
                      )}
                    >
                      <p className="text-sm">{msg.text}</p>
                      <p className={cn(
                        "text-[10px] mt-1",
                        msg.senderId === "restaurant" ? "text-accent-foreground/70" : "text-muted-foreground"
                      )}>
                        {msg.senderName} · {msg.timestamp}
                      </p>
                    </div>
                  ))}
                </div>
              </ScrollArea>
              <div className="p-4 border-t border-border flex gap-2">
                <Input
                  placeholder="Type a message..."
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSend()}
                />
                <Button size="icon" onClick={handleSend}>
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </>
          ) : (
            <CardContent className="flex-1 flex items-center justify-center text-muted-foreground text-sm">
              Select a conversation
            </CardContent>
          )}
        </Card>
      </div>
    </div>
  );
};

export default PartnerMessages;
