import * as React from 'react';
import { useMemo, useState } from 'react';
import { User } from '../models/user';

import { getUser } from '../services/auth.service';

import { MenuItem, MenuItemProps } from './menuItem';

export const Menu: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);

  const itemProps: MenuItemProps[] = useMemo(() => [
    { label: 'Home', path: '/' },
  ], []);

  const menuItems = useMemo(() => {
    return itemProps.map((item, index) => {
      return <MenuItem key={index} {...item} />
    })
  }, [itemProps]);

  getUser().then(setUser)

  return <div className="flex flex-col h-screen">
    <div className="bg-slate-200 w-full flex-1">
      {menuItems}
    </div>

    <div className="p-3 h-12 bg-slate-800 text-white text-xs flex items-center justify-between">
      <div className="flex gap-1 items-center">
        <span>Hey, {user?.name}!</span>
      </div>
    </div>
  </div>
}
