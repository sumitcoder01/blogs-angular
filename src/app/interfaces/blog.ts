export interface BlogRoot {
  success: boolean
  blogs: Blog[]
  message: string
}

export interface BlogPostRoot {
  success: boolean
  blog: Blog
  message: string
}

export interface Blog {
  _id: string
  title: string
  description: string
  author: string
  authorId: string
  category: string
  createdAt: string
  updatedAt: string
  __v: number
}

export interface createtedBlog {
  title: string
  description: string
  category: string
}