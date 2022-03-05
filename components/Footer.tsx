import { ReactNode, FunctionComponent } from 'react'
import SvgIcon from '@/components/SvgIcon'

type Props = {
  children?: ReactNode
}


const Footer: FunctionComponent = ({ children }: Props) => {
  const date = new Date();
  return (
    <footer className="text-center text-sm text-newmo-300" role="contentinfo">
      <div className="footer-content">
        <ul className="flex items-center justify-between max-w-[100px] mx-auto">
          <li>
            <a
              href="https://twitter.com/ikmnjrd"
              target="_blank"
              rel="nofollow noopener noreferrer"
              title="Twitter"
              className="hover:opacity-50 block"
            >
              <SvgIcon type="twitter" size="2.3em" strokeWidth={2.3} />
            </a>
          </li>
          <li>
            <a
              href="https://github.com/ikmnjrd"
              target="_blank"
              rel="nofollow noopener noreferrer"
              title="GitHub"
              className="hover:opacity-50 block"
            >
              <SvgIcon type="github" size="2em" strokeWidth={1} />
            </a>
          </li>
        </ul>
        <p>©︎ikmnjrd - <time dateTime={date.toString()}>{ date.getFullYear() }</time></p>
      </div>
      <div className="wave"></div>
      <div className="wave"></div>
      {/* <div className="wave-bottom"></div> */}
      
    </footer>
  )
}

export default Footer;
