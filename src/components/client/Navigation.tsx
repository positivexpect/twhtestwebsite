'use client';

import { Disclosure } from '@headlessui/react';
import { Bars3Icon, XMarkIcon, PhoneIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import Image from 'next/image';

const navigation = [
  { name: 'Glass Services', href: '/glass-services' },
  { name: 'Parts Services', href: '/parts-services' },
  { name: 'Screen Services', href: '/screen-services' },
  { name: 'Why Choose Us?', href: '/about' },
  { name: 'FAQ', href: '/faq' },
  { name: 'Education Center', href: '/education' },
  { name: 'Contact', href: '/contact' },
];

export default function Navigation() {
  return (
    <Disclosure as="nav" className="bg-white shadow-md">
      {({ open }) => (
        <>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16">
              <div className="flex">
                <Link href="/" className="flex-shrink-0 flex items-center">
                  <Image
                    src="/images/fulllogo_transparent_nobuffer - Copy.png"
                    alt="Window Hospital Inc Logo"
                    width={180}
                    height={45}
                    className="h-10 w-auto"
                    priority
                  />
                </Link>
                <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                  {navigation.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      className="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-500 hover:text-gray-900"
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
              </div>
              <div className="hidden sm:ml-6 sm:flex sm:items-center space-x-4">
                <a
                  href="tel:5406030088"
                  className="inline-flex items-center px-4 py-2 border border-blue-600 text-sm font-medium rounded-md text-blue-600 hover:bg-blue-50"
                >
                  <PhoneIcon className="h-4 w-4 mr-2" />
                  540-603-0088
                </a>
                <a
                  href="/contact"
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-[#CD2028] hover:bg-[#B01B22]"
                >
                  Get Free Assessment
                </a>
              </div>
              <div className="-mr-2 flex items-center sm:hidden">
                <Disclosure.Button className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100">
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
            </div>
          </div>

          <Disclosure.Panel className="sm:hidden">
            <div className="pt-2 pb-3 space-y-1">
              {navigation.map((item) => (
                <Disclosure.Button
                  key={item.name}
                  as="a"
                  href={item.href}
                  className="block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-gray-500 hover:text-gray-900 hover:bg-gray-50"
                >
                  {item.name}
                </Disclosure.Button>
              ))}
              <div className="mt-4 px-4 space-y-2">
                <a
                  href="tel:5406030088"
                  className="block w-full text-center px-4 py-2 border border-blue-600 text-base font-medium rounded-md text-blue-600 hover:bg-blue-50"
                >
                  <PhoneIcon className="h-4 w-4 mr-2 inline-block" />
                  540-603-0088
                </a>
                <a
                  href="/contact"
                  className="block w-full text-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-[#CD2028] hover:bg-[#B01B22]"
                >
                  Get Free Assessment
                </a>
              </div>
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}
