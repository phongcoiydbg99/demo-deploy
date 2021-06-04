import * as actions from "../../constants/actions";
import { some } from "../../constants/constants";
import api from "../../utils/helpers/api";

export const actionChangeLanguage = (lang: string) => {
  return {
    type: actions.CHANGE_LANGUAGE,
    payload: lang,
  };
};
export const actionShowLoading = () => ({ type: actions.SHOW_LOADING });
export const actionHideLoading = () => ({ type: actions.HIDE_LOADING });
export const actionUpdateProfile = (data: some) => ({
  type: actions.UPDATE_PROFILE,
  payload: data,
});
export const actionLogin = (data: some) => {
  return api({ method: "post", url: "/api/authenticate/login", data });
};
export const actionGetProfile = (params?: some) => {
  return api({ method: "get", url: "/csp/tickets/customer-info", params });
};
export const actionRegister = (data: some) => {
  return api({ method: "post", url: "/api/authenticate/register", data });
};
export const actionChangeInfo = (data: some) => {
  return api({ method: "post", url: "/api/authenticate/ChangeInfoAdmin", data });
};
export const actionDeleteAccountAdmin = (data: string) => {
  return api({ method: "delete", url: "/api/authenticate/DeleteUserAdmin", data });
};