import {
  FormControlLabel,
  Radio,
  RadioGroup,
  TextField,
} from '@material-ui/core';
import { useSnackbar } from 'notistack';
import React, { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { FormattedMessage, useIntl } from 'react-intl';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { GREY_300 } from '../../../../assets/theme/colors';
import { some, SUCCESS_CODE } from '../../../../constants/constants';
import { isEmpty } from '../../../../utils/helpers/helpers';
import { Row, snackbarSetting } from '../../../common/Elements';
import FormControlAutoComplete from '../../../common/FormControlAutoComplete';
import FormControlTextField from '../../../common/FormControlTextField';
import SingleSelect from '../../../common/SingleSelect';
import ActionDialog from '../../components/ActionDialog';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

interface Props {
  item?: some;
  // fetchData: () => void;
}
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      display: 'flex',
      flexWrap: 'wrap',
    },
    textField: {
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
      width: 200,
    },
  })
);
const ActionStoreDialog: React.FC<RouteComponentProps<any> & Props> = (
  props
) => {
  const intl = useIntl();
  // const { item, fetchData } = props;
  const { item } = props;
  const classes = useStyles();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const [loading, setLoading] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(false);
  const [amsUsers, setAmsUsers] = useState<some[]>([]);
  const [teams, setTeams] = useState<some[]>([]);
  const [textSearch, setTextSearch] = useState<string>('');

  const { getValues, control, reset } = useForm({
    defaultValues: {
      id: !isEmpty(item) ? item?.id : null,
      name: !isEmpty(item) ? item?.name : null,
      status: !isEmpty(item) ? item?.status : null,
      email: !isEmpty(item) ? item?.email : null,
      phoneNumber: !isEmpty(item) ? item?.phoneNumber : null,
      gender: !isEmpty(item) ? item?.gender : null,
      userName: !isEmpty(item) ? item?.userName : null,
      profilePhoto: !isEmpty(item) ? item?.profilePhoto : null,
      firstName: !isEmpty(item) ? item?.firstName : null,
      lastName: !isEmpty(item) ? item?.lastName : null,
      followStores: !isEmpty(item) ? item?.followStores : null,
      dateOfBirth: !isEmpty(item) ? item?.dateOfBirth : null,
    },
  });

  const showNotifySnack = (res: any) => {
    enqueueSnackbar(
      res?.message,
      snackbarSetting((key) => closeSnackbar(key), {
        color: res?.code === SUCCESS_CODE ? 'success' : 'error',
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
      <form onSubmit={() => handleSubmit} autoComplete='none'>
        <ActionDialog
          maxWidth='lg'
          fullWidth={true}
          setOpen={setOpen}
          open={open}
          loading={loading}
          handleSubmit={handleSubmit}
          item={item || []}
        >
          <div className='dialog-content'>
            <>
              <div>
                <Controller
                  as={React.forwardRef((itemProps: any, ref) => (
                    <FormControlTextField
                      {...itemProps}
                      style={{ background: GREY_300 }}
                      label={<FormattedMessage id='IDS_CHAT_ID' />}
                      formControlStyle={{ width: '100%', marginRight: 0 }}
                      value={item?.id}
                      inputProps={{ maxLength: 50, autoComplete: 'none' }}
                      optional
                      inputRef={ref}
                      disabled
                    />
                  ))}
                  name='id'
                  control={control}
                />
                <Controller
                  as={React.forwardRef((itemProps: any, ref) => (
                    <FormControlTextField
                      {...itemProps}
                      label={<FormattedMessage id='IDS_CHAT_NAME' />}
                      formControlStyle={{ width: '100%', marginRight: 0 }}
                      inputProps={{ maxLength: 50, autoComplete: 'none' }}
                      optional
                      inputRef={ref}
                    />
                  ))}
                  name='name'
                  control={control}
                />
                <Controller
                  as={React.forwardRef((itemProps: any, ref) => (
                    <FormControlTextField
                      {...itemProps}
                      label={<FormattedMessage id='IDS_CHAT_EMAIL' />}
                      formControlStyle={{ width: '100%', marginRight: 0 }}
                      inputProps={{ maxLength: 50, autoComplete: 'none' }}
                      optional
                      inputRef={ref}
                    />
                  ))}
                  name='email'
                  control={control}
                />
                <Controller
                  as={React.forwardRef((itemProps: any, ref) => (
                    <FormControlTextField
                      {...itemProps}
                      label={<FormattedMessage id='IDS_CHAT_PHONE' />}
                      formControlStyle={{ width: '100%', marginRight: 0 }}
                      inputProps={{ maxLength: 50, autoComplete: 'none' }}
                      optional
                      inputRef={ref}
                    />
                  ))}
                  name='phoneNumber'
                  control={control}
                />
                <Controller
                  as={React.forwardRef((itemProps: any, ref) => (
                    <FormControlTextField
                      {...itemProps}
                      label={<FormattedMessage id='IDS_USERNAME' />}
                      formControlStyle={{ width: '100%', marginRight: 0 }}
                      inputProps={{ maxLength: 50, autoComplete: 'none' }}
                      optional
                      inputRef={ref}
                    />
                  ))}
                  name='userName'
                  control={control}
                />
                <Controller
                  as={React.forwardRef((itemProps: any, ref) => (
                    <FormControlTextField
                      {...itemProps}
                      label={<FormattedMessage id='IDS_CHAT_FIRSTNAME' />}
                      formControlStyle={{ width: '100%', marginRight: 0 }}
                      inputProps={{ maxLength: 50, autoComplete: 'none' }}
                      optional
                      inputRef={ref}
                    />
                  ))}
                  name='firstName'
                  control={control}
                />
                <Controller
                  as={React.forwardRef((itemProps: any, ref) => (
                    <FormControlTextField
                      {...itemProps}
                      label={<FormattedMessage id='IDS_CHAT_LASTNAME' />}
                      formControlStyle={{ width: '100%', marginRight: 0 }}
                      inputProps={{ maxLength: 50, autoComplete: 'none' }}
                      optional
                      inputRef={ref}
                    />
                  ))}
                  name='lastName'
                  control={control}
                />
                <Controller
                  as={
                    <RadioGroup aria-label='gender'>
                      <Row>
                        <FormControlLabel
                          value='F'
                          control={<Radio />}
                          label='Female'
                        />
                        <FormControlLabel
                          value='M'
                          control={<Radio />}
                          label='Male'
                        />
                      </Row>
                    </RadioGroup>
                  }
                  name='gender'
                  control={control}
                />
                <Controller
                  as={React.forwardRef((itemProps: any, ref) => (
                    <TextField
                      {...itemProps}
                      id='date'
                      label='Birthday'
                      type='date'
                      className={classes.textField}
                      InputLabelProps={{
                        shrink: true,
                      }}
                    />
                  ))}
                  name='dateOfBirth'
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

export default withRouter(ActionStoreDialog);
