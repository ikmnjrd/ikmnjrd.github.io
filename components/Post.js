import Link from 'next/link'


export default function Post({ post }) {
  return (
    <>
      {/* <img src={post.frontmatter.cover_image} alt='' className="aspect-[16/9] rounded-2xl" /> */}

      <li className='block whitespace-nowrap text-ellipsis overflow-hidden'>
        <img src="/arrow_right_black_24dp.svg" className="inline-block" width={16}/>
        <Link href={`/blog/${post.slug}`}>{post.frontmatter.title}</Link>
        {" "}
        <span className="text-sm">Posted on {post.frontmatter.date}</span>
      </li>

      {/* <p>{post.frontmatter.excerpt}</p> */}
    </>
  )
}
