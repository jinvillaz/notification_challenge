import axios from 'axios'
import { Category } from '../../model/category'

const api = process.env.REACT_APP_API_URL + '/categories'

class CategoryService {
  async getAll(): Promise<Category[]> {
    const { data } = await axios.get(api)
    return data
  }
}

export const categoryService = new CategoryService()
