import Link from 'next/link'

export default function Footer() {
  const date = new Date();
  return (
    <footer className="text-center py-5 text-sm text-newmo-300">
      ©︎ikmnjrd - {date.getFullYear()}
    </footer>
  )
}
