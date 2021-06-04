import { some } from "../../../constants/constants";
import {
  defaultPaginationFilter,
  PaginationFilter,
} from "../../../models/pagination";

export interface IManagerProductFilter extends PaginationFilter {
  name?: string;
  status?: number;
  zone?: string;
  api?: string;
  method?: string;
  zoneId?: number;
  star?: string;
  fromPrice?: number;
  toPrice?: number;
  searchKey?: string;
  categoryid?: string;
}
export const defaultManagerProductFilter: IManagerProductFilter = {
  ...defaultPaginationFilter,
};
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
export const starOption = [
  {
    id: 0,
    name: "0 Sao",
  },
  {
    id: 1,
    name: "1 Sao",
  },
  {
    id: 2,
    name: "2 Sao",
  },
  {
    id: 3,
    name: "3 Sao",
  },
  {
    id: 4,
    name: "4 Sao",
  },
  {
    id: 5,
    name: "5 Sao",
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
    name: "Đã xoá",
  },
  {
    id: 0,
    name: "Không hoạt động",
  },
  {
    id: 1,
    name: "Hoạt động",
  },
];
