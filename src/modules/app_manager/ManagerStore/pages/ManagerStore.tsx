import { Avatar, IconButton, Typography } from "@material-ui/core";
import CheckIcon from "@material-ui/icons/Check";
import DeleteIcon from "@material-ui/icons/Delete";
import queryString from "query-string";
import React from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router";
import { RouteComponentProps, withRouter } from "react-router-dom";
import { GREY_600 } from "../../../../assets/theme/colors";
import { some, SUCCESS_CODE } from "../../../../constants/constants";
import { Row } from "../../../common/Elements";
import TableCustom from "../../../common/TableCustom";
import { AppState } from "../../../rootReducer";
import HeaderManagement from "../../components/HeaderManagement";
import "../../Management.scss";
import {
  actionApproveStore,
  actionDeleteStore,
  actionGetListStore,
  actionGrantSaler,
  actionRemoveSaler,
} from "../../managerAction";
import Filter from "../components/Filter";
import { defaultManagerAccountFilter, IManagerAccountFilter } from "../utils";
function mapStateToProps(state: AppState) {
  return {
    profile: state.system.profile,
  };
}
interface Props extends ReturnType<typeof mapStateToProps> {}
const ManagerStore: React.FC<RouteComponentProps<any> & Props> = (props) => {
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
      const res: some = await actionGetListStore(filter);
      if (res?.code === SUCCESS_CODE) {
        setDataAccountManager(res);
      } else {
      }
    } catch (error) {}
  };
  const ActionApproveStore = async (id: string) => {
    try {
      const res: some = await actionApproveStore(id);
      if (res?.code === SUCCESS_CODE) {
        fetchListAccountManager();
      } else {
      }
    } catch (error) {}
  };
  const ActionDeleteStore = async (id: string) => {
    try {
      const res: some = await actionDeleteStore(id);
      if (res?.code === SUCCESS_CODE) {
        fetchListAccountManager();
      } else {
      }
    } catch (error) {}
  };
  const ActionGrantSalerApprove = async (id: string) => {
    try {
      const res: some = await actionGrantSaler(id);
      if (res?.code === SUCCESS_CODE) {
        // fetchListAccountManager();
      } else {
      }
    } catch (error) {}
  };
  const ActionRemoveSalerApprove = async (id: string) => {
    try {
      const res: some = await actionRemoveSaler(id);
      if (res?.code === SUCCESS_CODE) {
        // fetchListAccountManager();
      } else {
      }
    } catch (error) {}
  };
  React.useEffect(() => {
    fetchListAccountManager(); // eslint-disable-next-line
  }, []);

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
      title: "IDS_CHAT_STORE_NAME",
      dataIndex: "name",
      styleHeader: { color: GREY_600 },
    },
    {
      title: "IDS_CHAT_FOLLOW_COUNT",
      dataIndex: "ratingsCount",
      styleHeader: { color: GREY_600 },
    },
    {
      title: "IDS_CHAT_STAR_VOTE",
      dataIndex: "star",
      styleHeader: { color: GREY_600 },
    },
    {
      title: "IDS_DETAIL_STORE",
      dataIndex: "detail",
      styleHeader: { color: GREY_600 },
    },
    {
      title: "IDS_STATUS_STORE",
      dataIndex: "approved",
      width: 100,
      styleHeader: { color: GREY_600, textAlign: "center" },
      render: (record: some, index: number) => {
        return (
          <Row>
            <Typography
              style={{
                color:
                  record.approved === 1
                    ? "green"
                    : record.approved === 2
                    ? "red"
                    : "grey",
              }}
            >
              {record.approved === 1
                ? "Đang hoạt động"
                : record.approved === 2
                ? "Đã Cấm"
                : "Chờ xác nhận"}
            </Typography>
            {(record.approved === 0 || record.approved === 2) && (
              <IconButton
                onClick={() => {
                  ActionApproveStore(JSON.stringify(record.id));
                  ActionGrantSalerApprove(
                    JSON.stringify(record.owner.userName)
                  );
                }}
              >
                <CheckIcon />
              </IconButton>
            )}
            {record.approved === 1 && (
              <IconButton
                onClick={() => {
                  ActionDeleteStore(JSON.stringify(record.id));
                  ActionRemoveSalerApprove(
                    JSON.stringify(record.owner.userName)
                  );
                }}
              >
                <DeleteIcon />
              </IconButton>
            )}
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
              status: JSON.stringify(values.status),
            }),
          });
        }}
      />
      <TableCustom
        dataSource={dataAccountManager?.store || []}
        columns={columns}
        noColumnIndex
      />
    </div>
  );
};

export default connect(mapStateToProps)(withRouter(ManagerStore));
