import { Typography } from "@material-ui/core";
import queryString from "query-string";
import React from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router";
import { RouteComponentProps, withRouter } from "react-router-dom";
import { GREY_600 } from "../../../../assets/theme/colors";
import { some, SUCCESS_CODE, USER_ROLE } from "../../../../constants/constants";
import { formatter } from "../../../../utils/helpers/helpers";
import { Row } from "../../../common/Elements";
import TableCustom from "../../../common/TableCustom";
import { AppState } from "../../../rootReducer";
import DeleteDialog from "../../components/DeleteDialog";
import HeaderManagement from "../../components/HeaderManagement";
import "../../Management.scss";
import { actionGetProductManager } from "../../managerAction";
import {
  defaultManagerProductFilter,
  IManagerProductFilter,
} from "../../ManagerProduct/utils";
import ActionProductDialog from "../components/ActionProductDialog";
import Filter from "../components/Filter";

function mapStateToProps(state: AppState) {
  return {
    profile: state.system.profile,
  };
}
interface Props extends ReturnType<typeof mapStateToProps> {}
const ManagerProduct: React.FC<RouteComponentProps<any> & Props> = (props) => {
  const { profile } = props;
  const adminRole = localStorage.getItem(USER_ROLE)?.indexOf("Admin") !== -1;
  const [dataProductManager, setDataProductManager] = React.useState<some>();
  const history = useHistory();
  const [filter, setFilter] = React.useState<IManagerProductFilter>(
    defaultManagerProductFilter
  );
  const updateQueryParams = React.useCallback(() => {
    if (window.location.search) {
      const filterParams = queryString.parse(
        window.location.search
      ) as unknown as any;
      setFilter({
        ...filterParams,
        page: parseInt(`${filterParams.page}`, 10),
        size: parseInt(`${filterParams.size}`, 10),
      });
    } else {
      history.replace({
        search: queryString.stringify(defaultManagerProductFilter),
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [history, window.location.search]);

  React.useEffect(() => {
    updateQueryParams();
  }, [updateQueryParams]);

  const fetchListProductManager = async () => {
    try {
      const res: some = await actionGetProductManager({
        ...filter,
        StoreID: adminRole ? undefined : profile?.userInfo?.store?.id,
        // ...filters,
      });
      if (res?.code === SUCCESS_CODE) {
        setDataProductManager(res);
      } else {
      }
    } catch (error) {}
  };

  React.useEffect(() => {
    fetchListProductManager(); // eslint-disable-next-line
  }, [filter]);

  const columns = [
    {
      width: 80,
      styleHeader: { color: GREY_600 },
      dataIndex: "name",
      render: (record: any) => {
        return (
          <Row>
            <img
              style={{ width: "100%" }}
              src={
                (record?.images && record?.images[0]) ||
                "https://www.événementiel.net/wp-content/uploads/2014/02/default-placeholder.png"
              }
              alt={record?.name}
            />
          </Row>
        );
      },
    },
    {
      title: "IDS_CHAT_NAME",
      dataIndex: "name",
      styleHeader: { color: GREY_600 },
      render: (record: any) => {
        return (
          <p
            // variant="inherit"
            style={{
              width: 150,
              overflow: "hidden",
              whiteSpace: "nowrap",
              textOverflow: "ellipsis",
            }}
          >
            {record?.name}
          </p>
        );
      },
    },
    {
      title: "IDS_CHAT_PRICE",
      dataIndex: "price",
      styleHeader: { color: GREY_600 },
      render: (record: any) => {
        return (
          <Typography
            style={{
              fontSize: 12,
            }}
          >
            {formatter(record.price)}
          </Typography>
        );
      },
    },
    {
      title: "IDS_CHAT_COLOR",
      dataIndex: "color",
      styleHeader: { color: GREY_600 },
    },
    {
      title: "IDS_CHAT_SIZE",
      dataIndex: "size",
      styleHeader: { color: GREY_600 },
    },
    {
      title: "IDS_CHAT_DETAIL",
      dataIndex: "detail",
      styleHeader: { color: GREY_600 },
      render: (record: any) => {
        return (
          <p
            // variant="inherit"
            style={{
              width: 100,
              overflow: "hidden",
              whiteSpace: "nowrap",
              textOverflow: "ellipsis",
            }}
          >
            {record?.detail}
          </p>
        );
      },
    },
    {
      title: "IDS_CHAT_DEACRIPTION",
      dataIndex: "description",
      styleHeader: { color: GREY_600, width: 100 },
      style: { width: 100 },
      render: (record: any) => {
        return (
          <p
            // variant="inherit"
            style={{
              width: 100,
              overflow: "hidden",
              whiteSpace: "nowrap",
              textOverflow: "ellipsis",
            }}
          >
            {record?.description}
          </p>
        );
      },
    },
    {
      title: "IDS_CHAT_DISCOUNT",
      dataIndex: "discount",
      styleHeader: { color: GREY_600 },
    },
    {
      title: "IDS_CHAT_QUANLITY",
      dataIndex: "quanlity",
      styleHeader: { color: GREY_600 },
    },
    {
      title: "IDS_CHAT_ADDEDTIME",
      dataIndex: "addedTime",
      styleHeader: { color: GREY_600 },
      render: (record: any) => {
        let date = new Date(record.addedTime);
        return (
          <Typography
            style={{
              fontSize: 12,
            }}
          >
            {date.toLocaleString()}
          </Typography>
        );
      },
    },
    {
      title: "IDS_CHAT_LASTMODIFY",
      dataIndex: "lastModify",
      styleHeader: { color: GREY_600 },
      render: (record: any) => {
        let date = new Date(record.lastModify);
        return (
          <Typography
            style={{
              fontSize: 12,
            }}
          >
            {date.toLocaleString()}
          </Typography>
        );
      },
    },
    {
      title: "IDS_CHAT_ACTION",
      dataIndex: "id",
      width: 300,
      styleHeader: { color: GREY_600, textAlign: "center" },
      render: (record: any) => {
        return (
          <Row className="action-container" key={record?.id}>
            <ActionProductDialog
              item={record}
              fetchData={fetchListProductManager}
            />
            <DeleteDialog item={record} fetchData={fetchListProductManager} />
          </Row>
        );
      },
    },
  ];
  return (
    <div className="management-container">
      {/* <HeaderManagement fetchData={fetchData} searchData={searchEmployee} /> */}
      <HeaderManagement fetchData={fetchListProductManager} />
      <Filter
        filter={filter}
        onUpdateFilter={(values) => {
          history.replace({
            search: queryString.stringify({
              ...values,
              // ...filters,
            }),
          });
        }}
      />
      <TableCustom
        dataSource={dataProductManager?.message.productsList || []}
        columns={columns}
        noColumnIndex
        onRowClick={(record: some, index: number) => {}}
        paginationProps={{
          count: dataProductManager?.total || 0,
          page: filter.page || 0,
          rowsPerPage: filter.size || 10,
          onChangePage: (event: unknown, newPage: number) => {
            history.replace({
              search: queryString.stringify({
                ...filter,
                page: newPage,
              }),
            });
          },
          onChangeRowsPerPage: (event: React.ChangeEvent<HTMLInputElement>) => {
            history.replace({
              search: queryString.stringify({
                ...filter,
                size: parseInt(event.target.value, 10),
                page: 0,
              }),
            });
          },
        }}
      />
    </div>
  );
};

export default connect(mapStateToProps)(withRouter(ManagerProduct));
