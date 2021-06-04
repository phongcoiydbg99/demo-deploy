import { Button, DialogProps, Typography } from '@material-ui/core';
import React from 'react';
import { FormattedMessage } from 'react-intl';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { BLUE_NAVY } from '../../../assets/theme/colors';
import ConfirmDialog from '../../common/ConfirmDialog';
import AddIcon from '@material-ui/icons/Add';

interface Props {
  maxWidth: DialogProps['maxWidth'];
  formId?: string;
  fullWidth: boolean;
  open: boolean;
  loading: boolean;
  disabled?: boolean;
  setOpen: (val: boolean) => void;
  setValid?: (val: boolean) => void;
  handleSubmit?: () => void;
}

const ActionDialogCreate: React.FC<RouteComponentProps<any> & Props> = (
  props
) => {
  const {
    maxWidth,
    fullWidth,
    open,
    loading,
    disabled,
    setOpen,
    setValid,
    handleSubmit,
    formId,
    ...rest
  } = props;
  const { pathname } = props?.location;

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <Button
        variant='contained'
        color='secondary'
        size='small'
        style={{
          // minWidth: 132,
          // marginLeft: 24,
          background: BLUE_NAVY,
        }}
        disableElevation
        onClick={handleOpen}
      >
        {/* <FormattedMessage
          id="IDS_CHAT_CREATE"
          values={{ value: pathname.split("/").pop() }}
        /> */}
        <AddIcon />
      </Button>
      <ConfirmDialog
        titleLabel={
          <Typography variant='subtitle1' style={{ margin: '12px 16px' }}>
            <FormattedMessage
              id={'IDS_CHAT_CREATE'}
              values={{ value: pathname.split('/').pop() }}
            />
          </Typography>
        }
        maxWidth={maxWidth}
        fullWidth={fullWidth}
        open={open}
        onClose={handleClose}
        onReject={handleClose}
        onAccept={handleSubmit}
        setValid={setValid}
        loading={loading}
        disabled={disabled}
        formId={formId}
        {...rest}
      >
        <div style={{ padding: '24px 16px', minHeight: 120 }}>
          {props?.children}
        </div>
      </ConfirmDialog>
    </>
  );
};

export default withRouter(ActionDialogCreate);
