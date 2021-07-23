import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { forwardRef } from 'react';
import styles from '@/styles/components/Editor.module.scss';

const editorConfig = {
  toolbar: ['bold', 'italic', '|', 'undo', 'redo'],
};

const Editor = ({ onChange, data, isInvalid, onReady }, ref) => {
  const handleChange = (event, editor) => {
    const data = editor.getData();
    onChange(data);
  };

  const handleReady = editor => {
    editor.editing.view.change(writer => {
      writer.setStyle('height', '250px', editor.editing.view.document.getRoot());
    });
    onReady();
  };

  return (
    <div className={isInvalid ? styles.invalid : ''}>
      <CKEditor
        data={data}
        onChange={handleChange}
        editor={ClassicEditor}
        config={editorConfig}
        onReady={handleReady}
        ref={ref}
      />
    </div>
  );
};

export default forwardRef(Editor);
