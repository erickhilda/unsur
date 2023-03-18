import Link from 'next/link';
import Icon from '../general/icon';

function NavBar() {
  return (
    <nav className="sticky top-0 z-10 flex items-center justify-between h-16 backdrop-filter backdrop-blur-sm mx-16">
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
    </nav>
  );
}

export default NavBar;
