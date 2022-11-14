import React from "react"

import type { initialStateType } from "@customTypes/common/initialState.type"

export type FormType = {
   initialState: initialStateType
   handleFormSubmit: (event: React.FormEvent<HTMLDivElement>, formData: initialStateType) => void
   isLoading: boolean
   children: React.ReactNode
}
