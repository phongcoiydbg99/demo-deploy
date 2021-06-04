import { some } from "../../../constants/constants";
import {
  defaultPaginationFilter,
  PaginationFilter,
} from "../../../models/pagination";

export interface IManagerTransactionFilter extends PaginationFilter {
  name?: string;
  status?: number;
  zone?: string;
  api?: string;
  method?: string;
  zoneId?: number;
  ShipTime?: string;
  fromDate?: string;
  toDate?: string;
}
export const defaultManagerTransactionFilter: IManagerTransactionFilter = { ...defaultPaginationFilter };
export const setApiParams = (params: some) => {
  let paramsUrl: string = "?";
  if (params.zone) {
    paramsUrl = paramsUrl.concat("zone=", params.zone, "&");
  }
  if (params.status !== undefined) {
    paramsUrl = paramsUrl.concat("status=", params.status, "&");
  }
  if (params.api) {
    paramsUrl = paramsUrl.concat("api=", params.api, "&");
  }
  if (params.page) {
    paramsUrl = paramsUrl.concat("page=", params.page, "&");
  }
  if (params.size) {
    paramsUrl = paramsUrl.concat("size=", params.size, "&");
  }
  if (params.method) {
    paramsUrl = paramsUrl.concat("method=", params.method, "&");
  }
  return paramsUrl;
};
export const methodOption = [
  {
    id: 0,
    name: "GET",
  },
  {
    id: 1,
    name: "POST",
  },
  {
    id: 2,
    name: "PUT",
  },
  {
    id: 3,
    name: "DELETE",
  },
];
export interface IApiUpdateBox extends PaginationFilter {
  name?: string;
  status?: number;
  id?: number;
  zoneId?: number;
  zone?: string;
  description?: string;
  code?: string;
}
export interface IApiUpdate {
  name?: string;
  status?: number;
  id?: number;
  zoneId?: number;
  description?: string;
  code?: string;
  zoneName?: string;
  api?: string;
  method?: string;
  page?: number;
  size?: number;
}

export const defaultApiUpdateBox: IApiUpdateBox = {
  ...defaultPaginationFilter,
};
export interface dataType {
  api: string;
  id: number;
  method: string;
  status: number;
  zone: {
    id: number;
    name: string;
  };
  description: string;
  permissions: [
    {
      name: string;
      api: string;
      id: number;
      zone: {
        id: number;
        name: string;
      };
    }
  ];
}
export interface IAssignPermissionApi {
  apiId?: number;
  permissionId?: number;
}
export interface IRevokePermissionApi {
  apiId?: number;
  permissionId?: number;
}
interface Item {
  api: string;
  id: number;
  method: string;
  status: number;
  zone: {
    id: number;
    name: string;
  };
  description: string;
  permissions: [
    {
      name: string;
      api: string;
      id: number;
      zone: {
        id: number;
        name: string;
      };
    }
  ];
}
export interface Payload {
  total?: number;
  items: Item[];
}
export const statusOption = [
  {
    id: -1,
    name: "Tất cả",
  },
  {
    id: 0,
    name: "Chưa giao",
  },
  {
    id: 1,
    name: "Đã giao",
  },
  {
    id: 2,
    name: "Đã hủy",
  },
];
