import React, { useCallback }  from "react";
import { useDropzone } from 'react-dropzone'
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
  OutlinedInput,
  Typography,
} from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import dialogStyles from "./Styles/dialogStyles";

function NewListDialog() {
  const [listName, setListName] = React.useState("");
  const [listNameError, setListNameError] = React.useState(false);
  const [listPicture, setListPicture] = React.useState([]);

  const classes = dialogStyles();

  const maxSize = 1048576;

  const onDrop = useCallback(acceptedFiles => {
    console.log(acceptedFiles);
  }, []);

  const { isDragActive, getRootProps, getInputProps, isDragReject, acceptedFiles, rejectedFiles } = useDropzone({
    onDrop,
    accept: 'image/*',
    minSize: 0,
    maxSize,
  });

  const isFileTooLarge = rejectedFiles.length > 0 && rejectedFiles[0].size > maxSize;

  const handleClose = () => {
    window.location.href = window.location.href.replace("/create-new-list", "");
  };

  const changeListName = (event) => {
    setListName(event.target.value);
  };
  
  const checkListName = (lName) => {
    return lName.length > 0;
  }

  // add anymore list validation
  const validateList = () => {
    let validListName = checkListName(listName)
    console.log("validListName is: ", validListName);
    if(validListName){
      setListNameError(false);
      localStorage.setItem("listName", listName);
      window.location.href = "/dashboard";
    }
    else setListNameError(true);
  };

  const enterSubmit = (event) => {
    let keyCode = event.keyCode ? event.keyCode : event.which;
    if (keyCode == 13) {
      validateList();
    }
  };

  return (
    <Dialog
      scroll="body"
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
              input: classes.outlinedInputInput,
            }}
            onKeyPress={enterSubmit}
            onChange={changeListName}
            placeholder="Enter name"
            id="list-name-user-input"
            type="list-name"
          />
        </Container>
        <Collapse in={listNameError}>
          <Alert 
            classes={{ root: classes.alert }} 
            severity="error">
            Error: List title format is invalid.
          </Alert>
        </Collapse>
        <InputLabel classes={{ root: classes.inputLabel }}>
          Add a cover
        </InputLabel>
        <Box className={classes.dropzoneBox}>
          <div {...getRootProps()} className= {classes.dropzone}>
          <input {...getInputProps()} />
            {!isDragActive && 'Click here or drop a file to upload.'}
            {isDragActive && !isDragReject && "Release to drop image."}
            {isDragReject && "File type not accepted, sorry!"}
            {isFileTooLarge && (
            <div className="text-danger mt-2">
              File is too large.
            </div>
          )}
          </div>
        </Box>
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