import { useSWR_API } from "../componets/useSWR_API";

export const GetCategories = () => {
   return useSWR_API(`${process.env.REACT_APP_API}categories`);
}