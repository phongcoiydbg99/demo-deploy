import { useFormik } from "formik";
import React from "react";
import { IManagerAccountFilter } from "../utils";

interface Props {
  filter: IManagerAccountFilter;
  onUpdateFilter(filter: IManagerAccountFilter): void;
}
const Filter: React.FC<Props> = (props) => {
  const { filter, onUpdateFilter } = props;
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
      {/* <Row>
        <form onSubmit={formik.handleSubmit}>
          <Row style={{ flexWrap: 'wrap' }}>
            <LoadingButton
              type='submit'
              variant='contained'
              size='large'
              style={{ minWidth: 140, marginRight: 20 }}
              color='primary'
              disableElevation
            >
              <FormattedMessage id='IDS_SEARCH' />
            </LoadingButton>
            <Button
              onClick={() => {
                formik.setValues(defaultManagerAccountFilter);
                onUpdateFilter(defaultManagerAccountFilter);
              }}
            >
              <RefreshIcon style={{ marginRight: '4px', color: BLUE_300 }} />
              <Typography variant='button' style={{ color: BLUE_300 }}>
                <FormattedMessage id='IDS_REFRESH_FILTER' />
              </Typography>
            </Button>
          </Row>
        </form>
      </Row> */}
    </>
  );
};

export default Filter;
