import {
  Alert,
  Button,
  FileInput,
  Modal,
  Space,
  TextInput,
} from '@mantine/core';
import { DatePicker } from '@mantine/dates';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const NewInvoice = () => {
  const navigate = useNavigate();
  const formRef = useRef<HTMLFormElement>(null);
  const [error, setError] = useState<string>();
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: async () => {
      const body = new FormData(formRef.current ? formRef.current : undefined);
      body.append(
        'authenticity_token',
        document
          .querySelector('meta[name=csrf-token]')
          ?.getAttribute('content') || ''
      );
      const response = await fetch('/invoices', {
        method: 'POST',
        body,
      }).then((data) => data.json());
      if (response.error) {
        setError(response.error);
      } else {
        queryClient.invalidateQueries(['invoices']);
        navigate('/');
      }
    },
  });
  return (
    <Modal opened onClose={() => navigate('/')} title="New Invoice">
      {error ? (
        <Alert color="red" title="Error">
          {error}
        </Alert>
      ) : null}
      <form ref={formRef}>
        <TextInput label="Amount" name="amount" />
        <DatePicker
          placeholder="Pick date"
          label="Due date"
          minDate={new Date()}
          name="due_at"
        />
        <FileInput name="scan" label="Scan" />
      </form>
      <Space h="xl" />
      <Button
        loading={mutation.isLoading}
        onClick={() => mutation.mutateAsync()}
      >
        Create
      </Button>
    </Modal>
  );
};
