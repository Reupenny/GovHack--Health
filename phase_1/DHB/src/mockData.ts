import type { Patient, Medication, BloodTest, Document } from "./types.js"

export const mockPatients: Record<string, Patient> = 
{
  "c": {
    "nhi": "ZAK21MS",
    "name": {
      "title": "",
      "firstName": "Ava",
      "middleName": "Grace",
      "lastName": "Lila"
    },
    "dateOfBirth": "1986-02-08",
    "gender": "female",
    "address": {
      "line1": "66 Manukau Road",
      "line2": "",
      "suburb": "Hamilton Lake",
      "city": "Hamilton",
      "region": "Waikato",
      "postcode": "3204",
      "country": "NZ"
    },
    "contactDetails": {
      "phone": "+64 987 654",
      "mobile": "+64 987 654",
      "email": "Ava-7Lilac@gmail.com"
    },
    "emergencyContact": {
      "name": "Ava Williams",
      "relationship": "Friend",
      "phone": ""
    },
    "ethnicGroup": "New Zealand European",
    "preferredLanguage": "English"
  },
  "ZAP28LA": {
    "nhi": "ZAP28LA",
    "name": {
      "title": "",
      "firstName": "Eliot",
      "middleName": "Kia",
      "lastName": "Tait"
    },
    "dateOfBirth": "1992-11-19",
    "gender": "male",
    "address": {
      "line1": "236 Madras Street",
      "line2": "",
      "suburb": "Riccarton",
      "city": "Christchurch",
      "region": "Canterbury",
      "postcode": "8041",
      "country": "NZ"
    },
    "contactDetails": {
      "phone": "+64 123 456",
      "mobile": "+64 123 456",
      "email": ""
    },
    "emergencyContact": {
      "name": "Noah Harris",
      "relationship": "Parent",
      "phone": ""
    },
    "ethnicGroup": "New Zealand European",
    "preferredLanguage": "Te Reo Māori"
  },
  "ZBD33XL": {
    "nhi": "ZBD33XL",
    "name": {
      "title": "",
      "firstName": "Alex",
      "middleName": "Carter",
      "lastName": "Harris"
    },
    "dateOfBirth": "1976-08-11",
    "gender": "male",
    "address": {
      "line1": "240 King Street",
      "line2": "",
      "suburb": "Ponsonby",
      "city": "Auckland",
      "region": "Auckland",
      "postcode": "1011",
      "country": "NZ"
    },
    "contactDetails": {
      "phone": "",
      "mobile": "27851285",
      "email": "Alex-8Harris@xtra.co.nz"
    },
    "emergencyContact": {
      "name": "Aria Brown",
      "relationship": "College",
      "phone": ""
    },
    "ethnicGroup": "New Zealand European",
    "preferredLanguage": "English"
  },
  "ZBJ59LE": {
    "nhi": "ZBJ59LE",
    "name": {
      "title": "",
      "firstName": "James",
      "middleName": "Michael",
      "lastName": "Scott"
    },
    "dateOfBirth": "1984-08-18",
    "gender": "male",
    "address": {
      "line1": "103 Durham Street",
      "line2": "",
      "suburb": "Ponsonby",
      "city": "Auckland",
      "region": "Auckland",
      "postcode": "1011",
      "country": "NZ"
    },
    "contactDetails": {
      "phone": "+64 123 456",
      "mobile": "+64 123 456",
      "email": "James-5Scott@hotmal.com"
    },
    "emergencyContact": {
      "name": "John Doe",
      "relationship": "Parent",
      "phone": ""
    },
    "ethnicGroup": "New Zealand European",
    "preferredLanguage": "English"
  },
  "ZBK58TM": {
    "nhi": "ZBK58TM",
    "name": {
      "title": "",
      "firstName": "Olivia",
      "middleName": "Noah",
      "lastName": "Grace"
    },
    "dateOfBirth": "1982-10-15",
    "gender": "female",
    "address": {
      "line1": "95 Clyde Road",
      "line2": "",
      "suburb": "Hamilton Lake",
      "city": "Hamilton",
      "region": "Waikato",
      "postcode": "3204",
      "country": "NZ"
    },
    "contactDetails": {
      "phone": "+64 987 654",
      "mobile": "+64 987 654",
      "email": "Olivia-6Grace@outlook.com"
    },
    "emergencyContact": {
      "name": "Amara Anderson",
      "relationship": "Friend",
      "phone": ""
    },
    "ethnicGroup": "New Zealand European",
    "preferredLanguage": "English"
  },
  "ZBS45LD": {
    "nhi": "ZBS45LD",
    "name": {
      "title": "",
      "firstName": "Noah",
      "middleName": "Emily",
      "lastName": "Samuel"
    },
    "dateOfBirth": "1975-09-28",
    "gender": "unknown",
    "address": {
      "line1": "136 Great North Road",
      "line2": "",
      "suburb": "Christchurch Central",
      "city": "Christchurch",
      "region": "Canterbury",
      "postcode": "8011",
      "country": "NZ"
    },
    "contactDetails": {
      "phone": "+64 887 654",
      "mobile": "+64 887 654",
      "email": ""
    },
    "emergencyContact": {
      "name": "Aiden Brown",
      "relationship": "Work",
      "phone": ""
    },
    "ethnicGroup": "Māori",
    "preferredLanguage": "English"
  },
  "ZCL47UF": {
    "nhi": "ZCL47UF",
    "name": {
      "title": "",
      "firstName": "Jordan",
      "middleName": "Frank",
      "lastName": "Michael"
    },
    "dateOfBirth": "2007-07-14",
    "gender": "male",
    "address": {
      "line1": "130 King Street",
      "line2": "",
      "suburb": "St Albans",
      "city": "Christchurch",
      "region": "Canterbury",
      "postcode": "8014",
      "country": "NZ"
    },
    "contactDetails": {
      "phone": "+64 887 654",
      "mobile": "+64 887 654",
      "email": ""
    },
    "emergencyContact": {
      "name": "Ethan Hicks",
      "relationship": "Work",
      "phone": ""
    },
    "ethnicGroup": "Other European",
    "preferredLanguage": "English"
  },
  "ZCL83GC": {
    "nhi": "ZCL83GC",
    "name": {
      "title": "",
      "firstName": "Taylor",
      "middleName": "Aviva",
      "lastName": "Zane"
    },
    "dateOfBirth": "1980-10-09",
    "gender": "female",
    "address": {
      "line1": "61 Madras Street",
      "line2": "",
      "suburb": "Riccarton",
      "city": "Christchurch",
      "region": "Canterbury",
      "postcode": "8041",
      "country": "NZ"
    },
    "contactDetails": {
      "phone": "+64 798 654",
      "mobile": "+64 798 654",
      "email": "Taylor-12Zane@icloud.com"
    },
    "emergencyContact": {
      "name": "Aria Brown",
      "relationship": "College",
      "phone": ""
    },
    "ethnicGroup": "European nfd",
    "preferredLanguage": "English"
  },
  "ZCM16EW": {
    "nhi": "ZCM16EW",
    "name": {
      "title": "",
      "firstName": "Benjamin",
      "middleName": "Aaron",
      "lastName": "Lila"
    },
    "dateOfBirth": "1997-02-15",
    "gender": "male",
    "address": {
      "line1": "297 Great North Road",
      "line2": "",
      "suburb": "Mosgiel",
      "city": "Dunedin",
      "region": "Otago",
      "postcode": "9024",
      "country": "NZ"
    },
    "contactDetails": {
      "phone": "+64 887 654",
      "mobile": "+64 887 654",
      "email": "Benjamin-13Lila@me.com"
    },
    "emergencyContact": {
      "name": "Ethan Hicks",
      "relationship": "Work",
      "phone": ""
    },
    "ethnicGroup": "New Zealand European",
    "preferredLanguage": "English"
  },
  "ZDJ24ZS": {
    "nhi": "ZDJ24ZS",
    "name": {
      "title": "",
      "firstName": "Matthew",
      "middleName": "Brooke",
      "lastName": "Ethan"
    },
    "dateOfBirth": "1984-07-02",
    "gender": "male",
    "address": {
      "line1": "26 Lincoln Road",
      "line2": "",
      "suburb": "St Albans",
      "city": "Christchurch",
      "region": "Canterbury",
      "postcode": "8014",
      "country": "NZ"
    },
    "contactDetails": {
      "phone": "+64 798 654",
      "mobile": "+64 798 654",
      "email": "Matthew-14Ethan@protonmail.ch"
    },
    "emergencyContact": {
      "name": "Mila Hendricks",
      "relationship": "College",
      "phone": ""
    },
    "ethnicGroup": "New Zealand European",
    "preferredLanguage": "English"
  },
  "ZDP92ZR": {
    "nhi": "ZDP92ZR",
    "name": {
      "title": "",
      "firstName": "Olivia",
      "middleName": "Daniel",
      "lastName": "Hunter"
    },
    "dateOfBirth": "1995-10-01",
    "gender": "unknown",
    "address": {
      "line1": "292 Main Road",
      "line2": "",
      "suburb": "Mosgiel",
      "city": "Dunedin",
      "region": "Otago",
      "postcode": "9024",
      "country": "NZ"
    },
    "contactDetails": {
      "phone": "+64 798 654",
      "mobile": "+64 798 654",
      "email": "Olivia-15Hunter@fastmail.fm"
    },
    "emergencyContact": {
      "name": "Mila Hendricks",
      "relationship": "College",
      "phone": ""
    },
    "ethnicGroup": "New Zealand European",
    "preferredLanguage": "English"
  },
  "ZES76BM": {
    "nhi": "ZES76BM",
    "name": {
      "title": "",
      "firstName": "Noah",
      "middleName": "Morgan",
      "lastName": "Felix"
    },
    "dateOfBirth": "2000-03-02",
    "gender": "male",
    "address": {
      "line1": "115 Manukau Road",
      "line2": "",
      "suburb": "Newtown",
      "city": "Wellington",
      "region": "Wellington",
      "postcode": "6021",
      "country": "NZ"
    },
    "contactDetails": {
      "phone": "+64 887 654",
      "mobile": "+64 887 654",
      "email": "Noah-16Felix@digitalocean.com"
    },
    "emergencyContact": {
      "name": "Aiden Brown",
      "relationship": "Work",
      "phone": ""
    },
    "ethnicGroup": "New Zealand European",
    "preferredLanguage": "English"
  },
  "ZFE35PQ": {
    "nhi": "ZFE35PQ",
    "name": {
      "title": "",
      "firstName": "Mia",
      "middleName": "Carter",
      "lastName": "Aurora"
    },
    "dateOfBirth": "1995-09-03",
    "gender": "male",
    "address": {
      "line1": "110 Lambton Quay",
      "line2": "",
      "suburb": "Hamilton Lake",
      "city": "Hamilton",
      "region": "Waikato",
      "postcode": "3204",
      "country": "NZ"
    },
    "contactDetails": {
      "phone": "+64 987 654",
      "mobile": "+64 987 654",
      "email": ""
    },
    "emergencyContact": {
      "name": "Jane Smith",
      "relationship": "Friend",
      "phone": ""
    },
    "ethnicGroup": "Chinese",
    "preferredLanguage": "English"
  },
  "ZFZ57UL": {
    "nhi": "ZFZ57UL",
    "name": {
      "title": "",
      "firstName": "Jordan",
      "middleName": "Te Hīnāpapa",
      "lastName": "Tait"
    },
    "dateOfBirth": "1986-12-30",
    "gender": "female",
    "address": {
      "line1": "48 Cuba Street",
      "line2": "",
      "suburb": "Riccarton",
      "city": "Christchurch",
      "region": "Canterbury",
      "postcode": "8041",
      "country": "NZ"
    },
    "contactDetails": {
      "phone": "+64 798 654",
      "mobile": "+64 798 654",
      "email": "Jordan-18Tait@googlemail.com"
    },
    "emergencyContact": {
      "name": "Sophia Davies",
      "relationship": "College",
      "phone": ""
    },
    "ethnicGroup": "Southeast Asian",
    "preferredLanguage": "Te Reo Māori"
  },
  "ZGA02YJ": {
    "nhi": "ZGA02YJ",
    "name": {
      "title": "",
      "firstName": "Jordan",
      "middleName": "Grace",
      "lastName": "Seraphina"
    },
    "dateOfBirth": "1978-08-30",
    "gender": "female",
    "address": {
      "line1": "99 Lincoln Road",
      "line2": "",
      "suburb": "Hamilton Lake",
      "city": "Hamilton",
      "region": "Waikato",
      "postcode": "3204",
      "country": "NZ"
    },
    "contactDetails": {
      "phone": "+64 798 654",
      "mobile": "+64 798 654",
      "email": ""
    },
    "emergencyContact": {
      "name": "Aria Brown",
      "relationship": "College",
      "phone": ""
    },
    "ethnicGroup": "New Zealand European",
    "preferredLanguage": "English"
  }
}

