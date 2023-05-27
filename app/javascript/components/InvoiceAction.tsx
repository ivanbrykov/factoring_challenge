import { Alert, Button, Group, Modal, Space, Text } from '@mantine/core';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

export const InvoiceAction = () => {
  const navigate = useNavigate();
  const { id, action } = useParams<{ id: string; action: string }>();
  const [error, setError] = useState<string>();

  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: async (action: string) => {
      const body = new FormData();
      body.append(
        'authenticity_token',
        document
          .querySelector('meta[name=csrf-token]')
          ?.getAttribute('content') || ''
      );
      body.append('perform_action', action);
      const data = await fetch(`/invoices/${id}/${action}.json`, {
        method: 'POST',
        body,
      }).then((data) => data.json());
      if (data.error) {
        setError(data.error);
      } else {
        queryClient.invalidateQueries(['invoices']);
        queryClient.invalidateQueries(['invoice', id]);
        navigate(`/invoices/${id}`);
      }
    },
  });

  if (!id || !action) {
    return null;
  }

  return (
    <Modal
      opened
      title="Confirmation required"
      onClose={() => navigate(`/invoices/${id}`)}
      size="md"
    >
      {error ? (
        <Alert color="red" title="Error">
          {error}
        </Alert>
      ) : null}

      <Text>
        Are you sure you want to {action} the invoice #{id}?
      </Text>

      <Space h="lg" />
      <Group position="right">
        <Button
          loading={mutation.isLoading}
          onClick={() => mutation.mutateAsync(action)}
        >
          {action}
        </Button>
        <Button
          loading={mutation.isLoading}
          variant="outline"
          onClick={() => navigate(`/invoices/${id}`)}
        >
          Cancel
        </Button>
      </Group>
    </Modal>
  );
};
