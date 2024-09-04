import { baseApi } from "../baseApi";

const propertyApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createProperty: builder.mutation({
      query: (data) => ({
        url: "/property/create-property",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["property"],
    }),
    getAllProperty: builder.query({
      query: (args) => ({
        url: "/property",
        method: "GET",
        params:args
      }),
      providesTags: ["property"],
    }),
    getProperty: builder.query({
      query: (id:string) => ({
        url: `/property/${id}`,
        method: "GET",
      }),
      providesTags: ["property"],
    }),
    placeBid: builder.mutation({
      query: (data) => ({
        url: `/property/place-bid/${data?.id}`,
        method: "PATCH",
        body:data.data
      }),
      invalidatesTags: ["property"],
    }),
    getWinBidProperty: builder.query({
      query: () => ({
        url: `/property/win-property`,
        method: "GET"
      }),
      providesTags: ["property"],
    }),
   
  }),
});

export const { useGetAllPropertyQuery, useCreatePropertyMutation,useGetPropertyQuery,usePlaceBidMutation,useGetWinBidPropertyQuery} = propertyApi;
