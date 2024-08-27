import { useSWR_API } from "../componets/useSWR_API";

export const GetCategories = () => {
   return useSWR_API("http://localhost:3977/categories");
}