import { Box, Button, Grid, IconButton } from "@material-ui/core";
import Dialog from "@material-ui/core/Dialog";
import MuiDialogContent from "@material-ui/core/DialogContent";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import {
  createStyles,
  Theme,
  withStyles,
  WithStyles,
} from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import CloseIcon from "@material-ui/icons/Close";
import DescriptionIcon from "@material-ui/icons/Description";
import React, { useState } from "react";
import { FormattedMessage } from "react-intl";
import { RouteComponentProps, withRouter } from "react-router-dom";
import { BLUE_NAVY, GREY_600 } from "../../../../assets/theme/colors";
import { some } from "../../../../constants/constants";
import { formatter } from "../../../../utils/helpers/helpers";
import { Row } from "../../../common/Elements";
import TableCustom from "../../../common/TableCustom";

interface Props {
  item?: some;
}

const styles = (theme: Theme) =>
  createStyles({
    root: {
      margin: 0,
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(2),
    },
    closeButton: {
      position: "absolute",
      right: theme.spacing(1),
      top: theme.spacing(1),
      color: theme.palette.grey[500],
    },
  });

export interface DialogTitleProps extends WithStyles<typeof styles> {
  id: string;
  children: React.ReactNode;
  onClose: () => void;
}

const DialogTitle = withStyles(styles)((props: DialogTitleProps) => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton
          aria-label="close"
          className={classes.closeButton}
          onClick={onClose}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles((theme: Theme) => ({
  root: {
    padding: theme.spacing(3),
  },
}))(MuiDialogContent);

const ActionTransactionDialog: React.FC<RouteComponentProps<any> & Props> = (
  props
) => {
  const { item } = props;
  const { pathname } = props?.location;
  const [open, setOpen] = useState<boolean>(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const columns = [
    {
      width: 100,
      styleHeader: { color: GREY_600 },
      render: (record: any) => {
        const list: string[] = JSON.parse(record?.image);
        return (
          <Row>
            <img
              style={{ width: "100%" }}
              src={
                list
                  ? list[0]
                  : "https://www.événementiel.net/wp-content/uploads/2014/02/default-placeholder.png"
              }
              alt={record?.name}
            />
          </Row>
        );
      },
    },
    {
      title: "IDS_CHAT_NAME",
      dataIndex: "name",
      styleHeader: { color: GREY_600 },
      render: (record: any) => {
        return (
          <p
            // variant="inherit"
            style={{
              width: 200,
              overflow: "hidden",
              whiteSpace: "nowrap",
              textOverflow: "ellipsis",
            }}
          >
            {record?.name}
          </p>
        );
      },
    },
    {
      title: "IDS_CHAT_PRICE",
      dataIndex: "price",
      styleHeader: { color: GREY_600 },
      render: (record: any) => {
        return (
          <Typography
            style={{
              fontSize: 12,
            }}
          >
            {formatter(record.price)}
          </Typography>
        );
      },
    },
    {
      title: "IDS_CHAT_COLOR",
      dataIndex: "color",
      styleHeader: { color: GREY_600 },
    },
    {
      title: "IDS_CHAT_SIZE",
      dataIndex: "size",
      styleHeader: { color: GREY_600 },
    },
    {
      title: "IDS_CHAT_DISCOUNT",
      dataIndex: "discount",
      styleHeader: { color: GREY_600 },
    },
    {
      title: "IDS_CHAT_DISCOUNT",
      dataIndex: "discount",
      styleHeader: { color: GREY_600 },
    },
    {
      title: "IDS_CHAT_QUANLITY",
      dataIndex: "quanlity",
      styleHeader: { color: GREY_600 },
    },
  ];
  return (
    <>
      {item ? (
        <IconButton title="Chỉnh sửa" onClick={handleOpen}>
          <DescriptionIcon color="primary" />
        </IconButton>
      ) : (
        <Button
          variant="contained"
          color="secondary"
          size="small"
          style={{ minWidth: 132, marginLeft: 24, background: BLUE_NAVY }}
          disableElevation
          onClick={handleOpen}
        >
          <FormattedMessage
            id="IDS_CHAT_CREATE"
            values={{ value: pathname.split("/").pop() }}
          />
        </Button>
      )}
      <Dialog
        fullWidth={true}
        maxWidth="lg"
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <DialogTitle id="customized-dialog-title" onClose={handleClose}>
          Chi tiết đơn hàng
        </DialogTitle>
        <DialogContent dividers>
          <Grid container spacing={0} style={{ width: "50%" }}>
            <Grid item xs={12} sm={12}>
              <Typography>
                <Box
                  fontWeight="fontWeightBold"
                  fontSize={16}
                  marginBottom={1}
                  style={{
                    display: "flex",
                  }}
                >
                  Thông tin đơn hàng:
                </Box>
              </Typography>
            </Grid>
            <Grid
              item
              xs={12}
              sm={4}
              style={{
                paddingLeft: 20,
              }}
            >
              <Typography>
                <Box
                  fontSize={14}
                  marginBottom={1}
                  style={{
                    display: "flex",
                  }}
                >
                  Tài khoản:
                </Box>
              </Typography>
            </Grid>
            <Grid item xs={12} sm={7}>
              <Typography>
                <Box
                  fontSize={14}
                  marginBottom={1}
                  style={{
                    display: "flex",
                  }}
                >
                  {item?.buyerAccount}
                </Box>
              </Typography>
            </Grid>
            <Grid
              item
              xs={12}
              sm={4}
              style={{
                paddingLeft: 20,
              }}
            >
              <Typography>
                <Box
                  fontSize={14}
                  marginBottom={1}
                  style={{
                    display: "flex",
                  }}
                >
                  Thời gian đặt hàng:
                </Box>
              </Typography>
            </Grid>
            <Grid item xs={12} sm={7}>
              <Typography>
                <Box
                  fontSize={14}
                  marginBottom={1}
                  style={{
                    display: "flex",
                  }}
                >
                  {item?.orderTime}
                </Box>
              </Typography>
            </Grid>
            <Grid
              item
              xs={12}
              sm={4}
              style={{
                paddingLeft: 20,
              }}
            >
              <Typography>
                <Box
                  fontSize={14}
                  marginBottom={1}
                  style={{
                    display: "flex",
                  }}
                >
                  Thời gian giao hàng:
                </Box>
              </Typography>
            </Grid>
            <Grid item xs={12} sm={7}>
              <Typography>
                <Box
                  fontSize={14}
                  marginBottom={1}
                  style={{
                    display: "flex",
                  }}
                >
                  {item?.status === 1
                    ? new Date(item?.shipTime).toLocaleString()
                    : "Chưa giao"}
                </Box>
              </Typography>
            </Grid>
            <Grid
              item
              xs={12}
              sm={4}
              style={{
                paddingLeft: 20,
              }}
            >
              <Typography>
                <Box
                  fontSize={14}
                  marginBottom={1}
                  style={{
                    display: "flex",
                  }}
                >
                  Trạng thái :
                </Box>
              </Typography>
            </Grid>
            <Grid item xs={12} sm={7}>
              <Typography
                style={{
                  fontSize: 12,
                  color:
                    item?.status === 1
                      ? "green"
                      : item?.status === 2
                      ? "red"
                      : "grey",
                }}
              >
                {item?.status === 1
                  ? "Đã giao"
                  : item?.status === 2
                  ? "Đã hủy"
                  : "Chưa giao"}
              </Typography>
            </Grid>
            <Grid
              item
              xs={12}
              sm={4}
              style={{
                paddingLeft: 20,
              }}
            >
              <Typography>
                <Box
                  fontSize={14}
                  marginBottom={1}
                  style={{
                    display: "flex",
                  }}
                >
                  Số lượng sản phẩm:
                </Box>
              </Typography>
            </Grid>
            <Grid item xs={12} sm={7}>
              <Typography>
                <Box
                  fontSize={14}
                  marginBottom={1}
                  style={{
                    display: "flex",
                  }}
                >
                  {item?.productQuantity}
                </Box>
              </Typography>
            </Grid>
            <Grid
              item
              xs={12}
              sm={4}
              style={{
                paddingLeft: 20,
              }}
            >
              <Typography>
                <Box
                  fontSize={14}
                  marginBottom={1}
                  style={{
                    display: "flex",
                  }}
                >
                  Tổng tiền:
                </Box>
              </Typography>
            </Grid>
            <Grid item xs={12} sm={7}>
              <Typography>
                <Box
                  fontSize={14}
                  marginBottom={1}
                  style={{
                    display: "flex",
                  }}
                >
                  {formatter(item?.productsTotal)}
                </Box>
              </Typography>
            </Grid>
            <Grid item xs={12} sm={12}>
              <Typography>
                <Box
                  fontWeight="fontWeightBold"
                  fontSize={16}
                  marginBottom={1}
                  style={{
                    display: "flex",
                    marginBottom: 20,
                  }}
                >
                  Danh sách sản phẩm:
                </Box>
              </Typography>
            </Grid>
          </Grid>
          <Grid container xs={12} sm={12}>
            <TableCustom
              dataSource={item?.products || []}
              columns={columns}
              noColumnIndex
            />
          </Grid>
        </DialogContent>
        {/* <DialogActions>
          <Button autoFocus onClick={handleClose} color="primary">
            Save changes
          </Button>
        </DialogActions> */}
      </Dialog>
    </>
  );
};

export default withRouter(ActionTransactionDialog);
