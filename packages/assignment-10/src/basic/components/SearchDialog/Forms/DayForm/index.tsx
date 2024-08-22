import { Checkbox, CheckboxGroup, FormControl, FormLabel, HStack } from "@chakra-ui/react"
import { SearchOption } from "../../../../types"
import { DAY_LABELS } from "../../../../constants";
import { memo } from "react";

interface Props {
  searchOptions: SearchOption;
  changeSearchOption: (field: keyof SearchOption, value: SearchOption[typeof field]) => void
}

const DayForm = memo(({searchOptions, changeSearchOption}:Props) => {
  return (
    <FormControl>
      <FormLabel>요일</FormLabel>
      <CheckboxGroup
        value={searchOptions.days}
        onChange={(value) => changeSearchOption('days', value as string[])}
      >
        <HStack spacing={4}>
          {DAY_LABELS.map(day => (
            <Checkbox key={day} value={day}>{day}</Checkbox>
          ))}
        </HStack>
      </CheckboxGroup>
    </FormControl>
  )
})

export default DayForm