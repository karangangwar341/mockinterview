import Link from 'next/link'

export default function Header() {
  return (
    <header className="bg-gray-800 py-4">
      <nav className="container mx-auto px-4">
        <ul className="flex space-x-4">
          <li>
            <Link href="/" className="text-white hover:text-gray-300">
              Home
            </Link>
          </li>
          <li>
            <Link href="/instructions" className="text-white hover:text-gray-300">
              Instructions
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  )
}

