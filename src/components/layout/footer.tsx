import { ChemicalElement } from '@/types/global';

import ElementTile from '../element-tile';
import Icon from '../general/icon';

interface FooterProps {
  previousElement: ChemicalElement;
  nextElement: ChemicalElement;
}

function Footer({ previousElement, nextElement }: FooterProps) {
  return (
    <footer className="mt-10 mx-auto max-w-6xl">
      <div className="flex justify-between">
        <button className="flex py-2 items-center gap-1 uppercase cursor-default">
          <Icon icon="ph:arrow-left" width={20} height={20} />
          prev
        </button>

        <button className="flex py-2 items-center gap-1 uppercase cursor-default">
          next
          <Icon icon="ph:arrow-right" width={20} height={20} />
        </button>
      </div>
      <div className="grid grid-cols-18 h-16">
        <ElementTile
          element={previousElement}
          style={{
            gridArea: `1 / 1 / auto / auto`,
          }}
        />

        <ElementTile
          element={nextElement}
          style={{
            gridArea: `1 / 18 / auto / auto`,
          }}
        />
      </div>
    </footer>
  );
}

export default Footer;
