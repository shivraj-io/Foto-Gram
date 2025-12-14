import { useFetch } from './useFetch'

export function usePosts() {
  return useFetch('/posts')
}
