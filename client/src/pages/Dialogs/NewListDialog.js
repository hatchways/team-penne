import React, { useCallback, useEffect, useState } from "react";
import { useHistory } from "react-router";
import { useDropzone } from "react-dropzone";
import {
  Box,
  Button,
  Collapse,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  InputLabel,
  OutlinedInput
} from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import dialogStyles from "./Styles/dialogStyles";

function NewListDialog(props) {
  const [listName, setListName] = React.useState("");
  const [listNameError, setListNameError] = React.useState(false);
  const [activeImageBool, setActiveImageBool] = React.useState(false);
  const [activeImageBoolError, setActiveImageBoolError] = React.useState(false);
  const [imageUrl, setImageUrl] = React.useState("");
  const [imageUrlError, setImageUrlError] = React.useState(false);

  const classes = dialogStyles();
  const history = useHistory();

  // DROPZONE Functions
  const maxSize = 1048576;
  const [files, setFiles] = useState([]);

  const onDrop = useCallback(files => {
    setActiveImageBool(true);
    setFiles(
      files.map(file =>
        Object.assign(file, { preview: URL.createObjectURL(file) })
      )
    );
    const formData = new FormData();
    files.forEach((file, i) => {
      formData.append(i, file);
    });
    fetch("/itemLists/image-upload", {
      method: "POST",
      body: formData
    })
      .then(res => {
        return res.json();
      })
      .then(image => {
        setImageUrl(image.url);
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  const {
    isDragActive,
    getRootProps,
    getInputProps,
    isDragReject,
    rejectedFiles
  } = useDropzone({
    onDrop,
    accept: "image/*",
    minSize: 0,
    maxSize
  });

  const isFileTooLarge =
    rejectedFiles.length > 0 && rejectedFiles[0].size > maxSize;

  const dropzoneFilePreview = files.map(file => (
    <div className={classes.dropzoneOuter} key={file.name}>
      <div className={classes.dropzoneInner}>
        <img src={file.preview} className={classes.img} alt="list category" />
      </div>
    </div>
  ));

  // Variable Handlers
  const handleClose = () => {
    history.push(window.location.pathname.replace("/create-new-list", ""));
  };

  const changeListName = event => {
    setListName(event.target.value);
  };

  // Authentication
  // add anymore list validation
  const checkListName = lName => {
    return lName.length > 0;
  };

  const validateList = () => {
    let validListName = checkListName(listName);
    if (!validListName) {
      setListNameError(true);
    }
    if (!activeImageBool) {
      setActiveImageBoolError(true);
    }
    if (activeImageBool) {
      setActiveImageBoolError(false);
      if (!imageUrl) {
        setImageUrlError(true);
      }
    }
    if (validListName && imageUrl) {
      setListNameError(false);
      setImageUrlError(false);
      props.addItemList(listName, imageUrl);
      history.push(window.location.pathname.replace("/create-new-list", ""));
    }
  };

  const enterSubmit = event => {
    let keyCode = event.keyCode ? event.keyCode : event.which;
    if (keyCode === 13) {
      validateList();
    }
  };

  return (
    <Dialog
      scroll="paper"
      fullWidth
      onClose={handleClose}
      aria-labelledby="form-dialog-title"
      open={true}
    >
      <DialogTitle
        classes={{ root: classes.dialogTitle }}
        id="form-dialog-title"
      >
        Create a list
      </DialogTitle>
      <DialogContent classes={{ root: classes.dialogContent }}>
        <InputLabel classes={{ root: classes.inputLabel }}>
          Add a title*
        </InputLabel>
        <Container classes={{ root: classes.container }}>
          <OutlinedInput
            classes={{
              root: classes.outlinedInputRoot,
              input: classes.outlinedInputInput
            }}
            onKeyPress={enterSubmit}
            onChange={changeListName}
            placeholder="Enter name"
            id="list-name-user-input"
            type="list-name"
          />
        </Container>
        <Collapse in={listNameError}>
          <Alert classes={{ root: classes.alert }} severity="error">
            Error: List title format is invalid.
          </Alert>
        </Collapse>
        <InputLabel classes={{ root: classes.inputLabel }}>
          Add a cover
        </InputLabel>
        <Box className={classes.dropzoneBox}>
          <div {...getRootProps()} className={classes.dropzone}>
            <input {...getInputProps()} />
            {!isDragActive &&
              !activeImageBool &&
              "Click here or drop a file to upload."}
            {isDragActive &&
              !activeImageBool &&
              !isDragReject &&
              "Release to drop image."}
            {isDragReject &&
              !activeImageBool &&
              "File type not accepted, sorry!"}
            {isFileTooLarge && (
              <div className="text-danger mt-2">File is too large.</div>
            )}
            <aside className={classes.dropzoneContainer}>
              {activeImageBool && dropzoneFilePreview}
            </aside>
          </div>
        </Box>
        <Collapse in={activeImageBoolError}>
          <Alert classes={{ root: classes.alert }} severity="error">
            Error: Image required.
          </Alert>
        </Collapse>
        <Collapse in={imageUrlError}>
          <Alert classes={{ root: classes.alert }} severity="info">
            Image is still uploading. Try again.
          </Alert>
        </Collapse>
      </DialogContent>
      <DialogActions classes={{ root: classes.dialogActions }}>
        <Button
          classes={{ contained: classes.button }}
          onClick={validateList}
          variant="contained"
          size="large"
        >
          CREATE LIST
        </Button>
      </DialogActions>
      <Divider classes={{ root: classes.divider }} />
    </Dialog>
  );
}

export default NewListDialog;
