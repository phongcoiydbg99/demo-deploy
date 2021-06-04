import { some, USER_ROLE } from "../../constants/constants";
import api from "../../utils/helpers/api";

export const actionGetAccountManager = (params?: some) => {
  return api({ method: "get", url: "/user/GetUserByRange", params });
};

export const actionGetProductManager = (params?: some) => {
  return api({
    method: "get",
    url: "Product/GetProductByCategoryIDbyRange",
    params,
  });
};
export const actionAddProduct = (data?: some) => {
  return api({ method: "post", url: "/Product/AddProductByStore", data });
};
export const actionUpdateProduct = (data?: some) => {
  if (localStorage.getItem(USER_ROLE)?.indexOf("Seller") !== -1) {
    return api({ method: "post", url: "/Product/UpdateProductByStore", data });
  } else {
    return api({ method: "post", url: "/Product/UpdateProductByAdmin", data });
  }
};
export const actionGetAllProduct = (params?: some) => {
  return api({
    method: "get",
    url: "/Category/CategoryChildList",
    params,
  });
};
export const actionProductInChild = (params?: some) => {
  return api({
    method: "get",
    url: "/Product/GetProductByCategoryIDbyRange",
    params,
  });
};

export const actionGetAllParentCategory = (params?: some) => {
  return api({
    method: "get",
    url: "/Category/CategoryAllParentList",
    params,
  });
};

export const actionGetCategoryAllChildList = (params?: some) => {
  return api({
    method: "get",
    url: "/Category/CategoryAllChildList",
    params,
  });
};

export const actionListBillManager = (params?: some) => {
  return api({
    method: "get",
    url: "/Bill/GetTransactionsStore",
    params,
  });
};

export const actionDeleteProduct = (data?: string) => {
  if (localStorage.getItem(USER_ROLE)?.indexOf("Seller") !== -1) {
    return api({
      method: "post",
      url: "/Product/DeleteProductByStore",
      data,
    });
  } else {
    return api({
      method: "post",
      url: "/Product/DeleteProductByAdmin",
      data,
    });
  }
 
};

export const actionSetStatusCancel = (params?: some) => {
  return api({
    method: "post",
    url: "/Bill/SetStatusCancel",
    params,
  });
};

export const actionDeleteBillFromStore = (params?: some) => {
  return api({
    method: "get",
    url: "/BillProduct/CancelOrder",
    params,
  });
};
export const actionApproveStore = (data?: string) => {
  return api({
    method: "post",
    url: "/Store/AproveStoreByAdmin",
    data,
  });
};
export const actionGetListStore = (params?: some) => {
  return api({
    method: "get",
    url: "/Store/GetStoreByRange",
    params,
  });
};
export const actionDeleteStore = (data?: string) => {
  return api({
    method: "post",
    url: "/Store/BanStoreByAdmin",
    data,
  });
};
export const actionGrantSaler = (data?: string) => {
  return api({
    method: "post",
    url: "/api/authenticate/admin/GrantSellerPermisson",
    data,
  });
};
export const actionRemoveSaler = (data?: string) => {
  return api({
    method: "post",
    url: "/api/authenticate/admin/RemoveSellerPermisson",
    data,
  });
};
export const actionGetDataColumn = (params?: some) => {
  return api({
    method: "get",
    url: "/Bill/GetTransactionsStoreColumnGraph",
    params,
  });
};
export const actionGetDataPie = (params?: some) => {
  return api({
    method: "get",
    url: "/Bill/GetTransactionsStoreDonutGraph",
    params,
  });
};
