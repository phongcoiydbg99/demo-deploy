import { Box, Button, IconButton, Typography } from "@material-ui/core";
import LinearProgress from "@material-ui/core/LinearProgress";
import ClearIcon from "@material-ui/icons/Clear";
import PublishIcon from "@material-ui/icons/Publish";
import React, { useState } from "react";
import { some } from "../../../constants/constants";
import { storage } from "../../../firebase";
import { Col, Row } from "../../common/Elements";

const FirebaseUploadAvatar = (props: some) => {
  const [image, setImage] = useState<any>(null);
  const [url, setUrl] = useState("");
  const [progress, setProgress] = useState(0);

  const handleChange = (e: any) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
      handleUpload(e.target.files[0]);
    }
  };

  const handleUpload = (image: any) => {
    if (image) {
      const uploadTask = storage.ref(`images/${image?.name}`).put(image);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          );
          setProgress(progress);
        },
        (error) => {
          console.log(error);
        },
        () => {
          storage
            .ref("images")
            .child(image.name)
            .getDownloadURL()
            .then((url) => {
              setUrl(url);
            });
        }
      );
    }
  };

  const deleteImage = () => {
    setUrl("");
  };

  return (
    <Col style={{ width: "100%",display: "flex", justifyContent: "center", alignItems: "center" }}>
      <Row style={{ width: "100%", display: "flex", justifyContent: "flex-end" }}>
        <Button
          style={{ width: 100 }}
          variant="contained"
          color="secondary"
          component="label"
          startIcon={<PublishIcon />}
        >
          Upload
          <input type="file" hidden onChange={handleChange} />
        </Button>
      </Row>

      <Col>
        {image && (
          <>
            <LinearProgress
              variant="determinate"
              value={progress}
              valueBuffer={100}
              style={{
                width: 300,
                display: "flex",
                marginTop: 10,
              }}
            />

            <Box style={{ position: "relative" }}>
              <img
                style={{
                  width: 300,
                  height: 300,
                  marginRight: 10,
                  marginBottom: 10,
                  borderStyle: "solid",
                  borderWidth: 1,
                }}
                src={url || "http://via.placeholder.com/300"}
                alt="No image"
              />
              <IconButton
                style={{
                  position: "absolute",
                  marginLeft: -50,
                  marginTop: -7,
                  color: "orange",
                }}
                onClick={() => deleteImage()}
              >
                <ClearIcon fontSize="small" />
              </IconButton>
            </Box>
          </>
        )}
      </Col>
    </Col>
  );
};

export default FirebaseUploadAvatar;
