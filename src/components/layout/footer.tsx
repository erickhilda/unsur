import { ChemicalElement } from '@/types/global';

import ElementTile from '../element-tile';
import Icon from '../general/icon';

interface FooterProps {
  previousElement: ChemicalElement | null;
  nextElement: ChemicalElement | null;
}

function Footer({ previousElement, nextElement }: FooterProps) {
  return (
    <footer className="mt-10 mx-auto max-w-xs lg:max-w-6xl">
      <div className="flex justify-between">
        {previousElement ? (
          <button className="flex py-2 items-center gap-1 uppercase cursor-default">
            <Icon icon="ph:arrow-left" width={20} height={20} />
            prev
          </button>
        ) : (
          <div />
        )}

        {nextElement ? (
          <button className="flex py-2 items-center gap-1 uppercase cursor-default">
            next
            <Icon icon="ph:arrow-right" width={20} height={20} />
          </button>
        ) : null}
      </div>
      <div className="grid lg:grid-cols-18 grid-cols-6 lg:h-14 h-12 gap-1">
        {previousElement ? (
          <ElementTile element={previousElement} className="col-span-1" />
        ) : null}

        {nextElement ? (
          <ElementTile
            element={nextElement}
            className="col-start-6 col-end-7 lg:col-start-[18] lg:col-end-[19]"
          />
        ) : null}
      </div>
    </footer>
  );
}

export default Footer;
