import { headers } from "next/headers";

const getAllTimeBlocks = async () => {
  return await fetch(process.env.NEXT_PUBLIC_API_URL + `/timeblocks`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
};
const startTimeBlock = async() => {
  return await fetch(process.env.NEXT_PUBLIC_API_URL+`/timeblocks`,{
    method : "POST",
    headers: {
      "Content-Type": "application/json",
    },}
  );
};

const TimeBlockService = {
  getAllTimeBlocks,startTimeBlock
};

export default TimeBlockService;
