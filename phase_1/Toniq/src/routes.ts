import { Hono } from "hono"
import { mockMedications, mockPatients } from "./mockData.js"
import type { Medication, ErrorResponse, MedicationsResponse } from "./types.js"
import { validateNHI, validateQueryParams } from "./middleware.js"

const api = new Hono()

api.get("/patients/:nhi/medications", validateNHI, (c) => {
  const nhi = c.req.param("nhi")
  const current = c.req.query("current") === "true"

  const validation = validateQueryParams(c)
  if (validation.error) {
    return c.json(validation.error, 400)
  }
  const limit = validation.parsedLimit!

  if (!mockPatients[nhi]) {
    const error: ErrorResponse = {
      error: "PATIENT_NOT_FOUND",
      message: `Patient with NHI ${nhi} not found`,
      timestamp: new Date().toISOString(),
    }
    return c.json(error, 404)
  }

  let medications = mockMedications[nhi] || []

  if (current) {
    medications = medications.filter(
      (med: Medication) => med.status === "active",
    )
  }

  const total = medications.length
  medications = medications.slice(0, limit)

  const response: MedicationsResponse = {
    medications,
    total,
  }

  return c.json(response)
})

export default api

