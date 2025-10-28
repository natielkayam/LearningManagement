import { useLoadingContext } from "../LoadingProvider/LoadingContext";

export function useLoading() {
  const { showLoading, hideLoading } = useLoadingContext();

  return { showLoading, hideLoading };
}