export const mockBloodTests: Record<string, BloodTest[]> = 

{
  "ZHV48PG": [
    {
      "id": "5",
      "testName": "Liver Function Panel",
      "testDate": "1995-03-12T00:00:00Z",
      "laboratory": "Southern Community Laboratories",
      "status": "completed",
      "results": [
        {
          "parameter": "ALT",
          "value": "32",
          "unit": "U/L",
          "referenceRange": "7-56 U/L",
          "status": "normal"
        },
        {
          "parameter": "AST",
          "value": "28",
          "unit": "U/L",
          "referenceRange": "10-40 U/L",
          "status": "normal"
        },
        {
          "parameter": "ALP",
          "value": "110",
          "unit": "U/L",
          "referenceRange": "44-147 U/L",
          "status": "normal"
        }
      ],
      "clinicalNotes": "All values are within reference ranges. No immediate action required."
    },
    {
      "id": "22",
      "testName": "Lipid Panel",
      "testDate": "1999-07-25T00:00:00Z",
      "laboratory": "Southern Community Laboratories",
      "status": "completed",
      "results": [
        {
          "parameter": "Total Cholesterol",
          "value": "6.2",
          "unit": "mmol/L",
          "referenceRange": "0-5.2 mmol/L",
          "status": "abnormal"
        },
        {
          "parameter": "HDL",
          "value": "1.4",
          "unit": "mmol/L",
          "referenceRange": "1-0 mmol/L",
          "status": "normal"
        },
        {
          "parameter": "LDL",
          "value": "4.1",
          "unit": "mmol/L",
          "referenceRange": "0-3.4 mmol/L",
          "status": "abnormal"
        },
        {
          "parameter": "Triglycerides",
          "value": "1.8",
          "unit": "mmol/L",
          "referenceRange": "0-1.7 mmol/L",
          "status": "abnormal"
        }
      ],
      "clinicalNotes": "Findings include elevated values: Total Cholesterol, LDL, Triglycerides. Consider follow-up if clinically indicated."
    },
    {
      "id": "23",
      "testName": "HbA1c",
      "testDate": "2004-11-03T00:00:00Z",
      "laboratory": "Southern Community Laboratories",
      "status": "pending",
      "results": [
        {
          "parameter": "HbA1c",
          "value": "5.8",
          "unit": "%",
          "referenceRange": "4-5.6 %",
          "status": "abnormal"
        }
      ],
      "clinicalNotes": "Findings include borderline values: HbA1c. Consider follow-up if clinically indicated."
    },
    {
      "id": "24",
      "testName": "Iron Studies",
      "testDate": "2009-04-18T00:00:00Z",
      "laboratory": "Southern Community Laboratories",
      "status": "completed",
      "results": [
        {
          "parameter": "Ferritin",
          "value": "85",
          "unit": "µg/L",
          "referenceRange": "30-400 µg/L",
          "status": "normal"
        },
        {
          "parameter": "Serum Iron",
          "value": "14",
          "unit": "µmol/L",
          "referenceRange": "10-30 µmol/L",
          "status": "normal"
        },
        {
          "parameter": "TIBC",
          "value": "58",
          "unit": "µmol/L",
          "referenceRange": "45-70 µmol/L",
          "status": "normal"
        }
      ],
      "clinicalNotes": "All values are within reference ranges. No immediate action required."
    },
    {
      "id": "25",
      "testName": "Vitamin D",
      "testDate": "2014-09-30T00:00:00Z",
      "laboratory": "Southern Community Laboratories",
      "status": "completed",
      "results": [
        {
          "parameter": "25(OH)D",
          "value": "42",
          "unit": "nmol/L",
          "referenceRange": "50-0 nmol/L",
          "status": "abnormal"
        }
      ],
      "clinicalNotes": "Findings include low values: 25(OH)D. Consider follow-up if clinically indicated."
    },
    {
      "id": "26",
      "testName": "Complete Blood Count (CBC)",
      "testDate": "2019-09-14T00:00:00Z",
      "laboratory": "Southern Community Laboratories",
      "status": "completed",
      "results": [
        {
          "parameter": "Hemoglobin",
          "value": "135",
          "unit": "g/L",
          "referenceRange": "130-180 g/L",
          "status": "normal"
        },
        {
          "parameter": "WBC",
          "value": "6.2",
          "unit": "x10⁹/L",
          "referenceRange": "4-11 x10⁹/L",
          "status": "normal"
        },
        {
          "parameter": "Platelets",
          "value": "210",
          "unit": "x10⁹/L",
          "referenceRange": "150-400 x10⁹/L",
          "status": "normal"
        }
      ],
      "clinicalNotes": "All values are within reference ranges. No immediate action required."
    },
    {
      "id": "27",
      "testName": "Blood Glucose",
      "testDate": "2025-06-01T00:00:00Z",
      "laboratory": "Southern Community Laboratories",
      "status": "completed",
      "results": [
        {
          "parameter": "Fasting Glucose",
          "value": "5.4",
          "unit": "mmol/L",
          "referenceRange": "3.9-5.5 mmol/L",
          "status": "normal"
        }
      ],
      "clinicalNotes": "All values are within reference ranges. No immediate action required."
    }
  ],
  "ZAK21MS": [
    {
      "id": "31",
      "testName": "Liver Function Panel",
      "testDate": "2010-06-15T00:00:00Z",
      "laboratory": "Awanui Labs",
      "status": "completed",
      "results": [
        {
          "parameter": "ALT",
          "value": "29",
          "unit": "U/L",
          "referenceRange": "7-56 U/L",
          "status": "normal"
        },
        {
          "parameter": "AST",
          "value": "33",
          "unit": "U/L",
          "referenceRange": "10-40 U/L",
          "status": "normal"
        },
        {
          "parameter": "ALP",
          "value": "102",
          "unit": "U/L",
          "referenceRange": "44-147 U/L",
          "status": "normal"
        }
      ],
      "clinicalNotes": "All values are within reference ranges. No immediate action required."
    },
    {
      "id": "32",
      "testName": "Lipid Panel",
      "testDate": "2013-09-22T00:00:00Z",
      "laboratory": "Awanui Labs",
      "status": "completed",
      "results": [
        {
          "parameter": "Total Cholesterol",
          "value": "5.9",
          "unit": "mmol/L",
          "referenceRange": "0-5.2 mmol/L",
          "status": "abnormal"
        },
        {
          "parameter": "HDL",
          "value": "1.6",
          "unit": "mmol/L",
          "referenceRange": "1-0 mmol/L",
          "status": "normal"
        },
        {
          "parameter": "LDL",
          "value": "3.9",
          "unit": "mmol/L",
          "referenceRange": "0-3.4 mmol/L",
          "status": "abnormal"
        },
        {
          "parameter": "Triglycerides",
          "value": "1.5",
          "unit": "mmol/L",
          "referenceRange": "0-1.7 mmol/L",
          "status": "normal"
        }
      ],
      "clinicalNotes": "Findings include elevated values: Total Cholesterol, LDL. Consider follow-up if clinically indicated."
    },
    {
      "id": "33",
      "testName": "HbA1c",
      "testDate": "2016-11-05T00:00:00Z",
      "laboratory": "Awanui Labs",
      "status": "completed",
      "results": [
        {
          "parameter": "HbA1c",
          "value": "5.5",
          "unit": "%",
          "referenceRange": "4-5.6 %",
          "status": "normal"
        }
      ],
      "clinicalNotes": "All values are within reference ranges. No immediate action required."
    },
    {
      "id": "34",
      "testName": "Thyroid Function Panel",
      "testDate": "2019-03-18T00:00:00Z",
      "laboratory": "Awanui Labs",
      "status": "completed",
      "results": [
        {
          "parameter": "TSH",
          "value": "2.1",
          "unit": "mIU/L",
          "referenceRange": "0.4-4 mIU/L",
          "status": "normal"
        },
        {
          "parameter": "Free T4",
          "value": "14.2",
          "unit": "pmol/L",
          "referenceRange": "9-19 pmol/L",
          "status": "normal"
        },
        {
          "parameter": "Free T3",
          "value": "4.8",
          "unit": "pmol/L",
          "referenceRange": "3.1-6.8 pmol/L",
          "status": "normal"
        }
      ],
      "clinicalNotes": "All values are within reference ranges. No immediate action required."
    },
    {
      "id": "35",
      "testName": "Vitamin B12",
      "testDate": "2022-07-09T00:00:00Z",
      "laboratory": "Awanui Labs",
      "status": "completed",
      "results": [
        {
          "parameter": "Vitamin B12",
          "value": "310",
          "unit": "pmol/L",
          "referenceRange": "140-700 pmol/L",
          "status": "normal"
        }
      ],
      "clinicalNotes": "All values are within reference ranges. No immediate action required."
    },
    {
      "id": "36",
      "testName": "Complete Blood Count (CBC)",
      "testDate": "2025-05-12T00:00:00Z",
      "laboratory": "Awanui Labs",
      "status": "completed",
      "results": [
        {
          "parameter": "Hemoglobin",
          "value": "138",
          "unit": "g/L",
          "referenceRange": "130-180 g/L",
          "status": "normal"
        },
        {
          "parameter": "WBC",
          "value": "5.9",
          "unit": "x10⁹/L",
          "referenceRange": "4-11 x10⁹/L",
          "status": "normal"
        },
        {
          "parameter": "Platelets",
          "value": "225",
          "unit": "x10⁹/L",
          "referenceRange": "150-400 x10⁹/L",
          "status": "normal"
        }
      ],
      "clinicalNotes": "All values are within reference ranges. No immediate action required."
    }
  ],
  "ZAP28LA": [
    {
      "id": "41",
      "testName": "Liver Function Panel",
      "testDate": "2014-03-10T00:00:00Z",
      "laboratory": "Greymouth Phlebotomy Services",
      "status": "completed",
      "results": [
        {
          "parameter": "ALT",
          "value": "35",
          "unit": "U/L",
          "referenceRange": "7-56 U/L",
          "status": "normal"
        },
        {
          "parameter": "AST",
          "value": "30",
          "unit": "U/L",
          "referenceRange": "10-40 U/L",
          "status": "normal"
        },
        {
          "parameter": "ALP",
          "value": "115",
          "unit": "U/L",
          "referenceRange": "44-147 U/L",
          "status": "normal"
        }
      ],
      "clinicalNotes": "All values are within reference ranges. No immediate action required."
    },
    {
      "id": "42",
      "testName": "Lipid Panel",
      "testDate": "2017-08-21T00:00:00Z",
      "laboratory": "Greymouth Phlebotomy Services",
      "status": "completed",
      "results": [
        {
          "parameter": "Total Cholesterol",
          "value": "5.4",
          "unit": "mmol/L",
          "referenceRange": "0-5.2 mmol/L",
          "status": "abnormal"
        },
        {
          "parameter": "HDL",
          "value": "1.5",
          "unit": "mmol/L",
          "referenceRange": "1-0 mmol/L",
          "status": "normal"
        },
        {
          "parameter": "LDL",
          "value": "3.6",
          "unit": "mmol/L",
          "referenceRange": "0-3.4 mmol/L",
          "status": "abnormal"
        },
        {
          "parameter": "Triglycerides",
          "value": "1.4",
          "unit": "mmol/L",
          "referenceRange": "0-1.7 mmol/L",
          "status": "normal"
        }
      ],
      "clinicalNotes": "Findings include elevated values: Total Cholesterol, LDL. Consider follow-up if clinically indicated."
    },
    {
      "id": "43",
      "testName": "HbA1c",
      "testDate": "2020-12-02T00:00:00Z",
      "laboratory": "Greymouth Phlebotomy Services",
      "status": "completed",
      "results": [
        {
          "parameter": "HbA1c",
          "value": "5.3",
          "unit": "%",
          "referenceRange": "4-5.6 %",
          "status": "normal"
        }
      ],
      "clinicalNotes": "All values are within reference ranges. No immediate action required."
    },
    {
      "id": "44",
      "testName": "Vitamin D",
      "testDate": "2023-05-17T00:00:00Z",
      "laboratory": "Greymouth Phlebotomy Services",
      "status": "completed",
      "results": [
        {
          "parameter": "25(OH)D",
          "value": "48",
          "unit": "nmol/L",
          "referenceRange": "50-0 nmol/L",
          "status": "abnormal"
        }
      ],
      "clinicalNotes": "Findings include low values: 25(OH)D. Consider follow-up if clinically indicated."
    },
    {
      "id": "45",
      "testName": "Complete Blood Count (CBC)",
      "testDate": "2025-07-28T00:00:00Z",
      "laboratory": "Greymouth Phlebotomy Services",
      "status": "completed",
      "results": [
        {
          "parameter": "Hemoglobin",
          "value": "140",
          "unit": "g/L",
          "referenceRange": "130-180 g/L",
          "status": "normal"
        },
        {
          "parameter": "WBC",
          "value": "6.5",
          "unit": "x10⁹/L",
          "referenceRange": "4-11 x10⁹/L",
          "status": "normal"
        },
        {
          "parameter": "Platelets",
          "value": "230",
          "unit": "x10⁹/L",
          "referenceRange": "150-400 x10⁹/L",
          "status": "normal"
        }
      ],
      "clinicalNotes": "All values are within reference ranges. No immediate action required."
    }
  ]
}


