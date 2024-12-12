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
      <div className="container">
          <h1>Wöchentlicher Putzplan</h1>
          <table border={1}>
              <thead>
                  <tr>
                      <th>Woche</th>
                      <th>Flur</th>
                      <th>Bad</th>
                      <th>Küche</th>
                  </tr>
              </thead>
              <tbody>
                  {putzplan.map((row, index) => (
                      <tr key={index}>
                          <td>{row.Woche}</td>
                          <td>{row.Flur}</td>
                          <td>{row.Bad}</td>
                          <td>{row.Küche}</td>
                      </tr>
                  ))}
              </tbody>
          </table>
      </div>
  );
}