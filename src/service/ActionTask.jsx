import { get, post, patch, deleteItem } from "../ultils/api"

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
        const newTask = await patch('/tasks', data)

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

        console.log(data);
        const newTask = await deleteItem('/tasks', data)

        return newTask
    } catch (error) {
        console.error('error', error)
    }
}

/**
 * 
 * @param {*} data {status}
 */
export const getTask = async (data) => {
    try {
        const result = await get('/tasks',data)

        return result
    } catch (error) {
        console.error('error', error.message)
    }
}