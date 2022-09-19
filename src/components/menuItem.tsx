import * as React from 'react'
import { useMemo } from 'react'
import { useLocation } from 'react-router-dom'

export interface MenuItemProps {
  label: string
  path: string
}

export const MenuItem: React.FC<MenuItemProps> = (props: MenuItemProps) => {
  const { label, path } = props
  const location = useLocation();

  const background = useMemo(() => {
    const isActive = location.pathname === path;
    return isActive ? 'bg-slate-300' : 'bg-slate-200'
  }, [location])

  const onClick = () => {
    window.location.hash = path;
  };

  return <div className={background + ' p-3 cursor-pointer hover:bg-slate-400 transition-all'} onClick={onClick}>
    {label}
  </div>
}

