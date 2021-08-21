import { useQuery, useMutation, useQueryClient } from "react-query";
import axios from "axios";

export function useUploads() {
  return (
    useQuery(
      'uploads',
      async () => await (await fetch('/api/uploads')).json()
    )
  )
}

export function useCreateData() {
  const queryClient = useQueryClient()

  return (
    useMutation(
      data => axios.post(`/api/data`, data),
      {
        onSettled: () => {
          queryClient.invalidateQueries('uploads')
        },
        onSuccess: () => {
          alert('success!')
        }
      }
    )
  )
}

export function useDeleteData() {
  const queryClient = useQueryClient()

  return (
    useMutation(
      data => axios.delete(`/api/data/${parseInt(data.id)}`, data),
      {
        onSettled: () => {
          queryClient.invalidateQueries('uploads')
        }
      }
    )
  )
}

export function useGetData(id) {
  return (
    useQuery(
      ['getData', id],
      async () => axios.get(`/api/data/${id}`)
    )
  )
}