export const mockDocuments: Record<string, Document[]> = 

{
  "ZAK21MS": [
    {
      "id": "doc_0001_migraine",
      "type": "discharge-summary",
      "title": "ED Discharge – Migraine Episode",
      "description": "Presented with severe headache. CT normal. Discharged with analgesia.",
      "date": "2010-06-12T00:00:00Z",
      "author": "Dr Wiremu Sharma",
      "specialty": "Emergency Medicine",
      "facility": "Auckland City Hospital",
      "contentType": "application/pdf",
      "size": 512000,
      "tags": [
        "discharge-summary",
        "discharge",
        "episode"
      ]
    },
    {
      "id": "doc_0002_neuro_ref",
      "type": "specialist-letter",
      "title": "Neurology Referral",
      "description": "Referred for evaluation of chronic migraine.",
      "date": "2011-07-01T00:00:00Z",
      "author": "Dr Charlotte Desai",
      "specialty": "Neurology",
      "facility": "Auckland City Hospital",
      "contentType": "application/pdf",
      "size": 512000,
      "tags": [
        "specialist-letter",
        "neurology"
      ]
    },
    {
      "id": "doc_0003_lab_2015",
      "type": "lab-result",
      "title": "Blood Test Results – 2015",
      "description": "All values within normal range.",
      "date": "2015-03-20T00:00:00Z",
      "author": "Dr Moana Singh",
      "specialty": "Pathology",
      "facility": "Auckland City Hospital",
      "contentType": "application/pdf",
      "size": 512000,
      "tags": [
        "lab-result"
      ]
    },
    {
      "id": "doc_0004_spine_xray",
      "type": "x-ray",
      "title": "Lumbar Spine X-Ray Report",
      "description": "Mild degenerative changes. No fracture.",
      "date": "2018-11-05T00:00:00Z",
      "author": "Dr James Kaur",
      "specialty": "Radiology",
      "facility": "Auckland City Hospital",
      "contentType": "application/pdf",
      "size": 512000,
      "tags": [
        "x-ray",
        "lumbar",
        "spine"
      ]
    },
    {
      "id": "doc_0005_annual_2022",
      "type": "report",
      "title": "Annual Health Check Summary",
      "description": "BP 130/85. Cholesterol borderline. Advised dietary changes.",
      "date": "2022-04-18T00:00:00Z",
      "author": "Dr Mereana Joshi",
      "specialty": "General Practice",
      "facility": "Auckland City Hospital",
      "contentType": "application/pdf",
      "size": 512000,
      "tags": [
        "report",
        "annual"
      ]
    },
    {
      "id": "doc_0006_cardio_2025",
      "type": "specialist-letter",
      "title": "Cardiology Follow-up",
      "description": "ECG borderline. No intervention needed. Continue monitoring.",
      "date": "2025-06-10T00:00:00Z",
      "author": "Dr Tāne Kapoor",
      "specialty": "Cardiology",
      "facility": "Auckland City Hospital",
      "contentType": "application/pdf",
      "size": 512000,
      "tags": [
        "specialist-letter",
        "cardiology",
        "follow"
      ]
    }
  ],
  "ZAP28LA": [
    {
      "id": "doc_0007_abdo_pain",
      "type": "discharge-summary",
      "title": "ED Discharge – Abdominal Pain",
      "description": "Presented with lower abdominal pain. No acute findings. Discharged with advice.",
      "date": "2013-08-22T00:00:00Z",
      "author": "Dr Wiremu Sharma",
      "specialty": "Emergency Medicine",
      "facility": "Auckland City Hospital",
      "contentType": "application/pdf",
      "size": 512000,
      "tags": [
        "discharge-summary",
        "discharge"
      ]
    },
    {
      "id": "doc_0008_gastro_ref",
      "type": "specialist-letter",
      "title": "Gastroenterology Referral",
      "description": "Referred for evaluation of bloating and intermittent diarrhea.",
      "date": "2014-09-10T00:00:00Z",
      "author": "Dr Charlotte Desai",
      "specialty": "Gastroenterology",
      "facility": "Auckland City Hospital",
      "contentType": "application/pdf",
      "size": 512000,
      "tags": [
        "specialist-letter",
        "gastroenterology"
      ]
    },
    {
      "id": "doc_0009_lab_2017",
      "type": "lab-result",
      "title": "Blood Test Results – 2017",
      "description": "Mild iron deficiency noted. Recommend dietary changes and repeat in 3 months.",
      "date": "2017-03-05T00:00:00Z",
      "author": "Dr Moana Singh",
      "specialty": "Pathology",
      "facility": "Auckland City Hospital",
      "contentType": "application/pdf",
      "size": 512000,
      "tags": [
        "lab-result"
      ]
    },
    {
      "id": "doc_0010_annual_2021",
      "type": "report",
      "title": "Annual Health Check Summary",
      "description": "BP 125/80. Weight stable. Advised increased physical activity.",
      "date": "2021-06-18T00:00:00Z",
      "author": "Dr Mereana Joshi",
      "specialty": "General Practice",
      "facility": "Auckland City Hospital",
      "contentType": "application/pdf",
      "size": 512000,
      "tags": [
        "report",
        "annual"
      ]
    },
    {
      "id": "doc_0011_endo_2025",
      "type": "specialist-letter",
      "title": "Endocrinology Follow-up",
      "description": "TSH normalized. Continue current dose of levothyroxine.",
      "date": "2025-07-15T00:00:00Z",
      "author": "Dr Tāne Kapoor",
      "specialty": "Endocrinology",
      "facility": "Auckland City Hospital",
      "contentType": "application/pdf",
      "size": 512000,
      "tags": [
        "specialist-letter",
        "endocrinology",
        "follow"
      ]
    }
  ],
  "ZBD33XL": [
    {
      "id": "doc_0012_hypertension",
      "type": "discharge-summary",
      "title": "ED Discharge – Hypertension Crisis",
      "description": "BP 190/110. Stabilized in ED. Discharged with antihypertensive plan.",
      "date": "2005-03-18T00:00:00Z",
      "author": "Dr Wiremu Sharma",
      "specialty": "Emergency Medicine",
      "facility": "Auckland City Hospital",
      "contentType": "application/pdf",
      "size": 512000,
      "tags": [
        "discharge-summary",
        "discharge",
        "hypertension"
      ]
    },
    {
      "id": "doc_0013_cardio_ref",
      "type": "specialist-letter",
      "title": "Cardiology Referral",
      "description": "Referred for cardiovascular risk assessment.",
      "date": "2006-04-22T00:00:00Z",
      "author": "Dr Charlotte Desai",
      "specialty": "Cardiology",
      "facility": "Auckland City Hospital",
      "contentType": "application/pdf",
      "size": 512000,
      "tags": [
        "specialist-letter",
        "cardiology"
      ]
    },
    {
      "id": "doc_0014_lab_2010",
      "type": "lab-result",
      "title": "Blood Test Results – 2010",
      "description": "LDL elevated. Creatinine normal. Recommend statin therapy.",
      "date": "2010-09-05T00:00:00Z",
      "author": "Dr Moana Singh",
      "specialty": "Pathology",
      "facility": "Auckland City Hospital",
      "contentType": "application/pdf",
      "size": 512000,
      "tags": [
        "lab-result"
      ]
    },
    {
      "id": "doc_0015_chest_xray",
      "type": "x-ray",
      "title": "Chest X-Ray Report",
      "description": "No infiltrates. Normal cardiac silhouette.",
      "date": "2013-11-12T00:00:00Z",
      "author": "Dr James Kaur",
      "specialty": "Radiology",
      "facility": "Auckland City Hospital",
      "contentType": "application/pdf",
      "size": 512000,
      "tags": [
        "x-ray"
      ]
    },
    {
      "id": "doc_0016_annual_2018",
      "type": "report",
      "title": "Annual Health Check Summary",
      "description": "BP 135/85. Weight stable. Advised increased exercise.",
      "date": "2018-02-28T00:00:00Z",
      "author": "Dr Mereana Joshi",
      "specialty": "General Practice",
      "facility": "Auckland City Hospital",
      "contentType": "application/pdf",
      "size": 512000,
      "tags": [
        "report",
        "annual"
      ]
    },
    {
      "id": "doc_0017_endo_2022",
      "type": "specialist-letter",
      "title": "Endocrinology Follow-up",
      "description": "TSH borderline. Continue current dose. Repeat in 6 months.",
      "date": "2022-06-10T00:00:00Z",
      "author": "Dr Tāne Kapoor",
      "specialty": "Endocrinology",
      "facility": "Auckland City Hospital",
      "contentType": "application/pdf",
      "size": 512000,
      "tags": [
        "specialist-letter",
        "endocrinology",
        "follow"
      ]
    },
    {
      "id": "doc_0018_lab_2025",
      "type": "lab-result",
      "title": "Blood Test Results – 2025",
      "description": "HbA1c 6.4%. Recommend dietary changes and follow-up.",
      "date": "2025-08-01T00:00:00Z",
      "author": "Dr Moana Singh",
      "specialty": "Pathology",
      "facility": "Auckland City Hospital",
      "contentType": "application/pdf",
      "size": 512000,
      "tags": [
        "lab-result"
      ]
    }
  ],
  "ZBJ59LE": [
    {
      "id": "doc_0019_asthma",
      "type": "discharge-summary",
      "title": "ED Discharge – Asthma Flare-Up",
      "description": "Presented with wheezing and SOB. Nebulized in ED. Discharged with steroids.",
      "date": "2008-04-22T00:00:00Z",
      "author": "Dr Wiremu Sharma",
      "specialty": "Emergency Medicine",
      "facility": "Auckland City Hospital",
      "contentType": "application/pdf",
      "size": 512000,
      "tags": [
        "discharge-summary",
        "discharge",
        "flare"
      ]
    },
    {
      "id": "doc_0020_resp_ref",
      "type": "specialist-letter",
      "title": "Respiratory Referral",
      "description": "Referred for assessment and long-term inhaler strategy.",
      "date": "2009-05-10T00:00:00Z",
      "author": "Dr Charlotte Desai",
      "specialty": "Respiratory Medicine",
      "facility": "Auckland City Hospital",
      "contentType": "application/pdf",
      "size": 512000,
      "tags": [
        "specialist-letter",
        "respiratory"
      ]
    },
    {
      "id": "doc_0021_lab_2013",
      "type": "lab-result",
      "title": "Blood Test Results – 2013",
      "description": "Eosinophils mildly elevated. Suggest allergy testing.",
      "date": "2013-08-18T00:00:00Z",
      "author": "Dr Moana Singh",
      "specialty": "Pathology",
      "facility": "Auckland City Hospital",
      "contentType": "application/pdf",
      "size": 512000,
      "tags": [
        "lab-result"
      ]
    },
    {
      "id": "doc_0022_chest_xray",
      "type": "x-ray",
      "title": "Chest X-Ray Report",
      "description": "No infiltrates. Hyperinflation noted.",
      "date": "2016-11-03T00:00:00Z",
      "author": "Dr James Kaur",
      "specialty": "Radiology",
      "facility": "Auckland City Hospital",
      "contentType": "application/pdf",
      "size": 512000,
      "tags": [
        "x-ray"
      ]
    },
    {
      "id": "doc_0023_annual_2021",
      "type": "report",
      "title": "Annual Health Check Summary",
      "description": "Asthma well-controlled. Advised flu vaccination and inhaler refill.",
      "date": "2021-03-15T00:00:00Z",
      "author": "Dr Mereana Joshi",
      "specialty": "General Practice",
      "facility": "Auckland City Hospital",
      "contentType": "application/pdf",
      "size": 512000,
      "tags": [
        "report",
        "annual"
      ]
    },
    {
      "id": "doc_0024_allergy_2025",
      "type": "specialist-letter",
      "title": "Allergy Clinic Follow-up",
      "description": "Positive for dust mites. Recommend antihistamines and environmental control.",
      "date": "2025-07-20T00:00:00Z",
      "author": "Dr Tāne Kapoor",
      "specialty": "Allergy & Immunology",
      "facility": "Auckland City Hospital",
      "contentType": "application/pdf",
      "size": 512000,
      "tags": [
        "specialist-letter",
        "allergy",
        "clinic"
      ]
    }
  ],
  "ZBS45LD": [
    {
      "id": "doc_0031_chest_pain",
      "type": "discharge-summary",
      "title": "ED Discharge – Chest Pain",
      "description": "ECG normal. Pain resolved with analgesia. Discharged with follow-up advice.",
      "date": "2002-03-14T00:00:00Z",
      "author": "Dr Wiremu Sharma",
      "specialty": "Emergency Medicine",
      "facility": "Auckland City Hospital",
      "contentType": "application/pdf",
      "size": 512000,
      "tags": [
        "discharge-summary",
        "discharge"
      ]
    },
    {
      "id": "doc_0032_cardio_ref",
      "type": "specialist-letter",
      "title": "Cardiology Referral",
      "description": "Referred for cardiovascular risk assessment.",
      "date": "2003-04-20T00:00:00Z",
      "author": "Dr Charlotte Desai",
      "specialty": "Cardiology",
      "facility": "Auckland City Hospital",
      "contentType": "application/pdf",
      "size": 512000,
      "tags": [
        "specialist-letter",
        "cardiology"
      ]
    },
    {
      "id": "doc_0033_lab_2008",
      "type": "lab-result",
      "title": "Blood Test Results – 2008",
      "description": "LDL elevated. HbA1c normal. Recommend statin therapy.",
      "date": "2008-06-05T00:00:00Z",
      "author": "Dr Moana Singh",
      "specialty": "Pathology",
      "facility": "Auckland City Hospital",
      "contentType": "application/pdf",
      "size": 512000,
      "tags": [
        "lab-result"
      ]
    },
    {
      "id": "doc_0034_chest_xray",
      "type": "x-ray",
      "title": "Chest X-Ray Report",
      "description": "No infiltrates. Normal cardiac silhouette.",
      "date": "2012-09-18T00:00:00Z",
      "author": "Dr James Kaur",
      "specialty": "Radiology",
      "facility": "Auckland City Hospital",
      "contentType": "application/pdf",
      "size": 512000,
      "tags": [
        "x-ray"
      ]
    },
    {
      "id": "doc_0035_annual_2017",
      "type": "report",
      "title": "Annual Health Check Summary",
      "description": "BP 138/88. Advised dietary changes and increased physical activity.",
      "date": "2017-03-22T00:00:00Z",
      "author": "Dr Mereana Joshi",
      "specialty": "General Practice",
      "facility": "Auckland City Hospital",
      "contentType": "application/pdf",
      "size": 512000,
      "tags": [
        "report",
        "annual"
      ]
    },
    {
      "id": "doc_0036_endo_2022",
      "type": "specialist-letter",
      "title": "Endocrinology Follow-up",
      "description": "TSH borderline. Continue current dose. Repeat in 6 months.",
      "date": "2022-08-10T00:00:00Z",
      "author": "Dr Tāne Kapoor",
      "specialty": "Endocrinology",
      "facility": "Auckland City Hospital",
      "contentType": "application/pdf",
      "size": 512000,
      "tags": [
        "specialist-letter",
        "endocrinology",
        "follow"
      ]
    },
    {
      "id": "doc_0037_lab_2025",
      "type": "lab-result",
      "title": "Blood Test Results – 2025",
      "description": "HbA1c 6.5%. Recommend dietary changes and follow-up testing.",
      "date": "2025-08-20T00:00:00Z",
      "author": "Dr Moana Singh",
      "specialty": "Pathology",
      "facility": "Auckland City Hospital",
      "contentType": "application/pdf",
      "size": 512000,
      "tags": [
        "lab-result"
      ]
    }
  ],
  "ZCL47UF": [
    {
      "id": "doc_0038_sports_injury",
      "type": "discharge-summary",
      "title": "ED Discharge – Sports Injury",
      "description": "Rolled ankle during rugby. X-ray negative. Discharged with crutches and physio advice.",
      "date": "2019-03-12T00:00:00Z",
      "author": "Dr Wiremu Sharma",
      "specialty": "Emergency Medicine",
      "facility": "Auckland City Hospital",
      "contentType": "application/pdf",
      "size": 512000,
      "tags": [
        "discharge-summary",
        "discharge",
        "sports"
      ]
    },
    {
      "id": "doc_0039_ortho_ref",
      "type": "specialist-letter",
      "title": "Orthopaedic Referral",
      "description": "Referred for evaluation of knee instability and pain during activity.",
      "date": "2020-05-08T00:00:00Z",
      "author": "Dr Charlotte Desai",
      "specialty": "Orthopaedics",
      "facility": "Auckland City Hospital",
      "contentType": "application/pdf",
      "size": 512000,
      "tags": [
        "specialist-letter",
        "orthopaedic"
      ]
    },
    {
      "id": "doc_0040_lab_2023",
      "type": "lab-result",
      "title": "Blood Test Results – 2023",
      "description": "Mild iron deficiency. Recommend dietary adjustment and repeat in 6 months.",
      "date": "2023-09-20T00:00:00Z",
      "author": "Dr Moana Singh",
      "specialty": "Pathology",
      "facility": "Auckland City Hospital",
      "contentType": "application/pdf",
      "size": 512000,
      "tags": [
        "lab-result"
      ]
    },
    {
      "id": "doc_0041_youth_check",
      "type": "report",
      "title": "Youth Health Check Summary",
      "description": "Discussed sleep, diet, and mental wellbeing. No concerns. Advised regular exercise.",
      "date": "2025-06-10T00:00:00Z",
      "author": "Dr Mereana Joshi",
      "specialty": "General Practice",
      "facility": "Auckland City Hospital",
      "contentType": "application/pdf",
      "size": 512000,
      "tags": [
        "report"
      ]
    }
  ],
  "ZCL83GC": [
    {
      "id": "doc_0042_head_injury",
      "type": "discharge-summary",
      "title": "ED Discharge – Head Injury",
      "description": "Fall from ladder. CT head normal. Discharged with observation advice.",
      "date": "2003-05-10T00:00:00Z",
      "author": "Dr Wiremu Sharma",
      "specialty": "Emergency Medicine",
      "facility": "Auckland City Hospital",
      "contentType": "application/pdf",
      "size": 512000,
      "tags": [
        "discharge-summary",
        "discharge"
      ]
    },
    {
      "id": "doc_0043_neuro_ref",
      "type": "specialist-letter",
      "title": "Neurology Referral",
      "description": "Referred for evaluation of dizziness and headaches post-injury.",
      "date": "2004-06-18T00:00:00Z",
      "author": "Dr Charlotte Desai",
      "specialty": "Neurology",
      "facility": "Auckland City Hospital",
      "contentType": "application/pdf",
      "size": 512000,
      "tags": [
        "specialist-letter",
        "neurology"
      ]
    },
    {
      "id": "doc_0044_lab_2009",
      "type": "lab-result",
      "title": "Blood Test Results – 2009",
      "description": "All values within normal range. No action required.",
      "date": "2009-08-22T00:00:00Z",
      "author": "Dr Moana Singh",
      "specialty": "Pathology",
      "facility": "Auckland City Hospital",
      "contentType": "application/pdf",
      "size": 512000,
      "tags": [
        "lab-result"
      ]
    },
    {
      "id": "doc_0045_spine_xray",
      "type": "x-ray",
      "title": "Cervical Spine X-Ray Report",
      "description": "Mild degenerative changes. No acute findings.",
      "date": "2013-02-14T00:00:00Z",
      "author": "Dr James Kaur",
      "specialty": "Radiology",
      "facility": "Auckland City Hospital",
      "contentType": "application/pdf",
      "size": 512000,
      "tags": [
        "x-ray",
        "cervical",
        "spine"
      ]
    },
    {
      "id": "doc_0046_annual_2018",
      "type": "report",
      "title": "Annual Health Check Summary",
      "description": "BP 132/84. Weight stable. Advised regular stretching and hydration.",
      "date": "2018-04-30T00:00:00Z",
      "author": "Dr Mereana Joshi",
      "specialty": "General Practice",
      "facility": "Auckland City Hospital",
      "contentType": "application/pdf",
      "size": 512000,
      "tags": [
        "report",
        "annual"
      ]
    },
    {
      "id": "doc_0047_endo_2023",
      "type": "specialist-letter",
      "title": "Endocrinology Follow-up",
      "description": "TSH slightly elevated. Recommend repeat testing in 6 months.",
      "date": "2023-07-12T00:00:00Z",
      "author": "Dr Tāne Kapoor",
      "specialty": "Endocrinology",
      "facility": "Auckland City Hospital",
      "contentType": "application/pdf",
      "size": 512000,
      "tags": [
        "specialist-letter",
        "endocrinology",
        "follow"
      ]
    },
    {
      "id": "doc_0048_lab_2025",
      "type": "lab-result",
      "title": "Blood Test Results – 2025",
      "description": "HbA1c 6.3%. Recommend dietary changes and follow-up.",
      "date": "2025-08-20T00:00:00Z",
      "author": "Dr Moana Singh",
      "specialty": "Pathology",
      "facility": "Auckland City Hospital",
      "contentType": "application/pdf",
      "size": 512000,
      "tags": [
        "lab-result"
      ]
    }
  ],
  "ZCM16EW": [
    {
      "id": "doc_0049_wrist_fx",
      "type": "discharge-summary",
      "title": "ED Discharge – Wrist Fracture",
      "description": "Fall while skateboarding. X-ray confirmed distal radius fracture. Splinted and discharged.",
      "date": "2015-04-10T00:00:00Z",
      "author": "Dr Wiremu Sharma",
      "specialty": "Emergency Medicine",
      "facility": "Auckland City Hospital",
      "contentType": "application/pdf",
      "size": 512000,
      "tags": [
        "discharge-summary",
        "discharge",
        "fracture"
      ]
    },
    {
      "id": "doc_0050_ortho_follow",
      "type": "specialist-letter",
      "title": "Orthopaedic Follow-up",
      "description": "Healing well. Range of motion improving. Continue physiotherapy.",
      "date": "2015-05-02T00:00:00Z",
      "author": "Dr Charlotte Desai",
      "specialty": "Orthopaedics",
      "facility": "Auckland City Hospital",
      "contentType": "application/pdf",
      "size": 512000,
      "tags": [
        "specialist-letter",
        "orthopaedic",
        "follow"
      ]
    },
    {
      "id": "doc_0051_lab_2019",
      "type": "lab-result",
      "title": "Blood Test Results – 2019",
      "description": "Vitamin D slightly low. Recommend supplementation.",
      "date": "2019-09-15T00:00:00Z",
      "author": "Dr Moana Singh",
      "specialty": "Pathology",
      "facility": "Auckland City Hospital",
      "contentType": "application/pdf",
      "size": 512000,
      "tags": [
        "lab-result"
      ]
    },
    {
      "id": "doc_0052_annual_2023",
      "type": "report",
      "title": "Annual Health Check Summary",
      "description": "BP 122/78. Weight stable. Advised regular exercise and sleep hygiene.",
      "date": "2023-03-20T00:00:00Z",
      "author": "Dr Mereana Joshi",
      "specialty": "General Practice",
      "facility": "Auckland City Hospital",
      "contentType": "application/pdf",
      "size": 512000,
      "tags": [
        "report",
        "annual"
      ]
    },
    {
      "id": "doc_0053_endo_ref_2025",
      "type": "specialist-letter",
      "title": "Endocrinology Referral",
      "description": "TSH borderline. Referred for further endocrine evaluation.",
      "date": "2025-07-30T00:00:00Z",
      "author": "Dr Tāne Kapoor",
      "specialty": "Endocrinology",
      "facility": "Auckland City Hospital",
      "contentType": "application/pdf",
      "size": 512000,
      "tags": [
        "specialist-letter",
        "endocrinology"
      ]
    }
  ],
  "ZDJ24ZS": [
    {
      "id": "doc_0054_kidney_stone",
      "type": "discharge-summary",
      "title": "ED Discharge – Kidney Stone Episode",
      "description": "Presented with flank pain. CT confirmed small stone. Discharged with analgesia and hydration advice.",
      "date": "2007-11-03T00:00:00Z",
      "author": "Dr Wiremu Sharma",
      "specialty": "Emergency Medicine",
      "facility": "Auckland City Hospital",
      "contentType": "application/pdf",
      "size": 512000,
      "tags": [
        "discharge-summary",
        "discharge",
        "episode"
      ]
    },
    {
      "id": "doc_0055_urology_ref",
      "type": "specialist-letter",
      "title": "Urology Referral",
      "description": "Referred for evaluation of stone recurrence and hydration strategy.",
      "date": "2008-01-15T00:00:00Z",
      "author": "Dr Charlotte Desai",
      "specialty": "Urology",
      "facility": "Auckland City Hospital",
      "contentType": "application/pdf",
      "size": 512000,
      "tags": [
        "specialist-letter",
        "urology"
      ]
    },
    {
      "id": "doc_0056_lab_2012",
      "type": "lab-result",
      "title": "Blood Test Results – 2012",
      "description": "Creatinine normal. Calcium slightly elevated. Recommend dietary review.",
      "date": "2012-06-20T00:00:00Z",
      "author": "Dr Moana Singh",
      "specialty": "Pathology",
      "facility": "Auckland City Hospital",
      "contentType": "application/pdf",
      "size": 512000,
      "tags": [
        "lab-result"
      ]
    },
    {
      "id": "doc_0057_abdo_xray",
      "type": "x-ray",
      "title": "Abdominal X-Ray Report",
      "description": "No obstruction. Normal bowel gas pattern.",
      "date": "2016-03-10T00:00:00Z",
      "author": "Dr James Kaur",
      "specialty": "Radiology",
      "facility": "Auckland City Hospital",
      "contentType": "application/pdf",
      "size": 512000,
      "tags": [
        "x-ray"
      ]
    },
    {
      "id": "doc_0058_annual_2021",
      "type": "report",
      "title": "Annual Health Check Summary",
      "description": "BP 130/85. Weight stable. Advised increased hydration and regular exercise.",
      "date": "2021-07-02T00:00:00Z",
      "author": "Dr Mereana Joshi",
      "specialty": "General Practice",
      "facility": "Auckland City Hospital",
      "contentType": "application/pdf",
      "size": 512000,
      "tags": [
        "report",
        "annual"
      ]
    },
    {
      "id": "doc_0059_endo_2025",
      "type": "specialist-letter",
      "title": "Endocrinology Follow-up",
      "description": "TSH normalized. Continue current dose. Repeat in 12 months.",
      "date": "2025-07-30T00:00:00Z",
      "author": "Dr Tāne Kapoor",
      "specialty": "Endocrinology",
      "facility": "Auckland City Hospital",
      "contentType": "application/pdf",
      "size": 512000,
      "tags": [
        "specialist-letter",
        "endocrinology",
        "follow"
      ]
    }
  ],
  "ZDP92ZR": [
    {
      "id": "doc_0060_food_poison",
      "type": "discharge-summary",
      "title": "ED Discharge – Food Poisoning",
      "description": "Presented with vomiting and diarrhea. IV fluids administered. Discharged stable.",
      "date": "2016-01-12T00:00:00Z",
      "author": "Dr Wiremu Sharma",
      "specialty": "Emergency Medicine",
      "facility": "Auckland City Hospital",
      "contentType": "application/pdf",
      "size": 512000,
      "tags": [
        "discharge-summary",
        "discharge",
        "food"
      ]
    },
    {
      "id": "doc_0061_gastro_ref",
      "type": "specialist-letter",
      "title": "Gastroenterology Referral",
      "description": "Referred for evaluation of bloating and irregular bowel habits.",
      "date": "2017-02-20T00:00:00Z",
      "author": "Dr Charlotte Desai",
      "specialty": "Gastroenterology",
      "facility": "Auckland City Hospital",
      "contentType": "application/pdf",
      "size": 512000,
      "tags": [
        "specialist-letter",
        "gastroenterology"
      ]
    },
    {
      "id": "doc_0062_lab_2020",
      "type": "lab-result",
      "title": "Blood Test Results – 2020",
      "description": "Coeliac screen negative. Mild transaminitis. Recommend repeat in 6 months.",
      "date": "2020-07-05T00:00:00Z",
      "author": "Dr Moana Singh",
      "specialty": "Pathology",
      "facility": "Auckland City Hospital",
      "contentType": "application/pdf",
      "size": 512000,
      "tags": [
        "lab-result"
      ]
    },
    {
      "id": "doc_0063_annual_2023",
      "type": "report",
      "title": "Annual Health Check Summary",
      "description": "BP 124/80. Weight stable. Advised increased fibre intake and hydration.",
      "date": "2023-10-01T00:00:00Z",
      "author": "Dr Mereana Joshi",
      "specialty": "General Practice",
      "facility": "Auckland City Hospital",
      "contentType": "application/pdf",
      "size": 512000,
      "tags": [
        "report",
        "annual"
      ]
    },
    {
      "id": "doc_0064_endo_2025",
      "type": "specialist-letter",
      "title": "Endocrinology Follow-up",
      "description": "TSH borderline. Continue current dose. Repeat in 6 months.",
      "date": "2025-08-20T00:00:00Z",
      "author": "Dr Tāne Kapoor",
      "specialty": "Endocrinology",
      "facility": "Auckland City Hospital",
      "contentType": "application/pdf",
      "size": 512000,
      "tags": [
        "specialist-letter",
        "endocrinology",
        "follow"
      ]
    }
  ],
  "ZES76BM": [
    {
      "id": "doc_0065_ankle_sprain",
      "type": "discharge-summary",
      "title": "ED Discharge – Ankle Sprain",
      "description": "Twisted ankle during netball. X-ray negative. Discharged with crutches and physio advice.",
      "date": "2016-09-12T00:00:00Z",
      "author": "Dr Wiremu Sharma",
      "specialty": "Emergency Medicine",
      "facility": "Auckland City Hospital",
      "contentType": "application/pdf",
      "size": 512000,
      "tags": [
        "discharge-summary",
        "discharge",
        "sprain"
      ]
    },
    {
      "id": "doc_0066_physio_ref",
      "type": "specialist-letter",
      "title": "Physiotherapy Referral",
      "description": "Referred for strengthening and mobility exercises.",
      "date": "2016-09-20T00:00:00Z",
      "author": "Dr Charlotte Desai",
      "specialty": "Physiotherapy",
      "facility": "Auckland City Hospital",
      "contentType": "application/pdf",
      "size": 512000,
      "tags": [
        "specialist-letter",
        "physiotherapy"
      ]
    },
    {
      "id": "doc_0067_lab_2020",
      "type": "lab-result",
      "title": "Blood Test Results – 2020",
      "description": "Iron slightly low. Recommend dietary changes and repeat in 6 months.",
      "date": "2020-03-02T00:00:00Z",
      "author": "Dr Moana Singh",
      "specialty": "Pathology",
      "facility": "Auckland City Hospital",
      "contentType": "application/pdf",
      "size": 512000,
      "tags": [
        "lab-result"
      ]
    },
    {
      "id": "doc_0068_annual_2023",
      "type": "report",
      "title": "Annual Health Check Summary",
      "description": "BP 120/78. Weight stable. Advised increased physical activity.",
      "date": "2023-03-02T00:00:00Z",
      "author": "Dr Mereana Joshi",
      "specialty": "General Practice",
      "facility": "Auckland City Hospital",
      "contentType": "application/pdf",
      "size": 512000,
      "tags": [
        "report",
        "annual"
      ]
    },
    {
      "id": "doc_0069_endo_2025",
      "type": "specialist-letter",
      "title": "Endocrinology Follow-up",
      "description": "TSH borderline. Continue current dose. Repeat in 6 months.",
      "date": "2025-08-20T00:00:00Z",
      "author": "Dr Tāne Kapoor",
      "specialty": "Endocrinology",
      "facility": "Auckland City Hospital",
      "contentType": "application/pdf",
      "size": 512000,
      "tags": [
        "specialist-letter",
        "endocrinology",
        "follow"
      ]
    }
  ],
  "ZFE35PQ": [
    {
      "id": "doc_0070_gastro_ed",
      "type": "discharge-summary",
      "title": "ED Discharge – Gastro Episode",
      "description": "Presented with vomiting and diarrhea. IV fluids given. Discharged stable.",
      "date": "2016-02-10T00:00:00Z",
      "author": "Dr Wiremu Sharma",
      "specialty": "Emergency Medicine",
      "facility": "Auckland City Hospital",
      "contentType": "application/pdf",
      "size": 512000,
      "tags": [
        "discharge-summary",
        "discharge",
        "gastro"
      ]
    },
    {
      "id": "doc_0071_gastro_ref",
      "type": "specialist-letter",
      "title": "Gastroenterology Referral",
      "description": "Referred for evaluation of bloating and irregular bowel habits.",
      "date": "2017-03-05T00:00:00Z",
      "author": "Dr Charlotte Desai",
      "specialty": "Gastroenterology",
      "facility": "Auckland City Hospital",
      "contentType": "application/pdf",
      "size": 512000,
      "tags": [
        "specialist-letter",
        "gastroenterology"
      ]
    },
    {
      "id": "doc_0072_lab_2020",
      "type": "lab-result",
      "title": "Blood Test Results – 2020",
      "description": "Coeliac screen negative. Mild transaminitis. Recommend repeat in 6 months.",
      "date": "2020-09-03T00:00:00Z",
      "author": "Dr Moana Singh",
      "specialty": "Pathology",
      "facility": "Auckland City Hospital",
      "contentType": "application/pdf",
      "size": 512000,
      "tags": [
        "lab-result"
      ]
    },
    {
      "id": "doc_0073_annual_2025",
      "type": "report",
      "title": "Annual Health Check Summary",
      "description": "BP 126/82. Weight stable. Advised increased fibre intake and hydration.",
      "date": "2025-08-20T00:00:00Z",
      "author": "Dr Mereana Joshi",
      "specialty": "General Practice",
      "facility": "Auckland City Hospital",
      "contentType": "application/pdf",
      "size": 512000,
      "tags": [
        "report",
        "annual"
      ]
    }
  ],
  "ZFZ57UL": [
    {
      "id": "doc_0074_gallbladder",
      "type": "discharge-summary",
      "title": "ED Discharge – Gallbladder Pain",
      "description": "Presented with RUQ pain. Ultrasound showed gallstones. Discharged with surgical referral.",
      "date": "2009-03-18T00:00:00Z",
      "author": "Dr Wiremu Sharma",
      "specialty": "Emergency Medicine",
      "facility": "Auckland City Hospital",
      "contentType": "application/pdf",
      "size": 512000,
      "tags": [
        "discharge-summary",
        "discharge",
        "gallbladder"
      ]
    },
    {
      "id": "doc_0075_surgical_ref",
      "type": "specialist-letter",
      "title": "Surgical Referral",
      "description": "Referred for elective gallbladder removal due to recurrent biliary colic.",
      "date": "2009-04-10T00:00:00Z",
      "author": "Dr Charlotte Desai",
      "specialty": "Surgery",
      "facility": "Auckland City Hospital",
      "contentType": "application/pdf",
      "size": 512000,
      "tags": [
        "specialist-letter",
        "surgical"
      ]
    },
    {
      "id": "doc_0076_lab_2013",
      "type": "lab-result",
      "title": "Blood Test Results – 2013",
      "description": "ALT mildly elevated. CRP normal. Recommend follow-up in 6 months.",
      "date": "2013-07-22T00:00:00Z",
      "author": "Dr Moana Singh",
      "specialty": "Pathology",
      "facility": "Auckland City Hospital",
      "contentType": "application/pdf",
      "size": 512000,
      "tags": [
        "lab-result"
      ]
    },
    {
      "id": "doc_0077_chest_xray",
      "type": "x-ray",
      "title": "Chest X-Ray Report",
      "description": "No infiltrates. Normal cardiac silhouette.",
      "date": "2017-10-05T00:00:00Z",
      "author": "Dr James Kaur",
      "specialty": "Radiology",
      "facility": "Auckland City Hospital",
      "contentType": "application/pdf",
      "size": 512000,
      "tags": [
        "x-ray"
      ]
    },
    {
      "id": "doc_0078_annual_2022",
      "type": "report",
      "title": "Annual Health Check Summary",
      "description": "BP 128/84. Weight stable. Advised increased physical activity.",
      "date": "2022-12-30T00:00:00Z",
      "author": "Dr Mereana Joshi",
      "specialty": "General Practice",
      "facility": "Auckland City Hospital",
      "contentType": "application/pdf",
      "size": 512000,
      "tags": [
        "report",
        "annual"
      ]
    },
    {
      "id": "doc_0079_endo_2025",
      "type": "specialist-letter",
      "title": "Endocrinology Follow-up",
      "description": "TSH borderline. Continue current dose. Repeat in 6 months.",
      "date": "2025-08-20T00:00:00Z",
      "author": "Dr Tāne Kapoor",
      "specialty": "Endocrinology",
      "facility": "Auckland City Hospital",
      "contentType": "application/pdf",
      "size": 512000,
      "tags": [
        "specialist-letter",
        "endocrinology",
        "follow"
      ]
    }
  ],
  "ZGA02YJ": [
    {
      "id": "doc_0080_hypertension",
      "type": "discharge-summary",
      "title": "ED Discharge – Hypertension Crisis",
      "description": "BP 190/110. Stabilized in ED. Discharged with antihypertensive plan.",
      "date": "2003-04-12T00:00:00Z",
      "author": "Dr Wiremu Sharma",
      "specialty": "Emergency Medicine",
      "facility": "Auckland City Hospital",
      "contentType": "application/pdf",
      "size": 512000,
      "tags": [
        "discharge-summary",
        "discharge",
        "hypertension"
      ]
    },
    {
      "id": "doc_0081_cardio_ref",
      "type": "specialist-letter",
      "title": "Cardiology Referral",
      "description": "Referred for cardiovascular risk assessment.",
      "date": "2004-05-18T00:00:00Z",
      "author": "Dr Charlotte Desai",
      "specialty": "Cardiology",
      "facility": "Auckland City Hospital",
      "contentType": "application/pdf",
      "size": 512000,
      "tags": [
        "specialist-letter",
        "cardiology"
      ]
    },
    {
      "id": "doc_0082_lab_2009",
      "type": "lab-result",
      "title": "Blood Test Results – 2009",
      "description": "LDL elevated. Creatinine normal. Recommend statin therapy.",
      "date": "2009-08-05T00:00:00Z",
      "author": "Dr Moana Singh",
      "specialty": "Pathology",
      "facility": "Auckland City Hospital",
      "contentType": "application/pdf",
      "size": 512000,
      "tags": [
        "lab-result"
      ]
    },
    {
      "id": "doc_0083_chest_xray",
      "type": "x-ray",
      "title": "Chest X-Ray Report",
      "description": "No infiltrates. Normal cardiac silhouette.",
      "date": "2013-11-12T00:00:00Z",
      "author": "Dr James Kaur",
      "specialty": "Radiology",
      "facility": "Auckland City Hospital",
      "contentType": "application/pdf",
      "size": 512000,
      "tags": [
        "x-ray"
      ]
    },
    {
      "id": "doc_0084_annual_2018",
      "type": "report",
      "title": "Annual Health Check Summary",
      "description": "BP 135/85. Weight stable. Advised increased exercise.",
      "date": "2018-02-28T00:00:00Z",
      "author": "Dr Mereana Joshi",
      "specialty": "General Practice",
      "facility": "Auckland City Hospital",
      "contentType": "application/pdf",
      "size": 512000,
      "tags": [
        "report",
        "annual"
      ]
    },
    {
      "id": "doc_0085_endo_2023",
      "type": "specialist-letter",
      "title": "Endocrinology Follow-up",
      "description": "TSH borderline. Continue current dose. Repeat in 6 months.",
      "date": "2023-06-10T00:00:00Z",
      "author": "Dr Tāne Kapoor",
      "specialty": "Endocrinology",
      "facility": "Auckland City Hospital",
      "contentType": "application/pdf",
      "size": 512000,
      "tags": [
        "specialist-letter",
        "endocrinology",
        "follow"
      ]
    },
    {
      "id": "doc_0086_lab_2025",
      "type": "lab-result",
      "title": "Blood Test Results – 2025",
      "description": "HbA1c 6.4%. Recommend dietary changes and follow-up.",
      "date": "2025-08-30T00:00:00Z",
      "author": "Dr Moana Singh",
      "specialty": "Pathology",
      "facility": "Auckland City Hospital",
      "contentType": "application/pdf",
      "size": 512000,
      "tags": [
        "lab-result"
      ]
    }
  ]
}

