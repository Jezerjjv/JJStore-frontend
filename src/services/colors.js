import { useSWR_API } from "../componets/useSWR_API";

export const GetColors = () => {
   return useSWR_API(`${process.env.REACT_APP_API}colors`);
}