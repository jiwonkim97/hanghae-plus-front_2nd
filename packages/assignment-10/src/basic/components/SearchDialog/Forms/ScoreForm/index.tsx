import { FormControl, FormLabel, Select } from "@chakra-ui/react"
import { SearchOption } from "../../../../types"
import { memo } from "react";

interface Props {
  searchOptions: SearchOption;
  changeSearchOption: (field: keyof SearchOption, value: SearchOption[typeof field]) => void
}

const ScoreForm = memo(({searchOptions, changeSearchOption}:Props) => {
  return (
    <FormControl>
      <FormLabel>학점</FormLabel>
      <Select
        value={searchOptions.credits}
        onChange={(e) => changeSearchOption('credits', e.target.value)}
      >
        <option value="">전체</option>
        <option value="1">1학점</option>
        <option value="2">2학점</option>
        <option value="3">3학점</option>
      </Select>
    </FormControl>
  )
})

export default ScoreForm