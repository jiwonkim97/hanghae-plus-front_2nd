import axios from "axios";
import { Lecture } from "../types";

const fetchMajors = () => axios.get<Lecture[]>('/schedules-majors.json');
const fetchLiberalArts = () => axios.get<Lecture[]>('/schedules-liberal-arts.json');

// TODO: 이 코드를 개선해서 API 호출을 최소화 해보세요 + Promise.all이 현재 잘못 사용되고 있습니다. 같이 개선해주세요.
export const fetchAllLectures = async () => {
  // 클로저를 이용한 API 호출 여부 캐시
  let hasFetchedMajors = false;
  let hasFetchedLiberalArts = false;

  const cachedFetchMajors = async() => {
    if(hasFetchedMajors){
      return
    }
    hasFetchedMajors = true;
    return fetchMajors()
  }

  const cachedFetchLiberalArts = async() => {
    if(hasFetchedLiberalArts){
      return
    }
    hasFetchedLiberalArts = true;
    return fetchLiberalArts()
  }

  const response = await Promise.all([
    (console.log('API Call 1', performance.now()), cachedFetchMajors()),
    (console.log('API Call 2', performance.now()), cachedFetchLiberalArts()),
    (console.log('API Call 3', performance.now()), cachedFetchMajors()),
    (console.log('API Call 4', performance.now()), cachedFetchLiberalArts()),
    (console.log('API Call 5', performance.now()), cachedFetchMajors()),
    (console.log('API Call 6', performance.now()), cachedFetchLiberalArts()),
  ])

  return response.filter(item => item !== undefined)
};