export const mockMedication: Record<string, Medication[]> = 
{
  "ZAK21MS": [
    {
      "id": "1",
      "name": "Amoxicillin",
      "dosage": "500mg",
      "frequency": "Oral tablet",
      "route": "oral",
      "prescribingDoctor": "Dr Charlotte Desai",
      "prescriptionDate": "2025-08-28T00:00:00.000Z",
      "startDate": "2025-08-28T00:00:00.000Z",
      "endDate": "2025-09-27T00:00:00.000Z",
      "status": "active"
    },
    {
      "id": "2",
      "name": "Hydrocortisone",
      "dosage": "Apply thinly",
      "frequency": "Topical cream",
      "route": "topical",
      "prescribingDoctor": "Dr Tāne Kapoor",
      "prescriptionDate": "2025-08-29T00:00:00.000Z",
      "startDate": "2025-08-29T00:00:00.000Z",
      "endDate": "2025-09-12T00:00:00.000Z",
      "status": "active"
    }
  ],
  "ZAP28LA": [
    {
      "id": "4",
      "name": "Prednisone",
      "dosage": "50mcg",
      "frequency": "Oral tablet",
      "route": "oral",
      "prescribingDoctor": "Dr Wiremu Sharma",
      "prescriptionDate": "2025-08-30T00:00:00.000Z",
      "startDate": "2025-08-30T00:00:00.000Z",
      "endDate": "2025-09-28T00:00:00.000Z",
      "status": "active"
    },
    {
      "id": "5",
      "name": "Betamethasone valerate",
      "dosage": "Apply sparingly",
      "frequency": "Topical cream",
      "route": "topical",
      "prescribingDoctor": "Dr Wiremu Sharma",
      "prescriptionDate": "2025-08-30T00:00:00.000Z",
      "startDate": "2025-08-30T00:00:00.000Z",
      "endDate": "2025-09-13T00:00:00.000Z",
      "status": "active"
    }
  ],
  "ZBD33XL": [
    {
      "id": "6",
      "name": "Paracetamol",
      "dosage": "500mg",
      "frequency": "Oral tablet",
      "route": "oral",
      "prescribingDoctor": "Dr Wiremu Sharma",
      "prescriptionDate": "2025-08-31T00:00:00.000Z",
      "startDate": "2025-08-31T00:00:00.000Z",
      "endDate": "2025-09-10T00:00:00.000Z",
      "status": "active"
    },
    {
      "id": "7",
      "name": "Mometasone furoate",
      "dosage": "Apply thinly",
      "frequency": "Topical cream",
      "route": "topical",
      "prescribingDoctor": "Dr Tāne Kapoor",
      "prescriptionDate": "2025-08-31T00:00:00.000Z",
      "startDate": "2025-08-31T00:00:00.000Z",
      "endDate": "2025-09-14T00:00:00.000Z",
      "status": "active"
    },
    {
      "id": "10",
      "name": "Atorvastatin",
      "dosage": "20mg",
      "frequency": "Oral tablet",
      "route": "oral",
      "prescribingDoctor": "Dr Moana Singh",
      "prescriptionDate": "2025-08-31T00:00:00.000Z",
      "startDate": "2025-08-31T00:00:00.000Z",
      "endDate": "2025-09-30T00:00:00.000Z",
      "status": "active"
    }
  ],
  "ZBJ59LE": [
    {
      "id": "11",
      "name": "Triamcinolone acetonide",
      "dosage": "Apply thinly",
      "frequency": "Topical cream",
      "route": "topical",
      "prescribingDoctor": "Dr James Kaur",
      "prescriptionDate": "2025-08-31T00:00:00.000Z",
      "startDate": "2025-08-31T00:00:00.000Z",
      "endDate": "2025-09-15T00:00:00.000Z",
      "status": "active"
    }
  ],
  "ZBK58TM": [
    {
      "id": "15",
      "name": "Omeprazole",
      "dosage": "20mg",
      "frequency": "Oral tablet",
      "route": "oral",
      "prescribingDoctor": "Dr Mereana Joshi",
      "prescriptionDate": "2025-08-31T00:00:00.000Z",
      "startDate": "2025-08-31T00:00:00.000Z",
      "endDate": "2025-09-30T00:00:00.000Z",
      "status": "active"
    },
    {
      "id": "16",
      "name": "Fusidic acid",
      "dosage": "Apply nightly",
      "frequency": "Topical cream",
      "route": "topical",
      "prescribingDoctor": "Dr Charlotte Desai",
      "prescriptionDate": "2025-08-31T00:00:00.000Z",
      "startDate": "2025-08-31T00:00:00.000Z",
      "endDate": "2025-09-14T00:00:00.000Z",
      "status": "active"
    }
  ],
  "ZBS45LD": [
    {
      "id": "17",
      "name": "Aspirin",
      "dosage": "100mg",
      "frequency": "Oral tablet",
      "route": "oral",
      "prescribingDoctor": "Dr Priya Clarke",
      "prescriptionDate": "2025-08-31T00:00:00.000Z",
      "startDate": "2025-08-31T00:00:00.000Z",
      "endDate": "2025-09-30T00:00:00.000Z",
      "status": "active"
    },
    {
      "id": "18",
      "name": "Sertraline",
      "dosage": "500mg",
      "frequency": "Oral tablet",
      "route": "oral",
      "prescribingDoctor": "Dr Rohan Te Rangi",
      "prescriptionDate": "2025-08-31T00:00:00.000Z",
      "startDate": "2025-08-31T00:00:00.000Z",
      "endDate": "2025-09-30T00:00:00.000Z",
      "status": "active"
    },
    {
      "id": "19",
      "name": "Clobetasol propionate",
      "dosage": "Apply thinly",
      "frequency": "Topical cream",
      "route": "topical",
      "prescribingDoctor": "Dr Anika Thompson",
      "prescriptionDate": "2025-08-31T00:00:00.000Z",
      "startDate": "2025-08-31T00:00:00.000Z",
      "endDate": "2025-09-14T00:00:00.000Z",
      "status": "active"
    },
    {
      "id": "20",
      "name": "Amlodipine",
      "dosage": "16mg",
      "frequency": "Oral tablet",
      "route": "oral",
      "prescribingDoctor": "Dr Harpreet Ngatai",
      "prescriptionDate": "2025-08-31T00:00:00.000Z",
      "startDate": "2025-08-31T00:00:00.000Z",
      "endDate": "2025-09-30T00:00:00.000Z",
      "status": "active"
    },
    {
      "id": "21",
      "name": "Diclofenac sodium",
      "dosage": "Apply to joints",
      "frequency": "Topical cream",
      "route": "topical",
      "prescribingDoctor": "Dr Arjun Wainui",
      "prescriptionDate": "2025-08-31T00:00:00.000Z",
      "startDate": "2025-08-31T00:00:00.000Z",
      "endDate": "2025-09-14T00:00:00.000Z",
      "status": "active"
    },
    {
      "id": "22",
      "name": "Loratadine",
      "dosage": "10mg",
      "frequency": "Oral tablet",
      "route": "oral",
      "prescribingDoctor": "Dr Aroha Patel",
      "prescriptionDate": "2025-08-31T00:00:00.000Z",
      "startDate": "2025-08-31T00:00:00.000Z",
      "endDate": "2025-09-30T00:00:00.000Z",
      "status": "active"
    }
  ],
  "ZCL47UF": [
    {
      "id": "23",
      "name": "Cetirizine hydrochloride",
      "dosage": "5mg",
      "frequency": "Oral tablet",
      "route": "oral",
      "prescribingDoctor": "Dr Neha Rawiri",
      "prescriptionDate": "2025-08-31T00:00:00.000Z",
      "startDate": "2025-08-31T00:00:00.000Z",
      "endDate": "2025-09-30T00:00:00.000Z",
      "status": "active"
    },
    {
      "id": "24",
      "name": "Colecalciferol",
      "dosage": "1000 IU",
      "frequency": "Oral tablet",
      "route": "oral",
      "prescribingDoctor": "Dr Moana Singh",
      "prescriptionDate": "2025-08-31T00:00:00.000Z",
      "startDate": "2025-08-31T00:00:00.000Z",
      "endDate": "2025-09-30T00:00:00.000Z",
      "status": "active"
    },
    {
      "id": "25",
      "name": "Fluoxetine",
      "dosage": "30mg",
      "frequency": "Oral tablet",
      "route": "oral",
      "prescribingDoctor": "Dr James Kaur",
      "prescriptionDate": "2025-08-31T00:00:00.000Z",
      "startDate": "2025-08-31T00:00:00.000Z",
      "endDate": "2025-09-15T00:00:00.000Z",
      "status": "active"
    },
    {
      "id": "26",
      "name": "Celecoxib",
      "dosage": "7.5mg",
      "frequency": "Oral tablet",
      "route": "oral",
      "prescribingDoctor": "Dr Mereana Joshi",
      "prescriptionDate": "2025-08-31T00:00:00.000Z",
      "startDate": "2025-08-31T00:00:00.000Z",
      "endDate": "2025-09-14T00:00:00.000Z",
      "status": "active"
    },
    {
      "id": "27",
      "name": "Codeine phosphate",
      "dosage": "15mg",
      "frequency": "Oral tablet",
      "route": "oral",
      "prescribingDoctor": "Dr Charlotte Desai",
      "prescriptionDate": "2025-08-31T00:00:00.000Z",
      "startDate": "2025-08-31T00:00:00.000Z",
      "endDate": "2025-09-30T00:00:00.000Z",
      "status": "active"
    },
    {
      "id": "28",
      "name": "Medroxyprogesterone acetate",
      "dosage": "Apply to scalp",
      "frequency": "",
      "prescribingDoctor": "Dr Tāne Kapoor",
      "prescriptionDate": "2025-08-31T00:00:00.000Z",
      "startDate": "2025-08-31T00:00:00.000Z",
      "endDate": "2025-09-14T00:00:00.000Z",
      "status": "active"
    }
  ],
  "ZCL83GC": [
    {
      "id": "29",
      "name": "Ibuprofen",
      "dosage": "200mg",
      "frequency": "Oral tablet",
      "route": "oral",
      "prescribingDoctor": "Dr Priya Clarke",
      "prescriptionDate": "2025-08-31T00:00:00.000Z",
      "startDate": "2025-08-31T00:00:00.000Z",
      "endDate": "2025-09-14T00:00:00.000Z",
      "status": "active"
    },
    {
      "id": "30",
      "name": "Levothyroxine",
      "dosage": "100mcg",
      "frequency": "Oral tablet",
      "route": "oral",
      "prescribingDoctor": "Dr Wiremu Sharma",
      "prescriptionDate": "2025-08-31T00:00:00.000Z",
      "startDate": "2025-08-31T00:00:00.000Z",
      "endDate": "2025-09-30T00:00:00.000Z",
      "status": "active"
    },
    {
      "id": "31",
      "name": "Zopiclone",
      "dosage": "5mg",
      "frequency": "Oral tablet",
      "route": "oral",
      "prescribingDoctor": "Dr Anika Thompson",
      "prescriptionDate": "2025-08-31T00:00:00.000Z",
      "startDate": "2025-08-31T00:00:00.000Z",
      "endDate": "2025-09-14T00:00:00.000Z",
      "status": "active"
    },
    {
      "id": "32",
      "name": "Metoprolol succinate",
      "dosage": "50mg",
      "frequency": "Oral tablet",
      "route": "oral",
      "prescribingDoctor": "Dr Harpreet Ngatai",
      "prescriptionDate": "2025-08-31T00:00:00.000Z",
      "startDate": "2025-08-31T00:00:00.000Z",
      "endDate": "2025-09-30T00:00:00.000Z",
      "status": "active"
    },
    {
      "id": "33",
      "name": "Mometasone furoate",
      "dosage": "Apply to rash",
      "frequency": "Topical cream",
      "route": "topical",
      "prescribingDoctor": "Dr Arjun Wainui",
      "prescriptionDate": "2025-08-31T00:00:00.000Z",
      "startDate": "2025-08-31T00:00:00.000Z",
      "endDate": "2025-09-14T00:00:00.000Z",
      "status": "active"
    },
    {
      "id": "34",
      "name": "Candesartan cilexetil",
      "dosage": "8mg",
      "frequency": "Oral tablet",
      "route": "oral",
      "prescribingDoctor": "Dr Aroha Patel",
      "prescriptionDate": "2025-08-31T00:00:00.000Z",
      "startDate": "2025-08-31T00:00:00.000Z",
      "endDate": "2025-09-30T00:00:00.000Z",
      "status": "active"
    }
  ],
  "ZCM16EW": [
    {
      "id": "35",
      "name": "Fluoxetine",
      "dosage": "20mg",
      "frequency": "Oral tablet",
      "route": "oral",
      "prescribingDoctor": "Dr Neha Rawiri",
      "prescriptionDate": "2025-08-31T00:00:00.000Z",
      "startDate": "2025-08-31T00:00:00.000Z",
      "endDate": "2025-09-30T00:00:00.000Z",
      "status": "active"
    },
    {
      "id": "36",
      "name": "Prednisone",
      "dosage": "75mcg",
      "frequency": "Oral tablet",
      "route": "oral",
      "prescribingDoctor": "Dr Moana Singh",
      "prescriptionDate": "2025-08-31T00:00:00.000Z",
      "startDate": "2025-08-31T00:00:00.000Z",
      "endDate": "2025-09-30T00:00:00.000Z",
      "status": "active"
    },
    {
      "id": "37",
      "name": "Paracetamol",
      "dosage": "500mg",
      "frequency": "Oral tablet",
      "route": "oral",
      "prescribingDoctor": "Dr James Kaur",
      "prescriptionDate": "2025-08-31T00:00:00.000Z",
      "startDate": "2025-08-31T00:00:00.000Z",
      "endDate": "2025-09-14T00:00:00.000Z",
      "status": "active"
    },
    {
      "id": "38",
      "name": "Fusidic acid",
      "dosage": "Apply to wound",
      "frequency": "Topical cream",
      "route": "topical",
      "prescribingDoctor": "Dr Mereana Joshi",
      "prescriptionDate": "2025-08-31T00:00:00.000Z",
      "startDate": "2025-08-31T00:00:00.000Z",
      "endDate": "2025-09-14T00:00:00.000Z",
      "status": "active"
    },
    {
      "id": "39",
      "name": "Calcipotriol",
      "dosage": "Apply to skin",
      "frequency": "Topical cream",
      "route": "topical",
      "prescribingDoctor": "Dr Charlotte Desai",
      "prescriptionDate": "2025-08-31T00:00:00.000Z",
      "startDate": "2025-08-31T00:00:00.000Z",
      "endDate": "2025-09-14T00:00:00.000Z",
      "status": "active"
    },
    {
      "id": "40",
      "name": "Metoprolol succinate",
      "dosage": "25mg",
      "frequency": "Oral tablet",
      "route": "oral",
      "prescribingDoctor": "Dr Tāne Kapoor",
      "prescriptionDate": "2025-08-31T00:00:00.000Z",
      "startDate": "2025-08-31T00:00:00.000Z",
      "endDate": "2025-09-30T00:00:00.000Z",
      "status": "active"
    }
  ],
  "ZDJ24ZS": [
    {
      "id": "41",
      "name": "Atorvastatin",
      "dosage": "10mg",
      "frequency": "Oral tablet",
      "route": "oral",
      "prescribingDoctor": "Dr Priya Clarke",
      "prescriptionDate": "2025-08-31T00:00:00.000Z",
      "startDate": "2025-08-31T00:00:00.000Z",
      "endDate": "2025-09-30T00:00:00.000Z",
      "status": "active"
    },
    {
      "id": "42",
      "name": "Amoxicillin",
      "dosage": "500mg",
      "frequency": "Oral tablet",
      "route": "oral",
      "prescribingDoctor": "Dr Wiremu Sharma",
      "prescriptionDate": "2025-08-31T00:00:00.000Z",
      "startDate": "2025-08-31T00:00:00.000Z",
      "endDate": "2025-09-14T00:00:00.000Z",
      "status": "active"
    },
    {
      "id": "43",
      "name": "Hydrocortisone",
      "dosage": "Apply to rash",
      "frequency": "Topical cream",
      "route": "topical",
      "prescribingDoctor": "Dr Anika Thompson",
      "prescriptionDate": "2025-08-31T00:00:00.000Z",
      "startDate": "2025-08-31T00:00:00.000Z",
      "endDate": "2025-09-14T00:00:00.000Z",
      "status": "active"
    },
    {
      "id": "44",
      "name": "Betamethasone valerate",
      "dosage": "Apply sparingly",
      "frequency": "Topical cream",
      "route": "topical",
      "prescribingDoctor": "Dr Harpreet Ngatai",
      "prescriptionDate": "2025-08-31T00:00:00.000Z",
      "startDate": "2025-08-31T00:00:00.000Z",
      "endDate": "2025-09-14T00:00:00.000Z",
      "status": "active"
    },
    {
      "id": "45",
      "name": "Metformin hydrochloride",
      "dosage": "500mg",
      "frequency": "Oral tablet",
      "route": "oral",
      "prescribingDoctor": "Dr Arjun Wainui",
      "prescriptionDate": "2025-08-31T00:00:00.000Z",
      "startDate": "2025-08-31T00:00:00.000Z",
      "endDate": "2025-09-30T00:00:00.000Z",
      "status": "active"
    },
    {
      "id": "46",
      "name": "Colecalciferol",
      "dosage": "1000 IU",
      "frequency": "Oral tablet",
      "route": "oral",
      "prescribingDoctor": "Dr Aroha Patel",
      "prescriptionDate": "2025-08-31T00:00:00.000Z",
      "startDate": "2025-08-31T00:00:00.000Z",
      "endDate": "2025-09-30T00:00:00.000Z",
      "status": "active"
    }
  ],
  "ZDP92ZR": [
    {
      "id": "47",
      "name": "Omeprazole",
      "dosage": "20mg",
      "frequency": "Oral tablet",
      "route": "oral",
      "prescribingDoctor": "Dr Neha Rawiri",
      "prescriptionDate": "2025-06-01T00:00:00.000Z",
      "startDate": "2025-06-01T00:00:00.000Z",
      "endDate": "2025-07-01T00:00:00.000Z",
      "status": "active"
    },
    {
      "id": "48",
      "name": "Hydrocortisone",
      "dosage": "Apply to rash",
      "frequency": "Topical cream",
      "route": "topical",
      "prescribingDoctor": "Dr Moana Singh",
      "prescriptionDate": "2025-06-15T00:00:00.000Z",
      "startDate": "2025-06-15T00:00:00.000Z",
      "endDate": "2025-06-29T00:00:00.000Z",
      "status": "active"
    },
    {
      "id": "49",
      "name": "Prednisone",
      "dosage": "50mcg",
      "frequency": "Oral tablet",
      "route": "oral",
      "prescribingDoctor": "Dr James Kaur",
      "prescriptionDate": "2025-07-10T00:00:00.000Z",
      "startDate": "2025-07-10T00:00:00.000Z",
      "endDate": "2025-08-09T00:00:00.000Z",
      "status": "active"
    },
    {
      "id": "50",
      "name": "Calcipotriol",
      "dosage": "Apply to skin",
      "frequency": "Topical cream",
      "route": "topical",
      "prescribingDoctor": "Dr Mereana Joshi",
      "prescriptionDate": "2025-08-01T00:00:00.000Z",
      "startDate": "2025-08-01T00:00:00.000Z",
      "endDate": "2025-08-15T00:00:00.000Z",
      "status": "active"
    },
    {
      "id": "51",
      "name": "Amlodipine",
      "dosage": "8mg",
      "frequency": "Oral tablet",
      "route": "oral",
      "prescribingDoctor": "Dr Charlotte Desai",
      "prescriptionDate": "2025-08-15T00:00:00.000Z",
      "startDate": "2025-08-15T00:00:00.000Z",
      "endDate": "2025-09-14T00:00:00.000Z",
      "status": "active"
    },
    {
      "id": "52",
      "name": "Loratadine",
      "dosage": "10mg",
      "frequency": "Oral tablet",
      "route": "oral",
      "prescribingDoctor": "Dr Tāne Kapoor",
      "prescriptionDate": "2025-08-30T00:00:00.000Z",
      "startDate": "2025-08-30T00:00:00.000Z",
      "endDate": "2025-09-29T00:00:00.000Z",
      "status": "active"
    }
  ],
  "ZES76BM": [
    {
      "id": "53",
      "name": "Atorvastatin",
      "dosage": "10mg",
      "frequency": "Oral tablet",
      "route": "oral",
      "prescribingDoctor": "Dr Priya Clarke",
      "prescriptionDate": "2025-04-01T00:00:00.000Z",
      "startDate": "2025-04-01T00:00:00.000Z",
      "endDate": "2025-05-01T00:00:00.000Z",
      "status": "active"
    },
    {
      "id": "54",
      "name": "Triamcinolone acetonide",
      "dosage": "Apply to eczema",
      "frequency": "Topical cream",
      "route": "topical",
      "prescribingDoctor": "Dr Wiremu Sharma",
      "prescriptionDate": "2025-05-10T00:00:00.000Z",
      "startDate": "2025-05-10T00:00:00.000Z",
      "endDate": "2025-05-24T00:00:00.000Z",
      "status": "active"
    },
    {
      "id": "55",
      "name": "Colecalciferol",
      "dosage": "1000 IU",
      "frequency": "Oral tablet",
      "route": "oral",
      "prescribingDoctor": "Dr Anika Thompson",
      "prescriptionDate": "2025-06-15T00:00:00.000Z",
      "startDate": "2025-06-15T00:00:00.000Z",
      "endDate": "2025-07-15T00:00:00.000Z",
      "status": "active"
    },
    {
      "id": "56",
      "name": "Zopiclone",
      "dosage": "5mg",
      "frequency": "Oral tablet",
      "route": "oral",
      "prescribingDoctor": "Dr Harpreet Ngatai",
      "prescriptionDate": "2025-07-20T00:00:00.000Z",
      "startDate": "2025-07-20T00:00:00.000Z",
      "endDate": "2025-08-03T00:00:00.000Z",
      "status": "active"
    },
    {
      "id": "57",
      "name": "Mometasone furoate",
      "dosage": "Apply to rash",
      "frequency": "Topical cream",
      "route": "topical",
      "prescribingDoctor": "Dr Arjun Wainui",
      "prescriptionDate": "2025-08-10T00:00:00.000Z",
      "startDate": "2025-08-10T00:00:00.000Z",
      "endDate": "2025-08-24T00:00:00.000Z",
      "status": "active"
    },
    {
      "id": "58",
      "name": "Candesartan cilexetil",
      "dosage": "8mg",
      "frequency": "Oral tablet",
      "route": "oral",
      "prescribingDoctor": "Dr Aroha Patel",
      "prescriptionDate": "2025-08-25T00:00:00.000Z",
      "startDate": "2025-08-25T00:00:00.000Z",
      "endDate": "2025-09-24T00:00:00.000Z",
      "status": "active"
    }
  ],
  "ZFE35PQ": [
    {
      "id": "59",
      "name": "Ibuprofen",
      "dosage": "200mg",
      "frequency": "Oral tablet",
      "route": "oral",
      "prescribingDoctor": "Dr Neha Rawiri",
      "prescriptionDate": "2025-04-15T00:00:00.000Z",
      "startDate": "2025-04-15T00:00:00.000Z",
      "endDate": "2025-04-29T00:00:00.000Z",
      "status": "active"
    },
    {
      "id": "60",
      "name": "Levothyroxine",
      "dosage": "100mcg",
      "frequency": "Oral tablet",
      "route": "oral",
      "prescribingDoctor": "Dr Moana Singh",
      "prescriptionDate": "2025-05-10T00:00:00.000Z",
      "startDate": "2025-05-10T00:00:00.000Z",
      "endDate": "2025-06-09T00:00:00.000Z",
      "status": "active"
    },
    {
      "id": "61",
      "name": "Clobetasol propionate",
      "dosage": "Apply thinly",
      "frequency": "Topical cream",
      "route": "topical",
      "prescribingDoctor": "Dr James Kaur",
      "prescriptionDate": "2025-06-20T00:00:00.000Z",
      "startDate": "2025-06-20T00:00:00.000Z",
      "endDate": "2025-07-04T00:00:00.000Z",
      "status": "active"
    },
    {
      "id": "62",
      "name": "Metoprolol succinate",
      "dosage": "50mg",
      "frequency": "Oral tablet",
      "route": "oral",
      "prescribingDoctor": "Dr Mereana Joshi",
      "prescriptionDate": "2025-07-15T00:00:00.000Z",
      "startDate": "2025-07-15T00:00:00.000Z",
      "endDate": "2025-08-14T00:00:00.000Z",
      "status": "active"
    },
    {
      "id": "63",
      "name": "Medroxyprogesterone acetate",
      "dosage": "Apply to scalp",
      "frequency": "",
      "prescribingDoctor": "Dr Charlotte Desai",
      "prescriptionDate": "2025-08-10T00:00:00.000Z",
      "startDate": "2025-08-10T00:00:00.000Z",
      "endDate": "2025-08-24T00:00:00.000Z",
      "status": "active"
    },
    {
      "id": "64",
      "name": "Candesartan cilexetil",
      "dosage": "8mg",
      "frequency": "Oral tablet",
      "route": "oral",
      "prescribingDoctor": "Dr Tāne Kapoor",
      "prescriptionDate": "2025-08-28T00:00:00.000Z",
      "startDate": "2025-08-28T00:00:00.000Z",
      "endDate": "2025-09-27T00:00:00.000Z",
      "status": "active"
    }
  ],
  "ZFZ57UL": [
    {
      "id": "65",
      "name": "Amoxicillin",
      "dosage": "500mg",
      "frequency": "Oral tablet",
      "route": "oral",
      "prescribingDoctor": "Dr Tāne Kapoor",
      "prescriptionDate": "2025-03-01T00:00:00.000Z",
      "startDate": "2025-03-01T00:00:00.000Z",
      "endDate": "2025-03-31T00:00:00.000Z",
      "status": "active"
    },
    {
      "id": "66",
      "name": "Betamethasone valerate",
      "dosage": "Apply sparingly",
      "frequency": "Topical cream",
      "route": "topical",
      "prescribingDoctor": "Dr Charlotte Desai",
      "prescriptionDate": "2025-04-05T00:00:00.000Z",
      "startDate": "2025-04-05T00:00:00.000Z",
      "endDate": "2025-04-19T00:00:00.000Z",
      "status": "active"
    },
    {
      "id": "67",
      "name": "Metformin hydrochloride",
      "dosage": "500mg",
      "frequency": "Oral tablet",
      "route": "oral",
      "prescribingDoctor": "Dr Harpreet Ngatai",
      "prescriptionDate": "2025-05-10T00:00:00.000Z",
      "startDate": "2025-05-10T00:00:00.000Z",
      "endDate": "2025-06-09T00:00:00.000Z",
      "status": "active"
    },
    {
      "id": "68",
      "name": "Triamcinolone acetonide",
      "dosage": "Apply to eczema",
      "frequency": "Topical cream",
      "route": "topical",
      "prescribingDoctor": "Dr Harpreet Ngatai",
      "prescriptionDate": "2025-06-20T00:00:00.000Z",
      "startDate": "2025-06-20T00:00:00.000Z",
      "endDate": "2025-07-04T00:00:00.000Z",
      "status": "active"
    },
    {
      "id": "69",
      "name": "Colecalciferol",
      "dosage": "1000 IU",
      "frequency": "Oral tablet",
      "route": "oral",
      "prescribingDoctor": "Dr Mereana Joshi",
      "prescriptionDate": "2025-07-30T00:00:00.000Z",
      "startDate": "2025-07-30T00:00:00.000Z",
      "endDate": "2025-08-29T00:00:00.000Z",
      "status": "active"
    },
    {
      "id": "70",
      "name": "Atorvastatin",
      "dosage": "10mg",
      "frequency": "Oral tablet",
      "route": "oral",
      "prescribingDoctor": "Dr Aroha Patel",
      "prescriptionDate": "2025-08-20T00:00:00.000Z",
      "startDate": "2025-08-20T00:00:00.000Z",
      "endDate": "2025-09-19T00:00:00.000Z",
      "status": "active"
    }
  ],
  "ZGA02YJ": [
    {
      "id": "71",
      "name": "Aspirin",
      "dosage": "100mg",
      "frequency": "Oral tablet",
      "route": "oral",
      "prescribingDoctor": "Dr Tāne Kapoor",
      "prescriptionDate": "2025-02-15T00:00:00.000Z",
      "startDate": "2025-02-15T00:00:00.000Z",
      "endDate": "2025-03-16T00:00:00.000Z",
      "status": "active"
    },
    {
      "id": "72",
      "name": "Sertraline",
      "dosage": "500mg",
      "frequency": "Oral tablet",
      "route": "oral",
      "prescribingDoctor": "Dr Priya Clarke",
      "prescriptionDate": "2025-03-20T00:00:00.000Z",
      "startDate": "2025-03-20T00:00:00.000Z",
      "endDate": "2025-04-19T00:00:00.000Z",
      "status": "active"
    },
    {
      "id": "73",
      "name": "Clobetasol propionate",
      "dosage": "Apply thinly",
      "frequency": "Topical cream",
      "route": "topical",
      "prescribingDoctor": "Dr Tāne Kapoor",
      "prescriptionDate": "2025-05-01T00:00:00.000Z",
      "startDate": "2025-05-01T00:00:00.000Z",
      "endDate": "2025-05-15T00:00:00.000Z",
      "status": "active"
    },
    {
      "id": "74",
      "name": "Amlodipine",
      "dosage": "16mg",
      "frequency": "Oral tablet",
      "route": "oral",
      "prescribingDoctor": "Dr Wiremu Sharma",
      "prescriptionDate": "2025-06-10T00:00:00.000Z",
      "startDate": "2025-06-10T00:00:00.000Z",
      "endDate": "2025-07-10T00:00:00.000Z",
      "status": "active"
    },
    {
      "id": "75",
      "name": "Diclofenac sodium",
      "dosage": "Apply to joints",
      "frequency": "Topical cream",
      "route": "topical",
      "prescribingDoctor": "Dr Wiremu Sharma",
      "prescriptionDate": "2025-07-25T00:00:00.000Z",
      "startDate": "2025-07-25T00:00:00.000Z",
      "endDate": "2025-08-08T00:00:00.000Z",
      "status": "active"
    },
    {
      "id": "76",
      "name": "Loratadine",
      "dosage": "10mg",
      "frequency": "Oral tablet",
      "route": "oral",
      "prescribingDoctor": "Dr Tāne Kapoor",
      "prescriptionDate": "2025-08-20T00:00:00.000Z",
      "startDate": "2025-08-20T00:00:00.000Z",
      "endDate": "2025-09-19T00:00:00.000Z",
      "status": "active"
    }
  ]
}

