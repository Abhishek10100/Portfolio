import { useRef } from 'react'
import { useInView } from 'framer-motion'
import AlgoCreatorArt from './art/AlgoCreatorArt'
import RecruitingArt from './art/RecruitingArt'
import EnterpriseRagArt from './art/EnterpriseRagArt'
import JapaneseOcrArt from './art/JapaneseOcrArt'
import SurveillanceArt from './art/SurveillanceArt'
import PlantLiveArt from './art/PlantLiveArt'

const arts = {
  deck: AlgoCreatorArt,
  agent: RecruitingArt,
  search: EnterpriseRagArt,
  ocr: JapaneseOcrArt,
  surveillance: SurveillanceArt,
  plant: PlantLiveArt,
}

/** Maps a project's `art` key from site.js to its illustration. */
export default function ProjectArt({ kind }) {
  const Art = arts[kind] ?? AlgoCreatorArt
  const ref = useRef(null)
  // Off-screen art unmounts so its looping animations stop costing frames.
  const near = useInView(ref, { margin: '300px' })
  return (
    <div ref={ref} className="size-full">
      {near && <Art />}
    </div>
  )
}
