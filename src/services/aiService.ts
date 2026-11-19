import api, { errorMessage } from "./api";
import type { ApiResponse } from "../types";

export interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

export const sendAiMessage = async (
  message: string,
  history: ChatMessage[] = []
): Promise<string> => {
  try {
    const res = await api.post<ApiResponse<{ reply: string }>>("/ai/chat", {
      message,
      history,
    });
    return res.data.data.reply;
  } catch (err) {
    throw new Error(errorMessage(err));
  }
};