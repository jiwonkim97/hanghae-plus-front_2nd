import { FormControl, FormLabel, Input } from "@chakra-ui/react"
import { SearchOption } from "../../../../types"
import { memo } from "react";

interface Props {
  searchOptions: SearchOption;
  changeSearchOption: (field: keyof SearchOption, value: SearchOption[typeof field]) => void
}

const SearchForm = memo(({searchOptions, changeSearchOption}:Props) => {
  return (
    <FormControl>
      <FormLabel>검색어</FormLabel>
      <Input
        placeholder="과목명 또는 과목코드"
        value={searchOptions.query}
        onChange={(e) => changeSearchOption('query', e.target.value)}
      />
    </FormControl>
  )
})

export default SearchForm