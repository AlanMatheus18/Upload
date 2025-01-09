import React, { useEffect, useState } from 'react';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { Box, Typography } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import axios from 'axios';

const VisuallyHiddenInput = styled('input')({
  clipPath: 'inset(50%)',
  position: 'absolute',
});

export default function InputFileUpload() {
  const [file, setFile] = useState(null);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => {
        setSuccess('');
      }, 3000);
      return () => clearTimeout(timer); 
    }
  }, [success]);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
    setError('');
    setSuccess('');
  };

  const handleUpload = async () => {
    if (!file) {
      setError('Por favor, selecione um arquivo!');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    const fileExtension = file.name.split('.').pop().toLowerCase();
    const url =
      fileExtension === 'pdf'
        ? 'https://apiplanilha.aiatende.dev.br/pdf/upload'
        : fileExtension === 'csv'
        ? 'https://apiplanilha.aiatende.dev.br/csv/upload'
        : null;

    if (!url) {
      setError('Formato de arquivo não suportado! Use apenas PDF ou CSV.');
      return;
    }

    try {
      const response = await axios.post(url, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setSuccess(`Arquivo enviado com sucesso: ${response.data.message || 'Sucesso'}`);
    } catch (err) {
      setError(`Erro ao enviar o arquivo: ${err.response?.data?.message || err.message}`);
    }
  };

   


  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '60px',
      }}
    >
      <Button
        component="label"
        variant="contained"
        startIcon={<CloudUploadIcon />}
        sx={{ marginBottom: '20px', background:'#109010',}}
      >
        Selecionar Arquivo
        <VisuallyHiddenInput type="file" onChange={handleFileChange} />
      </Button>

      {file && (
        <Typography variant="body1" sx={{ marginBottom: '20px'  }}>
          Arquivo selecionado: {file.name}
        </Typography>
      )}

      <Button
        variant="contained"
        endIcon={<SendIcon />}
        onClick={handleUpload}
        sx={{ marginBottom: '20px', background:'#109010', }}
      >
        Enviar
      </Button>

      {error && (
        <Typography variant="body2" color="error" sx={{ marginTop: '10px' }}>
          {error}
        </Typography>
      )}

      {success && (
        <Typography variant="body2" color="success.main" sx={{ marginTop: '10px' }}>
          {success}
        </Typography>
      )}
    </Box>
  );
}
