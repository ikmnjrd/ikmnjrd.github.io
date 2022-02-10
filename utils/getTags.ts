import getPostFilesData from './getPostFilesData'


export default async function getTag() {
  const files_data = await getPostFilesData()
  const tags:any[] = [];

  files_data.forEach(({frontmatter, slug}) => {

    if( frontmatter.tag ) {
      for( let tag of frontmatter.tag) {
        tags.push({tag ,slug });
      }

    }
  })

  const counts_tag = countTag(tags);

  return {tags, counts_tag}
}

export function countTag(tags:any[]) {
  return tags.reduce((prev, curr) => {
      const name = curr.tag;
      if(!prev[name]){
        prev[name] = 0;
      }
      prev[name] += 1;
      return prev;
    }, {});
}
