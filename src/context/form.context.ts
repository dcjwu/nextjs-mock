import React from "react"

import type { FormContextType } from "@customTypes/context"

export const FormContext = React.createContext<FormContextType>({ formData: {} })
