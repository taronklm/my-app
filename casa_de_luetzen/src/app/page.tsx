"use client"

import { useEffect, useState } from "react";

interface PutzplanRow {
  Woche: string;
  Flur: string;
  Bad: string;
  Küche: string;
}

export default function Home() {
  const [putzplan, setPutzplan] = useState<PutzplanRow[]>([]);

  useEffect(() => {
      async function fetchData() {
          const res = await fetch('/api/putzplan');
          const data: PutzplanRow[] = await res.json();
          setPutzplan(data);
      }
      fetchData();
  }, []);

  return (
      <div className="container m-auto">
        <div className="flex flex-col">
          <h1 className="text-center">Wöchentlicher Putzplan</h1>
          <table className="table-auto border border-slate-500">
              <thead>
                  <tr>
                      <th className="border border-slate-600"></th>
                      <th className="border border-slate-600">Flur</th>
                      <th className="border border-slate-600">Bad</th>
                      <th className="border border-slate-600">Küche</th>
                  </tr>
              </thead>
              <tbody>
                  {putzplan.map((row, index) => (
                      <tr key={index}>
                          <td className="border border-slate-700 text-center">{row.Woche}</td>
                          <td className="border border-slate-700 text-center">{row.Flur}</td>
                          <td className="border border-slate-700 text-center">{row.Bad}</td>
                          <td className="border border-slate-700 text-center">{row.Küche}</td>
                      </tr>
                  ))}
              </tbody>
          </table>
        </div>
      </div>
  );
}