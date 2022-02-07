import getPostFilesData from './getPostFilesData'


export default async function getTag() {
  const files_data = await getPostFilesData()
  const tags = [];

  files_data.forEach(({frontmatter}) => {

    if( frontmatter.tag ) {
      for( let tag of frontmatter.tag) {
        tags.push(tag);
      }

    }
  })

  const counts_tag = countTag(tags);

  console.log(tags);
  console.log(counts_tag);

  return {tags, counts_tag}
}

export function countTag(tags) {
  return tags.reduce((prev, curr) => {
      const name = curr;
      if(!prev[name]){
        prev[name] = 0;
      }
      prev[name] += 1;
      return prev;
    }, {});
}
