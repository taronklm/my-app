import { NextApiRequest, NextApiResponse } from "next";

const createPutzplan = (): Array<{ Woche: string; Flur: string; Bad: string; Küche: string }> => {
  const personen = ["Taro", "Bela", "Emilio"];

  const currentWeek = Math.floor((new Date().getTime() - new Date(new Date().getFullYear(), 0, 1).getTime()) / (7 * 24 * 60 * 60 * 1000));

  console.log("Aktuelle Woche: ", currentWeek)

  const putzplan: Array<{ Woche: string; Flur: string; Bad: string; Küche: string }> = [];
  putzplan.push({
      Woche: "Diese Woche",
      Flur: personen[currentWeek % personen.length],
      Bad: personen[(currentWeek + 1) % personen.length],
      Küche: personen[(currentWeek + 2) % personen.length],
  });
  return putzplan;
};

export default function handler(req: NextApiRequest, res: NextApiResponse): void {
  const plan = createPutzplan();
  res.status(200).json(plan);
}