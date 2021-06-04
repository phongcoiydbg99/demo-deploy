import { useSnackbar } from "notistack";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { FormattedMessage, useIntl } from "react-intl";
import { RouteComponentProps, withRouter } from "react-router-dom";
import { some, SUCCESS_CODE } from "../../../../constants/constants";
import { snackbarSetting } from "../../../common/Elements";
import FormControlTextField from "../../../common/FormControlTextField";
import ActionDialogCreate from "../../components/ActionDialogCreate";

interface Props {
  // fetchData: () => void;
}

const ActionTransactionDialogCreate: React.FC<
  RouteComponentProps<any> & Props
> = (props) => {
  const intl = useIntl();
  // const { item, fetchData } = props;
  const {} = props;
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const [loading, setLoading] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(false);
  const [amsUsers, setAmsUsers] = useState<some[]>([]);
  const [teams, setTeams] = useState<some[]>([]);
  const [textSearch, setTextSearch] = useState<string>("");

  const { getValues, control, reset } = useForm({
    defaultValues: {
      id: "",
      userName: "",
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

  const showNotifySnack = (res: any) => {
    enqueueSnackbar(
      res?.message,
      snackbarSetting((key) => closeSnackbar(key), {
        color: res?.code === SUCCESS_CODE ? "success" : "error",
      })
    );
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);
      let res: some = {};
      // if (item) {
      //   res = await actionOneEmployeeJoinMultiTeams({
      //     employee: {
      //       id: item?.id,
      //       phone: item?.phone,
      //       email: item?.email,
      //       status,
      //     },
      //     teamIds: getValues("team")?.map((el: some) => el?.id),
      //   });
      // } else {
      //   res = await actionMultiEmployeesJoinOneTeam({
      //     employeeIds: getValues("employee")?.map((el: some) => el?.id),
      //     teamId: getValues("team")?.id,
      //   });
      // }
      // if (res?.code === SUCCESS_CODE) fetchData();
      // showNotifySnack(res);
      // setOpen(false);
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <form onSubmit={() => handleSubmit} autoComplete="none">
        <ActionDialogCreate
          maxWidth="lg"
          fullWidth={true}
          setOpen={setOpen}
          open={open}
          loading={loading}
          handleSubmit={handleSubmit}
        >
          <div className="dialog-content">
            <>
              <div>
                <Controller
                  as={React.forwardRef((itemProps: any, ref) => (
                    <FormControlTextField
                      {...itemProps}
                      label={<FormattedMessage id="IDS_CHAT_NAME" />}
                      formControlStyle={{ width: "100%", marginRight: 0 }}
                      inputProps={{ maxLength: 50, autoComplete: "none" }}
                      optional
                      inputRef={ref}
                    />
                  ))}
                  name="name"
                  control={control}
                />
                <Controller
                  as={React.forwardRef((itemProps: any, ref) => (
                    <FormControlTextField
                      {...itemProps}
                      label={<FormattedMessage id="IDS_CHAT_FIRSTNAME" />}
                      formControlStyle={{ width: "100%", marginRight: 0 }}
                      inputProps={{ maxLength: 50, autoComplete: "none" }}
                      optional
                      inputRef={ref}
                    />
                  ))}
                  name="firstName"
                  control={control}
                />
                <Controller
                  as={React.forwardRef((itemProps: any, ref) => (
                    <FormControlTextField
                      {...itemProps}
                      label={<FormattedMessage id="IDS_CHAT_LASTNAME" />}
                      formControlStyle={{ width: "100%", marginRight: 0 }}
                      inputProps={{ maxLength: 50, autoComplete: "none" }}
                      optional
                      inputRef={ref}
                    />
                  ))}
                  name="lastName"
                  control={control}
                />
                <Controller
                  as={React.forwardRef((itemProps: any, ref) => (
                    <FormControlTextField
                      {...itemProps}
                      label={<FormattedMessage id="IDS_CHAT_EMAIL" />}
                      formControlStyle={{ width: "100%", marginRight: 0 }}
                      inputProps={{ maxLength: 50, autoComplete: "none" }}
                      optional
                      inputRef={ref}
                    />
                  ))}
                  name="email"
                  control={control}
                />
                <Controller
                  as={React.forwardRef((itemProps: any, ref) => (
                    <FormControlTextField
                      {...itemProps}
                      label={<FormattedMessage id="IDS_CHAT_PHONE" />}
                      formControlStyle={{ width: "100%", marginRight: 0 }}
                      inputProps={{ maxLength: 50, autoComplete: "none" }}
                      optional
                      inputRef={ref}
                    />
                  ))}
                  name="phoneNumber"
                  control={control}
                />
                <Controller
                  as={React.forwardRef((itemProps: any, ref) => (
                    <FormControlTextField
                      {...itemProps}
                      label={<FormattedMessage id="IDS_CHAT_DATE_OF_BIRTH" />}
                      formControlStyle={{ width: "100%", marginRight: 0 }}
                      inputProps={{ maxLength: 50, autoComplete: "none" }}
                      optional
                      inputRef={ref}
                    />
                  ))}
                  name="dateOfBirth"
                  control={control}
                />
              </div>
            </>
          </div>
        </ActionDialogCreate>
      </form>
    </>
  );
};

export default withRouter(ActionTransactionDialogCreate);
