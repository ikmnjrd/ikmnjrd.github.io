import Link from 'next/link'

type HeaderProps = {}

export default function Header({}:HeaderProps) {
  return (
    <header>
      <div className="mb-4 p-4 md:px-8 flex items-end justify-between">
        {/* Left Menu */}
        <h1 className="col-start-1 col-end-6">
          <Link href="/" passHref>
            {/*
            // @ts-ignore */}
            <a alt="Home" className="header-text md:text-5xl text-3xl font-serif decoration-dotted hover:opacity-50 hover:underline active:opacity-30">ikmnjrd.github.io</a>
          </Link>
        </h1>

        <div className="col-start-6 col-end-7 items-end">
          <Link href="/tags" passHref>
          {/*
          // @ts-ignore */}
            <a alt="tag一覧" className="header-text md:text-3xl text-2xl font-serif decoration-dotted hover:opacity-50 hover:underline active:opacity-30">Tags</a>
          </Link>
        </div>
      </div>
    </header>
  )
}
