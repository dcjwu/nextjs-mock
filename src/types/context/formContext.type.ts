import React from "react"

import type { initialStateType } from "@customTypes/common"

export type FormContextType = {
   formData: initialStateType
   handleFormChange?: (event: React.SyntheticEvent) => void
}
