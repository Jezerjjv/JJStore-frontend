import useSWR from "swr"

export const useSWR_API = (url) => {
  const fetcher = (url) => fetch(url).then(res => res.json());
  const a = useSWR(url, fetcher);
  return a;
}