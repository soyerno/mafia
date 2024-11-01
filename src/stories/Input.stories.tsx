import type { Meta, StoryObj } from '@storybook/react';
import Input from '../components/atoms/Input';
import { User, Lock, Mail } from 'lucide-react';

const meta = {
  title: 'Atoms/Input',
  component: Input,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    placeholder: 'Enter text...',
  },
};

export const WithLabel: Story = {
  args: {
    label: 'Username',
    placeholder: 'Enter your username',
  },
};

export const WithIcon: Story = {
  args: {
    label: 'Email',
    placeholder: 'Enter your email',
    icon: Mail,
  },
};

export const WithError: Story = {
  args: {
    label: 'Password',
    placeholder: 'Enter your password',
    icon: Lock,
    error: 'Password is required',
  },
};