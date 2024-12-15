import { Challenge } from "@/app/challenges/type";

const getChallenge = async (): Promise<Challenge[]> => {
  const data = await fetch("http://localhost:5000/challenges");

  return data.json();
};

export default getChallenge;