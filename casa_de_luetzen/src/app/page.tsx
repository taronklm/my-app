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
  const [einkaufsliste, setEinkaufsliste] = useState<string[]>([]);
    const [neuesElement, setNeuesElement] = useState<string>('');

    // Einkaufsliste laden
    useEffect(() => {
        async function fetchList() {
            const res = await fetch('/api/einkaufsliste');
            const data: string[] = await res.json();
            setEinkaufsliste(data);
        }
        fetchList();
    }, []);

    // Element hinzufügen
    const addToList = async () => {
        if (neuesElement.trim()) {
            const res = await fetch('/api/einkaufsliste', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ item: neuesElement.trim() }),
            });
            const data: string[] = await res.json();
            setEinkaufsliste(data);
            setNeuesElement('');
        }
    };

    // Element entfernen
    const removeFromList = async (item: string) => {
        const res = await fetch('/api/einkaufsliste', {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ item }),
        });
        const data: string[] = await res.json();
        setEinkaufsliste(data);
    };

  useEffect(() => {
      async function fetchData() {
          const res = await fetch('/api/putzplan');
          const data: PutzplanRow[] = await res.json();
          setPutzplan(data);
      }
      fetchData();
  }, []);

  return (
      <div className="container p-4">
        <div className="flex flex-col">
          <h1 className="text-center mb-5 font-bold">Wöchentlicher Putzplan</h1>
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
                          <td className="border border-slate-700 text-center font-bold">{row.Woche}</td>
                          <td className="border border-slate-700 text-center">{row.Flur}</td>
                          <td className="border border-slate-700 text-center">{row.Bad}</td>
                          <td className="border border-slate-700 text-center">{row.Küche}</td>
                      </tr>
                  ))}
              </tbody>
          </table>
        </div>
        <div>
            <h1>Wöchentlicher Putzplan</h1>
            <h2>Einkaufsliste</h2>
            <input
                type="text"
                value={neuesElement}
                onChange={(e) => setNeuesElement(e.target.value)}
                placeholder="Neues Element"
            />
            <button onClick={addToList}>Hinzufügen</button>

            <ul>
                {einkaufsliste.map((item, index) => (
                    <li key={index}>
                        {item} <button onClick={() => removeFromList(item)}>Entfernen</button>
                    </li>
                ))}
            </ul>
        </div>
      </div>
  );
}