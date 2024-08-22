import { Table, Tbody } from "@chakra-ui/react"
import { Lecture } from "../../../types"
import LectureItem from "./LectureItem";
import { useEffect, useState } from "react";
import { PAGE_SIZE } from "../../../constants";

interface Props {
  filteredLectures: Lecture[];
  addSchedule: (lecture: Lecture) => void;
  page: number;
}

const LectureView = ({filteredLectures, addSchedule, page}:Props) => {
  const [visibleLectures, setVisiblsLectures] = useState<Lecture[]>([])

  useEffect(() => {
    if(page === 1){
      setVisiblsLectures(filteredLectures.slice(0, PAGE_SIZE))
    }else{
      const newLectures = filteredLectures.slice(PAGE_SIZE * (page - 1), PAGE_SIZE * page)
      setVisiblsLectures(cur => [...cur, ...newLectures])
    }
  }, [filteredLectures, page])


  return(
    <Table size="sm" variant="striped">
      <Tbody>
        {visibleLectures.map((lecture, index) => (
          <LectureItem key={`${lecture.id}-${index}`} lecture={lecture} addSchedule={addSchedule}/>
        ))}
      </Tbody>
    </Table>
  )
}

export default LectureView