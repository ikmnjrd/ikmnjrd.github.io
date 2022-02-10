
type FooterProps = {}

export default function Footer({}:FooterProps) {
  const date = new Date();
  return (
    <footer className="text-center py-5 text-sm text-newmo-300">
      ©︎ikmnjrd - {date.getFullYear()}
    </footer>
  )
}

