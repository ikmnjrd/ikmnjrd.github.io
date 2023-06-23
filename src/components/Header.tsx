import Link from 'next/link'
import DarkModeButton from '~/components/DarkModeButton'
import SearchBtn from '~/components/SearchBtn'

export default function Header() {
  return (
    <header className="mb-4 p-4 md:px-8 grid grid-cols-1 md:grid-cols-2 max-w-screen-lg mx-auto">
      {/* Left Menu */}
      <h1 className="">
        <Link href="/" passHref>
          {/* aタグになんでalt="HOME"をつけてたんだっけ？ */}
          <a className="header-text md:text-5xl text-3xl font-serif decoration-dotted hover:opacity-50 hover:underline active:opacity-30">
            ikmnjrd.github.io
          </a>
        </Link>
        <DarkModeButton className="md:ml-3 ml-2" />
      </h1>

      {/* Right Menu */}
      <nav className="text-right">
        <SearchBtn className="header-text mr-4 md:text-3xl text-2xl font-serif decoration-dotted hover:opacity-50 hover:underline active:opacity-30"></SearchBtn>
        <Link href="/about" passHref>
          <a className="header-text mr-4 md:text-3xl text-2xl font-serif decoration-dotted hover:opacity-50 hover:underline active:opacity-30">
            About
          </a>
        </Link>
        <Link href="/tags" passHref>
          {/* aタグになんでalt="tag一覧"をつけてたんだっけ？ */}
          <a className="header-text md:text-3xl text-2xl font-serif decoration-dotted hover:opacity-50 hover:underline active:opacity-30">
            Tags
          </a>
        </Link>
      </nav>
    </header>
  )
}
