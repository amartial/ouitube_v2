import { EsperoDB } from "esperodb";


const dbVersion: number = 3;
export const db = new EsperoDB('ouitube', [
    {
      'videos': [
        {
          indexes: [

            { slug: { unique: true } },
            { category: { unique: false } }
          ],
          primaryKey: "_id"
        }
      ]
    }
  ], dbVersion);
