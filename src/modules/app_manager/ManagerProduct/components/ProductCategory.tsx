import { TreeItem, TreeView } from "@material-ui/lab";
import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import { some, SUCCESS_CODE } from "../../../../constants/constants";
import { actionGetCategoryAllChildList } from "../../managerAction";
import { Box, CircularProgress } from "@material-ui/core";

interface Props {
  openCategory: boolean;
  handleClickCategory(name: string, id: string): void;
}

interface RenderTree {
  id: string;
  name: string;
  childList?: RenderTree[];
}

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
  },
});
const ProductCategory: React.FC<Props> = (props) => {
  const classes = useStyles();
  const { openCategory, handleClickCategory } = props;
  const [listCategory, setListCatergory] = React.useState<some>([]);
  const [loadding, setLoadding] = React.useState<boolean>(false);

  const fetchAllCategory = async () => {
    try {
      const res: some = await actionGetCategoryAllChildList({});
      if (res?.code === SUCCESS_CODE) {
        setListCatergory(res?.category.childList);
        setLoadding(true);
      } else {
        // none
      }
    } catch (error) {}
  };

  React.useEffect(() => {
    fetchAllCategory();
  }, []);

  const renderTree = (nodes: RenderTree) => (
    <TreeItem
      key={nodes.id}
      nodeId={nodes.id}
      label={nodes.name}
      onClick={() => {
        if (nodes.childList?.length === 0) {
          handleClickCategory(nodes.name, nodes.id);
        }
      }}
    >
      {Array.isArray(nodes.childList)
        ? nodes.childList.map((node) => renderTree(node))
        : null}
    </TreeItem>
  );

  return (
    <>
      {openCategory && (
        <Box
          style={{
            height: 250,
            overflow: "scroll",
            paddingLeft: 20,
            marginBottom: 20,
          }}
        >
          {!loadding && (
            <Box style={{
              height: "100%",
              width: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}>
              <CircularProgress />
            </Box>
          )}
          <TreeView
            className={classes.root}
            defaultCollapseIcon={<ExpandMoreIcon />}
            defaultExpandIcon={<ChevronRightIcon />}
          >
            {listCategory && listCategory.map((node: any) => renderTree(node))}
          </TreeView>
        </Box>
      )}
    </>
  );
};
export default ProductCategory;
