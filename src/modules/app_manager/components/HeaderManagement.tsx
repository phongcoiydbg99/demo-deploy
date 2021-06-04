import { Typography } from "@material-ui/core";
import React from "react";
import { useIntl } from "react-intl";
import { RouteComponentProps, withRouter } from "react-router-dom";
import { routes } from "../../../constants/routes";
import { Row } from "../../common/Elements";
import ActionAccontDialogCreate from "../ManagerAccount/components/ActionAccontDialogCreate";
import ActionProductDialogCreate from "../ManagerProduct/components/ActionProductDialogCreate";

interface Props {
  fetchData: () => void;
  // searchData: () => void;
}

const HeaderManagement: React.FC<RouteComponentProps<any> & Props> = (
  props
) => {
  const intl = useIntl();
  const { pathname } = props?.location;
  const { fetchData } = props;

  const getTitle = () => {
    if (pathname === routes.ACCOUNT_MANAGEMENT)
      return {
        title: "IDS_CHAT_MANAGEMENT_ACCOUNT",
        placeholder: "IDS_CHAT_MANAGEMENT_ACCOUNT_NAME",
        content: <ActionAccontDialogCreate fetchData={fetchData} />,
      };
    if (pathname === routes.TRANSACTION_MANAGEMENT)
      return {
        title: "IDS_CHAT_MANAGEMENT_TRANSACTION",
        placeholder: "IDS_CHAT_MANAGEMENT_TRANSACTION_NAME",
        // content: <ActionTransactionDialogCreate />,
      };
    if (pathname === routes.PRODUCT_MANAGEMENT)
      return {
        title: "IDS_CHAT_MANAGEMENT_PRODUCT",
        placeholder: "IDS_CHAT_MANAGEMENT_PRODUCT_NAME",
        // content: <ActionProductDialogCreate fetchData={fetchData} />,
      };
    if (pathname === routes.STORE_TRANSACTION_MANAGEMENT)
      return {
        title: "IDS_CHAT_MANAGEMENT_TRANSACTION",
        placeholder: "IDS_CHAT_MANAGEMENT_TRANSACTION_NAME",
        // content: <ActionTransactionDialogCreate />,
      };
    if (pathname === routes.STORE_PRODUCT_MANAGEMENT)
      return {
        title: "IDS_CHAT_MANAGEMENT_PRODUCT",
        placeholder: "IDS_CHAT_MANAGEMENT_PRODUCT_NAME",
        content: <ActionProductDialogCreate fetchData={fetchData} />,
      };
    if (pathname === routes.STORE_MANAGER)
      return {
        title: "IDS_CHAT_STORE_MANAGER",
        placeholder: "IDS_CHAT_MANAGEMENT_PRODUCT_NAME",
        // content: <ActionProductDialogCreate fetchData={fetchData} />,
      };
    return {
      title: "IDS_APP_MANAGEMENT",
      content: null,
    };
  };

  return (
    <>
      <Row
        className="header-management"
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography variant="subtitle1" component="p">
          {intl.formatMessage({ id: getTitle().title })}
        </Typography>
        <Row>{getTitle().content}</Row>
      </Row>
    </>
  );
};

export default withRouter(HeaderManagement);
