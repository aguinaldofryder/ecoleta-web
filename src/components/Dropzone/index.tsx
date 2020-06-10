import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import './styles.css';
import { FiUpload as Icon } from 'react-icons/fi';
import { DropzoneProps } from './DropzoneProps';

const Dropzone: React.FC<DropzoneProps> = ({ onFileUploaded }) => {
  const [selectedFileUrl, setSelectedFileUrl] = useState('');

  const onDrop = useCallback(
    (acceptedFiles) => {
      const file = acceptedFiles[0];
      const fileUrl = URL.createObjectURL(file);
      setSelectedFileUrl(fileUrl);

      onFileUploaded(file);
    },
    [onFileUploaded]
  );

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: 'image/*',
  });

  return (
    <div className="dropzone" {...getRootProps()}>
      {selectedFileUrl ? (
        <img src={selectedFileUrl} alt="Image do estabelecimento" />
      ) : (
        <p>
          <Icon />
          <input {...getInputProps()} accept="image/*" />
          Imagem do estabelecimento
        </p>
      )}
    </div>
  );
};

export default Dropzone;
