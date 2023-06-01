import { createAsyncThunk } from '@reduxjs/toolkit'
import { Category } from '../../model/category'
import { categoryService } from './categories.service'

export const getCategories = createAsyncThunk<Category[]>('category/getCategories', async (): Promise<Category[]> => {
  return await categoryService.getAll()
})
