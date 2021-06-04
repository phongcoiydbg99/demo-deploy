import { InputBaseProps } from "@material-ui/core";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import React, { useState } from "react";
import { Col } from "../../../common/Elements";
import FormControlTextField from "../../../common/FormControlTextField";
import ProductCategory from "./ProductCategory";

export interface FormControlTextFieldProps extends InputBaseProps {
  id?: string;
  label?: React.ReactNode;
  formControlStyle?: React.CSSProperties;
  onChange?: React.ChangeEventHandler<HTMLTextAreaElement | HTMLInputElement>;
  errorMessage?: string;
  optional?: boolean;
  focused?: boolean;
  helpText?: string;
  className?: string;
  disableError?: boolean;
  categoryID(id: string): void;
  categoryData: any;
  setCategoryData(data: any): void;
}

const FormControlCategoryAutoComplete: React.FC<FormControlTextFieldProps> = (
  props
) => {
  const {
    id,
    label,
    formControlStyle,
    placeholder,
    onChange,
    categoryID,
    categoryData,
    setCategoryData,
  } = props;
  //   const [category, setCategory] = useState<any>(categoryData);
  const [openCategory, setOpenCategory] = useState<boolean>(false);

  const handleClickCategory = (name: string, id: string) => {
    setCategoryData({ name: name, id: id });
    categoryID(id);
    setOpenCategory(false);
  };

  const handleClose = () => {
    setOpenCategory(false);
  };

  return (
    <Col>
      <FormControlTextField
        id={id}
        label={label}
        placeholder={placeholder}
        onChange={onChange}
        formControlStyle={formControlStyle}
        value={categoryData.name}
        onClick={() => setOpenCategory(true)}
        optional
      />
      <Dialog
        onClose={handleClose}
        open={openCategory}
        maxWidth="md"
        fullWidth={true}
      >
        <DialogTitle id="dialog-category" style={{ width: 300 }}>
          Chọn danh mục:
        </DialogTitle>
        <ProductCategory
          openCategory={openCategory}
          handleClickCategory={handleClickCategory}
        />
      </Dialog>
    </Col>
  );
};
export default FormControlCategoryAutoComplete;
