import { yupResolver } from "@hookform/resolvers/yup";
import {
  FormControlLabel,
  InputLabel,
  Radio,
  RadioGroup,
} from "@material-ui/core";
import { useSnackbar } from "notistack";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { FormattedMessage } from "react-intl";
import { RouteComponentProps, withRouter } from "react-router-dom";
import * as yup from "yup";
import { GREY_300 } from "../../../../assets/theme/colors";
import { some, SUCCESS_CODE } from "../../../../constants/constants";
import { isEmpty } from "../../../../utils/helpers/helpers";
import { Row, snackbarSetting } from "../../../common/Elements";
import FormControlTextField from "../../../common/FormControlTextField";
import { actionChangeInfo } from "../../../system/systemAction";
import ActionDialog from "../../components/ActionDialog";
interface Props {
  item?: some;
  fetchData: () => void;
}
const ActionAccountDialog: React.FC<RouteComponentProps<any> & Props> = (
  props
) => {
  const { item, fetchData } = props;
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const [loading, setLoading] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(false);
  const [gender, setGender] = React.useState(item?.gender || "");

  const schema = yup.object().shape({
    email: yup
      .string()
      .required("Email không được để trống")
      .email("Email không hợp lệ"),
    phoneNumber: yup
      .string()
      .required("Số điện thoại không được để trống")
      .nullable(),
    firstName: yup.string().required("Họ không được để trống").nullable(),
    lastName: yup.string().required("Tên không được để trống").nullable(),
    dateOfBirth: yup
      .string()
      .required("Ngày sinh không được để trống")
      .nullable(),
  });

  const { handleSubmit, control, formState } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      id: !isEmpty(item) ? item?.id : "",
      name: !isEmpty(item) ? item?.name : "",
      email: !isEmpty(item) ? item?.email : "",
      phoneNumber: !isEmpty(item) ? item?.phoneNumber : "",
      userName: !isEmpty(item) ? item?.userName : "",
      firstName: !isEmpty(item) ? item?.firstName : "",
      lastName: !isEmpty(item) ? item?.lastName : "",
      dateOfBirth: !isEmpty(item)
        ? new Date(item?.dateOfBirth).toLocaleDateString("fr-ca")
        : "",
    },
  });
  const { errors } = formState;
  const showNotifySnack = (res: any) => {
    enqueueSnackbar(
      res?.message,
      snackbarSetting((key) => closeSnackbar(key), {
        color: res?.code === SUCCESS_CODE ? "success" : "error",
      })
    );
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setGender((event.target as HTMLInputElement).value);
  };

  const onSubmit = async (data: any) => {
    try {
      setLoading(true);
      const res: some = await actionChangeInfo({
        ...data,
        account: item?.userName,
        gender: gender,
      });
      if (res?.code === SUCCESS_CODE) {
        fetchData();
        setOpen(false);
        showNotifySnack(res);
      } else {
        enqueueSnackbar(
          res?.message,
          snackbarSetting((key) => closeSnackbar(key), { color: "error" })
        );
      }
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      <form
        id={item?.id || "formAccountDialog"}
        onSubmit={handleSubmit(onSubmit)}
        autoComplete="none"
      >
        <ActionDialog
          maxWidth="lg"
          fullWidth={true}
          setOpen={setOpen}
          open={open}
          loading={loading}
          item={item || []}
          formId={item?.id || "formAccountDialog"}
        >
          <div className="dialog-content">
            <>
              <div>
                <Controller
                  as={React.forwardRef((itemProps: any, ref) => (
                    <FormControlTextField
                      {...itemProps}
                      style={{ background: GREY_300 }}
                      label={<FormattedMessage id="IDS_CHAT_ID" />}
                      formControlStyle={{ width: "100%", marginRight: 0 }}
                      value={item?.id}
                      inputProps={{ maxLength: 50, autoComplete: "none" }}
                      optional
                      inputRef={ref}
                      disabled
                    />
                  ))}
                  name="id"
                  control={control}
                />
                <Controller
                  as={React.forwardRef((itemProps: any, ref) => (
                    <FormControlTextField
                      {...itemProps}
                      style={{ background: GREY_300 }}
                      label={<FormattedMessage id="IDS_CHAT_USERNAME" />}
                      formControlStyle={{ width: "100%", marginRight: 0 }}
                      value={item?.userName}
                      inputProps={{ maxLength: 50, autoComplete: "none" }}
                      optional
                      inputRef={ref}
                      disabled
                    />
                  ))}
                  name="userName"
                  control={control}
                />
                <Controller
                  render={({ onChange, value, ref }) => (
                    <FormControlTextField
                      value={value}
                      onChange={onChange}
                      label={<FormattedMessage id="IDS_CHAT_FIRSTNAME" />}
                      formControlStyle={{ width: "100%", marginRight: 0 }}
                      inputProps={{ maxLength: 50, autoComplete: "none" }}
                      inputRef={ref}
                      errorMessage={errors.firstName?.message}
                    />
                  )}
                  name="firstName"
                  control={control}
                />
                <Controller
                  render={({ onChange, value, ref }) => (
                    <FormControlTextField
                      value={value}
                      onChange={onChange}
                      label={<FormattedMessage id="IDS_CHAT_LASTNAME" />}
                      formControlStyle={{ width: "100%", marginRight: 0 }}
                      inputProps={{ maxLength: 50, autoComplete: "none" }}
                      inputRef={ref}
                      errorMessage={errors.lastName?.message}
                    />
                  )}
                  name="lastName"
                  control={control}
                />
                <Controller
                  render={({ onChange, value, ref }) => (
                    <FormControlTextField
                      value={value}
                      onChange={onChange}
                      label={<FormattedMessage id="IDS_CHAT_EMAIL" />}
                      formControlStyle={{ width: "100%", marginRight: 0 }}
                      inputProps={{ maxLength: 50, autoComplete: "none" }}
                      errorMessage={errors.email?.message}
                      inputRef={ref}
                    />
                  )}
                  name="email"
                  control={control}
                />
                <Controller
                  render={({ onChange, value, ref }) => (
                    <FormControlTextField
                      value={value}
                      onChange={onChange}
                      label={<FormattedMessage id="IDS_CHAT_PHONE_NUMBER" />}
                      formControlStyle={{ width: "100%", marginRight: 0 }}
                      inputProps={{ maxLength: 50, autoComplete: "none" }}
                      errorMessage={errors.phoneNumber?.message}
                      inputRef={ref}
                      type="number"
                    />
                  )}
                  name="phoneNumber"
                  control={control}
                />
                <Controller
                  render={({ onChange, value, ref }) => (
                    <FormControlTextField
                      value={value}
                      onChange={onChange}
                      label={<FormattedMessage id="IDS_CHAT_DATE_OF_BIRTH" />}
                      formControlStyle={{ width: "100%", marginRight: 0 }}
                      inputProps={{ maxLength: 50, autoComplete: "none" }}
                      errorMessage={errors.dateOfBirth?.message}
                      inputRef={ref}
                      type="date"
                    />
                  )}
                  name="dateOfBirth"
                  control={control}
                />
                <Controller
                  as={
                    <>
                      <InputLabel>
                        {<FormattedMessage id="IDS_CHAT_GENDER" />}
                      </InputLabel>
                      <RadioGroup
                        aria-label="gender"
                        value={gender}
                        onChange={handleChange}
                      >
                        <Row>
                          <FormControlLabel
                            value="F"
                            control={<Radio size="small" />}
                            label="Female"
                          />
                          <FormControlLabel
                            value="M"
                            control={<Radio size="small" />}
                            label="Male"
                          />
                          <FormControlLabel
                            value="O"
                            control={<Radio size="small" />}
                            label="Other"
                          />
                        </Row>
                      </RadioGroup>
                    </>
                  }
                  name="gender"
                  control={control}
                />
              </div>
            </>
          </div>
        </ActionDialog>
      </form>
    </>
  );
};

export default withRouter(ActionAccountDialog);
