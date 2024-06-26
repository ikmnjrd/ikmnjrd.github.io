import { FC } from 'react'
import SvgIcon from '~/components/SvgIcon'

const Footer: FC = () => {
  const date = new Date()
  return (
    <footer className="text-center text-sm" role="contentinfo">
      <div className="footer-content">
        <ul className="flex items-center justify-between max-w-[150px] mx-auto">
          <li>
            <a
              href="https://x.com/ikmnjrd"
              target="_blank"
              rel="nofollow noopener noreferrer"
              title="x"
              className="footer-svg hover:opacity-50 block"
            >
              <SvgIcon
                type="x"
                size="1.8em"
                strokeWidth={1}
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
          <li>
            <a
              href="https://ikmnjrd.github.io/rss/feed.xml"
              target="_blank"
              rel="nofollow noopener noreferrer"
              title="RSS"
              className="footer-svg header-text hover:opacity-50 block"
            >
              <SvgIcon
                type="rss"
                size="2em"
                strokeWidth={2.3}
                fill="#fff"
              />
            </a>
          </li>
        </ul>
        <p className="pt-4">
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
