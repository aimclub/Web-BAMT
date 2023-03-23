import { IBNData, IBNDataNames, ISample } from "../../types/experiment";
import { commonApi } from "../baseURL";

const BASE_URL = "bn_manager/";

export const bn_managerAPI = commonApi.injectEndpoints({
  endpoints: (build) => ({
    // get networks data
    getBNData: build.query<IBNData, { owner: string }>({
      query: ({ owner }) => ({
        url: `${BASE_URL}get_BN/${owner}`,
      }),
      providesTags: ["Networks"],
    }),

    // get networks names
    getBNDataNames: build.query<IBNDataNames, { owner: string }>({
      query: ({ owner }) => ({
        url: `${BASE_URL}get_BN_names/${owner}`,
      }),
      providesTags: ["Networks"],
    }),

    // get network
    getSampleData: build.query<
      ISample,
      { owner: string; name: string; node: string }
    >({
      query: ({ owner, name, node }) => ({
        url: `${BASE_URL}get_sample/${owner}/${name}/${node}`,
      }),
      providesTags: ["Networks"],
    }),

    // remove network
    removeBN: build.mutation<unknown, { owner: string; name: string }>({
      query: ({ owner, name }) => ({
        url: `${BASE_URL}remove/${owner}/${name}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Networks"],
    }),
  }),
});
