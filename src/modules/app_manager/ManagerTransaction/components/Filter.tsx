import { Button, Typography } from "@material-ui/core";
import RefreshIcon from "@material-ui/icons/Refresh";
import RemoveIcon from "@material-ui/icons/Remove";
import { useFormik } from "formik";
import React from "react";
import { FormattedMessage, useIntl } from "react-intl";
import { BLUE_300 } from "../../../../assets/theme/colors";
import { some } from "../../../../constants/constants";
import { Row } from "../../../common/Elements";
import FormControlAutoComplete from "../../../common/FormControlAutoComplete";
import FormControlTextField from "../../../common/FormControlTextField";
import LoadingButton from "../../../common/LoadingButton";
import {
  defaultManagerTransactionFilter,
  IManagerTransactionFilter,
  statusOption,
} from "../utils";

interface Props {
  filter: IManagerTransactionFilter;
  onUpdateFilter(filter: IManagerTransactionFilter): void;
}
const Filter: React.FC<Props> = (props) => {
  const { filter, onUpdateFilter } = props;
  const intl = useIntl();
  const formik = useFormik({
    initialValues: filter,
    onSubmit: (values) => {
      (values.status !== -1) ?
      onUpdateFilter({
        ...values,
      }) : onUpdateFilter({
        ...values,
        status: undefined,
      });
    },
  });
  React.useEffect(() => {
    if (filter) {
      formik.setValues(filter, true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filter]);
  return (
    <form onSubmit={formik.handleSubmit}>
      <Row style={{ flexWrap: "wrap" }}>
        <FormControlTextField
          id="fromDate"
          label={<FormattedMessage id="IDS_CHAT_ORDERTIME" />}
          placeholder={intl.formatMessage({ id: "IDS_CHOOSE_HOLDER" })}
          value={formik.values.fromDate}
          onChange={(e) =>
            formik.setFieldValue(
              "fromDate",
              e.target.value.length > 0 ? e.target.value : undefined,
              true
            )
          }
          type="date"
          formControlStyle={{ width: 80 }}
          optional
        />
        <Typography
          style={{
            display: "flex",
            justifyContent: "center",
            marginLeft: -25,
            marginRight: 5,
          }}
        >
          <RemoveIcon
            style={{
              width: 10,
              height: 10,
            }}
          />
        </Typography>
        <FormControlTextField
          id="toDate"
          placeholder={intl.formatMessage({ id: "IDS_CHOOSE_HOLDER" })}
          value={formik.values.toDate}
          onChange={(e) =>
            formik.setFieldValue(
              "toDate",
              e.target.value.length > 0 ? e.target.value : undefined,
              true
            )
          }
          type="date"
          formControlStyle={{ width: 80, marginTop: 25 }}
          optional
        />
        <FormControlTextField
          id="ShipTime"
          label={<FormattedMessage id="IDS_CHAT_SHIPTIME" />}
          placeholder={intl.formatMessage({ id: "IDS_CHOOSE_HOLDER" })}
          value={formik.values.ShipTime}
          onChange={(e) =>
            formik.setFieldValue(
              "ShipTime",
              e.target.value.length > 0 ? e.target.value : undefined,
              true
            )
          }
          type="date"
          formControlStyle={{ width: 80 }}
          optional
        />
        <FormControlAutoComplete<some>
          value={
            statusOption.find((v: some) => v.id === formik.values.status) ||
            null
          }
          formControlStyle={{ width: 150 }}
          label={<FormattedMessage id="IDS_CHAT_STATUS" />}
          placeholder={intl.formatMessage({ id: "IDS_CHOOSE_HOLDER" })}
          onChange={(e: any, value: some | null) => {
            formik.setFieldValue("status", value?.id, true);
          }}
          getOptionSelected={(options, value) => options.id === value.id}
          options={statusOption as some[]}
          getOptionLabel={(one: some) => one.name}
          optional
        />

        <LoadingButton
          type="submit"
          variant="contained"
          size="large"
          style={{ minWidth: 140, marginRight: 20,marginTop: 10, marginBottom: 10 }}
          color="primary"
          disableElevation
        >
          <FormattedMessage id="IDS_SEARCH" />
        </LoadingButton>
        <Button
          onClick={() => {
            formik.setValues(defaultManagerTransactionFilter);
            onUpdateFilter(defaultManagerTransactionFilter);
          }}
          style={{ marginTop: 10, marginBottom: 10 }}
        >
          <RefreshIcon style={{ marginRight: "4px", color: BLUE_300 }} />
          {/* <Typography variant="button" style={{ color: BLUE_300 }}>
            <FormattedMessage id="IDS_REFRESH_FILTER" />
          </Typography> */}
        </Button>
      </Row>
    </form>
  );
};

export default Filter;
