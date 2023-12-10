type User = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  address: string;
  city: string;
  state: string;
};

export default defineStore(
  "user",
  () => {
    const token = ref<string | null>(null);
    const user = ref<{
      id: string;
      firstName: string;
      lastName: string;
      email: string;
    } | null>(null);

    const { create, signIn: _signIn, me: _me } = useUser();

    function register(user: User) {
      return create(user);
    }

    async function signIn(email: string, password: string) {
      const { data, error } = await _signIn(email, password);
      token.value = data.value?.data.token;
      me();
      return { data, error };
    }

    async function me() {
      const { data, error } = await _me();

      if (data.value?.data) {
        user.value = data.value.data;
      }
      return { data, error };
    }

    const isLoggedIn = computed(() => !!token.value);

    return {
      token,
      user,
      isLoggedIn,
      register,
      signIn,
    };
  },
  { persist: true }
);
