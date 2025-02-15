'use client';

import React, { useCallback, useState } from 'react';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Button } from '../ui/button';
import { Icons } from '../../public/assets/icons';
import { MENU_ITEMS, ROUTES } from '@/lib/constants';
import { useRouter } from 'next/navigation';
import { useGlobalContext } from '../providers/GlobalContextProvider';

const MenuOptions = () => {
  const [open, setOpen] = useState<boolean>(false);
  const { setSearchInput } = useGlobalContext();
  const router = useRouter();

  const handlePopoverOpen = useCallback(() => {
    setOpen(!open);
  }, [open, setOpen]);

  const handleMenuClick = useCallback(() => {
    handlePopoverOpen();
    setSearchInput('');
    router.push(ROUTES.FAVORITES);
  }, [router, handlePopoverOpen, setSearchInput]);

  return (
    <Popover open={open} onOpenChange={handlePopoverOpen}>
      <PopoverTrigger asChild>
        <Button className='px-3' variant='outline'>
          <Icons.MenuIcon size={20} />
        </Button>
      </PopoverTrigger>
      <PopoverContent className='w-[180px] rounded-xl p-2'>
        {MENU_ITEMS.map((item) => (
          <Button
            onClick={handleMenuClick}
            key={item.id}
            variant='ghost'
            className='w-full flex justify-start px-2'
          >
            <item.icon className='h-5 w-5' />
            {item.title}
          </Button>
        ))}
      </PopoverContent>
    </Popover>
  );
};

export default MenuOptions;
