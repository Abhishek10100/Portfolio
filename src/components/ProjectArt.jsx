import AlgoCreatorArt from './art/AlgoCreatorArt'
import RecruitingArt from './art/RecruitingArt'
import EnterpriseRagArt from './art/EnterpriseRagArt'
import JapaneseOcrArt from './art/JapaneseOcrArt'

const arts = {
  deck: AlgoCreatorArt,
  agent: RecruitingArt,
  search: EnterpriseRagArt,
  ocr: JapaneseOcrArt,
}

/** Maps a project's `art` key from site.js to its illustration. */
export default function ProjectArt({ kind }) {
  const Art = arts[kind] ?? AlgoCreatorArt
  return <Art />
}
