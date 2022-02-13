import { ReactNode, FunctionComponent } from 'react'

type Props = {
  children?: ReactNode
}

type FooterProps = {}

const Footer: FunctionComponent = ({ children }: Props) => {
  const date = new Date();
  return (
    <footer className="text-center py-5 text-sm text-newmo-300" role="contentinfo">
      <p>©︎ikmnjrd - <time dateTime={date.toString()}>{ date.getFullYear() }</time></p>
    </footer>
  )
}

export default Footer;
