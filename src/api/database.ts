import { EsperoDB } from "esperodb";

const dataStructure = [
    {
        'videos': [
            {
                indexes: [ { category: { unique: false } } ],
                primaryKey: "_id"
            }
        ]
    }
];

const dbVersion: number = 3;
export const db = new EsperoDB('ouitube', dataStructure, dbVersion);