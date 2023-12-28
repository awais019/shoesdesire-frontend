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

export default defineStore("message", () => {
  const _conversation = ref<Conversation>();
  const _messages = ref<Message[]>([]);

  const userStore = useUserStore();
  const userId = computed(() => userStore.user?.id);

  const { getConversation: _getConversation, getMessages: _getMessages } =
    useMessage();

  async function getConversation() {
    if (!userId.value) return;
    const { data } = await _getConversation(userId.value);
    if (data.value) {
      _conversation.value = data.value.data;
    }
  }

  async function getMessages() {
    const { data } = await _getMessages(_conversation.value?.id as string);
    if (data.value) {
      _messages.value = data.value.data;
    }
  }

  function pushMessage(message: Message) {
    messages.value.push(message);
  }

  const conversation = computed(() => _conversation.value);
  const messages = computed(() => _messages.value);

  return {
    conversation,
    messages,
    getConversation,
    getMessages,
    pushMessage,
  };
});
