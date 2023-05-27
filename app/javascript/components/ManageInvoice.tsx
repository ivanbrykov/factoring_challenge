import { Anchor, Button, Grid, Group, Modal, Table } from '@mantine/core';
import { useQuery } from '@tanstack/react-query';
import dayjs from 'dayjs';
import localizedFormat from 'dayjs/plugin/localizedFormat';
import React from 'react';
import { Outlet, useNavigate, useParams } from 'react-router-dom';

dayjs.extend(localizedFormat);

export const ManageInvoice = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const { data, isLoading } = useQuery(['invoice', id], async () => {
    const data = await fetch(`/invoices/${id}.json`);
    return data.json();
  });

  if (isLoading) {
    return null;
  }

  return (
    <>
      <Modal
        opened
        title="Manage Invoice"
        onClose={() => navigate('/')}
        size="lg"
      >
        <Grid>
          <Grid.Col span={8}>
            <Table>
              <tbody>
                <tr>
                  <th>Invoice #</th>
                  <td>{id}</td>
                </tr>
                <tr>
                  <th>Amount</th>
                  <td>${data.amount}</td>
                </tr>
                <tr>
                  <th>Due Date</th>
                  <td>{dayjs(data.due_at).format('L')}</td>
                </tr>
                <tr>
                  <th>Fees Accrued</th>
                  <td>${data.fees_accrued || '0.00'}</td>
                </tr>
                <tr>
                  <th>Scan</th>
                  <td>
                    {data.scan && <Anchor href={data.scan}>Attachment</Anchor>}
                  </td>
                </tr>
              </tbody>
            </Table>
          </Grid.Col>
          <Grid.Col span={4}>
            <Table>
              <thead>
                <tr>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{data.status}</td>
                </tr>
              </tbody>
            </Table>
          </Grid.Col>
        </Grid>
        {data.available_actions && data.available_actions.length > 0 ? (
          <Group position="right">
            {data.available_actions.map((action: string) => (
              <Button
                key={action}
                onClick={() => navigate(`/invoices/${id}/${action}`)}
              >
                {action}
              </Button>
            ))}
          </Group>
        ) : null}
      </Modal>
      <Outlet />
    </>
  );
};
