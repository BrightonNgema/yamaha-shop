import React from 'react';
import FormHelperText from '@material-ui/core/FormHelperText';
import { FilePond, registerPlugin } from 'react-filepond';
import FilePondPluginFileValidateSize from 'filepond-plugin-file-validate-size';
import FilePondPluginFileValidateType from 'filepond-plugin-file-validate-type';
import 'filepond/dist/filepond.min.css';
import './index.css';

registerPlugin(FilePondPluginFileValidateSize, FilePondPluginFileValidateType);

export default function FileUpload({ name, onChange, helperText, label }) {
  return (
    <div className="input-container">
      <FilePond
        dropOnPage
        dropValidation
        labelIdle={label}
        allowFileTypeValidation
        acceptedFileTypes={['application/pdf', 'image/jpeg', 'image/jpg']}
        labelFileTypeNotAllowed="Please select a PDF or JPEG file."
        allowFileSizeValidation
        maxFileSize={'10MB'}
        labelMaxFileSizeExceeded={"Please select a file smaller than 10MB."}
        onupdatefiles={(fileItems) => {
          // Set current file objects to this.state
          if (fileItems[0] && fileItems[0].file) {
            onChange(name, fileItems[0].file);
          } else {
            onChange(name, {});
          }
      }}
      />
      {helperText && <FormHelperText error>{typeof helperText === 'string' ? helperText : Object.values(helperText)[0]}</FormHelperText>}
    </div>
  );
}
