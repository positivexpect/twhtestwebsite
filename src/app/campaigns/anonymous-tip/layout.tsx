import { Metadata } from 'next';
import AnonymousTipPage from './page';

export const metadata: Metadata = {
  title: 'Anonymous Tip Campaign | Share Your Window Repair Story | The Window Hospital',
  description: 'Share your window repair story anonymously and help others save money. Get a free part in exchange for your story with The Window Hospital.',
};

export default function AnonymousTipLayout() {
  return <AnonymousTipPage />;
} 