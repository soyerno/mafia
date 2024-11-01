import type { Meta, StoryObj } from '@storybook/react';
import Avatar from '../components/atoms/Avatar';

const meta = {
  title: 'Atoms/Avatar',
  component: Avatar,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Avatar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Small: Story = {
  args: {
    name: 'john_doe',
    size: 'sm',
  },
};

export const Medium: Story = {
  args: {
    name: 'jane_smith',
    size: 'md',
  },
};

export const Large: Story = {
  args: {
    name: 'player_one',
    size: 'lg',
  },
};