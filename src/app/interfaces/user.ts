export interface LoginResponse {
    success: boolean
    authToken: string
    message: string

}

export interface UserResponse {
    success: boolean
    user: User
    message: string
}

export interface User {
    _id: string
    name: string
    email: string
    userType: string
    blogs: Blog[]
    createdAt: string
    updatedAt: string
    __v: number
}

export interface Blog {
    blogId: string
    _id: string
}

export interface CreateUser {
    name: string
    email: string
    password: string
    confirmPassword:string
  }

export interface LoginUser {
    email: string
    password: string
  }