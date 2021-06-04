import { yupResolver } from "@hookform/resolvers/yup";
import { Typography } from "@material-ui/core";
import { Editor } from "@tinymce/tinymce-react";
import JSONbig from "json-bigint";
import { useSnackbar } from "notistack";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { FormattedMessage } from "react-intl";
import { RouteComponentProps, withRouter } from "react-router-dom";
import * as yup from "yup";
import { some, SUCCESS_CODE } from "../../../../constants/constants";
import { Col, snackbarSetting } from "../../../common/Elements";
import FormControlTextField from "../../../common/FormControlTextField";
import ActionDialogCreate from "../../components/ActionDialogCreate";
import FirebaseUpload from "../../firebaseupload/FirebaseUpload";
import { actionAddProduct } from "../../managerAction";
import ProductCategory from "./ProductCategory";
interface Props {
  fetchData: () => void;
}

const ActionProductDialogCreate: React.FC<RouteComponentProps<any> & Props> = (
  props
) => {
  const { fetchData } = props;
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const [loading, setLoading] = useState<boolean>(false);
  const [description, setDescription] = useState<string>("");
  const [detail, setDetail] = useState<string>("");
  const [open, setOpen] = useState<boolean>(false);
  const [openCategory, setOpenCategory] = useState<boolean>(false);
  const [category, setCategory] = useState<any>({ name: "", id: "" });
  const [imageProducts, setImageProduct] = React.useState<string[]>();
  const [valid, setValid] = useState<boolean>(false);

  const schema = yup.object().shape({
    Name: yup.string().required("Tên sản phẩm không được để trống").nullable(),
    Price: yup.string().nullable().required("Giá sản phẩm không được để trống"),
    Color: yup.string().required("Màu sản phẩm không được để trống").nullable(),
    Size: yup
      .string()
      .required("Kích thước sản phẩm không được để trống")
      .nullable(),
    Discount: yup
      .string()
      .required("Giảm giá sản phẩm không được để trống")
      .nullable(),
    Quanlity: yup
      .string()
      .required("Số lượng sản phẩm không được để trống")
      .nullable(),
  });

  const { handleSubmit, getValues, control, formState } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      Name: "",
      Price: "0",
      Color: "",
      Size: "",
      detail: "",
      Description: "",
      CategoryID: "",
      category: "",
      Discount: "0",
      Quanlity: "0",
      Image: "",
      images: [],
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
  const handleEditorChange = (content: any, editor: any) => {
    setDescription(content);
  };
  const handleEditorChangeDetail = (content: any, editor: any) => {
    setDetail(content);
  };
  const onSubmit = async (data: any) => {
    setValid(true);
    if (category.name === "" || detail === "" || description === "") return;
    try {
      setLoading(true);
      const res: some = await actionAddProduct({
        ...data,
        StoreID: localStorage.getItem("StoreID"),
        Image: JSONbig.stringify(imageProducts),
        Price: Number(getValues("Price")),
        Discount: Number(getValues("Discount")),
        Quanlity: Number(getValues("Quanlity")),
        Description: description,
        Detail: detail,
        CategoryID: category.id,
      });
      if (res?.code === SUCCESS_CODE) {
        // const { data } = await actionGetEmployeesInfo();
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

  const handleClickCategory = (name: string, id: string) => {
    setCategory({ name: name, id: id });
    setOpenCategory(false);
  };

  React.useEffect(() => {
    if (open) {
      setCategory({ name: "", id: "" });
      setOpenCategory(false);
      setValid(false);
    }
  }, [open]);

  return (
    <>
      <form
        id="formProductDialogCreate"
        onSubmit={handleSubmit(onSubmit)}
        autoComplete="none"
      >
        <ActionDialogCreate
          maxWidth="lg"
          fullWidth={true}
          setOpen={setOpen}
          setValid={setValid}
          open={open}
          loading={loading}
          formId="formProductDialogCreate"
        >
          <div className="dialog-content">
            <>
              <div>
                <Controller
                  render={({ onChange, value, ref }) => (
                    <FormControlTextField
                      value={value}
                      onChange={onChange}
                      label={<FormattedMessage id="IDS_CHAT_NAME" />}
                      formControlStyle={{ width: "100%", marginRight: 0 }}
                      inputProps={{ autoComplete: "none" }}
                      inputRef={ref}
                      errorMessage={errors.Name?.message}
                    />
                  )}
                  name="Name"
                  control={control}
                />
                <Controller
                  render={({ onChange, value, ref }) => (
                    <FormControlTextField
                      value={value}
                      onChange={onChange}
                      label={<FormattedMessage id="IDS_CHAT_PRICE" />}
                      formControlStyle={{ width: "100%", marginRight: 0 }}
                      inputProps={{
                        maxLength: 50,
                        autoComplete: "none",
                        min: 0,
                      }}
                      errorMessage={errors.Price?.message}
                      inputRef={ref}
                      type="number"
                    />
                  )}
                  name="Price"
                  control={control}
                />
                <Controller
                  render={({ onChange, value, ref }) => (
                    <FormControlTextField
                      value={value}
                      onChange={onChange}
                      label={<FormattedMessage id="IDS_CHAT_COLOR" />}
                      formControlStyle={{ width: "100%", marginRight: 0 }}
                      inputProps={{ maxLength: 50, autoComplete: "none" }}
                      errorMessage={errors.Color?.message}
                      inputRef={ref}
                    />
                  )}
                  name="Color"
                  control={control}
                />
                <Controller
                  render={({ onChange, value, ref }) => (
                    <FormControlTextField
                      value={value}
                      onChange={onChange}
                      label={<FormattedMessage id="IDS_CHAT_SIZE" />}
                      formControlStyle={{ width: "100%", marginRight: 0 }}
                      inputProps={{ maxLength: 50, autoComplete: "none" }}
                      errorMessage={errors.Size?.message}
                      inputRef={ref}
                    />
                  )}
                  name="Size"
                  control={control}
                />
                <Col>
                  <Typography variant="body2" style={{ marginBottom: 8 }}>
                    Mô tả sản phẩm{" "}
                  </Typography>
                  <Editor
                    apiKey="rs7klqs81kmp0ditu5in0vsgzarmmg47ys49ch992rmq9fdj"
                    // value={changeHtmlEditor1}
                    init={{
                      menubar: true,
                      paste_data_images: true,
                      branding: false,
                      draggable_modal: true,
                      protect: [
                        /<\/?(if|endif)>/g, // Protect <if> & </endif>
                      ],
                      formats: {
                        bold: [
                          { inline: "strong", remove: "all" },
                          { inline: "span", styles: { fontWeight: "bold" } },
                          { inline: "b", remove: "none" },
                        ],
                      },
                      font_formats:
                        "Andale Mono=andale mono,times; Arial=arial,helvetica,sans-serif; Arial Black=arial black,avant garde; Book Antiqua=book antiqua,palatino; Comic Sans MS=comic sans ms,sans-serif; Courier New=courier new,courier; Georgia=georgia,palatino; Helvetica=helvetica; Impact=impact,chicago; Oswald=oswald; Symbol=symbol; Tahoma=tahoma,arial,helvetica,sans-serif; Terminal=terminal,monaco; Times New Roman=times new roman,times; Trebuchet MS=trebuchet ms,geneva; Verdana=verdana,geneva; Webdings=webdings; Wingdings=wingdings,zapf dingbats;Roboto=roboto;",
                      content_style:
                        "@import url('https://fonts.googleapis.com/css2?family=Lato:wght@900&family=Roboto&display=swap'); body { font-family: 'Roboto', sans-serif; } h1,h2,h3,h4,h5,h6 { font-family: 'Lato', sans-serif; }",
                      plugins: [
                        " spellchecker,insertdatetime,directionality,fullscreen,noneditable,visualchars,nonbreaking,template, hr",
                        "advlist autolink lists link image charmap print preview anchor pagebreak codesample ",
                        "searchreplace visualblocks  fullscreen ",
                        "insertdatetime media table paste  help wordcount save emoticons ",
                      ],
                      toolbar:
                        "undo redo | codesample table hr |fontselect fontsizeselect formatselect | bold italic backcolor| alignleft aligncenter alignright alignjustify | " +
                        "bullist numlist outdent indent |  image media template link anchor | print preview  fullscreen  | " +
                        "forecolor backcolor charmap emoticons| checklist pagebreak  | help",
                    }}
                    onEditorChange={handleEditorChange}
                  />
                  {valid && description === "" && (
                    <Typography
                      style={{
                        fontSize: 15,
                        color: "#f5584d",
                        fontWeight: 400,
                      }}
                    >
                      Mô tả không được để trống
                    </Typography>
                  )}
                </Col>
                <Col>
                  <Typography
                    variant="body2"
                    style={{ marginBottom: 8, marginTop: 20 }}
                  >
                    Thông tin chi tiết
                  </Typography>
                  <Editor
                    apiKey="rs7klqs81kmp0ditu5in0vsgzarmmg47ys49ch992rmq9fdj"
                    // value={changeHtmlEditor1}
                    init={{
                      menubar: true,
                      paste_data_images: true,
                      branding: false,
                      draggable_modal: true,
                      protect: [
                        /<\/?(if|endif)>/g, // Protect <if> & </endif>
                      ],
                      formats: {
                        bold: [
                          { inline: "strong", remove: "all" },
                          { inline: "span", styles: { fontWeight: "bold" } },
                          { inline: "b", remove: "none" },
                        ],
                      },
                      font_formats:
                        "Andale Mono=andale mono,times; Arial=arial,helvetica,sans-serif; Arial Black=arial black,avant garde; Book Antiqua=book antiqua,palatino; Comic Sans MS=comic sans ms,sans-serif; Courier New=courier new,courier; Georgia=georgia,palatino; Helvetica=helvetica; Impact=impact,chicago; Oswald=oswald; Symbol=symbol; Tahoma=tahoma,arial,helvetica,sans-serif; Terminal=terminal,monaco; Times New Roman=times new roman,times; Trebuchet MS=trebuchet ms,geneva; Verdana=verdana,geneva; Webdings=webdings; Wingdings=wingdings,zapf dingbats;Roboto=roboto;",
                      content_style:
                        "@import url('https://fonts.googleapis.com/css2?family=Lato:wght@900&family=Roboto&display=swap'); body { font-family: 'Roboto', sans-serif; } h1,h2,h3,h4,h5,h6 { font-family: 'Lato', sans-serif; }",
                      plugins: [
                        " spellchecker,insertdatetime,directionality,fullscreen,noneditable,visualchars,nonbreaking,template, hr",
                        "advlist autolink lists link image charmap print preview anchor pagebreak codesample ",
                        "searchreplace visualblocks  fullscreen ",
                        "insertdatetime media table paste  help wordcount save emoticons ",
                      ],
                      toolbar:
                        "undo redo | codesample table hr |fontselect fontsizeselect formatselect | bold italic backcolor| alignleft aligncenter alignright alignjustify | " +
                        "bullist numlist outdent indent |  image media template link anchor | print preview  fullscreen  | " +
                        "forecolor backcolor charmap emoticons| checklist pagebreak  | help",
                    }}
                    onEditorChange={handleEditorChangeDetail}
                  />
                  {valid && detail === "" && (
                    <Typography
                      style={{
                        fontSize: 15,
                        color: "#f5584d",
                        fontWeight: 400,
                      }}
                    >
                      Thông tin chi tiết không được để trống
                    </Typography>
                  )}
                </Col>
                <Controller
                  render={({ onChange, value, ref }) => (
                    <FormControlTextField
                      value={value}
                      onChange={onChange}
                      label={<FormattedMessage id="IDS_CHAT_DISCOUNT" />}
                      formControlStyle={{
                        width: "100%",
                        marginRight: 0,
                        marginTop: 20,
                      }}
                      inputProps={{
                        maxLength: 50,
                        autoComplete: "none",
                        min: 0,
                      }}
                      errorMessage={errors.Discount?.message}
                      type="number"
                      inputRef={ref}
                    />
                  )}
                  name="Discount"
                  control={control}
                />
                <Controller
                  render={({ onChange, value, ref }) => (
                    <FormControlTextField
                      value={value}
                      onChange={onChange}
                      label={<FormattedMessage id="IDS_CHAT_QUANLITY" />}
                      formControlStyle={{ width: "100%", marginRight: 0 }}
                      inputProps={{
                        maxLength: 50,
                        autoComplete: "none",
                        min: 0,
                      }}
                      errorMessage={errors.Quanlity?.message}
                      inputRef={ref}
                      type="number"
                    />
                  )}
                  name="Quanlity"
                  control={control}
                />
                <Controller
                  as={React.forwardRef((itemProps: any, ref) => (
                    <FormControlTextField
                      {...itemProps}
                      label={<FormattedMessage id="IDS_CHAT_CATEGORY" />}
                      formControlStyle={{ width: "100%", marginRight: 0 }}
                      inputProps={{ maxLength: 50, autoComplete: "none" }}
                      inputRef={ref}
                      value={category.name}
                      errorMessage={
                        valid &&
                        category.name === "" &&
                        "Danh mục sản phẩm không được để trống"
                      }
                      onClick={() => setOpenCategory(true)}
                    />
                  ))}
                  name="Category"
                  control={control}
                />
                <ProductCategory
                  openCategory={openCategory}
                  handleClickCategory={handleClickCategory}
                />
              </div>
            </>
            <FirebaseUpload
              updateImage={(values: string[]) => {
                setImageProduct(values);
              }}
              images={[]}
              key="keyFirebaseUploadProductCreate"
            />
          </div>
        </ActionDialogCreate>
      </form>
    </>
  );
};

export default withRouter(ActionProductDialogCreate);
