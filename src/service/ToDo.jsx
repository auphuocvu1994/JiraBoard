import { get, post, deleteItem } from "../ultils/api"

/**
 * 
 * @param {*} data {title, status}
 */

export const createTask = async (data) => {
    try {
        const newTask = await post('/tasks', data)

        return newTask
    } catch (error) {
        console.error('error', error.message)
    }
}
/**
 * 
 * @param {*} data {id, title, status}
 */

export const editTask = async (data) => {
    try {
        const newTask = await post('/tasks', data)

        return newTask
    } catch (error) {
        console.error('error', error.message)
    }
}

/**
 * 
 * @param {*} data {id}
 */

export const removeTask = async (data) => {
    try {
        

        const newTask = await deleteItem('/tasks', data)

        return newTask
    } catch (error) {
        console.error('error', error.message)
    }
}
export async function getTask() {
    try {
        const result = await get('/tasks')

        return result
    } catch (error) {
        console.error('error', error.message)
    }
}