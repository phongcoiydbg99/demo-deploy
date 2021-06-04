import { Button } from "@material-ui/core";
import RefreshIcon from "@material-ui/icons/Refresh";
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
  defaultManagerAccountFilter,
  genderOption,
  IManagerAccountFilter,
} from "../utils";

interface Props {
  filter: IManagerAccountFilter;
  onUpdateFilter(filter: IManagerAccountFilter): void;
}
const Filter: React.FC<Props> = (props) => {
  const { filter, onUpdateFilter } = props;
  const intl = useIntl();
  const formik = useFormik({
    initialValues: filter,
    onSubmit: (values) => {
      onUpdateFilter({
        ...values,
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
    <>
      <Row>
        <form onSubmit={formik.handleSubmit}>
          <Row style={{ flexWrap: "wrap" }}>
            <FormControlTextField
              id="Name"
              label={<FormattedMessage id="IDS_CHAT_FULLNAME" />}
              placeholder={intl.formatMessage({ id: "IDS_INPUT_INFOR_HOLDER" })}
              value={formik.values.Name}
              onChange={(e) =>
                formik.setFieldValue(
                  "Name",
                  e.target.value.length > 0 ? e.target.value : undefined,
                  true
                )
              }
              formControlStyle={{ width: 80 }}
              optional
            />
            <FormControlTextField
              id="UserName"
              label={<FormattedMessage id="IDS_CHAT_USERNAME" />}
              placeholder={intl.formatMessage({ id: "IDS_INPUT_INFOR_HOLDER" })}
              value={formik.values.UserName}
              onChange={(e) =>
                formik.setFieldValue(
                  "UserName",
                  e.target.value.length > 0 ? e.target.value : undefined,
                  true
                )
              }
              formControlStyle={{ width: 80 }}
              optional
            />
            <FormControlTextField
              id="Email"
              label={<FormattedMessage id="IDS_CHAT_EMAIL" />}
              placeholder={intl.formatMessage({ id: "IDS_INPUT_INFOR_HOLDER" })}
              value={formik.values.Email}
              onChange={(e) =>
                formik.setFieldValue(
                  "Email",
                  e.target.value.length > 0 ? e.target.value : undefined,
                  true
                )
              }
              formControlStyle={{ width: 80 }}
              optional
            />
            <FormControlTextField
              id="PhoneNumber"
              label={<FormattedMessage id="IDS_CHAT_PHONE_NUMBER" />}
              placeholder={intl.formatMessage({ id: "IDS_INPUT_INFOR_HOLDER" })}
              value={formik.values.PhoneNumber}
              onChange={(e) =>
                formik.setFieldValue(
                  "PhoneNumber",
                  e.target.value.length > 0 ? e.target.value : undefined,
                  true
                )
              }
              formControlStyle={{ width: 80 }}
              optional
            />
            <FormControlAutoComplete<some>
              value={
                genderOption.find((v: some) => v.id === formik.values.Gender) ||
                null
              }
              formControlStyle={{ width: 150 }}
              label={<FormattedMessage id="IDS_CHAT_GENDER" />}
              placeholder={intl.formatMessage({ id: "IDS_CHOOSE_HOLDER" })}
              onChange={(e: any, value: some | null) => {
                formik.setFieldValue("Gender", value?.id, true);
              }}
              getOptionSelected={(options, value) => options.id === value.id}
              options={genderOption as some[]}
              getOptionLabel={(one: some) => one.name}
              optional
            />

            <LoadingButton
              type="submit"
              variant="contained"
              size="large"
              style={{
                minWidth: 140,
                marginRight: 20,
                marginTop: 10,
                marginBottom: 10,
              }}
              color="primary"
              disableElevation
            >
              <FormattedMessage id="IDS_SEARCH" />
            </LoadingButton>
            <Button
              onClick={() => {
                formik.setValues(defaultManagerAccountFilter);
                onUpdateFilter(defaultManagerAccountFilter);
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
      </Row>
    </>
  );
};

export default Filter;
