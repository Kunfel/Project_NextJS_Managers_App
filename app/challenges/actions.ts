'use server'

import { revalidatePath } from 'next/cache'
import { Challenge } from './type'

export async function deleteChallenge(id: string) {
  try {
    const response = await fetch(`http://localhost:5000/challenges/${id}`, {
      method: 'DELETE',
    })

    if (!response.ok) {
      throw new Error('Failed to delete challenge')
    }

    revalidatePath('/challenges')
    return { success: true }
  } catch (error) {
    console.error('Error deleting challenge:', error)
    throw error
  }
}

export async function getChallenges() {
  try {
    const response = await fetch('http://localhost:5000/challenges', {
      method: 'GET',
      cache: 'no-store'
    })

    if (!response.ok) {
      throw new Error('Failed to fetch challenges')
    }

    return response.json()
  } catch (error) {
    console.error('Error fetching challenges:', error)
    throw error
  }
}

export async function getChallenge(id: string) {
  try {
    const response = await fetch(`http://localhost:5000/challenges/${id}`, {
      method: 'GET',
      cache: 'no-store'
    })

    if (!response.ok) {
      throw new Error('Failed to fetch challenge')
    }

    return response.json()
  } catch (error) {
    console.error('Error fetching challenge:', error)
    throw error
  }
}

export async function createChallenge(challenge: Omit<Challenge, 'id' | 'createdAt'>) {
  try {
    const response = await fetch('http://localhost:5000/challenges', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...challenge,
        id: crypto.randomUUID(),
        createdAt: new Date().toISOString(),
      }),
    })

    if (!response.ok) {
      throw new Error('Failed to create challenge')
    }

    revalidatePath('/challenges')
    return { success: true }
  } catch (error) {
    console.error('Error creating challenge:', error)
    throw error
  }
}

export async function updateChallenge(id: string, challenge: Partial<Challenge>) {
  try {
    const response = await fetch(`http://localhost:5000/challenges/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(challenge),
    })

    if (!response.ok) {
      throw new Error('Failed to update challenge')
    }

    revalidatePath('/challenges')
    return { success: true }
  } catch (error) {
    console.error('Error updating challenge:', error)
    throw error
  }
}