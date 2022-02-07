import Link from 'next/link'

export default function Header() {
  return (
    <header>
      <div className="mb-4 p-4 grid gap-3">
        {/* Left Menu */}
          <h1 className="text-4xl font-bold col-start-1 col-end-11">
            <Link href="/" passHref>
              <img src="/logo.svg" alt="home" className="svg-logo cursor-pointer" />
            </Link>
          </h1>
          {/* Right Menu */}
          <div className="col-start-11 col-end-12">
            <Link href="/tags" passHref>Tags</Link>
          </div>
      </div>
    </header>
  )
}
