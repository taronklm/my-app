import fs from 'fs';
import { NextApiRequest, NextApiResponse } from 'next';
import path from 'path';

const filePath = path.resolve('./data/einkaufsliste.json');

// Einkaufsliste lesen
const readList = (): string[] => {
    try {
        const data = fs.readFileSync(filePath, 'utf8');
        return JSON.parse(data) || [];
    } catch {
        return [];
    }
};

// Einkaufsliste speichern
const writeList = (list: string[]) => {
    fs.writeFileSync(filePath, JSON.stringify(list, null, 2), 'utf8');
};

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    const method = req.method;
    const list = readList();

    if (method === 'GET') {
        // Liste zurückgeben
        res.status(200).json(list);
    } else if (method === 'POST') {
        // Element hinzufügen
        const { item } = req.body;
        if (item && !list.includes(item)) {
            list.push(item);
            writeList(list);
            res.status(201).json(list);
        } else {
            res.status(400).json({ error: 'Invalid or duplicate item' });
        }
    } else if (method === 'DELETE') {
        // Element entfernen
        const { item } = req.body;
        const updatedList = list.filter((i) => i !== item);
        writeList(updatedList);
        res.status(200).json(updatedList);
    } else {
        res.setHeader('Allow', ['GET', 'POST', 'DELETE']);
        res.status(405).end(`Method ${method} Not Allowed`);
    }
}
