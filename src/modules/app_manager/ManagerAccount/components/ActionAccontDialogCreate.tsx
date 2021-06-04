import { yupResolver } from "@hookform/resolvers/yup";
import {
  FormControlLabel,
  InputLabel,
  Radio,
  RadioGroup,
  Typography,
} from "@material-ui/core";
import { useSnackbar } from "notistack";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { FormattedMessage } from "react-intl";
import { RouteComponentProps, withRouter } from "react-router-dom";
import * as yup from "yup";
import { some, SUCCESS_CODE } from "../../../../constants/constants";
import { Row, snackbarSetting } from "../../../common/Elements";
import FormControlTextField from "../../../common/FormControlTextField";
import { actionRegister } from "../../../system/systemAction";
import ActionDialogCreate from "../../components/ActionDialogCreate";
interface Props {
  fetchData: () => void;
}

const ActionAccontDialogCreate: React.FC<RouteComponentProps<any> & Props> = (
  props
) => {
  const { fetchData } = props;
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const [loading, setLoading] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(false);
  const [valid, setValid] = useState<boolean>(false);
  const [gender, setGender] = React.useState("");

  const schema = yup.object().shape({
    userName: yup.string().required("Tài khoản không được để trống"),
    password: yup
      .string()
      .required("Mật khẩu không được để trống")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
        "Mật khẩu phải có ít nhất 8 ký tự. Trong đó có it nhất 1 chữ hoa, 1 chữ số, 1 ký tự đặc biết"
      ),
    email: yup
      .string()
      .required("Email không được để trống")
      .email("Email không hợp lệ"),
    phoneNumber: yup.string().required("Số điện thoại không được để trống"),
    firstName: yup.string().required("Họ không được để trống"),
    lastName: yup.string().required("Tên không được để trống"),
    dateOfBirth: yup.string().required("Ngày sinh không được để trống"),
  });

  const { handleSubmit, control, formState } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      id: "",
      userName: "",
      password: "",
      email: "",
      phoneNumber: "",
      gender: "",
      profilePhoto: "",
      firstName: "",
      lastName: "",
      name: "",
      dateOfBirth: "",
      followStores: null,
    },
  });
  const { errors } = formState;

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setGender((event.target as HTMLInputElement).value);
  };

  const onSubmit = async (data: any) => {
    setValid(true);
    if (gender === "") {
      return;
    } else {
      try {
        setLoading(true);
        const res: some = await actionRegister({
          ...data,
          gender: gender,
        });
        if (res?.code === SUCCESS_CODE) {
          // const { data } = await actionGetEmployeesInfo();
          fetchData();
          setOpen(false);
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
    }
  };

  React.useEffect(() => {
    if (open) {
      setGender("");
      setValid(false);
    }
  }, [open]);

  return (
    <>
      <form
        id="formAccountDialogCreate"
        onSubmit={handleSubmit(onSubmit)}
        autoComplete="none"
      >
        <ActionDialogCreate
          formId="formAccountDialogCreate"
          maxWidth="lg"
          fullWidth={true}
          setOpen={setOpen}
          setValid={setValid}
          open={open}
          loading={loading}
        >
          <div className="dialog-content">
            <>
              <div>
                <Controller
                  render={({ onChange, value, ref }) => (
                    <FormControlTextField
                      value={value}
                      onChange={onChange}
                      label={<FormattedMessage id="IDS_CHAT_USERNAME" />}
                      formControlStyle={{ width: "100%", marginRight: 0 }}
                      inputProps={{ maxLength: 50, autoComplete: "none" }}
                      inputRef={ref}
                      errorMessage={errors.userName?.message}
                    />
                  )}
                  name="userName"
                  control={control}
                />
                <Controller
                  render={({ onChange, value, ref }) => (
                    <FormControlTextField
                      value={value}
                      onChange={onChange}
                      label={<FormattedMessage id="Mật khẩu" />}
                      formControlStyle={{ width: "100%", marginRight: 0 }}
                      inputProps={{ maxLength: 50, autoComplete: "none" }}
                      errorMessage={errors.password?.message}
                      inputRef={ref}
                      type="password"
                    />
                  )}
                  name="password"
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
                      inputRef={ref}
                      errorMessage={errors.email?.message}
                      type="email"
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
                      inputRef={ref}
                      type="number"
                      errorMessage={errors.phoneNumber?.message}
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
                      inputRef={ref}
                      type="date"
                      errorMessage={errors.dateOfBirth?.message}
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
                      {valid && gender === "" && (
                        <Typography
                          style={{
                            fontSize: 15,
                            color: "#f5584d",
                            fontWeight: 400,
                          }}
                        >
                          Giới tính không được để trống
                        </Typography>
                      )}
                    </>
                  }
                  name="gender"
                  control={control}
                />
              </div>
            </>
            {/* <FirebaseUploadAvatar /> */}
          </div>
        </ActionDialogCreate>
      </form>
    </>
  );
};

export default withRouter(ActionAccontDialogCreate);
