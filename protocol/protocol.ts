import { defineSyncMapActions } from "@logux/actions"

export const SUBPROTOCOL = '1.0.0'

export type UserType = {
  id: string
  userId: string
  name: string    
}

export const [
  createUser,   
  changeUser,  
  deleteUser,  
  createdUser, 
  changedUser,  
  deletedUser,  
] = defineSyncMapActions<UserType>('users')

export type CreateUser = ReturnType<typeof createUser>
export type CreatedUser = ReturnType<typeof createdUser>
export type DeleteUser = ReturnType<typeof deleteUser>    
export type DeletedUser = ReturnType<typeof deletedUser>

