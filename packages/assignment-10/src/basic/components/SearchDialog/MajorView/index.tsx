import { Box, Checkbox, CheckboxGroup, FormControl, FormLabel, Stack, Tag, TagCloseButton, TagLabel, Wrap } from "@chakra-ui/react"
import { SearchOption } from "../../../types";
import { memo } from "react";

interface Props {
  majors: string[];
  changeSearchOption: (field: keyof SearchOption, value: SearchOption[typeof field]) => void;
  allMajors: string[]
}

const MajorView = memo(({majors, changeSearchOption, allMajors}:Props) => {
  return (
    <FormControl>
      <FormLabel>전공</FormLabel>
      <CheckboxGroup
        colorScheme="green"
        value={majors}
        onChange={(values) => changeSearchOption('majors', values as string[])}
      >
        <Wrap spacing={1} mb={2}>
          {majors.map(major => {
            return (
              <Tag key={major} size="sm" variant="outline" colorScheme="blue">
                <TagLabel>{major.split("<p>").pop()}</TagLabel>
                <TagCloseButton
                  onClick={() => changeSearchOption('majors', majors.filter(v => v !== major))}/>
              </Tag>
            )
          })}
        </Wrap>
        <Stack spacing={2} overflowY="auto" h="100px" border="1px solid" borderColor="gray.200" borderRadius={5} p={2}>
          {allMajors.map(major => (
            <Box key={major}>
              <Checkbox key={major} size="sm" value={major}>
                {major.replace(/<p>/gi, ' ')}
              </Checkbox>
            </Box>
          ))}
        </Stack>
      </CheckboxGroup>
    </FormControl>
  )
})

export default (MajorView)