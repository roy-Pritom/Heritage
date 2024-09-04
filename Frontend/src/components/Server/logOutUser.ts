import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { removeFromLocalStorage } from "../UtlitiFunction/localStorage";
import { deleteCookies } from "./deleteCookies";


export const logoutUser = (router: AppRouterInstance) => {
   removeFromLocalStorage('token');
   deleteCookies(['token', 'token']);
   router.push('/');
   router.refresh();
};