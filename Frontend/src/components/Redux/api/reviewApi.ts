import { baseApi } from "../baseApi";

const reviewApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createReview: builder.mutation({
      query: (data) => ({
        url: `/review/create-review/${data.id}`,
        method: "POST",
        body: data.data,
      }),
      invalidatesTags: ["reviews"],
    }),
    getAllReview: builder.query({
      query: () => ({
        url: "/review",
        method: "GET"
      }),
      providesTags: ["reviews"],
    }),
    getReview: builder.query({
      query: (id:string) => ({
        url: `/review/${id}`,
        method: "GET"
      }),
      providesTags: ["reviews"],
    }),
   
  }),
});

export const { useCreateReviewMutation,useGetReviewQuery,useGetAllReviewQuery} = reviewApi;
