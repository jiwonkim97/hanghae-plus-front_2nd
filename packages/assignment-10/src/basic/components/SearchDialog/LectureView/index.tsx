import { Button, Table, Tbody, Td, Tr } from "@chakra-ui/react"
import { Lecture } from "../../../types"

interface Props {
  visibleLectures: Lecture[];
  addSchedule: (lecture: Lecture) => void
}

const LectureView = ({visibleLectures, addSchedule}:Props) => {
  return(
    <Table size="sm" variant="striped">
      <Tbody>
        {visibleLectures.map((lecture, index) => (
          <Tr key={`${lecture.id}-${index}`}>
            <Td width="100px">{lecture.id}</Td>
            <Td width="50px">{lecture.grade}</Td>
            <Td width="200px">{lecture.title}</Td>
            <Td width="50px">{lecture.credits}</Td>
            <Td width="150px" dangerouslySetInnerHTML={{ __html: lecture.major }}/>
            <Td width="150px" dangerouslySetInnerHTML={{ __html: lecture.schedule }}/>
            <Td width="80px">
              <Button size="sm" colorScheme="green" onClick={() => addSchedule(lecture)}>추가</Button>
            </Td>
          </Tr>
        ))}
      </Tbody>
    </Table>
  )
}

export default LectureView