import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogProps,
  Divider,
  IconButton,
} from "@material-ui/core";
import IconClose from "@material-ui/icons/CloseOutlined";
import { BLUE_NAVY } from "../../assets/theme/colors";
import React from "react";
import { FormattedMessage } from "react-intl";
import { Row } from "./Elements";
import LoadingButton from "./LoadingButton";

interface Props extends DialogProps {
  fullWidth: boolean;
  open: boolean;
  loading?: boolean;
  disabled?: boolean;
  acceptLabel?: string;
  rejectLabel?: string;
  styleCloseBtn?: React.CSSProperties;
  styleHeader?: React.CSSProperties;
  onClose(): void;
  onAccept?(): void;
  titleLabel?: React.ReactNode;
  footerLabel?: React.ReactNode;
  onReject?: () => void;
  onExited?: () => void;
  formId?: string;
  setValid?: (val: boolean) => void;
}

const ConfirmDialog: React.FC<Props> = (props) => {
  const {
    maxWidth,
    fullWidth,
    open,
    styleCloseBtn,
    styleHeader,
    loading,
    onClose,
    onExited,
    onAccept,
    onReject,
    titleLabel,
    footerLabel,
    acceptLabel,
    rejectLabel,
    children,
    disabled,
    formId,
    setValid,
    ...rest
  } = props;
  return (
    <Dialog
      open={open}
      onClose={onClose}
      disableEnforceFocus
      PaperProps={{
        style: { minWidth: 420 },
      }}
      maxWidth={maxWidth}
      fullWidth={fullWidth}
      onExited={onExited}
      {...rest}
    >
      {titleLabel ? (
        <>
          <Row style={styleHeader}>
            <div style={{ flex: 1 }}>{titleLabel}</div>
            <IconButton
              style={{ padding: "8px", ...styleCloseBtn }}
              onClick={onClose}
            >
              <IconClose />
            </IconButton>
          </Row>
          <Divider />
        </>
      ) : (
        <IconButton
          style={{
            position: "absolute",
            right: 0,
            padding: 8,
            ...styleCloseBtn,
          }}
          onClick={onClose}
        >
          <IconClose />
        </IconButton>
      )}
      <DialogContent dividers>{children}</DialogContent>
      <Divider />
      <DialogActions style={{ padding: 16, justifyContent: "center" }}>
        {onAccept ? (
          <LoadingButton
            loading={loading}
            variant="contained"
            color="secondary"
            size="medium"
            style={{
              minWidth: 144,
              background: BLUE_NAVY,
              opacity: disabled ? 0.65 : 1,
            }}
            onClick={onAccept}
            disableElevation
            disabled={disabled}
          >
            <FormattedMessage id={acceptLabel || "IDS_ACCEPT"} />
          </LoadingButton>
        ) : (
          <LoadingButton
            loading={loading}
            variant="contained"
            color="secondary"
            size="medium"
            form={formId}
            type="submit"
            style={{
              minWidth: 144,
              background: BLUE_NAVY,
              opacity: disabled ? 0.65 : 1,
            }}
            disableElevation
            disabled={disabled}
            onClick={() => {
              setValid?.(true);
            }}
          >
            <FormattedMessage id={acceptLabel || "IDS_ACCEPT"} />
          </LoadingButton>
        )}

        {onReject && (
          <Button
            variant="outlined"
            size="medium"
            style={{ minWidth: 144, marginLeft: 24 }}
            onClick={onReject}
            disableElevation
          >
            <FormattedMessage id={rejectLabel || "IDS_REJECT"} />
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmDialog;
