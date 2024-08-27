import { useSWR_API } from "../componets/useSWR_API";

export const GetColors = () => {
   return useSWR_API("http://localhost:3977/colors");
}