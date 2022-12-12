import { useClient, useFilter } from '@logux/client/react'
import { changeSyncMapById, createSyncMap } from '@logux/client'
import { nanoid } from 'nanoid'

import { User } from './stores/user'

interface props {
	userId: string
}

export function Users({ userId }: props) {

	const buttonClass = "w-44 border-2 border-black p-1 hover:bg-slate-400"

	let users = useFilter(User, { userId })
	const client = useClient()

	let newUser = {
		id: nanoid(),
		userId,
		name: "user"
	}

	function createRenameUser() {
		let newUser = {
			id: nanoid(),
			userId,
			name: nanoid(),
		}

		createSyncMap(client, User, newUser)
		changeSyncMapById(client, User, newUser.id, { name: "New Name" })
	}

	async function createUser() {
		createSyncMap(client, User, newUser)
	}

	async function createManyUsers() {
		for (let i = 0; i < 50; i++) {
			createRenameUser()
		}
	}

	function errFunc() {
		let newerUser = {
			id: nanoid(),
			userId,
			name: "user2",
			commentRights: false
		}
		changeSyncMapById(client, User, newerUser.id, { name: "user" })
	}

	let userSection
	if (users.isLoading) {
		userSection = "Loading users"
	}
	else if (users.isEmpty) {
		userSection = "No users"
	}
	else {
		userSection = users.list.map(user => <li key={user.id}>{user.name}</li>)
	}

	return (
			<div className="mx-auto flex flex-col h-screnn items-center justify-center gap-5 m-10">
				<button
					onClick={createUser}
					className={buttonClass}>
					create a user </button>
				<button
					onClick={createRenameUser}
					className={buttonClass}>
					create and rename user
				</button>
				<button
					onClick={createManyUsers}
					className={buttonClass}>
					create and rename 50 users
				</button>
				<button
					onClick={errFunc}
					className={buttonClass}>
					make an error
				</button>
				<ul>{userSection}</ul>
			</div>
	)
}
