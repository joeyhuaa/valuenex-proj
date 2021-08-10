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
        onSuccess: res => {
          queryClient.invalidateQueries('uploads')
          // queryClient.setQueryData(['project', { id: res.data.projId }], res.data)
        }
      }
    )
  )
}