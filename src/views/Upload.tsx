import { Box, LinearProgress, Paper } from '@material-ui/core';
import React, { useEffect, useRef } from 'react';
import { useState } from 'react';
import { useMedia } from '../hooks';

const Upload: React.FC = () => {
  const [file, setFile] = useState()
  const { uploadMedia, loading, loaded } = useMedia();
  const inputRef = useRef<any>();

  const sendFile = () => {
    uploadMedia({ path: '/documents', file })
  }

  useEffect(() => {
    if (loaded && inputRef && inputRef.current) {
      (inputRef as any).current.value = '';
    }
  }, [loaded])
  return (
    <Box width={500} maxWidth="100%" margin="auto">
      <Paper variant="outlined">
        <Box padding={2}>
          {loading && <LinearProgress />}
          {loaded && <div style={{ marginBottom: 10 }}><small>File uploaded</small></div>}
          <input type="file" onChange={(e: any) => setFile(e.target.files[0])} ref={inputRef} />
          <button onClick={sendFile}>send</button>
        </Box>
      </Paper>
    </Box>
  )
}

export default Upload;