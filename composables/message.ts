import useUserStore from "~/stores/user";

type Message = {
  id: string;
  conversationId: string;
  message: string;
  sender: string;
  created_at: string;
  updated_at: string;
};

type Conversation = {
  id: string;
  Participant: {
    id: string;
    first_name: string;
    last_name: string;
    image: string;
  };
  Message: Message | null;
  unreadCount: number;
};

export const useMessage = () => {
  const { baseURL } = useRuntimeConfig().public;
  const userStore = useUserStore();

  function getConversation(userId: string) {
    return useFetch<{
      message: string;
      data: Conversation;
    }>(`/messages/${userId}`, {
      headers: {
        "X-Auth-Token": userStore.token as string,
      },
      baseURL,
    });
  }

  function getMessages(conversationId: string) {
    return useFetch<{
      message: string;
      data: Message[];
    }>(`/messages/${conversationId}/messages`, {
      headers: {
        "X-Auth-Token": userStore.token as string,
      },
      baseURL,
    });
  }

  return { getConversation, getMessages };
};
