import { Typography } from "@material-ui/core";
import queryString from "query-string";
import React from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router";
import { RouteComponentProps, withRouter } from "react-router-dom";
import { GREY_600 } from "../../../../assets/theme/colors";
import { some, SUCCESS_CODE } from "../../../../constants/constants";
import { formatter } from "../../../../utils/helpers/helpers";
import { Row } from "../../../common/Elements";
import TableCustom from "../../../common/TableCustom";
import { AppState } from "../../../rootReducer";
import DeleteDialog from "../../components/DeleteDialog";
import HeaderManagement from "../../components/HeaderManagement";
import "../../Management.scss";
import { actionListBillManager } from "../../managerAction";
import Filter from "../../ManagerTransaction/components/Filter";
import {
  defaultManagerTransactionFilter,
  IManagerTransactionFilter,
} from "../../ManagerTransaction/utils";
import ActionTransactionDialog from "../components/ActionTransactionDialog";

function mapStateToProps(state: AppState) {
  return {
    profile: state.system.profile,
  };
}
interface Props extends ReturnType<typeof mapStateToProps> {}
const ManagerTransaction: React.FC<RouteComponentProps<any> & Props> = (
  props
) => {
  const { profile } = props;
  const history = useHistory();
  const [dataBillManager, setDataBillManager] = React.useState<some>();
  const [filter, setFilter] = React.useState<IManagerTransactionFilter>(
    defaultManagerTransactionFilter
  );

  const updateQueryParams = React.useCallback(() => {
    if (window.location.search) {
      const filterParams = queryString.parse(
        window.location.search
      ) as unknown as any;
      setFilter({
        ...filterParams,
        page: parseInt(`${filterParams.page}`) || 0,
        size: parseInt(`${filterParams.size}`) || 10,
      });
    } else {
      history.replace({
        search: queryString.stringify(defaultManagerTransactionFilter),
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [history, window.location.search]);

  React.useEffect(() => {
    updateQueryParams();
  }, [updateQueryParams]);

  const fetchListBillManager = async () => {
    try {
      const res: some = await actionListBillManager({
        ...filter,
        StoreID:
          localStorage.getItem("StoreID") || profile?.userInfo?.store?.id,
      });
      if (res?.code === SUCCESS_CODE) {
        setDataBillManager(res);
      } else {
      }
    } catch (error) {}
  };

  React.useEffect(() => {
    fetchListBillManager(); // eslint-disable-next-line
  }, [filter]);

  const columns = [
    {
      title: "IDS_CHAT_BUYACCOUNT",
      dataIndex: "buyerAccount",
      styleHeader: { color: GREY_600 },
    },
    {
      title: "IDS_CHAT_ORDERTIME",
      dataIndex: "orderTime",
      styleHeader: { color: GREY_600 },
      render: (record: any) => {
        let date = new Date(record.orderTime);
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
      title: "IDS_CHAT_SHIPTIME",
      dataIndex: "shipTime",
      styleHeader: { color: GREY_600 },
      render: (record: any) => {
        let date = new Date(record.shipTime);
        return (
          <Typography
            style={{
              fontSize: 12,
            }}
          >
            {record.status === 1 ? date.toLocaleString() : "Chưa giao"}
          </Typography>
        );
      },
    },
    {
      title: "IDS_CHAT_STATUS",
      dataIndex: "status",
      styleHeader: { color: GREY_600 },
      render: (record: any) => {
        return (
          <Typography
            style={{
              fontSize: 12,
              color:
                record.status === 1
                  ? "green"
                  : record.status === 2
                  ? "red"
                  : "grey",
            }}
          >
            {record.status === 1
              ? "Đã giao"
              : record.status === 2
              ? "Đã hủy"
              : "Chưa giao"}
          </Typography>
        );
      },
    },
    {
      title: "IDS_CHAT_TOTAL",
      dataIndex: "productsTotal",
      styleHeader: { color: GREY_600 },
      render: (record: any) => {
        return (
          <Typography
            style={{
              fontSize: 12,
            }}
          >
            {formatter(record.productsTotal)}
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
            {/* <ActionEmployeeDialog item={record} fetchData={fetchData} /> */}
            <ActionTransactionDialog item={record} />
            <DeleteDialog item={record} fetchData={fetchListBillManager} />
          </Row>
        );
      },
    },
  ];
  return (
    <div className="management-container">
      {/* <HeaderManagement fetchData={fetchData} searchData={searchEmployee} /> */}
      <HeaderManagement fetchData={() => {}} />
      <Filter
        filter={filter}
        onUpdateFilter={(values) => {
          history.replace({
            search: queryString.stringify({
              ...values,
              // ...filter,
            }),
          });
        }}
      />
      <TableCustom
        dataSource={dataBillManager?.detail || []}
        columns={columns}
        noColumnIndex
        onRowClick={(record: some, index: number) => {}}
        paginationProps={{
          count: dataBillManager?.total || 0,
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

export default connect(mapStateToProps)(withRouter(ManagerTransaction));
