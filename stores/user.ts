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

    const { create } = useUser();

    function register(user: User) {
      return create(user);
    }

    return {
      register,
    };
  },
  { persist: true }
);
