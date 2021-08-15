import { useQuery, useMutation, useQueryClient } from "react-query";
import axios from "axios";

export function useUploads() {
  return (
    useQuery(
      'uploads',
      async () => await (await fetch('/uploads')).json()
    )
  )
}

export function useCreateData() {
  const queryClient = useQueryClient()

  return (
    useMutation(
      data => axios.post(`/data`, data),
      {
        onSettled: () => {
          queryClient.invalidateQueries('uploads')
        }
      }
    )
  )
}

export function useDeleteData() {
  const queryClient = useQueryClient()

  return (
    useMutation(
      data => axios.delete(`/data/${data.id}`, data),
      {
        onSettled: () => {
          queryClient.invalidateQueries('uploads')
        }
      }
    )
  )
}