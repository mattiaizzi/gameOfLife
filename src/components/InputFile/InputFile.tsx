import React, { useRef, ChangeEventHandler } from 'react';
import { Button } from '../Button';

interface InputFileProps {
  onChange: (files: FileList) => void;
  disabled?: boolean;
}

const InputFile: React.FC<InputFileProps> = ({ onChange, children, disabled = false }) => {
  const inputFileRef = useRef<HTMLInputElement | null>(null);

  const handleFiles: ChangeEventHandler<HTMLInputElement> = (event) => {
    if (event.target.files && event.target.files.length) {
      const files = event.target.files;
      onChange(files);
      if (inputFileRef.current) {
        inputFileRef.current.value = '';
      }
    }
  };

  return (
    <React.Fragment>
      <Button
        disabled={disabled}
        onClick={() => {
          if (inputFileRef.current) {
            inputFileRef.current.click();
          }
        }}
      >
        {children}
      </Button>
      <input style={{ display: 'none' }} type="file" onChange={handleFiles} ref={inputFileRef} />
    </React.Fragment>
  );
};

export default InputFile;
