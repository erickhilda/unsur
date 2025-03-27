'use client';

import * as React from 'react';
import { ChemicalElement } from '@/types/global';
import { useIsMobile } from './use-mobile';
import element_data from '@/data/elemens-data-v2';
import { useSidebar } from '@/components/ui/sidebar';

type ElementStoreProps = {
  element: ChemicalElement | null;
  setElementOnSidebar: (data: ChemicalElement) => void;
};

const defaultElement = element_data[0];

const ElementStoreContext = React.createContext<ElementStoreProps | null>(null);

export function useElementStore() {
  const context = React.useContext(ElementStoreContext);
  if (!context) {
    throw new Error('useSidebar must be used within a ElementStore context.');
  }

  return context;
}

export const ElementStoreProvider = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<'div'> & {
    element?: ChemicalElement | null;
  }
>(({ children, element: elementProp = null }) => {
  const isMobile = useIsMobile();
  const { setOpenMobile, setOpen } = useSidebar();

  const [_element, _setElement] = React.useState<ChemicalElement | null>(
    defaultElement
  );
  const element = elementProp ?? _element;
  const setElementOnSidebar = React.useCallback(
    (el: ChemicalElement) => {
      _setElement(el);
      if (isMobile) {
        setOpenMobile(true);
      } else {
        setOpen(true);
      }
    },
    [isMobile, setOpen, setOpenMobile]
  );

  const contextValue = React.useMemo<ElementStoreProps>(
    () => ({
      element,
      setElementOnSidebar,
    }),
    [element, setElementOnSidebar]
  );

  return (
    <ElementStoreContext.Provider value={contextValue}>
      {children}
    </ElementStoreContext.Provider>
  );
});

ElementStoreProvider.displayName = 'SidebarProvider';
