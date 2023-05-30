import { useRouter } from 'vue-router';
import { useUserStore } from '@/stores/user';

export default function useRouterAuth() {
  function getToken() : string | null {
    const storeUser = useUserStore();

    return storeUser.getToken();
  }

  function pushToHome() : void {
    const token = getToken();

    if (token) {
      const router = useRouter();
      router.push('/home');
    }
  }

  function pushToLogin(): void {
    const token = getToken();

    if (!token) {
      const router = useRouter();
      router.push('/');
    }
  }

  return { pushToHome, pushToLogin };
}
