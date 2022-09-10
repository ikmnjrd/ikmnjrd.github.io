import { FC } from 'react'
import SvgIcon from '~/components/SvgIcon'

const Footer: FC = () => {
  const date = new Date()
  return (
    <footer
      className="text-center text-sm"
      role="contentinfo"
    >
      <div className="footer-content">
        <ul className="flex items-center justify-between max-w-[100px] mx-auto">
          <li>
            <a
              href="https://twitter.com/ikmnjrd"
              target="_blank"
              rel="nofollow noopener noreferrer"
              title="Twitter"
              className="footer-svg hover:opacity-50 block"
            >
              <SvgIcon
                type="twitter"
                size="2.3em"
                strokeWidth={2.3}
                fill="#fff"
              />
            </a>
          </li>
          <li>
            <a
              href="https://github.com/ikmnjrd"
              target="_blank"
              rel="nofollow noopener noreferrer"
              title="GitHub"
              className="footer-svg header-text hover:opacity-50 block"
            >
              <SvgIcon
                type="github"
                size="2em"
                strokeWidth={1}
                fill="#fff"
              />
            </a>
          </li>
        </ul>
        <p>
          ©︎ikmnjrd -{' '}
          <time dateTime={date.toString()}>
            {date.getFullYear()}
          </time>
        </p>
      </div>
      <div className="wave"></div>
      <div className="wave"></div>
    </footer>
  )
}

export default Footer
