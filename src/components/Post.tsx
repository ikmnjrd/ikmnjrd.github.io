import Link from 'next/link'

export default function Post({
  slug,
  frontmatter,
}: {
  slug: string
  frontmatter: { title?: string; date?: string }
}) {
  return (
    <>
      {/* <img src={post.frontmatter.cover_image} alt='' className="aspect-[16/9] rounded-2xl" /> */}

      <li className="mb-1 block whitespace-nowrap text-ellipsis overflow-hidden">
        <img
          src="/arrow_right_black_24dp.svg"
          alt=""
          className="inline-block"
          width="16px"
          height="16px"
        />
        <Link href={`/blog/${slug}`} legacyBehavior>
          <a className="hover:underline hover:text-newmo-400 visited:text-newmo-300">
            {frontmatter?.title}
          </a>
        </Link>
        <p className="text-xs text-right pr-3 border-b-2 border-dashed border-newmo-100">
          Posted on {frontmatter?.date}
        </p>
      </li>

      {/* <p>{post.frontmatter.excerpt}</p> */}
    </>
  )
}
