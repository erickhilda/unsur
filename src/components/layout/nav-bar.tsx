import Link from 'next/link';
import Icon from '../general/icon';

function NavBar() {
  return (
    <nav className="sticky top-0 z-10 h-16 backdrop-filter backdrop-blur-sm">
      <div className="flex items-center justify-between lg:mx-16 mx-3 h-full">
        <Link href="/" className="flex items-center">
          <Icon icon="ph:flask-duotone" width={32} height={32} />
        </Link>
        <div className="flex items-center gap-6">
          <Link href="/acknowledment">
            <span>Acknowledgements</span>
          </Link>
          <Link href="https://github.com/erickhilda/unsur">
            <span>Github</span>
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
