import Image from 'next/image';
import Link from 'next/link';

export default function HeaderLogo() {
  return (
    <Link href="/" className="flex items-center">
      <Image
        src="/logo.svg"
        height={72}
        width={72}
        className="h-8 w-8"
        alt="a logo image with a text of P t"
      />
      <h2 className="ml-2">
        <b className="text-lg">P</b>eriodic <b className="text-lg">T</b>
        able
      </h2>
    </Link>
  );
}
