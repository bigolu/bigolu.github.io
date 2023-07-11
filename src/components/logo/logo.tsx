"use client"

import { useState, ReactElement, useEffect, useRef, } from 'react'
import styles from './logo.module.css'
import { ReadonlyURLSearchParams, usePathname, useRouter, useSearchParams } from 'next/navigation';

export const usePrevious = <T,>(value: T) => {
  const ref = useRef<T>();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
};

interface NavigationEvents {
  routeChanged?: ({
    pathname,
    searchParams,
  }: {
    pathname: string | null;
    searchParams: ReadonlyURLSearchParams | null;
  }) => void;
}

// next.js v13 doesn't have router.events so I'll use this for now.
// source: https://github.com/vercel/next.js/discussions/42016
export const useNavigation = ({ on }: { on?: NavigationEvents }) => {
  const pathname = usePathname();
  const prevPathname = usePrevious(pathname);

  const searchParams = useSearchParams();
  const prevSearchParams = usePrevious(searchParams);

  const { routeChanged } = on || {};
  const [route, setRoute] = useState({ pathname, searchParams });

  useEffect(() => {
    if (searchParams?.toString() !== prevSearchParams?.toString() || pathname !== prevPathname) {
      setRoute({ pathname, searchParams });
      routeChanged?.({ pathname, searchParams });
    }
  }, [pathname, prevPathname, prevSearchParams, routeChanged, searchParams]);

  return { route };
};

export default function LogoComponent() {
  const [logoType, setLogoType] = useState('default');
  const logos: { [key: string]: ReactElement } = {
    default: (
      <div>
        <span>ola</span><span>olu</span>
        <br></br>
        <span>big</span><span>gie</span>
      </div>
    ),
    about: (
      <div>
        <span>ola</span><span>olu</span>
        <br></br>
        <span>big</span><span>gie</span>
        <br></br>
        <span>(about)</span>
      </div>
    ),
    code: (
      <div>
        <span>{'/*'} ola</span><span>olu</span>
        <br></br>
        <span>&nbsp;&nbsp;&nbsp;&nbsp;big</span><span>gie */</span>
      </div>
    ),
  }
  const router = useRouter();
  useNavigation({
    on: {
      routeChanged: (data) => {
        setLogoType(data.pathname?.substring(1) ?? 'default')
      },
    },
  })

  return (
    <a href='/'>
      <div>
        {logos[logoType]}
      </div>
    </a>
  )
}
