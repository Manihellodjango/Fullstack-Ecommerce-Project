import mongoose, { Document } from 'mongoose'

export type ProductDocument = Document & {
  id: number
  name: string
  description: string
  brand: string
  price: number
  category: string
  image: string
  rating: number
}

const productSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  brand: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
    min: 0,
  },
  createdAt: {
    type: Date,
    default: new Date().toISOString(),
  },
})

export default mongoose.model<ProductDocument>('Product', productSchema)