export const mockDocumentContent: Record<string, string> = {
  doc1: "JVBERi0xLjQKMSAwIG9iago8PAovVHlwZSAvQ2F0YWxvZwovUGFnZXMgMiAwIFIKPj4KZW5kb2JqCg==",
  doc2: "JVBERi0xLjQKMSAwIG9iago8PAovVHlwZSAvQ2F0YWxvZwovUGFnZXMgMiAwIFIKPj4KZW5kb2JqCg==",
  doc3: "JVBERi0xLjQKMSAwIG9iago8PAovVHlwZSAvQ2F0YWxvZwovUGFnZXMgMiAwIFIKPj4KZW5kb2JqCg==",
  doc4: "JVBERi0xLjQKMSAwIG9iago8PAovVHlwZSAvQ2F0YWxvZwovUGFnZXMgMiAwIFIKPj4KZW5kb2JqCg==",
  doc5: "JVBERi0xLjQKMSAwIG9iago8PAovVHlwZSAvQ2F0YWxvZwovUGFnZXMgMiAwIFIKPj4KZW5kb2JqCg==",
  doc6: "JVBERi0xLjQKMSAwIG9iago8PAovVHlwZSAvQ2F0YWxvZwovUGFnZXMgMiAwIFIKPj4KZW5kb2JqCg==",
}

