'use client';
import { useState, useRef } from 'react';
import s from './FileUpload.module.css';
import { IconUpload, IconFile, IconX } from './Icons';

export default function FileUpload({
  accept = '.pdf,.jpg,.jpeg,.png',
  hint = 'PDF, JPG or PNG',
  files = [],
  onFilesChange,
  className = '',
}) {
  const [dragActive, setDragActive] = useState(false);
  const inputRef = useRef(null);

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(e.type === 'dragenter' || e.type === 'dragover');
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragActive(false);
    if (e.dataTransfer.files?.length) {
      onFilesChange?.([...files, ...Array.from(e.dataTransfer.files)]);
    }
  };

  const handleChange = (e) => {
    if (e.target.files?.length) {
      onFilesChange?.([...files, ...Array.from(e.target.files)]);
    }
  };

  const removeFile = (index) => {
    onFilesChange?.(files.filter((_, i) => i !== index));
  };

  const formatSize = (bytes) => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1048576) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / 1048576).toFixed(1)} MB`;
  };

  return (
    <div className={className}>
      <div
        className={`${s.dropzone} ${dragActive ? s.active : ''}`}
        onDragEnter={handleDrag}
        onDragOver={handleDrag}
        onDragLeave={handleDrag}
        onDrop={handleDrop}
        onClick={() => inputRef.current?.click()}
        role="button"
        tabIndex={0}
        aria-label="Upload a document"
        onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); inputRef.current?.click(); } }}
      >
        <div className={s.icon}><IconUpload size={22} /></div>
        <div className={s.label}>Drop it here or <span>choose a file</span></div>
        <div className={s.hint}>{hint}</div>
        <input
          ref={inputRef}
          type="file"
          accept={accept}
          multiple
          className={s.hiddenInput}
          onChange={handleChange}
          tabIndex={-1}
        />
      </div>

      {files.map((file, i) => (
        <div key={i} className={s.fileItem}>
          <IconFile size={18} />
          <span className={s.fileName}>{file.name}</span>
          <span className={s.fileSize}>{formatSize(file.size)}</span>
          <button
            className={s.removeBtn}
            onClick={() => removeFile(i)}
            aria-label={`Remove ${file.name}`}
          >
            <IconX size={16} />
          </button>
        </div>
      ))}
    </div>
  );
}
