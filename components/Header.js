import Link from 'next/link'

export default function Header() {
  return (
    <header>
      <div className="mb-4 p-4 grid gap-3 ">
        {/* Left Menu */}
          <h1 className="col-start-1 col-end-6">
            <Link href="/" passHref>
              <a alt="top" className="header-text md:text-5xl text-3xl font-serif decoration-dotted hover:opacity-50 hover:underline">ikmnjrd.github.io</a>
            </Link>
          </h1>
          {/* Right Menu */}
          <div className="col-start-6 col-end-7">
            <Link href="/tags" passHref>
              <a alt="tags" className="header-text md:text-3xl text-2xl font-serif decoration-dotted hover:opacity-50 hover:underline">Tags</a>
            </Link>
          </div>
      </div>
    </header>
  )
}
