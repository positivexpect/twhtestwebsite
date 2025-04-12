import { metadata } from './metadata';
import ClientLayout from './ClientLayout';

export { metadata };

export default function BlogLayoutServer({
  children,
}: {
  children: React.ReactNode
}) {
  return <ClientLayout>{children}</ClientLayout>;
} 