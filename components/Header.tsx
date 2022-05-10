import Link from 'next/link'
import DarkModeButton from 'components/DarkModeButton'

export default function Header() {
  return (
    <header className="mb-4 p-4 md:px-8">
      <div className="flex items-end justify-between">
        {/* Left Menu */}
        <h1 className="col-start-1 col-end-6">
          <Link href="/" passHref>
            {/* aタグになんでalt="HOME"をつけてたんだっけ？ */}
            <a className="header-text md:text-5xl text-3xl font-serif decoration-dotted hover:opacity-50 hover:underline active:opacity-30">
              ikmnjrd.github.io
            </a>
          </Link>
          <DarkModeButton className="md:ml-3 ml-2" />
        </h1>

        {/* Right Menu */}
        <div className="col-start-6 col-end-7 md:block hidden">
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
        </div>
      </div>

      {/* SmartPhone Menu */}
      <div className="md:hidden text-right ">
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
      </div>
    </header>
  )
}
