import { HStack } from "@chakra-ui/react"
import SearchForm from "./SearchForm"
import ScoreForm from "./ScoreForm"
import GradeForm from "./GradeForm"
import DayForm from "./DayForm"
import { memo } from "react"
import { SearchOption } from "../../../types"

interface Props {
  searchOptions: SearchOption;
  changeSearchOption: (field: keyof SearchOption, value: SearchOption[typeof field]) => void
}

const Forms = memo((props:Props) => {
  return (
    <>
      <HStack spacing={4}>
        <SearchForm {...props}/>
        <ScoreForm {...props}/>
      </HStack>

      <HStack spacing={4}>
        <GradeForm {...props}/>
        <DayForm {...props} />
      </HStack>
    </>
  )
})

export default Forms