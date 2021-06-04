import { Avatar, Typography } from "@material-ui/core";
import queryString from "query-string";
import React from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router";
import { RouteComponentProps, withRouter } from "react-router-dom";
import { GREY_600 } from "../../../../assets/theme/colors";
import { some, SUCCESS_CODE } from "../../../../constants/constants";
import { Row, snackbarSetting } from "../../../common/Elements";
import TableCustom from "../../../common/TableCustom";
import { AppState } from "../../../rootReducer";
import DeleteDialog from "../../components/DeleteDialog";
import HeaderManagement from "../../components/HeaderManagement";
import "../../Management.scss";
import { actionGetAccountManager } from "../../managerAction";
import ActionAccountDialog from "../components/ActionAccountDialog";
import Filter from "../components/Filter";
import { defaultManagerAccountFilter, IManagerAccountFilter } from "../utils";

function mapStateToProps(state: AppState) {
  return {
    profile: state.system.profile,
  };
}
interface Props extends ReturnType<typeof mapStateToProps> {}
const ManagerAccount: React.FC<RouteComponentProps<any> & Props> = (props) => {
  const [dataAccountManager, setDataAccountManager] = React.useState<some>();
  const history = useHistory();
  const [filter, setFilter] = React.useState<IManagerAccountFilter>(
    defaultManagerAccountFilter
  );
  const updateQueryParams = React.useCallback(() => {
    if (window.location.search) {
      const filterParams = queryString.parse(
        window.location.search
      ) as unknown as any;
      setFilter({
        ...filterParams,
        page: parseInt(`${filterParams.page}`, 0),
        size: parseInt(`${filterParams.size}`, 10),
      });
    } else {
      history.replace({
        search: queryString.stringify(defaultManagerAccountFilter),
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [history, window.location.search]);
  React.useEffect(() => {
    updateQueryParams();
  }, [updateQueryParams]);

  const fetchListAccountManager = async () => {
    try {
      const res: some = await actionGetAccountManager(filter);
      if (res?.code === SUCCESS_CODE) {
        setDataAccountManager(res);
      } else {
        showNotifySnack(res);
      }
    } catch (error) {}
  };

  const showNotifySnack = (res: any) => {
    enqueueSnackbar(
      res?.message,
      snackbarSetting((key) => closeSnackbar(key), {
        color: res?.code === SUCCESS_CODE ? "success" : "error",
      })
    );
  };

  React.useEffect(() => {
    fetchListAccountManager(); // eslint-disable-next-line
  }, [filter]);
  const columns = [
    {
      width: 5,
      styleHeader: { color: GREY_600 },
      dataIndex: "name",
      render: (record: any) => {
        return (
          <Row>
            <Avatar>{record.name.substr(0, 1)}</Avatar>
          </Row>
        );
      },
    },
    {
      title: "IDS_CHAT_USERNAME",
      dataIndex: "userName",
      styleHeader: { color: GREY_600 },
    },
    {
      title: "IDS_CHAT_GENDER",
      dataIndex: "gender",
      styleHeader: { color: GREY_600 },
    },
    // {
    //   title: "IDS_CHAT_PROFILE_PHOTO",
    //   dataIndex: "profilePhoto",
    //   styleHeader: { color: GREY_600 },
    // },
    {
      title: "IDS_CHAT_FIRSTNAME",
      dataIndex: "firstName",
      styleHeader: { color: GREY_600 },
    },
    {
      title: "IDS_CHAT_LASTNAME",
      dataIndex: "lastName",
      styleHeader: { color: GREY_600 },
    },
    {
      title: "IDS_CHAT_NAME",
      dataIndex: "name",
      styleHeader: { color: GREY_600 },
    },
    {
      title: "IDS_CHAT_EMAIL",
      dataIndex: "email",
      styleHeader: { color: GREY_600 },
    },
    {
      title: "IDS_CHAT_PHONE_NUMBER",
      dataIndex: "phoneNumber",
      styleHeader: { color: GREY_600 },
    },
    // {
    //   title: "IDS_CHAT_PHONE_LOCATION",
    //   dataIndex: "location",
    //   styleHeader: { color: GREY_600 },
    // },
    {
      title: "IDS_CHAT_DATE_OF_BIRTH",
      dataIndex: "dateOfBirth",
      styleHeader: { color: GREY_600 },
      render: (record: any) => {
        let date = new Date(record.dateOfBirth);
        return (
          <Typography
            style={{
              fontSize: 12,
            }}
          >
            {record.dateOfBirth ? date.toLocaleDateString() : "Chưa giao"}
          </Typography>
        );
      },
    },
    {
      title: "IDS_CHAT_ACTION",
      dataIndex: "id",
      width: 100,
      styleHeader: { color: GREY_600, textAlign: "center" },
      render: (record: any) => {
        return (
          <Row className="action-container" key={record?.id}>
            <ActionAccountDialog
              item={record}
              fetchData={fetchListAccountManager}
            />
            <DeleteDialog item={record} fetchData={fetchListAccountManager} />
          </Row>
        );
      },
    },
  ];
  return (
    <div className="management-container">
      <HeaderManagement fetchData={fetchListAccountManager} />
      <Filter
        filter={filter}
        onUpdateFilter={(values) => {
          history.replace({
            search: queryString.stringify({
              ...values,
              // status: JSON.stringify(values.status),
            }),
          });
        }}
      />
      <TableCustom
        dataSource={dataAccountManager?.data || []}
        columns={columns}
        noColumnIndex
        onRowClick={(record: some, index: number) => {}}
        paginationProps={{
          count: dataAccountManager?.total || 0,
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

export default connect(mapStateToProps)(withRouter(ManagerAccount));
function enqueueSnackbar(message: any, arg1: any) {
  throw new Error("Function not implemented.");
}

function closeSnackbar(key: string): void {
  throw new Error("Function not implemented.");
}
