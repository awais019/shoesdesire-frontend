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

    const { create, signIn: _signIn } = useUser();

    function register(user: User) {
      return create(user);
    }

    async function signIn(email: string, password: string) {
      const { data, error } = await _signIn(email, password);
      token.value = data.value?.data.token;

      return { data, error };
    }

    return {
      register,
      signIn,
    };
  },
  { persist: true }
);
