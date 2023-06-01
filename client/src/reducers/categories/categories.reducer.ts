import { createReducer } from '@reduxjs/toolkit'
import { Category } from '../../model/category'
import { getCategories } from './categories.actions'

interface CategoryState {
  categories: Category[]
}

const initialState: CategoryState = {
  categories: [],
}

export const categoriesReducer = createReducer(initialState, (builder) => {
  builder.addCase(getCategories.pending, (state) => ({
    ...state,
    categories: [],
  }))

  builder.addCase(getCategories.rejected, (state) => ({
    ...state,
    categories: [],
  }))

  builder.addCase(getCategories.fulfilled, (state, action) => ({
    ...state,
    categories: action.payload,
  }))
})
