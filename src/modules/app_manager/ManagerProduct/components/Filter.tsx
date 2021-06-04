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
  defaultManagerProductFilter,
  IManagerProductFilter,
  starOption,
} from "../utils";
import FormControlCategoryAutoComplete from "./FormControlCategoryAutoComplete";

interface Props {
  filter: IManagerProductFilter;
  onUpdateFilter(filter: IManagerProductFilter): void;
}
const Filter: React.FC<Props> = (props) => {
  const { filter, onUpdateFilter } = props;
  const [category, setCategory] = React.useState<any>({ name: "", id: "" });
  const intl = useIntl();
  const formik = useFormik({
    initialValues: filter,
    onSubmit: (values) => {
      onUpdateFilter({
        ...values,
      });
    },
  });

  const setCategoryData = (data: any) => {
    setCategory(data);
  };
  React.useEffect(() => {
    if (filter) {
      formik.setValues(filter, true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filter]);
  return (
    <>
      <form onSubmit={formik.handleSubmit}>
        <Row style={{ flexWrap: "wrap" }}>
          <FormControlTextField
            id="searchKey"
            label={<FormattedMessage id="IDS_SEARCH_KEY" />}
            placeholder={intl.formatMessage({ id: "IDS_SEARCH_KEY_HOLDER" })}
            value={formik.values.searchKey}
            onChange={(e) =>
              formik.setFieldValue(
                "searchKey",
                e.target.value.length > 0 ? e.target.value : undefined,
                true
              )
            }
            formControlStyle={{ width: 200 }}
            optional
          />
          <FormControlTextField
            id="fromPrice"
            label={<FormattedMessage id="IDS_PRICE_RANGE" />}
            placeholder={intl.formatMessage({ id: "IDS_PRICE_RANGE_HOLDER" })}
            value={formik.values.fromPrice}
            onChange={(e) =>
              formik.setFieldValue(
                "fromPrice",
                e.target.value.length > 0 ? e.target.value : undefined,
                true
              )
            }
            type="number"
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
            id="toPrice"
            placeholder={intl.formatMessage({ id: "IDS_PRICE_RANGE_HOLDER" })}
            value={formik.values.toPrice}
            onChange={(e) =>
              formik.setFieldValue(
                "toPrice",
                e.target.value.length > 0 ? e.target.value : undefined,
                true
              )
            }
            type="number"
            formControlStyle={{ width: 80, marginTop: 20 }}
            optional
          />
          <FormControlCategoryAutoComplete
            id="categoryid"
            label={<FormattedMessage id="IDS_CHAT_CATEGORY" />}
            placeholder={intl.formatMessage({ id: "IDS_CHOOSE_HOLDER" })}
            categoryID={(id: string) =>
              formik.setFieldValue(
                "categoryid",
                id.length > 0 ? id : undefined,
                true
              )
            }
            formControlStyle={{ width: 200, marginTop: -5 }}
            categoryData={category}
            setCategoryData={setCategoryData}
            optional
          />
          <FormControlAutoComplete<some>
            value={
              starOption.find((v: some) => v.id === formik.values.star) || null
            }
            formControlStyle={{ width: 150, marginTop: -5 }}
            label={<FormattedMessage id="IDS_STAR_RANGE" />}
            placeholder={intl.formatMessage({ id: "IDS_CHOOSE_HOLDER" })}
            onChange={(e: any, value: some | null) => {
              formik.setFieldValue("star", value?.id, true);
            }}
            getOptionSelected={(options, value) => options.id === value.id}
            options={starOption as some[]}
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
              formik.setValues(defaultManagerProductFilter);
              onUpdateFilter(defaultManagerProductFilter);
              setCategory({ name: "", id: "" });
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
    </>
  );
};

export default Filter;
