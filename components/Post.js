import Link from 'next/link'


export default function Post({ post }) {
  return (
    <>
      {/* <img src={post.frontmatter.cover_image} alt='' className="aspect-[16/9] rounded-2xl" /> */}

      <li className='mb-1 block whitespace-nowrap text-ellipsis overflow-hidden'>
        <img src="/arrow_right_black_24dp.svg" className="inline-block" width={16}/>
        <Link href={`/blog/${post.slug}`}>{post.frontmatter.title}</Link>
        {" "}
        <p className="text-xs text-right pr-3 border-b-2 border-dashed border-newmo-100">Posted on {post.frontmatter.date}</p>
      </li>

      {/* <p>{post.frontmatter.excerpt}</p> */}
    </>
  )
}
