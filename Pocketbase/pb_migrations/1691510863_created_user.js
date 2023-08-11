/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const collection = new Collection({
    "id": "5oecznorjn2l663",
    "created": "2023-08-08 16:07:43.326Z",
    "updated": "2023-08-08 16:07:43.326Z",
    "name": "user",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "dvwwqbic",
        "name": "username",
        "type": "text",
        "required": true,
        "unique": false,
        "options": {
          "min": 8,
          "max": 45,
          "pattern": ""
        }
      },
      {
        "system": false,
        "id": "fy584fzo",
        "name": "email",
        "type": "email",
        "required": true,
        "unique": false,
        "options": {
          "exceptDomains": [],
          "onlyDomains": []
        }
      },
      {
        "system": false,
        "id": "rqauanbv",
        "name": "password",
        "type": "text",
        "required": true,
        "unique": false,
        "options": {
          "min": 8,
          "max": 100,
          "pattern": ""
        }
      }
    ],
    "indexes": [],
    "listRule": null,
    "viewRule": null,
    "createRule": null,
    "updateRule": null,
    "deleteRule": null,
    "options": {}
  });

  return Dao(db).saveCollection(collection);
}, (db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("5oecznorjn2l663");

  return dao.deleteCollection(collection);
})
